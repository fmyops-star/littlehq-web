(function () {
  const tokenPattern = /^[0-9a-f]{32}$/;
  const shortCodePattern = /^[2-9a-hj-km-np-z]{6}$/;
  const legacyCodePattern = /^[0-9a-f]{8}$/;
  const doorCodeKey = "littlehq.doorCode";

  function config() {
    const value = window.LITTLEHQ_CONFIG || {};
    if (!value.supabaseUrl || value.supabaseUrl.includes("YOUR_")) {
      throw new Error("This LittleHQ page is not configured yet.");
    }
    return value;
  }

  function client() {
    const { supabaseUrl, supabaseAnonKey } = config();
    return window.supabase.createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: false,
        flowType: "implicit"
      }
    });
  }

  function show(id) {
    document.querySelectorAll("[data-panel]").forEach((node) => {
      node.classList.toggle("hidden", node.id !== id);
    });
  }

  function setNotice(id, message, isError) {
    const node = document.getElementById(id);
    if (!node) return;
    node.textContent = message || "";
    node.classList.toggle("hidden", !message);
    node.classList.toggle("error", Boolean(isError));
    node.classList.toggle("info", Boolean(message) && !isError);
  }

  function queryToken() {
    const params = new URLSearchParams(window.location.search);
    return String(params.get("t") || "").trim().toLowerCase();
  }

  function normalizeCode(value) {
    return String(value || "").toLowerCase().replace(/[^0-9a-z]/g, "");
  }

  function isDoorCode(value) {
    return shortCodePattern.test(value) || legacyCodePattern.test(value);
  }

  function savedDoorCode() {
    try {
      return normalizeCode(window.localStorage.getItem(doorCodeKey) || "");
    } catch (error) {
      return "";
    }
  }

  function storeDoorCode(code) {
    try {
      if (code) {
        window.localStorage.setItem(doorCodeKey, code);
      } else {
        window.localStorage.removeItem(doorCodeKey);
      }
    } catch (error) {
      return;
    }
  }

  function childName(row) {
    return `${row.first_name || ""} ${row.last_name || ""}`.trim() || "Child";
  }

  function rpcMessage(error) {
    const message = String((error && error.message) || "").trim().toLowerCase();
    if (message === "expired_qr") {
      return "expired";
    }
    if (message === "too_soon") {
      return "Wait 30 minutes before checking out so this isn’t an accidental scan. A teacher can check them out now if they need to leave.";
    }
    if (message === "too_many_attempts") {
      return "Too many tries. Wait a few minutes and enter the door code again.";
    }
    if (message === "already_recorded") {
      return "This child already has attendance for today.";
    }
    if (message === "not_present") {
      return "This child is not currently checked in.";
    }
    if (message === "child_inactive") {
      return "Check-in is only for active children.";
    }
    if (message === "not_allowed") {
      return "You don’t have children to check in here.";
    }
    return "We couldn’t update attendance. Try again.";
  }

  function summarize(rows) {
    const names = (match) => rows.filter((row) => row.outcome === match).map(childName);
    const checkedIn = names("checked_in");
    const checkedOut = names("checked_out");
    const tooSoon = names("too_soon");
    const complete = names("already_complete");
    const parts = [];
    if (checkedIn.length) {
      parts.push(`Checked in ${checkedIn.join(", ")}.`);
    }
    if (checkedOut.length) {
      parts.push(`Checked out ${checkedOut.join(", ")}.`);
    }
    if (tooSoon.length) {
      parts.push(
        `${tooSoon.join(", ")} just checked in. Wait 30 minutes before a scan can check them out, or ask a teacher to check them out now.`
      );
    }
    if (complete.length) {
      parts.push(`${complete.join(", ")} already finished today.`);
    }
    return parts.join(" ") || "Attendance is updated.";
  }

  function statusText(outcome) {
    if (outcome === "checked_in") return "Checked in";
    if (outcome === "checked_out") return "Checked out";
    if (outcome === "too_soon") return "Wait 30 minutes to check out";
    if (outcome === "already_complete") return "Already checked out today";
    return "Attendance unchanged";
  }

  async function startDoorPage() {
    const stationToken = queryToken();
    if (!tokenPattern.test(stationToken)) {
      show("expired");
      return;
    }

    const supabase = client();
    let doorCode = savedDoorCode();
    if (!isDoorCode(doorCode)) {
      doorCode = null;
    }

    function showExpired() {
      show("expired");
    }

    function renderDone(rows) {
      const lead = document.getElementById("done-lead");
      const list = document.getElementById("done-list");
      const schoolName = rows[0] && rows[0].school_name;
      lead.textContent = schoolName
        ? `${summarize(rows)} This is on LittleHQ for ${schoolName}.`
        : summarize(rows);
      list.replaceChildren();
      rows.forEach((row) => {
        const card = document.createElement("div");
        card.className = "child-card";
        const name = document.createElement("p");
        name.className = "child-name";
        name.textContent = childName(row);
        const status = document.createElement("p");
        status.className = "child-status";
        status.textContent = statusText(row.outcome);
        card.appendChild(name);
        card.appendChild(status);
        list.appendChild(card);
      });
      const signOutButton = document.getElementById("signout");
      signOutButton.classList.toggle("hidden", Boolean(doorCode));
      show("done");
    }

    async function applyAttendance() {
      show("loading");
      const { data, error } = await supabase.rpc("parent_door_apply", {
        p_station_token: stationToken,
        p_door_code: doorCode
      });
      if (error) {
        if (rpcMessage(error) === "expired") {
          showExpired();
          return false;
        }
        if (String(error.message || "").toLowerCase() === "not_allowed") {
          if (doorCode) {
            storeDoorCode("");
            doorCode = null;
          }
          return false;
        }
        show("identify");
        setNotice("identify-notice", rpcMessage(error), true);
        return false;
      }
      const rows = Array.isArray(data) ? data : [];
      if (rows.length === 0) {
        return false;
      }
      renderDone(rows);
      return true;
    }

    document.getElementById("signin-form").addEventListener("submit", async (event) => {
      event.preventDefault();
      const submit = document.getElementById("signin-submit");
      const email = String(document.getElementById("email").value || "").trim().toLowerCase();
      const password = String(document.getElementById("password").value || "");
      submit.disabled = true;
      setNotice("identify-notice", "", false);
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      submit.disabled = false;
      if (error) {
        setNotice("identify-notice", "That email or password didn’t work.", true);
        return;
      }
      doorCode = null;
      storeDoorCode("");
      const ok = await applyAttendance();
      if (!ok) {
        show("identify");
        setNotice("identify-notice", "You don’t have children to check in here.", true);
      }
    });

    document.getElementById("code-form").addEventListener("submit", async (event) => {
      event.preventDefault();
      const submit = document.getElementById("code-submit");
      const code = normalizeCode(document.getElementById("door-code").value);
      if (!isDoorCode(code)) {
        setNotice("identify-notice", "Enter the 6-character door code from the Director.", true);
        return;
      }
      submit.disabled = true;
      doorCode = code;
      const ok = await applyAttendance();
      submit.disabled = false;
      if (!ok) {
        doorCode = null;
        storeDoorCode("");
        if (document.getElementById("expired").classList.contains("hidden")) {
          show("identify");
          setNotice("identify-notice", "That door code didn’t work.", true);
        }
        return;
      }
      storeDoorCode(code);
    });

    document.getElementById("signout").addEventListener("click", async () => {
      await supabase.auth.signOut();
      doorCode = null;
      storeDoorCode("");
      show("identify");
      setNotice("identify-notice", "", false);
    });

    const { data } = await supabase.auth.getSession();
    if ((data && data.session) || doorCode) {
      const ok = await applyAttendance();
      if (ok) return;
      if (!document.getElementById("expired").classList.contains("hidden")) return;
    }
    show("identify");
  }

  window.LittleHQWeb = window.LittleHQWeb || {};
  window.LittleHQWeb.startDoorPage = startDoorPage;
  startDoorPage().catch(() => {
    document.querySelectorAll("[data-panel]").forEach((node) => {
      node.classList.add("hidden");
    });
    const expired = document.getElementById("expired");
    if (expired) expired.classList.remove("hidden");
  });
})();

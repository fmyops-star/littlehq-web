(function () {
  const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

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

  function normalizedEmail(value) {
    return String(value || "").trim().toLowerCase().replace(/^mailto:/, "");
  }

  function isValidEmail(value) {
    const email = normalizedEmail(value);
    return emailPattern.test(email) && !email.includes("..") && !email.includes(":");
  }

  function isValidPassword(value) {
    return String(value || "").length >= 8;
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

  function query() {
    return new URLSearchParams(window.location.search);
  }

  function hash() {
    return new URLSearchParams(window.location.hash.replace(/^#/, ""));
  }

  function clearAddress() {
    window.history.replaceState({}, document.title, window.location.pathname);
  }

  async function requestPasswordReset(email) {
    const { supabaseUrl, supabaseAnonKey } = config();
    const response = await fetch(`${supabaseUrl}/functions/v1/request-password-reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: supabaseAnonKey,
        Authorization: `Bearer ${supabaseAnonKey}`
      },
      body: JSON.stringify({ email })
    });
    if (!response.ok) {
      throw new Error("request_failed");
    }
  }

  async function startResetPage() {
    const params = query();
    const hashParams = hash();
    const type = (params.get("type") || hashParams.get("type") || "").toLowerCase();
    const tokenHash = params.get("token_hash") || hashParams.get("token_hash");
    const code = params.get("code");
    const accessToken = hashParams.get("access_token");
    const refreshToken = hashParams.get("refresh_token");

    function showRequest() { show("request"); }
    function showPassword() { show("password"); }
    function showDone() { show("done"); }
    function showConfirmed() { show("confirmed"); }

    try {
      if (tokenHash && (type === "recovery" || type === "signup" || type === "email")) {
        const supabase = client();
        const { error } = await supabase.auth.verifyOtp({
          type: type === "email" ? "email" : type,
          token_hash: tokenHash
        });
        clearAddress();
        if (error) {
          showRequest();
          setNotice("request-notice", "That link is no longer valid. Send a new reset email.", true);
        } else if (type === "signup" || type === "email") {
          showConfirmed();
        } else {
          showPassword();
        }
      } else if (accessToken && (type === "recovery" || hashParams.get("type") === "recovery")) {
        const supabase = client();
        const { error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken || ""
        });
        clearAddress();
        if (error) {
          showRequest();
          setNotice("request-notice", "That link is no longer valid. Send a new reset email.", true);
        } else {
          showPassword();
        }
      } else if (code) {
        const supabase = client();
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        clearAddress();
        if (error) {
          showRequest();
          setNotice("request-notice", "Open the latest reset email, or send a new one from this page.", true);
        } else if (type === "signup") {
          showConfirmed();
        } else {
          showPassword();
        }
      } else {
        showRequest();
      }

      const requestForm = document.getElementById("request-form");
      const requestEmail = document.getElementById("request-email");
      const requestHint = document.getElementById("request-email-hint");
      requestEmail.addEventListener("input", function () {
        const value = normalizedEmail(requestEmail.value);
        if (value !== requestEmail.value) requestEmail.value = value;
        const invalid = value.length > 0 && !isValidEmail(value);
        requestHint.classList.toggle("hidden", !invalid);
      });
      requestForm.addEventListener("submit", async function (event) {
        event.preventDefault();
        const email = normalizedEmail(requestEmail.value);
        if (!isValidEmail(email)) {
          requestHint.classList.remove("hidden");
          return;
        }
        const button = document.getElementById("request-submit");
        button.disabled = true;
        try {
          await requestPasswordReset(email);
          setNotice(
            "request-notice",
            "If that email belongs to a LittleHQ account, you’ll receive reset instructions shortly.",
            false
          );
        } catch (error) {
          setNotice("request-notice", "Couldn’t send that email. Try again.", true);
        }
        button.disabled = false;
      });

      document.getElementById("password-form").addEventListener("submit", async function (event) {
        event.preventDefault();
        const password = document.getElementById("new-password").value;
        const confirm = document.getElementById("confirm-password").value;
        if (!isValidPassword(password)) {
          setNotice("password-notice", "Use at least 8 characters.", true);
          return;
        }
        if (password !== confirm) {
          setNotice("password-notice", "Passwords don’t match.", true);
          return;
        }
        const button = document.getElementById("password-submit");
        button.disabled = true;
        try {
          const supabase = client();
          const { error } = await supabase.auth.updateUser({ password });
          if (error) {
            setNotice("password-notice", "We couldn’t update the password. Request a new reset email.", true);
            button.disabled = false;
            return;
          }
          await supabase.auth.signOut();
          showDone();
        } catch (error) {
          setNotice("password-notice", "We couldn’t update the password. Request a new reset email.", true);
          button.disabled = false;
        }
      });
    } catch (error) {
      showRequest();
      setNotice("request-notice", "This page isn’t ready yet.", true);
    }
  }

  function normalizedInviteToken(value) {
    return String(value || "").replace(/[\s-]/g, "").toLowerCase();
  }

  function isValidInviteToken(value) {
    const token = normalizedInviteToken(value);
    return token.length >= 8 && token.length <= 256 && /^[a-z0-9._~-]+$/.test(token);
  }

  function appInviteURL(token) {
    return `littlehq://invite?token=${encodeURIComponent(token)}`;
  }

  async function startInvitePage() {
    const params = query();
    const token = normalizedInviteToken(params.get("token"));
    clearAddress();
    if (!isValidInviteToken(token)) {
      show("failed");
      return;
    }
    try {
      const supabase = client();
      const { data, error } = await supabase.rpc("peek_invitation", { p_token: token });
      const row = Array.isArray(data) ? data[0] : data;
      const role = String(row && row.role ? row.role : "").toLowerCase();
      if (error || (role !== "teacher" && role !== "parent")) {
        show("failed");
        return;
      }
      const headline = role === "teacher" ? "Welcome, teacher!" : "Welcome, parent!";
      document.querySelector("h1").textContent = headline;
      const open = document.getElementById("open-app");
      const href = appInviteURL(token);
      open.setAttribute("href", href);
      show("ready");
      window.location.href = href;
    } catch (error) {
      show("failed");
    }
  }

  async function startConfirmedPage() {
    const params = query();
    const hashParams = hash();
    const type = (params.get("type") || hashParams.get("type") || "signup").toLowerCase();
    const tokenHash = params.get("token_hash") || hashParams.get("token_hash");
    const code = params.get("code");
    const accessToken = hashParams.get("access_token");
    const refreshToken = hashParams.get("refresh_token");
    try {
      if (tokenHash) {
        const supabase = client();
        const { error } = await supabase.auth.verifyOtp({
          type: type === "email" ? "email" : "signup",
          token_hash: tokenHash
        });
        clearAddress();
        show(error ? "failed" : "done");
        return;
      }
      if (accessToken) {
        const supabase = client();
        const { error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken || ""
        });
        clearAddress();
        show(error ? "failed" : "done");
        return;
      }
      if (code) {
        const supabase = client();
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        clearAddress();
        show(error ? "failed" : "done");
        return;
      }
      show("waiting");
    } catch (error) {
      show("failed");
    }
  }

  window.LittleHQWeb = {
    client,
    normalizedEmail,
    isValidEmail,
    isValidPassword,
    show,
    setNotice,
    query,
    hash,
    clearAddress,
    requestPasswordReset,
    startResetPage,
    startInvitePage,
    startConfirmedPage
  };
})();

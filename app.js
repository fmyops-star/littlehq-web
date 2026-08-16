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
    return emailPattern.test(email) && !email.includes("..");
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

  window.LittleHQWeb = {
    client,
    normalizedEmail,
    isValidEmail,
    isValidPassword,
    show,
    setNotice,
    query,
    hash,
    clearAddress
  };
})();

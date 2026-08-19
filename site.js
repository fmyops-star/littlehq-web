(function () {
  "use strict";

  var STORAGE_KEY = "littlehq-site-lang";
  var strings = {
    en: {
      skip: "Skip to content",
      nav_product: "Product",
      nav_roles: "Roles",
      nav_how: "How it works",
      nav_trust: "Privacy",
      nav_faq: "FAQ",
      nav_open: "Open menu",
      nav_close: "Close menu",
      lang_switch: "Español",
      lang_label: "Language",
      hero_eyebrow: "iPhone app for one school",
      hero_title: "The school day, in one place.",
      hero_lead:
        "LittleHQ is for directors, teachers, and parents at a single childcare school. Attendance, pickup, messages, and tuition stay together — and each person only sees what they need.",
      hero_primary: "See what’s included",
      hero_secondary: "Privacy Policy",
      hero_note: "Sign in with email and password in the LittleHQ iPhone app. English and Español are built in.",
      preview_label: "Preview",
      preview_home: "Home",
      preview_messages: "Messages",
      preview_present: "Present",
      preview_out: "Out",
      preview_due: "Due Friday",
      ribbon_attendance: "Attendance",
      ribbon_door: "Door check-in",
      ribbon_pickup: "Authorized pickup",
      ribbon_rooms: "Classrooms",
      ribbon_messages: "Director–parent messages",
      ribbon_news: "Announcements",
      ribbon_billing: "Tuition",
      ribbon_people: "Invitations",
      ribbon_export: "Attendance export",
      ribbon_lang: "English / Español",
      product_eyebrow: "What’s in the app",
      product_title: "Everything the school needs to run the day.",
      product_lead:
        "One school. Three roles. No extra products to bolt on. Teachers never see billing. Parents only see their own children.",
      card_attendance_title: "Check-in that matches the room",
      card_attendance_body:
        "Staff check children in and out for today. Parents see their child’s history. Directors can share a spreadsheet of who was present — names of children, not names of staff.",
      card_door_title: "A poster at the door",
      card_door_body:
        "Print one Door QR. A parent scans it with Camera, signs in or enters a 6-character code, and attendance records. Another scan within 30 minutes does not check them out. Staff can still check out immediately.",
      card_pickup_title: "Who is allowed to pick up",
      card_pickup_body:
        "Each child has authorized pickup people and how to reach them. Directors and teachers can see the list when someone arrives.",
      card_rooms_title: "Classrooms and children",
      card_rooms_body:
        "Directors add rooms, assign teachers, and keep children on the right list. Teachers can move a child to another room. They cannot change a child’s name or allergies.",
      card_messages_title: "Messages about that child",
      card_messages_body:
        "The director and a parent write on that child’s thread. Teachers do not see those messages. Lock-screen alerts say a new message arrived — not the child’s name, and not the text.",
      card_news_title: "Announcements to the right people",
      card_news_body:
        "Post to the whole school or one classroom. Teachers and parents see what applies to them. Push alerts stay generic.",
      card_billing_title: "Tuition on the books",
      card_billing_body:
        "Directors create charges and record cash, check, or Zelle. Parents see what they owe and can pay by card in the app when card payments are connected. Teachers never see billing.",
      card_people_title: "Invite the right adults",
      card_people_body:
        "Directors send teacher and parent invitations by email. A parent invite is tied to a child. Codes can be replaced or revoked. Nobody creates a child login.",
      roles_eyebrow: "Three roles",
      roles_title: "The same school. Different doors.",
      roles_lead: "LittleHQ does not show director names to teachers or parents. Role labels are enough.",
      role_director: "Director",
      role_teacher: "Teacher",
      role_parent: "Parent",
      role_director_body:
        "Runs the school: settings, people, invitations, children, classrooms, attendance, Door QR, attendance export, pickup, announcements, messages, charges, and payments received outside the app.",
      role_teacher_body:
        "Sees assigned classrooms, attendance, pickup, announcements, and school info. Checks children in and out. No messaging. No billing. Cannot edit a child’s name or allergies.",
      role_parent_body:
        "Sees linked children, attendance history, pickup, announcements, messages with the director, and their own charges. Can check in at the door poster. Can leave the school or delete their LittleHQ account.",
      how_eyebrow: "How it works",
      how_title: "Set up once. Use it every morning.",
      how_1_title: "The director opens the school",
      how_1_body: "Create the school, add classrooms and children, then invite teachers and parents.",
      how_2_title: "Adults join with an invitation",
      how_2_body: "They confirm the invited inbox, create a password, and open LittleHQ on iPhone. Email and password only.",
      how_3_title: "The day is recorded where it happens",
      how_3_body: "Classroom check-in, the door poster, pickup lists, and announcements stay on that day’s record.",
      how_4_title: "Families stay current",
      how_4_body: "Parents see attendance, messages, and charges. Directors keep the books and the roster.",
      trust_eyebrow: "Built to stay small",
      trust_title: "Each person sees their slice. We don’t sell the rest.",
      trust_lead:
        "LittleHQ stores school records so the school can operate safely. We do not sell this information. We do not use it for ads.",
      trust_1_title: "Role limits",
      trust_1_body: "Teachers cannot open billing or director–parent threads. Parents cannot see another family’s child.",
      trust_2_title: "Your login",
      trust_2_body: "Email and password. You can delete your LittleHQ account from the app by typing DELETE.",
      trust_3_title: "School history stays",
      trust_3_body: "Leaving or deleting a login does not erase the school’s shared records. Children’s names, attendance, and payments stay with the school.",
      trust_4_title: "Plain-language privacy",
      trust_4_body: "The Privacy Policy matches what the app stores today. It is not legal advice.",
      trust_privacy: "Read the Privacy Policy",
      faq_eyebrow: "Questions",
      faq_title: "Straight answers.",
      faq_1_q: "Do children get LittleHQ accounts?",
      faq_1_a: "No. Only adults sign in: the director, teachers, and parents or guardians. A director or parent enters a child’s information so the school can run the day.",
      faq_2_q: "Can I download LittleHQ from the App Store today?",
      faq_2_a: "LittleHQ is an iPhone app. Public App Store listing comes later. People at a school that already uses LittleHQ sign in with the email the director invited.",
      faq_3_q: "How do parents check a child in?",
      faq_3_a: "Staff can check in from the classroom. Parents can also scan the school’s Door QR with Camera, then sign in or enter a 6-character door code. A second parent scan within 30 minutes does not check the child out.",
      faq_4_q: "How do families pay tuition?",
      faq_4_a: "The director creates a charge. They can record cash, check, or Zelle. Parents see what they owe in Billing. Card checkout in the app is used when the school has card payments connected.",
      faq_5_q: "Is there Spanish?",
      faq_5_a: "Yes. Directors, teachers, and parents can switch English and Español in Account.",
      faq_6_q: "Who do I contact?",
      faq_6_a: "For your school’s records, message the director in LittleHQ. This website is also linked from Sign in and Account in the app.",
      close_title: "Open LittleHQ on iPhone.",
      close_lead: "If you already have an invitation, confirm your email and sign in. If you need a reset, use the same inbox the school has on file.",
      close_primary: "Reset password",
      close_secondary: "Privacy Policy",
      footer_blurb: "School tools for directors, teachers, and parents. LittleHQ is a placeholder product name, operated by Evernourish Brands.",
      footer_product: "Product",
      footer_account: "Account",
      footer_legal: "Legal",
      footer_privacy: "Privacy Policy",
      footer_terms: "Terms of Use",
      footer_support: "Support",
      footer_reset: "Reset password",
      footer_invite: "Invitation",
      footer_confirm: "Email confirmed",
      footer_door: "Door check-in",
      footer_copy: "LittleHQ"
    },
    es: {
      skip: "Saltar al contenido",
      nav_product: "Producto",
      nav_roles: "Roles",
      nav_how: "Cómo funciona",
      nav_trust: "Privacidad",
      nav_faq: "Preguntas",
      nav_open: "Abrir menú",
      nav_close: "Cerrar menú",
      lang_switch: "English",
      lang_label: "Idioma",
      hero_eyebrow: "App de iPhone para una escuela",
      hero_title: "El día escolar, en un solo lugar.",
      hero_lead:
        "LittleHQ es para directores, maestros y padres de una sola escuela infantil. Asistencia, recogida, mensajes y colegiatura quedan juntos, y cada persona solo ve lo que necesita.",
      hero_primary: "Ver qué incluye",
      hero_secondary: "Política de privacidad",
      hero_note: "Inicie sesión con correo y contraseña en la app LittleHQ para iPhone. Incluye inglés y español.",
      preview_label: "Vista previa",
      preview_home: "Inicio",
      preview_messages: "Mensajes",
      preview_present: "Presente",
      preview_out: "Salida",
      preview_due: "Vence el viernes",
      ribbon_attendance: "Asistencia",
      ribbon_door: "Entrada en la puerta",
      ribbon_pickup: "Recogida autorizada",
      ribbon_rooms: "Salones",
      ribbon_messages: "Mensajes director–padre",
      ribbon_news: "Anuncios",
      ribbon_billing: "Colegiatura",
      ribbon_people: "Invitaciones",
      ribbon_export: "Exportar asistencia",
      ribbon_lang: "English / Español",
      product_eyebrow: "Qué hay en la app",
      product_title: "Todo lo que la escuela necesita para el día.",
      product_lead:
        "Una escuela. Tres roles. Nada extra que ensamblar. Los maestros no ven facturación. Los padres solo ven a sus propios niños.",
      card_attendance_title: "Entrada que coincide con el salón",
      card_attendance_body:
        "El personal registra entrada y salida de hoy. Los padres ven el historial de su niño. El director puede compartir una hoja de quién estuvo presente: nombres de niños, no nombres del personal.",
      card_door_title: "Un cartel en la puerta",
      card_door_body:
        "Imprima un QR de puerta. Un padre lo escanea con Cámara, inicia sesión o ingresa un código de 6 caracteres, y se registra la asistencia. Otro escaneo en 30 minutos no registra la salida. El personal sí puede registrar la salida de inmediato.",
      card_pickup_title: "Quién puede recoger",
      card_pickup_body:
        "Cada niño tiene personas autorizadas para recogerlo y cómo localizarlas. Directores y maestros ven la lista cuando alguien llega.",
      card_rooms_title: "Salones y niños",
      card_rooms_body:
        "El director agrega salones, asigna maestros y mantiene a los niños en la lista correcta. Un maestro puede mover a un niño a otro salón. No puede cambiar el nombre ni las alergias.",
      card_messages_title: "Mensajes sobre ese niño",
      card_messages_body:
        "El director y un padre escriben en el hilo de ese niño. Los maestros no ven esos mensajes. Las alertas en la pantalla de bloqueo dicen que llegó un mensaje nuevo, no el nombre del niño ni el texto.",
      card_news_title: "Anuncios a las personas correctas",
      card_news_body:
        "Publique a toda la escuela o a un salón. Maestros y padres ven lo que les corresponde. Las alertas push siguen siendo genéricas.",
      card_billing_title: "Colegiatura en los registros",
      card_billing_body:
        "El director crea cargos y registra efectivo, cheque o Zelle. Los padres ven lo que deben y pueden pagar con tarjeta en la app cuando los pagos con tarjeta estén conectados. Los maestros nunca ven facturación.",
      card_people_title: "Invite a los adultos correctos",
      card_people_body:
        "El director envía invitaciones de maestro y de padre por correo. La invitación de padre está ligada a un niño. Los códigos se pueden reemplazar o revocar. Nadie crea un inicio de sesión para un niño.",
      roles_eyebrow: "Tres roles",
      roles_title: "La misma escuela. Distintas puertas.",
      roles_lead: "LittleHQ no muestra nombres de directores a maestros o padres. Basta la etiqueta del rol.",
      role_director: "Director",
      role_teacher: "Maestro",
      role_parent: "Padre",
      role_director_body:
        "Dirige la escuela: configuración, personas, invitaciones, niños, salones, asistencia, QR de puerta, exportar asistencia, recogida, anuncios, mensajes, cargos y pagos recibidos fuera de la app.",
      role_teacher_body:
        "Ve los salones asignados, asistencia, recogida, anuncios e información de la escuela. Registra entradas y salidas. Sin mensajería. Sin facturación. No puede editar el nombre ni las alergias de un niño.",
      role_parent_body:
        "Ve a los niños vinculados, el historial de asistencia, la recogida, los anuncios, los mensajes con el director y sus propios cargos. Puede registrar entrada en el cartel de la puerta. Puede dejar la escuela o eliminar su cuenta de LittleHQ.",
      how_eyebrow: "Cómo funciona",
      how_title: "Configúrela una vez. Úsela cada mañana.",
      how_1_title: "El director abre la escuela",
      how_1_body: "Crea la escuela, agrega salones y niños, e invita a maestros y padres.",
      how_2_title: "Los adultos entran con una invitación",
      how_2_body: "Confirman el correo invitado, crean una contraseña y abren LittleHQ en el iPhone. Solo correo y contraseña.",
      how_3_title: "El día se registra donde ocurre",
      how_3_body: "La entrada en el salón, el cartel de la puerta, las listas de recogida y los anuncios quedan en el registro de ese día.",
      how_4_title: "Las familias se mantienen al día",
      how_4_body: "Los padres ven asistencia, mensajes y cargos. El director mantiene los registros y la lista.",
      trust_eyebrow: "Hecha para permanecer pequeña",
      trust_title: "Cada persona ve su parte. No vendemos el resto.",
      trust_lead:
        "LittleHQ guarda registros escolares para que la escuela pueda operar con seguridad. No vendemos esta información. No la usamos para anuncios.",
      trust_1_title: "Límites por rol",
      trust_1_body: "Los maestros no pueden abrir facturación ni hilos entre el director y un padre. Los padres no ven al niño de otra familia.",
      trust_2_title: "Su inicio de sesión",
      trust_2_body: "Correo y contraseña. Puede eliminar su cuenta de LittleHQ en la app escribiendo DELETE.",
      trust_3_title: "El historial de la escuela se queda",
      trust_3_body: "Salir o eliminar un inicio de sesión no borra los registros compartidos. Los nombres de los niños, la asistencia y los pagos se quedan con la escuela.",
      trust_4_title: "Privacidad en lenguaje claro",
      trust_4_body: "La política de privacidad coincide con lo que la app guarda hoy. No es asesoría legal.",
      trust_privacy: "Leer la política de privacidad",
      faq_eyebrow: "Preguntas",
      faq_title: "Respuestas directas.",
      faq_1_q: "¿Los niños tienen cuentas de LittleHQ?",
      faq_1_a: "No. Solo inician sesión los adultos: el director, los maestros y los padres o tutores. Un director o un padre ingresa los datos del niño para que la escuela pueda operar el día.",
      faq_2_q: "¿Puedo descargar LittleHQ del App Store hoy?",
      faq_2_a: "LittleHQ es una app de iPhone. La ficha pública del App Store llega más adelante. Quienes ya están en una escuela que usa LittleHQ inician sesión con el correo que invitó el director.",
      faq_3_q: "¿Cómo registran la entrada los padres?",
      faq_3_a: "El personal puede registrar la entrada desde el salón. Los padres también pueden escanear el QR de puerta con Cámara e iniciar sesión o ingresar un código de 6 caracteres. Un segundo escaneo del padre en 30 minutos no registra la salida.",
      faq_4_q: "¿Cómo pagan las familias la colegiatura?",
      faq_4_a: "El director crea un cargo. Puede registrar efectivo, cheque o Zelle. Los padres ven lo que deben en Facturación. El pago con tarjeta en la app se usa cuando la escuela tiene esos pagos conectados.",
      faq_5_q: "¿Hay español?",
      faq_5_a: "Sí. Directores, maestros y padres pueden cambiar entre English y Español en Cuenta.",
      faq_6_q: "¿Con quién hablo?",
      faq_6_a: "Para los registros de su escuela, escriba al director en LittleHQ. Este sitio también está enlazado desde Iniciar sesión y Cuenta en la app.",
      close_title: "Abra LittleHQ en el iPhone.",
      close_lead: "Si ya tiene una invitación, confirme su correo e inicie sesión. Si necesita restablecer, use el mismo correo que la escuela tiene registrado.",
      close_primary: "Restablecer contraseña",
      close_secondary: "Política de privacidad",
      footer_blurb: "Herramientas escolares para directores, maestros y padres. LittleHQ es un nombre provisional, operado por Evernourish Brands.",
      footer_product: "Producto",
      footer_account: "Cuenta",
      footer_legal: "Legal",
      footer_privacy: "Política de privacidad",
      footer_terms: "Términos de uso",
      footer_support: "Ayuda",
      footer_reset: "Restablecer contraseña",
      footer_invite: "Invitación",
      footer_confirm: "Correo confirmado",
      footer_door: "Entrada en la puerta",
      footer_copy: "LittleHQ"
    }
  };

  var lang = "en";

  function currentStrings() {
    return strings[lang] || strings.en;
  }

  function applyLang(next) {
    lang = next === "es" ? "es" : "en";
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (error) {
      // Private mode can block storage. The toggle still works for this visit.
    }
    document.documentElement.lang = lang;
    document.documentElement.dataset.lang = lang;
    var pack = currentStrings();
    document.querySelectorAll("[data-i18n]").forEach(function (node) {
      var key = node.getAttribute("data-i18n");
      if (key && pack[key]) {
        node.textContent = pack[key];
      }
    });
    document.querySelectorAll("[data-i18n-aria]").forEach(function (node) {
      var key = node.getAttribute("data-i18n-aria");
      if (key && pack[key]) {
        node.setAttribute("aria-label", pack[key]);
      }
    });
    var toggle = document.getElementById("lang-toggle");
    if (toggle) {
      toggle.setAttribute("aria-label", pack.lang_label);
    }
  }

  function storedLang() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (error) {
      return null;
    }
  }

  function setupLang() {
    var initial = storedLang();
    if (!initial && navigator.language && navigator.language.toLowerCase().indexOf("es") === 0) {
      initial = "es";
    }
    applyLang(initial || "en");
    var toggle = document.getElementById("lang-toggle");
    if (toggle) {
      toggle.addEventListener("click", function () {
        applyLang(lang === "en" ? "es" : "en");
      });
    }
  }

  function setupNav() {
    var toggle = document.getElementById("nav-toggle");
    var panel = document.getElementById("nav-panel");
    if (!toggle || !panel) return;

    function setOpen(open) {
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      panel.hidden = !open;
      document.body.classList.toggle("nav-open", open);
      toggle.setAttribute("data-i18n-aria", open ? "nav_close" : "nav_open");
      var pack = currentStrings();
      toggle.setAttribute("aria-label", open ? pack.nav_close : pack.nav_open);
    }

    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });
    panel.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        setOpen(false);
      });
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") setOpen(false);
    });
  }

  function setupRoles() {
    var tabs = Array.prototype.slice.call(document.querySelectorAll("[data-role-tab]"));
    var panels = Array.prototype.slice.call(document.querySelectorAll("[data-role-panel]"));
    if (!tabs.length) return;

    function show(name) {
      tabs.forEach(function (tab) {
        var on = tab.getAttribute("data-role-tab") === name;
        tab.classList.toggle("is-active", on);
        tab.setAttribute("aria-selected", on ? "true" : "false");
      });
      panels.forEach(function (panel) {
        var on = panel.getAttribute("data-role-panel") === name;
        panel.hidden = !on;
      });
    }

    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        show(tab.getAttribute("data-role-tab"));
      });
    });
    show("director");
  }

  function setupFaq() {
    document.querySelectorAll(".faq-item").forEach(function (item) {
      var button = item.querySelector("button");
      var panel = item.querySelector(".faq-answer");
      if (!button || !panel) return;
      button.addEventListener("click", function () {
        var open = item.classList.contains("is-open");
        document.querySelectorAll(".faq-item.is-open").forEach(function (other) {
          other.classList.remove("is-open");
          var otherButton = other.querySelector("button");
          var otherPanel = other.querySelector(".faq-answer");
          if (otherButton) otherButton.setAttribute("aria-expanded", "false");
          if (otherPanel) otherPanel.hidden = true;
        });
        if (!open) {
          item.classList.add("is-open");
          button.setAttribute("aria-expanded", "true");
          panel.hidden = false;
        }
      });
    });
  }

  function setupReveal() {
    var nodes = document.querySelectorAll("[data-reveal]");
    if (!nodes.length) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      nodes.forEach(function (node) {
        node.classList.add("is-visible");
      });
      return;
    }
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    nodes.forEach(function (node) {
      observer.observe(node);
    });
  }

  function setupHeader() {
    var header = document.querySelector(".site-header");
    if (!header) return;
    var update = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
  }

  setupLang();
  setupNav();
  setupRoles();
  setupFaq();
  setupReveal();
  setupHeader();
})();

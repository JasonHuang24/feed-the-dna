/* Feed the DNA — small progressive-enhancement helpers */
(function () {
  "use strict";

  // Mobile nav toggle
  var toggle = document.querySelector(".nav__toggle");
  var links = document.querySelector(".nav__links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        links.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
    // Close on Escape
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && links.classList.contains("is-open")) {
        links.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    });
    // Close on outside tap
    document.addEventListener("click", function (e) {
      if (links.classList.contains("is-open") && !e.target.closest(".nav")) {
        links.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Reveal-on-scroll
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  // Year stamp
  var y = document.querySelector("[data-year]");
  if (y) y.textContent = new Date().getFullYear();

  // Contact form — Web3Forms AJAX submit (stays on page, shows inline status)
  var form = document.getElementById("contact-form");
  if (form) {
    var status = document.getElementById("form-status");
    var setStatus = function (cls, msg) {
      if (!status) return;
      status.className = "form__status" + (cls ? " " + cls : "");
      status.textContent = msg;
    };
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var btn = form.querySelector("button[type=submit]");
      var data = JSON.stringify(Object.fromEntries(new FormData(form).entries()));
      setStatus("", "Sending…");
      if (btn) btn.disabled = true;
      fetch(form.action, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: data
      })
        .then(function (res) {
          return res.json().then(function (json) { return { ok: res.ok, json: json }; });
        })
        .then(function (r) {
          if (r.ok && r.json.success) {
            form.reset();
            setStatus("is-ok", "Thanks — your message is on its way. We'll be in touch soon.");
          } else {
            setStatus("is-err", (r.json && r.json.message) || "Something went wrong. Please email feedthedna@gmail.com.");
          }
        })
        .catch(function () {
          setStatus("is-err", "Network error. Please email feedthedna@gmail.com.");
        })
        .finally(function () { if (btn) btn.disabled = false; });
    });
  }
})();

(function () {
  const popups = [];

  document.querySelectorAll(".auth-popup-overlay").forEach((overlay) => {
    const stepSignIn = overlay.querySelector(".auth-step-signin");
    const stepOtp = overlay.querySelector(".auth-step-otp");
    const sidebarSignIn = overlay.querySelector(".auth-sidebar-signin");
    const sidebarOtp = overlay.querySelector(".auth-sidebar-otp");
    const mobileInput = overlay.querySelector(".auth-mobile-input");
    const phoneDisplay = overlay.querySelector(".auth-phone-display");
    const otpInputs = overlay.querySelectorAll(".auth-otp-field");
    const resendTimerEl = overlay.querySelector(".auth-resend-timer");
    const resendBtn = overlay.querySelector(".auth-resend-btn");

    let resendInterval = null;
    let resendSeconds = 30;

    function openPopup() {
      overlay.classList.remove("hidden");
      overlay.classList.add("flex");
      document.body.classList.add("overflow-hidden");
      showSignInStep();
    }

    function closePopup() {
      overlay.classList.add("hidden");
      overlay.classList.remove("flex");
      document.body.classList.remove("overflow-hidden");
      stopResendTimer();
      showSignInStep();
      if (mobileInput) mobileInput.value = "";
      otpInputs.forEach((input) => {
        input.value = "";
      });
    }

    function showSignInStep() {
      stepSignIn?.classList.remove("hidden");
      stepOtp?.classList.add("hidden");
      sidebarSignIn?.classList.remove("hidden");
      sidebarOtp?.classList.add("hidden");
      stopResendTimer();
    }

    function showOtpStep() {
      const raw = (mobileInput?.value || "").replace(/\D/g, "");
      if (raw.length < 10) {
        mobileInput?.focus();
        mobileInput?.classList.add("ring-2", "ring-coral-red");
        setTimeout(() => mobileInput?.classList.remove("ring-2", "ring-coral-red"), 1500);
        return;
      }

      const formatted =
        raw.length === 10
          ? `+91 ${raw.slice(0, 5)} ${raw.slice(5)}`
          : `+91 ${raw}`;

      if (phoneDisplay) phoneDisplay.textContent = formatted;

      stepSignIn?.classList.add("hidden");
      stepOtp?.classList.remove("hidden");
      sidebarSignIn?.classList.add("hidden");
      sidebarOtp?.classList.remove("hidden");

      otpInputs.forEach((input) => {
        input.value = "";
      });
      otpInputs[0]?.focus();
      startResendTimer();
    }

    function formatMobileInput(value) {
      const digits = value.replace(/\D/g, "").slice(0, 10);
      if (digits.length <= 5) return digits;
      return `${digits.slice(0, 5)} ${digits.slice(5)}`;
    }

    function startResendTimer(seconds = 30) {
      stopResendTimer();
      resendSeconds = seconds;
      if (resendBtn) {
        resendBtn.classList.add("pointer-events-none", "opacity-50");
      }
      updateResendDisplay();

      resendInterval = setInterval(() => {
        resendSeconds -= 1;
        updateResendDisplay();
        if (resendSeconds <= 0) {
          stopResendTimer();
          if (resendBtn) {
            resendBtn.classList.remove("pointer-events-none", "opacity-50");
          }
          if (resendTimerEl) resendTimerEl.textContent = "";
        }
      }, 1000);
    }

    function stopResendTimer() {
      if (resendInterval) {
        clearInterval(resendInterval);
        resendInterval = null;
      }
    }

    function updateResendDisplay() {
      if (!resendTimerEl) return;
      const m = String(Math.floor(resendSeconds / 60)).padStart(2, "0");
      const s = String(resendSeconds % 60).padStart(2, "0");
      resendTimerEl.textContent = `${m}:${s}`;
    }

    overlay.querySelectorAll(".auth-popup-close").forEach((btn) => {
      btn.addEventListener("click", closePopup);
    });

    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closePopup();
    });

    overlay.querySelector(".auth-send-otp-btn")?.addEventListener("click", showOtpStep);

    overlay.querySelector(".auth-change-phone")?.addEventListener("click", (e) => {
      e.preventDefault();
      showSignInStep();
      mobileInput?.focus();
    });

    overlay.querySelector(".auth-resend-btn")?.addEventListener("click", () => {
      if (resendSeconds > 0) return;
      startResendTimer(30);
      otpInputs[0]?.focus();
    });

    mobileInput?.addEventListener("input", (e) => {
      e.target.value = formatMobileInput(e.target.value);
    });

    otpInputs.forEach((input, index) => {
      input.addEventListener("input", (e) => {
        let value = e.target.value.replace(/[^0-9]/g, "");
        e.target.value = value.slice(0, 1);
        input.classList.toggle("border-sea-green2", !!value);
        input.classList.toggle("border-[#E5E7EB]", !value);
        if (value && index < otpInputs.length - 1) {
          otpInputs[index + 1].focus();
        }
      });

      input.addEventListener("keydown", (e) => {
        if (e.key === "Backspace" && !input.value && index > 0) {
          otpInputs[index - 1].focus();
        }
      });

      input.addEventListener("focus", () => {
        otpInputs.forEach((el) => {
          el.classList.remove("border-sea-green2", "ring-2", "ring-sea-green2/30");
          el.classList.add("border-[#E5E7EB]");
        });
        input.classList.add("border-sea-green2", "ring-2", "ring-sea-green2/30");
        input.classList.remove("border-[#E5E7EB]");
      });
    });

    if (otpInputs[0]) {
      otpInputs[0].addEventListener("paste", (e) => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData("text").replace(/[^0-9]/g, "");
        pasteData.split("").forEach((digit, i) => {
          if (otpInputs[i]) otpInputs[i].value = digit;
        });
        const lastIndex = Math.min(pasteData.length, otpInputs.length) - 1;
        if (lastIndex >= 0) otpInputs[lastIndex].focus();
      });
    }

    popups.push({ overlay, openPopup, closePopup });
  });

  document.querySelectorAll(".open-auth-popup").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      popups[0]?.openPopup();
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    popups.forEach(({ overlay, closePopup }) => {
      if (!overlay.classList.contains("hidden")) closePopup();
    });
  });
})();

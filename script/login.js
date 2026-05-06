const otpInputs = document.querySelectorAll(".otp-field");

otpInputs.forEach((input, index) => {

    // Only numbers + auto move next
    input.addEventListener("input", (e) => {
        let value = e.target.value;

        // Allow only digits
        value = value.replace(/[^0-9]/g, "");
        e.target.value = value;

        if (value && index < otpInputs.length - 1) {
            otpInputs[index + 1].focus();
        }
    });

    // Backspace go previous
    input.addEventListener("keydown", (e) => {
        if (e.key === "Backspace" && !input.value && index > 0) {
            otpInputs[index - 1].focus();
        }
    });

});

// Paste full OTP
otpInputs[0].addEventListener("paste", (e) => {
    e.preventDefault();

    const pasteData = e.clipboardData.getData("text").replace(/[^0-9]/g, "");

    pasteData.split("").forEach((digit, i) => {
        if (otpInputs[i]) {
            otpInputs[i].value = digit;
        }
    });

    const lastIndex = Math.min(pasteData.length, otpInputs.length) - 1;
    if (lastIndex >= 0) otpInputs[lastIndex].focus();
});

function showRegister() {
    document.getElementById("loginForm").classList.add("hidden");
    document.getElementById("loginAfterOtp").classList.add("hidden");
    document.getElementById("otpBox").classList.add("hidden");
    document.getElementById("registerUI").classList.remove("hidden");

    setStep("register");
}

function showLogin() {
    document.getElementById("registerUI").classList.add("hidden");
    document.getElementById("detailsUI").classList.add("hidden");
    document.getElementById("loginForm").classList.remove("hidden");

    setStep("login");
}

function showDetails() {
    document.getElementById("detailsUI").classList.remove("hidden");

    setStep("register");
}

function showOTP() {
    document.getElementById("otpBox").classList.remove("hidden");
    document.getElementById("loginForm").classList.add("hidden");
    document.getElementById("loginAfterOtp").classList.remove("hidden");

    setStep("login");
}

function setStep(step) {
    const loginStep = document.getElementById("stepLogin");
    const registerStep = document.getElementById("stepRegister");

    if (step === "login") {
        loginStep.classList.remove("bg-cool-fog");
        loginStep.classList.add("bg-sea-green-dark1");

        registerStep.classList.remove("bg-sea-green-dark1");
        registerStep.classList.add("bg-cool-fog");
    }

    if (step === "register") {
        loginStep.classList.remove("bg-sea-green-dark1");
        loginStep.classList.add("bg-cool-fog");

        registerStep.classList.remove("bg-cool-fog");
        registerStep.classList.add("bg-sea-green-dark1");
    }
}
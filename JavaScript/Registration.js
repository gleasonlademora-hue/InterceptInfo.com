document.addEventListener("DOMContentLoaded", function () {
    const regModalEl = document.getElementById("registrationModal");
    if (!regModalEl) return;

    const registrationModal = bootstrap.Modal.getOrCreateInstance(regModalEl);

    const form = document.getElementById("registrationForm");
    const onboardingForm = document.getElementById("onboardingForm");
    const stage1 = document.getElementById("stage1-container");
    const stage2 = document.getElementById("stage2-container");
    const stage3 = document.getElementById("stage3-container");
    const modalTitle = document.getElementById("registrationModalLabel");
    const emailDisplay = document.getElementById("displayEmail");
    const loginExistingBtn = document.getElementById("loginExistingBtn");

    if (loginExistingBtn) {
        loginExistingBtn.addEventListener("click", (e) => {
            e.preventDefault();
            localStorage.setItem("userLoggedIn", "true");
            localStorage.setItem("interceptUserRegistered", "true");
            alert("Logged in successfully! Redirecting...");
            window.location.reload();
        });
    }

    const passInput = document.getElementById("regPassword");
    const confirmPassInput = document.getElementById("regConfirmPassword");
    const togglePassBtn = document.getElementById("togglePassword");

    if (togglePassBtn && passInput && confirmPassInput) {
        togglePassBtn.addEventListener("click", function () {
            const type =
                passInput.getAttribute("type") === "password" ? "text" : "password";
            passInput.setAttribute("type", type);
            confirmPassInput.setAttribute("type", type);
            this.textContent = type === "password" ? "👁️" : "🙈";
        });

        const clearValidity = () => confirmPassInput.setCustomValidity("");
        passInput.addEventListener("input", clearValidity);
        confirmPassInput.addEventListener("input", clearValidity);
    }

    if (form) {
        form.addEventListener(
            "submit",
            function (event) {
                event.preventDefault();
                event.stopPropagation();

                if (
                    passInput &&
                    confirmPassInput &&
                    passInput.value !== confirmPassInput.value
                ) {
                    confirmPassInput.setCustomValidity("Passwords do not match.");
                } else if (confirmPassInput) {
                    confirmPassInput.setCustomValidity("");
                }

                const isValid = form.checkValidity();
                form.classList.add("was-validated");

                if (isValid) {
                    const userEmail = document.getElementById("regEmail").value;
                    const userName = document.getElementById("regFullName").value;

                    if (emailDisplay) emailDisplay.textContent = userEmail;
                    localStorage.setItem("userName", userName);

                    stage1.classList.add("d-none");
                    stage2.classList.remove("d-none");
                    if (modalTitle) modalTitle.textContent = "Security & Verification";
                }
            },
            false,
        );
    }

    const otpInputs = document.querySelectorAll(".otp-input");
    otpInputs.forEach((input, index) => {
        input.addEventListener("input", () => {
            if (input.value.length === 1 && index < otpInputs.length - 1) {
                otpInputs[index + 1].focus();
            }
        });

        input.addEventListener("keydown", (e) => {
            if (e.key === "Backspace" && input.value.length === 0 && index > 0) {
                otpInputs[index - 1].focus();
            }
        });

        input.addEventListener("paste", (e) => {
            e.preventDefault();
            const pasteData = (e.clipboardData || window.clipboardData)
                .getData("text")
                .trim();
            if (/^\d{6}$/.test(pasteData)) {
                pasteData.split("").forEach((char, i) => {
                    if (otpInputs[i]) otpInputs[i].value = char;
                });
                otpInputs[otpInputs.length - 1].focus();
            }
        });
    });

    const verifyBtn = document.getElementById("verifyBtn");
    if (verifyBtn) {
        verifyBtn.addEventListener("click", function () {
            this.innerHTML =
                '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Verifying...';

            setTimeout(() => {
                this.classList.add("d-none");
                const successMsg = document.getElementById("otpSuccessMsg");
                if (successMsg) successMsg.classList.remove("d-none");

                setTimeout(() => {
                    stage2.classList.add("d-none");
                    stage3.classList.remove("d-none");
                    if (modalTitle) modalTitle.textContent = "Profile Setup";
                }, 1200);
            }, 1500);
        });
    }

    if (onboardingForm) {
        onboardingForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const obRole = document.getElementById("obRole");
            const obLang = document.getElementById("obLang");

            if (obRole) localStorage.setItem("userRole", obRole.value);
            if (obLang) localStorage.setItem("userLang", obLang.value);

            localStorage.setItem("interceptUserRegistered", "true");
            localStorage.setItem("userLoggedIn", "true");

            registrationModal.hide();
            window.location.reload();
        });
    }
});

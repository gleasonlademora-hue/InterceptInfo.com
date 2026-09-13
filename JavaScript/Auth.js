document.addEventListener("DOMContentLoaded", () => {
    const authToggleBtn = document.getElementById("authToggleBtn");
    const isLoggedIn = localStorage.getItem("userLoggedIn") === "true";

    if (authToggleBtn) {
        authToggleBtn.textContent = isLoggedIn ? "Logout" : "Login";

        authToggleBtn.addEventListener("click", (e) => {
            e.preventDefault();

            if (isLoggedIn) {
                localStorage.setItem("userLoggedIn", "false");
                alert("You have been logged out.");
                window.location.reload();
            } else {
                const regModalEl = document.getElementById("registrationModal");
                if (regModalEl && typeof bootstrap !== "undefined") {
                    const registrationModal =
                        bootstrap.Modal.getOrCreateInstance(regModalEl);
                    registrationModal.show();
                } else {
                    window.location.href = "index.html";
                }
            }
        });
    }
});

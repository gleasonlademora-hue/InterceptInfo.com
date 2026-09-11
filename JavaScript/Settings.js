document.addEventListener("DOMContentLoaded", () => {
    const themeSelect = document.getElementById("themeSelect");

    if (themeSelect) {
        const savedTheme = localStorage.getItem("user-theme") || "system";
        themeSelect.value = savedTheme;

        themeSelect.addEventListener("change", (e) => {
            const selectedTheme = e.target.value;
            localStorage.setItem("user-theme", selectedTheme);

            if (typeof applyTheme === "function") {
                applyTheme(selectedTheme);
            }
        });
    }
});

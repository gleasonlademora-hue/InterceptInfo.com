// settings.js
document.addEventListener("DOMContentLoaded", () => {
    const themeSelect = document.getElementById("themeSelect");
    
    if (themeSelect) {
        // Set the dropdown to match the currently saved theme
        const savedTheme = localStorage.getItem("user-theme") || "system";
        themeSelect.value = savedTheme;

        // Listen for manual user changes
        themeSelect.addEventListener("change", (e) => {
            const selectedTheme = e.target.value;
            localStorage.setItem("user-theme", selectedTheme);
            
            // applyTheme is available globally from theme.js
            if (typeof applyTheme === "function") {
                applyTheme(selectedTheme);
            }
        });
    }
});
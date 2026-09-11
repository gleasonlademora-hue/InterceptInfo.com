function getSystemTheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
}

function applyTheme(theme) {
    if (theme === "system") {
        document.documentElement.setAttribute("data-bs-theme", getSystemTheme());
    } else {
        document.documentElement.setAttribute("data-bs-theme", theme);
    }
}

const savedTheme = localStorage.getItem("user-theme") || "system";
applyTheme(savedTheme);

window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", () => {
        if (
            localStorage.getItem("user-theme") === "system" ||
            !localStorage.getItem("user-theme")
        ) {
            applyTheme("system");
        }
    });

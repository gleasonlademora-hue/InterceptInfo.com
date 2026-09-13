document.addEventListener("DOMContentLoaded", () => {
    const tbody = document.getElementById("donationHistoryBody");

    if (!tbody) return;

    const isLoggedIn = localStorage.getItem("userLoggedIn") === "true";

    if (!isLoggedIn) {
        tbody.innerHTML = `<tr><td colspan="4" class="text-center text-muted py-4">Please log in to view your donation history.</td></tr>`;
        return;
    }

    const profileName = document.getElementById("profileName");
    const profileRole = document.getElementById("profileRole");
    const profileLang = document.getElementById("profileLang");

    if (profileName)
        profileName.textContent =
            localStorage.getItem("userName") || "Storm Chaser";
    if (profileRole)
        profileRole.textContent = `Role: ${localStorage.getItem("userRole") || "Enthusiast"}`;
    if (profileLang)
        profileLang.textContent = localStorage.getItem("userLang") || "English";

    const donationHistory = [
        {
            date: "2026-09-01",
            category: "Fuel Fund",
            tier: "Quarter-tank chase day",
            amount: "$30.00",
        },
        {
            date: "2026-08-15",
            category: "Armor Maintenance",
            tier: "Hydraulic reinforcement",
            amount: "$100.00",
        },
        {
            date: "2026-07-22",
            category: "Scientific Probes",
            tier: "External anemometer",
            amount: "$20.00",
        },
    ];

    if (donationHistory.length === 0) {
        tbody.innerHTML = `<tr><td colspan="4" class="text-center text-muted">No donations found.</td></tr>`;
    } else {
        tbody.innerHTML = "";
        donationHistory.forEach((donation) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td class="small text-muted">${donation.date}</td>
                <td class="fw-semibold">${donation.category}</td>
                <td class="small">${donation.tier}</td>
                <td class="text-success fw-bold">${donation.amount}</td>
            `;
            tbody.appendChild(row);
        });
    }
});

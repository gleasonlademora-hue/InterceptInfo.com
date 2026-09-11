// tabs.js
function activateTab(tabId) {
    const tabTriggerEl = document.getElementById(tabId);
    if (tabTriggerEl && typeof bootstrap !== "undefined") {
        const tab = bootstrap.Tab.getOrCreateInstance(tabTriggerEl);
        tab.show();
    }
}
async function fetchAndDisplayTitle() {
  const titleDisplay = document.getElementById("titleDisplay");

  try {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });

    if (!tab) {
      titleDisplay.textContent = "No active tab found";
      return;
    }

    const results = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => document.title || "No title available",
    });

    const title = results[0].result;

    titleDisplay.textContent = title;
  } catch (error) {
    titleDisplay.textContent = error;
  }
}

document.addEventListener("DOMContentLoaded", fetchAndDisplayTitle);

document.addEventListener("visibilitychange", () => {
  if (!document.hidden) {
    fetchAndDisplayTitle();
  }
});

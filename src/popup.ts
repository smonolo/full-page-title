async function fetchAndDisplayTitle() {
  const titleDisplay = document.getElementById('titleDisplay')

  if (!titleDisplay) {
    throw new Error('titleDisplay not found')
  }

  try {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    })

    if (!tab?.id) {
      titleDisplay.textContent = 'No active tab found'
      return
    }

    const results = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => document.title || 'No title available',
    })

    const title = results[0].result

    titleDisplay.textContent = title
  } catch (error) {
    titleDisplay.textContent = error as string
  }
}

document.addEventListener('DOMContentLoaded', fetchAndDisplayTitle)

document.addEventListener('visibilitychange', () => {
  if (!document.hidden) {
    fetchAndDisplayTitle()
  }
})

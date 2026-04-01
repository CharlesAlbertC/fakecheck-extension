function extractText() {
  let text = "";

  // Try common article tags
  const article = document.querySelector("article");
  if (article) {
    text = article.innerText;
  } else {
    text = document.body.innerText;
  }

  return text.substring(0, 3000); // limit size
}

// Send to popup when requested
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "GET_ARTICLE") {
    sendResponse({ text: extractText() });
  }
});

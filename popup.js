document.getElementById("analyzeBtn").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.tabs.sendMessage(tab.id, { type: "GET_ARTICLE" }, (response) => {
    const text = response.text;

    const result = analyzeText(text);
    updateUI(result);
  });
});

// SIMPLE AI (demo logic)
function analyzeText(text) {
  let score = 100;
  let reasons = [];

  if (text.includes("shocking") || text.includes("hidden truth")) {
    score -= 40;
    reasons.push("Sensational language detected");
  }

  if (text.includes("they don't want you to know")) {
    score -= 30;
    reasons.push("Manipulative phrasing");
  }

  if (text.length < 200) {
    score -= 20;
    reasons.push("Low content credibility");
  }

  if (score < 40) return { score, verdict: "Unreliable", reasons };
  if (score < 70) return { score, verdict: "Questionable", reasons };
  return { score, verdict: "Reliable", reasons };
}

function updateUI(result) {
  const scoreBox = document.getElementById("scoreBox");
  const scoreValue = document.getElementById("scoreValue");
  const verdict = document.getElementById("verdict");
  const explanation = document.getElementById("explanation");

  scoreValue.textContent = result.score;
  verdict.textContent = result.verdict;

  scoreBox.className = "score";

  if (result.score < 40) scoreBox.classList.add("red");
  else if (result.score < 70) scoreBox.classList.add("orange");
  else scoreBox.classList.add("green");

  explanation.innerHTML = result.reasons.join("<br>");
}

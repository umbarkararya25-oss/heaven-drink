const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
menuToggle.addEventListener("click", () => navLinks.classList.toggle("open"));
navLinks.querySelectorAll("a").forEach(link => link.addEventListener("click", () => navLinks.classList.remove("open")));

document.getElementById("serviceForm").addEventListener("submit", event => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  document.getElementById("formMessage").textContent =
    `Thanks, ${data.get("name")}! This is a preview only; booking storage will be added in the next version.`;
  event.currentTarget.reset();
});

const panel = document.getElementById("chatPanel");
document.getElementById("chatLauncher").addEventListener("click", () => panel.hidden = !panel.hidden);
document.getElementById("chatClose").addEventListener("click", () => panel.hidden = true);

document.getElementById("chatForm").addEventListener("submit", async event => {
  event.preventDefault();
  const input = document.getElementById("chatInput");
  const message = input.value.trim();
  if (!message) return;
  addMessage(message, "user");
  input.value = "";
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({message})
    });
    const data = await response.json();
    addMessage(data.reply || "Sorry, I couldn't respond.", "bot");
  } catch {
    addMessage("The assistant is unavailable right now. Please try again.", "bot");
  }
});

function addMessage(text, type) {
  const messages = document.getElementById("chatMessages");
  const bubble = document.createElement("div");
  bubble.className = `message ${type}`;
  bubble.textContent = text;
  messages.appendChild(bubble);
  messages.scrollTop = messages.scrollHeight;
}

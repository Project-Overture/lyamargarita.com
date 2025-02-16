const heartsContainerElement = document.getElementById("hearts-container");
const heartEmojis = ["\u2764", "\u2665", "\u2763"];

function createHeart() {
  const heartElement = document.createElement("div");
  heartElement.classList.add("heart");
  heartElement.textContent =
    heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
  heartElement.style.left = `${Math.random() * 100}%`;
  const heartsAnimationDuration = 5 + Math.random() * 3;
  heartElement.style.animationDuration = `${heartsAnimationDuration}s`;
  heartsContainerElement.appendChild(heartElement);
  setTimeout(() => heartElement.remove(), heartsAnimationDuration * 1000);
}

setInterval(createHeart, 700);
for (let i = 0; i < 5; i++) createHeart();

fetch("https://api.mcsrvstat.us/2/lyamargarita.com")
  .then((res) => res.json())
  .then((serverStatus) => {
    const iconElement = document.getElementById("server-icon");
    const motdElement = document.getElementById("server-motd");
    const playercountElement = document.getElementById("server-player-count");

    if (!serverStatus || !serverStatus.online) {
      motdElement.textContent = "server offline!";
      playercountElement.textContent = "0/0";
      iconElement.setAttribute("hidden", true);
      return;
    }

    if (serverStatus.icon) {
      iconElement.innerHTML = `
                <img
                    src="${serverStatus.icon}"
                    alt="server icon"
                    class="w-full h-full object-cover"
                />
            `;
    }

    const onlinePlayers = serverStatus.players?.online ?? 0;
    const maxPlayers = serverStatus.players?.max ?? 0;
    playercountElement.textContent = `${onlinePlayers}/${maxPlayers}`;

    const motdHtml = serverStatus.motd?.html
      ? serverStatus.motd.html.join(" ")
      : "";
    motdElement.innerHTML = motdHtml || "[no motd found]";
  })
  .catch((error) => {
    console.error("error fetching server status:", error);
    document.getElementById("server-motd").textContent = "server offline!";
  });

window.addEventListener("load", () => {
  const clipboard = FlowbiteInstances.getInstance("CopyClipboard", "server-ip-field");
  const defaultMsgEl = document.getElementById("copy-default");
  const successMsgEl = document.getElementById("copy-success");

  clipboard.updateOnCopyCallback(() => {
    defaultMsgEl.classList.add("hidden");
    successMsgEl.classList.remove("hidden");
    setTimeout(() => {
      defaultMsgEl.classList.remove("hidden");
      successMsgEl.classList.add("hidden");
    }, 2000);
  });
});

const faqToggleEl = document.getElementById("faq-toggle");
const faqCaretEl = document.getElementById("faq-caret");
const faqContentEl = document.getElementById("faq-content");
let faqOpen = false;

faqToggleEl.addEventListener("click", () => {
  faqOpen = !faqOpen;
  faqContentEl.style.height = faqOpen ? `${faqContentEl.scrollHeight}px` : "0px";
  faqCaretEl.classList.toggle("fa-caret-down", !faqOpen);
  faqCaretEl.classList.toggle("fa-caret-up", faqOpen);
});

const rulesToggleEl = document.getElementById("rules-toggle");
const rulesCaretEl = document.getElementById("rules-caret");
const rulesContentEl = document.getElementById("rules-content");
let rulesOpen = false;

rulesToggleEl.addEventListener("click", () => {
  rulesOpen = !rulesOpen;
  rulesContentEl.style.height = rulesOpen
    ? `${rulesContentEl.scrollHeight}px`
    : "0px";
  rulesCaretEl.classList.toggle("fa-caret-down", !rulesOpen);
  rulesCaretEl.classList.toggle("fa-caret-up", rulesOpen);
});

const staffToggleEl = document.getElementById("staff-toggle");
const staffCaretEl = document.getElementById("staff-caret");
const staffContentEl = document.getElementById("staff-content");
let staffOpen = false;

staffToggleEl.addEventListener("click", () => {
  staffOpen = !staffOpen;
  staffContentEl.style.height = staffOpen
    ? `${staffContentEl.scrollHeight}px`
    : "0px";
  staffCaretEl.classList.toggle("fa-caret-down", !staffOpen);
  staffCaretEl.classList.toggle("fa-caret-up", staffOpen);
});

document.addEventListener("DOMContentLoaded", () => {
  const staffCards = document.querySelectorAll("#staff-content .staff-card");
  if (staffCards.length % 2 !== 0) {
    staffCards[staffCards.length - 1].classList.add(
      "sm:col-span-2",
      "sm:justify-self-center"
    );
  }
});

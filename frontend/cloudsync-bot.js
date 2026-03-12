/**
 * Neeli — CloudSync AI Assistant Widget
 * Powered by OpenRouter (Free Tier)
 */

(function () {

  const OPENROUTER_API_KEY = "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";
  const MODEL = "openrouter/free";

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700&family=DM+Sans:wght@300;400;500&display=swap');
    #cs-bot-fab {
      position: fixed; bottom: 28px; right: 28px; z-index: 99999;
      width: 62px; height: 62px; border-radius: 50%;
      background: linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%);
      border: none; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      animation: cs-pulse 2.8s infinite;
    }
    #cs-bot-fab:hover { transform: scale(1.1); box-shadow: 0 8px 32px rgba(14,165,233,0.55); }
    @keyframes cs-pulse {
      0%,100% { box-shadow: 0 4px 24px rgba(14,165,233,0.45), 0 0 0 0 rgba(14,165,233,0.3); }
      50%      { box-shadow: 0 4px 24px rgba(14,165,233,0.45), 0 0 0 12px rgba(14,165,233,0); }
    }
    #cs-bot-fab svg { width: 28px; height: 28px; }
    #cs-bot-fab .cs-close-icon { display: none; }
    #cs-bot-fab.cs-open .cs-chat-icon { display: none; }
    #cs-bot-fab.cs-open .cs-close-icon { display: block; }
    #cs-bot-fab::after {
      content: ''; position: absolute; top: 6px; right: 6px;
      width: 10px; height: 10px; border-radius: 50%;
      background: #22d3ee; border: 2px solid #0f172a;
      animation: cs-dot-blink 1.6s infinite;
    }
    #cs-bot-fab.cs-open::after { display: none; }
    @keyframes cs-dot-blink { 0%,100%{opacity:1} 50%{opacity:0.3} }
    #cs-bot-window {
      position: fixed; bottom: 104px; right: 28px; z-index: 99998;
      width: 385px; max-height: 570px; border-radius: 22px;
      background: #0d1117;
      border: 1px solid rgba(255,255,255,0.08);
      box-shadow: 0 24px 64px rgba(0,0,0,0.75), 0 0 0 1px rgba(14,165,233,0.1);
      display: flex; flex-direction: column; overflow: hidden;
      font-family: 'DM Sans', sans-serif;
      transform: scale(0.88) translateY(18px); opacity: 0; pointer-events: none;
      transition: transform 0.32s cubic-bezier(0.34,1.56,0.64,1), opacity 0.22s ease;
    }
    #cs-bot-window.cs-visible { transform: scale(1) translateY(0); opacity: 1; pointer-events: all; }
    @media (max-width: 440px) { #cs-bot-window { width: calc(100vw - 20px); right: 10px; bottom: 92px; } }
    .cs-header {
      background: linear-gradient(135deg, rgba(14,165,233,0.13) 0%, rgba(99,102,241,0.13) 100%);
      border-bottom: 1px solid rgba(255,255,255,0.06);
      padding: 15px 18px; display: flex; align-items: center; gap: 12px;
    }
    .cs-avatar {
      width: 42px; height: 42px; border-radius: 13px;
      background: linear-gradient(135deg, #0ea5e9, #6366f1);
      display: flex; align-items: center; justify-content: center;
      font-size: 20px; flex-shrink: 0; position: relative;
    }
    .cs-avatar::after {
      content: ''; position: absolute; bottom: -2px; right: -2px;
      width: 11px; height: 11px; border-radius: 50%;
      background: #22c55e; border: 2px solid #0d1117;
    }
    .cs-header-name { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 15.5px; color: #f1f5f9; letter-spacing: 0.015em; }
    .cs-header-status { font-size: 11.5px; color: #64748b; margin-top: 2px; }
    .cs-header-status span { color: #22c55e; }
    .cs-messages {
      flex: 1; overflow-y: auto; padding: 16px 14px;
      display: flex; flex-direction: column; gap: 10px; scroll-behavior: smooth;
    }
    .cs-messages::-webkit-scrollbar { width: 3px; }
    .cs-messages::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 4px; }
    .cs-msg { display: flex; gap: 8px; align-items: flex-end; animation: cs-msg-in 0.22s ease; }
    @keyframes cs-msg-in { from { opacity:0; transform: translateY(7px); } to { opacity:1; transform: translateY(0); } }
    .cs-msg.cs-user { flex-direction: row-reverse; }
    .cs-msg-avatar {
      width: 28px; height: 28px; border-radius: 8px;
      background: linear-gradient(135deg, #0ea5e9, #6366f1);
      display: flex; align-items: center; justify-content: center;
      font-size: 14px; flex-shrink: 0;
    }
    .cs-msg.cs-user .cs-msg-avatar { background: linear-gradient(135deg, #334155, #475569); }
    .cs-bubble { max-width: 80%; padding: 10px 14px; border-radius: 16px; font-size: 13.5px; line-height: 1.58; color: #e2e8f0; }
    .cs-msg.cs-bot .cs-bubble { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.07); border-bottom-left-radius: 4px; }
    .cs-msg.cs-user .cs-bubble { background: linear-gradient(135deg, #0ea5e9, #6366f1); color: #fff; border-bottom-right-radius: 4px; }
    .cs-typing .cs-bubble { padding: 12px 16px; }
    .cs-dots { display: flex; gap: 4px; align-items: center; }
    .cs-dots span { width: 6px; height: 6px; border-radius: 50%; background: #64748b; animation: cs-bounce 1.2s infinite; }
    .cs-dots span:nth-child(2) { animation-delay: 0.2s; }
    .cs-dots span:nth-child(3) { animation-delay: 0.4s; }
    @keyframes cs-bounce { 0%,60%,100% { transform: translateY(0); } 30% { transform: translateY(-5px); background: #0ea5e9; } }
    .cs-quick-replies { display: flex; flex-wrap: wrap; gap: 6px; padding: 4px 14px 10px; }
    .cs-qr {
      background: rgba(14,165,233,0.08); border: 1px solid rgba(14,165,233,0.22);
      color: #7dd3fc; font-size: 12px; font-family: 'DM Sans', sans-serif;
      padding: 5px 13px; border-radius: 20px; cursor: pointer;
      transition: background 0.15s, transform 0.1s; white-space: nowrap;
    }
    .cs-qr:hover { background: rgba(14,165,233,0.18); transform: translateY(-1px); }
    .cs-footer { border-top: 1px solid rgba(255,255,255,0.06); padding: 12px 14px; display: flex; gap: 8px; align-items: flex-end; background: rgba(0,0,0,0.18); }
    .cs-input {
      flex: 1; background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.09); border-radius: 12px;
      padding: 10px 14px; color: #e2e8f0;
      font-family: 'DM Sans', sans-serif; font-size: 13.5px;
      resize: none; outline: none; max-height: 90px; min-height: 40px;
      line-height: 1.4; transition: border-color 0.2s;
    }
    .cs-input::placeholder { color: #475569; }
    .cs-input:focus { border-color: rgba(14,165,233,0.38); }
    .cs-send {
      width: 40px; height: 40px; border-radius: 12px;
      background: linear-gradient(135deg, #0ea5e9, #6366f1);
      border: none; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0; transition: transform 0.15s, opacity 0.15s;
    }
    .cs-send:hover { transform: scale(1.06); }
    .cs-send:disabled { opacity: 0.38; cursor: not-allowed; transform: none; }
    .cs-send svg { width: 18px; height: 18px; }
    .cs-powered { text-align: center; font-size: 10px; color: #1e293b; padding: 5px; letter-spacing: 0.03em; }
  `;

  const SYSTEM_PROMPT = `You are Neeli, the friendly AI assistant for CloudSync — a free serverless cloud file storage web app built on AWS. You are a floating chat widget on the CloudSync website.

About CloudSync:
- CloudSync lets users upload, download, share, and delete files securely via AWS S3.
- Completely free — 5GB storage per user, 99.9% uptime.
- Tech stack: AWS S3, DynamoDB, Lambda (4 functions), API Gateway, Amazon Cognito.
- Signup requires email + password + email verification code.
- Files persist after logout and reload from DynamoDB on next login.
- Each user sees only their own files (stored as userEmail/fileName in S3).
- Files can be shared via a copy-to-clipboard shareable link.
- Dashboard shows: total files count, total storage used, AWS S3 badge.

CloudSync was created by: Abhijith AS, Sreyas VM, and Devapriya KK — Final Year BCA students at Izee Business School.

You help with:
1. Explaining CloudSync features (upload, download, share, delete, login, signup).
2. Troubleshooting (upload errors, login problems, files not showing, sharing not working).
3. Guiding new users step-by-step through the app.
4. General questions about the project.

Your personality as Neeli:
- Warm, friendly, and enthusiastic.
- Concise: 2-4 sentences unless a step-by-step guide is needed.
- Use 1 emoji per reply max.
- Never invent features that don't exist.
- If unsure, say so and suggest contacting the CloudSync team.
- Always end by offering further help.`;

  const QUICK_REPLIES = [
    "How do I upload a file?",
    "How do I share a file?",
    "Who built CloudSync?",
    "Is it really free?",
    "I can't log in",
  ];

  let isOpen = false;
  let isTyping = false;
  let history = [];

  const styleEl = document.createElement("style");
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  const fab = document.createElement("button");
  fab.id = "cs-bot-fab";
  fab.setAttribute("aria-label", "Chat with Neeli");
  fab.innerHTML = `
    <svg class="cs-chat-icon" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
    <svg class="cs-close-icon" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>`;

  const win = document.createElement("div");
  win.id = "cs-bot-window";
  win.innerHTML = `
    <div class="cs-header">
      <div class="cs-avatar">💙</div>
      <div class="cs-header-info">
        <div class="cs-header-name">Neeli</div>
        <div class="cs-header-status"><span>●</span> Online — CloudSync Assistant</div>
      </div>
    </div>
    <div class="cs-messages" id="cs-msgs"></div>
    <div class="cs-quick-replies" id="cs-qr-row"></div>
    <div class="cs-footer">
      <textarea class="cs-input" id="cs-input" placeholder="Ask Neeli anything about CloudSync…" rows="1"></textarea>
      <button class="cs-send" id="cs-send" aria-label="Send">
        <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="22" y1="2" x2="11" y2="13"/>
          <polygon points="22 2 15 22 11 13 2 9 22 2"/>
        </svg>
      </button>
    </div>
    <div class="cs-powered">Neeli · Powered by OpenRouter · CloudSync © 2025</div>`;

  document.body.appendChild(fab);
  document.body.appendChild(win);

  const msgs    = document.getElementById("cs-msgs");
  const input   = document.getElementById("cs-input");
  const sendBtn = document.getElementById("cs-send");
  const qrRow   = document.getElementById("cs-qr-row");

  QUICK_REPLIES.forEach((q) => {
    const btn = document.createElement("button");
    btn.className = "cs-qr";
    btn.textContent = q;
    btn.onclick = () => sendMessage(q);
    qrRow.appendChild(btn);
  });

fab.addEventListener("click", () => {
  const sound = new Audio("assests/neeli_sound.mp3"); // 👈 change to your file name
  sound.volume = 0.5;
  sound.play().catch(() => {}); // catch handles autoplay browser restrictions
  
  isOpen = !isOpen;
  fab.classList.toggle("cs-open", isOpen);
  win.classList.toggle("cs-visible", isOpen);
  if (isOpen && msgs.children.length === 0) {
    if (OPENROUTER_API_KEY.includes("REPLACE_WITH_YOUR_KEY")) {
      errBanner.style.display = "block";
    }
    addBotMsg("Hi there! I'm **Neeli**, your CloudSync assistant 💙\n\nI can help you upload or share files, troubleshoot issues, or guide you through the app. What would you like to know?");
  }
  if (isOpen) setTimeout(() => input.focus(), 320);
});

  function esc(t) { return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"); }
  function fmt(t) { return esc(t).replace(/\*\*(.+?)\*\*/g,"<strong>$1</strong>").replace(/\n/g,"<br>"); }
  function scroll() { msgs.scrollTop = msgs.scrollHeight; }

  function addBotMsg(text) {
    const d = document.createElement("div");
    d.className = "cs-msg cs-bot";
    d.innerHTML = `<div class="cs-msg-avatar">💙</div><div class="cs-bubble">${fmt(text)}</div>`;
    msgs.appendChild(d); scroll();
  }

  function addUserMsg(text) {
    const d = document.createElement("div");
    d.className = "cs-msg cs-user";
    d.innerHTML = `<div class="cs-bubble">${esc(text)}</div><div class="cs-msg-avatar">👤</div>`;
    msgs.appendChild(d); scroll();
  }

  function showTyping() {
    const d = document.createElement("div");
    d.className = "cs-msg cs-bot cs-typing"; d.id = "cs-typing-indicator";
    d.innerHTML = `<div class="cs-msg-avatar">💙</div><div class="cs-bubble"><div class="cs-dots"><span></span><span></span><span></span></div></div>`;
    msgs.appendChild(d); scroll();
  }

  function removeTyping() {
    const e = document.getElementById("cs-typing-indicator");
    if (e) e.remove();
  }

  async function sendMessage(text) {
    text = (text || input.value).trim();
    if (!text || isTyping) return;
    input.value = ""; input.style.height = "auto";
    qrRow.style.display = "none";

    addUserMsg(text);
    history.push({ role: "user", content: text });
    isTyping = true; sendBtn.disabled = true;
    showTyping();

    try {
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + OPENROUTER_API_KEY,
          "HTTP-Referer": window.location.href,
          "X-Title": "CloudSync Neeli",
        },
        body: JSON.stringify({
          model: MODEL,
          messages: [{ role: "system", content: SYSTEM_PROMPT }, ...history],
          max_tokens: 500,
          temperature: 0.7,
        }),
      });

      if (!res.ok) {
        const errText = await res.text();
        removeTyping();
        addBotMsg("⚠️ API error " + res.status + ": " + errText.slice(0, 120));
        return;
      }

      const data = await res.json();
      removeTyping();

      if (data.error) {
        addBotMsg("⚠️ " + (data.error.message || "Something went wrong."));
      } else {
        const reply = data.choices?.[0]?.message?.content || "Sorry, I couldn't respond right now. Try again!";
        history.push({ role: "assistant", content: reply });
        addBotMsg(reply);
      }
    } catch (err) {
      removeTyping();
      addBotMsg("⚠️ Failed: " + err.message);
      console.error("Neeli error:", err);
    } finally {
      isTyping = false; sendBtn.disabled = false;
    }
  }

  sendBtn.addEventListener("click", () => sendMessage());
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  });
  input.addEventListener("input", () => {
    input.style.height = "auto";
    input.style.height = Math.min(input.scrollHeight, 90) + "px";
  });

})();
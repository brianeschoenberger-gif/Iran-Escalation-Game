const DAYS = 10;

const events = [
  {
    title: "Satellite Image Leak",
    text: "Leaked imagery fuels public accusations and raises suspicions overnight.",
    choices: [
      { label: "Offer immediate transparency", effects: { trust: +8, pressure: +4, risk: -2, verify: +5 }, note: "You calm allies, but domestic hawks call it weakness." },
      { label: "Dismiss as disinformation", effects: { trust: -6, pressure: +3, risk: +5, verify: -3 }, note: "Your base approves, but confidence in talks slides." },
      { label: "Invite neutral analysts", effects: { trust: +4, pressure: +1, risk: -1, verify: +7 }, note: "A technical review buys breathing room." }
    ]
  },
  {
    title: "Inspection Access Dispute",
    text: "Inspectors are delayed at a sensitive site, and both sides blame protocol.",
    choices: [
      { label: "Grant limited access now", effects: { trust: +7, pressure: +2, risk: -1, verify: +8 }, note: "Progress is visible, though critics demand tougher lines." },
      { label: "Demand reciprocal concessions first", effects: { trust: -3, pressure: +3, risk: +4, verify: +1 }, note: "You project strength, but the standoff deepens." },
      { label: "Use a mediator to draft protocol", effects: { trust: +3, pressure: -2, risk: -2, verify: +4 }, note: "Process over pride slows the spiral." }
    ]
  },
  {
    title: "Ally Offers Mediation",
    text: "A respected ally proposes hosting emergency talks.",
    choices: [
      { label: "Accept publicly", effects: { trust: +6, pressure: -3, risk: -3, verify: +2 }, note: "The signal is constructive and markets cool." },
      { label: "Accept quietly via backchannel", effects: { trust: +4, pressure: -1, risk: -2, verify: +4 }, note: "Less political blowback, slower momentum." },
      { label: "Decline and keep bilateral", effects: { trust: -2, pressure: +2, risk: +2, verify: 0 }, note: "You keep control, but options narrow." }
    ]
  },
  {
    title: "Hardliners Speak",
    text: "Firebrand speeches dominate airwaves, constraining room to compromise.",
    choices: [
      { label: "Counter with unity message", effects: { trust: +2, pressure: -2, risk: -1, verify: 0 }, note: "Tone stabilizes, but not everyone is convinced." },
      { label: "Echo tough rhetoric", effects: { trust: -4, pressure: +4, risk: +5, verify: -1 }, note: "Domestic applause now, bigger risks tomorrow." },
      { label: "Stay silent and keep talks moving", effects: { trust: +1, pressure: +1, risk: -2, verify: +2 }, note: "Quiet discipline avoids immediate flare-ups." }
    ]
  },
  {
    title: "Naval Near-Miss",
    text: "Patrol vessels nearly collide in contested waters. Video clips spread fast.",
    choices: [
      { label: "Open military hotline", effects: { trust: +3, pressure: +1, risk: -8, verify: +1 }, note: "Direct communication cools a dangerous moment." },
      { label: "Issue stern warning", effects: { trust: -3, pressure: +3, risk: +7, verify: 0 }, note: "Deterrence messaging satisfies hawks but heightens danger." },
      { label: "Invite third-party monitoring", effects: { trust: +2, pressure: -1, risk: -5, verify: +5 }, note: "Observers reduce misread signals." }
    ]
  },
  {
    title: "Sanctions Relief Proposal",
    text: "A phased relief framework appears possible if compliance milestones are credible.",
    choices: [
      { label: "Offer front-loaded relief", effects: { trust: +9, pressure: +5, risk: -2, verify: -3 }, note: "Trust surges, but critics attack the gamble." },
      { label: "Tie relief to verification triggers", effects: { trust: +5, pressure: +2, risk: -1, verify: +7 }, note: "Hard to sell fast, but structurally stronger." },
      { label: "Reject relief discussion", effects: { trust: -7, pressure: +4, risk: +4, verify: -2 }, note: "Leverage is preserved as optimism evaporates." }
    ]
  },
  {
    title: "Backchannel Confirmed",
    text: "Trusted intermediaries verify messages were delivered as promised.",
    choices: [
      { label: "Expand backchannel authority", effects: { trust: +6, pressure: -1, risk: -4, verify: +4 }, note: "Quiet diplomacy starts working." },
      { label: "Shift everything to public talks", effects: { trust: +1, pressure: +2, risk: +1, verify: +2 }, note: "Transparency rises, flexibility drops." },
      { label: "Pause to reassess strategy", effects: { trust: -1, pressure: -1, risk: -1, verify: +1 }, note: "No breakthroughs, but no explosions either." }
    ]
  },
  {
    title: "Cyber Intrusion Claim",
    text: "Critical infrastructure reports a breach; attribution is uncertain.",
    choices: [
      { label: "Propose joint forensic review", effects: { trust: +4, pressure: +1, risk: -3, verify: +6 }, note: "Shared facts reduce panic." },
      { label: "Blame counterpart immediately", effects: { trust: -6, pressure: +3, risk: +6, verify: -2 }, note: "Narrative control comes at diplomatic cost." },
      { label: "Contain quietly and continue talks", effects: { trust: +1, pressure: -1, risk: -1, verify: +2 }, note: "You avoid a headline war." }
    ]
  },
  {
    title: "Domestic Protest Wave",
    text: "Crowds demand visible progress and condemn perceived concessions.",
    choices: [
      { label: "Hold a transparent briefing", effects: { trust: +3, pressure: -3, risk: -1, verify: +1 }, note: "Public clarity softens the backlash." },
      { label: "Promise no compromise", effects: { trust: -5, pressure: +2, risk: +3, verify: -1 }, note: "Short-term calm, long-term rigidity." },
      { label: "Announce independent oversight", effects: { trust: +2, pressure: -2, risk: -2, verify: +4 }, note: "Credibility improves with accountability." }
    ]
  },
  {
    title: "Prisoner Exchange Opportunity",
    text: "Humanitarian negotiators suggest a limited exchange could unlock goodwill.",
    choices: [
      { label: "Approve exchange", effects: { trust: +7, pressure: +1, risk: -2, verify: +2 }, note: "Human stakes create momentum." },
      { label: "Delay until final package", effects: { trust: -2, pressure: +2, risk: +1, verify: 0 }, note: "You keep chips for later, but lose warmth now." },
      { label: "Expand to broader humanitarian channel", effects: { trust: +4, pressure: -2, risk: -2, verify: +3 }, note: "A softer lane supports tougher talks." }
    ]
  },
  {
    title: "Secret Memo Leak",
    text: "A leaked memo suggests one side is preparing for talks to fail.",
    choices: [
      { label: "Acknowledge and recommit", effects: { trust: +4, pressure: +1, risk: -1, verify: +2 }, note: "Owning the mess limits fallout." },
      { label: "Deny everything", effects: { trust: -4, pressure: +2, risk: +2, verify: -3 }, note: "Narrative discipline strains credibility." },
      { label: "Launch internal inquiry", effects: { trust: +2, pressure: -1, risk: -1, verify: +4 }, note: "Process restores some confidence." }
    ]
  },
  {
    title: "Border Skirmish Rumor",
    text: "Unverified reports of a small clash trigger alarmist coverage.",
    choices: [
      { label: "Call for immediate fact-finding", effects: { trust: +3, pressure: 0, risk: -4, verify: +5 }, note: "Verification outpaces panic." },
      { label: "Mobilize defensive posture", effects: { trust: -3, pressure: +3, risk: +5, verify: 0 }, note: "Preparedness reassures some, scares others." },
      { label: "Ignore and focus on talks", effects: { trust: -1, pressure: -1, risk: +2, verify: -1 }, note: "Silence creates a vacuum others fill." }
    ]
  },
  {
    title: "Energy Market Shock",
    text: "Price spikes increase pressure from industry and consumers.",
    choices: [
      { label: "Fast-track temporary relief", effects: { trust: +3, pressure: -4, risk: -1, verify: 0 }, note: "Economic calm buys diplomatic space." },
      { label: "Hold line for leverage", effects: { trust: -3, pressure: +3, risk: +2, verify: +1 }, note: "Tough stance raises domestic heat." },
      { label: "Coordinate with allies on supply", effects: { trust: +2, pressure: -2, risk: -1, verify: +3 }, note: "Multilateral response reduces stress." }
    ]
  },
  {
    title: "Inspection Team Illness",
    text: "A health incident sidelines key inspectors, delaying verification visits.",
    choices: [
      { label: "Accept remote monitoring interim", effects: { trust: +2, pressure: 0, risk: -1, verify: +3 }, note: "Imperfect, but continuity matters." },
      { label: "Pause all verification talks", effects: { trust: -5, pressure: +2, risk: +3, verify: -5 }, note: "Delay fuels suspicion." },
      { label: "Deploy backup multinational team", effects: { trust: +4, pressure: +1, risk: -2, verify: +6 }, note: "Swift redundancy restores momentum." }
    ]
  },
  {
    title: "Rhetorical Misfire",
    text: "An offhand comment from a senior official is interpreted as a threat.",
    choices: [
      { label: "Issue rapid clarification", effects: { trust: +3, pressure: -1, risk: -3, verify: +1 }, note: "Damage control mostly works." },
      { label: "Double down for domestic optics", effects: { trust: -4, pressure: +2, risk: +4, verify: -1 }, note: "Applause at home, distrust abroad." },
      { label: "Use private apology via mediator", effects: { trust: +5, pressure: 0, risk: -2, verify: +2 }, note: "Quiet humility keeps talks alive." }
    ]
  },
  {
    title: "UN Emergency Session",
    text: "Global attention forces both sides to signal intent in public.",
    choices: [
      { label: "Present concrete roadmap", effects: { trust: +6, pressure: +1, risk: -2, verify: +5 }, note: "Specifics improve confidence." },
      { label: "Deliver hardline speech", effects: { trust: -5, pressure: +3, risk: +4, verify: -1 }, note: "Crowd-pleasing words raise stakes." },
      { label: "Request closed-door follow-up", effects: { trust: +2, pressure: -1, risk: -1, verify: +2 }, note: "Lower heat, slower headlines." }
    ]
  },
  {
    title: "Verification Tech Breakthrough",
    text: "A new monitoring mechanism could verify commitments with less intrusion.",
    choices: [
      { label: "Pilot immediately", effects: { trust: +4, pressure: 0, risk: -2, verify: +8 }, note: "Technical confidence spikes." },
      { label: "Delay for legal review", effects: { trust: -1, pressure: +1, risk: +1, verify: +2 }, note: "Caution slows gains." },
      { label: "Reject as unreliable", effects: { trust: -4, pressure: +2, risk: +2, verify: -4 }, note: "Opportunity slips away." }
    ]
  },
  {
    title: "Proxy Incident",
    text: "A regional proxy group claims an attack neither side directly ordered.",
    choices: [
      { label: "Jointly condemn and deconflict", effects: { trust: +5, pressure: +1, risk: -6, verify: +1 }, note: "Shared restraint prevents cascade." },
      { label: "Threaten retaliation", effects: { trust: -4, pressure: +3, risk: +7, verify: -1 }, note: "Deterrence language pushes brinkmanship." },
      { label: "Wait for intelligence update", effects: { trust: +1, pressure: -1, risk: -2, verify: +3 }, note: "Patience avoids misfire." }
    ]
  },
  {
    title: "Draft Framework Arrives",
    text: "Negotiators circulate an outline that could lock in principles before details.",
    choices: [
      { label: "Sign framework principles", effects: { trust: +8, pressure: +2, risk: -2, verify: +3 }, note: "Momentum builds toward final day." },
      { label: "Request major rewrites", effects: { trust: -2, pressure: +2, risk: +1, verify: +1 }, note: "You seek better terms but lose time." },
      { label: "Accept with verification annex", effects: { trust: +6, pressure: +1, risk: -1, verify: +6 }, note: "Balanced move strengthens durability." }
    ]
  },
  {
    title: "Final-Day Ultimatum",
    text: "A public ultimatum demands a visible breakthrough within hours.",
    choices: [
      { label: "Offer limited interim accord", effects: { trust: +5, pressure: -1, risk: -2, verify: +2 }, note: "Not a full deal, but enough to keep talks alive." },
      { label: "Reject brinkmanship", effects: { trust: -4, pressure: +3, risk: +4, verify: 0 }, note: "Principled stance, dangerous timing." },
      { label: "Counter with synchronized concessions", effects: { trust: +7, pressure: +1, risk: -3, verify: +4 }, note: "A risky package lands better than expected." }
    ]
  }
];

const state = {
  day: 1,
  trust: 50,
  pressure: 35,
  risk: 25,
  verify: 40,
  chosenEvents: [],
  picks: { pressureLean: 0, trustLean: 0, verifyLean: 0, riskLean: 0 },
  locked: false,
};

const ui = {
  screens: {
    title: document.getElementById("title-screen"),
    game: document.getElementById("game-screen"),
    end: document.getElementById("end-screen"),
  },
  tutorial: document.getElementById("tutorial"),
  day: document.getElementById("day"),
  clock: document.getElementById("clock"),
  eventTitle: document.getElementById("event-title"),
  eventText: document.getElementById("event-text"),
  choices: document.getElementById("choices"),
  resultText: document.getElementById("result-text"),
  nextBtn: document.getElementById("next-btn"),
  startBtn: document.getElementById("start-btn"),
  restartBtn: document.getElementById("restart-btn"),
  closeTutorial: document.getElementById("close-tutorial"),
  copyBtn: document.getElementById("copy-btn"),
  shareText: document.getElementById("share-text"),
  endingLabel: document.getElementById("ending-label"),
  endingText: document.getElementById("ending-text"),
  priorityText: document.getElementById("priority-text"),
  bars: {
    trust: document.getElementById("trust-bar"),
    pressure: document.getElementById("pressure-bar"),
    risk: document.getElementById("risk-bar"),
    verify: document.getElementById("verify-bar"),
  },
  vals: {
    trust: document.getElementById("trust-val"),
    pressure: document.getElementById("pressure-val"),
    risk: document.getElementById("risk-val"),
    verify: document.getElementById("verify-val"),
  },
};

let tickTimer;

function clamp(value) {
  return Math.max(0, Math.min(100, value));
}

function switchScreen(name) {
  Object.values(ui.screens).forEach((s) => s.classList.remove("active"));
  ui.screens[name].classList.add("active");
}

function shuffledDeck() {
  const copy = [...events];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, DAYS);
}

function renderMeters() {
  ["trust", "pressure", "risk", "verify"].forEach((key) => {
    ui.bars[key].style.width = `${state[key]}%`;
    ui.vals[key].textContent = state[key];
  });
}

function playTick() {
  const context = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.type = "square";
  oscillator.frequency.value = state.day > 7 ? 760 : 540;
  gain.gain.value = 0.015;
  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start();
  oscillator.stop(context.currentTime + 0.07);
}

function updateClock() {
  const daysLeft = DAYS - state.day + 1;
  ui.clock.textContent = `${daysLeft} day${daysLeft === 1 ? "" : "s"} left`;
}

function meterImpactText(effects) {
  return Object.entries(effects)
    .map(([k, v]) => `${k} ${v > 0 ? `+${v}` : v}`)
    .join(", ");
}

function applyChoice(choice) {
  if (state.locked) {
    return;
  }
  state.locked = true;
  clearInterval(tickTimer);

  ["trust", "pressure", "risk", "verify"].forEach((key) => {
    state[key] = clamp(state[key] + choice.effects[key]);
  });

  state.picks.pressureLean += choice.effects.pressure;
  state.picks.trustLean += choice.effects.trust;
  state.picks.verifyLean += choice.effects.verify;
  state.picks.riskLean += choice.effects.risk;

  const impact = meterImpactText(choice.effects);
  ui.resultText.textContent = `${choice.note} (${impact})`;
  renderMeters();

  if (state.risk >= 90) {
    finishGame("Rapid Escalation", "An incident spiraled beyond diplomacy before the deadline.");
    return;
  }

  if (state.pressure >= 95 && state.trust < 45) {
    finishGame("Talks Collapse", "Domestic pressure crushed room for compromise.");
    return;
  }

  ui.nextBtn.hidden = false;
}

function renderDay() {
  state.locked = false;
  ui.nextBtn.hidden = true;
  ui.day.textContent = state.day;
  updateClock();

  const event = state.chosenEvents[state.day - 1];
  ui.eventTitle.textContent = event.title;
  ui.eventText.textContent = event.text;
  ui.resultText.textContent = "Make your move.";

  ui.choices.innerHTML = "";
  event.choices.forEach((choice) => {
    const btn = document.createElement("button");
    btn.className = "choice";
    btn.textContent = choice.label;
    btn.addEventListener("click", () => applyChoice(choice));
    ui.choices.appendChild(btn);
  });

  tickTimer = setInterval(playTick, 1300);
}

function dominantStyle() {
  const dimensions = [
    ["Pressure-heavy", state.picks.pressureLean],
    ["Trust-building", state.picks.trustLean],
    ["Verification-focused", state.picks.verifyLean],
    ["Risk-escalating", state.picks.riskLean],
  ];
  dimensions.sort((a, b) => Math.abs(b[1]) - Math.abs(a[1]));
  return dimensions[0][0];
}

function determineEnding() {
  if (state.risk >= 80) {
    return ["Brink Spiral", "A near-accord was overtaken by military risk and mutual fear."];
  }
  if (state.trust >= 75 && state.verify >= 65 && state.risk <= 45 && state.pressure <= 70) {
    return ["Framework Deal", "You landed a credible framework before Day 10 expired."];
  }
  if (state.trust >= 62 && state.verify >= 55 && state.risk <= 60) {
    return ["Fragile Deal", "A deal emerged, but it relies on careful follow-through."];
  }
  if (state.trust >= 50 && state.risk <= 70) {
    return ["Face-saving Pause", "No full deal, but both sides stepped back from the brink."];
  }
  if (state.verify < 40 && state.trust >= 45) {
    return ["Frozen Conflict", "Intent was present, but commitments lacked credible verification."];
  }
  return ["Deadline Missed", "The clock ran out before enough progress was made."];
}

function finishGame(label, text) {
  clearInterval(tickTimer);
  const [endingLabel, endingText] = label ? [label, text] : determineEnding();
  ui.endingLabel.textContent = endingLabel;
  ui.endingText.textContent = endingText;
  ui.priorityText.textContent = `Your style: ${dominantStyle()}. Final meters — Trust ${state.trust}, Pressure ${state.pressure}, Risk ${state.risk}, Verification ${state.verify}.`;

  ui.shareText.value = `I got \"${endingLabel}\" in Deadline Diplomacy: 10 Days. Style: ${dominantStyle()}. Final T/P/R/V: ${state.trust}/${state.pressure}/${state.risk}/${state.verify}.`;

  switchScreen("end");
}

function nextDay() {
  state.day += 1;
  if (state.day > DAYS) {
    finishGame();
    return;
  }
  renderDay();
}

function resetState() {
  state.day = 1;
  state.trust = 50;
  state.pressure = 35;
  state.risk = 25;
  state.verify = 40;
  state.picks = { pressureLean: 0, trustLean: 0, verifyLean: 0, riskLean: 0 };
  state.chosenEvents = shuffledDeck();
  renderMeters();
}

function startGame() {
  resetState();
  switchScreen("game");
  renderDay();

  if (!localStorage.getItem("deadline-diplomacy-tutorial-seen")) {
    ui.tutorial.hidden = false;
    localStorage.setItem("deadline-diplomacy-tutorial-seen", "1");
  }
}

ui.startBtn.addEventListener("click", startGame);
ui.restartBtn.addEventListener("click", startGame);
ui.nextBtn.addEventListener("click", nextDay);
ui.closeTutorial.addEventListener("click", () => {
  ui.tutorial.hidden = true;
});

ui.copyBtn.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(ui.shareText.value);
    ui.copyBtn.textContent = "Copied!";
    setTimeout(() => {
      ui.copyBtn.textContent = "Copy Share Text";
    }, 1200);
  } catch {
    ui.shareText.select();
    document.execCommand("copy");
  }
});

switchScreen("title");
renderMeters();

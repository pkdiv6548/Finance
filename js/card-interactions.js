/* Cursor-tracked card spotlight. Delegated listeners support dynamically rendered Finance pages. */
(() => {
  const selector = ".main .panel, .main .stat-card, .main .tx-stat, .main .goal-item, .main .chart-card, .main .summary-card, .main .metric-card, .main .card";
  let activeCard = null;
  const move = (event) => {
    if (event.pointerType === "touch") return;
    const card = event.target.closest?.(selector);
    if (activeCard && activeCard !== card) {
      activeCard.style.removeProperty("--finance-card-spot-x");
      activeCard.style.removeProperty("--finance-card-spot-y");
    }
    activeCard = card || null;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--finance-card-spot-x", ((event.clientX - rect.left) / rect.width * 100) + "%");
    card.style.setProperty("--finance-card-spot-y", ((event.clientY - rect.top) / rect.height * 100) + "%");
  };
  document.addEventListener("pointermove", move, { passive: true });
  document.addEventListener("pointerleave", () => {
    if (activeCard) {
      activeCard.style.removeProperty("--finance-card-spot-x");
      activeCard.style.removeProperty("--finance-card-spot-y");
      activeCard = null;
    }
  }, true);
})();
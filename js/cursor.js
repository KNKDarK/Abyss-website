const cursor = document.querySelector('.cursor');
const cursorDot = document.querySelector('.cursor-dot');
const cursorGlow = document.querySelector('.cursor-glow');

if (!cursor) {
  console.warn('Cursor elements not found');
}

function createBlackHoleProtonSVG() {
  const svgNS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('viewBox', '0 0 100 100');
  svg.setAttribute('width', '36');
  svg.setAttribute('height', '36');

  const defs = document.createElementNS(svgNS, 'defs');
  const grad = document.createElementNS(svgNS, 'radialGradient');
  grad.setAttribute('id', 'bhGrad');
  grad.setAttribute('cx', '35%');
  grad.setAttribute('cy', '35%');
  const stop1 = document.createElementNS(svgNS, 'stop');
  stop1.setAttribute('offset', '0%');
  stop1.setAttribute('stop-color', '#1a0033');
  const stop2 = document.createElementNS(svgNS, 'stop');
  stop2.setAttribute('offset', '45%');
  stop2.setAttribute('stop-color', '#000');
  const stop3 = document.createElementNS(svgNS, 'stop');
  stop3.setAttribute('offset', '100%');
  stop3.setAttribute('stop-color', '#000');
  grad.appendChild(stop1);
  grad.appendChild(stop2);
  grad.appendChild(stop3);
  defs.appendChild(grad);
  svg.appendChild(defs);

  const outerGlow = document.createElementNS(svgNS, 'circle');
  outerGlow.setAttribute('cx', '50');
  outerGlow.setAttribute('cy', '50');
  outerGlow.setAttribute('r', '44');
  outerGlow.setAttribute('fill', 'none');
  outerGlow.setAttribute('stroke', 'rgba(139,106,255,0.15)');
  outerGlow.setAttribute('stroke-width', '6');

  const eventHorizon = document.createElementNS(svgNS, 'circle');
  eventHorizon.setAttribute('cx', '50');
  eventHorizon.setAttribute('cy', '50');
  eventHorizon.setAttribute('r', '16');
  eventHorizon.setAttribute('fill', 'url(#bhGrad)');

  const innerAccretion = document.createElementNS(svgNS, 'circle');
  innerAccretion.setAttribute('cx', '50');
  innerAccretion.setAttribute('cy', '50');
  innerAccretion.setAttribute('r', '13');
  innerAccretion.setAttribute('fill', 'none');
  innerAccretion.setAttribute('stroke', 'rgba(139,106,255,0.2)');
  innerAccretion.setAttribute('stroke-width', '2');

  const ringGroup = document.createElementNS(svgNS, 'g');
  ringGroup.setAttribute('class', 'proton-ring');

  const ringTrack = document.createElementNS(svgNS, 'circle');
  ringTrack.setAttribute('cx', '50');
  ringTrack.setAttribute('cy', '50');
  ringTrack.setAttribute('r', '30');
  ringTrack.setAttribute('fill', 'none');
  ringTrack.setAttribute('stroke', 'rgba(139,106,255,0.35)');
  ringTrack.setAttribute('stroke-width', '1.5');
  ringTrack.setAttribute('stroke-dasharray', '3 6');
  ringGroup.appendChild(ringTrack);

  const positions = [
    [50, 20], [50, 80], [20, 50], [80, 50],
    [28.5, 28.5], [71.5, 28.5], [28.5, 71.5], [71.5, 71.5]
  ];
  positions.forEach(([cx, cy], i) => {
    const dot = document.createElementNS(svgNS, 'circle');
    dot.setAttribute('cx', cx);
    dot.setAttribute('cy', cy);
    dot.setAttribute('r', i < 4 ? '2.5' : '1.8');
    dot.setAttribute('fill', i < 4 ? '#c8b0ff' : 'rgba(200,176,255,0.5)');
    ringGroup.appendChild(dot);
  });

  const singularity = document.createElementNS(svgNS, 'circle');
  singularity.setAttribute('cx', '50');
  singularity.setAttribute('cy', '50');
  singularity.setAttribute('r', '3');
  singularity.setAttribute('fill', '#c8b0ff');

  svg.appendChild(outerGlow);
  svg.appendChild(eventHorizon);
  svg.appendChild(innerAccretion);
  svg.appendChild(ringGroup);
  svg.appendChild(singularity);
  return svg;
}

if (cursor) {
  cursor.appendChild(createBlackHoleProtonSVG());
}

const state = {
  x: 0, y: 0,
  dotX: 0, dotY: 0,
  glowX: 0, glowY: 0,
  isVisible: true,
  isHovering: false,
};

document.addEventListener('mousemove', (e) => {
  state.x = e.clientX;
  state.y = e.clientY;
  state.isVisible = true;
});

document.addEventListener('mouseleave', () => {
  state.isVisible = false;
});

document.addEventListener('mouseenter', () => {
  state.isVisible = true;
});

const hoverTargets = 'a, button, .btn, .team-member, .project-card, .extra-card, .side-item, .snap-dot, .terminal-toggle, .terminal-close, input, select, textarea, [role="button"]';

document.addEventListener('mouseover', (e) => {
  if (e.target.closest(hoverTargets)) {
    state.isHovering = true;
  }
});

document.addEventListener('mouseout', (e) => {
  if (e.target.closest(hoverTargets)) {
    state.isHovering = false;
  }
});

function updateCursor() {
  if (!cursor || !cursorDot || !cursorGlow) {
    requestAnimationFrame(updateCursor);
    return;
  }

  state.dotX += (state.x - state.dotX) * 0.3;
  state.dotY += (state.y - state.dotY) * 0.3;
  state.glowX += (state.x - state.glowX) * 0.08;
  state.glowY += (state.y - state.glowY) * 0.08;

  cursor.style.transform = `translate(${state.x}px, ${state.y}px) translate(-50%, -50%) scale(${state.isHovering ? 1.5 : 1})`;
  cursor.style.opacity = state.isVisible ? 1 : 0;

  cursorDot.style.transform = `translate(${state.dotX}px, ${state.dotY}px) translate(-50%, -50%)`;
  cursorDot.style.opacity = state.isVisible ? 1 : 0;

  cursorGlow.style.transform = `translate(${state.glowX}px, ${state.glowY}px) translate(-50%, -50%)`;
  cursorGlow.style.opacity = state.isVisible ? (state.isHovering ? 0.8 : 0.4) : 0;

  if (state.isHovering) {
    cursor.classList.add('cursor-hover');
  } else {
    cursor.classList.remove('cursor-hover');
  }

  requestAnimationFrame(updateCursor);
}

updateCursor();

export { state };

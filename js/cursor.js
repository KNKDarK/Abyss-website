const cursor = document.querySelector('.cursor');
const cursorDot = document.querySelector('.cursor-dot');
const cursorGlow = document.querySelector('.cursor-glow');

if (!cursor) {
  console.warn('Cursor elements not found');
}

const state = {
  x: 0, y: 0,
  dotX: 0, dotY: 0,
  glowX: 0, glowY: 0,
  isVisible: true,
  isHovering: false,
};

function createDevilCursorSVG() {
  const svgNS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('viewBox', '0 0 100 100');
  svg.setAttribute('width', '32');
  svg.setAttribute('height', '32');

  const pentagram = document.createElementNS(svgNS, 'path');
  pentagram.setAttribute('d', 'M50 5 L63 38 L98 38 L70 60 L79 95 L50 75 L21 95 L30 60 L2 38 L37 38 Z');
  pentagram.setAttribute('fill', 'none');
  pentagram.setAttribute('stroke', '#6c3bff');
  pentagram.setAttribute('stroke-width', '3');
  pentagram.setAttribute('stroke-linejoin', 'round');

  const circle = document.createElementNS(svgNS, 'circle');
  circle.setAttribute('cx', '50');
  circle.setAttribute('cy', '50');
  circle.setAttribute('r', '43');
  circle.setAttribute('fill', 'none');
  circle.setAttribute('stroke', '#6c3bff');
  circle.setAttribute('stroke-width', '2');
  circle.setAttribute('opacity', '0.5');

  const innerCircle = document.createElementNS(svgNS, 'circle');
  innerCircle.setAttribute('cx', '50');
  innerCircle.setAttribute('cy', '50');
  innerCircle.setAttribute('r', '8');
  innerCircle.setAttribute('fill', '#6c3bff');
  innerCircle.setAttribute('opacity', '0.8');

  svg.appendChild(pentagram);
  svg.appendChild(circle);
  svg.appendChild(innerCircle);
  return svg;
}

if (cursor) {
  cursor.appendChild(createDevilCursorSVG());
}

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

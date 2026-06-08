import * as THREE from 'three';

const canvas = document.getElementById('particle-canvas');
if (!canvas) throw new Error('Particle canvas not found');

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas,
  alpha: true,
  antialias: true,
  powerPreference: 'high-performance'
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;

const PARTICLE_COUNT = 6000;
const SPREAD = 60;
const LAYERS = 3;

const particleSystems = [];
const layerData = [];

function createParticleTexture() {
  const c = document.createElement('canvas');
  c.width = 64; c.height = 64;
  const ctx = c.getContext('2d');
  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, 'rgba(255,255,255,1)');
  gradient.addColorStop(0.15, 'rgba(255,255,255,0.9)');
  gradient.addColorStop(0.4, 'rgba(108,59,255,0.6)');
  gradient.addColorStop(1, 'rgba(108,59,255,0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(c);
}

const particleTexture = createParticleTexture();

for (let layer = 0; layer < LAYERS; layer++) {
  const count = PARTICLE_COUNT - layer * 1000;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const origPositions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const sizes = new Float32Array(count);

  const zSpread = SPREAD * (0.5 + layer * 0.25);

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = 5 + Math.random() * SPREAD * (0.5 + layer * 0.3);

    const x = r * Math.sin(phi) * Math.cos(theta);
    const y = r * Math.sin(phi) * Math.sin(theta) * 0.6;
    const z = r * Math.cos(phi) * (0.5 + layer * 0.25);

    positions[i3] = x;
    positions[i3 + 1] = y;
    positions[i3 + 2] = z;
    origPositions[i3] = x;
    origPositions[i3 + 1] = y;
    origPositions[i3 + 2] = z;

    const red = 0.3 + Math.random() * 0.3;
    const green = 0.2 + Math.random() * 0.3;
    const blue = 0.7 + Math.random() * 0.3;
    colors[i3] = red;
    colors[i3 + 1] = green * (0.5 + layer * 0.2);
    colors[i3 + 2] = blue * (0.8 - layer * 0.15);
    sizes[i] = (0.08 + Math.random() * 0.25) * (1 - layer * 0.15);
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

  const material = new THREE.PointsMaterial({
    size: 0.18 - layer * 0.03,
    map: particleTexture,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    transparent: true,
    vertexColors: true,
    opacity: 0.8 - layer * 0.15,
    sizeAttenuation: true,
  });

  const points = new THREE.Points(geometry, material);
  scene.add(points);
  particleSystems.push(points);
  layerData.push({ origPositions, count });
}

camera.position.z = 25;

const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
const cursor3D = new THREE.Vector3();

document.addEventListener('mousemove', (e) => {
  mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
});

const REPULSE_RADIUS = 8;
const REPULSE_STRENGTH = 2.5;

function animate() {
  requestAnimationFrame(animate);

  mouse.x += (mouse.targetX - mouse.x) * 0.08;
  mouse.y += (mouse.targetY - mouse.y) * 0.08;

  const time = performance.now() / 1000;

  particleSystems.forEach((system, idx) => {
    system.rotation.y += 0.0005 + idx * 0.0001;
    system.rotation.x += 0.0002;

    const pos = system.geometry.attributes.position.array;
    const orig = layerData[idx].origPositions;

    cursor3D.set(mouse.x * SPREAD * 0.3, mouse.y * SPREAD * 0.3, 0);

    for (let i = 0; i < layerData[idx].count; i++) {
      const i3 = i * 3;

      let px = orig[i3];
      let py = orig[i3 + 1];
      let pz = orig[i3 + 2];

      px += Math.sin(time * 0.5 + i * 0.01) * 0.002;
      py += Math.cos(time * 0.3 + i * 0.01) * 0.002;
      pz += Math.sin(time * 0.4 + i * 0.015) * 0.001;

      const dx = px - cursor3D.x;
      const dy = py - cursor3D.y;
      const dz = pz - cursor3D.z;
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

      if (dist < REPULSE_RADIUS && dist > 0.01) {
        const force = ((REPULSE_RADIUS - dist) / REPULSE_RADIUS) * REPULSE_STRENGTH;
        const norm = 1 / dist;
        px += dx * norm * force;
        py += dy * norm * force;
        pz += dz * norm * force;
      }

      pos[i3] = px;
      pos[i3 + 1] = py;
      pos[i3 + 2] = pz;
    }
    system.geometry.attributes.position.needsUpdate = true;
  });

  renderer.render(scene, camera);
}

animate();

let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  }, 200);
});

export { scene, camera, renderer };

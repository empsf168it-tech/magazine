import * as THREE from 'three';
import { getAssetUrl } from '../utils/assets.js';

export function createThreeHeroMagazine(containerEl, coverImgPath = 'assets/vanta_cover_024.png') {
  if (!containerEl) return null;

  // Clear existing canvas if any
  containerEl.innerHTML = '';

  const width = containerEl.clientWidth || 450;
  const height = containerEl.clientHeight || 550;

  // 1. Scene, Camera, Renderer
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
  camera.position.set(0, 0, 8);

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  containerEl.appendChild(renderer.domElement);

  // 2. Textures Creation
  const textureLoader = new THREE.TextureLoader();
  const frontTexture = textureLoader.load(getAssetUrl(coverImgPath));
  frontTexture.colorSpace = THREE.SRGBColorSpace;

  // Helper canvas for Spine & Pages textures
  const spineCanvas = document.createElement('canvas');
  spineCanvas.width = 128;
  spineCanvas.height = 1024;
  const ctx = spineCanvas.getContext('2d');
  ctx.fillStyle = '#0a0a0a';
  ctx.fillRect(0, 0, 128, 1024);
  ctx.fillStyle = '#c9a96e';
  ctx.font = 'bold 28px sans-serif';
  ctx.textAlign = 'center';
  ctx.save();
  ctx.translate(64, 512);
  ctx.rotate(-Math.PI / 2);
  ctx.fillText('VANTA • VOL. 12 ISSUE 024', 0, 10);
  ctx.restore();

  const spineTexture = new THREE.CanvasTexture(spineCanvas);

  // Helper canvas for Page stack edge texture
  const pagesCanvas = document.createElement('canvas');
  pagesCanvas.width = 256;
  pagesCanvas.height = 256;
  const pCtx = pagesCanvas.getContext('2d');
  pCtx.fillStyle = '#e8e4dc';
  pCtx.fillRect(0, 0, 256, 256);
  pCtx.fillStyle = '#d5d0c4';
  for (let i = 0; i < 256; i += 4) {
    pCtx.fillRect(0, i, 256, 1);
  }
  const pagesTexture = new THREE.CanvasTexture(pagesCanvas);

  // 3. Materials
  const frontMaterial = new THREE.MeshStandardMaterial({
    map: frontTexture,
    roughness: 0.25,
    metalness: 0.1,
  });

  const spineMaterial = new THREE.MeshStandardMaterial({
    map: spineTexture,
    roughness: 0.4,
    metalness: 0.2,
  });

  const pagesMaterial = new THREE.MeshStandardMaterial({
    map: pagesTexture,
    roughness: 0.8,
  });

  const backMaterial = new THREE.MeshStandardMaterial({
    color: 0x0c0c0c,
    roughness: 0.3,
    metalness: 0.1,
  });

  // Material array: [right, left(spine), top, bottom, front, back]
  const magazineMaterials = [
    pagesMaterial, // Right
    spineMaterial, // Left / Spine
    pagesMaterial, // Top
    pagesMaterial, // Bottom
    frontMaterial, // Front cover
    backMaterial,  // Back cover
  ];

  // 4. Geometry & Mesh
  const boxGeometry = new THREE.BoxGeometry(2.7, 3.6, 0.22);
  const magazineMesh = new THREE.Mesh(boxGeometry, magazineMaterials);
  magazineMesh.castShadow = true;
  magazineMesh.receiveShadow = true;
  scene.add(magazineMesh);

  // Soft Drop Shadow Plane
  const shadowGeo = new THREE.PlaneGeometry(4.5, 4.5);
  const shadowCanvas = document.createElement('canvas');
  shadowCanvas.width = 256;
  shadowCanvas.height = 256;
  const sCtx = shadowCanvas.getContext('2d');
  const gradient = sCtx.createRadialGradient(128, 128, 10, 128, 128, 120);
  gradient.addColorStop(0, 'rgba(0, 0, 0, 0.7)');
  gradient.addColorStop(0.5, 'rgba(0, 0, 0, 0.3)');
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
  sCtx.fillStyle = gradient;
  sCtx.fillRect(0, 0, 256, 256);

  const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
  const shadowMat = new THREE.MeshBasicMaterial({
    map: shadowTexture,
    transparent: true,
    opacity: 0.7,
    depthWrite: false,
  });
  const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
  shadowMesh.position.set(0, -2.1, -0.3);
  shadowMesh.rotation.x = -Math.PI / 2.2;
  scene.add(shadowMesh);

  // 5. Lighting Setup
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
  scene.add(ambientLight);

  const mainLight = new THREE.DirectionalLight(0xfff8ee, 2.5);
  mainLight.position.set(4, 5, 5);
  mainLight.castShadow = true;
  mainLight.shadow.mapSize.width = 1024;
  mainLight.shadow.mapSize.height = 1024;
  scene.add(mainLight);

  const goldRimLight = new THREE.PointLight(0xc9a96e, 2.0, 10);
  goldRimLight.position.set(-3, -2, 3);
  scene.add(goldRimLight);

  // 6. Interactive Mouse Tracking & Smooth Lerp
  let mouseX = 0;
  let mouseY = 0;
  let targetRotX = 0;
  let targetRotY = 0.15;
  let targetScale = 1.0;
  let targetZ = 0;

  const isMobile = window.innerWidth <= 768;

  function onMouseMove(e) {
    if (isMobile) return;
    const rect = containerEl.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    // Mouse interaction intensity limits: rotateX ±4deg (0.07rad), rotateY ±6deg (0.10rad)
    targetRotX = -y * 0.14;
    targetRotY = x * 0.2 + 0.15;
    targetScale = 1.03;
    targetZ = 0.25;
  }

  function onMouseLeave() {
    targetRotX = 0;
    targetRotY = 0.15;
    targetScale = 1.0;
    targetZ = 0;
  }

  containerEl.addEventListener('mousemove', onMouseMove);
  containerEl.addEventListener('mouseleave', onMouseLeave);

  // 7. Animation Loop
  const clock = new THREE.Clock();
  let animationFrameId = null;

  function animate() {
    animationFrameId = requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();

    // Idle sinusoidal floating movement
    const idleY = Math.sin(elapsedTime * 1.4) * 0.06;
    const idleRotZ = Math.sin(elapsedTime * 1.0) * 0.015;

    // Smooth Lerp
    magazineMesh.rotation.x += (targetRotX - magazineMesh.rotation.x) * 0.08;
    magazineMesh.rotation.y += (targetRotY - magazineMesh.rotation.y) * 0.08;
    magazineMesh.rotation.z += (idleRotZ - magazineMesh.rotation.z) * 0.08;

    magazineMesh.position.y += (idleY - magazineMesh.position.y) * 0.08;
    magazineMesh.position.z += (targetZ - magazineMesh.position.z) * 0.08;

    const currentScale = magazineMesh.scale.x;
    const newScale = currentScale + (targetScale - currentScale) * 0.08;
    magazineMesh.scale.set(newScale, newScale, newScale);

    renderer.render(scene, camera);
  }

  animate();

  // Resize handler
  function onResize() {
    if (!containerEl) return;
    const newW = containerEl.clientWidth || width;
    const newH = containerEl.clientHeight || height;
    camera.aspect = newW / newH;
    camera.updateProjectionMatrix();
    renderer.setSize(newW, newH);
  }

  window.addEventListener('resize', onResize);

  // Cleanup
  return {
    destroy: () => {
      cancelAnimationFrame(animationFrameId);
      containerEl.removeEventListener('mousemove', onMouseMove);
      containerEl.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      boxGeometry.dispose();
    }
  };
}

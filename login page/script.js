import * as THREE from 'three';

// Configuration
const PARTICLE_COUNT = 1500;
const PARTICLE_SIZE = 0.05;
const FIELD_SIZE = 15;

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg-canvas'),
    antialias: true,
    alpha: true
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 5;

// Geometry: Floating Stars/Particles
const particlesGeometry = new THREE.BufferGeometry();
const posArray = new Float32Array(PARTICLE_COUNT * 3);

for (let i = 0; i < PARTICLE_COUNT * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * FIELD_SIZE;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

// Material
const particlesMaterial = new THREE.PointsMaterial({
    size: PARTICLE_SIZE,
    color: 0x0071ff,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
});

// Mesh
const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

// Central Glow/Sphere (Subtle)
const sphereGeometry = new THREE.SphereGeometry(2, 32, 32);
const sphereMaterial = new THREE.MeshBasicMaterial({
    color: 0x0071ff,
    transparent: true,
    opacity: 0.05,
    wireframe: true
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphere);

// Interaction: Mouse Tracking
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX / window.innerWidth - 0.5);
    mouseY = (event.clientY / window.innerHeight - 0.5);
});

// Resize handler
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animation loop
const clock = new THREE.Clock();

function animate() {
    const elapsedTime = clock.getElapsedTime();

    // Rotation and mouse drift
    particlesMesh.rotation.y = elapsedTime * 0.05;
    particlesMesh.rotation.x = elapsedTime * 0.02;

    particlesMesh.position.x += (mouseX * 0.5 - particlesMesh.position.x) * 0.05;
    particlesMesh.position.y += (-mouseY * 0.5 - particlesMesh.position.y) * 0.05;

    // Pulse sphere
    sphere.rotation.y = elapsedTime * 0.1;
    sphere.scale.setScalar(1 + Math.sin(elapsedTime * 0.5) * 0.1);

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();

// Form Interaction
const loginForm = document.querySelector('.login-container');
const loginBtn = document.querySelector('.login-btn');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Premium loading state
    loginBtn.disabled = true;
    loginBtn.innerHTML = '<span class="loader"></span> Signing In...';
    loginBtn.style.opacity = '0.7';
    loginBtn.style.cursor = 'not-allowed';

    // Simulate API call
    setTimeout(() => {
        alert('Login successful! (Simulated)');
        loginBtn.disabled = false;
        loginBtn.innerHTML = 'Sign In';
        loginBtn.style.opacity = '1';
        loginBtn.style.cursor = 'pointer';
    }, 2000);
});

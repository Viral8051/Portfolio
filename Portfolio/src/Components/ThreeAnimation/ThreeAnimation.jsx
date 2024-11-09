import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const ThreeAnimation = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Set up scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Add more lighting for a brighter look
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xffffff, 1.5, 100);
    pointLight.position.set(2, 3, 2);
    scene.add(pointLight);

    const hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x444444, 0.7);
    hemisphereLight.position.set(0, 10, 0);
    scene.add(hemisphereLight);

    // Load the GLTF model
    const loader = new GLTFLoader();
    loader.load(
      '/model/scene.gltf',
      (gltf) => {
        gltf.scene.scale.set(0.5, 0.5, 0.5);
        gltf.scene.position.set(-1, -0.2, 0);
        // Set the rotation to adjust the direction
        gltf.scene.rotation.set( 0,4.7,0);
        scene.add(gltf.scene);
      },
      undefined,
      (error) => {
        console.error('An error occurred while loading the model:', error);
      }
    );

    // Set the camera position
    camera.position.z = 1;

    // Initialize OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.screenSpacePanning = false;
    controls.maxPolarAngle = Math.PI / 3;
    controls.enableZoom = true;

    // Set minimum and maximum zoom distances
    controls.minDistance = 3.5; // The camera will not get closer than this value
    controls.maxDistance = 4; // The camera will not zoom out farther than this value

    // Animation function
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize for responsiveness
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />;
};

export default ThreeAnimation;

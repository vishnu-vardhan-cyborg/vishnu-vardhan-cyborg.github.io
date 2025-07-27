import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { gsap } from 'gsap';

const AsteroidCube = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const initialCameraPosition = new THREE.Vector3(0, 0, 80);
    const initialTarget = new THREE.Vector3(0, 0, 0);
    camera.position.copy(initialCameraPosition);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mount.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enableZoom = false;
    controls.target.copy(initialTarget);

    scene.add(new THREE.AmbientLight(0xffffff, 3.5));
    const pointLight = new THREE.PointLight(0xffffff, 3, 100);
    pointLight.position.set(0, 0, 0);
    scene.add(pointLight);

    // Geometry
    const boxSize = 22;
    const geometry = new THREE.BoxGeometry(boxSize, boxSize, boxSize, 50, 50, 50);

    // Shader Material: Black with animated silver cracks
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        baseColor: { value: new THREE.Color(0x000000) },
crackColor: { value: new THREE.Color('#FFFFFF') },      },
      vertexShader: `
        varying vec3 vPos;
        void main() {
          vPos = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vPos;
        uniform float time;
        uniform vec3 baseColor;
        uniform vec3 crackColor;

        float crackPattern(vec3 p) {
          p *= 4.0;
          float line = abs(sin(p.x * 10.0 + time)) 
                     + abs(sin(p.y * 10.0 + time * 0.8)) 
                     + abs(sin(p.z * 10.0 - time * 0.6));
          return smoothstep(1.2, 0.25, line);
        }

        void main() {
          float crack = crackPattern(vPos);
          vec3 color = mix(baseColor, crackColor, crack);
          gl_FragColor = vec4(color, 1.0);
        }
      `,
    });

    const brokenCube = new THREE.Mesh(geometry, material);
    const originalRotation = new THREE.Euler(Math.PI / 4, Math.PI / 4, 0);
    brokenCube.rotation.copy(originalRotation);
    scene.add(brokenCube);

    // Ring of text
    const loader = new FontLoader();
    loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', (font) => {
      const ringGroup = new THREE.Group();
      const textMaterial = new THREE.MeshBasicMaterial({ color: 0xc0c0c0 });
      const texts = ['REACT', 'HTML', 'CSS', 'JS'];
      const radius = 30;
      const count = 16;

      const textOptions = {
        font,
        size: 2.2,
        height: 0.4,
        curveSegments: 8,
        bevelEnabled: false,
      };

      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2;
        const word = texts[i % texts.length];
        const textGeo = new TextGeometry(word, textOptions);
        textGeo.center();

        const mesh = new THREE.Mesh(textGeo, textMaterial);
        mesh.position.set(Math.cos(angle) * radius, 0, Math.sin(angle) * radius);
        mesh.lookAt(mesh.position.clone().multiplyScalar(2));
        ringGroup.add(mesh);
      }

      scene.add(ringGroup);

      const animate = () => {
        requestAnimationFrame(animate);
        ringGroup.rotation.y += 0.004;
        ringGroup.rotation.z += 0.001;
        brokenCube.rotation.y -= 0.001;
        brokenCube.rotation.z -= 0.001;

        material.uniforms.time.value = performance.now() * 0.001;

        controls.update();
        renderer.render(scene, camera);
      };

      animate();
    });

    // Reset view
    const resetView = () => {
      controls.enabled = false;

      gsap.to(brokenCube.rotation, {
        x: originalRotation.x,
        y: originalRotation.y,
        z: originalRotation.z,
        duration: 5.8,
        ease: 'sine.out',
      });

      gsap.to(camera.position, {
        x: initialCameraPosition.x,
        y: initialCameraPosition.y,
        z: initialCameraPosition.z,
        duration: 5.8,
        ease: 'sine.out',
        onUpdate: () => controls.update(),
      });

      gsap.to(controls.target, {
        x: initialTarget.x,
        y: initialTarget.y,
        z: initialTarget.z,
        duration: 5.8,
        ease: 'sine.out',
        onUpdate: () => controls.update(),
        onComplete: () => { controls.enabled = true; },
      });
    };

    let resetTimeout;
    controls.addEventListener('start', () => { if (resetTimeout) clearTimeout(resetTimeout); });
    controls.addEventListener('end', () => {
      resetTimeout = setTimeout(resetView, 20);
    });

    // Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (mount && renderer.domElement) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        width: '100%',
        height: '100vh',
        background: 'transparent',
        overflow: 'hidden',
        pointerEvents: 'auto',
        touchAction: 'none',
      }}
    />
  );
};

export default AsteroidCube;

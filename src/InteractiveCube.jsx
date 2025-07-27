import { Canvas, useFrame } from '@react-three/fiber';
import {
  ScrollControls,
  useScroll,
  Environment,
  MeshReflectorMaterial,
} from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { a, useSpring } from '@react-spring/three';
import './App.css';
import React, { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import ScrollSnapBlink from './blink/ScrollSnapBlink';

function GlowingCube({ rotationY }) {

  const videoTextures = useMemo(() => {
    return [0, 1, 2, 3].map((i) => {
      const video = document.createElement('video');
     video.src = `/videos/vid1.mp4`; // dynamic src
video.crossOrigin = 'anonymous';
video.loop = true;
video.muted = true;
video.playsInline = true;
video.load();
video.play().catch(() => {}); // force play if possible
      return new THREE.VideoTexture(video);
    });
  }, []);

  // 👇 Resume playback on interaction
  useEffect(() => {
  const forcePlay = () => {
    document.querySelectorAll('video').forEach((v) => {
      if (v.paused) v.play().catch(() => {});
    });
  };
  window.addEventListener('click', forcePlay);
  return () => window.removeEventListener('click', forcePlay);
}, []);


 

  const materials = useMemo(() => {
    return [
      new THREE.MeshStandardMaterial({ map: videoTextures[0], emissiveIntensity: 0.3 }), // right
      new THREE.MeshStandardMaterial({ map: videoTextures[1], emissiveIntensity: 0.3 }), // left
      new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 }), // top
      new THREE.MeshStandardMaterial({ color: '#000000' }), // bottom
      new THREE.MeshStandardMaterial({ map: videoTextures[2], emissiveIntensity: 0.3 }), // front
      new THREE.MeshStandardMaterial({ map: videoTextures[3], emissiveIntensity: 0.3 })  // back
    ];
  }, [videoTextures]);

  return (
    <a.group rotation-y={rotationY} position={[0, 0.2, 2]}>
      <mesh>
        <boxGeometry args={[2.2, 2.1, 2.2]} />
        {materials.map((mat, i) => (
          <primitive key={i} object={mat} attach={`material-${i}`} />
        ))}
      </mesh>
    </a.group>
  );
}

function ReflectiveGlass() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.97, 2.5]}>
      <planeGeometry args={[10, 10]} />
      <MeshReflectorMaterial
        transparent
        color="#000000ff"
        opacity={0.05}
        blur={[100, 400]}
        resolution={1024}
        mixStrength={1.5}
        mirror={1}
        depthScale={2.5}
        minDepthThreshold={0.1}
        maxDepthThreshold={2.5}
      />
    </mesh>
  );
}

function CubeController({ setFaceIndex }) {
  const scroll = useScroll();
  const [{ rotationY }, api] = useSpring(() => ({
    rotationY: 0,
    config: { tension: 100, friction: 30 },
  }));

  useFrame(() => {
    const pageIndex = Math.min(3, Math.round(scroll.offset * 4));
    const snapped = pageIndex * (Math.PI / 2);
    api.start({ rotationY: snapped });
    setFaceIndex(pageIndex);
  });

  // useEffect(() => {
  //   const onWindowScroll = () => {
  //     const scrollY = window.scrollY;
  //     const maxScroll = document.body.scrollHeight - window.innerHeight;
  //     const scrollPercent = scrollY / maxScroll;

  //     const pageIndex = Math.min(3, Math.round(scrollPercent * 4));
  //     const snapped = pageIndex * (Math.PI / 2);
  //     api.start({ rotationY: snapped });
  //     setFaceIndex(pageIndex);
  //   };

  //   window.addEventListener('scroll', onWindowScroll);
  //   return () => window.removeEventListener('scroll', onWindowScroll);
  // }, [api, setFaceIndex]);
  

  return (
    <>
      <GlowingCube rotationY={rotationY} />
      <ReflectiveGlass />
    </>
  );
}

export default function ScrollCube() {
  const [faceIndex, setFaceIndex] = React.useState(0);

  return (
    <>
      <Canvas camera={{ position: [0, 0, 7], fov: 50 }}>
        <ambientLight intensity={1.1} />
        <Environment preset="sunset" background={false} />
        <ScrollControls pages={4} damping={0.5}>
          <CubeController setFaceIndex={setFaceIndex} />
        </ScrollControls>
        <EffectComposer>
          <Bloom intensity={0.05} luminanceThreshold={0} luminanceSmoothing={0.1} mipmapBlur />
        </EffectComposer>
      </Canvas>

      <ScrollSnapBlink faceIndex={faceIndex} />
    </>
  );
}

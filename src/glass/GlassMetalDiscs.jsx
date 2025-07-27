import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, OrbitControls, SoftShadows } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette, DepthOfField, ChromaticAberration } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import './GlassMetalDiscs.css';

function Disc({ index, total }) {
  const angle = (index / total) * Math.PI * 2;
  const radius = 1.9;
  const x = Math.cos(angle) * radius;
  const z = Math.sin(angle) * radius;
  

  return (
    <mesh position={[x, 0, z]} rotation={[Math.PI / 2, 0, angle]} castShadow receiveShadow>
      <cylinderGeometry args={[1, 1, 0.08, 64]} />
      <meshPhysicalMaterial
    color={'#050000ff'} // greenish blue tint
    metalness={0.7}
    roughness={0.15}
    transmission={5.5}
    thickness={1.5}
    ior={2.2}
    clearcoat={5.5}
    opacity={0.25}
    transparent = {true}
    envMapIntensity={1}
/>
    </mesh>
  );
}

function DiscsGroup() {
  const ref = useRef();
  useFrame(() => {
    ref.current.rotation.y += 0.005;
    ref.current.rotation.x += 0.005;
    ref.current.rotation.z -= 0.005;
  });
  const total = 25;
  return (
    <group ref={ref} rotation={[Math.PI / 180 * 29, 0, Math.PI / 180 * 135]}>
      {[...Array(total)].map((_, i) => (
        <Disc key={i} index={i} total={total} />
      ))}
    </group>
  );
}

function GlassMetalDiscs() {
  return (
    <div className="canvas-wrapper">
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 5, 8], fov: 40 }}>
        <color attach="background" args={['#0b0b0b']} />
        <ambientLight intensity={0.1} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={0.3}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <Environment preset="warehouse" />
        <SoftShadows size={5} />
        <DiscsGroup />
        <OrbitControls enableZoom={false} />
        <EffectComposer disableNormalPass>
          <DepthOfField focusDistance={0.02} focalLength={0.2} bokehScale={2} height={480} />
          <Bloom intensity={1.2} luminanceThreshold={0.6} luminanceSmoothing={0.9} height={400} />
          <ChromaticAberration
            blendFunction={BlendFunction.NORMAL}
            offset={[0.001, 0.001]}
          />
          <Vignette eskil={false} offset={0.25} darkness={1} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}


export default React.memo(GlassMetalDiscs)
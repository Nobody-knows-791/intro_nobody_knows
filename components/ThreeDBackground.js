import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';

function Particles() {
  const particlesRef = useRef();

  useFrame(() => {
    particlesRef.current.rotation.x += 0.0005;
    particlesRef.current.rotation.y += 0.001;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          attach="attributes-position"
          count={5000}
          array={new Float32Array(5000 * 3).map(() => 5 - Math.random() * 10)}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        attach="material"
        size={0.02}
        sizeAttenuation
        color="#ff4d4d"
        transparent
        opacity={0.8}
      />
    </points>
  );
}

export default function ThreeDBackground() {
  return (
    <div className="three-background">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <Particles />
        <Stars radius={100} depth={50} count={5000} factor={4} fade speed={1} />
      </Canvas>
    </div>
  );
}

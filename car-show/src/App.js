import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  EffectComposer,
  DepthOfField,
  Bloom,
  ChromaticAberration,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import {
  CubeCamera,
  Environment,
  OrbitControls,
  PerspectiveCamera,
  ScrollControls,
} from "@react-three/drei";
import "./style.css";
import { useState } from "react";
import { useEffect } from "react";
import { spoltLightColors } from "./utils/constants";
import Loader from "./utils/Loader";
import { Urus } from "./Urus";
import { Aventador } from "./Aventador";
import { Revuelto } from "./Revuelto";

function CarShow() {
  const [color1, setColor1] = useState([]);
  const [color2, setColor2] = useState([]);

  useEffect(() => {
    setColor1(spoltLightColors.color1);
    setColor2(spoltLightColors.color2);
  }, []);

  return (
    <>
      <OrbitControls
        target={[0, 0.35, 0]}
        maxPolarAngle={1.45}
        enableZoom={false}
      />
      <color args={[0, 0, 0]} attach="background" />
      <ScrollControls pages={3} damping={0.25}>
        <Urus />  
        <Aventador/>
        <Revuelto/>
      </ScrollControls>
      <spotLight
        color={color1}
        intensity={1.5}
        angle={0.6}
        penumbra={0.5}
        position={[-5, 15, 0]}
        castShadow
        shadow-bias={-0.0001}
      />
      <spotLight
        color={color2}
        intensity={2}
        angle={1}
        penumbra={0.5}
        position={[5, 15, 0]}
        castShadow
        shadow-bias={-0.0001}
      />
    </>
  );
}

function App() {
  return (
    <Canvas camera={{ fov: 20, position: [2.3, 1.5, 15] }} shadows>
      <Suspense fallback={<Loader />}>
        <CarShow />
      </Suspense>
    </Canvas>
  );
}

export default App;

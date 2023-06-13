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
} from "@react-three/drei";
import "./style.css";
import { Boxes } from "./Boxes";
import { Car } from "./Aventador";
import { Ground } from "./Ground";
import { FloatingGrid } from "./FloatingGrid";
import { Rings } from "./Rings";
import { Bull } from "./Bull";
import { Urus } from "./Urus";
import { Huracan } from "./Huracan";
import { Revualto } from "./Revualto";
import { Stage } from "./Stage";
import { useState } from "react";
import { useEffect } from "react";
import { spoltLightColors } from "./utils/constants";
import Loader from "./utils/Loader";

function CarShow() {
  const [color1, setColor1] = useState([]);
  const [color2, setColor2] = useState([]);

  useEffect(() => {
    setColor1(spoltLightColors.color1);
    setColor2(spoltLightColors.color2);
  }, []);

  return (
    <>
      <OrbitControls target={[0, 0.35, 0]} maxPolarAngle={1.45} />

      <PerspectiveCamera makeDefault fov={50} position={[5, 3, 8]} />

      <color args={[0, 0, 0]} attach="background" />

      <CubeCamera resolution={256} frames={Infinity}>
        {(texture) => (
          <>
            <Environment map={texture} />
            {/* <Stage/> */}
            <Car />
            <Urus />
            <Huracan />
            <Bull setColor1={setColor1} setColor2={setColor2} />
            <Revualto />
          </>
        )}
      </CubeCamera>
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
      <Ground />
      {/* <FloatingGrid /> */}
      {/* <Boxes /> */}
      {/* <Rings /> */}

      <EffectComposer>
        {/* <DepthOfField focusDistance={0.0035} focalLength={0.01} bokehScale={3} height={480} /> */}
        <Bloom
          blendFunction={BlendFunction.ADD}
          intensity={1.3} // The bloom intensity.
          width={300} // render width
          height={300} // render height
          kernelSize={5} // blur kernel size
          luminanceThreshold={0.15} // luminance threshold. Raise this value to mask out darker elements in the scene.
          luminanceSmoothing={0.025} // smoothness of the luminance threshold. Range is [0, 1]
        />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL} // blend mode
          offset={[0.0005, 0.0012]} // color offset
        />
      </EffectComposer>
    </>
  );
}

function App() {
  return (
    <Canvas shadows>
      <Suspense fallback={<Loader />}>
        <CarShow />
      </Suspense>
    </Canvas>
  );
}

export default App;

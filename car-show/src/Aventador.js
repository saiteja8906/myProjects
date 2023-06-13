import React, { useEffect, useState } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Mesh } from "three";

// based on "Chevrolet Corvette (C7)" (https://sketchfab.com/3d-models/chevrolet-corvette-c7-2b509d1bce104224b147c81757f6f43a)
// by Martin Trafas (https://sketchfab.com/Bexxie) licensed under CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
export function Car() {
  const gltf = useLoader(
    GLTFLoader,
    process.env.PUBLIC_URL + "/models/aventador/scene.gltf"
  );
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    gltf.scene.scale.set(1, 1, 1);
    isClicked?gltf.scene.position.set(7, 0.2, 2):gltf.scene.position.set(7, -0.035, 2);
    isClicked ? gltf.scene.rotateY(-5) : gltf.scene.rotateY(5)
    gltf.scene.traverse((object) => {
      if (object instanceof Mesh) {
        object.castShadow = true;
        object.receiveShadow = true;
        object.material.envMapIntensity = 20;
      }
    });
  }, [gltf, isClicked]);

  // useFrame((state, delta) => {
  //   let t = state.clock.getElapsedTime();

  //   let group = gltf.scene.children[0].children[0].children[0];
  //   group.children[0].rotation.x = t * 2;
  //   group.children[2].rotation.x = t * 2;
  //   group.children[4].rotation.x = t * 2;
  //   group.children[6].rotation.x = t * 2;
  // });

  return (
    <>
      {isClicked && (
        <>
          <mesh
            scale={2.2}
            position={[7, 0.3, 2]}
            rotation={[-Math.PI / 2, 0, Math.PI / 2.5]}
            castShadow
          >
            <ringGeometry args={[1.4, 1.5, 40]} />
            <meshStandardMaterial
              emissive={[1, 1, 1]}
              color="white"
              roughness={0.75}
              envMapIntensity={0.15}
            />
          </mesh>
        </>
      )}
      <primitive object={gltf.scene} onClick={() => setIsClicked(!isClicked)} />
    </>
  );
}

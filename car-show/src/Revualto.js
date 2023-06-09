import React, { useEffect } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Mesh } from "three";
import { Rings } from "./Rings";
import { useState } from "react";

// based on "Chevrolet Corvette (C7)" (https://sketchfab.com/3d-models/chevrolet-corvette-c7-2b509d1bce104224b147c81757f6f43a)
// by Martin Trafas (https://sketchfab.com/Bexxie) licensed under CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
export function Revualto() {
  const gltf = useLoader(
    GLTFLoader,
    process.env.PUBLIC_URL + "models/Revualto/scene.gltf"
  );

  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    gltf.scene.scale.set(1, 1, 1);
    gltf.scene.position.set(1.5, 0, 8);
    // isClicked ? gltf.scene.rotateY(5) : gltf.scene.rotateY(-5);
    gltf.scene.traverse((object) => {
      if (object instanceof Mesh) {
        object.castShadow = true;
        object.receiveShadow = true;
        object.material.envMapIntensity = 20;
      }
    });
  }, [gltf,isClicked]);

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
      <primitive object={gltf.scene} onClick={() => setIsClicked(!isClicked)}/>
      {/* <Rings pos={[0,0,9]} scal={[1,1,1]}/> */}
    </>
  );
}

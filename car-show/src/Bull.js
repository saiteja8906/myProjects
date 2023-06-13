import React, { useEffect } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Mesh } from "three";
import { useState } from "react";
import { spoltLightColors } from "./utils/constants";

// based on "Chevrolet Corvette (C7)" (https://sketchfab.com/3d-models/chevrolet-corvette-c7-2b509d1bce104224b147c81757f6f43a)
// by Martin Trafas (https://sketchfab.com/Bexxie) licensed under CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
export function Bull({ setColor1, setColor2 }) {
  const gltf = useLoader(
    GLTFLoader,
    process.env.PUBLIC_URL + "/models/Bull/scene.gltf"
  );

  const [isClicked, setIsClicked] = useState(false);

  useEffect(()=>{
    if(isClicked){
      setColor1(spoltLightColors.black)
      setColor2(spoltLightColors.black)
    }
    else{
      setColor1(spoltLightColors.color1)
      setColor2(spoltLightColors.color2)
    }
  },[isClicked]);

  useEffect(() => {
    gltf.scene.scale.set(0.004, 0.004, 0.004);
    gltf.scene.position.set(1.5, -0.2, 3);
    // gltf.scene.rotateY(100)
    gltf.scene.traverse((object) => {
      if (object instanceof Mesh) {
        object.castShadow = true;
        object.receiveShadow = true;
        object.material.envMapIntensity = 20;
      }
    });
  }, [gltf]);

  // useFrame((state, delta) => {
  //   let t = state.clock.getElapsedTime();

  //   let group = gltf.scene.children[0].children[0].children[0];
  //   group.children[0].rotation.x = t * 2;
  //   group.children[2].rotation.x = t * 2;
  //   group.children[4].rotation.x = t * 2;
  //   group.children[6].rotation.x = t * 2;
  // });

  return (
    <primitive object={gltf.scene} onClick={() => setIsClicked(!isClicked)} />
  );
}

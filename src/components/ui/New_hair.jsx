/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.13 public/new_hair.gltf 
*/

import { GradientTexture, useGLTF } from "@react-three/drei";
import { MeshBasicMaterial, MeshLambertMaterial } from "three";
import React, { useRef } from "react";

import { useFrame } from "@react-three/fiber";

export function Model(props) {
  const { nodes, materials } = useGLTF("/new_hair.gltf");

  const newRef = useRef();

  useFrame(() => {
    newRef.current.rotation.z += 0.005;
    newRef.current.rotation.x += 0.005;
  });

  return (
    <group {...props} ref={newRef} dispose={null}>
      <mesh
        geometry={nodes["head-mesh003"].geometry}
        scale={[10, 10, 10]}
        rotation={[1, 0, 0]}
        position={[0.025, 0.706, 0.515]}
      >
        <meshPhysicalMaterial></meshPhysicalMaterial>
      </mesh>
    </group>
  );
}

useGLTF.preload("/new_hair.gltf");
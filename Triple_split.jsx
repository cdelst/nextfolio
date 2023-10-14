/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.13 public/triple_split.gltf 
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('/triple_split.gltf')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.close_up.geometry} material={materials['marble.001']} position={[0.025, 0.706, 0.515]} />
      <mesh geometry={nodes.medium.geometry} material={materials['marble.002']} position={[0.025, 0.706, 0.515]} />
      <mesh geometry={nodes.far.geometry} material={materials.marble} position={[0.025, 0.706, 0.515]} />
    </group>
  )
}

useGLTF.preload('/triple_split.gltf')
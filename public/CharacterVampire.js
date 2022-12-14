/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
    const { nodes, materials } = useGLTF('/characterVampire.glb')
    return (
        <group {...props} dispose={null}>
            <group position={[-0.13, 0.47, 0]} scale={0.86}>
                <mesh castShadow receiveShadow geometry={nodes.Mesh_armLeft.geometry} material={materials.skin} />
                <mesh castShadow receiveShadow geometry={nodes.Mesh_armLeft_1.geometry} material={materials.brick} />
                <mesh castShadow receiveShadow geometry={nodes.Mesh_armLeft_2.geometry} material={materials._defaultMat} />
            </group>
            <group position={[0.13, 0.47, 0]}>
                <mesh castShadow receiveShadow geometry={nodes.Mesh_armRight.geometry} material={materials.skin} />
                <mesh castShadow receiveShadow geometry={nodes.Mesh_armRight_1.geometry} material={materials.brick} />
                <mesh castShadow receiveShadow geometry={nodes.Mesh_armRight_2.geometry} material={materials._defaultMat} />
            </group>
            <group position={[0, 0.22, 0]}>
                <mesh castShadow receiveShadow geometry={nodes.Mesh_body.geometry} material={materials.brick} />
                <mesh castShadow receiveShadow geometry={nodes.Mesh_body_1.geometry} material={materials.stone} />
                <mesh castShadow receiveShadow geometry={nodes.Mesh_body_2.geometry} material={materials.wood} />
            </group>
            <mesh castShadow receiveShadow geometry={nodes.cape.geometry} material={materials.brick} position={[0, 0.48, 0.1]} />
            <group position={[0, 0.48, 0]} scale={0.26}>
                <mesh castShadow receiveShadow geometry={nodes.Mesh_head.geometry} material={materials.skin} />
                <mesh castShadow receiveShadow geometry={nodes.Mesh_head_1.geometry} material={materials.woodDark} />
                <mesh castShadow receiveShadow geometry={nodes.Mesh_head_2.geometry} material={materials.wood} />
                <mesh castShadow receiveShadow geometry={nodes.Mesh_head_3.geometry} material={materials._defaultMat} />
                <mesh castShadow receiveShadow geometry={nodes.Mesh_head_4.geometry} material={materials.light} />
            </group>
            <group position={[-0.13, 0.22, 0]}>
                <mesh castShadow receiveShadow geometry={nodes.Mesh_legLeft.geometry} material={materials.stone} />
                <mesh castShadow receiveShadow geometry={nodes.Mesh_legLeft_1.geometry} material={materials.wood} />
            </group>
            <group position={[0.13, 0.22, 0]} scale={0.86}>
                <mesh castShadow receiveShadow geometry={nodes.Mesh_legRight.geometry} material={materials.stone} />
                <mesh castShadow receiveShadow geometry={nodes.Mesh_legRight_1.geometry} material={materials.wood} />
            </group>
        </group>
    )
}

useGLTF.preload('/characterVampire.glb')

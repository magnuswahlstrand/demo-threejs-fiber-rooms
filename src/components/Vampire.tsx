import {Clone, useGLTF} from "@react-three/drei";
import {Mesh, MeshStandardMaterial} from "three";
import React from "react";

// https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation
declare module "three-stdlib/loaders/GLTFLoader" {
    interface GLTF {
        materials: Record<string, MeshStandardMaterial>
        nodes: Record<string, Mesh>
    }
}

class Props {
    position: [number, number, number] = [0, 0, 0]
}

const Vampire: React.FC<Props> = ({position}) => {
    const vampire = useGLTF('/characterVampire.glb')
    for (const key in vampire.materials) {
        vampire.materials[key].metalness = 0;
    }

    return (
        <group position={position} rotation={[0, 3.2 * Math.PI / 2, 0]} scale={7}>
            <Clone object={vampire.scene} castShadow receiveShadow/>
        </group>
    )
}

export default Vampire

import {Clone, useGLTF} from "@react-three/drei";
import {a} from "@react-spring/three";
import {Mesh, MeshStandardMaterial} from "three";
import {useFrame} from "@react-three/fiber";

// https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation
declare module "three-stdlib/loaders/GLTFLoader" {
    interface GLTF {
        // Not necessarily correct for all modes
        materials: Record<string, MeshStandardMaterial>
        nodes: Record<string, Mesh>
    }
}

class Props {
    position: [number, number, number] = [0, 0, 0]
}

const Pizza: React.FC<Props> = ({position}) => {
    const pizza = useGLTF('/pizza.glb')
    for (const key in pizza.materials) {
        pizza.materials[key].metalness = 0;
    }

    const box = useGLTF('/pizzaBox.glb')
    for (const key in box.materials) {
        box.materials[key].metalness = 0;
    }

    // removeMetalness(box)

    useFrame(({clock}) => {
        pizza.scene.rotation.y = clock.elapsedTime * 0.5
    })

    return (
        <a.group position={position} rotation={[0, Math.PI, 0]} scale={7}>
            {/*<Clone object={box.nodes.lid} castShadow receiveShadow/>*/}
            {/*<Clone object={box.nodes.lid} castShadow receiveShadow rotation={[1,0,0]}/>*/}
            <Clone object={box.nodes.pizzaBox} castShadow receiveShadow />

            <Clone object={pizza.scene} position={[0, 0.05, 0]} castShadow receiveShadow/>
        </a.group>
    )
}

export default Pizza

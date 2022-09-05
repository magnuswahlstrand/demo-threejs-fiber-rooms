import {Clone, useGLTF} from "@react-three/drei";
import {useFrame} from "@react-three/fiber";
import {useRef} from "react";


class Props {
    position: [number, number, number] = [0, 0, 0]
}

const RotatingCar: React.FC<Props> = ({position}) => {
    const model = useGLTF('/truck.glb')
    model.scene.traverse((child) => {
        child.castShadow = true
        child.receiveShadow = true
    })

    useFrame(({clock}) => {
        const t = clock.elapsedTime * 4
        const r = 3 + Math.sin(t)
        const x = Math.sin(-t) * r + position[0]
        const z = Math.cos(-t) * r + position[2]
        model.scene.position.x = x
        model.scene.position.z = z
        model.scene.rotation.y = -t + Math.PI / 2
    })


    return (
        <group position={position} rotation={[0, 0, 0]} scale={1}>
            {/*{...spring} onClick={() => console.log('yeah')}>*/}
            <primitive object={model.scene}/>

            {/*<mesh />*/}
            {/*//     <mesh geometry={nodes.Camera_1.geometry} material={materials.Lens} />*/}
        </group>
    )
}

export default RotatingCar

import {Clone, Text3D, useGLTF} from "@react-three/drei";
import React from "react";

type Props = {
    position: [number, number, number]
    onClick: () => void,
    children?: React.ReactNode;
    color?: string
    label: string
    description: string
    rotate?: boolean
}

const Room: React.FC<Props> = ({
                                   position,
                                   onClick,
                                   children,
                                   color = "hotpink",
                                   label,
                                   description,
                                   rotate = false
                               }) => {
    const model = useGLTF('/room.glb')
    const textPosition: [number, number, number] = rotate ? [9, 7, 0] : [0.9, 7, -1]
    const textRotation: [number, number, number] = rotate ? [0, Math.PI, 0] : [0, Math.PI / 2, 0]

    return (
        <group rotation={[0, 3 * Math.PI / 2, 0]} position={position} onClick={onClick}>
            <group rotation={textRotation} position={textPosition}>
                <Text3D font="Outfit_Bold.json" scale={2} castShadow>
                    {label}
                    <meshToonMaterial color={color}/>
                </Text3D>
                <Text3D font="Outfit_Bold.json" scale={0.8} position={[0, -1.3, 0]}>{description}
                    <meshToonMaterial color={color}/>
                </Text3D>
            </group>

            <Clone object={model.scene} receiveShadow={true}/>
            {children}
        </group>
    )
}

export default Room

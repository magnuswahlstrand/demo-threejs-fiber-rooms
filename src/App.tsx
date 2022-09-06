import {PresentationControls, useHelper} from '@react-three/drei'
import {Canvas, useThree} from "@react-three/fiber";
import Room from "./components/Room";
import {useSpring} from "@react-spring/three";
import {CameraHelper, DirectionalLight, DirectionalLightHelper, OrthographicCamera, Vector3} from "three";
import {folder, Leva, useControls} from 'leva'
import Pizza from "./components/Pizza";
import InfoBox from "./components/InfoBox";
import RotatingCar from "./components/RotatingCar";
import {useLayoutEffect, useRef} from 'react'
import Vampire from "./components/Vampire";

const debug = window.location.hash === '#debug'

const basePosition = new Vector3(50, 50, 50)

function Room03({onClick}: { onClick: (pos: [number, number, number]) => void }) {
    return <Room position={[-10, 20, -9]} onClick={() => onClick([-10, 20, -9])}
                 label={"03"}
                 description={"Advanced\nthings"}
                 color={"#3C6792"}>
        <RotatingCar position={[3.2, 1, -2.5]}/>
        <InfoBox position={[3.2, 2, -7]} label={"3"}
                 text={<>🚗 Cars are pretty good too! This one runs on renewable fuel made from recycled pixels. This
                     and all 3D models are from <a href="https://kenney.nl">kenney.nl</a></>}/>
    </Room>;
}


function Room02({onClick}: { onClick: (pos: [number, number, number]) => void }) {
    return <Room position={[0, 10, -9]} onClick={() => onClick([0, 10, -9])}
                 label={"02"}
                 description={"Lights"}
                 color={"#67923C"}
                 rotate
    >
        <Vampire position={[5, 1, -5]}/>
        <InfoBox position={[6.2, 4, -5]} label={"2"}
                 text={'Vampire are experts on lights 🧛‍♀. Their expertise is fueled mostly by hatred. Anyone who has worked with 3D graphics can relate.'}/>

    </Room>;
}

function Room01({onClick}: { onClick: (pos: [number, number, number]) => void }) {
    return <Room position={[0, 0, 0]}
                 onClick={() => onClick([0, 0, 0])}
                 label={"01"}
                 description={"Basics"}
                 color={"#b74b81"}
    >
        <Pizza position={[5, 1, -5]}/>
        <InfoBox position={[6.2, 4, -5]} label={"1"}
                 text={'Pizzas are great! 🍕 Some have tomatoes, some have cheese, some have both!'}/>
    </Room>;
}

function Inner() {
    const {camera} = useThree()

    const [_, api] = useSpring(
        () => ({
            from: {x: basePosition.x, y: basePosition.y, z: basePosition.z},
            to: {x: basePosition.x, y: basePosition.y, z: basePosition.z},
            config: {friction: 40},
            onChange: ({value}) => {
                camera.position.set(value.x, value.y, value.z)
            },
        }),
        [],
    )

    const handleLevelClicked = (coords: [number, number, number]) => {
        api.start({x: coords[0] + basePosition.x, y: coords[1] + basePosition.y, z: coords[2] + basePosition.z})
    }


    const ref = useRef<DirectionalLight>(null);
    const ref2 = useRef<OrthographicCamera>(null);


    const vals = useControls('My folder', {
        lighting: folder({
            showLighting: true,
            intensity: {value: 2, min: 0, max: 10, step: 1},
            color: "#F0F0E0",
            rotation: {
                value: Math.PI, min: 0, max: 2 * Math.PI, step: 0.1,
                onEditEnd: (() => {
                        if (!ref.current) return
                        ref.current?.position.set(0, 10, 0)
                        ref.current.lookAt(10, 0, 0)
                        ref.current.updateMatrixWorld()
                    }
                )
            },
            size: {value: 10, min: 0.1, max: 100, step: 0.01},
            something: folder(
                {
                    x: {value: 35, min: 5, max: 100, step: 2},
                    y: {value: 10, min: 5, max: 100, step: 2},
                    z: {value: 10, min: 5, max: 100, step: 2},
                }
            )
        }),
    })
    const {showLighting, intensity, color, rotation, size, x, y, z} = vals


    if (debug) {
        useHelper(ref, DirectionalLightHelper, 2, "red")
        useHelper(ref2, CameraHelper)
        useLayoutEffect(() => void ref.current?.shadow.camera.updateProjectionMatrix(), [size])
        useLayoutEffect(() => {
            ref2.current?.updateProjectionMatrix()
            ref2.current?.position.set(10, 10, 10)

        }, [x])
    }


    return <>
        <PresentationControls
            global
            zoom={0.3}
            rotation={[0, 0, 0]}
            polar={[0, 0]}
            azimuth={[-Math.PI / 4, Math.PI / 4]}
        >
            {debug && <axesHelper args={[20]}/>}

            <ambientLight intensity={0.1}/>
            <directionalLight
                ref={ref}
                color={color}
                position={[5 * 2, 8 * 2, 13 * 2]}
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
                intensity={intensity}
                castShadow={true}
            >
                <orthographicCamera ref={ref2} attach="shadow-camera" left={-size} right={size} top={3 * size}
                                    bottom={-size} far={x}/>
            </directionalLight>
            <Room03 onClick={handleLevelClicked}/>
            <Room02 onClick={handleLevelClicked}/>
            <Room01 onClick={handleLevelClicked}/>
        </PresentationControls>
    </>;
}

function App() {

    return (
        <div className="h-full w-full">
            <Leva hidden={!debug}/>
            <Canvas
                camera={{fov: 30, position: basePosition}} className={"touch-none"}
                shadows={true}>
                <Inner/>
            </Canvas>
            <div className="absolute left-0 bottom-0 m-2 p-2 bg-white/50 rounded-xl text-sm ">
                <p>🧛 Built by <a href="https://twitter.com/Wahlstra">@Wahlstra</a> with React-Three-Fiber. Repo <a
                    href="https://github.com/magnuswahlstrand/demo-threejs-fiber-rooms">here</a></p>
                <p>🍕 Inspiration by Bruno Simon's <a href="https://threejs-journey.com/">excellent course on Three
                    JS</a></p>
                <p>🚗 <span className={"font-bold"}>Click the rooms</span> to move the camera. <span
                    className={"font-bold"}>Hover the numbers</span> to get more information.</p>
            </div>
        </div>
    )
}

export default App

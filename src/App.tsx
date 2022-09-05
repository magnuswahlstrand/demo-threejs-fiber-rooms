import {PresentationControls} from '@react-three/drei'
import {Canvas, useThree} from "@react-three/fiber";
import Room from "./components/Room";
import {useSpring} from "@react-spring/three";
import {Vector3} from "three";
import {folder, useControls} from 'leva'
import Pizza from "./components/Pizza";
import InfoBox from "./components/InfoBox";
import RotatingCar from "./components/RotatingCar";


const basePosition = new Vector3(50, 50, 50)

function Room03({onClick}: { onClick: (pos: [number, number, number]) => void }) {
    return <Room position={[-10, 20, -9]} onClick={() => onClick([-10, 20, -9])}
                 label={"03"}
                 description={"Advanced\nthings"}
                 color={"#3C6792"}>
    </Room>;
}

function Room02({onClick}: { onClick: (pos: [number, number, number]) => void }) {
    return <Room position={[0, 10, -9]} onClick={() => onClick([0, 10, -9])}
                 label={"02"}
                 description={"Lights"}
                 color={"#67923C"}
                 rotate
    >
        <RotatingCar position={[3.2,1,-2.5]} />
        <InfoBox position={[3.2, 2, -7]} label={"2"}
                 text={'🚗 Cars are pretty good too! They don\'t cast shadows, through. That\'s a fact.'}/>
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

    const {showLighting, intensity, color} = useControls('My folder', {
        lighting: folder({
            showLighting: true,
            intensity: {value: 4, min: 0, max: 10, step: 1},
            color: "#F0F0E0",
        }),
    })
    return <>
        <PresentationControls
            global
            zoom={0.3}
            rotation={[0, 0, 0]}
            polar={[0, 0]}
            azimuth={[-Math.PI / 4, Math.PI / 4]}
        >
            {/*<axesHelper args={[20]}/>*/}
            <ambientLight intensity={0.2}/>
            <directionalLight
                color={color}
                position={[5 * 2, 8 * 2, 13 * 2]}
                intensity={intensity}
                rotation={[0, Math.PI, 0]}
                castShadow={true} visible={showLighting}/>

            <Room03 onClick={handleLevelClicked}/>
            <Room02 onClick={handleLevelClicked}/>
            <Room01 onClick={handleLevelClicked}/>
        </PresentationControls>
    </>;
}

function App() {


    return (
        <div className="h-screen w-full">
            {/*// https://codesandbox.io/s/threejs-journey-level-1-kheke?file=/src/App.js*/}

            <Canvas
                camera={{fov: 30, position: basePosition}} className={"touch-none"}
                shadows={true}>
                <Inner/>
            </Canvas>
        </div>
    )
}

export default App

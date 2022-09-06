import {Html} from "@react-three/drei";

type Props = {
    position: [number, number, number], label: string, text: string
};

export default function InfoBox({position, label, text}: Props) {
    return <Html position={position}>
        <div className={"text-white group w-48 pointer-events-none"}>
            <div
                className={"flex flex-col w-6 h-6 text-sm bg-black rounded-full text-white justify-center items-center cursor-help opacity-70 pointer-events-auto select-none"}>
                {label}
            </div>
            <div
                className={" py-2 px-3 text-sm w-30 bg-black hidden group-hover:block transition-all rounded-xl duration-500 pointer-events-none"}>
                {text}
            </div>
        </div>
    </Html>;
}

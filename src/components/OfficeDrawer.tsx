import { FC } from 'react'
import { Office } from '../store/fragmentsStore'
import { Text } from '@react-three/drei'
import { getContrastingColor } from '../lib/contrastColor'
import { Euler } from 'three'
import { lightenHexColor } from '../lib/lightColor'

interface Props {
    offices: Office[]
    mode: '2d' | '3d'
    targetMesh: number | undefined
    setTargetMesh: React.Dispatch<React.SetStateAction<number | undefined>>
}

export const OfficeDrawer: FC<Props> = ({ offices, mode, setTargetMesh, targetMesh }) => {
    return offices.map((office, i) => (
        <mesh
            position={
                mode === '3d'
                    ? [office.coords[0], office.coords[1] + office.width / 2, office.coords[2]]
                    : [office.coords[0], 0, office.coords[2]]
            }
            castShadow
            onPointerOut={() => setTargetMesh(undefined)}
            onPointerOver={() => setTargetMesh(i)}
        >
            <Text
                position={mode === '3d' ? [0, office.coords[1] + office.width / 2 + 0.1, 0] : [0, 0.1, 0]}
                fontSize={0.2}
                color={getContrastingColor(office.color)}
                rotation={new Euler(-Math.PI / 2, 0, 0)}
                anchorX="center"
                anchorY="middle"
            >
                {office.name}
            </Text>
            <boxGeometry
                args={mode === '3d' ? [office.length, office.width, office.height] : [office.length, 0, office.height]}
            />
            <meshStandardMaterial color={targetMesh === i ? lightenHexColor(office.color, 50) : office.color} />
        </mesh>
    ))
}

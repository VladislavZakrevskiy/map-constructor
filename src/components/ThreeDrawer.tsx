import { Canvas } from '@react-three/fiber'
import { useFragmentsStore } from '../store/fragmentsStore'
import { Line, MapControls, Text } from '@react-three/drei'
import { useState } from 'react'
import { lightenHexColor } from '../lib/lightColor'
import { Card, Modal, Typography } from '@mui/material'
import { Euler } from 'three'
import { getContrastingColor } from '../lib/contrastColor'
import { usePointStore } from '../store/pointStore'

export const ThreeDrawer = ({ mode }: { mode: '2d' | '3d' }) => {
    const { offices } = useFragmentsStore()
    const { points } = usePointStore()
    const [targetMesh, setTargetMesh] = useState<number>()
    const [isOpen, setIsOpen] = useState<{ open: boolean; target?: number }>({ open: false, target: undefined })

    return (
        <>
            <Modal
                open={isOpen.open}
                onClose={() => setIsOpen({ target: undefined, open: false })}
                className="flex justify-center items-center"
            >
                {isOpen.target !== undefined ? (
                    <Card className="flex justify-center items-center flex-col p-4">
                        <Typography fontSize={20}>Имя: {offices[isOpen.target].name}</Typography>
                        <Typography fontSize={20}>Описание: {offices[isOpen.target].desc}</Typography>
                        <Typography fontSize={20}>Длина: {offices[isOpen.target].length}</Typography>
                        <Typography fontSize={20}>Ширина: {offices[isOpen.target].height}</Typography>
                        <Typography fontSize={20}>Высота: {offices[isOpen.target].width}</Typography>
                        <Typography fontSize={20}>XYZ: [{offices[isOpen.target].coords.join(', ')}]</Typography>
                    </Card>
                ) : (
                    <Typography>Нет Таргета</Typography>
                )}
            </Modal>
            <Canvas camera={{ fov: 45 }} className="border-2 border-black min-h-[97vh]" shadows>
                {offices.map((office, i) => (
                    <mesh
                        position={
                            mode === '3d'
                                ? [office.coords[0], office.coords[1] + office.width / 2, office.coords[2]]
                                : [office.coords[0], 0, office.coords[2]]
                        }
                        castShadow
                        onPointerOut={() => setTargetMesh(undefined)}
                        onPointerOver={() => setTargetMesh(i)}
                        onClick={() => setIsOpen({ open: true, target: i })}
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
                            args={
                                mode === '3d'
                                    ? [office.length, office.width, office.height]
                                    : [office.length, 0, office.height]
                            }
                        />
                        <meshStandardMaterial
                            color={targetMesh === i ? lightenHexColor(office.color, 50) : office.color}
                        />
                    </mesh>
                ))}
                {points.map((point) => (
                    <>
                        <mesh position={[point.x, point.y + 3, point.z]}>
                            <sphereGeometry args={[0.1, 10, 10]} />
                            <meshStandardMaterial color={'red'} />
                        </mesh>
                        {point.points.map((neiPoint) => (
                            <Line
                                lineWidth={4}
                                points={[
                                    [point.x, point.y + 3, point.z],
                                    [neiPoint.x, neiPoint.y + 3, neiPoint.z],
                                ]}
                                color={'red'}
                            />
                        ))}
                    </>
                ))}
                {mode === '2d' ? (
                    <ambientLight intensity={1.5} />
                ) : (
                    <directionalLight color={'#fff'} castShadow intensity={4} position={[1, 1, 1]} />
                )}
                <MapControls
                    enableDamping
                    dampingFactor={0.05}
                    maxZoom={1}
                    maxPolarAngle={mode === '2d' ? 0 : Math.PI / 6}
                />
            </Canvas>
        </>
    )
}

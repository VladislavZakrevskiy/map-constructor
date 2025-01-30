import { FC, useEffect, useState } from 'react'
import { Point, usePointStore } from '../store/pointStore'
import { Line } from '@react-three/drei'
import { lightenHexColor } from '../lib/lightColor'

interface Props {
    points: Point[]
}

export const PointDrawer: FC<Props> = ({ points }) => {
    const [targetMesh, setTargetMesh] = useState<string>()
    const [firstPoint, setFirstPoint] = useState<string>()
    const [secondPoint, setSecondPoint] = useState<string>()
    const { updatePoint } = usePointStore()

    const handlePointClick = (id: string) => () => {
        if (!firstPoint) {
            setFirstPoint(id)
            return
        } else {
            setSecondPoint(id)
            return
        }
    }

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setFirstPoint(undefined)
                setSecondPoint(undefined)
            }
        }
        document.addEventListener('keydown', handleEsc)

        return () => document.removeEventListener('keydown', handleEsc)
    }, [])

    useEffect(() => {
        if (secondPoint && firstPoint && secondPoint !== firstPoint) {
            const first = points.find(({ id }) => id === firstPoint)
            const firstIndex = points.findIndex(({ id }) => id === firstPoint)
            const second = points.find(({ id }) => id === secondPoint)
            const secondIndex = points.findIndex(({ id }) => id === secondPoint)
            if (first && second) {
                updatePoint(firstIndex, { ...first, connections: [...first.connections, second.id] })
                updatePoint(secondIndex, { ...second, connections: [...second.connections, first.id] })
                setFirstPoint(undefined)
                setSecondPoint(undefined)
            } else {
                setFirstPoint(undefined)
                setSecondPoint(undefined)
            }
        }
    }, [secondPoint])

    return points.map((point) => (
        <>
            <mesh
                onPointerOut={() => setTargetMesh(undefined)}
                onPointerOver={() => setTargetMesh(point.id)}
                onClick={handlePointClick(point.id)}
                position={[point.x, point.y + 3, point.z]}
            >
                <sphereGeometry args={[0.1, 25, 25]} />
                <meshStandardMaterial
                    color={(() => {
                        const color = firstPoint === point.id ? 'blue' : 'red'
                        return targetMesh === point.id ? lightenHexColor(color, 20) : color
                    })()}
                />
            </mesh>
            {point.connections.map((neiPointId) => {
                const neiPoint = points.find(({ id }) => id === neiPointId)
                if (!neiPoint) {
                    return
                }
                if (
                    !(
                        neiPoint.connections.find((el) => el === point.id) &&
                        point.connections.find((el) => el === neiPoint.id)
                    )
                ) {
                    return
                }

                return (
                    <Line
                        lineWidth={4}
                        points={[
                            [point.x, point.y + 3, point.z],
                            [neiPoint.x, neiPoint.y + 3, neiPoint.z],
                        ]}
                        color={'red'}
                    />
                )
            })}
        </>
    ))
}

import { Canvas } from '@react-three/fiber'
import { useFragmentsStore } from '../store/fragmentsStore'
import { MapControls } from '@react-three/drei'
import { useState } from 'react'
import { usePointStore } from '../store/pointStore'
import { OfficeDrawer } from './OfficeDrawer'
import { PointDrawer } from './PointDrawer'

export const ThreeDrawer = ({ mode }: { mode: '2d' | '3d' }) => {
    const { offices } = useFragmentsStore()
    const { points } = usePointStore()
    const [targetMesh, setTargetMesh] = useState<number>()

    return (
        <>
            <Canvas camera={{ fov: 45 }} className="border-2 border-black min-h-[97vh]" shadows>
                <OfficeDrawer mode={mode} offices={offices} setTargetMesh={setTargetMesh} targetMesh={targetMesh} />
                <PointDrawer points={points} />
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

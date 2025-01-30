import { useState } from 'react'
import { ThreeDrawer } from './components/ThreeDrawer'
import { useFragmentsStore } from './store/fragmentsStore'
import { Button, TextField } from '@mui/material'
import { usePointStore } from './store/pointStore'
import { OfficesForm } from './components/OfficesForm'
import { PointForm } from './components/PointForm'
import { useFloorStore } from './store/floorStore'

function App() {
    const { offices } = useFragmentsStore()
    const { points } = usePointStore()
    const [mode, setMode] = useState<'2d' | '3d'>('2d')
    const { floor, setFloor } = useFloorStore()

    const exportMap = () => {
        const data = { offices: offices, nodes: points.map((point) => ({ ...point, floor })) }
        const json = JSON.stringify(data)
        const blob = new Blob([json], { type: 'application/json' })
        const url = URL.createObjectURL(blob)

        const link = document.createElement('a')
        link.href = url
        link.download = 'map.json'
        link.click()

        URL.revokeObjectURL(url)
    }

    return (
        <main className="grid grid-cols-[3fr_2fr] p-2 gap-1">
            <ThreeDrawer mode={mode} />
            <div>
                <div className="m-2 flex flex-col items-stretch gap-3">
                    <Button
                        onClick={() => setMode((prev) => (prev === '2d' ? '3d' : '2d'))}
                        fullWidth
                        variant="contained"
                    >
                        {mode === '2d' ? '2D' : '3D'}
                    </Button>
                    <TextField
                        fullWidth
                        label="Этаж"
                        value={floor || ''}
                        onChange={(e) => setFloor(Number(e.target.value))}
                    />
                </div>
                <div className="grid grid-cols-2 gap-2 mx-2">
                    <OfficesForm offices={offices} />
                    <PointForm points={points} />
                </div>
            </div>
            <Button variant="contained" onClick={exportMap}>
                Экспорт
            </Button>
        </main>
    )
}

export default App

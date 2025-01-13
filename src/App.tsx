import { useState } from 'react'
import { ThreeDrawer } from './components/ThreeDrawer'
import { useFragmentsStore } from './store/fragmentsStore'
import { Button, Card, CardContent, CardHeader, TextField, Typography } from '@mui/material'
import { usePointStore } from './store/pointStore'

function App() {
    const { offices, addOffice, updateOfiice, deleteOffice } = useFragmentsStore()
    const { points, addPoint, deletePoint, updatePoint } = usePointStore()
    const [mode, setMode] = useState<'2d' | '3d'>('2d')

    const exportMap = () => {
        const data = { map: offices, graph: points }
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
                <div className="m-2">
                    <Button
                        onClick={() => setMode((prev) => (prev === '2d' ? '3d' : '2d'))}
                        fullWidth
                        variant="outlined"
                    >
                        {mode === '2d' ? '2D' : '3D'}
                    </Button>
                </div>
                <div className="grid grid-cols-2">
                    <div className="flex flex-col items-stretch gap-1 overflow-y-scroll max-h-[97vh]">
                        {offices.map((office, i) => (
                            <Card className="p-1 min-h-[450px]">
                                <CardHeader
                                    action={
                                        <div className="flex gap-1">
                                            <Button
                                                variant="contained"
                                                onClick={() =>
                                                    addPoint({
                                                        x: office.coords[0],
                                                        y: office.coords[1],
                                                        z: office.coords[2],
                                                        points: [],
                                                    })
                                                }
                                            >
                                                Вершина
                                            </Button>
                                            <Button variant="contained" onClick={() => deleteOffice(i)}>
                                                -
                                            </Button>
                                        </div>
                                    }
                                    title={office.name || 'Нет названия'}
                                />
                                <CardContent className="flex flex-col gap-2">
                                    <TextField
                                        label="Название"
                                        size="small"
                                        value={office.name}
                                        onChange={(e) => updateOfiice(i, { ...office, name: e.target.value })}
                                    />
                                    <TextField
                                        label="Описание"
                                        size="small"
                                        value={office.desc}
                                        onChange={(e) => updateOfiice(i, { ...office, desc: e.target.value })}
                                    />
                                    <TextField
                                        type="color"
                                        label="Цвет"
                                        size="small"
                                        value={office.color}
                                        onChange={(e) => updateOfiice(i, { ...office, color: e.target.value })}
                                    />
                                    <TextField
                                        label="Длина"
                                        size="small"
                                        type="number"
                                        value={office.length || ''}
                                        onChange={(e) => updateOfiice(i, { ...office, length: +e.target.value })}
                                    />
                                    <TextField
                                        label="Ширина"
                                        size="small"
                                        type="number"
                                        value={office.height || ''}
                                        onChange={(e) => updateOfiice(i, { ...office, height: +e.target.value })}
                                    />
                                    <TextField
                                        label="Высота"
                                        size="small"
                                        type="number"
                                        value={office.width || ''}
                                        onChange={(e) => updateOfiice(i, { ...office, width: +e.target.value })}
                                    />
                                    <div className="grid grid-cols-3 gap-1">
                                        <TextField
                                            label="X"
                                            size="small"
                                            type="number"
                                            value={office.coords[0] || ''}
                                            onChange={(e) =>
                                                updateOfiice(i, {
                                                    ...office,
                                                    coords: [+e.target.value, office.coords[1], office.coords[2]],
                                                })
                                            }
                                        />
                                        <TextField
                                            label="Y"
                                            size="small"
                                            type="number"
                                            value={office.coords[1] || ''}
                                            onChange={(e) =>
                                                updateOfiice(i, {
                                                    ...office,
                                                    coords: [office.coords[0], +e.target.value, office.coords[2]],
                                                })
                                            }
                                        />
                                        <TextField
                                            label="Z"
                                            size="small"
                                            type="number"
                                            value={office.coords[2] || ''}
                                            onChange={(e) =>
                                                updateOfiice(i, {
                                                    ...office,
                                                    coords: [office.coords[0], office.coords[1], +e.target.value],
                                                })
                                            }
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                        <Button
                            onClick={() =>
                                addOffice({
                                    desc: '',
                                    name: '',
                                    color: '#333333',
                                    length: 0,
                                    width: 0,
                                    height: 0,
                                    coords: [0, 0, 0],
                                })
                            }
                        >
                            +
                        </Button>
                    </div>
                    <div className="flex flex-col items-stretch gap-3 overflow-y-scroll max-h-[97vh]">
                        {points.map((point, i) => (
                            <Card className="p-1 min-h-[450px]">
                                <CardHeader
                                    action={
                                        <Button variant="contained" onClick={() => deletePoint(i)}>
                                            -
                                        </Button>
                                    }
                                    title={'Вершина графа'}
                                />
                                <CardContent className="flex flex-col gap-4">
                                    <Typography>Координаты точки</Typography>
                                    <div className="grid gap-1 grid-cols-3">
                                        <TextField
                                            type="number"
                                            label="X"
                                            size="small"
                                            value={point.x}
                                            onChange={(e) => updatePoint(i, { ...point, x: +e.target.value })}
                                        />
                                        <TextField
                                            type="number"
                                            label="Y"
                                            size="small"
                                            value={point.y}
                                            onChange={(e) => updatePoint(i, { ...point, y: +e.target.value })}
                                        />
                                        <TextField
                                            type="number"
                                            label="Z"
                                            size="small"
                                            value={point.z}
                                            onChange={(e) => updatePoint(i, { ...point, z: +e.target.value })}
                                        />
                                    </div>
                                    <Typography>Соединеная с точками</Typography>
                                    <div className="flex flex-col gap-2">
                                        {point.points.map((neighbourPoint, number) => (
                                            <div className="grid gap-1 grid-cols-3">
                                                <TextField
                                                    type="number"
                                                    label="X"
                                                    size="small"
                                                    value={neighbourPoint.x}
                                                    onChange={(e) =>
                                                        updatePoint(i, {
                                                            ...point,
                                                            points: point.points.map((el, i) => ({
                                                                ...neighbourPoint,
                                                                x: i === number ? +e.target.value : el.x,
                                                            })),
                                                        })
                                                    }
                                                />
                                                <TextField
                                                    type="number"
                                                    label="Y"
                                                    size="small"
                                                    value={neighbourPoint.y}
                                                    onChange={(e) =>
                                                        updatePoint(i, {
                                                            ...point,
                                                            points: point.points.map((el, i) => ({
                                                                ...neighbourPoint,
                                                                y: i === number ? +e.target.value : el.y,
                                                            })),
                                                        })
                                                    }
                                                />
                                                <TextField
                                                    type="number"
                                                    label="Z"
                                                    size="small"
                                                    value={neighbourPoint.z}
                                                    onChange={(e) =>
                                                        updatePoint(i, {
                                                            ...point,
                                                            points: point.points.map((el, i) => ({
                                                                ...neighbourPoint,
                                                                z: i === number ? +e.target.value : el.z,
                                                            })),
                                                        })
                                                    }
                                                />
                                            </div>
                                        ))}
                                        <Button
                                            fullWidth
                                            onClick={() =>
                                                updatePoint(i, {
                                                    ...point,
                                                    points: [...point.points, { x: 0, y: 0, z: 0, points: [] }],
                                                })
                                            }
                                        >
                                            +
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                        <Button onClick={() => addPoint({ x: 0, y: 0, z: 0, points: [] })}>+</Button>
                    </div>
                </div>
            </div>
            <Button variant="contained" onClick={exportMap}>
                Экспорт
            </Button>
        </main>
    )
}

export default App

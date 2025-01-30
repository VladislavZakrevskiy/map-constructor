import { FC } from 'react'
import { NodeType, Point, usePointStore } from '../store/pointStore'
import { Button, Card, CardContent, IconButton, MenuItem, Select, TextField, Typography } from '@mui/material'

interface PointFormProps {
    points: Point[]
}

export const PointForm: FC<PointFormProps> = ({ points }) => {
    const { deletePoint, updatePoint, addPoint } = usePointStore()

    return (
        <div className="flex flex-col items-stretch gap-3 overflow-y-auto max-h-[97vh] scrollbar-hide">
            {points.map((point, i) => (
                <Card className="p-1 min-h-[550px]">
                    <div className="mx-3">
                        <Button variant="contained" fullWidth onClick={() => deletePoint(i)}>
                            -
                        </Button>
                    </div>
                    <CardContent className="flex flex-col gap-1">
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
                        <TextField
                            label="ID"
                            size="small"
                            value={point.id}
                            onChange={(e) => updatePoint(i, { ...point, id: e.target.value })}
                        />
                        <TextField
                            label="Имя"
                            size="small"
                            value={point.name}
                            onChange={(e) => updatePoint(i, { ...point, name: e.target.value })}
                        />
                        <TextField
                            label="Крутое имя (Landmark)"
                            size="small"
                            value={point.landmarks?.[0]}
                            onChange={(e) => updatePoint(i, { ...point, landmarks: [e.target.value] })}
                        />
                        <Select
                            label=""
                            size="small"
                            value={point.type}
                            onChange={(e) => updatePoint(i, { ...point, type: e.target.value as NodeType })}
                        >
                            <MenuItem value={'corridor'}>Коридор</MenuItem>
                            <MenuItem value={'room'}>Комната</MenuItem>
                            <MenuItem value={'elevator'}>Лифт</MenuItem>
                            <MenuItem value={'stairs'}>Лестница</MenuItem>
                            <MenuItem value={'entrance'}>Вход в здание</MenuItem>
                        </Select>
                        <Typography>Соединеная с точками</Typography>
                        <div className="flex flex-col gap-2">
                            {point.connections.map((conn, num) => (
                                <div className="flex gap-2">
                                    <IconButton
                                        size="small"
                                        onClick={() =>
                                            updatePoint(i, {
                                                ...point,
                                                connections: point.connections.filter((el, i) => i !== num),
                                            })
                                        }
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            xmlSpace="preserve"
                                            width={10}
                                            height={10}
                                            viewBox="0 0 460.775 460.775"
                                        >
                                            <path d="M285.08 230.397 456.218 59.27c6.076-6.077 6.076-15.911 0-21.986L423.511 4.565a15.55 15.55 0 0 0-21.985 0l-171.138 171.14L59.25 4.565a15.551 15.551 0 0 0-21.985 0L4.558 37.284c-6.077 6.075-6.077 15.909 0 21.986l171.138 171.128L4.575 401.505c-6.074 6.077-6.074 15.911 0 21.986l32.709 32.719a15.555 15.555 0 0 0 21.986 0l171.117-171.12 171.118 171.12a15.551 15.551 0 0 0 21.985 0l32.709-32.719c6.074-6.075 6.074-15.909 0-21.986L285.08 230.397z" />
                                        </svg>
                                    </IconButton>
                                    <TextField
                                        className="flex-1"
                                        label="ID соединенной точки"
                                        size="small"
                                        value={conn}
                                        onChange={(e) =>
                                            updatePoint(i, {
                                                ...point,
                                                connections: point.connections.map((el, i) =>
                                                    i === num ? e.target.value : el
                                                ),
                                            })
                                        }
                                    />
                                </div>
                            ))}
                            <Button
                                fullWidth
                                variant="contained"
                                onClick={() =>
                                    updatePoint(i, {
                                        ...point,
                                        connections: [...point.connections, ''],
                                    })
                                }
                            >
                                +
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            ))}
            <Button
                variant="contained"
                onClick={() =>
                    addPoint({
                        x: 0,
                        y: 0,
                        z: 0,
                        connections: [],
                        floor: 1,
                        id: '',
                        type: 'corridor',
                        landmarks: [''],
                        name: '',
                    })
                }
            >
                +
            </Button>
        </div>
    )
}

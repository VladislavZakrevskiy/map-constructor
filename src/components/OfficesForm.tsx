import { FC } from 'react'
import { Office, useFragmentsStore } from '../store/fragmentsStore'
import { Button, Card, CardContent, TextField } from '@mui/material'
import { usePointStore } from '../store/pointStore'

interface OfficesFormProps {
    offices: Office[]
}

export const OfficesForm: FC<OfficesFormProps> = ({ offices }) => {
    const { addOffice, updateOfiice, deleteOffice } = useFragmentsStore()
    const { addPoint } = usePointStore()

    return (
        <div className="flex flex-col items-stretch gap-1 overflow-y-scroll max-h-[97vh] scrollbar-hide">
            {offices.map((office, i) => (
                <Card className="p-1 min-h-[400px]">
                    <div className="grid grid-cols-2 gap-2 mx-4">
                        <Button
                            variant="contained"
                            onClick={() =>
                                addPoint({
                                    x: office.coords[0],
                                    y: office.coords[1],
                                    z: office.coords[2],
                                    connections: [],
                                    floor: 1,
                                    id: '',
                                    type: 'corridor',
                                    landmarks: [''],
                                    name: '',
                                })
                            }
                        >
                            Вершина
                        </Button>
                        <Button variant="contained" onClick={() => deleteOffice(i)}>
                            -
                        </Button>
                    </div>
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
                variant="contained"
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
    )
}

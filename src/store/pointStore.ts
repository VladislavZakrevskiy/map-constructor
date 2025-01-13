import { create } from 'zustand'

interface Point {
    x: number
    y: number
    z: number
    points: Point[]
}

type State = {
    points: Point[]
}

type Action = {
    addPoint: (point: Point) => void
    deletePoint: (i: number) => void
    updatePoint: (i: number, point: Point) => void
}

export const usePointStore = create<State & Action>((set) => ({
    points: [],
    addPoint: (point) => set((store) => ({ points: [...store.points, point] })),
    deletePoint: (number) => set((store) => ({ points: store.points.filter((_, i) => i !== number) })),
    updatePoint: (number, point) =>
        set((store) => {
            const newPoints = [...store.points]
            newPoints[number] = point
            return { points: newPoints }
        }),
}))

import { create } from 'zustand'

type State = {
    floor: number
}

type Action = {
    setFloor: (floor: number) => void
}

export const useFloorStore = create<State & Action>((set) => ({
    floor: 1,
    setFloor: (floor) => set(() => ({ floor })),
}))

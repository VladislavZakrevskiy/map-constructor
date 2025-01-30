import { create } from 'zustand'


export interface Office {
    length: number
    width: number
    height: number
    coords: [number, number, number]
    color: string
    name: string
    desc: string
}

type State = {
    offices: Office[]
}

type Action = {
    addOffice: (office: Office) => void
    updateOfiice: (i: number, office: Office) => void
    deleteOffice: (i: number) => void
}

export const useFragmentsStore = create<State & Action>((set) => ({
    offices: [],
    addOffice: (office) => set((store) => ({ offices: [...store.offices, office] })),
    deleteOffice: (officeNumber) => set((store) => ({ offices: store.offices.filter((_, i) => i !== officeNumber) })),
    updateOfiice: (officeNumber, office) =>
        set((store) => {
            const newOffices = [...store.offices]
            newOffices[officeNumber] = office
            return { offices: newOffices }
        }),
}))

interface Point {
    x: number
    y: number
    z: number
    points: Point[]
    type: 'plain' | 'lift'
    to: number[]
}

function heuristic(a: Point, b: Point): number {
    return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2) + Math.pow(a.z - b.z, 2))
}

export function aStar(graph: Point[], start: Point, end: Point): Point[] {
    const openSet: Set<Point> = new Set([start])
    const cameFrom: Map<Point, Point | null> = new Map()

    const gScore: Map<Point, number> = new Map(graph.map((point) => [point, Infinity]))
    const fScore: Map<Point, number> = new Map(graph.map((point) => [point, Infinity]))

    gScore.set(start, 0)
    fScore.set(start, heuristic(start, end))

    while (openSet.size > 0) {
        const current: Point | undefined = [...openSet].reduce((a, b) =>
            (fScore.get(a) ?? Infinity) < (fScore.get(b) ?? Infinity) ? a : b
        )

        if (current === end) {
            return reconstructPath(cameFrom, current)
        }

        openSet.delete(current)

        for (const neighbor of current.points) {
            const tentativeGScore = (gScore.get(current) ?? Infinity) + heuristic(current, neighbor)

            if (tentativeGScore < (gScore.get(neighbor) ?? Infinity)) {
                cameFrom.set(neighbor, current)
                gScore.set(neighbor, tentativeGScore)
                fScore.set(neighbor, tentativeGScore + heuristic(neighbor, end))

                if (!openSet.has(neighbor)) {
                    openSet.add(neighbor)
                }
            }
        }

        if (current.type === 'lift') {
            for (const floor of current.to) {
                const floorPoint = graph.find((p) => p.z === floor && p.type === 'lift')
                if (floorPoint && !current.points.includes(floorPoint)) {
                    const tentativeGScore = (gScore.get(current) ?? Infinity) + 1 // Переключение этажей минимальная стоимость

                    if (tentativeGScore < (gScore.get(floorPoint) ?? Infinity)) {
                        cameFrom.set(floorPoint, current)
                        gScore.set(floorPoint, tentativeGScore)
                        fScore.set(floorPoint, tentativeGScore + heuristic(floorPoint, end))

                        if (!openSet.has(floorPoint)) {
                            openSet.add(floorPoint)
                        }
                    }
                }
            }
        }
    }

    return []
}

function reconstructPath(cameFrom: Map<Point, Point | null>, current: Point): Point[] {
    const path: Point[] = [current]
    while (cameFrom.has(current) && cameFrom.get(current)) {
        current = cameFrom.get(current)!
        path.unshift(current)
    }
    return path
}

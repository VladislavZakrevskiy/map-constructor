export function lightenHexColor(hex: string, percent: number) {
    hex = hex.replace(/^#/, '')

    if (hex.length === 3) {
        hex = hex
            .split('')
            .map((char) => char + char)
            .join('')
    }

    const r = parseInt(hex.substring(0, 2), 16)
    const g = parseInt(hex.substring(2, 4), 16)
    const b = parseInt(hex.substring(4, 6), 16)

    const lightenChannel = (channel: number) => Math.min(255, Math.floor(channel + (255 - channel) * (percent / 100)))

    const newR = lightenChannel(r).toString(16).padStart(2, '0')
    const newG = lightenChannel(g).toString(16).padStart(2, '0')
    const newB = lightenChannel(b).toString(16).padStart(2, '0')

    return `#${newR}${newG}${newB}`
}

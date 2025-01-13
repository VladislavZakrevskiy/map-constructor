export function getContrastingColor(hex: string) {
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

    const brightness = (r * 299 + g * 587 + b * 114) / 1000

    return brightness > 128 ? '#000000' : '#FFFFFF'
}

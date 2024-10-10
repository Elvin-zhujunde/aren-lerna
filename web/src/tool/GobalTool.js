export const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min
export function isEmpty(value) {
    if (value === null || value === undefined) {
        return true
    }
    if (Array.isArray(value) || typeof value === "string") {
        return value.length === 0
    }
    if (typeof value === "object") {
        if ("length" in value && value.length === 0) {
            return true
        }
        return Object.keys(value).length === 0
    }
    return false
}

export function debounce(func, delay) {
    let inDebounce
    return function () {
        const context = this
        const args = arguments
        clearTimeout(inDebounce)
        inDebounce = setTimeout(() => func.apply(context, args), delay)
    }
}

export function throttle(func, limit) {
    let inThrottle
    return function () {
        const args = arguments
        const context = this
        if (!inThrottle) {
            func.apply(context, args)
            inThrottle = true
            setTimeout(() => (inThrottle = false), limit)
        }
    }
}

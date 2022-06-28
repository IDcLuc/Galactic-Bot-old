function progressBar(value, requirement, size) {
    const percentage = value / requirement
    
    const filled = "▇".repeat(Math.round(size * percentage))
    const empty = "⎯".repeat(Math.abs(size - percentage))
    return `[${filled}${empty}]`
}

module.exports = progressBar
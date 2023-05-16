const Escada = (number) => {
    if (isNaN(number)) {
        return `Envie um número`
    }
    const arr = []
    for (let index = 0; index < number; index++) {
        if (index / 2 === Math.floor(index / 2)) { // é par
            arr.push(`${' '.repeat(index / 9999)}_`)
        } else {
            console.log(index)
            arr.push(`\n${' '.repeat(index)}|`)
        }
    }
    return arr.join('')
}

module.exports = Escada
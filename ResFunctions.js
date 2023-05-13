const ErrorNotSpaced = (type) => {return `Ocorreu um Erro: O comando utiliza espaço, não junto. Exemplo: !${type} 6 !${type} 20`}
const ErrorNotNumber = (type) => {return `Ocorreu um Erro: O comando ${type} requer que você envie um número. Exemplo: !${type} 6 !${type} 20 !${type} 100`}

const Functions = {
    Dado: (MSGNORMALIZED) => {
            console.log('Rodando função de dado.', `Parâmetros:${MSGNORMALIZED}`)
            if (!MSGNORMALIZED.includes(' ')) {
                console.log('Deu erro por não ter espaço.')
                return ErrorNotSpaced('Dado')
            }
            const num = MSGNORMALIZED.split(' ')[1]
            console.log('número extraído:',num)
            if (isNaN(num)) {
                return ErrorNotNumber('Dado')
            }
            const realNum = parseInt(num)
            if (typeof realNum === "number" && realNum > 0 && realNum % 1 === 0) {
                console.log(`número é natural.`)
                return `Você rolou um dado de ${realNum} lados. Seu resultado foi: ${Math.floor(Math.random() * realNum) + 1}`
            } else {
                console.log(`número não é natural.`) 
                return 'Ocorreu um Erro: Você enviou um número que não é natural. Envie um número maior que 0 e sem casas decimais.'            
            }
        },
        Cartas: (MSGNORMALIZED) => {
            console.log('Rodando função de cartas', `Parâmetros: ${MSGNORMALIZED}`)
            // CRIAÇÃO DO BARALHO
            const naipes = ["ouros", "copas", "espadas", "paus"];
            const valores = ["Ás", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Valete", "Rainha", "Rei"];
            const baralho = [];
            for (let naipe of naipes) {
                for (let valor of valores) {
                    baralho.push(valor + " de " + naipe);
                        }
                    }
                    console.log('Baralho formado')
// ------------------------- LÓGICA ------------------
            console.log('Startou lógica.')
            if (!MSGNORMALIZED.includes(' ')) {
                console.log('Deu erro por não ter espaço.')
                return ErrorNotSpaced('Cartas')
            }
            const num = MSGNORMALIZED.split(' ')[1]
            console.log('número extraído:',num)
            if (isNaN(num)) {
                return ErrorNotNumber('Cartas')
            }
            const realNum = parseInt(num)
            if (realNum > 52) {
                return `Sinto muito, mas só posso contabilizar levando em conta um baralho de 52 cartas. Tente um número mais baixo.`
            }
            if (typeof realNum === "number" && realNum > 0 && realNum % 1 === 0) {
                console.log(`número é natural.`)
                const array = []
                for (let index = 0; index < realNum; index++) {
                    const RNG = Math.floor(Math.random() * (52 - index))
                    const removedCard = baralho.splice(RNG, 1);
                    array.push(removedCard[0]);
                }
                const responseString = array.join(', ')
                return `Você tirou ${MSGNORMALIZED} do baralho. Você conseguiu: ${responseString}`
            } else {
                console.log(`número não é natural.`) 
                return 'Ocorreu um Erro: Você enviou um número que não é natural. Envie um número maior que 0 e sem casas decimais.'            
            }

    }
}

module.exports = Functions
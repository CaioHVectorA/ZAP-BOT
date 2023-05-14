const { default: axios } = require("axios")
const piadas = require("./utilities/Piadas")


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
    },
    MultipleDados: (MSGNORMALIZED) => {
        console.log('Rodando função de múltiplo dados. Parâmetros:',MSGNORMALIZED)
        if (!MSGNORMALIZED.includes(' ')) {
            console.log('Erro por não ter espaços.')
            return `Sinto muito, mas eu necessito que você envie um comando com espaços, se não eu não entendo!`
        }
        const split = MSGNORMALIZED.split(' ')
        numLados = split[1]
        numDados = split[2]
        console.log('Números extraídos:',numLados,numDados)
        if (isNaN(numLados) || isNaN(numDados)) {
            return `Não entendi. Você enviou letras e não números. Mande novamente, no formato !Dados <Num. Lados> <Num. Dados>`
        }
        const realNumLados = parseInt(numLados)
        const realNumDados = parseInt(numDados)
        if (realNumDados > 1000) {
            return `Calmaí, mermão! Eu sei que sou um robô mas não dou conta disso tudo. Mande menos números, por favor.`
        }
        console.log('numDados natural:',realNumDados > 0 && realNumDados % 1 === 0)
        console.log('numLados natural:',realNumLados > 0 && realNumLados % 1 === 0)
        if (realNumDados > 0 && realNumDados % 1 === 0 && realNumLados > 0 && realNumLados % 1 === 0) {
            const dados = []
            for (let index = 0; index < realNumDados; index++) {
                const RNG = Math.floor(Math.random() * realNumLados) + 1
                let indice = index
                indice = indice + 1
                dados.push(`Dado ${indice}: ${RNG}`)
                console.log(dados)
            }
            let textRes = dados.join(' \n')
            console.log('antes do format:', textRes)
            return textRes
        } else {
            return `Você não enviou números naturais. Só entedo números naturais: Maior que zero e sem vírgula.`
        }
    },
    Piada: () => {
        const RNG = Math.floor(Math.random() * piadas.length)
        const {pergunta, resposta} = piadas[RNG]
        return `${pergunta} \n ${resposta}`
    },
    Significado: async (MSGNORMALIZED) => {
        console.log('Rodando função de significados')
        if (!MSGNORMALIZED.includes(' ')) {
            console.log('Erro por não ter espaço')
            return `Envie no formato !Significado <Palavra>`
        } else {
            console.log('Iniciando lógica')
            const dataArray = []
            const palavra = MSGNORMALIZED.split(' ')[1]
            console.log('Chegando no fetch')
            return fetch(`https://dicio-api-ten.vercel.app/v2/significados/${palavra}`).then((Response) => Response.json()).then(data => {
                console.log('data:', data)
                if (data.error) {return `Ocorreu um erro: Eu não sei o significado dessa palavra. Tente outra.`}
                data.forEach(item => {
                    console.log('item existe? :',item.partOfSpeech)
                    const classeGramatical = item.partOfSpeech
                    const arraySignificados = []
                    item.meanings.forEach(item => {
                        arraySignificados.push(item)
                    })
                    const Significado = arraySignificados.join('\n')
                    const Text = `${classeGramatical} \n \n ${Significado}`
                    dataArray.push(Text)
                })
                const Response = dataArray.join(`\n ____________________ \n`)
                console.log('Retornando Resposta')
                return Response
            })
        }
    }
}

module.exports = Functions
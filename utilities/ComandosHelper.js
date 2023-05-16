function getComandos() {
    return (
        `Olá! Eu sou o Yeg Bot! Posso te ajudar com minhas habilidades e sabedorias. \n
        Basta você utilizar os comandos que eu obedecerei, desde que esteja tudo correto! \n
        *OBSERVAÇÃO*: Tudo aquilo que estiver envolvido em "setas" (< e >) é um parâmetro. Troque a palavra envolvida com as setas por um parâmetro em questão, como número, palavra ou o que for pedido. \n
*!Dado <Numero>* - Rola um dado com n° de lados a partir do que você escolhe e gera um número aleatório. Boa sorte!

*!Dados <NumeroLados> <NumeroDados>* - Rola dados a partir da quantidade que você quiser. Eu tenho muitos dados!

*!Piada* - Eu respondo com uma piada. Talvez o humor de um robô não perfeito para os humanos, mas eu tento!

*!Significado <Palavra>* - Eu busco no meu dicionário o significado da palavra em português que enviar. Eu posso enviar vários significados também!

*!Cartas <Numero>* - Eu envio um punhado de cartas a partir do número que escolher. Pode ser ouros, copas, espadas, paus. Eu só tenho 52 cartas!
        `
    )
}
module.exports = getComandos
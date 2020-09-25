const contentInfoVoto = document.querySelector('.content-info-voto')
const contentInfoCargo = document.querySelector('.content-info-cargo')
const description = document.querySelector('.content-infos')
const screenInfo = document.querySelector('.screen-info')
const screenContentPhoto = document.querySelector('.screen-content-photo')
const contentInfoNumbers = document.querySelector('.content-info-number')
const keyboardNumbers = document.querySelectorAll('.keyboard-button')
const keyboard = document.querySelector('.keyboard')

const whiteBtn = document.querySelector('#button-white')
const corrigirBtn = document.querySelector('#button-red')
const confirmarBtn = document.querySelector('#button-green')

let numberVoto = ''
let votoBranco = ''
let votoNulo = ''
let etapa = 0
let votoConfirmado = ''

keyboard.addEventListener('click', (event) => {
    if (event.target.className == 'keyboard-button') {
        const number = event.target.dataset.number
        getNumber(number)
    }
})

corrigirBtn.addEventListener('click', () => {
    numberVoto = ''
    start()
    createBoxNumber()
})

whiteBtn.addEventListener('click', () => {
    if (numberVoto == '') {
        contentInfoNumbers.style.display = 'none'
        description.style.display = ' block'
        contentInfoVoto.style.display = 'block'
        screenInfo.style.display = 'block'
        description.innerHTML = `<div class="nulo animation">VOTO EM BRANCO</div>`
        votoBranco = true
    } else {
        alert(`Para votar em branco não pode haver numeros digitados, 
para tentar novamente aperte em CORRIGIR!`)
    }
})

confirmarBtn.addEventListener('click', () => {
    if (votoBranco == true) {
        alert('Confirmar voto em branco')
        votoConfirmado = true
    } else if (votoNulo == true) {
        alert('Confirmar voto nulo')
        votoConfirmado = true
    } else {
        alert(`Confirmar voto em ${numberVoto}`)
        votoConfirmado = true
    }
    if (votoConfirmado == true) {
        etapa++
        if (list[etapa] !== undefined) {
            numberVoto = ''
            start()
            createBoxNumber()
        }
        else {
            document.querySelector('.screen').innerHTML = ` <div class="end animation">FIM</div>`
            console.log('fim')
        }
    }
})

function getNumber(number) {
    const numberContent = document.querySelector('.number-content.animation')
    numberContent.innerHTML = number
    numberVoto += number
    numberContent.classList.remove('animation')
    if (numberContent.nextElementSibling !== null) {
        numberContent.nextElementSibling.classList.add('animation')
    } else {
        update(numberVoto)
    }
}
const contentPhoto = document.createElement('div')

function update(numberVoto) {

    let candidate = list[etapa].candidate.filter(e => {
        if (numberVoto == e.number) {
            return true
        } else {
            return false
        }
    })

    console.log(list[etapa])
    console.log(candidate)
    console.log(numberVoto)


    contentInfoVoto.style.display = 'block'
    screenInfo.style.display = 'block'
    screenContentPhoto.style.display = 'block'
    description.style.display = ' block'

    if (candidate.length == 0) {
        description.innerHTML = `<div class="nulo animation">VOTO NULO</div>`
        votoNulo = true
    } else {
        description.innerHTML = ` Nome: <strong>${candidate[0].name}</strong> <br><br>
            Partido: <strong>${candidate[0].partido}</strong> <br><br>`


        let fotos = candidate[0].fotos[0]


        contentPhoto.classList.add('content-image')

        let photo = ''

        for (let i = 0; i <= candidate[0].fotos.length - 1; i++) {
            contentPhoto.innerHTML = photo += ` 
                    <img src="images/${candidate[0].fotos[i].url}" alt="">
                    <span>${candidate[0].fotos[i].legenda}</span>
                `

            screenContentPhoto.appendChild(contentPhoto)

        }

    }




}

function start() {
    contentInfoVoto.style.display = 'none'
    screenInfo.style.display = 'none'
    screenContentPhoto.style.display = 'none'
    description.style.display = 'none'
    contentInfoNumbers.style.display = 'none'

}
const contentNumbers = document.createElement('div')

function createBoxNumber() {
    let n = ''
    contentInfoNumbers.style.display = 'block'
    contentInfoCargo.innerHTML = `${list[etapa].title}`
    for (let i = 0; i < list[etapa].number - 1; i++) {
        if (i === 0) {
            contentNumbers.innerHTML = n += ` <div class="number-content animation"></div>`
        }
        contentNumbers.innerHTML = n += ` <div class="number-content"></div>`
        contentInfoNumbers.appendChild(contentNumbers)
    }

}

start()
createBoxNumber()




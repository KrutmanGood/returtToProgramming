const cryptoName = document.querySelector('.field')
const list = document.querySelector('.list')

console.log('ok')

async function addCrypto() {
    // localStorage.clear()
    const cryptosString = localStorage.getItem('list')

    console.log(cryptosString)

    if (!cryptosString) {
        const info = await axios.get('http://localhost:3000/getPrice', {
            params: {
                name: cryptoName.value,
            }
        })

        if (info) {
            const correctField = document.querySelector('#zero')
            correctField.innerHTML = `${cryptoName.value}: ${info}$`

            localStorage.setItem('list', cryptoName.value)
        }
    } else {
        if (cryptoName.value !== '') {
            const cryptoList = cryptosString.split('/')
        
            const numbers = ['zero', 'one', 'two', 'three', 'four']

            const info = await axios.get('http://localhost:3000/getPrice', {
                params: {
                    name: cryptoName.value,
                }
            })

            if (!cryptoList.includes(cryptoName.value) && info) {
                if (cryptoList.length === 5) {
                    cryptoList.shift()                    

                    cryptoList.push(cryptoName.value)
                } else {
                    cryptoList.push(cryptoName.value)
                }
            }

            for (let el of cryptoList) {
                const index = cryptoList.findIndex((e) => e === el)
                const info = await axios.get('http://localhost:3000/getPrice', {
                    params: {
                        name: el,
                    }
                })

                const correctField = document.querySelector(`#${numbers[index]}`)
                correctField.innerHTML = `${el}: ${info.data}$`     
            }

            localStorage.clear()
            localStorage.setItem('list', `${cryptoList.join('/')}`)
        }
    }    
}

async function checkPrices() {
    // localStorage.clear()
    const cryptosString = localStorage.getItem('list')

    console.log(cryptosString)

    if (cryptosString) {
        const cryptoList = cryptosString.split('/')

        const numbers = ['zero', 'one', 'two', 'three', 'four']

        console.log(cryptoList, cryptoList.length)

        for (let el of cryptoList) {
            const index = cryptoList.findIndex((e) => e === el)
            const info = await axios.get('http://localhost:3000/getPrice', {
                params: {
                    name: el,
                }
            })

            const correctField = document.querySelector(`#${numbers[index]}`)
            correctField.innerHTML = `${el}: ${info.data}$`
        }

        console.log(2)
    }    
}

checkPrices()
setInterval(checkPrices, 20000)
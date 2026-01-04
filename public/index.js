const connectionStatus = document.getElementById('connection-status')
const investBtn = document.getElementById('invest-btn')
const popupCloseBtn = document.getElementById('popup-close-btn')
const investForm = document.querySelector('.invest-form')
const outputs = document.querySelector('.outputs')
const priceDisplay = document.getElementById('price-display')
const investmentSummary = document.getElementById('investment-summary')

const eventSource = new EventSource('/gold/live')

// eventlisteners
investForm.addEventListener('submit',async(e)=>{
    e.preventDefault()
    const marketPrice = priceDisplay.textContent
    const investMoney = document.getElementById('investment-amount').value
    const goldAmt = Number((investMoney / marketPrice).toFixed(3))
    investmentSummary.textContent = `You just bought ${goldAmt} ounces (ozt) for £${investMoney}. \n You will receive documentation shortly.`

    const email = (document.getElementById('email').value).trim()
    
    await purchaseFetch(investMoney)

    await emailFetch(email)

    makePopupAppear()

})

popupCloseBtn.addEventListener('click', ()=>{
    makePopupClose()
    location.reload()
})




// functions
async function checkStatus(){
    try{
    const res = await fetch('/health', {cache: 'no-store'})
        if (res.ok === true){
            connectionStatus.textContent = 'Live Price 🟢'
        } else{
            connectionStatus.textContent = 'Live Price 🔴'
        }
    } catch{
        connectionStatus.textContent = 'Live Price 🔴'
    }
}

function makePopupAppear(){
    outputs.style.display = 'flex'
    investForm.style.display = 'none'
    
}

function makePopupClose(){
    outputs.style.display = 'none'
    investForm.style.display = 'flex'
}

async function purchaseFetch(investMoney) {
    await fetch('/purchase', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({investMoney})
    })   
}

async function emailFetch(email) {
    await fetch('/sendemail', {
        method: 'POST', 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email})
    })    
}


// eventSource function
eventSource.onmessage = (event) =>{
    const data = JSON.parse(event.data)
    const goldPrice = data.price

    priceDisplay.textContent = goldPrice
}

eventSource.onerror = ()=>{
    console.log('Connection failed...')
}


// others related to functions
checkStatus()
setInterval(checkStatus, 2000)
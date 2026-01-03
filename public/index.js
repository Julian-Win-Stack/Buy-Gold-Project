const connectionStatus = document.getElementById('connection-status')
const investBtn = document.getElementById('invest-btn')
const popupCloseBtn = document.getElementById('popup-close-btn')
const investForm = document.querySelector('.invest-form')
const outputs = document.querySelector('.outputs')
const priceDisplay = document.getElementById('price-display')
const investmentSummary = document.getElementById('investment-summary')

const eventSource = new EventSource('/gold/live')

// eventlisteners
investForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const marketPrice = priceDisplay.textContent
    const money = document.getElementById('investment-amount').value
    const goldAmt = Number((money / marketPrice).toFixed(1))
    investmentSummary.textContent = `You just bought ${goldAmt} ounces (ozt) for £${money}. \n You will receive documentation shortly.`

    outputs.style.display = 'flex'
    investForm.style.display = 'none'
})

popupCloseBtn.addEventListener('click', ()=>{
    outputs.style.display = 'none'
    investForm.style.display = 'flex'
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
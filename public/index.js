const connectionStatus = document.getElementById('connection-status')
const investBtn = document.getElementById('invest-btn')
const popupCloseBtn = document.getElementById('popup-close-btn')
const investForm = document.querySelector('.invest-form')
const outputs = document.querySelector('.outputs')

// eventlisteners
investForm.addEventListener('submit',(e)=>{
    e.preventDefault()
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


// others related to functions
checkStatus()
setInterval(checkStatus, 2000)
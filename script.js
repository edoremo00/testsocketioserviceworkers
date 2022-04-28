

//parte client
//const socket=io('http://localhost:3000')//location del server

const socket=io('/')//location del server
const messageForm=document.getElementById('send-container')
const messagecontainer=document.getElementById('message-container')
const messageInput=document.getElementById('message-input')
const userwritingdiv=document.getElementById('status')
const user=prompt('inserisci il tuo nome')
let timer,waitingtime=1000
let onlyonce=true
appendMessage('Ti Sei Unito alla chat')
socket.emit('new-user',user)
socket.on('send-chat-message',(data,user)=>{
    //appendMessage(data)
    appendMessagev2(data,user)
})

socket.on('user-connected',(utentecollegato)=>{
    appendMessage(`${utentecollegato} si è collegato `)
})

socket.on('user-disconnected',(user,reason)=>{
    if(reason){
        if(reason==='transport close'){
            appendMessage(`${user} ha lasciato la chat a causa di Problemi di rete`)
        }else if(reason==='transport error'){
            appendMessage(`${user} ha lasciato la chat a causa di errori di rete`)
        }else{
            appendMessage(`${user} ha lasciato la chat`)
        }
    }
})

messageInput.addEventListener('keydown',(event)=>{
    window.clearTimeout(timer)//clear timeout sarà agirà sempre su un undefined qui
    //dal momento che evento keypress avviene prima di evento keyup
    //tuttavia non da nessuna eccezzione
    socket.emit('user-writing',`${user} sta Scrivendo...`)
    if(user[socket.id]===socket.id){
        userwritingdiv.innerHTML=`stai scrivendo`
    }else{
        userwritingdiv.innerHTML=`${user} sta Scrivendo...`
    }
})

    socket.on('useriswriting',(utente)=>{
       
    })
messageInput.addEventListener('keyup',(event)=>{
        window.clearTimeout(timer)
        timer=window.setTimeout(()=>{
            userwritingdiv.innerHTML=''
            
        },waitingtime)
})


messageForm.addEventListener('submit',e=>{
    e.preventDefault()
    const message=messageInput.value
    socket.emit('send-chat-message',message)//si usa emit quando voglio mandare dati da client a server
    //si usa broadcast.emit se voglio mandarlo a utenti collegati escluso chi lo ha mandato
    messageInput.value=''
})

document.addEventListener('load',async()=>{
    let sw=await navigator.serviceWorker.register('serviceworker.js').then(()=>{
        console.log(sw)//ok
    },(error)=>console.log(error))//errore
    console.log(sw)
})

async function subscribe(){//mostrerà popup all'utente se vuole consentire le notifiche
//lo fa chiamando il push manager. che sta sul service worker
let sw=await navigator.serviceWorker.ready.then(()=>{
    console.log(push)
},(error)=>{
    console.log('error in service worker')
})
let push= await sw.pushManager.subscribe({
    userVisibleOnly:true,
    applicationServerKey:'BPgZmAUaE3mwCZbv5rd7zauE3B-ZZZVMD2e-_vbpaGMNbbnKkPI1d-rKRWUe1v-9J3M31gDnPARbq5a2AOrTAfE',//qui andranno le key che saranno generate da pacchetto web-push
})
}




function appendMessage(message){
    const messageElement=document.createElement('div')
    messageElement.innerText=message
    messagecontainer.append(messageElement)

}

function appendMessagev2(message,user){
    let strtoappend=`
    <span>${user}:</span>
    ${message}
    `
    /*const messageElement=document.createElement('div')
    const senderElement=document.createElement('p')
    senderElement.innerText=`${user} dice ${message}`
    messageElement.innerText=message
    messagecontainer.append(messageElement)*/
    const messageElement=document.createElement('div')
    messageElement.innerHTML=strtoappend
    messagecontainer.append(messageElement)

}
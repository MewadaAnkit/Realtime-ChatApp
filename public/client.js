
window.onload=()=>{
var socket = io()
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message_area')
let name;
do{
    name= prompt('Please Enter your name ')
}while(!name)

function sendMessage(message){
    let msg={
       user:name,
       message:message.trim()
    }
    appendMessage(msg,'outgoing')
    textarea.value = ''
    scrollToBottom()

    //send to server
     socket.emit('message', msg)
   
}
function appendMessage(msg,type){
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className,'message')
    let markup  = ` 
         <h4>${msg.user}</h4>
         <p>${msg.message}</p>
  
         `
         mainDiv.innerHTML = markup
      messageArea.appendChild(mainDiv)    
    }

textarea.addEventListener('keyup',(e)=>{
    if(e.key==='Enter'){
        sendMessage(e.target.value)
    }
})
//receiving msg from server
socket.on('message1',(msg)=>{
    appendMessage(msg ,'incoming')
   console.log(msg)
    scrollToBottom()
})
function scrollToBottom(){
    messageArea.scrollTop = messageArea.scrollHeight
}

}
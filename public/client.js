
window.onload=()=>{
var socket = io()
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message_area')
let users_list = document.querySelector('.users_list')
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
  // console.log(msg)
    scrollToBottom()
})
function scrollToBottom(){
    messageArea.scrollTop = messageArea.scrollHeight
}
socket.emit('user-joined',name)
socket.on('user-connected',socket_name=>{
    userLeftJoined(socket_name,"joined")
    //appendMessage(`${socket_name} join the aya `,'status')
})
socket.on('left',(name)=>{
    userLeftJoined(name,'Left');

});
 function userLeftJoined(name,status){
    let mainDiv = document.createElement('div')
    //let className = type
    mainDiv.classList.add('usr-joined')
    let join = ` 
         <p><b>${name}</b> ${status} the chat....</p>
         `
         mainDiv.innerHTML = join
      messageArea.appendChild(mainDiv)
 }
 socket.on('user-list',(users)=>{
    users_list.innerHTML=" ";
    users_arr = Object.values(users);
    for(i=0;i<users_arr.length;i++){
        let p = document.createElement('p')
        p.innerHTML = users_arr[i];
        users_list.appendChild(p);
    }
 })
 
}


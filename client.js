const socket = io('http://localhost:8000');
// get DOM elements in respective js variables
 const form = document.getElementById('send-container');
 const messageInput = document.getElementById('messageInp');
 const messageContainer = document.querySelector(".container");
 //Audio that will play on receiving messages
 var audio = new Audio('ting.mp3');
// Function which will appends event info to the container
 const append = (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position == 'left'){
        audio.play();

    }
    

 }

 // Ask new users for his/her name and lets the erver know
 const name = prompt("Enter your name to join");
 socket.emit('new-user-joined', name);
 // If a new user joins, receive his/her name from the server 
 socket.on('user-joined', data =>{
    append(`${name} joined the chat`,'right')

 })
 // If server sends a message receives it
 socket.on('receive', data =>{
    append(`${data.name}: ${data.message}`,'left')

 })
 // If a user leaves the caht, append the info to the container
 socket.on('left', name =>{
    append(`${name} left the chat`,'right')

 })
 // If the form gets submitted send server the message
 form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.Value;
    append(`You: ${message}`,'right');
    socket.emit('send',message);
    messageInput.value =''

 })




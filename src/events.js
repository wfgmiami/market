const socket = io(window.location.origin);
socket.on( 'connect', ()=> {
  console.log('success')
})

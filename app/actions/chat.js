import { createSocket } from "@t8n/tsocket";



export default createSocket((socket) => {

  // Handshake and Identification
  socket.on("open", (client) => {
    client.send("welcome", {
      msg: "Welcome to the Titan Starship!",
      id: client.id
    });
  });

  // Room Management
  socket.on("join_room", (client, room) => {
    const r = room.toLowerCase();
    client.join(r);

    // Notify others in the room
    socket.to(r).broadcast("user_joined", {
      user: client.id,
      room: r
    });

    client.send("room_joined", { room: r });
  });

  socket.on("room_chat", (client, data) => {
    let { room, message } = data;
    room = room.toLowerCase();

    socket.broadcast("room_message", {
      user: client.id,
      room: room,
      text: message
    });
  });


  // Generic String Support
  socket.on("message", (client, data) => {
    socket.broadcast("room_message", {
      user: client.id,
      room: "general",
      text: `[Raw] ${data}`
    });
  });

});
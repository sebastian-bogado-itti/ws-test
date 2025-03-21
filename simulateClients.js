const { Client } = require('@stomp/stompjs');
const SockJS = require('sockjs-client');
global.WebSocket = require('ws'); // necesario en entorno Node.js

const serverUrl = 'http://localhost:8083'; // o tu URL real
const TOTAL_CLIENTS = 10000;
const clients = [];

for (let i = 0; i < TOTAL_CLIENTS; i++) {
    const userId = i + 1; // userId entre 1 y 6000

    const client = new Client({
        webSocketFactory: () => new SockJS(`${serverUrl}/ws`),
        reconnectDelay: 5000,
        debug: () => {}, // silencioso para no llenar la consola
    });

    client.onConnect = () => {
        console.log(`✅ Cliente ${userId} conectado`);
        client.subscribe(`/topic/user/${userId}`, (message) => {
            console.log(`📨 Cliente ${userId} recibió: ${message.body}`);
        });
    };

    client.onStompError = (frame) => {
        console.error(`❌ Error Cliente ${userId}:`, frame.headers['message']);
    };

    client.activate();
    clients.push(client);
}
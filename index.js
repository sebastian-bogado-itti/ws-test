const {Client} = require("@stomp/stompjs");
const SockJS = require("sockjs-client");

const client = new Client({
        webSocketFactory: () => new SockJS("https://cloud-monchis-kong-c-2-m-development-yebbf.mon-dev-sae1.monchis.com.py/drivers/notification/ws"),
    reconnectDelay: 5000,
    debug: (msg) => console.log(msg),
});

client.onConnect = () => {
    console.log("Connected");
    client.subscribe("/topic/user/4", (message) => {
        console.log("Received:", message.body);
    });
};

client.onStompError = (frame) => {
    console.error("Broker reported error: ", frame.headers["message"]);
    console.error("Additional details: ", frame.body);
};

client.activate();

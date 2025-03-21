const axios = require('axios');

const API_URL = 'http://localhost:8082/api/v1/notifications';

async function sendNotification(userId, externalId) {
    const data = {
        title: "title test",
        description: "description",
        type: "TEST",
        priority: "LOW",
        userId,
        firebaseToken: "token",
        notificationType: "TEST",
        externalId,
        payload: {
            additionalProp1: "Test",
            additionalProp2: "TEst",
            additionalProp3: "Test",
        },
    };

    try {
        const response = await axios.post(API_URL, data, {
            headers: {
                'Content-Type': 'application/json',
                'x-client': '9999',
                'accept': '*/*',
            },
        });
        console.log(`✅ Notificación enviada a userId ${userId}`);
    } catch (error) {
        console.error(`❌ Error al enviar notificación a userId ${userId},`, error.response?.data || error.message);
    }
}

const DURATION_MS = 4 * 60 * 1000; // 4 minutos
const START_TIME = Date.now();
let userCounter = 1;
const userQuantity = 10000;

function runBatch() {
    if (Date.now() - START_TIME >= DURATION_MS) {
        console.log("⏱️ Fin del envío de notificaciones");
        return;
    }

    // Enviar un lote de 50 notificaciones por ciclo (~simulación controlada)
    for (let i = 0; i < 50; i++) {
        sendNotification(userCounter % userQuantity, 100000 + userCounter);
        userCounter++;
    }

    // Llamar de nuevo después de un pequeño delay para evitar saturar la API
    setTimeout(runBatch, 500); // cada 500ms
}

runBatch();

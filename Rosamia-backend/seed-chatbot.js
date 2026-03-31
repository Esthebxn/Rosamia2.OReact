const { admin, db } = require("./config/firebaseAdmin");

async function seedChatbot() {
  await db.collection("chatbot_config").doc("main").set({
    nombre: "Rosamia",
    welcomeMessage: "¡Hola! Soy Rosamia, tu asistente virtual. Estoy aquí para ayudarte con información sobre nuestros productos y servicios. ¿En qué puedo asistirte hoy?",
    online: true,
    updatedAt: admin.firestore.FieldValue.serverTimestamp()
  });

  const trainingData = [
    {
      keyword: "hola",
      response: "¡Hola! Bienvenida a Rosamia Detalles. ¿En qué puedo ayudarte hoy?"
    },
    {
      keyword: "productos",
      response: "Tenemos flores, arreglos, detalles personalizados y regalos especiales. ¿Quieres ver nuestros productos?"
    },
    {
      keyword: "envios",
      response: "Sí, realizamos envíos. Escríbenos por WhatsApp para coordinar la entrega."
    },
    {
      keyword: "horario",
      response: "Nuestro horario de atención es de lunes a sábado. Si deseas, puedo ayudarte con más información."
    },
    {
      keyword: "ayuda",
      response: "Puedo ayudarte con productos, pedidos, catálogo, horarios y consultas generales."
    }
  ];

  for (const item of trainingData) {
    await db.collection("chatbot_training").doc(item.keyword.toLowerCase()).set({
      keyword: item.keyword.toLowerCase(),
      response: item.response,
      active: true,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
  }

  console.log("OK. Base personalizada del chatbot creada en Firebase.");
  process.exit(0);
}

seedChatbot().catch((error) => {
  console.error("Error creando la base del chatbot:", error);
  process.exit(1);
});

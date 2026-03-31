const { db } = require("./config/firebaseAdmin");
const serviceAccount = require("./config/serviceAccountKey.json");

async function test() {
  console.log("Proyecto Firebase:", serviceAccount.project_id);
  console.log("Cliente:", serviceAccount.client_email);

  const ref = await db.collection("prueba").add({
    nombre: "Rosamia",
    creadoEn: new Date().toISOString()
  });

  console.log("OK. Documento creado con ID:", ref.id);
  process.exit(0);
}

test().catch((error) => {
  console.error("Error Firebase:", error);
  process.exit(1);
});

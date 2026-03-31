const { admin, db } = require("./config/firebaseAdmin");

async function seedCatalogo() {
  await db.collection("catalogo").doc("1").set({
    id: 1,
    titulo: "Cat�logo Rosamia 2025",
    anio: 2025,
    archivo_pdf: "https://rosamia-backend-production.up.railway.app/uploads/rosamia7.pdf",
    total_descargas: 0,
    activo: 1,
    created_at: admin.firestore.FieldValue.serverTimestamp(),
    updated_at: admin.firestore.FieldValue.serverTimestamp()
  });

  console.log("OK. Documento de catalogo creado en Firebase.");
  process.exit(0);
}

seedCatalogo().catch((error) => {
  console.error("Error al crear catalogo:", error);
  process.exit(1);
});

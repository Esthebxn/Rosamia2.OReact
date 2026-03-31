const { admin, db } = require("./config/firebaseAdmin");

async function seedProductos() {
  const productos = [
    { id: 1,  name: "Collar Rosamia",        category: "Accesorios", price: 35.50, description: "Collar elegante Rosamia",           image: "", active: true, image2: "", image3: "", image4: "" },
    { id: 2,  name: "Pulsera Dorada",        category: "Accesorios", price: 22.99, description: "Pulsera dorada de lujo",            image: "", active: true, image2: "", image3: "", image4: "" },
    { id: 3,  name: "Anillo Brillo",         category: "Joyeria",    price: 18.75, description: "Anillo con acabado brillante",      image: "", active: true, image2: "", image3: "", image4: "" },
    { id: 4,  name: "Set Primavera",         category: "Colecciones",price: 49.90, description: "Set especial de temporada",         image: "", active: true, image2: "", image3: "", image4: "" },
    { id: 5,  name: "Aretes Luna",           category: "Joyeria",    price: 16.00, description: "Aretes delicados estilo luna",      image: "", active: true, image2: "", image3: "", image4: "" },
    { id: 6,  name: "Cadena Silver",         category: "Accesorios", price: 27.40, description: "Cadena plateada unisex",            image: "", active: true, image2: "", image3: "", image4: "" },
    { id: 7,  name: "Pulsera Perla",         category: "Joyeria",    price: 24.30, description: "Pulsera con detalle perlado",       image: "", active: true, image2: "", image3: "", image4: "" },
    { id: 8,  name: "Anillo Premium",        category: "Joyeria",    price: 31.99, description: "Anillo premium para ocasi�n especial", image: "", active: true, image2: "", image3: "", image4: "" },
    { id: 9,  name: "Collar Corazon",        category: "Accesorios", price: 29.50, description: "Collar con dije de coraz�n",       image: "", active: true, image2: "", image3: "", image4: "" },
    { id: 10, name: "Set Rosamia Deluxe",    category: "Colecciones",price: 59.99, description: "Colecci�n deluxe Rosamia",          image: "", active: true, image2: "", image3: "", image4: "" }
  ];

  for (const p of productos) {
    await db.collection("productos").doc(String(p.id)).set({
      ...p,
      created_at: admin.firestore.FieldValue.serverTimestamp(),
      updated_at: admin.firestore.FieldValue.serverTimestamp()
    });
  }

  console.log("OK. 10 productos creados en Firebase.");
  process.exit(0);
}

seedProductos().catch((error) => {
  console.error("Error al crear productos:", error);
  process.exit(1);
});

const testUpdateImage = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/productos/1/image', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
      })
    });

    const data = await response.json();
    console.log('Respuesta:', data);
  } catch (error) {
    console.error('Error:', error);
  }
};

testUpdateImage(); 
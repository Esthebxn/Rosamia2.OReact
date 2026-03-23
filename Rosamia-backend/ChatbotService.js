// services/ChatbotService.js

const API_BASE_URL = 'http://127.0.0.1:5001/api'; // Tu backend en puerto 5000

export const ChatbotService = {
  // Guardar mensajes en la base de datos
  async saveMessage(message) {
    try {
      const response = await fetch(`${API_BASE_URL}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
      });
      return await response.json();
    } catch (error) {
      console.error('Error al guardar mensaje:', error);
      return null;
    }
  },

  // Obtener historial de mensajes
  async getMessages() {
    try {
      const response = await fetch(`${API_BASE_URL}/messages`);
      return await response.json();
    } catch (error) {
      console.error('Error al obtener mensajes:', error);
      return [];
    }
  },

  // Obtener respuestas usando Google Gemini API
  async getGeminiResponse(prompt) {
    try {
      const response = await fetch(`${API_BASE_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });
      return await response.json();
    } catch (error) {
      console.error('Error al obtener respuesta de Gemini:', error);
      return null;
    }
  },

  // Guardar entrenamiento en base de datos
  async saveTraining(keyword, response) {
    try {
      const trainingData = {
        keyword,
        response,
        created_at: new Date().toISOString()
      };
      
      const result = await fetch(`${API_BASE_URL}/training`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(trainingData),
      });
      return await result.json();
    } catch (error) {
      console.error('Error al guardar entrenamiento:', error);
      return null;
    }
  },

  // Obtener datos de entrenamiento
  async getTrainingData() {
    try {
      const response = await fetch(`${API_BASE_URL}/training`);
      return await response.json();
    } catch (error) {
      console.error('Error al obtener datos de entrenamiento:', error);
      return {};
    }
  },

  // Verificar estado del servidor
  async checkServerStatus() {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      return response.ok;
    } catch (error) {
      return false;
    }
  }
}; 
import React, { useState, useRef, useEffect, useCallback } from 'react';
import './ChatbotRosamia.css';

// Servicio para comunicarse con el backend
const ChatbotService = {
  async checkServerStatus() {
    try {
      const response = await fetch('http://localhost:5000/health');
      return response.ok;
    } catch (error) {
      console.error('❌ Error al verificar servidor:', error);
      return false;
    }
  },

  async getMessages() {
    try {
      const response = await fetch('http://localhost:5000/api/messages');
      if (!response.ok) throw new Error('Error al obtener mensajes');
      return await response.json();
    } catch (error) {
      console.error('❌ Error obteniendo mensajes:', error);
      return [];
    }
  },

  async saveMessage(message) {
    try {
      const response = await fetch('http://localhost:5000/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(message)
      });
      return await response.json();
    } catch (error) {
      console.error('❌ Error guardando mensaje:', error);
      return null;
    }
  },

  async getGeminiResponse(prompt) {
    try {
      const response = await fetch('http://localhost:5000/api/chat/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: prompt })
      });
      
      if (!response.ok) throw new Error('Error en la respuesta de Gemini');
      
      const data = await response.json();
      
      return {
        success: data.success || false,
        response: data.reply || 'Lo siento, no pude procesar tu mensaje.'
      };
    } catch (error) {
      console.error('❌ Error obteniendo respuesta de Gemini:', error);
      return { 
        success: false, 
        response: 'Error al conectar con el servidor de IA.' 
      };
    }
  },

  async saveTraining(keyword, response) {
    try {
      const trainingData = {
        keyword,
        response,
        createdAt: new Date().toISOString()
      };
      
      // Guardar en localStorage temporalmente
      localStorage.setItem(`training_${keyword}`, response);
      return { success: true };
    } catch (error) {
      console.error('❌ Error guardando entrenamiento:', error);
      return { success: false };
    }
  },

  async getTrainingData() {
    try {
      // Obtener del localStorage temporalmente
      const trainingEntries = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('training_')) {
          const keyword = key.replace('training_', '');
          trainingEntries.push({
            keyword,
            response: localStorage.getItem(key)
          });
        }
      }
      return trainingEntries;
    } catch (error) {
      console.error('❌ Error obteniendo datos de entrenamiento:', error);
      return [];
    }
  }
};

const ChatbotRosamia = () => {
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: "¡Hola! Soy Rosamia, tu asistente virtual. Estoy aquí para ayudarte con información sobre nuestros productos y servicios. ¿En qué puedo asistirte hoy?", 
      sender: "bot",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  
  // Estados mejorados para el control del chatbot
  const [chatState, setChatState] = useState('closed');
  const [isVisible, setIsVisible] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [serverStatus, setServerStatus] = useState(false);
  
  // Estados para el entrenamiento
  const [isTraining, setIsTraining] = useState(false);
  const [trainingData, setTrainingData] = useState({});
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Estado para controlar la posición del chatbot
  const [chatbotPosition, setChatbotPosition] = useState('right'); // 'left' o 'right'
  
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const inputRef = useRef(null);

  // Cargar mensajes y datos de entrenamiento al iniciar
  useEffect(() => {
    const loadInitialData = async () => {
      setIsLoading(true);
      
      try {
        // Verificar estado del servidor
        const serverOk = await ChatbotService.checkServerStatus();
        setServerStatus(serverOk);
        setIsOnline(serverOk);
        
        if (serverOk) {
          // Cargar mensajes desde la base de datos
          const savedMessages = await ChatbotService.getMessages();
          
          // Cargar datos de entrenamiento
          const trainingData = await ChatbotService.getTrainingData();
          const trainingMap = {};
          trainingData.forEach(item => {
            trainingMap[item.keyword] = item.response;
          });
          setTrainingData(trainingMap);
          
          if (savedMessages.length > 0) {
            setMessages(savedMessages.map(msg => ({
              ...msg,
              timestamp: new Date(msg.timestamp)
            })));
          }
        } else {
          // Mensaje de error si el servidor no está disponible
          const offlineMessage = {
            id: Date.now(),
            text: "¡Hola! Soy Rosamia. Nota: El modo offline está activado. Algunas funciones pueden estar limitadas.",
            sender: "bot",
            timestamp: new Date()
          };
          setMessages(prev => [offlineMessage, ...prev.slice(0, 0)]);
        }
      } catch (error) {
        console.error('Error cargando datos iniciales:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadInitialData();
  }, []);

  // Función para scroll automático
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (chatState === 'open') {
      scrollToBottom();
    }
  }, [messages, chatState, scrollToBottom]);

  // Función para mover el chatbot a la izquierda
  const moveToLeft = useCallback(() => {
    setChatbotPosition('left');
  }, []);

  // Función para mover el chatbot a la derecha
  const moveToRight = useCallback(() => {
    setChatbotPosition('right');
  }, []);

  // Función mejorada para abrir el chatbot
  const openChatbot = useCallback(() => {
    setIsVisible(true);
    setChatState('opening');
    
    // Cambiar a 'open' después de la animación
    setTimeout(() => {
      setChatState('open');
    }, 300);
  }, []);

  // Función para cerrar el chatbot
  const closeChatbot = useCallback(() => {
    setChatState('closed');
    
    // Ocultar completamente después de la animación
    setTimeout(() => {
      setIsVisible(false);
    }, 400);
  }, []);

  // Función para minimizar/maximizar
  const toggleMinimize = useCallback(() => {
    if (chatState === 'minimized') {
      setChatState('open');
    } else if (chatState === 'open') {
      setChatState('minimized');
    }
  }, [chatState]);

  // Enfocar input cuando se abre el chat
  useEffect(() => {
    if (chatState === 'open' && inputRef.current) {
      setTimeout(() => {
        inputRef.current.focus();
      }, 300);
    }
  }, [chatState]);

  // Función mejorada para obtener respuesta
  const getBotResponse = useCallback(async (userMessage) => {
    if (!serverStatus) {
      // Modo offline - usar respuestas locales
      return getOfflineResponse(userMessage);
    }
    
    try {
      // Intentar obtener respuesta de Gemini
      const geminiResponse = await ChatbotService.getGeminiResponse(userMessage);
      
      if (geminiResponse && geminiResponse.success) {
        return geminiResponse.response;
      }
      
      // Si Gemini falla, buscar en respuestas locales
      return getOfflineResponse(userMessage);
    } catch (error) {
      console.error('Error obteniendo respuesta:', error);
      return getOfflineResponse(userMessage);
    }
  }, [serverStatus]);

  // Respuestas locales para modo offline
  const getOfflineResponse = useCallback((input) => {
    const inputLower = input.toLowerCase();
    const knowledgeBase = {
      saludos: [
        "¡Hola! ¿En qué puedo ayudarte?", 
        "¡Hola! ¿Cómo estás?",
        "¡Buenos días! ¿En qué puedo asistirte?",
        "¡Hola! Es un placer saludarte"
      ],
      despedidas: [
        "¡Hasta luego! Que tengas un excelente día",
        "Adiós, fue un placer ayudarte",
        "¡Nos vemos! Siempre estaré aquí cuando me necesites",
        "¡Que tengas un buen día!"
      ],
      ayuda: [
        "Puedo ayudarte con preguntas generales, responder dudas o simplemente conversar contigo. ¿En qué necesitas ayuda?",
        "Estoy aquí para asistirte en lo que necesites. ¿Qué te gustaría saber?",
        "Pregúntame lo que quieras y haré lo posible por ayudarte. También puedes entrenarme para mejorar mis respuestas"
      ],
      default: [
        "Interesante. ¿Podrías contarme más sobre eso?",
        "No estoy completamente segura de entender. ¿Podrías reformular tu pregunta?",
        "Eso es algo sobre lo que todavía estoy aprendiendo. ¿Podrías explicarme más?",
        "Voy a tomar nota de eso para mejorar mis respuestas en el futuro"
      ]
    };
    
    // Detectar saludos
    if (inputLower.includes("hola") || inputLower.includes("buenos días") || 
        inputLower.includes("buenas tardes") || inputLower.includes("buenas noches") ||
        inputLower.includes("hi") || inputLower.includes("hello")) {
      return knowledgeBase.saludos[Math.floor(Math.random() * knowledgeBase.saludos.length)];
    }
    
    // Detectar despedidas
    if (inputLower.includes("adiós") || inputLower.includes("chao") || 
        inputLower.includes("nos vemos") || inputLower.includes("hasta luego") ||
        inputLower.includes("bye") || inputLower.includes("hasta la vista")) {
      return knowledgeBase.despedidas[Math.floor(Math.random() * knowledgeBase.despedidas.length)];
    }
    
    // Detectar preguntas de ayuda
    if (inputLower.includes("ayuda") || inputLower.includes("qué puedes hacer") || 
        inputLower.includes("para qué sirves") || inputLower.includes("help") ||
        inputLower.includes("cómo funcionas")) {
      return knowledgeBase.ayuda[Math.floor(Math.random() * knowledgeBase.ayuda.length)];
    }
    
    // Buscar en el conocimiento entrenado
    for (const [key, response] of Object.entries(trainingData)) {
      if (inputLower.includes(key.toLowerCase())) {
        return response;
      }
    }
    
    return knowledgeBase.default[Math.floor(Math.random() * knowledgeBase.default.length)];
  }, [trainingData]);

  // Función mejorada para enviar mensajes
  const handleSendMessage = useCallback(async () => {
    if (inputValue.trim() === "" || isTyping) return;
    
    // Agregar mensaje del usuario
    const newUserMessage = {
      id: Date.now(),
      text: inputValue.trim(),
      sender: "user",
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    const currentInput = inputValue;
    setInputValue("");
    setIsTyping(true);
    
    // Simular respuesta del bot con indicador de escritura
    setTimeout(async () => {
      try {
        const botResponse = await getBotResponse(currentInput);
        
        const newBotMessage = {
          id: Date.now() + 1,
          text: botResponse,
          sender: "bot",
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, newBotMessage]);
        
        // Guardar en servidor si está disponible
        if (serverStatus) {
          try {
            await ChatbotService.saveMessage(newUserMessage);
            await ChatbotService.saveMessage(newBotMessage);
          } catch (error) {
            console.error('Error guardando mensajes:', error);
          }
        }
      } catch (error) {
        console.error('Error obteniendo respuesta:', error);
        
        const errorMessage = {
          id: Date.now() + 1,
          text: "Lo siento, hubo un error al procesar tu mensaje. Por favor, intenta nuevamente.",
          sender: "bot",
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, errorMessage]);
      } finally {
        setIsTyping(false);
      }
    }, Math.random() * 1000 + 500); // Respuesta más natural
  }, [inputValue, isTyping, getBotResponse, serverStatus]);

  const handleKeyPress = useCallback((e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (isTraining) {
        handleTrainResponse();
      } else {
        handleSendMessage();
      }
    }
  }, [isTraining, handleSendMessage]);

  // Función mejorada para el entrenamiento
  const handleTraining = useCallback(() => {
    if (isTraining) {
      setIsTraining(false);
      setTrainingData({});
      setInputValue("");
      
      const cancelMessage = {
        id: Date.now(),
        text: "Entrenamiento cancelado. ¡Sigamos conversando!",
        sender: "bot",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, cancelMessage]);
    } else {
      setIsTraining(true);
      const trainingMessage = {
        id: Date.now(),
        text: "🎓 Modo entrenamiento activado. Escribe una palabra clave o frase que quieras que aprenda:",
        sender: "bot",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, trainingMessage]);
    }
  }, [isTraining]);

  const handleTrainResponse = useCallback(async () => {
    if (inputValue.trim() === "") return;
    
    if (!trainingData.keyword) {
      // Guardar la palabra clave
      const keyword = inputValue.trim();
      setTrainingData({ keyword, response: "" });
      
      const keywordMessage = {
        id: Date.now(),
        text: `✅ Palabra clave "${keyword}" guardada. Ahora escribe la respuesta que debería dar cuando detecte esta palabra:`,
        sender: "bot",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, keywordMessage]);
      setInputValue("");
    } else {
      // Guardar la respuesta completa
      const response = inputValue.trim();
      const newTrainingEntry = {
        [trainingData.keyword]: response
      };
      
      // Guardar en estado local
      setTrainingData(prev => ({
        ...prev,
        ...newTrainingEntry,
        response
      }));
      
      // Guardar en servicio
      await ChatbotService.saveTraining(trainingData.keyword, response);
      
      const responseMessage = {
        id: Date.now(),
        text: `🎉 ¡Perfecto! Ahora responderé "${response}" cuando detecte la palabra "${trainingData.keyword}". ¡Gracias por enseñarme!`,
        sender: "bot",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, responseMessage]);
      setInputValue("");
      
      // Salir del modo entrenamiento después de un momento
      setTimeout(() => {
        setIsTraining(false);
        setTrainingData({});
      }, 2000);
    }
  }, [inputValue, trainingData]);

  // Componente para el icono de flor rosada mejorado
  const FlowerIcon = () => (
    <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="18" fill="#FFB6C1" stroke="#FF69B4" strokeWidth="2"/>
      <circle cx="20" cy="20" r="10" fill="#FF69B4"/>
      <circle cx="14" cy="14" r="4" fill="#FFC0CB"/>
      <circle cx="26" cy="14" r="4" fill="#FFC0CB"/>
      <circle cx="14" cy="26" r="4" fill="#FFC0CB"/>
      <circle cx="26" cy="26" r="4" fill="#FFC0CB"/>
      <circle cx="20" cy="12" r="3" fill="#FFB6C1"/>
      <circle cx="12" cy="20" r="3" fill="#FFB6C1"/>
      <circle cx="28" cy="20" r="3" fill="#FFB6C1"/>
      <circle cx="20" cy="28" r="3" fill="#FFB6C1"/>
    </svg>
  );

  // Componente para el icono de chat
  const ChatIcon = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z" fill="currentColor"/>
      <circle cx="8" cy="10" r="1.5" fill="white"/>
      <circle cx="12" cy="10" r="1.5" fill="white"/>
      <circle cx="16" cy="10" r="1.5" fill="white"/>
    </svg>
  );

  // Componente para el icono de mover
  const MoveIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13 6H11V11H6V13H11V18H13V13H18V11H13V6Z" fill="currentColor"/>
      <path d="M7 7H5V5H7V7Z" fill="currentColor"/>
      <path d="M19 7H17V5H19V7Z" fill="currentColor"/>
      <path d="M7 19H5V17H7V19Z" fill="currentColor"/>
      <path d="M19 19H17V17H19V19Z" fill="currentColor"/>
    </svg>
  );

  // Formatear la hora para mostrar en los mensajes
  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Determinar las clases CSS según el estado
  const getContainerClasses = () => {
    const classes = ['chatbot-container'];
    
    if (chatState === 'closed') classes.push('closed');
    if (chatState === 'minimized') classes.push('minimized');
    if (chatState === 'opening') classes.push('opening');
    if (isTyping) classes.push('loading');
    if (chatbotPosition === 'left') classes.push('left-side');
    if (chatbotPosition === 'right') classes.push('right-side');
    
    return classes.join(' ');
  };

  return (
    <>
      {/* Botón flotante para abrir el chat */}
      {(!isVisible || chatState === 'closed') && (
        <button 
          className={`chatbot-toggle ${chatbotPosition === 'left' ? 'left-side' : 'right-side'}`}
          onClick={openChatbot}
          aria-label="Abrir chat con Rosamia"
        >
          <ChatIcon />
          {!serverStatus && <span className="offline-badge">OFF</span>}
        </button>
      )}

      {/* Contenedor principal del chatbot */}
      {isVisible && (
        <div 
          ref={chatContainerRef}
          className={getContainerClasses()}
          role="dialog"
          aria-labelledby="chatbot-title"
          aria-hidden={chatState === 'closed'}
        >
          {/* Cabecera mejorada */}
          <div className="chatbot-header">
            <div className="chatbot-title">
              <FlowerIcon />
              <h2 id="chatbot-title">Rosamia</h2>
              <span 
                className={`status-dot ${isOnline ? '' : 'offline'}`}
                title={isOnline ? 'En línea' : 'Fuera de línea'}
              ></span>
            </div>
            <div className="chatbot-controls">
              {/* Botón para mover a la izquierda/derecha */}
              <button 
                className="control-btn move-btn"
                onClick={chatbotPosition === 'right' ? moveToLeft : moveToRight}
                aria-label={`Mover chatbot a la ${chatbotPosition === 'right' ? 'izquierda' : 'derecha'}`}
                title={`Mover a ${chatbotPosition === 'right' ? 'izquierda' : 'derecha'}`}
              >
                <MoveIcon />
              </button>
              <button 
                className="control-btn minimize-btn"
                onClick={toggleMinimize}
                aria-label={chatState === 'minimized' ? 'Maximizar chat' : 'Minimizar chat'}
                title={chatState === 'minimized' ? 'Maximizar' : 'Minimizar'}
              >
                {chatState === 'minimized' ? '□' : '−'}
              </button>
              <button 
                className="control-btn close-btn"
                onClick={closeChatbot}
                aria-label="Cerrar chat"
                title="Cerrar"
              >
                ×
              </button>
            </div>
          </div>
          
          {/* Área de mensajes */}
          {chatState !== 'minimized' && (
            <>
              <div className="chatbot-messages" role="log" aria-live="polite">
                {messages.map((message) => (
                  <div key={message.id} className={`message ${message.sender}`}>
                    <div className="message-content">
                      <p>{message.text}</p>
                      <span className="timestamp">{formatTime(message.timestamp)}</span>
                    </div>
                  </div>
                ))}
                
                {/* Indicador de escritura */}
                {isTyping && (
                  <div className="message bot">
                    <div className="message-content">
                      <p>
                        <span className="typing-indicator">
                          Rosamia está escribiendo
                          <span>.</span><span>.</span><span>.</span>
                        </span>
                      </p>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
              
              {/* Área de entrada mejorada */}
              <div className="chatbot-input">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={
                    isTraining 
                      ? (trainingData.keyword ? "Escribe la respuesta..." : "Escribe una palabra clave...")
                      : "Escribe tu mensaje..."
                  }
                  disabled={isTyping}
                  maxLength={500}
                  aria-label="Escribe tu mensaje"
                />
                <button 
                  onClick={isTraining ? handleTrainResponse : handleSendMessage}
                  disabled={isTyping || inputValue.trim() === ""}
                  aria-label={isTraining ? "Enseñar respuesta" : "Enviar mensaje"}
                >
                  {isTraining ? (trainingData.keyword ? "Enseñar" : "Aprender") : "Enviar"}
                </button>
              </div>
              
              {/* Botones de acción */}
              <div className="chatbot-actions">
                <button 
                  className="training-btn" 
                  onClick={handleTraining}
                  disabled={isTyping}
                  aria-label={isTraining ? "Cancelar entrenamiento" : "Entrenar a Rosamia"}
                >
                  {isTraining ? "Cancelar Entrenamiento" : "🎓 Entrenar a Rosamia"}
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default ChatbotRosamia; 
import React, { useState, useRef, useEffect } from 'react';
import { 
  FiMessageCircle, FiPlay, FiPause, FiShoppingBag, 
  FiHeart, FiShare2, FiChevronLeft, FiChevronRight, 
  FiVolume2, FiVolumeX, FiMusic, 
  FiUserPlus, FiBookmark, FiSend
} from 'react-icons/fi';
import './NuestrosProductosEnVideos.css';

const NuestrosProductosEnVideos = () => {
  const [activePhones, setActivePhones] = useState([0, 1, 2, 3, 4]);
  const [isPlaying, setIsPlaying] = useState(Array(5).fill(false));
  const [volume, setVolume] = useState(Array(5).fill(0.7));
  const [muted, setMuted] = useState(Array(5).fill(false));
  const [currentTime, setCurrentTime] = useState(Array(5).fill(0));
  const [duration, setDuration] = useState(Array(5).fill(0));
  const [liked, setLiked] = useState([]);
  const [saved, setSaved] = useState([]);
  const videoRefs = useRef([]);

  const videos = [
    {
      id: 1,
      videoSrc: "https://assets.mixkit.co/videos/preview/mixkit-red-rose-5213-large.mp4",
      thumbnail: "https://images.unsplash.com/photo-1560921267-2bb5d667e6a7?w=400&auto=format&fit=crop",
      username: "@rosamia.flores",
      userAvatar: "R",
      title: "Ramo de Rosas Rojas Premium",
      description: "Ramo de 24 rosas rojas importadas ❤️ Perfecto para aniversarios",
      likes: "15.2K",
      comments: "420",
      shares: "890",
      productPrice: "S/. 129.90",
      duration: "0:15",
      timestamp: "Hace 2 horas",
      hashtags: "#rosas #regalos #amor #rosamia",
      sound: "Sonido original - Rosamia Flores"
    },
    {
      id: 2,
      videoSrc: "https://assets.mixkit.co/videos/preview/mixkit-beautiful-red-rose-2067-large.mp4",
      thumbnail: "https://images.unsplash.com/photo-1561047029-3000c68339ca?w=400&auto=format&fit=crop",
      username: "@rosamia.flores",
      userAvatar: "R",
      title: "Caja de Rosas Eternas",
      description: "Rosas preservadas que duran años 💝 Regalo perfecto para siempre",
      likes: "28.4K",
      comments: "780",
      shares: "1.2K",
      productPrice: "S/. 199.90",
      duration: "0:22",
      timestamp: "Hace 1 día",
      hashtags: "#rosaseternas #regalosespeciales #amoreterno",
      sound: "Sonido original - Rosamia Flores"
    },
    {
      id: 3,
      videoSrc: "https://assets.mixkit.co/videos/preview/mixkit-sunflower-rotation-1581-large.mp4",
      thumbnail: "https://images.unsplash.com/photo-1560717782-1c6d8d8c0c4c?w=400&auto=format&fit=crop",
      username: "@rosamia.flores",
      userAvatar: "R",
      title: "Arreglo de Girasoles Frescos",
      description: "Lleva el sol a su día ☀️ Girasoles recién cortados",
      likes: "42.1K",
      comments: "1.2K",
      shares: "2.1K",
      productPrice: "S/. 89.50",
      duration: "0:18",
      timestamp: "Hace 3 días",
      hashtags: "#girasoles #felicidad #verano",
      sound: "Sonido original - Rosamia Flores"
    },
    {
      id: 4,
      videoSrc: "https://assets.mixkit.co/videos/preview/mixkit-wedding-centerpiece-with-flowers-31470-large.mp4",
      thumbnail: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&auto=format&fit=crop",
      username: "@rosamia.flores",
      userAvatar: "R",
      title: "Centro de Mesa para Bodas",
      description: "Elegante diseño para el día más importante 👰🤵",
      likes: "31.8K",
      comments: "950",
      shares: "1.5K",
      productPrice: "S/. 250.00",
      duration: "0:25",
      timestamp: "Hace 1 semana",
      hashtags: "#bodas #centrodemesa #elegancia",
      sound: "Sonido original - Rosamia Flores"
    },
    {
      id: 5,
      videoSrc: "https://assets.mixkit.co/videos/preview/mixkit-colorful-flower-bouquet-4288-large.mp4",
      thumbnail: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&auto=format&fit=crop",
      username: "@rosamia.flores",
      userAvatar: "R",
      title: "Ramo Mixto Primaveral",
      description: "Combinación de flores de temporada 🌸 Colores vibrantes",
      likes: "19.3K",
      comments: "560",
      shares: "980",
      productPrice: "S/. 95.00",
      duration: "0:20",
      timestamp: "Hace 4 días",
      hashtags: "#primavera #floresmixtas #colores",
      sound: "Sonido original - Rosamia Flores"
    },
    {
      id: 6,
      videoSrc: "https://assets.mixkit.co/videos/preview/mixkit-orchid-flower-in-motion-4286-large.mp4",
      thumbnail: "https://images.unsplash.com/photo-1545243421-89e5c9b6d12b?w=400&auto=format&fit=crop",
      username: "@rosamia.flores",
      userAvatar: "R",
      title: "Orquídeas en Maceta Decorativa",
      description: "Elegancia natural que dura semanas 🌺",
      likes: "23.7K",
      comments: "690",
      shares: "1.1K",
      productPrice: "S/. 120.00",
      duration: "0:17",
      timestamp: "Hace 2 días",
      hashtags: "#orquideas #decoracion #elegancia",
      sound: "Sonido original - Rosamia Flores"
    },
    {
      id: 7,
      videoSrc: "https://assets.mixkit.co/videos/preview/mixkit-mothers-day-bouquet-of-flowers-16434-large.mp4",
      thumbnail: "https://images.unsplash.com/photo-1518623380242-d992d5d57e9e?w=400&auto=format&fit=crop",
      username: "@rosamia.flores",
      userAvatar: "R",
      title: "Ramo para Mamá",
      description: "Especial para el Día de la Madre 💐❤️ Con mensaje personalizado",
      likes: "55.2K",
      comments: "2.1K",
      shares: "3.4K",
      productPrice: "S/. 110.00",
      duration: "0:19",
      timestamp: "Hace 5 días",
      hashtags: "#diadelamadre #regalosparamama #amor",
      sound: "Sonido original - Rosamia Flores"
    },
    {
      id: 8,
      videoSrc: "https://assets.mixkit.co/videos/preview/mixkit-wildflowers-in-a-basket-20902-large.mp4",
      thumbnail: "https://images.unsplash.com/photo-1529254479751-fbacb4c7a587?w=400&auto=format&fit=crop",
      username: "@rosamia.flores",
      userAvatar: "R",
      title: "Cesta de Flores Silvestres",
      description: "Estilo rústico y encantador 🍂🌼 Perfecto para campo",
      likes: "17.8K",
      comments: "480",
      shares: "820",
      productPrice: "S/. 85.00",
      duration: "0:16",
      timestamp: "Hace 6 días",
      hashtags: "#floressilvestres #estilorustico #campo",
      sound: "Sonido original - Rosamia Flores"
    },
    {
      id: 9,
      videoSrc: "https://assets.mixkit.co/videos/preview/mixkit-white-lily-flowers-3180-large.mp4",
      thumbnail: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&auto=format&fit=crop",
      username: "@rosamia.flores",
      userAvatar: "R",
      title: "Arreglo de Lirios Blancos",
      description: "Pureza y elegancia en cada pétalo ⚪✨ Para ocasiones especiales",
      likes: "29.5K",
      comments: "870",
      shares: "1.3K",
      productPrice: "S/. 135.00",
      duration: "0:21",
      timestamp: "Hace 3 días",
      hashtags: "#lirios #elegancia #pureza",
      sound: "Sonido original - Rosamia Flores"
    },
    {
      id: 10,
      videoSrc: "https://assets.mixkit.co/videos/preview/mixkit-mini-succulent-garden-30676-large.mp4",
      thumbnail: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&auto=format&fit=crop",
      username: "@rosamia.flores",
      userAvatar: "R",
      title: "Mini Jardín de Suculentas",
      description: "Perfecto para escritorio o regalo pequeño 🌵💚",
      likes: "13.4K",
      comments: "320",
      shares: "540",
      productPrice: "S/. 65.00",
      duration: "0:14",
      timestamp: "Hace 1 día",
      hashtags: "#suculentas #minijardin #oficina",
      sound: "Sonido original - Rosamia Flores"
    }
  ];

  useEffect(() => {
    videoRefs.current = videoRefs.current.slice(0, videos.length);
  }, []);

  useEffect(() => {
    activePhones.forEach((phoneIndex, i) => {
      const video = videoRefs.current[phoneIndex];
      if (video) {
        video.volume = muted[phoneIndex] ? 0 : volume[phoneIndex];
        
        const updateTime = () => {
          setCurrentTime(prev => {
            const newTimes = [...prev];
            newTimes[phoneIndex] = video.currentTime;
            return newTimes;
          });
        };
        
        const updateDuration = () => {
          setDuration(prev => {
            const newDurations = [...prev];
            newDurations[phoneIndex] = video.duration;
            return newDurations;
          });
        };

        video.addEventListener('timeupdate', updateTime);
        video.addEventListener('loadedmetadata', updateDuration);

        if (i > 0) {
          video.pause();
          setIsPlaying(prev => {
            const newPlaying = [...prev];
            newPlaying[phoneIndex] = false;
            return newPlaying;
          });
        }
      }
    });
  }, []);

  const handleWhatsAppClick = (phoneIndex) => {
    const phoneNumber = "51931754214";
    const product = videos[phoneIndex];
    const message = encodeURIComponent(`¡Hola Rosamia! Vi el video de "${product.title}" en tu página y me interesa comprarlo. ¿Podrías darme más información?`);
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  const togglePlay = (phoneIndex) => {
    const video = videoRefs.current[phoneIndex];
    if (!video) return;

    activePhones.forEach(index => {
      if (index !== phoneIndex && videoRefs.current[index]) {
        videoRefs.current[index].pause();
        setIsPlaying(prev => {
          const newPlaying = [...prev];
          newPlaying[index] = false;
          return newPlaying;
        });
      }
    });

    if (isPlaying[phoneIndex]) {
      video.pause();
      setIsPlaying(prev => {
        const newPlaying = [...prev];
        newPlaying[phoneIndex] = false;
        return newPlaying;
      });
    } else {
      video.play()
        .then(() => {
          setIsPlaying(prev => {
            const newPlaying = [...prev];
            newPlaying[phoneIndex] = true;
            return newPlaying;
          });
        })
        .catch(e => {
          console.log("Error al reproducir:", e);
          alert("Haz clic en el video para activar el sonido y luego intenta reproducir nuevamente.");
        });
    }
  };

  const toggleMute = (phoneIndex) => {
    const video = videoRefs.current[phoneIndex];
    if (!video) return;
    
    video.muted = !muted[phoneIndex];
    setMuted(prev => {
      const newMuted = [...prev];
      newMuted[phoneIndex] = !muted[phoneIndex];
      return newMuted;
    });
  };

  const handleVolumeChange = (e, phoneIndex) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(prev => {
      const newVolumes = [...prev];
      newVolumes[phoneIndex] = newVolume;
      return newVolumes;
    });
    
    const video = videoRefs.current[phoneIndex];
    if (video) {
      video.volume = newVolume;
      video.muted = newVolume === 0;
      setMuted(prev => {
        const newMuted = [...prev];
        newMuted[phoneIndex] = newVolume === 0;
        return newMuted;
      });
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const toggleLike = (videoId) => {
    if (liked.includes(videoId)) {
      setLiked(liked.filter(id => id !== videoId));
    } else {
      setLiked([...liked, videoId]);
    }
  };

  const toggleSave = (videoId) => {
    if (saved.includes(videoId)) {
      setSaved(saved.filter(id => id !== videoId));
    } else {
      setSaved([...saved, videoId]);
    }
  };

  const scrollPhones = (direction) => {
    if (direction === 'next') {
      const newActivePhones = activePhones.map(index => (index + 1) % videos.length);
      setActivePhones(newActivePhones);
    } else {
      const newActivePhones = activePhones.map(index => (index - 1 + videos.length) % videos.length);
      setActivePhones(newActivePhones);
    }
  };

  const selectPhone = (index) => {
    const newActivePhones = [];
    for (let i = 0; i < 5; i++) {
      newActivePhones.push((index + i) % videos.length);
    }
    setActivePhones(newActivePhones);
  };

  return (
    <div className="productos-videos-container">
      <div className="videos-header">
        <h1>✨ Nuestros Productos en Videos</h1>
        <p>5 videos reproduciéndose simultáneamente</p>
      </div>

      <div className="phones-navigation-controls">
        <button className="phones-nav-btn" onClick={() => scrollPhones('prev')}>
          <FiChevronLeft /> Anteriores
        </button>
        <button className="phones-nav-btn" onClick={() => scrollPhones('next')}>
          Siguientes <FiChevronRight />
        </button>
      </div>

      <div className="phones-grid-container">
        {activePhones.map((videoIndex, phonePosition) => {
          const video = videos[videoIndex];
          const phoneKey = `phone-${videoIndex}-${phonePosition}`;
          
          return (
            <div key={phoneKey} className="phone-mockup-wrapper">
              <div className="phone-mockup">
                <div className="phone-notch">
                  <div className="notch-camera"></div>
                  <div className="notch-speaker"></div>
                </div>
                
                <div className="phone-screen">
                  <div className="video-header">
                    <div className="user-info">
                      <div className="user-avatar">
                        <span className="avatar-text">{video.userAvatar}</span>
                      </div>
                      <div className="user-details">
                        <span className="username">{video.username}</span>
                        <span className="video-time">{video.duration} • {video.timestamp}</span>
                      </div>
                    </div>
                    <button className="follow-btn">
                      <FiUserPlus /> Seguir
                    </button>
                  </div>

                  <div className="video-main-container">
                    <div className="video-wrapper">
                      <video
                        ref={el => videoRefs.current[videoIndex] = el}
                        className="tiktok-video"
                        src={video.videoSrc}
                        poster={video.thumbnail}
                        loop
                        muted={muted[videoIndex]}
                        onClick={() => togglePlay(videoIndex)}
                        playsInline
                        preload="metadata"
                      />
                      
                      <div className="video-controls-overlay">
                        <button className="play-pause-btn" onClick={() => togglePlay(videoIndex)}>
                          {isPlaying[videoIndex] ? <FiPause size={40} /> : <FiPlay size={40} />}
                        </button>
                      </div>

                      <div className="progress-container" onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const clickX = e.clientX - rect.left;
                        const percentage = clickX / rect.width;
                        const videoEl = videoRefs.current[videoIndex];
                        if (videoEl) {
                          videoEl.currentTime = percentage * videoEl.duration;
                          setCurrentTime(prev => {
                            const newTimes = [...prev];
                            newTimes[videoIndex] = videoEl.currentTime;
                            return newTimes;
                          });
                        }
                      }}>
                        <div 
                          className="progress-bar" 
                          style={{ width: `${(currentTime[videoIndex] / (duration[videoIndex] || 1)) * 100}%` }}
                        ></div>
                        <div className="progress-time">
                          <span>{formatTime(currentTime[videoIndex])}</span>
                          <span>{formatTime(duration[videoIndex] || 0)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="video-side-controls">
                      <button 
                        className={`side-btn like-btn ${liked.includes(video.id) ? 'liked' : ''}`}
                        onClick={() => toggleLike(video.id)}
                      >
                        <FiHeart className="side-icon" />
                        <span>{video.likes}</span>
                      </button>
                      <button className="side-btn comment-btn">
                        <FiMessageCircle className="side-icon" />
                        <span>{video.comments}</span>
                      </button>
                      <button className="side-btn share-btn">
                        <FiShare2 className="side-icon" />
                        <span>{video.shares}</span>
                      </button>
                      <button 
                        className={`side-btn save-btn ${saved.includes(video.id) ? 'saved' : ''}`}
                        onClick={() => toggleSave(video.id)}
                      >
                        <FiBookmark className="side-icon" />
                        <span>Guardar</span>
                      </button>
                      <button className="side-btn buy-btn" onClick={() => handleWhatsAppClick(videoIndex)}>
                        <FiShoppingBag className="side-icon" />
                        <span>Comprar</span>
                      </button>
                    </div>
                  </div>

                  <div className="video-info">
                    <div className="video-text">
                      <h3 className="video-title">{video.title}</h3>
                      <p className="video-description">{video.description}</p>
                      <div className="hashtags">
                        {video.hashtags.split(' ').map((tag, idx) => (
                          <span key={idx} className="hashtag">{tag}</span>
                        ))}
                      </div>
                    </div>

                    <div className="video-price-section">
                      <div className="price-display">
                        <span className="price-tag">{video.productPrice}</span>
                        <span className="price-note">Precio especial</span>
                      </div>
                      <button className="price-action-btn" onClick={() => handleWhatsAppClick(videoIndex)}>
                        <FiSend /> Pedir por WhatsApp
                      </button>
                    </div>

                    <div className="video-sound">
                      <div className="sound-info">
                        <FiMusic className="sound-icon" />
                        <div className="sound-text">
                          <span className="sound-title">{video.sound}</span>
                          <div className="sound-wave">
                            {[...Array(5)].map((_, i) => (
                              <div 
                                key={i} 
                                className="wave-bar"
                                style={{
                                  animationDelay: `${i * 0.15}s`,
                                  height: `${10 + Math.random() * 10}px`,
                                  animationPlayState: isPlaying[videoIndex] ? 'running' : 'paused'
                                }}
                              ></div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="volume-controls-main">
                      <button className="volume-icon-btn" onClick={() => toggleMute(videoIndex)}>
                        {muted[videoIndex] || volume[videoIndex] === 0 ? <FiVolumeX /> : <FiVolume2 />}
                      </button>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={volume[videoIndex]}
                        onChange={(e) => handleVolumeChange(e, videoIndex)}
                        className="volume-slider-main"
                      />
                      <span className="volume-percent">{Math.round(volume[videoIndex] * 100)}%</span>
                    </div>
                  </div>
                </div>

                <div className="phone-buttons">
                  <div className="volume-btn volume-up"></div>
                  <div className="power-btn"></div>
                  <div className="volume-btn volume-down"></div>
                </div>
              </div>
              
              {isPlaying[videoIndex] && (
                <div className="phone-playing-indicator">
                  <div className="playing-pulse"></div>
                  <span>Reproduciendo</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NuestrosProductosEnVideos;
import React, { useState, useEffect, useRef } from "react";
import {
  Camera,
  Plus,
  LogOut,
  ArrowLeft,
  Image as ImageIcon,
  Heart,
  Search,
  Filter,
  X,
  Trash2,
  Edit2,
  CheckCircle,
  AlertCircle,
  Folder,
  PlayCircle,
  Settings,
  Lock,
  Mail,
  User,
  ChevronDown,
  ChevronRight,
  Palette,
  Moon,
  MapPin,
  Calendar,
  Globe,
} from "lucide-react";
import "./styles.css";

// --- DADOS INICIAIS ---
const INITIAL_MEMORY = {
  id: 1,
  title: "Jantar em Roma",
  date: "2023-12-22", // Data proposital para testar o Flashback se hoje for 22/12
  description: "A melhor massa que já comemos.",
  story:
    "Encontramos uma pequena tratoria longe dos pontos turísticos. O vinho da casa era espetacular.",
  location: "Roma, Itália",
  media:
    "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1000&q=80",
  mediaType: "image",
  isFavorite: true,
  albumId: "album1",
  userId: "user1",
};

const INITIAL_ALBUMS = [{ id: "album1", title: "Viagens Europa", cover: null }];

// --- TOAST ---
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);
  return (
    <div
      style={{ position: "fixed", top: 20, right: 20, zIndex: 9999 }}
      className="fade-in"
    >
      <div
        className="glass-panel"
        style={{
          padding: "15px 25px",
          display: "flex",
          alignItems: "center",
          gap: 10,
          borderLeft: `4px solid ${
            type === "error" ? "var(--danger)" : "#2ecc71"
          }`,
        }}
      >
        {type === "error" ? (
          <AlertCircle size={20} color="var(--danger)" />
        ) : (
          <CheckCircle size={20} color="#2ecc71" />
        )}
        <span>{message}</span>
      </div>
    </div>
  );
};

// --- AUTH ESTILO INSTAGRAM (LIMPO & COM CASAIS) ---
const Auth = ({ onLogin }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [error, setError] = useState("");

  // Imagens atualizadas com foco em Casais Felizes e Momentos
  const images = [
    "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80", // Casal abraçado feliz
    "https://images.unsplash.com/photo-1529619768328-e37af76c6fe5?auto=format&fit=crop&w=800&q=80", // Casal urbano estilo
    "https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?auto=format&fit=crop&w=800&q=80", // Casal rindo pôr do sol
    "https://images.unsplash.com/photo-1501901609772-df0848060b33?auto=format&fit=crop&w=800&q=80", // Viagem romântica
  ];

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    const storedCreds = JSON.parse(
      localStorage.getItem("mesq_credentials") || "[]"
    );

    if (isRegister) {
      if (storedCreds.find((u) => u.email === formData.email)) {
        setError("Este e-mail já está em uso.");
        return;
      }
      const newUser = { ...formData, id: Date.now().toString() };
      localStorage.setItem(
        "mesq_credentials",
        JSON.stringify([...storedCreds, newUser])
      );
      onLogin(newUser);
    } else {
      const user = storedCreds.find(
        (u) => u.email === formData.email && u.password === formData.password
      );
      if (user) onLogin(user);
      else setError("Senha incorreta ou usuário inexistente.");
    }
  };

  return (
    <div className="auth-page fade-in">
      <div className="auth-container">
        {/* LADO ESQUERDO: CARROSSEL DE FOTOS */}
        <div className="auth-visuals">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt="Slide"
              className={`visual-slide ${
                index === currentImage ? "active" : ""
              }`}
            />
          ))}
        </div>

        {/* LADO DIREITO: FORMULÁRIO */}
        <div className="auth-content">
          <div
            className="insta-box"
            style={{ border: "none", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}
          >
            {" "}
            {/* Removida borda dura para ficar mais 'clean' */}
            <h1
              className="insta-logo"
              style={{ marginBottom: "0.5rem", fontSize: "3.5rem" }}
            >
              Memorio
            </h1>
            <p
              style={{
                color: "#723d3dff",
                fontSize: "17px",
                fontWeight: "500",
                lineHeight: "22px",
                margin: "0 0 25px 0",
                textAlign: "center",
                fontFamily: "Lato, sans-serif",
              }}
            >
              {isRegister
                ? "Begin your memory journey"
                : "Your memories, beautifully stored"}
            </p>
            <form onSubmit={handleSubmit} style={{ width: "100%" }}>
              {isRegister && (
                <div className="insta-input-group">
                  <input
                    type="text"
                    className="insta-input"
                    placeholder="Nome completo"
                    required
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
              )}

              <div className="insta-input-group">
                <input
                  type="email"
                  className="insta-input"
                  placeholder="Nome de usuário ou email"
                  required
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>

              <div className="insta-input-group">
                <input
                  type="password"
                  className="insta-input"
                  placeholder="Senha"
                  required
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </div>

              <button type="submit" className="btn-insta">
                {isRegister ? "Cadastre-se" : "Entrar"}
              </button>
            </form>
            <div className="separator">
              <div className="line"></div>
              <div className="or-text">OU</div>
              <div className="line"></div>
            </div>
            {error && (
              <p
                style={{ color: "#ed4956", fontSize: "13px", margin: "10px 0" }}
              >
                {error}
              </p>
            )}
            <div className="forgot-pass">Esqueceu a senha?</div>
          </div>

          <div
            className="insta-box"
            style={{ border: "none", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}
          >
            <p className="switch-text">
              {isRegister ? "Tem uma conta?" : "Não tem uma conta?"}{" "}
              <span
                className="switch-link"
                onClick={() => {
                  setIsRegister(!isRegister);
                  setError("");
                }}
              >
                {isRegister ? "Conecte-se" : "Cadastre-se"}
              </span>
            </p>
          </div>

          {/* Rodapé Simples e Elegante */}
          <div
            style={{
              marginTop: "2rem",
              textAlign: "center",
              fontSize: "12px",
              color: "#c7c7c7",
              fontFamily: "sans-serif",
            }}
          >
            © 2025 Memorio from You
          </div>
        </div>
      </div>
    </div>
  );
};

// --- SETTINGS MENU ---
const SettingsMenu = ({ currentTheme, onSetTheme, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showThemeSelect, setShowThemeSelect] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
        setShowThemeSelect(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="settings-container" ref={menuRef}>
      <button
        className={`btn-icon ${isOpen ? "active" : ""}`}
        style={{ width: 45, height: 45, background: "var(--bg-glass)" }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Settings size={24} />
      </button>
      {isOpen && (
        <div className="dropdown-menu">
          <div
            className="menu-item"
            onClick={() => setShowThemeSelect(!showThemeSelect)}
          >
            <Palette size={18} /> Aparência{" "}
            {showThemeSelect ? (
              <ChevronDown size={14} />
            ) : (
              <ChevronRight size={14} />
            )}
          </div>
          {showThemeSelect && (
            <div style={{ display: "flex", gap: 5, padding: "5px 10px" }}>
              {["wine", "sweet", "dark"].map((t) => (
                <div
                  key={t}
                  onClick={() => onSetTheme(t)}
                  style={{
                    width: 25,
                    height: 25,
                    borderRadius: "50%",
                    cursor: "pointer",
                    border:
                      currentTheme === t
                        ? "2px solid var(--text-main)"
                        : "1px solid #ccc",
                    background:
                      t === "wine"
                        ? "#800020"
                        : t === "sweet"
                        ? "#ffb7c5"
                        : "#333",
                  }}
                  title={t}
                />
              ))}
            </div>
          )}
          <div
            style={{
              height: 1,
              background: "var(--border-glass)",
              margin: "5px 0",
            }}
          ></div>
          <div
            className="menu-item"
            onClick={onLogout}
            style={{ color: "var(--danger)" }}
          >
            <LogOut size={18} /> Sair
          </div>
        </div>
      )}
    </div>
  );
};

// --- FORM ---
const MemoryForm = ({
  onSave,
  onCancel,
  initialData,
  albums,
  preSelectedAlbumId,
}) => {
  const [formData, setFormData] = useState(
    initialData || {
      title: "",
      date: new Date().toISOString().split("T")[0],
      description: "",
      story: "",
      location: "",
      isFavorite: false,
      media: null,
      mediaType: "image",
      albumId: preSelectedAlbumId || "",
    }
  );

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) return alert("Arquivo máx 5MB.");
    const reader = new FileReader();
    reader.onloadend = () =>
      setFormData({
        ...formData,
        media: reader.result,
        mediaType: file.type.startsWith("video/") ? "video" : "image",
      });
    reader.readAsDataURL(file);
  };

  return (
    <div className="container fade-in">
      <button
        onClick={onCancel}
        className="btn-icon"
        style={{
          width: "fit-content",
          borderRadius: "20px",
          paddingRight: "15px",
          gap: "5px",
          marginBottom: "1rem",
        }}
      >
        <ArrowLeft size={18} /> Voltar
      </button>
      <div
        className="glass-panel"
        style={{ padding: "2.5rem", maxWidth: "800px", margin: "0 auto" }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "2rem",
            fontFamily: "Cinzel",
          }}
        >
          {initialData ? "Editar Memória" : "Nova Memória"}
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave(formData);
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
            }}
          >
            <input
              type="text"
              placeholder="Título"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />
            <input
              type="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              required
            />
          </div>

          <div style={{ position: "relative", marginBottom: "1rem" }}>
            <MapPin
              size={18}
              style={{
                position: "absolute",
                left: 12,
                top: 14,
                color: "var(--text-muted)",
              }}
            />
            <input
              type="text"
              placeholder="Localização (ex: Paris, França)"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              style={{ paddingLeft: 40, margin: 0 }}
            />
          </div>

          <select
            value={formData.albumId}
            onChange={(e) =>
              setFormData({ ...formData, albumId: e.target.value })
            }
          >
            <option value="">Sem Álbum (Geral)</option>
            {albums.map((alb) => (
              <option key={alb.id} value={alb.id}>
                {alb.title}
              </option>
            ))}
          </select>

          <div
            style={{
              border: "2px dashed var(--border-glass)",
              borderRadius: "8px",
              padding: "2rem",
              textAlign: "center",
              marginBottom: "1.5rem",
              background: "rgba(0,0,0,0.02)",
            }}
          >
            <input
              type="file"
              id="media-up"
              accept="image/*,video/*"
              style={{ display: "none" }}
              onChange={handleFile}
            />
            <label
              htmlFor="media-up"
              style={{ cursor: "pointer", display: "block" }}
            >
              {formData.media ? (
                formData.mediaType === "video" ? (
                  <video
                    src={formData.media}
                    controls
                    style={{
                      maxWidth: "100%",
                      maxHeight: "300px",
                      borderRadius: "8px",
                    }}
                  />
                ) : (
                  <img
                    src={formData.media}
                    alt="Preview"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "300px",
                      borderRadius: "8px",
                      filter: "sepia(20%)",
                    }}
                  />
                )
              ) : (
                <div style={{ color: "var(--text-muted)" }}>
                  <ImageIcon size={40} />
                  <br />
                  Adicionar Foto ou Vídeo
                </div>
              )}
            </label>
          </div>

          <textarea
            rows="4"
            placeholder="Conte a história..."
            value={formData.story}
            onChange={(e) =>
              setFormData({ ...formData, story: e.target.value })
            }
          ></textarea>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "1.5rem",
            }}
          >
            <input
              type="checkbox"
              id="fav"
              checked={formData.isFavorite}
              onChange={(e) =>
                setFormData({ ...formData, isFavorite: e.target.checked })
              }
              style={{ width: "auto", margin: 0 }}
            />
            <label
              htmlFor="fav"
              style={{ color: "var(--danger)", fontWeight: "bold" }}
            >
              Marcar como Favorito ❤️
            </label>
          </div>
          <button
            type="submit"
            className="btn-primary"
            style={{ width: "100%" }}
          >
            Salvar no Álbum
          </button>
        </form>
      </div>
    </div>
  );
};

// --- FLASHBACK WIDGET ---
const FlashbackWidget = ({ memories, onSelect }) => {
  const today = new Date();
  const flashbackMemories = memories.filter((m) => {
    const mDate = new Date(m.date);
    // Mesmo dia e mês, mas ano diferente (ou mesmo ano se for hoje)
    return (
      mDate.getDate() === today.getDate() &&
      mDate.getMonth() === today.getMonth()
    );
  });

  if (flashbackMemories.length === 0) return null;

  return (
    <div className="flashback-widget fade-in">
      <div style={{ minWidth: "60px", textAlign: "center" }}>
        <Calendar size={32} color="var(--primary)" />
      </div>
      <div className="flashback-content">
        <span className="flashback-badge">Neste Dia</span>
        <h3 style={{ margin: 0, fontSize: "1.2rem" }}>
          Você tem {flashbackMemories.length} memória(s) de{" "}
          {today.toLocaleDateString().slice(0, 5)}!
        </h3>
        <p style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>
          Relembre o que aconteceu hoje em outros anos.
        </p>
      </div>
      <button
        className="btn-primary"
        onClick={() => onSelect(flashbackMemories[0])}
        style={{ fontSize: "0.8rem" }}
      >
        Ver
      </button>
    </div>
  );
};

// --- DASHBOARD (POLAROID GRID) ---
const Dashboard = ({
  user,
  memories,
  onNew,
  onSelect,
  onDelete,
  onViewAlbums,
}) => {
  const [search, setSearch] = useState("");
  const filtered = memories.filter(
    (m) =>
      m.title.toLowerCase().includes(search.toLowerCase()) ||
      (m.location && m.location.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="container fade-in">
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2rem",
        }}
      >
        <div>
          <h2 style={{ fontSize: "2rem" }}>Olá, {user.name.split(" ")[0]}</h2>
          <p style={{ color: "var(--text-muted)" }}>
            Suas memórias estão aqui.
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={onViewAlbums} className="btn-icon" title="Álbuns">
            <Folder size={20} />{" "}
            <span className="hide-mobile" style={{ marginLeft: 5 }}>
              Álbuns
            </span>
          </button>
          <button onClick={onNew} className="btn-primary">
            <Plus size={20} /> Nova
          </button>
        </div>
      </header>

      {/* FLASHBACK SECTION */}
      <FlashbackWidget memories={memories} onSelect={onSelect} />

      <div
        className="glass-panel"
        style={{
          padding: "1rem",
          display: "flex",
          gap: "10px",
          marginBottom: "2rem",
        }}
      >
        <Search size={20} color="var(--text-muted)" />
        <input
          type="text"
          placeholder="Buscar por título ou local..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ margin: 0, border: "none", background: "transparent" }}
        />
      </div>

      {/* POLAROID GRID */}
      <div className="grid">
        {filtered.map((mem) => {
          // Rotação determinística baseada no ID (não muda no re-render)
          const rotation = (parseInt(mem.id) % 6) - 3; // Gera valores entre -3 e 2 graus

          return (
            <div
              key={mem.id}
              className="memory-card"
              onClick={() => onSelect(mem)}
              style={{ transform: `rotate(${rotation}deg)` }}
            >
              <div style={{ position: "relative" }}>
                {mem.mediaType === "video" ? (
                  <div
                    style={{
                      position: "relative",
                      height: "100%",
                      aspectRatio: "1/1",
                      background: "#000",
                      marginBottom: 10,
                    }}
                  >
                    <video
                      src={mem.media}
                      className="card-media"
                      style={{ marginBottom: 0, border: "none" }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "rgba(0,0,0,0.2)",
                      }}
                    >
                      <PlayCircle size={40} color="white" />
                    </div>
                  </div>
                ) : (
                  <img
                    src={mem.media || "https://via.placeholder.com/300"}
                    className="card-media"
                    alt={mem.title}
                  />
                )}
                {mem.isFavorite && (
                  <Heart
                    size={20}
                    fill="#c0392b"
                    color="#c0392b"
                    style={{
                      position: "absolute",
                      top: 10,
                      right: 10,
                      zIndex: 2,
                    }}
                  />
                )}
              </div>

              <div className="card-content">
                <h3 className="card-title">{mem.title}</h3>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 8,
                    marginTop: 5,
                  }}
                >
                  <span className="card-date">
                    {new Date(mem.date).toLocaleDateString()}
                  </span>
                  {mem.location && (
                    <span
                      className="card-date"
                      style={{ display: "flex", alignItems: "center", gap: 3 }}
                    >
                      • <MapPin size={10} /> {mem.location}
                    </span>
                  )}
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(mem.id);
                }}
                style={{
                  position: "absolute",
                  top: -10,
                  left: -10,
                  background: "#fff",
                  border: "1px solid #ccc",
                  borderRadius: "50%",
                  padding: 5,
                  color: "var(--text-muted)",
                  cursor: "pointer",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                }}
              >
                <Trash2 size={14} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// --- ÁLBUNS VIEW ---
const AlbumsView = ({ albums, onSelectAlbum, onCreateAlbum }) => {
  const [newAlbumName, setNewAlbumName] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  return (
    <div className="container fade-in">
      <h2 style={{ fontSize: "2.5rem", marginBottom: "2rem" }}>Meus Álbuns</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "2rem",
        }}
      >
        <div
          className="glass-panel"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: 250,
            cursor: "pointer",
            border: "2px dashed var(--border-glass)",
          }}
          onClick={() => setIsCreating(true)}
        >
          {!isCreating ? (
            <>
              <Plus size={40} color="var(--primary)" />
              <p>Novo Álbum</p>
            </>
          ) : (
            <div
              style={{ padding: "1rem", width: "100%" }}
              onClick={(e) => e.stopPropagation()}
            >
              <input
                autoFocus
                placeholder="Nome"
                value={newAlbumName}
                onChange={(e) => setNewAlbumName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && newAlbumName) {
                    onCreateAlbum(newAlbumName);
                    setNewAlbumName("");
                    setIsCreating(false);
                  }
                }}
              />
              <button
                className="btn-primary"
                onClick={() => {
                  if (newAlbumName) {
                    onCreateAlbum(newAlbumName);
                    setNewAlbumName("");
                    setIsCreating(false);
                  }
                }}
              >
                Criar
              </button>
            </div>
          )}
        </div>
        {albums.map((album) => (
          <div
            key={album.id}
            className="glass-panel"
            style={{
              overflow: "hidden",
              cursor: "pointer",
              minHeight: 250,
              position: "relative",
            }}
            onClick={() => onSelectAlbum(album)}
          >
            <img
              src={
                album.cover ||
                "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80"
              }
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: "brightness(0.8)",
              }}
              alt={album.title}
            />
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                padding: "1rem",
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
              }}
            >
              <h3 style={{ color: "#fff", margin: 0 }}>{album.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- DETAIL VIEW ---
const MemoryDetail = ({ memory, onBack, onEdit }) => (
  <div className="container fade-in">
    <button
      onClick={onBack}
      className="btn-icon"
      style={{
        width: "fit-content",
        borderRadius: "20px",
        paddingRight: "15px",
        gap: "5px",
        marginBottom: "1rem",
      }}
    >
      <ArrowLeft size={18} /> Voltar
    </button>
    <div
      className="glass-panel"
      style={{ overflow: "hidden", paddingBottom: "2rem" }}
    >
      <div
        style={{
          background: "#111",
          textAlign: "center",
          width: "100%",
          minHeight: "300px",
        }}
      >
        {memory.mediaType === "video" ? (
          <video
            src={memory.media}
            controls
            style={{ maxHeight: "60vh", maxWidth: "100%" }}
          />
        ) : (
          <img
            src={memory.media}
            alt="Memoria"
            style={{
              maxHeight: "60vh",
              maxWidth: "100%",
              objectFit: "contain",
            }}
          />
        )}
      </div>
      <div
        style={{ padding: "2rem 3rem", maxWidth: "800px", margin: "0 auto" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1
            style={{
              fontSize: "3rem",
              fontFamily: "Dancing Script",
              marginBottom: "0.5rem",
            }}
          >
            {memory.title}
          </h1>
          <button onClick={() => onEdit(memory)} className="btn-icon">
            <Edit2 size={20} />
          </button>
        </div>

        <div
          style={{
            display: "flex",
            gap: 15,
            color: "var(--text-muted)",
            marginBottom: "2rem",
            fontSize: "0.9rem",
            textTransform: "uppercase",
            letterSpacing: 1,
          }}
        >
          <span>{new Date(memory.date).toLocaleDateString()}</span>
          {memory.location && <span>• {memory.location}</span>}
        </div>

        <p
          style={{
            fontSize: "1.2rem",
            lineHeight: "1.8",
            whiteSpace: "pre-line",
            fontFamily: "Lato",
          }}
        >
          {memory.story || memory.description}
        </p>
      </div>
    </div>
  </div>
);

// --- APP ---
function App() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState("dashboard");
  const [memories, setMemories] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [currentAlbum, setCurrentAlbum] = useState(null);
  const [selectedMemory, setSelectedMemory] = useState(null);
  const [editingMemory, setEditingMemory] = useState(null);
  const [notification, setNotification] = useState(null);
  const [theme, setTheme] = useState(
    localStorage.getItem("mesq_theme") || "wine"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("mesq_theme", theme);
  }, [theme]);

  useEffect(() => {
    const u = localStorage.getItem("mesq_active_session");
    const m = JSON.parse(localStorage.getItem("mesq_memories") || "[]");
    const a = JSON.parse(localStorage.getItem("mesq_albums") || "[]");
    if (u) setUser(JSON.parse(u));
    setMemories(m.length ? m : [INITIAL_MEMORY]);
    setAlbums(a.length ? a : INITIAL_ALBUMS);
  }, []);

  const handleLogin = (u) => {
    setUser(u);
    localStorage.setItem("mesq_active_session", JSON.stringify(u));
  };
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("mesq_active_session");
  };

  const saveMemories = (newMemories) => {
    setMemories(newMemories);
    localStorage.setItem("mesq_memories", JSON.stringify(newMemories));
  };
  const handleCreateAlbum = (name) => {
    const newAlbum = { id: Date.now().toString(), title: name, cover: null };
    const updated = [...albums, newAlbum];
    setAlbums(updated);
    localStorage.setItem("mesq_albums", JSON.stringify(updated));
    setNotification({ message: "Álbum criado!", type: "success" });
  };
  const handleSaveMemory = (data) => {
    let updated;
    if (editingMemory)
      updated = memories.map((m) =>
        m.id === editingMemory.id ? { ...data, id: m.id } : m
      );
    else updated = [{ ...data, id: Date.now(), userId: user.id }, ...memories];

    // Auto-Set Album Cover
    if (data.albumId && data.mediaType === "image") {
      const idx = albums.findIndex((a) => a.id === data.albumId);
      if (idx >= 0 && !albums[idx].cover) {
        const newAlb = [...albums];
        newAlb[idx].cover = data.media;
        setAlbums(newAlb);
        localStorage.setItem("mesq_albums", JSON.stringify(newAlb));
      }
    }
    saveMemories(updated);
    setNotification({ message: "Salvo com sucesso!", type: "success" });
    setEditingMemory(null);
    setView(currentAlbum ? "album-detail" : "dashboard");
  };
  const handleDelete = (id) => {
    if (window.confirm("Excluir memória?")) {
      saveMemories(memories.filter((m) => m.id !== id));
      setNotification({ message: "Excluída.", type: "error" });
    }
  };

  const displayedMemories = currentAlbum
    ? memories.filter((m) => m.albumId === currentAlbum.id)
    : memories;

  return (
    <div className="app-wrapper">
      {notification && (
        <Toast
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
      {!user ? (
        <Auth onLogin={handleLogin} />
      ) : (
        <>
          <SettingsMenu
            currentTheme={theme}
            onSetTheme={setTheme}
            onLogout={handleLogout}
          />

          {view === "dashboard" && (
            <Dashboard
              user={user}
              memories={memories}
              onNew={() => {
                setEditingMemory(null);
                setCurrentAlbum(null);
                setView("create");
              }}
              onSelect={(m) => {
                setSelectedMemory(m);
                setView("detail");
              }}
              onDelete={handleDelete}
              onViewAlbums={() => setView("albums")}
            />
          )}

          {view === "albums" && (
            <div className="container fade-in">
              <button
                onClick={() => setView("dashboard")}
                className="btn-icon"
                style={{
                  marginBottom: 15,
                  width: "fit-content",
                  paddingRight: 15,
                  gap: 5,
                  borderRadius: 20,
                }}
              >
                <ArrowLeft size={18} /> Início
              </button>
              <AlbumsView
                albums={albums}
                onCreateAlbum={handleCreateAlbum}
                onSelectAlbum={(alb) => {
                  setCurrentAlbum(alb);
                  setView("album-detail");
                }}
              />
            </div>
          )}

          {view === "album-detail" && currentAlbum && (
            <div className="container fade-in">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "2rem",
                }}
              >
                <button
                  onClick={() => setView("albums")}
                  className="btn-icon"
                  style={{
                    width: "fit-content",
                    paddingRight: 15,
                    gap: 5,
                    borderRadius: 20,
                  }}
                >
                  <ArrowLeft size={18} /> Álbuns
                </button>
                <button
                  className="btn-primary"
                  onClick={() => {
                    setEditingMemory(null);
                    setView("create");
                  }}
                >
                  <Plus size={18} /> Adicione Aqui
                </button>
              </div>
              <h1 style={{ textAlign: "center", fontSize: "3rem" }}>
                {currentAlbum.title}
              </h1>
              <div className="grid">
                {displayedMemories.map((mem) => (
                  <div
                    key={mem.id}
                    className="memory-card"
                    onClick={() => {
                      setSelectedMemory(mem);
                      setView("detail");
                    }}
                    style={{
                      transform: `rotate(${(parseInt(mem.id) % 6) - 3}deg)`,
                    }}
                  >
                    <img
                      src={mem.media}
                      className="card-media"
                      alt={mem.title}
                    />
                    <div className="card-content">
                      <h3 className="card-title">{mem.title}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {view === "create" && (
            <MemoryForm
              onSave={handleSaveMemory}
              onCancel={() =>
                setView(currentAlbum ? "album-detail" : "dashboard")
              }
              initialData={editingMemory}
              albums={albums}
              preSelectedAlbumId={currentAlbum?.id}
            />
          )}

          {view === "detail" && selectedMemory && (
            <MemoryDetail
              memory={selectedMemory}
              onBack={() =>
                setView(currentAlbum ? "album-detail" : "dashboard")
              }
              onEdit={(m) => {
                setEditingMemory(m);
                setView("create");
              }}
            />
          )}
        </>
      )}
    </div>
  );
}

export default App;

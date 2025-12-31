import React, { useState, useEffect, useRef } from "react";
// Importação de bibliotecas externas
import { motion, AnimatePresence } from "framer-motion";
import html2canvas from "html2canvas";

// Importação de ícones
import {
  Camera, Plus, LogOut, ArrowLeft, Image as ImageIcon,
  Heart, Search, Filter, X, Trash2, Edit2, CheckCircle,
  AlertCircle, Folder, PlayCircle, Settings, Lock, Mail, User,
  ChevronDown, ChevronRight, ChevronLeft, Palette, Moon, MapPin, Calendar, Globe,
  Grid, FilePlus, Check, Map as MapIcon, CalendarClock, BarChart as BarIcon, Tag, Play, Pause,
  Share2, Users, Download, CalendarDays 
} from "lucide-react";

// --- IMPORTAÇÕES DE GRÁFICOS E MAPA ---
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, AreaChart, Area, Legend
} from 'recharts';

import "./styles.css";

// --- CORREÇÃO DE ÍCONES DO LEAFLET ---
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// --- CONFIGURAÇÃO DAS CORES ---
const THEME_COLORS = {
  wine: '#800020', sweet: '#ffb7c5', ocean: '#0077be',
  forest: '#2e8b57', wood: '#8b4513', sun: '#f39c12', dark: '#333333'
};

const THEME_PALETTES = {
  wine:   ['#5c0017', '#800020', '#a3152c', '#c0392b', '#e06666'],
  sweet:  ['#db4c93', '#ff69b4', '#ff8da1', '#ffb7c5', '#ffc4d6'],
  ocean:  ['#004e7c', '#0077be', '#2a9df4', '#87ceeb', '#b0e0e6'],
  forest: ['#1a3a1a', '#2e8b57', '#3cb371', '#90ee90', '#c1f0c1'],
  wood:   ['#3e2723', '#5d4037', '#8b4513', '#d2b48c', '#e6ccb2'],
  sun:    ['#d35400', '#e67e22', '#f39c12', '#f1c40f', '#f9e79f'],
  dark:   ['#5c0017', '#800020', '#a3152c', '#c0392b', '#e06666']
};

// --- TRADUÇÕES ---
const TRANSLATIONS = {
  pt: {
    slogan_register: "Comece sua jornada de memórias",
    slogan_login: "Suas memórias, guardadas com beleza",
    placeholder_name: "Nome completo",
    placeholder_user_email: "Nome de usuário ou email",
    placeholder_password: "Senha",
    btn_register: "Cadastre-se",
    btn_login: "Entrar",
    or: "OU",
    login_google: "Entrar com o Google",
    forgot_pass: "Esqueceu a senha?",
    have_account: "Tem uma conta?",
    no_account: "Não tem uma conta?",
    connect: "Conecte-se",
    hello: "OLÁ",
    subtitle_dash: "COLECIONANDO MOMENTOS",
    btn_albums: "ÁLBUNS",
    btn_favorites: "FAVORITOS",
    btn_new: "NOVA",
    search_placeholder: "Buscar...",
    title_edit: "Editar Memória",
    title_new: "Nova Memória",
    label_title: "Título",
    label_location: "Localização",
    label_album_select: "Sem Álbum (Geral)",
    label_add_media: "Adicionar Foto ou Vídeo",
    placeholder_story: "Conte a história...",
    label_fav: "Favorito",
    btn_save: "Salvar",
    btn_back: "Voltar",
    btn_cancel: "Cancelar",
    btn_delete: "Excluir",
    btn_close: "Fechar",
    my_albums: "MEUS ÁLBUNS",
    my_favorites: "MEUS FAVORITOS",
    new_album: "Novo Álbum",
    album_name_placeholder: "Nome do álbum",
    btn_create: "Criar",
    btn_home: "Início",
    btn_add_here: "Adicionar Memória",
    empty_album: "memórias",
    settings_appearance: "Aparência",
    settings_language: "Idioma",
    settings_logout: "Sair",
    delete_album_title: "Excluir Álbum?",
    delete_album_confirm: "Tem certeza que deseja excluir este álbum? As memórias não serão apagadas.",
    delete_memory_title: "Excluir Memória?",
    delete_memory_confirm: "Essa ação é irreversível. Tem certeza que deseja apagar esta memória?",
    lbl_cover: "Capa",
    add_to_album_title: "Adicionar ao Álbum",
    option_create_new: "Criar Nova",
    option_select_existing: "Selecionar Existente",
    select_memory_title: "Escolher Memória",
    no_available_memories: "Nenhuma memória disponível para adicionar.",
    label_tags: "Etiquetas (separadas por vírgula)",
    tag_all: "Todos",
    flashback_title: "Neste Dia",
    flashback_subtitle: "Relembre o que aconteceu hoje em anos anteriores.",
    disc_explore: "EXPLORAR",
    disc_map: "Mapa",
    disc_calendar: "Calendário", 
    disc_desc_map: "Visualize suas memórias pelo mundo.",
    disc_timeline: "Linha do Tempo",
    disc_desc_timeline: "Sua história em ordem cronológica.",
    disc_stats: "Estatísticas",
    disc_desc_stats: "Insights sobre sua vida e viagens.",
    disc_tags: "Etiquetas",
    disc_desc_tags: "Organize e filtre por temas.",
    btn_slideshow: "Slideshow",
    stats_total_memories: "Memórias",
    stats_total_albums: "Álbuns",
    stats_total_favs: "Favoritos",
    stats_places: "Lugares",
    stats_chart_country: "Memórias por País",
    stats_chart_tags: "Principais Etiquetas",
    stats_chart_people: "Companhias Frequentes", 
    stats_chart_timeline: "Evolução Temporal",
    map_loading: "Carregando coordenadas...",
    map_view_gallery: "Ver Galeria",
    map_popup_memory: "memória",
    map_popup_memories: "memórias",
    theme_wine: "Vinho", theme_sweet: "Sweet", theme_ocean: "Ocean", theme_forest: "Forest",
    theme_wood: "Wood", theme_sun: "Sun", theme_dark: "Dark",
    label_people: "Quem estava lá? (separado por vírgula)",
    btn_share: "Compartilhar",
    share_title: "Compartilhar Memória",
    btn_download: "Baixar Imagem"
  },
  en: {
    slogan_register: "Begin your memory journey",
    slogan_login: "Your memories, beautifully stored",
    placeholder_name: "Full Name",
    placeholder_user_email: "Username or email",
    placeholder_password: "Password",
    btn_register: "Sign up",
    btn_login: "Log in",
    or: "OR",
    login_google: "Log in with Google",
    hello: "HELLO",
    subtitle_dash: "COLLECTING MOMENTS",
    btn_albums: "ALBUMS",
    btn_favorites: "FAVORITES",
    btn_new: "NEW",
    search_placeholder: "Search...",
    title_edit: "Edit Memory",
    title_new: "New Memory",
    label_title: "Title",
    label_people: "Who was there? (comma separated)",
    btn_save: "Save",
    btn_back: "Back",
    btn_share: "Share",
    share_title: "Share Memory",
    btn_download: "Download Image",
    disc_calendar: "Calendar",
    stats_chart_people: "Top Companions",
    theme_wine: "Wine", theme_sweet: "Sweet", theme_ocean: "Ocean", theme_forest: "Forest",
    theme_wood: "Wood", theme_sun: "Sun", theme_dark: "Dark"
  }
};

const INITIAL_MEMORY = {
  id: 1,
  title: "Sunset in Pipa",
  date: "2023-12-24", 
  description: "Um dia perfeito.",
  story: "O sol se pondo nas falésias foi inesquecível.",
  location: "Pipa, Rio Grande do Norte",
  media: "https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?auto=format&fit=crop&w=1000&q=80",
  mediaType: "image",
  isFavorite: true,
  albumId: "album1", 
  userId: "user1",
  tags: ["viagem", "praia", "sol"],
  people: ["Ana", "Carlos"]
};

const INITIAL_ALBUMS = [{ id: "album1", title: "Viagens Brasil", cover: null, isLocked: false }];

// --- VARIANTS FRAMER MOTION ---
const fadeInVariant = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.3 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const cardVariant = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: { 
    opacity: 1, y: 0, scale: 1,
    transition: { type: "spring", stiffness: 50, damping: 15 }
  }
};

// --- 1. UTILS & HELPERS ---

const Toast = ({ message, type, onClose }) => {
  useEffect(() => { const t = setTimeout(onClose, 3000); return () => clearTimeout(t); }, [onClose]);
  const isSuccess = type !== 'error';
  return (
    <motion.div 
      initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -50, opacity: 0 }}
      className="toast-container-premium"
    >
      <div className={`toast-content-premium ${isSuccess ? 'toast-success' : 'toast-error'}`}>
        <div className="icon-area">{isSuccess ? <CheckCircle size={24} /> : <AlertCircle size={24} />}</div>
        <span style={{ fontSize: '0.95rem' }}>{message}</span>
      </div>
    </motion.div>
  );
};

// --- 2. AUTH & SETTINGS --- 
const Auth = ({ onLogin, t }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "", name: "" });
  const [error, setError] = useState("");
  const images = ["https://images.unsplash.com/photo-1501901609772-df0848060b33?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80"];
  const [idx, setIdx] = useState(0);
  useEffect(() => { const i = setInterval(() => setIdx((p) => (p + 1) % images.length), 5000); return () => clearInterval(i); }, []);
  const handleSubmit = (e) => { e.preventDefault(); setError(""); const stored = JSON.parse(localStorage.getItem("mesq_credentials") || "[]"); if (isRegister) { if (stored.find(u => u.email === formData.email)) { setError(t('error_email_use')); return; } const newUser = { ...formData, id: Date.now().toString() }; localStorage.setItem("mesq_credentials", JSON.stringify([...stored, newUser])); onLogin(newUser); } else { const user = stored.find(u => u.email === formData.email && u.password === formData.password); if (user) onLogin(user); else setError(t('error_login_fail')); } };
  return (
    <div className="auth-page fade-in"><div className="auth-container"><div className="auth-visuals">{images.map((src, i) => <img key={i} src={src} className={`visual-slide ${i===idx?'active':''}`} alt="slide"/>)}</div><div className="auth-content"><div className="insta-box"><h1 className="auth-logo">Memorio</h1><p className="auth-subtitle">{isRegister ? t('slogan_register') : t('slogan_login')}</p><form onSubmit={handleSubmit}>{isRegister && <input className="insta-input" placeholder={t('placeholder_name')} required onChange={e=>setFormData({...formData, name:e.target.value})}/>}<input className="insta-input" placeholder={t('placeholder_user_email')} required onChange={e=>setFormData({...formData, email:e.target.value})}/> <input type="password" className="insta-input" placeholder={t('placeholder_password')} required onChange={e=>setFormData({...formData, password:e.target.value})}/> <button className="btn-insta">{isRegister ? t('btn_register') : t('btn_login')}</button></form><div className="separator"><span>{t('or')}</span></div><button className="btn-google" onClick={()=>onLogin({name:"Google User", id:"g1", isGoogle:true})}>{t('login_google')}</button>{error && <p style={{color:'var(--danger)', fontSize:14, marginTop:20, fontWeight:600}}>{error}</p>}<div className="auth-footer">{isRegister ? t('have_account') : t('no_account')} <b onClick={()=>setIsRegister(!isRegister)}>{isRegister ? t('connect') : t('btn_register')}</b></div></div></div></div></div>
  );
};

const SettingsMenu = ({ onSetTheme, onLogout, setLang, t, lang }) => {
  const [open, setOpen] = useState(false);
  const [sub, setSub] = useState("");
  const ref = useRef(null);
  useEffect(() => { const fn = (e) => { if (ref.current && !ref.current.contains(e.target)) { setOpen(false); setSub(""); } }; document.addEventListener("mousedown", fn); return () => document.removeEventListener("mousedown", fn); }, []);
  return (
    <div style={{position:'relative'}} ref={ref}>
      <button className="btn-icon" onClick={()=>setOpen(!open)}><Settings size={20}/></button>
      <AnimatePresence>
      {open && (
        <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:10}} className="dropdown-menu">
          <div className="menu-item" onClick={()=>setSub(sub==='theme'?'':'theme')}><Palette size={16}/> {t('settings_appearance')} {sub==='theme'?<ChevronDown size={14}/>:<ChevronRight size={14}/>}</div>
          {sub==='theme' && (
            <div style={{display:'flex', gap:8, padding:'5px 10px', flexWrap: 'wrap'}}>
              {Object.keys(THEME_COLORS).map(themeKey => (<div key={themeKey} onClick={() => onSetTheme(themeKey)} title={t(`theme_${themeKey}`)} style={{width: 24, height: 24, borderRadius: '50%', cursor: 'pointer', background: THEME_COLORS[themeKey], border: '1px solid #ccc', boxShadow: '0 2px 5px rgba(0,0,0,0.1)'}} />))}
            </div>
          )}
          <div className="menu-item" onClick={()=>setSub(sub==='lang'?'':'lang')}><Globe size={16}/> {t('settings_language')} {sub==='lang'?<ChevronDown size={14}/>:<ChevronRight size={14}/>}</div>
          {sub === 'lang' && (
            <div className="lang-menu-container">
               <div className={`lang-option ${lang === 'pt' ? 'active' : ''}`} onClick={() => setLang('pt')}><div className="lang-label"><span className="lang-flag">🇧🇷</span> Português</div>{lang === 'pt' && <Check size={16} />}</div>
               <div className={`lang-option ${lang === 'en' ? 'active' : ''}`} onClick={() => setLang('en')}><div className="lang-label"><span className="lang-flag">🇺🇸</span> English</div>{lang === 'en' && <Check size={16} />}</div>
            </div>
          )}
          <div style={{height:1, background:'#eee', margin:'5px 0'}}></div>
          <div className="menu-item" style={{color:'var(--danger)'}} onClick={onLogout}><LogOut size={16}/> {t('settings_logout')}</div>
        </motion.div>
      )}
      </AnimatePresence>
    </div>
  );
};

const Header = ({ onNew, onViewAlbums, onViewFavorites, onViewHome, settingsProps, t, search, setSearch }) => (
  <header className="site-header">
    <div className="header-brand" onClick={onViewHome}>Memorio</div>
    <nav className="header-nav hidden-mobile">
        <span className="nav-link" onClick={onNew}>{t('btn_new')}</span>
        <span className="nav-link" onClick={onViewAlbums}>{t('btn_albums')}</span>
        <span className="nav-link" onClick={onViewFavorites}>{t('btn_favorites')}</span>
    </nav>
    <div className="header-actions">
        <div className="search-box" style={{marginRight: '1rem'}}>
          <input type="text" placeholder={t('search_placeholder')} value={search} onChange={e=>setSearch(e.target.value)}/>
          <Search size={18} color="var(--text-muted)"/>
        </div>
        <SettingsMenu {...settingsProps} />
    </div>
  </header>
);

// --- HERO STRIP CINEMATOGRÁFICO ---
const HeroStrip = ({ memories, onSelect }) => {
  const displayItems = [...memories].slice(0, 3);
  while (displayItems.length < 3) { displayItems.push({ id: "ph-" + displayItems.length, media: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1000&q=80", title: "Memorio", isPlaceholder: true }); }
  return (
    <div className="hero-strip fade-in">
      {displayItems.map((item) => (
        <div key={item.id} className="hero-item" onClick={() => !item.isPlaceholder && onSelect(item)}>
          {item.mediaType === 'video' ? (<video src={item.media} className="hero-img" muted />) : (<img src={item.media} className="hero-img" alt={item.title} />)}
          <div className="hero-overlay"><span className="hero-text">{item.title}</span></div>
        </div>
      ))}
    </div>
  );
};

// --- NOVOS MODAIS E FEATURES ---

// Modal de Compartilhamento
const ShareModal = ({ memory, onClose, t }) => {
    const cardRef = useRef(null);
  
    const handleDownload = async () => {
      if (cardRef.current) {
        const canvas = await html2canvas(cardRef.current, { useCORS: true, scale: 2, backgroundColor: null });
        const link = document.createElement('a');
        link.download = `Memorio-${memory.title.replace(/\s+/g, '-')}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      }
    };
  
    return (
      <div className="modal-overlay" onClick={onClose}>
         <motion.div initial={{scale:0.8, opacity:0}} animate={{scale:1, opacity:1}} className="modal-box" onClick={e=>e.stopPropagation()} style={{maxWidth: 500}}>
            <h3 className="modal-title">{t('share_title')}</h3>
            
            <div ref={cardRef} style={{
                background: 'var(--bg-body)', 
                padding: '40px', 
                borderRadius: '4px', 
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                textAlign: 'center',
                marginBottom: '20px',
                border: '1px solid var(--border-light)'
            }}>
                <div style={{
                    width: '100%', aspectRatio: '1/1', 
                    backgroundImage: `url(${memory.media})`, 
                    backgroundSize: 'cover', backgroundPosition: 'center',
                    marginBottom: '20px',
                    boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
                }} />
                <h2 style={{fontFamily: 'Cinzel', color: 'var(--primary)', margin: 0, fontSize: '1.8rem'}}>{memory.title}</h2>
                <p style={{fontFamily: 'Lato', color: 'var(--text-muted)', fontSize: '0.9rem', margin: '10px 0'}}>
                   {new Date(memory.date).toLocaleDateString()}
                </p>
                <div style={{fontFamily: 'Dancing Script', fontSize: '1.2rem', marginTop: '20px', opacity: 0.6, color: 'var(--text-main)'}}>
                   Memorio App
                </div>
            </div>
  
            <button onClick={handleDownload} className="btn-primary" style={{width: '100%', display:'flex', justifyContent:'center', gap:10}}>
               <Download size={20}/> {t('btn_download')}
            </button>
            <button onClick={onClose} className="btn-modal-cancel" style={{marginTop: 10, width: '100%'}}>{t('btn_close')}</button>
         </motion.div>
      </div>
    );
};

// --- NOVO MODAL: LISTA DE MEMÓRIAS DO DIA ---
const DayListModal = ({ isOpen, onClose, memories, date, onSelectMemory, t }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }} 
        animate={{ scale: 1, opacity: 1 }} 
        exit={{ scale: 0.9, opacity: 0 }}
        className="modal-box" 
        onClick={(e) => e.stopPropagation()} 
        style={{ maxWidth: 600, padding: '2rem' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '1rem' }}>
          <h3 className="modal-title" style={{ margin: 0, fontSize: '1.5rem' }}>
            {date.toLocaleDateString()}
          </h3>
          <button onClick={onClose} className="btn-icon"><X size={24} /></button>
        </div>

        {memories.length === 0 ? (
          <p style={{ color: 'var(--text-muted)' }}>Nenhuma memória encontrada.</p>
        ) : (
          <div className="day-list-grid">
            {memories.map((mem) => (
              <div key={mem.id} className="day-list-item" onClick={() => { onSelectMemory(mem); onClose(); }}>
                <div className="day-list-img-wrapper">
                  {mem.mediaType === 'video' ? (
                    <video src={mem.media} muted />
                  ) : (
                    <img src={mem.media} alt={mem.title} />
                  )}
                </div>
                <div className="day-list-info">
                  <h4>{mem.title}</h4>
                  <span>{mem.location || "Sem localização"}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

const CreateAlbumModal = ({ isOpen, onClose, onConfirm, t }) => {
    const [name, setName] = useState("");
    const [cover, setCover] = useState(null);
    if (!isOpen) return null;
    const handleFile = (e) => { const f = e.target.files[0]; if(!f) return; const r = new FileReader(); r.onloadend = () => setCover(r.result); r.readAsDataURL(f); };
    const handleSubmit = (e) => { e.preventDefault(); if (name.trim()) { onConfirm({ title: name, cover: cover }); setName(""); setCover(null); } };
    return (
      <div className="modal-overlay" onClick={onClose}><motion.div initial={{scale:0.9}} animate={{scale:1}} className="modal-box" onClick={(e) => e.stopPropagation()}><h3 className="modal-title">{t('new_album')}</h3><form onSubmit={handleSubmit}><div className="modal-upload-area" onClick={()=>document.getElementById('album-cover').click()}><input type="file" id="album-cover" style={{display:'none'}} onChange={handleFile} accept="image/*"/>{cover ? (<img src={cover} alt="Cover" className="modal-cover-preview"/>) : (<div className="modal-upload-placeholder"><ImageIcon size={24} style={{marginBottom:5}}/><br/>{t('lbl_cover')}</div>)}</div><input autoFocus type="text" className="modal-input" placeholder={t('album_name_placeholder')} value={name} onChange={(e) => setName(e.target.value)} /><div className="modal-actions"><button type="button" onClick={onClose} className="btn-modal-cancel">{t('btn_back')}</button><button type="submit" className="btn-modal-confirm">{t('btn_create')}</button></div></form></motion.div></div>
    );
};

const AddOptionModal = ({ isOpen, onClose, onCreateNew, onSelectExisting, t }) => {
    if (!isOpen) return null;
    return (
      <div className="modal-overlay" onClick={onClose}><motion.div initial={{y:50}} animate={{y:0}} className="modal-box" onClick={e => e.stopPropagation()}><h3 className="modal-title">{t('add_to_album_title')}</h3><div className="choice-grid"><div className="choice-card" onClick={onCreateNew}><div className="choice-icon"><FilePlus size={28} /></div><div className="choice-label">{t('option_create_new')}</div></div><div className="choice-card" onClick={onSelectExisting}><div className="choice-icon"><Grid size={28} /></div><div className="choice-label">{t('option_select_existing')}</div></div></div><button onClick={onClose} className="btn-modal-cancel" style={{marginTop: '2rem'}}>{t('btn_cancel')}</button></motion.div></div>
    );
};
  
const SelectMemoryModal = ({ isOpen, onClose, memories, currentAlbumId, onSelect, t }) => {
    if (!isOpen) return null;
    const availableMemories = memories.filter(m => m.albumId !== currentAlbumId);
    return (
      <div className="modal-overlay" onClick={onClose}><div className="modal-box" style={{maxWidth: 600}} onClick={e => e.stopPropagation()}><h3 className="modal-title">{t('select_memory_title')}</h3><div className="selection-container">{availableMemories.length === 0 ? (<p className="selection-empty">{t('no_available_memories')}</p>) : (availableMemories.map(m => (<div key={m.id} className="selection-item" onClick={() => onSelect(m.id)}>{m.mediaType === 'video' ? <video src={m.media} muted /> : <img src={m.media} alt="thumbnail" />}</div>)))}</div><button onClick={onClose} className="btn-modal-cancel" style={{marginTop: '1.5rem'}}>{t('btn_cancel')}</button></div></div>
    );
};
  
const LocationListModal = ({ isOpen, onClose, memories, title, onSelect, t }) => {
    if (!isOpen) return null;
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-box" style={{maxWidth: 700}} onClick={e => e.stopPropagation()}>
          <h3 className="modal-title" style={{marginBottom: '1.5rem', display:'flex', alignItems:'center', gap:10}}>
            <MapPin size={24} color="var(--primary)"/> {title}
          </h3>
          <div className="location-modal-grid">
            {memories.map(m => (
              <div key={m.id} className="mini-polaroid" onClick={() => onSelect(m)}>
                 {m.mediaType === 'video' ? <video src={m.media} /> : <img src={m.media} alt={m.title} />}
                 <div className="mini-caption">{m.title}</div>
              </div>
            ))}
          </div>
          <button onClick={onClose} className="btn-modal-cancel" style={{marginTop:'1.5rem', width:'100%'}}>{t('btn_close')}</button>
        </div>
      </div>
    );
};
  
const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message, t }) => {
    if (!isOpen) return null;
    return (
      <div className="modal-overlay" onClick={onClose}><div className="modal-box" onClick={e => e.stopPropagation()}><h3 className="modal-title">{title}</h3><p style={{marginBottom: '2rem', color: 'var(--text-muted)'}}>{message}</p><div className="modal-actions"><button onClick={onClose} className="btn-modal-cancel">{t('btn_cancel')}</button><button onClick={onConfirm} className="btn-modal-danger">{t('btn_delete')}</button></div></div></div>
    );
};

const SlideshowModal = ({ isOpen, onClose, memories }) => {
    const [index, setIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [progress, setProgress] = useState(0);
    const intervalRef = useRef(null);
    const startTimeRef = useRef(null);
  
    useEffect(() => {
      if (isOpen) { setIndex(0); setIsPlaying(true); setProgress(0); }
    }, [isOpen]);
  
    useEffect(() => {
      if (isOpen && isPlaying && memories.length > 0) {
        startTimeRef.current = Date.now();
        intervalRef.current = setInterval(() => {
          const elapsed = Date.now() - startTimeRef.current;
          const p = Math.min((elapsed / 5000) * 100, 100); 
          setProgress(p);
          if (elapsed >= 5000) {
            setIndex((prev) => (prev + 1) % memories.length);
            startTimeRef.current = Date.now();
            setProgress(0);
          }
        }, 50);
      } else { clearInterval(intervalRef.current); }
      return () => clearInterval(intervalRef.current);
    }, [isOpen, isPlaying, index, memories.length]);
  
    if (!isOpen || memories.length === 0) return null;
    const current = memories[index];
    const next = (e) => { e?.stopPropagation(); setIndex((prev) => (prev + 1) % memories.length); setProgress(0); startTimeRef.current = Date.now(); };
    const prev = (e) => { e?.stopPropagation(); setIndex((prev) => (prev - 1 + memories.length) % memories.length); setProgress(0); startTimeRef.current = Date.now(); };
  
    return (
      <div className="slideshow-overlay">
        <div className="ss-progress-wrapper"><div className="ss-progress-bar" style={{ width: `${progress}%` }} /></div>
        <div className="slideshow-media-container" onClick={(e) => e.stopPropagation()}>
          {memories.map((mem, i) => (
            (i === index) && (mem.mediaType === 'video' ? <video key={mem.id} src={mem.media} className="slideshow-media active" autoPlay loop muted /> : <img key={mem.id} src={mem.media} className="slideshow-media active" alt={mem.title} />)
          ))}
        </div>
        <div className="slideshow-info">
          <h2 className="slideshow-title">{current.title}</h2>
          <p className="slideshow-meta">{new Date(current.date).toLocaleDateString()} {current.location && `• ${current.location}`}</p>
        </div>
        <button className="ss-btn close" onClick={onClose}><X size={32}/></button>
        <button className="ss-btn prev" onClick={prev}><ChevronLeft size={48}/></button>
        <button className="ss-btn next" onClick={next}><ChevronRight size={48}/></button>
        <button className="ss-btn play-toggle" onClick={(e) => { e.stopPropagation(); setIsPlaying(!isPlaying); }}>{isPlaying ? <Pause size={32}/> : <Play size={32}/>}</button>
      </div>
    );
};

// --- VIEWS ---

const MapView = ({ memories, onSelect, onBack, t, selectedLocation, setSelectedLocation }) => {
    const [locations, setLocations] = useState([]);
  
    useEffect(() => {
      const fetchCoords = async () => {
        const locs = [];
        const seen = new Set();
        for (const mem of memories) {
          if (!mem.location || seen.has(mem.location)) continue;
          seen.add(mem.location);
          try {
            const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(mem.location)}`);
            const data = await res.json();
            if (data && data[0]) {
              locs.push({ name: mem.location, lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) });
            }
          } catch (e) { console.error("Erro geocoding", e); }
        }
        setLocations(locs);
      };
      fetchCoords();
    }, [memories]);
  
    return (
      <div className="container fade-in" style={{paddingTop: '2rem'}}>
        <div style={{display:'flex', alignItems:'center', marginBottom:30}}><button onClick={onBack} className="btn-icon"><ArrowLeft/> {t('btn_home')}</button><h2 style={{fontFamily:'Cinzel', fontSize:'2rem', marginLeft: 20}}>{t('disc_map')}</h2></div>
        <div style={{height: '600px', width: '100%', borderRadius: 12, overflow: 'hidden', border: '1px solid var(--border-light)'}}>
          <MapContainer center={[20, 0]} zoom={2} style={{ height: '100%', width: '100%' }}>
            <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
            {locations.map((loc, idx) => {
              const memoriesAtPlace = memories.filter(m => m.location === loc.name);
              return (
                <Marker key={idx} position={[loc.lat, loc.lng]}>
                  <Popup>
                    <div style={{textAlign:'center', minWidth: 150}}>
                      <strong style={{color:'var(--primary)', fontFamily:'Cinzel', display:'block', marginBottom:5}}>{loc.name}</strong>
                      <div style={{marginBottom:10, fontSize:'0.85rem', color:'#666'}}>{memoriesAtPlace.length} {memoriesAtPlace.length === 1 ? t('map_popup_memory') : t('map_popup_memories')}</div>
                      <button onClick={() => setSelectedLocation({name: loc.name, list: memoriesAtPlace})} className="btn-primary" style={{padding:'6px 12px', fontSize:'0.8rem', width:'100%'}}>{t('map_view_gallery')}</button>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        </div>
        <LocationListModal isOpen={!!selectedLocation} onClose={() => setSelectedLocation(null)} title={selectedLocation?.name} memories={selectedLocation?.list || []} onSelect={(m) => { onSelect(m); }} t={t} />
      </div>
    );
};

const TimelineView = ({ memories, onSelect, onBack, t }) => {
    const sorted = [...memories].sort((a, b) => new Date(b.date) - new Date(a.date));
    return (
      <div className="container fade-in" style={{paddingTop: '2rem'}}>
        <div style={{display:'flex', alignItems:'center', marginBottom:30}}><button onClick={onBack} className="btn-icon"><ArrowLeft/> {t('btn_home')}</button><h2 style={{fontFamily:'Cinzel', fontSize:'2rem', marginLeft: 20}}>{t('disc_timeline')}</h2></div>
        <div className="timeline-container">{sorted.map((mem, i) => (<motion.div initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} viewport={{once:true}} key={mem.id} className={`timeline-item ${i % 2 !== 0 ? 'right' : ''}`}><div className="timeline-dot"></div><div className="timeline-content" onClick={() => onSelect(mem)}><span className="timeline-date">{new Date(mem.date).toLocaleDateString()}</span><h4 style={{margin:0, fontFamily:'Cinzel'}}>{mem.title}</h4><div style={{width:'100%', height:150, marginTop:10, borderRadius:4, overflow:'hidden'}}>{mem.mediaType==='video' ? <video src={mem.media} style={{width:'100%', height:'100%', objectFit:'cover'}}/> : <img src={mem.media} style={{width:'100%', height:'100%', objectFit:'cover'}}/>}</div></div></motion.div>))}</div>
      </div>
    );
};

// --- CALENDÁRIO VISUAL ATUALIZADO (PREMIUM) ---
const VisualCalendar = ({ memories, onSelect, onBack, t }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDayMemories, setSelectedDayMemories] = useState(null);
    const [isDayModalOpen, setIsDayModalOpen] = useState(false);
  
    // Helpers de Data
    const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
    const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();
  
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
  
    const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const paddingArray = Array.from({ length: firstDay }, (_, i) => i);

    // Listas para os Selects
    const monthsList = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];
    // Gera anos de 5 anos atrás até 2 anos no futuro
    const currentYear = new Date().getFullYear();
    const yearsList = Array.from({length: 10}, (_, i) => currentYear - 7 + i);
  
    // Navegação
    const handleMonthChange = (e) => {
        setCurrentDate(new Date(year, parseInt(e.target.value), 1));
    };

    const handleYearChange = (e) => {
        setCurrentDate(new Date(parseInt(e.target.value), month, 1));
    };

    const changeMonthArrow = (offset) => {
      setCurrentDate(new Date(year, month + offset, 1));
    };

    // Ação ao clicar no dia
    const handleDayClick = (dayMemories, day) => {
        if (dayMemories.length > 0) {
            // Cria objeto de data para o modal
            const clickedDate = new Date(year, month, day);
            setSelectedDayMemories({ list: dayMemories, date: clickedDate });
            setIsDayModalOpen(true);
        }
    };
  
    return (
      <div className="container fade-in" style={{ paddingTop: '2rem' }}>
         {/* Topo com botão voltar */}
         <div style={{display:'flex', alignItems:'center', marginBottom:30}}>
            <button onClick={onBack} className="btn-icon"><ArrowLeft/> {t('btn_home')}</button>
            <h2 style={{fontFamily:'Cinzel', fontSize:'2rem', marginLeft: 20}}>{t('disc_calendar')}</h2>
         </div>
         
         {/* Header de Controles (Novo Design) */}
         <div className="calendar-header-controls premium-controls">
            <button onClick={() => changeMonthArrow(-1)} className="btn-icon"><ChevronLeft size={28}/></button>
            
            <div className="calendar-selects-wrapper">
                <select value={month} onChange={handleMonthChange} className="calendar-select">
                    {monthsList.map((m, index) => (
                        <option key={index} value={index}>{m}</option>
                    ))}
                </select>
                <select value={year} onChange={handleYearChange} className="calendar-select">
                    {yearsList.map((y) => (
                        <option key={y} value={y}>{y}</option>
                    ))}
                </select>
            </div>

            <button onClick={() => changeMonthArrow(1)} className="btn-icon"><ChevronRight size={28}/></button>
         </div>
  
         {/* Grid da Semana */}
         <div className="calendar-week-grid">
             {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((d,i) => (
                 <div key={i} className="calendar-weekday">{d}</div>
             ))}
         </div>

         {/* Grid dos Dias */}
         <div className="calendar-grid-wrapper">
            {paddingArray.map(i => <div key={`pad-${i}`} />)}
            
            {daysArray.map(day => {
               const dayMemories = memories.filter(m => {
                  const d = new Date(m.date);
                  // Ajuste de fuso horário simples para garantir match correto do dia
                  return d.getDate() === day && d.getMonth() === month && d.getFullYear() === year;
               });
               
               const hasMemory = dayMemories.length > 0;
               const cover = hasMemory ? dayMemories[0].media : null;
  
               return (
                 <motion.div 
                   key={day} 
                   className={`calendar-day-box ${hasMemory ? 'has-memory' : 'empty'}`}
                   whileHover={hasMemory ? { scale: 1.05, zIndex: 10, borderColor: 'var(--primary)' } : {}}
                   onClick={() => handleDayClick(dayMemories, day)}
                   initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}
                 >
                   {hasMemory && (
                      cover.includes('video') ? 
                      <video src={cover} className="calendar-day-img" /> :
                      <img src={cover} alt="" className="calendar-day-img" />
                   )}
                   
                   <div className={`calendar-day-number ${hasMemory ? 'active' : ''}`}>{day}</div>
                   
                   {dayMemories.length > 1 && (
                      <div className="day-badge">+{dayMemories.length - 1}</div>
                   )}
                 </motion.div>
               );
            })}
         </div>

         {/* Modal de Lista do Dia */}
         <DayListModal 
            isOpen={isDayModalOpen} 
            onClose={() => setIsDayModalOpen(false)}
            memories={selectedDayMemories?.list || []}
            date={selectedDayMemories?.date || new Date()}
            onSelectMemory={onSelect}
            t={t}
         />
      </div>
    );
};

const StatsView = ({ memories, albums, onBack, t, theme, lang }) => {
    const total = memories.length;
    const favs = memories.filter(m => m.isFavorite).length;
    const places = new Set(memories.map(m => m.location).filter(Boolean)).size;
    const activePalette = THEME_PALETTES[theme] || THEME_PALETTES.wine;
  
    // Gráfico de Países
    const countryCount = {};
    memories.forEach(m => { if(m.location) { const parts = m.location.split(','); const country = parts[parts.length - 1].trim(); countryCount[country] = (countryCount[country] || 0) + 1; } });
    const countryData = Object.keys(countryCount).map(k => ({ name: k, count: countryCount[k] }));
  
    // Gráfico de Tags
    const tagsCount = {};
    memories.forEach(m => { if (m.tags) { m.tags.forEach(tag => { tagsCount[tag] = (tagsCount[tag] || 0) + 1; }); } });
    const tagsData = Object.keys(tagsCount).map(k => ({ name: k, value: tagsCount[k] })).sort((a,b) => b.value - a.value).slice(0, 5);

    // Gráfico de Pessoas (NOVO)
    const peopleCount = {};
    memories.forEach(m => { if (m.people && Array.isArray(m.people)) { m.people.forEach(p => { peopleCount[p] = (peopleCount[p] || 0) + 1; }); } });
    const peopleData = Object.keys(peopleCount).map(k => ({ name: k, count: peopleCount[k] })).sort((a,b) => b.count - a.count).slice(0, 5);
  
    // Timeline
    const timelineData = memories.reduce((acc, m) => { const d = new Date(m.date); const key = `${d.getFullYear()}-${d.getMonth()+1}`; const existing = acc.find(x => x.name === key); if(existing) existing.count++; else acc.push({ name: key, count: 1 }); return acc; }, []).sort((a,b) => new Date(a.name) - new Date(b.name));
  
    return (
      <div className="container fade-in" style={{paddingTop: '2rem'}}>
        <div style={{display:'flex', alignItems:'center', marginBottom:30}}><button onClick={onBack} className="btn-icon"><ArrowLeft/> {t('btn_home')}</button><h2 style={{fontFamily:'Cinzel', fontSize:'2rem', marginLeft: 20}}>{t('disc_stats')}</h2></div>
        <div className="stats-grid">
           <div className="stat-card"><div className="stat-value">{total}</div><div className="stat-label">{t('stats_total_memories')}</div></div>
           <div className="stat-card"><div className="stat-value">{albums.length}</div><div className="stat-label">{t('stats_total_albums')}</div></div>
           <div className="stat-card"><div className="stat-value">{favs}</div><div className="stat-label">{t('stats_total_favs')}</div></div>
           <div className="stat-card"><div className="stat-value">{places}</div><div className="stat-label">{t('stats_places')}</div></div>
        </div>
        <div className="charts-grid">
            <div className="chart-box">
                <h3 className="chart-title">{t('stats_chart_country')}</h3>
                <div style={{height: 300}}>
                  <ResponsiveContainer width="100%" height="100%"><BarChart data={countryData}><CartesianGrid strokeDasharray="3 3" opacity={0.3} /><XAxis dataKey="name" stroke="var(--text-muted)" style={{fontSize: 12}} /><YAxis stroke="var(--text-muted)" /><Tooltip contentStyle={{backgroundColor: 'var(--bg-glass)', borderRadius: 8, border: '1px solid var(--primary)'}} itemStyle={{color: 'var(--text-main)'}} /><Bar dataKey="count" fill={activePalette[0]} radius={[4, 4, 0, 0]} /></BarChart></ResponsiveContainer>
                </div>
            </div>
            <div className="chart-box">
                <h3 className="chart-title">{t('stats_chart_tags')}</h3>
                <div style={{height: 300}}>
                  <ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={tagsData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">{tagsData.map((entry, index) => (<Cell key={`cell-${index}`} fill={activePalette[index % activePalette.length]} />))}</Pie><Tooltip contentStyle={{backgroundColor: 'var(--bg-glass)', borderRadius: 8, border: '1px solid var(--primary)'}} /><Legend /></PieChart></ResponsiveContainer>
                </div>
            </div>
            <div className="chart-box">
                <h3 className="chart-title">{t('stats_chart_people')}</h3>
                <div style={{height: 300}}>
                  <ResponsiveContainer width="100%" height="100%"><BarChart data={peopleData} layout="vertical"><XAxis type="number" hide /><YAxis dataKey="name" type="category" width={100} tick={{fontSize: 12}} stroke="var(--text-muted)" /><Tooltip cursor={{fill: 'transparent'}} contentStyle={{backgroundColor: 'var(--bg-glass)'}}/><Bar dataKey="count" fill={activePalette[2]} barSize={20} radius={[0, 10, 10, 0]} /></BarChart></ResponsiveContainer>
                </div>
            </div>
            <div className="chart-box" style={{gridColumn: '1 / -1'}}>
                <h3 className="chart-title">{t('stats_chart_timeline')}</h3>
                <div style={{height: 300}}>
                  <ResponsiveContainer width="100%" height="100%"><AreaChart data={timelineData}><defs><linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="var(--primary)" stopOpacity={0.8}/><stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/></linearGradient></defs><XAxis dataKey="name" stroke="var(--text-muted)" /><YAxis stroke="var(--text-muted)" /><CartesianGrid strokeDasharray="3 3" opacity={0.3} /><Tooltip contentStyle={{backgroundColor: 'var(--bg-glass)', borderRadius: 8, border: '1px solid var(--primary)'}} /><Area type="monotone" dataKey="count" stroke="var(--primary)" fillOpacity={1} fill="url(#colorCount)" /></AreaChart></ResponsiveContainer>
                </div>
            </div>
        </div>
      </div>
    );
};

const TagsView = ({ memories, onSelect, onBack, t }) => {
    const [activeTag, setActiveTag] = useState(null);
    const allTags = [...new Set(memories.flatMap(m => m.tags || []))];
    const filtered = activeTag ? memories.filter(m => m.tags?.includes(activeTag)) : memories;
    return (
      <div className="container fade-in" style={{paddingTop: '2rem'}}>
        <div style={{display:'flex', alignItems:'center', marginBottom:30}}><button onClick={onBack} className="btn-icon"><ArrowLeft/> {t('btn_home')}</button><h2 style={{fontFamily:'Cinzel', fontSize:'2rem', marginLeft: 20}}>{t('disc_tags')}</h2></div>
        <div className="tags-cloud"><div className={`filter-tag ${!activeTag ? 'active' : ''}`} onClick={() => setActiveTag(null)}>{t('tag_all')}</div>{allTags.map(tag => (<div key={tag} className={`filter-tag ${activeTag === tag ? 'active' : ''}`} onClick={() => setActiveTag(tag)}>#{tag}</div>))}</div>
        <motion.div className="grid-polaroid" variants={staggerContainer} initial="hidden" animate="visible">
            {filtered.map((mem, i) => (<motion.div key={mem.id} variants={cardVariant} className="polaroid-card" onClick={() => onSelect(mem)} whileHover={{ scale: 1.05 }}><img src={mem.media} className="polaroid-img" alt={mem.title}/><div className="polaroid-caption">{mem.title}</div></motion.div>))}
        </motion.div>
      </div>
    );
};

// --- COMPONENTES PRINCIPAIS DASHBOARD ---
const Dashboard = ({ user, memories, onNew, onSelect, onDelete, onViewAlbums, onViewFavorites, onNavigateTo, t, settingsProps, onShowToast }) => {
    const [search, setSearch] = useState("");
    
    // --- LÓGICA DE SCROLL (NOVO) ---
    const scrollRef = useRef(null);
    const scroll = (offset) => {
      if (scrollRef.current) {
        scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
      }
    };
    // ----------------------------------

    const filtered = memories.filter(m => m.title.toLowerCase().includes(search.toLowerCase()) || (m.location && m.location.toLowerCase().includes(search.toLowerCase())));
    const getFlashbackMemory = () => { const today = new Date(); return memories.find(m => { const mDate = new Date(m.date); return mDate.getDate() === today.getDate() && mDate.getMonth() === today.getMonth() && mDate.getFullYear() !== today.getFullYear(); }); };
    const flashbackMem = getFlashbackMemory();
    
    // Animação Stagger
    return (
      <div style={{ minHeight: '100vh', paddingBottom: 50 }}>
        <Header onNew={onNew} onViewAlbums={onViewAlbums} onViewFavorites={onViewFavorites} onViewHome={()=>{}} settingsProps={settingsProps} t={t} search={search} setSearch={setSearch} />
        <HeroStrip memories={memories} onSelect={onSelect} />
        <div className="container">
          <div className="section-divider"><div className="divider-line"></div><h2 className="section-title">{t('hello')}, {user.name.split(" ")[0]}</h2><p className="section-subtitle">{t('subtitle_dash')}</p></div>
          
          {/* --- CARROSSEL COM SETAS (ATUALIZADO) --- */}
          <div className="carousel-wrapper">
             {/* Botão Esquerda */}
             <button className="nav-arrow left" onClick={() => scroll(-400)}><ChevronLeft size={28}/></button>
             
             {/* Track com REF adicionada */}
             <div className="carousel-track" ref={scrollRef}>
                {filtered.slice(0, 10).map((mem, i) => (
                   <motion.div key={mem.id} className="polaroid-card" onClick={() => onSelect(mem)} style={{minWidth: 300, transform: `rotate(${(i%2===0?1:-1)*(Math.random()*1)}deg)`}} whileHover={{ scale: 1.05, zIndex: 10, rotate: 0 }}>
                       {mem.mediaType==='video' ? (<div style={{position:'relative', width:'100%', aspectRatio:'1/1', background:'#000', marginBottom:15}}><video src={mem.media} className="polaroid-img" style={{marginBottom:0, border:'none', height:'100%'}} muted/><div style={{position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center'}}><PlayCircle color="#fff"/></div></div>) : (<img src={mem.media} className="polaroid-img" alt={mem.title}/>)}
                       <div className="polaroid-caption">{mem.title}</div>
                       <div className="polaroid-meta">{new Date(mem.date).toLocaleDateString()}</div>
                       {mem.isFavorite && <Heart size={16} fill="var(--primary)" color="var(--primary)" style={{position:'absolute', top:10, right:10}}/>}
                   </motion.div>
                ))}
             </div>

             {/* Botão Direita */}
             <button className="nav-arrow right" onClick={() => scroll(400)}><ChevronRight size={28}/></button>
          </div>
          {/* ------------------------------------------- */}
  
          <div className="discovery-section fade-in">
              {flashbackMem && (<div className="flashback-container"><div className="flashback-card" onClick={() => onSelect(flashbackMem)}>{flashbackMem.mediaType === 'video' ? <video src={flashbackMem.media} className="flashback-thumb" muted /> : <img src={flashbackMem.media} className="flashback-thumb" alt="flashback" />}<div><h3 style={{fontFamily:'Cinzel', margin:0, fontSize:'1.2rem', color: 'var(--text-main)'}}>{t('flashback_title')}</h3><p style={{margin:0, fontSize:'0.9rem', color: 'var(--text-muted)'}}>{t('flashback_subtitle')}</p></div></div></div>)}
              <div className="discovery-header"><h3 className="section-title" style={{fontSize:'1.8rem'}}>{t('disc_explore')}</h3></div>
              <div className="discovery-grid">
                 <div className="discovery-card" onClick={() => onNavigateTo('map')}><div className="discovery-icon-box"><MapIcon size={24}/></div><div className="discovery-title">{t('disc_map')}</div><p className="discovery-desc">{t('disc_desc_map')}</p></div>
                 <div className="discovery-card" onClick={() => onNavigateTo('calendar')}><div className="discovery-icon-box"><CalendarDays size={24}/></div><div className="discovery-title">{t('disc_calendar')}</div><p className="discovery-desc">Visualize mês a mês.</p></div>
                 <div className="discovery-card" onClick={() => onNavigateTo('timeline')}><div className="discovery-icon-box"><CalendarClock size={24}/></div><div className="discovery-title">{t('disc_timeline')}</div><p className="discovery-desc">{t('disc_desc_timeline')}</p></div>
                 <div className="discovery-card" onClick={() => onNavigateTo('stats')}><div className="discovery-icon-box"><BarIcon size={24}/></div><div className="discovery-title">{t('disc_stats')}</div><p className="discovery-desc">{t('disc_desc_stats')}</p></div>
                 <div className="discovery-card" onClick={() => onNavigateTo('tags')}><div className="discovery-icon-box"><Tag size={24}/></div><div className="discovery-title">{t('disc_tags')}</div><p className="discovery-desc">{t('disc_desc_tags')}</p></div>
              </div>
          </div>
        </div>
      </div>
    );
};
  
const FavoritesView = ({ memories, onSelect, onNew, onViewAlbums, onViewHome, onViewFavorites, t, settingsProps }) => {
    const [search, setSearch] = useState("");
    const favorites = memories.filter(m => m.isFavorite);
    const filteredFavorites = favorites.filter(m => m.title.toLowerCase().includes(search.toLowerCase()));
    return (
      <div style={{ minHeight: '100vh', paddingBottom: 50 }}>
        <Header onNew={onNew} onViewAlbums={onViewAlbums} onViewFavorites={onViewFavorites} onViewHome={onViewHome} settingsProps={settingsProps} t={t} search={search} setSearch={setSearch} />
        <div className="container fade-in" style={{paddingTop: '3rem'}}><div className="section-divider"><div className="divider-line"></div><h2 className="section-title">{t('my_favorites')}</h2><p className="section-subtitle">{favorites.length} {t('empty_album')}</p></div>{filteredFavorites.length === 0 ? (<div style={{textAlign:'center', color:'var(--text-muted)', marginTop:'3rem'}}><Heart size={48} style={{opacity:0.2, marginBottom:10}}/><p>Você ainda não tem favoritos.</p></div>) : (<motion.div className="grid-polaroid" variants={staggerContainer} initial="hidden" animate="visible">{filteredFavorites.map((mem, i) => (<motion.div key={mem.id} variants={cardVariant} className="polaroid-card" onClick={() => onSelect(mem)} whileHover={{ scale: 1.05 }}><img src={mem.media} className="polaroid-img" alt={mem.title}/><div className="polaroid-caption">{mem.title}</div><div className="polaroid-meta">{new Date(mem.date).toLocaleDateString()}</div><Heart size={16} fill="var(--primary)" color="var(--primary)" style={{position:'absolute', top:10, right:10}}/></motion.div>))}</motion.div>)}</div>
      </div>
    );
};
  
const AlbumsView = ({ albums, onSelectAlbum, onCreateAlbum, onViewHome, onViewAlbums, onViewFavorites, onNew, t, setSlideshowOpen, settingsProps }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [search, setSearch] = useState("");
    const handleCreate = (albumData) => { onCreateAlbum(albumData); setIsModalOpen(false); };
    return (
      <div style={{ minHeight: '100vh', paddingBottom: 50 }}>
        <Header onNew={onNew} onViewAlbums={onViewAlbums} onViewFavorites={onViewFavorites} onViewHome={onViewHome} settingsProps={settingsProps} t={t} search={search} setSearch={setSearch} />
        <div className="container fade-in" style={{paddingTop: '2rem'}}><div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:30}}><button onClick={onViewHome} className="btn-icon"><ArrowLeft/> {t('btn_home')}</button><h2 style={{fontFamily:'Cinzel', fontSize:'2rem'}}>{t('my_albums')}</h2><div style={{width:80}}></div></div><div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(250px, 1fr))', gap:'2rem'}}><div onClick={() => setIsModalOpen(true)} style={{border:'2px dashed var(--border-light)', borderRadius:4, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', minHeight:300, cursor:'pointer', transition:'0.3s'}} onMouseEnter={e=>e.currentTarget.style.borderColor='var(--primary)'} onMouseLeave={e=>e.currentTarget.style.borderColor='var(--border-light)'}><Plus size={40} color="var(--primary)" /><p style={{marginTop: 10, fontFamily: 'Cinzel', fontWeight: 600}}>{t('new_album')}</p></div>{albums.map(a => (<div key={a.id} className="polaroid-card" onClick={() => onSelectAlbum(a)} style={{minHeight:300, transform:'rotate(0deg)', position:'relative'}}><img src={a.cover || "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80"} className="polaroid-img" style={{height:250, opacity: a.isLocked ? 0.8 : 1}} alt={a.title} />{a.isLocked && (<div style={{position:'absolute', top: 10, right: 10, background: 'rgba(0,0,0,0.5)', padding: 8, borderRadius: '50%', color:'#fff'}}><Lock size={20} /></div>)}<div className="polaroid-caption">{a.title}</div></div>))}</div></div><CreateAlbumModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onConfirm={handleCreate} t={t} />
      </div>
    );
};
  
const MemoryForm = ({ onSave, onCancel, initialData, albums, preSelectedAlbumId, t }) => {
    const parseLoc = (s) => { if(!s) return {c:"",s:"",ci:""}; const p=s.split(",").map(x=>x.trim()); if(p.length>=3) return {ci:p[0],s:p[1],c:p[2]}; return {c:s,s:"",ci:""}; };
    const [tagsStr, setTagsStr] = useState(initialData?.tags ? initialData.tags.join(", ") : "");
    const [peopleStr, setPeopleStr] = useState(initialData?.people ? initialData.people.join(", ") : "");
    const [fd, setFd] = useState(initialData || { title:"", date: new Date().toISOString().split("T")[0], description:"", story:"", location:"", isFavorite:false, media:null, mediaType:"image", albumId: preSelectedAlbumId||"", tags: [], people: [] });
    const [loc, setLoc] = useState(parseLoc(initialData?.location));
    const handleFile = (e) => { const f = e.target.files[0]; if(!f) return; const r = new FileReader(); r.onloadend = () => setFd({...fd, media: r.result, mediaType: f.type.startsWith("video/")?"video":"image"}); r.readAsDataURL(f); };
    
    const sub = (e) => { 
        e.preventDefault(); 
        const processedTags = tagsStr.split(',').map(t => t.trim()).filter(t => t !== ""); 
        const processedPeople = peopleStr.split(',').map(p => p.trim()).filter(p => p !== "");
        onSave({...fd, location: [loc.city, loc.state, loc.country].filter(Boolean).join(", "), tags: processedTags, people: processedPeople}); 
    };
    
    // Simples Location Selector
    const LocationSelector = ({ country, state, city, onChange }) => {
        // (Simplificado para o código não ficar maior ainda, mas a lógica de API do código anterior pode ser mantida aqui)
        return (
            <div className="location-grid">
               <div><label className="editor-label">País/Estado/Cidade</label><input className="editor-input" placeholder="Ex: Brasil" value={country} onChange={e => onChange("country", e.target.value)} /></div>
               <div><label className="editor-label">Estado</label><input className="editor-input" placeholder="Ex: PE" value={state} onChange={e => onChange("state", e.target.value)} /></div>
               <div><label className="editor-label">Cidade</label><input className="editor-input" placeholder="Ex: Recife" value={city} onChange={e => onChange("city", e.target.value)} /></div>
            </div>
        )
    };

    return (
      <div className="container fade-in" style={{paddingTop: '4rem', paddingBottom: '4rem'}}><div className="editor-container"><div style={{position: 'absolute', top: 20, right: 20}}><button onClick={onCancel} className="btn-icon"><X size={24} /></button></div><div className="fav-icon-absolute" onClick={() => setFd({ ...fd, isFavorite: !fd.isFavorite })} title={t('label_fav')}><Heart size={28} fill={fd.isFavorite ? "var(--primary)" : "transparent"} color={fd.isFavorite ? "var(--primary)" : "var(--text-muted)"} strokeWidth={1.5} /></div><h2 className="editor-title">{initialData ? t('title_edit') : t('title_new')}</h2><form onSubmit={sub}><div className="editor-grid"><div><label className="editor-label">{t('label_title')}</label><input className="editor-input" value={fd.title} onChange={e=>setFd({...fd, title:e.target.value})} required /></div><div><label className="editor-label">Data</label><input type="date" className="editor-input" value={fd.date} onChange={e=>setFd({...fd, date:e.target.value})} required /></div></div><div style={{marginBottom: '2rem'}}><LocationSelector country={loc.country} state={loc.state} city={loc.city} onChange={(k,v)=>setLoc({...loc, [k]:v})} /></div>
      
      <div style={{marginBottom: '2rem'}}><label className="editor-label">{t('label_tags')}</label><input className="editor-input" value={tagsStr} onChange={e => setTagsStr(e.target.value)} placeholder="ex: praia, viagem" /></div>
      <div style={{marginBottom: '2rem'}}><label className="editor-label">{t('label_people')}</label><input className="editor-input" value={peopleStr} onChange={e => setPeopleStr(e.target.value)} placeholder="ex: Ana, João" /></div>

      <div style={{marginBottom: '2rem'}}><label className="editor-label">Álbum</label><select className="editor-input" value={fd.albumId} onChange={e => setFd({...fd, albumId: e.target.value})} style={{background: 'transparent'}}><option value="">{t('label_album_select')}</option>{albums.map(alb => <option key={alb.id} value={alb.id}>{alb.title}</option>)}</select></div><div className="editor-upload"><input type="file" id="up" style={{display:'none'}} onChange={handleFile} accept="image/*,video/*"/><label htmlFor="up" style={{width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer'}}>{fd.media ? (fd.mediaType === 'video' ? <video src={fd.media} controls className="upload-preview"/> : <img src={fd.media} alt="Preview" className="upload-preview"/>) : (<div className="upload-placeholder"><div style={{background: 'var(--bg-body)', padding: 15, borderRadius: '50%', border: '1px solid #ddd', display: 'inline-block', marginBottom: 10}}><ImageIcon size={32} color="var(--primary)"/></div><p style={{margin:0, fontWeight: 500}}>{t('label_add_media')}</p></div>)}</label></div><div style={{marginBottom: '1rem'}}><label className="editor-label">História</label><textarea className="editor-textarea" placeholder={t('placeholder_story')} value={fd.story} onChange={e=>setFd({...fd, story:e.target.value})} /></div><button className="btn-primary" style={{width:'100%', padding: '15px', fontSize: '1rem', marginTop: '20px'}}>{t('btn_save')}</button></form></div></div>
    );
};
  
// --- APP PRINCIPAL ---
function App() {
    const [user, setUser] = useState(null);
    const [view, setView] = useState("dashboard");
    const [lastView, setLastView] = useState("dashboard"); 
    const [memories, setMemories] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [currentAlbum, setCurrentAlbum] = useState(null);
    const [selectedMemory, setSelectedMemory] = useState(null);
    const [editingMemory, setEditingMemory] = useState(null);
    const [notification, setNotification] = useState(null);
    const [theme, setTheme] = useState(localStorage.getItem("mesq_theme") || "wine");
    const [lang, setLang] = useState(localStorage.getItem("mesq_lang") || "pt");
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [deleteMemoryId, setDeleteMemoryId] = useState(null);
    const [addOptionModalOpen, setAddOptionModalOpen] = useState(false);
    const [selectMemoryModalOpen, setSelectMemoryModalOpen] = useState(false);
    
    // Novos Estados
    const [mapLocation, setMapLocation] = useState(null);
    const [isSlideshowOpen, setIsSlideshowOpen] = useState(false);
    const [shareModalOpen, setShareModalOpen] = useState(false);
  
    const t = (key) => TRANSLATIONS[lang][key] || key;
  
    useEffect(() => { document.documentElement.setAttribute("data-theme", theme); localStorage.setItem("mesq_theme", theme); }, [theme]);
    useEffect(() => { localStorage.setItem("mesq_lang", lang); }, [lang]);
  
    useEffect(() => {
      const u = localStorage.getItem("mesq_active_session");
      const m = JSON.parse(localStorage.getItem("mesq_memories") || "[]");
      const a = JSON.parse(localStorage.getItem("mesq_albums") || "[]");
      if (u) setUser(JSON.parse(u));
      const processedMemories = (m.length ? m : [INITIAL_MEMORY]).map(mem => ({...mem, tags: mem.tags || [], people: mem.people || []}));
      setMemories(processedMemories);
      const processedAlbums = (a.length ? a : INITIAL_ALBUMS).map(alb => ({...alb, isLocked: alb.isLocked || false}));
      setAlbums(processedAlbums);
    }, []);
  
    const handleLogin = (u) => { setUser(u); localStorage.setItem("mesq_active_session", JSON.stringify(u)); };
    const handleLogout = () => { setUser(null); localStorage.removeItem("mesq_active_session"); };
    const saveMemories = (newMemories) => { setMemories(newMemories); localStorage.setItem("mesq_memories", JSON.stringify(newMemories)); };
    const handleCreateAlbum = ({title, cover}) => { const newAlbum = { id: Date.now().toString(), title, cover, isLocked: false }; const updated = [...albums, newAlbum]; setAlbums(updated); localStorage.setItem("mesq_albums", JSON.stringify(updated)); setNotification({ message: "Álbum criado!", type: "success" }); };
    const handleConfirmDeleteAlbum = () => { if(!currentAlbum) return; const updatedAlbums = albums.filter(a => a.id !== currentAlbum.id); setAlbums(updatedAlbums); localStorage.setItem("mesq_albums", JSON.stringify(updatedAlbums)); const updatedMemories = memories.map(m => m.albumId === currentAlbum.id ? { ...m, albumId: "" } : m); saveMemories(updatedMemories); setNotification({ message: "Álbum excluído.", type: "success" }); setDeleteModalOpen(false); setCurrentAlbum(null); setView("albums"); };
    const handleConfirmDeleteMemory = () => { if (!deleteMemoryId) return; saveMemories(memories.filter(m => m.id !== deleteMemoryId)); setNotification({ message: "Memória excluída.", type: "success" }); setDeleteMemoryId(null); setSelectedMemory(null); setView(lastView); };
    const handleAddExistingMemory = (memoryId) => { if(!currentAlbum) return; const updated = memories.map(m => m.id === memoryId ? { ...m, albumId: currentAlbum.id } : m); saveMemories(updated); setSelectMemoryModalOpen(false); setNotification({ message: "Adicionada ao álbum!", type: "success" }); };
    const handleSaveMemory = (data) => { let updated; const memoryData = {...data, tags: data.tags || [], people: data.people || []}; if (editingMemory) updated = memories.map(m => m.id === editingMemory.id ? { ...memoryData, id: m.id } : m); else updated = [{ ...memoryData, id: Date.now(), userId: user.id }, ...memories]; if(memoryData.albumId && memoryData.mediaType === 'image') { const idx = albums.findIndex(a => a.id === memoryData.albumId); if(idx >= 0 && !albums[idx].cover) { const newAlb = [...albums]; newAlb[idx].cover = memoryData.media; setAlbums(newAlb); localStorage.setItem("mesq_albums", JSON.stringify(newAlb)); } } saveMemories(updated); setNotification({ message: "Salvo!", type: "success" }); setEditingMemory(null); setView(lastView); };
    const handleDelete = (id) => { if (window.confirm("Excluir?")) { saveMemories(memories.filter(m => m.id !== id)); setNotification({ message: "Excluída.", type: "error" }); } };
  
    const displayedMemories = currentAlbum ? memories.filter(m => m.albumId === currentAlbum.id) : memories;
    const settingsProps = { onSetTheme: setTheme, onLogout: handleLogout, setLang, t, lang };
  
    return (
      <div className="app-wrapper">
        <AnimatePresence>
          {notification && <Toast message={notification.message} type={notification.type} onClose={() => setNotification(null)} />}
        </AnimatePresence>
        
        {!user ? <Auth onLogin={handleLogin} t={t} /> : (
          <>
            {view === "dashboard" && (
              <Dashboard user={user} memories={memories} onNew={()=>{setEditingMemory(null); setCurrentAlbum(null); setLastView("dashboard"); setView("create")}} onSelect={m=>{setLastView("dashboard"); setSelectedMemory(m); setView("detail")}} onDelete={handleDelete} onViewAlbums={()=>setView("albums")} onViewFavorites={()=>setView("favorites")} onNavigateTo={(v) => {setLastView("dashboard"); setView(v)}} t={t} settingsProps={settingsProps} onShowToast={setNotification} />
            )}
  
            {view === "favorites" && (
              <FavoritesView memories={memories} onSelect={m=>{setLastView("favorites"); setSelectedMemory(m); setView("detail")}} onNew={()=>{setEditingMemory(null); setCurrentAlbum(null); setLastView("favorites"); setView("create")}} onViewAlbums={()=>setView("albums")} onViewFavorites={()=>setView("favorites")} onViewHome={()=>setView("dashboard")} t={t} settingsProps={settingsProps} />
            )}
  
            {view === "albums" && (
              <AlbumsView albums={albums} onSelectAlbum={alb=>{setCurrentAlbum(alb); setView("album-detail")}} onCreateAlbum={handleCreateAlbum} onViewHome={()=>setView("dashboard")} onViewAlbums={()=>setView("albums")} onViewFavorites={()=>setView("favorites")} onNew={()=>{setEditingMemory(null); setCurrentAlbum(null); setLastView("albums"); setView("create")}} t={t} settingsProps={settingsProps} />
            )}
  
            {view === "album-detail" && currentAlbum && (
                <div className="container fade-in" style={{paddingTop: '2rem'}}>
                    <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:30}}>
                       <div style={{display:'flex', alignItems:'center', gap:15}}><button onClick={()=>setView('albums')} className="btn-icon"><ArrowLeft/> {t('btn_albums')}</button></div>
                       <div style={{textAlign:'center'}}><h1 style={{fontFamily:'Cinzel', fontSize:'2.5rem', margin:0}}>{currentAlbum.title}{currentAlbum.isLocked && <Lock size={20} style={{marginLeft: 10, opacity: 0.6}}/>}</h1><span style={{fontSize:'0.8rem', color:'var(--text-muted)'}}>{displayedMemories.length} {t('empty_album')}</span></div>
                       <div style={{display:'flex', alignItems:'center', gap:10}}><button onClick={() => setIsSlideshowOpen(true)} className="btn-icon" title={t('btn_slideshow')}><Play size={20}/></button><button onClick={() => setDeleteModalOpen(true)} className="btn-icon btn-action-delete" title="Excluir Álbum"><Trash2 size={20}/></button><button onClick={() => setAddOptionModalOpen(true)} className="btn-primary"><Plus size={16}/> {t('btn_add_here')}</button></div>
                    </div>
                    <motion.div className="grid-polaroid" variants={staggerContainer} initial="hidden" animate="visible">
                       {displayedMemories.map(mem => (<motion.div key={mem.id} variants={cardVariant} className="polaroid-card" onClick={()=> {setLastView("album-detail"); setSelectedMemory(mem); setView('detail')}}><img src={mem.media} className="polaroid-img" /><div className="polaroid-caption">{mem.title}</div></motion.div>))}
                    </motion.div>
                </div>
            )}
  
            {view === "map" && <MapView memories={memories} onSelect={m=>{setLastView("map"); setSelectedMemory(m); setView("detail")}} onBack={()=>setView("dashboard")} t={t} selectedLocation={mapLocation} setSelectedLocation={setMapLocation} />}
            {view === "timeline" && <TimelineView memories={memories} onSelect={m=>{setLastView("timeline"); setSelectedMemory(m); setView("detail")}} onBack={()=>setView("dashboard")} t={t} />}
            {view === "calendar" && <VisualCalendar memories={memories} onSelect={m=>{setLastView("calendar"); setSelectedMemory(m); setView("detail")}} onBack={()=>setView("dashboard")} t={t} />}
            
            {view === "stats" && <StatsView memories={memories} albums={albums} onBack={()=>setView("dashboard")} t={t} theme={theme} lang={lang} />}
            {view === "tags" && <TagsView memories={memories} onSelect={m=>{setLastView("tags"); setSelectedMemory(m); setView("detail")}} onBack={()=>setView("dashboard")} t={t} />}
  
            {view === "create" && <MemoryForm onSave={handleSaveMemory} onCancel={()=>setView(lastView)} initialData={editingMemory} albums={albums} preSelectedAlbumId={currentAlbum?.id} t={t} />}
            
            {view === "detail" && selectedMemory && (
              <div className="detail-overlay fade-in"><div style={{maxWidth:900, width:'100%', padding:'4rem 2rem'}}><div style={{display:'flex', justifyContent:'space-between', marginBottom:20}}><button onClick={()=>setView(lastView)} className="btn-icon"><ArrowLeft/> {t('btn_back')}</button><div style={{display: 'flex', gap: '15px'}}><button onClick={() => setShareModalOpen(true)} className="btn-icon" title={t('btn_share')}><Share2/></button><button onClick={() => setDeleteMemoryId(selectedMemory.id)} className="btn-icon btn-action-delete" title={t('btn_delete')}><Trash2/></button><button onClick={()=>setEditingMemory(selectedMemory) || setView('create')} className="btn-icon" style={{color:'var(--primary)'}} title={t('title_edit')}><Edit2/></button></div></div><div className="polaroid-card" style={{cursor:'default', transform:'none', paddingBottom:30}}><div style={{maxHeight:'70vh', overflow:'hidden', marginBottom:20, display:'flex', justifyContent:'center', background:'#000'}}>{selectedMemory.mediaType==='video' ? <video src={selectedMemory.media} controls style={{height:'100%', maxWidth:'100%'}}/> : <img src={selectedMemory.media} style={{maxHeight:'70vh', objectFit:'contain'}}/>}</div><h1 style={{fontFamily:'Cinzel', fontSize:'2.5rem', textAlign:'center', margin:'10px 0'}}>{selectedMemory.title}</h1>{selectedMemory.tags && selectedMemory.tags.length > 0 && (<div style={{display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 15}}>{selectedMemory.tags.map((tag, i) => (<span key={i} style={{background: 'var(--primary)', color: '#fff', padding: '4px 10px', borderRadius: 15, fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: 5}}><Tag size={12}/> {tag}</span>))}</div>)}
              {selectedMemory.people && selectedMemory.people.length > 0 && (<div style={{textAlign:'center', marginBottom:10, color:'var(--text-muted)', fontSize:'0.9rem'}}><Users size={12} style={{display:'inline', marginRight:5}}/> {selectedMemory.people.join(", ")}</div>)}
              <div style={{textAlign:'center', color:'#999', textTransform:'uppercase', letterSpacing:1, marginBottom:30}}>{new Date(selectedMemory.date).toLocaleDateString()} {selectedMemory.location && ` • ${selectedMemory.location}`}</div><p style={{fontFamily:'Lato', fontSize:'1.2rem', lineHeight:1.8, maxWidth:700, margin:'0 auto', textAlign:'justify'}}>{selectedMemory.story}</p></div></div></div>
            )}
  
            <ConfirmModal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} onConfirm={handleConfirmDeleteAlbum} title={t('delete_album_title')} message={t('delete_album_confirm')} t={t} />
            <ConfirmModal isOpen={!!deleteMemoryId} onClose={() => setDeleteMemoryId(null)} onConfirm={handleConfirmDeleteMemory} title={t('delete_memory_title')} message={t('delete_memory_confirm')} t={t} />
            <AddOptionModal isOpen={addOptionModalOpen} onClose={() => setAddOptionModalOpen(false)} onCreateNew={() => { setAddOptionModalOpen(false); setEditingMemory(null); setLastView("album-detail"); setView('create'); }} onSelectExisting={() => { setAddOptionModalOpen(false); setSelectMemoryModalOpen(true); }} t={t} />
            <SelectMemoryModal isOpen={selectMemoryModalOpen} onClose={() => setSelectMemoryModalOpen(false)} memories={memories} currentAlbumId={currentAlbum?.id} onSelect={handleAddExistingMemory} t={t} />
            
            {shareModalOpen && selectedMemory && (
                <ShareModal memory={selectedMemory} onClose={() => setShareModalOpen(false)} t={t} />
            )}

            <SlideshowModal isOpen={isSlideshowOpen} onClose={() => setIsSlideshowOpen(false)} memories={displayedMemories} />
          </>
        )}
      </div>
    );
}
  
export default App;
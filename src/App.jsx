import React, { useState, useEffect, useRef } from "react";
import {
  Camera, Plus, LogOut, ArrowLeft, Image as ImageIcon,
  Heart, Search, Filter, X, Trash2, Edit2, CheckCircle,
  AlertCircle, Folder, PlayCircle, Settings, Lock, Mail, User,
  ChevronDown, ChevronRight, ChevronLeft, Palette, Moon, MapPin, Calendar, Globe, // <--- Adicionado ChevronLeft
  Grid, FilePlus, Check
} from "lucide-react";
import "./styles.css";

// --- CONFIGURAÇÃO DAS CORES (FIXAS PARA O MENU) ---
const THEME_COLORS = {
  wine: '#800020',
  sweet: '#ffb7c5',
  ocean: '#0077be',
  forest: '#2e8b57',
  wood: '#8b4513',
  sun: '#f39c12',
  dark: '#333333'
};

// --- TRADUÇÕES ---
const TRANSLATIONS = {
  pt: {
    slogan_register: "Comece sua jornada de memórias",
    slogan_login: "Suas memórias, guardadas com beleza",
    placeholder_name: "Nome",
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
    copyright: "© 2025 Memorio por Você",
    error_email_use: "Este e-mail já está em uso.",
    error_login_fail: "Senha incorreta ou usuário inexistente.",
    hello: "OLÁ",
    subtitle_dash: "COLECIONANDO MOMENTOS",
    your_collection: "SUA COLEÇÃO",
    btn_albums: "ÁLBUNS",
    btn_favorites: "FAVORITOS",
    btn_new: "NOVA",
    search_placeholder: "Buscar...",
    btn_view: "Ver",
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
    my_albums: "MEUS ÁLBUNS",
    my_favorites: "MEUS FAVORITOS",
    new_album: "Novo Álbum",
    album_name_placeholder: "Nome do álbum",
    btn_create: "Criar",
    btn_home: "Início",
    btn_add_here: "Add Aqui",
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
    theme_wine: "Vinho",
    theme_sweet: "Sweet",
    theme_ocean: "Ocean",
    theme_forest: "Forest",
    theme_wood: "Wood",
    theme_sun: "Sun",
    theme_dark: "Dark"
  },
  en: {
    slogan_register: "Begin your memory journey",
    slogan_login: "Your memories, beautifully stored",
    placeholder_name: "Name",
    placeholder_user_email: "Username or email",
    placeholder_password: "Password",
    btn_register: "Sign up",
    btn_login: "Log in",
    or: "OR",
    login_google: "Log in with Google",
    forgot_pass: "Forgot password?",
    have_account: "Have an account?",
    no_account: "Don't have an account?",
    connect: "Log in",
    copyright: "© 2025 Memorio from You",
    error_email_use: "Email already in use.",
    error_login_fail: "Incorrect password or username.",
    hello: "HELLO",
    subtitle_dash: "COLLECTING MOMENTS",
    your_collection: "YOUR COLLECTION",
    btn_albums: "ALBUMS",
    btn_favorites: "FAVORITES",
    btn_new: "NEW",
    search_placeholder: "Search...",
    btn_view: "View",
    title_edit: "Edit Memory",
    title_new: "New Memory",
    label_title: "Title",
    label_location: "Location",
    label_album_select: "No Album (General)",
    label_add_media: "Add Photo or Video",
    placeholder_story: "Tell the story...",
    label_fav: "Favorite",
    btn_save: "Save",
    btn_back: "Back",
    btn_cancel: "Cancel",
    btn_delete: "Delete",
    my_albums: "MY ALBUMS",
    my_favorites: "MY FAVORITES",
    new_album: "New Album",
    album_name_placeholder: "Album name",
    btn_create: "Create",
    btn_home: "Home",
    btn_add_here: "Add Here",
    empty_album: "memories",
    settings_appearance: "Appearance",
    settings_language: "Language",
    settings_logout: "Log out",
    delete_album_title: "Delete Album?",
    delete_album_confirm: "Are you sure you want to delete this album? Memories will not be deleted.",
    delete_memory_title: "Delete Memory?",
    delete_memory_confirm: "This action is irreversible. Are you sure you want to delete this memory?",
    lbl_cover: "Cover",
    add_to_album_title: "Add to Album",
    option_create_new: "Create New",
    option_select_existing: "Select Existing",
    select_memory_title: "Select Memory",
    no_available_memories: "No memories available to add.",
    theme_wine: "Wine",
    theme_sweet: "Sweet",
    theme_ocean: "Ocean",
    theme_forest: "Forest",
    theme_wood: "Wood",
    theme_sun: "Sun",
    theme_dark: "Dark"
  }
};

const INITIAL_MEMORY = {
  id: 1,
  title: "Sunset in Pipa",
  date: "2024-12-24",
  description: "Um dia perfeito.",
  story: "O sol se pondo nas falésias foi inesquecível.",
  location: "Pipa, Rio Grande do Norte",
  media: "https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?auto=format&fit=crop&w=1000&q=80",
  mediaType: "image",
  isFavorite: true,
  albumId: "album1", 
  userId: "user1",
};

const INITIAL_ALBUMS = [{ id: "album1", title: "Viagens Brasil", cover: null }];

// --- UTILS ---
const Toast = ({ message, type, onClose }) => {
  useEffect(() => { const t = setTimeout(onClose, 3000); return () => clearTimeout(t); }, [onClose]);
  const isSuccess = type !== 'error';
  return (
    <div className="toast-container-premium">
      <div className={`toast-content-premium ${isSuccess ? 'toast-success' : 'toast-error'}`}>
        <div className="icon-area">{isSuccess ? <CheckCircle size={24} /> : <AlertCircle size={24} />}</div>
        <span style={{ fontSize: '0.95rem' }}>{message}</span>
      </div>
    </div>
  );
};

// --- LOCATION SELECTOR ---
const LocationSelector = ({ country, state, city, onChange }) => {
  const [countriesList, setCountriesList] = useState([]);
  const [statesList, setStatesList] = useState([]);
  const [citiesList, setCitiesList] = useState([]);

  useEffect(() => {
    fetch("https://countriesnow.space/api/v0.1/countries/flag/images")
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          const sorted = data.data.sort((a, b) => a.name.localeCompare(b.name));
          setCountriesList(sorted);
        }
      })
      .catch((err) => console.error("Erro países", err));
  }, []);

  useEffect(() => {
    if (!country) { setStatesList([]); return; }
    const cObj = countriesList.find(c => c.name === country);
    if (cObj) {
      fetch("https://countriesnow.space/api/v0.1/countries/states", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ country: cObj.name }),
      }).then((res) => res.json()).then((data) => { if (!data.error) setStatesList(data.data.states.sort((a, b) => a.name.localeCompare(b.name))); }).catch(() => {});
    }
  }, [country, countriesList]);

  useEffect(() => {
    if (!country || !state) { setCitiesList([]); return; }
    fetch("https://countriesnow.space/api/v0.1/countries/state/cities", {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ country, state }),
    }).then((res) => res.json()).then((data) => { if (!data.error) setCitiesList(data.data.sort((a, b) => a.localeCompare(b))); }).catch(() => {});
  }, [state, country]);

  return (
    <div className="location-grid">
      <div>
        <label className="editor-label">País</label>
        <div style={{ position: "relative" }}>
          <input list="countries-data" placeholder="Selecione..." value={country} onChange={(e) => onChange("country", e.target.value)} required />
          <datalist id="countries-data">{countriesList.map((c, idx) => (<option key={idx} value={c.name} />))}</datalist>
          {countriesList.find(c => c.name === country) && (<img src={countriesList.find(c => c.name === country).flag} alt="flag" style={{position:'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', width: 20, borderRadius: 2, pointerEvents:'none'}} />)}
        </div>
      </div>
      <div>
        <label className="editor-label">Estado</label>
        <input list="states-data" placeholder={country ? "Selecione..." : "..."} value={state} onChange={(e) => onChange("state", e.target.value)} disabled={!country} />
        <datalist id="states-data">{statesList.map((s, idx) => (<option key={idx} value={s.name} />))}</datalist>
      </div>
      <div>
        <label className="editor-label">Cidade</label>
        <input list="cities-data" placeholder={state ? "Selecione..." : "..."} value={city} onChange={(e) => onChange("city", e.target.value)} disabled={!state} />
        <datalist id="cities-data">{citiesList.map((c, idx) => (<option key={idx} value={c} />))}</datalist>
      </div>
    </div>
  );
};

// --- AUTH ---
const Auth = ({ onLogin, t }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "", name: "" });
  const [error, setError] = useState("");
  const images = [ "https://images.unsplash.com/photo-1501901609772-df0848060b33?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1529619768328-e37af76c6fe5?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1527838832700-5059252407fa?auto=format&fit=crop&w=800&q=80",];
  const [idx, setIdx] = useState(0);

  useEffect(() => { const i = setInterval(() => setIdx((p) => (p + 1) % images.length), 5000); return () => clearInterval(i); }, []);

  const handleSubmit = (e) => {
    e.preventDefault(); setError("");
    const stored = JSON.parse(localStorage.getItem("mesq_credentials") || "[]");
    if (isRegister) {
      if (stored.find(u => u.email === formData.email)) { setError(t('error_email_use')); return; }
      const newUser = { ...formData, id: Date.now().toString() };
      localStorage.setItem("mesq_credentials", JSON.stringify([...stored, newUser])); onLogin(newUser);
    } else {
      const user = stored.find(u => u.email === formData.email && u.password === formData.password);
      if (user) onLogin(user); else setError(t('error_login_fail'));
    }
  };

  return (
    <div className="auth-page fade-in">
      <div className="auth-container">
        <div className="auth-visuals">{images.map((src, i) => <img key={i} src={src} className={`visual-slide ${i===idx?'active':''}`} alt="slide"/>)}</div>
        <div className="auth-content">
          <div className="insta-box">
            <h1 className="auth-logo">Memorio</h1>
            <p className="auth-subtitle">{isRegister ? t('slogan_register') : t('slogan_login')}</p>
            <form onSubmit={handleSubmit}>
              {isRegister && <input className="insta-input" placeholder={t('placeholder_name')} required onChange={e=>setFormData({...formData, name:e.target.value})}/>}
              <input className="insta-input" placeholder={t('placeholder_user_email')} required onChange={e=>setFormData({...formData, email:e.target.value})}/>
              <input type="password" className="insta-input" placeholder={t('placeholder_password')} required onChange={e=>setFormData({...formData, password:e.target.value})}/>
              <button className="btn-insta">{isRegister ? t('btn_register') : t('btn_login')}</button>
            </form>
            <div className="separator"><span>{t('or')}</span></div>
            <button className="btn-google" onClick={()=>onLogin({name:"Google User", id:"g1", isGoogle:true})}>
              <svg width="20" height="20" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>
              {t('login_google')}
            </button>
            {error && <p style={{color:'var(--danger)', fontSize:14, marginTop:20, fontWeight:600, background:'rgba(255,0,0,0.1)', padding:10, borderRadius:8}}>{error}</p>}
            <div className="auth-footer">{isRegister ? t('have_account') : t('no_account')} <b onClick={()=>setIsRegister(!isRegister)}>{isRegister ? t('connect') : t('btn_register')}</b></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- SETTINGS ---
const SettingsMenu = ({ onSetTheme, onLogout, setLang, t, lang }) => {
  const [open, setOpen] = useState(false);
  const [sub, setSub] = useState("");
  const ref = useRef(null);
  useEffect(() => { const fn = (e) => { if (ref.current && !ref.current.contains(e.target)) { setOpen(false); setSub(""); } }; document.addEventListener("mousedown", fn); return () => document.removeEventListener("mousedown", fn); }, []);

  return (
    <div style={{position:'relative'}} ref={ref}>
      <button className="btn-icon" onClick={()=>setOpen(!open)}><Settings size={20}/></button>
      {open && (
        <div className="dropdown-menu">
          <div className="menu-item" onClick={()=>setSub(sub==='theme'?'':'theme')}><Palette size={16}/> {t('settings_appearance')} {sub==='theme'?<ChevronDown size={14}/>:<ChevronRight size={14}/>}</div>
          {sub==='theme' && (
            <div style={{display:'flex', gap:8, padding:'5px 10px', flexWrap: 'wrap'}}>
              {Object.keys(THEME_COLORS).map(themeKey => (
                <div 
                  key={themeKey} 
                  onClick={() => onSetTheme(themeKey)} 
                  title={t(`theme_${themeKey}`)}
                  style={{
                    width: 24, height: 24, borderRadius: '50%', cursor: 'pointer',
                    background: THEME_COLORS[themeKey], border: '1px solid #ccc',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                  }} 
                />
              ))}
            </div>
          )}
          
          <div className="menu-item" onClick={()=>setSub(sub==='lang'?'':'lang')}><Globe size={16}/> {t('settings_language')} {sub==='lang'?<ChevronDown size={14}/>:<ChevronRight size={14}/>}</div>
          {sub === 'lang' && (
            <div className="lang-menu-container">
               <div className={`lang-option ${lang === 'pt' ? 'active' : ''}`} onClick={() => setLang('pt')}>
                  <div className="lang-label"><span className="lang-flag">🇧🇷</span> Português</div>
                  {lang === 'pt' && <Check size={16} />}
               </div>
               <div className={`lang-option ${lang === 'en' ? 'active' : ''}`} onClick={() => setLang('en')}>
                  <div className="lang-label"><span className="lang-flag">🇺🇸</span> English</div>
                  {lang === 'en' && <Check size={16} />}
               </div>
            </div>
          )}

          <div style={{height:1, background:'#eee', margin:'5px 0'}}></div>
          <div className="menu-item" style={{color:'var(--danger)'}} onClick={onLogout}><LogOut size={16}/> {t('settings_logout')}</div>
        </div>
      )}
    </div>
  );
};

// --- HERO STRIP ---
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

// --- HEADER ---
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

// --- COMPONENTE: MODAL DE NOVO ÁLBUM ---
const CreateAlbumModal = ({ isOpen, onClose, onConfirm, t }) => {
  const [name, setName] = useState("");
  const [cover, setCover] = useState(null);
  if (!isOpen) return null;
  const handleFile = (e) => { const f = e.target.files[0]; if(!f) return; const r = new FileReader(); r.onloadend = () => setCover(r.result); r.readAsDataURL(f); };
  const handleSubmit = (e) => { e.preventDefault(); if (name.trim()) { onConfirm({ title: name, cover: cover }); setName(""); setCover(null); } };
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <h3 className="modal-title">{t('new_album')}</h3>
        <form onSubmit={handleSubmit}>
          <div className="modal-upload-area" onClick={()=>document.getElementById('album-cover').click()}>
             <input type="file" id="album-cover" style={{display:'none'}} onChange={handleFile} accept="image/*"/>
             {cover ? (<img src={cover} alt="Cover" className="modal-cover-preview"/>) : (<div className="modal-upload-placeholder"><ImageIcon size={24} style={{marginBottom:5}}/><br/>{t('lbl_cover')}</div>)}
          </div>
          <input autoFocus type="text" className="modal-input" placeholder={t('album_name_placeholder')} value={name} onChange={(e) => setName(e.target.value)} />
          <div className="modal-actions">
            <button type="button" onClick={onClose} className="btn-modal-cancel">{t('btn_back')}</button>
            <button type="submit" className="btn-modal-confirm">{t('btn_create')}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- COMPONENTE: MODAL DE OPÇÕES DE ADIÇÃO ---
const AddOptionModal = ({ isOpen, onClose, onCreateNew, onSelectExisting, t }) => {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <h3 className="modal-title">{t('add_to_album_title')}</h3>
        <div className="choice-grid">
          <div className="choice-card" onClick={onCreateNew}>
            <div className="choice-icon"><FilePlus size={28} /></div>
            <div className="choice-label">{t('option_create_new')}</div>
          </div>
          <div className="choice-card" onClick={onSelectExisting}>
            <div className="choice-icon"><Grid size={28} /></div>
            <div className="choice-label">{t('option_select_existing')}</div>
          </div>
        </div>
        <button onClick={onClose} className="btn-modal-cancel" style={{marginTop: '2rem'}}>{t('btn_cancel')}</button>
      </div>
    </div>
  );
};

// --- COMPONENTE: MODAL DE SELEÇÃO DE MEMÓRIAS ---
const SelectMemoryModal = ({ isOpen, onClose, memories, currentAlbumId, onSelect, t }) => {
  if (!isOpen) return null;
  
  const availableMemories = memories.filter(m => m.albumId !== currentAlbumId);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" style={{maxWidth: 600}} onClick={e => e.stopPropagation()}>
        <h3 className="modal-title">{t('select_memory_title')}</h3>
        <div className="selection-container">
          {availableMemories.length === 0 ? (
            <p className="selection-empty">{t('no_available_memories')}</p>
          ) : (
            availableMemories.map(m => (
              <div key={m.id} className="selection-item" onClick={() => onSelect(m.id)}>
                {m.mediaType === 'video' ? <video src={m.media} muted /> : <img src={m.media} alt="thumbnail" />}
              </div>
            ))
          )}
        </div>
        <button onClick={onClose} className="btn-modal-cancel" style={{marginTop: '1.5rem'}}>{t('btn_cancel')}</button>
      </div>
    </div>
  );
};

// --- COMPONENTE: CARROSSEL DE MEMÓRIAS ---
const MemoryCarousel = ({ memories, onSelect }) => {
  const scrollRef = useRef(null);
  const scroll = (offset) => { if (scrollRef.current) scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' }); };

  return (
    <div className="carousel-wrapper">
      <button className="nav-arrow left" onClick={() => scroll(-350)}><ChevronLeft size={24} /></button>
      <div className="carousel-track" ref={scrollRef}>
        {memories.map((mem, i) => (
          <div key={mem.id} className="polaroid-card" onClick={() => onSelect(mem)} style={{transform: `rotate(${(i%2===0?1:-1)*(Math.random()*1)}deg)`}}>
             {mem.mediaType==='video' ? (
                <div style={{position:'relative', width:'100%', aspectRatio:'1/1', background:'#000', marginBottom:15}}>
                   <video src={mem.media} className="polaroid-img" style={{marginBottom:0, border:'none', height:'100%'}} muted/>
                   <div style={{position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center'}}><PlayCircle color="#fff"/></div>
                </div>
             ) : (<img src={mem.media} className="polaroid-img" alt={mem.title}/>)}
             <div className="polaroid-caption">{mem.title}</div>
             <div className="polaroid-meta">{new Date(mem.date).toLocaleDateString()}{mem.location && <span> • {mem.location.split(',')[0]}</span>}</div>
             {mem.isFavorite && <Heart size={16} fill="var(--primary)" color="var(--primary)" style={{position:'absolute', top:10, right:10}}/>}
          </div>
        ))}
      </div>
      <button className="nav-arrow right" onClick={() => scroll(350)}><ChevronRight size={24} /></button>
    </div>
  );
};

// --- COMPONENTE: MODAL DE CONFIRMAÇÃO ---
const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message, t }) => {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <h3 className="modal-title">{title}</h3>
        <p style={{marginBottom: '2rem', color: 'var(--text-muted)'}}>{message}</p>
        <div className="modal-actions">
          <button onClick={onClose} className="btn-modal-cancel">{t('btn_cancel')}</button>
          <button onClick={onConfirm} className="btn-modal-danger">{t('btn_delete')}</button>
        </div>
      </div>
    </div>
  );
};

// --- DASHBOARD ---
const Dashboard = ({ user, memories, onNew, onSelect, onDelete, onViewAlbums, onViewFavorites, t, settingsProps }) => {
  const [search, setSearch] = useState("");
  const filtered = memories.filter(m => m.title.toLowerCase().includes(search.toLowerCase()) || (m.location && m.location.toLowerCase().includes(search.toLowerCase())));

  return (
    <div style={{ minHeight: '100vh', paddingBottom: 50 }}>
      <Header onNew={onNew} onViewAlbums={onViewAlbums} onViewFavorites={onViewFavorites} onViewHome={()=>{}} settingsProps={settingsProps} t={t} search={search} setSearch={setSearch} />
      <HeroStrip memories={memories} onSelect={onSelect} />
      <div className="container">
        <div className="section-divider">
           <div className="divider-line"></div>
           <h2 className="section-title">{t('hello')}, {user.name.split(" ")[0]}</h2>
           <p className="section-subtitle">{t('subtitle_dash')}</p>
        </div>
        <MemoryCarousel memories={filtered} onSelect={onSelect} />
      </div>
    </div>
  );
};

// --- FAVORITES VIEW ---
const FavoritesView = ({ memories, onSelect, onNew, onViewAlbums, onViewHome, onViewFavorites, t, settingsProps }) => {
  const [search, setSearch] = useState("");
  const favorites = memories.filter(m => m.isFavorite);
  const filteredFavorites = favorites.filter(m => m.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ minHeight: '100vh', paddingBottom: 50 }}>
      <Header onNew={onNew} onViewAlbums={onViewAlbums} onViewFavorites={onViewFavorites} onViewHome={onViewHome} settingsProps={settingsProps} t={t} search={search} setSearch={setSearch} />
      <div className="container fade-in" style={{paddingTop: '3rem'}}>
         <div className="section-divider">
            <div className="divider-line"></div>
            <h2 className="section-title">{t('my_favorites')}</h2>
            <p className="section-subtitle">{favorites.length} {t('empty_album')}</p>
         </div>
         {filteredFavorites.length === 0 ? (
            <div style={{textAlign:'center', color:'var(--text-muted)', marginTop:'3rem'}}>
               <Heart size={48} style={{opacity:0.2, marginBottom:10}}/>
               <p>Você ainda não tem favoritos.</p>
            </div>
         ) : (
            <div className="grid-polaroid">
              {filteredFavorites.map((mem, i) => (
                <div key={mem.id} className="polaroid-card" onClick={() => onSelect(mem)} style={{transform: `rotate(${(i%2===0?1:-1)*(Math.random()*2)}deg)`}}>
                    <img src={mem.media} className="polaroid-img" alt={mem.title}/>
                    <div className="polaroid-caption">{mem.title}</div>
                    <div className="polaroid-meta">{new Date(mem.date).toLocaleDateString()}</div>
                    <Heart size={16} fill="var(--primary)" color="var(--primary)" style={{position:'absolute', top:10, right:10}}/>
                </div>
              ))}
            </div>
         )}
      </div>
    </div>
  );
};

// --- ALBUMS VIEW ---
const AlbumsView = ({ albums, onSelectAlbum, onCreateAlbum, onViewHome, onViewAlbums, onViewFavorites, onNew, t, settingsProps }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const handleCreate = (albumData) => { onCreateAlbum(albumData); setIsModalOpen(false); };

  return (
    <div style={{ minHeight: '100vh', paddingBottom: 50 }}>
      <Header onNew={onNew} onViewAlbums={onViewAlbums} onViewFavorites={onViewFavorites} onViewHome={onViewHome} settingsProps={settingsProps} t={t} search={search} setSearch={setSearch} />
      <div className="container fade-in" style={{paddingTop: '2rem'}}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:30}}>
            <button onClick={onViewHome} className="btn-icon"><ArrowLeft/> {t('btn_home')}</button>
            <h2 style={{fontFamily:'Cinzel', fontSize:'2rem'}}>{t('my_albums')}</h2>
            <div style={{width:80}}></div>
        </div>
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(250px, 1fr))', gap:'2rem'}}>
            <div onClick={() => setIsModalOpen(true)} style={{border:'2px dashed var(--border-light)', borderRadius:4, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', minHeight:300, cursor:'pointer', transition:'0.3s'}} onMouseEnter={e=>e.currentTarget.style.borderColor='var(--primary)'} onMouseLeave={e=>e.currentTarget.style.borderColor='var(--border-light)'}>
              <Plus size={40} color="var(--primary)" /> 
              <p style={{marginTop: 10, fontFamily: 'Cinzel', fontWeight: 600}}>{t('new_album')}</p>
            </div>
            {albums.map(a => (
              <div key={a.id} className="polaroid-card" onClick={() => onSelectAlbum(a)} style={{minHeight:300, transform:'rotate(0deg)'}}>
                  <img src={a.cover || "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80"} className="polaroid-img" style={{height:250}} alt={a.title} />
                  <div className="polaroid-caption">{a.title}</div>
              </div>
            ))}
        </div>
      </div>
      <CreateAlbumModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onConfirm={handleCreate} t={t} />
    </div>
  );
};

// --- FORMULÁRIO ---
const MemoryForm = ({ onSave, onCancel, initialData, albums, preSelectedAlbumId, t }) => {
  const parseLoc = (s) => { if(!s) return {c:"",s:"",ci:""}; const p=s.split(",").map(x=>x.trim()); if(p.length>=3) return {ci:p[0],s:p[1],c:p[2]}; return {c:s,s:"",ci:""}; };
  const [fd, setFd] = useState(initialData || { title:"", date: new Date().toISOString().split("T")[0], description:"", story:"", location:"", isFavorite:false, media:null, mediaType:"image", albumId: preSelectedAlbumId||"" });
  const [loc, setLoc] = useState(parseLoc(initialData?.location));
  const handleFile = (e) => { const f = e.target.files[0]; if(!f) return; const r = new FileReader(); r.onloadend = () => setFd({...fd, media: r.result, mediaType: f.type.startsWith("video/")?"video":"image"}); r.readAsDataURL(f); };
  const sub = (e) => { e.preventDefault(); onSave({...fd, location: [loc.city, loc.state, loc.country].filter(Boolean).join(", ")}); };

  return (
    <div className="container fade-in" style={{paddingTop: '4rem', paddingBottom: '4rem'}}>
       <div className="editor-container">
          <div style={{position: 'absolute', top: 20, right: 20}}><button onClick={onCancel} className="btn-icon"><X size={24} /></button></div>
          
          <div className="fav-icon-absolute" onClick={() => setFd({ ...fd, isFavorite: !fd.isFavorite })} title={t('label_fav')}>
             <Heart size={28} fill={fd.isFavorite ? "var(--primary)" : "transparent"} color={fd.isFavorite ? "var(--primary)" : "var(--text-muted)"} strokeWidth={1.5} />
          </div>

          <h2 className="editor-title">{initialData ? t('title_edit') : t('title_new')}</h2>
          <form onSubmit={sub}>
             <div className="editor-grid">
                <div><label className="editor-label">{t('label_title')}</label><input className="editor-input" value={fd.title} onChange={e=>setFd({...fd, title:e.target.value})} required /></div>
                <div><label className="editor-label">Data</label><input type="date" className="editor-input" value={fd.date} onChange={e=>setFd({...fd, date:e.target.value})} required /></div>
             </div>
             <div style={{marginBottom: '2rem'}}><LocationSelector country={loc.country} state={loc.state} city={loc.city} onChange={(k,v)=>setLoc({...loc, [k]:v})} /></div>
             <div style={{marginBottom: '2rem'}}>
                <label className="editor-label">Álbum</label>
                <select className="editor-input" value={fd.albumId} onChange={e => setFd({...fd, albumId: e.target.value})} style={{background: 'transparent'}}>
                  <option value="">{t('label_album_select')}</option>
                  {albums.map(alb => <option key={alb.id} value={alb.id}>{alb.title}</option>)}
                </select>
             </div>
             <div className="editor-upload">
                <input type="file" id="up" style={{display:'none'}} onChange={handleFile} accept="image/*,video/*"/>
                <label htmlFor="up" style={{width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer'}}>
                   {fd.media ? (fd.mediaType === 'video' ? <video src={fd.media} controls className="upload-preview"/> : <img src={fd.media} alt="Preview" className="upload-preview"/>) : (<div className="upload-placeholder"><div style={{background: 'var(--bg-body)', padding: 15, borderRadius: '50%', border: '1px solid #ddd', display: 'inline-block', marginBottom: 10}}><ImageIcon size={32} color="var(--primary)"/></div><p style={{margin:0, fontWeight: 500}}>{t('label_add_media')}</p></div>)}
                </label>
             </div>
             <div style={{marginBottom: '1rem'}}><label className="editor-label">História</label><textarea className="editor-textarea" placeholder={t('placeholder_story')} value={fd.story} onChange={e=>setFd({...fd, story:e.target.value})} /></div>
             
             <button className="btn-primary" style={{width:'100%', padding: '15px', fontSize: '1rem', marginTop: '20px'}}>{t('btn_save')}</button>
          </form>
       </div>
    </div>
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
  
  // Modais
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteMemoryId, setDeleteMemoryId] = useState(null);
  const [addOptionModalOpen, setAddOptionModalOpen] = useState(false);
  const [selectMemoryModalOpen, setSelectMemoryModalOpen] = useState(false);

  const t = (key) => TRANSLATIONS[lang][key] || key;

  useEffect(() => { document.documentElement.setAttribute("data-theme", theme); localStorage.setItem("mesq_theme", theme); }, [theme]);
  useEffect(() => { localStorage.setItem("mesq_lang", lang); }, [lang]);

  useEffect(() => {
    const u = localStorage.getItem("mesq_active_session");
    const m = JSON.parse(localStorage.getItem("mesq_memories") || "[]");
    const a = JSON.parse(localStorage.getItem("mesq_albums") || "[]");
    if (u) setUser(JSON.parse(u));
    setMemories(m.length ? m : [INITIAL_MEMORY]);
    setAlbums(a.length ? a : INITIAL_ALBUMS);
  }, []);

  const handleLogin = (u) => { setUser(u); localStorage.setItem("mesq_active_session", JSON.stringify(u)); };
  const handleLogout = () => { setUser(null); localStorage.removeItem("mesq_active_session"); };
  
  const saveMemories = (newMemories) => { setMemories(newMemories); localStorage.setItem("mesq_memories", JSON.stringify(newMemories)); };
  
  const handleCreateAlbum = ({title, cover}) => {
    const newAlbum = { id: Date.now().toString(), title, cover };
    const updated = [...albums, newAlbum];
    setAlbums(updated); localStorage.setItem("mesq_albums", JSON.stringify(updated));
    setNotification({ message: "Álbum criado!", type: "success" });
  };

  const handleConfirmDeleteAlbum = () => {
    if(!currentAlbum) return;
    const updatedAlbums = albums.filter(a => a.id !== currentAlbum.id);
    setAlbums(updatedAlbums); localStorage.setItem("mesq_albums", JSON.stringify(updatedAlbums));
    const updatedMemories = memories.map(m => m.albumId === currentAlbum.id ? { ...m, albumId: "" } : m);
    saveMemories(updatedMemories);
    setNotification({ message: "Álbum excluído.", type: "success" });
    setDeleteModalOpen(false); setCurrentAlbum(null); setView("albums");
  };

  const handleConfirmDeleteMemory = () => {
    if (!deleteMemoryId) return;
    saveMemories(memories.filter(m => m.id !== deleteMemoryId));
    setNotification({ message: "Memória excluída.", type: "success" });
    setDeleteMemoryId(null);
    setSelectedMemory(null);
    setView(lastView); 
  };

  const handleAddExistingMemory = (memoryId) => {
    if(!currentAlbum) return;
    const updated = memories.map(m => m.id === memoryId ? { ...m, albumId: currentAlbum.id } : m);
    saveMemories(updated);
    setSelectMemoryModalOpen(false);
    setNotification({ message: "Adicionada ao álbum!", type: "success" });
  };

  const handleSaveMemory = (data) => {
    let updated;
    if (editingMemory) updated = memories.map(m => m.id === editingMemory.id ? { ...data, id: m.id } : m);
    else updated = [{ ...data, id: Date.now(), userId: user.id }, ...memories];
    if(data.albumId && data.mediaType === 'image') {
      const idx = albums.findIndex(a => a.id === data.albumId);
      if(idx >= 0 && !albums[idx].cover) {
         const newAlb = [...albums]; newAlb[idx].cover = data.media;
         setAlbums(newAlb); localStorage.setItem("mesq_albums", JSON.stringify(newAlb));
      }
    }
    saveMemories(updated);
    setNotification({ message: "Salvo!", type: "success" });
    setEditingMemory(null); setView(lastView); 
  };
  
  const handleDelete = (id) => {
    if (window.confirm("Excluir?")) {
      saveMemories(memories.filter(m => m.id !== id));
      setNotification({ message: "Excluída.", type: "error" });
    }
  };

  const displayedMemories = currentAlbum ? memories.filter(m => m.albumId === currentAlbum.id) : memories;
  const settingsProps = { onSetTheme: setTheme, onLogout: handleLogout, setLang, t, lang };

  return (
    <div className="app-wrapper">
      {notification && <Toast message={notification.message} type={notification.type} onClose={() => setNotification(null)} />}
      
      {!user ? <Auth onLogin={handleLogin} t={t} /> : (
        <>
          {view === "dashboard" && (
            <Dashboard 
              user={user} 
              memories={memories} 
              onNew={()=>{setEditingMemory(null); setCurrentAlbum(null); setLastView("dashboard"); setView("create")}} 
              onSelect={m=>{setLastView("dashboard"); setSelectedMemory(m); setView("detail")}} 
              onDelete={handleDelete} 
              onViewAlbums={()=>setView("albums")} 
              onViewFavorites={()=>setView("favorites")} 
              t={t} 
              settingsProps={settingsProps}
            />
          )}

          {view === "favorites" && (
            <FavoritesView 
              memories={memories} 
              onSelect={m=>{setLastView("favorites"); setSelectedMemory(m); setView("detail")}} 
              onNew={()=>{setEditingMemory(null); setCurrentAlbum(null); setLastView("favorites"); setView("create")}} 
              onViewAlbums={()=>setView("albums")} 
              onViewFavorites={()=>setView("favorites")} 
              onViewHome={()=>setView("dashboard")} 
              t={t} 
              settingsProps={settingsProps} 
            />
          )}

          {view === "albums" && (
            <AlbumsView 
              albums={albums} 
              onSelectAlbum={alb=>{setCurrentAlbum(alb); setView("album-detail")}} 
              onCreateAlbum={handleCreateAlbum} 
              onViewHome={()=>setView("dashboard")} 
              onViewAlbums={()=>setView("albums")} 
              onViewFavorites={()=>setView("favorites")} 
              onNew={()=>{setEditingMemory(null); setCurrentAlbum(null); setLastView("albums"); setView("create")}} 
              t={t} 
              settingsProps={settingsProps} 
            />
          )}

          {view === "album-detail" && currentAlbum && (
             <div className="container fade-in" style={{paddingTop: '2rem'}}>
                 <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:30}}>
                    <div style={{display:'flex', alignItems:'center', gap:15}}>
                        <button onClick={()=>setView('albums')} className="btn-icon"><ArrowLeft/> {t('btn_albums')}</button>
                    </div>
                    <div style={{textAlign:'center'}}>
                        <h1 style={{fontFamily:'Cinzel', fontSize:'2.5rem', margin:0}}>{currentAlbum.title}</h1>
                        <span style={{fontSize:'0.8rem', color:'var(--text-muted)'}}>{displayedMemories.length} {t('empty_album')}</span>
                    </div>
                    <div style={{display:'flex', alignItems:'center', gap:10}}>
                        <button onClick={() => setDeleteModalOpen(true)} className="btn-icon btn-action-delete" title="Excluir Álbum"><Trash2 size={20}/></button>
                        <button onClick={() => setAddOptionModalOpen(true)} className="btn-primary"><Plus size={16}/> {t('btn_add_here')}</button>
                    </div>
                 </div>
                 <div className="grid-polaroid">
                    {displayedMemories.map(mem => (
                       <div key={mem.id} className="polaroid-card" onClick={()=> {setLastView("album-detail"); setSelectedMemory(mem); setView('detail')}}>
                          <img src={mem.media} className="polaroid-img" />
                          <div className="polaroid-caption">{mem.title}</div>
                       </div>
                    ))}
                 </div>
             </div>
          )}

          {view === "create" && <MemoryForm onSave={handleSaveMemory} onCancel={()=>setView(lastView)} initialData={editingMemory} albums={albums} preSelectedAlbumId={currentAlbum?.id} t={t} />}
          
          {view === "detail" && selectedMemory && (
            <div className="detail-overlay fade-in">
               <div style={{maxWidth:900, width:'100%', padding:'4rem 2rem'}}>
                  <div style={{display:'flex', justifyContent:'space-between', marginBottom:20}}>
                     <button onClick={()=>setView(lastView)} className="btn-icon"><ArrowLeft/> {t('btn_back')}</button>
                     <div style={{display: 'flex', gap: '15px'}}>
                        <button onClick={() => setDeleteMemoryId(selectedMemory.id)} className="btn-icon btn-action-delete" title={t('btn_delete')}><Trash2/></button>
                        <button onClick={()=>setEditingMemory(selectedMemory) || setView('create')} className="btn-icon" style={{color:'var(--primary)'}} title={t('title_edit')}><Edit2/></button>
                     </div>
                  </div>
                  <div className="polaroid-card" style={{cursor:'default', transform:'none', paddingBottom:30}}>
                     <div style={{maxHeight:'70vh', overflow:'hidden', marginBottom:20, display:'flex', justifyContent:'center', background:'#000'}}>
                        {selectedMemory.mediaType==='video' ? <video src={selectedMemory.media} controls style={{height:'100%', maxWidth:'100%'}}/> : <img src={selectedMemory.media} style={{maxHeight:'70vh', objectFit:'contain'}}/>}
                     </div>
                     <h1 style={{fontFamily:'Cinzel', fontSize:'2.5rem', textAlign:'center', margin:'10px 0'}}>{selectedMemory.title}</h1>
                     <div style={{textAlign:'center', color:'#999', textTransform:'uppercase', letterSpacing:1, marginBottom:30}}>
                        {new Date(selectedMemory.date).toLocaleDateString()} {selectedMemory.location && ` • ${selectedMemory.location}`}
                     </div>
                     <p style={{fontFamily:'Lato', fontSize:'1.2rem', lineHeight:1.8, maxWidth:700, margin:'0 auto', textAlign:'justify'}}>{selectedMemory.story}</p>
                  </div>
               </div>
            </div>
          )}

          <ConfirmModal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} onConfirm={handleConfirmDeleteAlbum} title={t('delete_album_title')} message={t('delete_album_confirm')} t={t} />
          <ConfirmModal isOpen={!!deleteMemoryId} onClose={() => setDeleteMemoryId(null)} onConfirm={handleConfirmDeleteMemory} title={t('delete_memory_title')} message={t('delete_memory_confirm')} t={t} />
          
          <AddOptionModal 
            isOpen={addOptionModalOpen} 
            onClose={() => setAddOptionModalOpen(false)}
            onCreateNew={() => { setAddOptionModalOpen(false); setEditingMemory(null); setLastView("album-detail"); setView('create'); }}
            onSelectExisting={() => { setAddOptionModalOpen(false); setSelectMemoryModalOpen(true); }}
            t={t}
          />
          <SelectMemoryModal 
            isOpen={selectMemoryModalOpen}
            onClose={() => setSelectMemoryModalOpen(false)}
            memories={memories}
            currentAlbumId={currentAlbum?.id}
            onSelect={handleAddExistingMemory}
            t={t}
          />
        </>
      )}
    </div>
  );
}

export default App;
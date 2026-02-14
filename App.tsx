import React, { useState, useEffect, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';
import { PLATFORM_LINKS, SUBSCRIPTIONS, SERVICES_DATA, GIFTS_DATA } from './constants';

// --- CONFIGURAÇÃO SUPABASE ---
const SUPABASE_URL = 'https://ddelqyjqnomzxmphgkxu.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRkZWxxeWpxbm9tenhtcGhna3h1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA2MDQ1ODQsImV4cCI6MjA4NjE4MDU4NH0.FIbQVVsP0M26IKmKsllkV7pRiUnR8_QYNdyAP_c4Q4Q';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

interface MediaItem {
  url: string;
  type: 'image' | 'video';
}

const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);

const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

const SettingsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2 2 2 0 0 1-2 2 2 2 0 0 0-2 2 2 2 0 0 1-2 2 2 2 0 0 0 0 4 2 2 0 0 1 2 2 2 2 0 0 0 2 2 2 2 0 0 1 2 2 2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2 2 2 0 0 1 2-2 2 2 0 0 0 2-2 2 2 0 0 1 2-2 2 2 0 0 0 0-4 2 2 0 0 1-2-2 2 2 0 0 0-2-2 2 2 0 0 1-2-2 2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>
  </svg>
);

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
);

const DragHandleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-300 cursor-grab active:cursor-grabbing"><circle cx="9" cy="12" r="1"/><circle cx="9" cy="5" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="19" r="1"/></svg>
);

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);

const InfoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
);

const GiftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 12 20 22 4 22 4 12"></polyline><rect x="2" y="7" width="20" height="5"></rect><line x1="12" y1="22" x2="12" y2="7"></line><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path></svg>
);

const LockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
);

const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
);

const EyeOffIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
);

const LogoutIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
);

const App: React.FC = () => {
  const [siteTitle, setSiteTitle] = useState('Lysamami');
  const [heroSlogan, setHeroSlogan] = useState('Bem Vindo');
  const [heroSubSlogan, setHeroSubSlogan] = useState('ao meu universo.');
  const [heroDescription, setHeroDescription] = useState('Vem conhecer a peituda mais gostosa...');
  const [about, setAbout] = useState({ bio_text: '', bio_age: '' });
  const [links, setLinks] = useState<any[]>([]);
  const [subs, setSubs] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [mimos, setMimos] = useState<any[]>([]);
  const [avatarUrl, setAvatarUrl] = useState('');
  const [heroMedia, setHeroMedia] = useState<MediaItem[]>([]);
  
  const [activeTab, setActiveTab] = useState<'home' | 'links' | 'subs' | 'services' | 'mimos' | 'about' | 'admin'>('home');
  const [adminTab, setAdminTab] = useState<'settings' | 'links' | 'subs' | 'services' | 'mimos' | 'about'>('settings');
  const [isDarkMode, setIsDarkMode] = useState(false); // Default to Light Mode
  const [isLoading, setIsLoading] = useState(false);

  // Estados para seleção do cliente
  const [selectedServiceOptions, setSelectedServiceOptions] = useState<Record<string, any>>({});
  const [selectedGift, setSelectedGift] = useState<any | null>(null);

  // Estados para Auth Admin
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [rlsIssueDetected, setRlsIssueDetected] = useState(false);

  // Estados para edição admin
  const [editingId, setEditingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [tempEditData, setTempEditData] = useState<any>({});
  
  // Drag and Drop State
  const [draggedItemIndex, setDraggedItemIndex] = useState<number | null>(null);

  const fetchAllData = async (silent = false) => {
    if (!silent) setIsLoading(true);
    try {
      const { data: st } = await supabase.from('site_settings').select('*').single();
      if (st) {
        setSiteTitle(st.site_title || 'Lysamami');
        setHeroSlogan(st.hero_slogan || 'Bem Vindo');
        setHeroSubSlogan(st.hero_sub_slogan || 'ao meu universo.');
        setHeroDescription(st.hero_description || '');
      }
      
      // Fetch Links Data - with error logging and fallback
      const { data: lk, error: lkError } = await supabase.from('links_data').select('*').order('order_index', { ascending: true });
      if (lkError) console.error("Error fetching links:", lkError);
      setLinks((lk && lk.length > 0) ? lk : PLATFORM_LINKS);

      const { data: sb } = await supabase.from('subscriptions_data').select('*').order('order_index', { ascending: true });
      setSubs((sb && sb.length > 0) ? sb : SUBSCRIPTIONS);

      const { data: sv } = await supabase.from('services_data').select('*').order('order_index', { ascending: true });
      setServices((sv && sv.length > 0) ? sv : SERVICES_DATA);

      const { data: mm } = await supabase.from('mimos_data').select('*').order('order_index', { ascending: true });
      setMimos((mm && mm.length > 0) ? mm : GIFTS_DATA);

      const { data: ab } = await supabase.from('about_data').select('*').single();
      if (ab) setAbout({ bio_text: ab.bio_text, bio_age: ab.bio_age });

      const ts = new Date().getTime();
      const { data: avatarData } = supabase.storage.from('site-assets').getPublicUrl('avatar.png');
      setAvatarUrl(`${avatarData.publicUrl}?t=${ts}`);
      setHeroMedia([
        { url: supabase.storage.from('site-assets').getPublicUrl('hero1.png').data.publicUrl + `?t=${ts}`, type: 'image' },
        { url: supabase.storage.from('site-assets').getPublicUrl('hero2.png').data.publicUrl + `?t=${ts}`, type: 'image' },
        { url: supabase.storage.from('site-assets').getPublicUrl('hero3.mp4').data.publicUrl + `?t=${ts}`, type: 'video' },
      ]);
    } catch (err) { console.warn("Erro ao buscar dados", err); }
    finally { if (!silent) setIsLoading(false); }
  };

  useEffect(() => { fetchAllData(); }, []);
  
  useEffect(() => { 
      document.documentElement.classList.toggle('dark', isDarkMode); 
  }, [isDarkMode]);

  // Verificar persistência de login via Supabase Auth
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
        setIsAuthenticated(!!session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Helper para abrir links externos de forma segura e absoluta
  const openLink = (url: string) => {
    if (!url || url.trim() === '' || url === '#') return;
    
    let finalUrl = url.trim();
    // Verifica se começa com http:// ou https://, se não, adiciona https://
    if (!/^https?:\/\//i.test(finalUrl)) {
        finalUrl = 'https://' + finalUrl;
    }
    
    window.open(finalUrl, '_blank', 'noopener,noreferrer');
  };

  // Helper de Erro do Banco de Dados
  const handleDatabaseError = (error: any, action: string) => {
      console.error(`Error during ${action}:`, error);
      // Código 42501 é Permission Denied (RLS)
      if (error.code === '42501' || error.message?.includes('row-level security')) {
          alert(`🔒 Bloqueio de Segurança Supabase\n\nA operação '${action}' foi bloqueada.\nVocê ativou permissão de INSERT, mas faltam as permissões de 'UPDATE' (Editar) e 'DELETE' (Excluir) para usuários autenticados.\n\nVá no Supabase > Authentication > Policies e adicione regras de UPDATE e DELETE.`);
      } else {
          alert(`Erro ao ${action}: ${error.message}`);
      }
  };

  // Função Login Admin usando Supabase Auth
  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError(false);
    
    try {
        const { error } = await supabase.auth.signInWithPassword({
            email: emailInput,
            password: passwordInput
        });

        if (error) {
            console.error("Login Error:", error.message);
            setLoginError(true);
        } else {
            console.log("Login realizado com sucesso!");
            setEmailInput('');
            setPasswordInput('');
        }
    } catch (err) {
        console.error("Unexpected Error:", err);
        alert("Erro inesperado ao tentar logar.");
    } finally {
        setIsLoading(false);
    }
  };

  const handleLogout = async () => {
      await supabase.auth.signOut();
      setAdminTab('settings');
  };

  // Funções Administrativas
  const handleStartEdit = (item: any) => {
    setEditingId(item.id);
    let editData = { ...item };

    // Tratamento especial para Subs (Array -> String)
    if (adminTab === 'subs' && Array.isArray(item.benefits)) {
        editData.benefits = item.benefits.join('\n');
    }
    
    // Tratamento especial para Services (JSON Array Direct Load)
    if (adminTab === 'services') {
        // Garantir que options é um array, senão inicializa vazio
        editData.options = Array.isArray(item.options) ? item.options : [];
    }

    setTempEditData(editData);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setConfirmDeleteId(null);
    setTempEditData({});
  };

  // Helper para adicionar opção na lista
  const handleAddOption = () => {
    setTempEditData((prev: any) => ({
        ...prev,
        options: [...(prev.options || []), { title: '', price: '' }]
    }));
  };

  // Helper para remover opção da lista
  const handleRemoveOption = (index: number) => {
    setTempEditData((prev: any) => ({
        ...prev,
        options: (prev.options || []).filter((_: any, i: number) => i !== index)
    }));
  };

  // Helper para atualizar opção específica
  const handleUpdateOption = (index: number, field: 'title' | 'price', value: string) => {
    setTempEditData((prev: any) => {
        const newOptions = [...(prev.options || [])];
        newOptions[index] = { ...newOptions[index], [field]: value };
        return { ...prev, options: newOptions };
    });
  };


  const handleSaveEdit = async (table: string) => {
    if (!editingId) return;
    setIsLoading(true);
    
    const dataToSave = { ...tempEditData };
    
    // Processamento Subs (String -> Array)
    if (table === 'subscriptions_data' && typeof dataToSave.benefits === 'string') {
        dataToSave.benefits = dataToSave.benefits.split('\n').filter((b: string) => b.trim() !== '');
    }

    // Processamento Services (Limpeza de Options se não for type options)
    if (table === 'services_data') {
        if (dataToSave.price_type === 'options') {
             // Garante que salve o array limpo
             dataToSave.options = (dataToSave.options || []).filter((opt: any) => opt.title && opt.title.trim() !== '');
             dataToSave.price = null;
        } else {
            dataToSave.options = []; // Zera as opções se for fixo
        }
    }
    
    // Processamento Mimos (Garantir que usa image_url)
    if (table === 'mimos_data') {
        if (dataToSave.image && !dataToSave.image_url) {
            dataToSave.image_url = dataToSave.image;
        }
        delete dataToSave.image;
    }

    delete dataToSave.created_at;
    delete dataToSave.id;

    const { error } = await supabase.from(table).update(dataToSave).eq('id', editingId);
    
    if (error) {
      handleDatabaseError(error, 'salvar alterações');
    } else {
      setEditingId(null);
      await fetchAllData(true);
    }
    setIsLoading(false);
  };

  const handleCreate = async (table: string, data: any) => {
    setIsLoading(true);
    const { error } = await supabase.from(table).insert([data]);
    if (error) {
        handleDatabaseError(error, 'criar novo item');
    } else {
        await fetchAllData(true);
    }
    setIsLoading(false);
  };

  const handleDelete = async (table: string, id: any) => {
    if (!id) return;
    if (confirmDeleteId !== id) {
      setConfirmDeleteId(id);
      return;
    }
    setIsLoading(true);
    const { error } = await supabase.from(table).delete().eq('id', id);
    
    if (error) {
        handleDatabaseError(error, 'excluir item');
    } else {
        setConfirmDeleteId(null);
        await fetchAllData(true);
    }
    setIsLoading(false);
  };

  // --- DRAG AND DROP LOGIC ---

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedItemIndex(index);
    // Needed for Firefox to allow drag
    e.dataTransfer.effectAllowed = "move";
    // Transparent ghost image if desired, or let browser handle it
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault(); // Necessary to allow dropping
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = async (e: React.DragEvent, dropIndex: number, list: any[], setList: Function, tableName: string) => {
    e.preventDefault();
    if (draggedItemIndex === null || draggedItemIndex === dropIndex) return;

    // 1. Reorder locally (Optimistic UI)
    const newItems = [...list];
    const [draggedItem] = newItems.splice(draggedItemIndex, 1);
    newItems.splice(dropIndex, 0, draggedItem);
    
    // Update state immediately
    setList(newItems);
    setDraggedItemIndex(null);

    // 2. Update Database silently
    // We update all items with their new index to ensure consistency
    const updates = newItems.map((item, index) => ({
        id: item.id,
        order_index: index
    }));

    try {
        await Promise.all(updates.map(u => 
            supabase.from(tableName).update({ order_index: u.order_index }).eq('id', u.id)
        ));
    } catch (err) {
        console.error("Failed to reorder in DB", err);
        // Silent fail mostly, or alert if needed, but reorder is tricky with RLS errors
    }
  };

  const saveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.target as HTMLFormElement);
    const updates = Object.fromEntries(formData);
    
    const { error } = await supabase.from('site_settings').upsert({ id: 1, ...updates });
    
    if (error) {
        handleDatabaseError(error, 'salvar configurações da Home');
    } else {
        await fetchAllData(true);
        alert("Configurações salvas!");
    }
    setIsLoading(false);
  };

  const saveAboutMe = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.target as HTMLFormElement);
    const updates = Object.fromEntries(formData);
    
    const { error } = await supabase.from('about_data').upsert({ id: 1, ...updates });
    
    if (error) {
        handleDatabaseError(error, 'salvar perfil');
    } else {
        await fetchAllData(true);
        alert("Sobre mim atualizado!");
    }
    setIsLoading(false);
  };

  const navItems = [
    { id: 'home', label: 'Início' },
    { id: 'links', label: 'Links' },
    { id: 'subs', label: 'Assinaturas' },
    { id: 'services', label: 'Serviços' },
    { id: 'mimos', label: 'Mimos' },
    { id: 'about', label: 'Sobre' },
  ] as const;

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-[var(--bg-color)]">
      {/* HEADER: MINIMAL & SOFT */}
      <header className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] lg:w-max flex justify-between items-center px-8 py-3 glass-effect rounded-full z-[100] transition-all duration-500 shadow-lg shadow-pink-500/5">
        <div className="flex items-center gap-4 cursor-pointer" onClick={() => setActiveTab('home')}>
          <img src={avatarUrl} className="w-8 h-8 rounded-full border border-pink-200 object-cover" alt="Logo" />
          <span className="font-cute font-bold text-soft-hot dark:text-pink-300 text-lg tracking-tight">{siteTitle}</span>
        </div>
        
        <nav className="hidden xl:flex items-center gap-1 mx-12">
          {navItems.map((item) => (
            <button key={item.id} onClick={() => { setActiveTab(item.id); handleCancelEdit(); }} className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${activeTab === item.id ? 'bg-soft-pink/20 text-soft-hot' : 'text-gray-400 hover:text-soft-hot'}`}>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2.5 rounded-full hover:bg-pink-50 dark:hover:bg-slate-800 text-soft-hot transition-colors">
            {isDarkMode ? <SunIcon /> : <MoonIcon />}
          </button>
          <button onClick={() => { setActiveTab('admin'); handleCancelEdit(); }} className={`p-2.5 rounded-full transition-all ${activeTab === 'admin' ? 'bg-soft-hot text-white' : 'text-soft-hot hover:bg-pink-50 dark:hover:bg-slate-800'}`}>
            <SettingsIcon />
          </button>
        </div>
      </header>

      {/* MAIN CONTENT: FULL WIDTH MINIMALISM */}
      <main className="flex-1 overflow-y-auto custom-scrollbar relative">
        {isLoading && (
          <div className="fixed inset-0 bg-white/40 dark:bg-black/40 backdrop-blur-sm z-[1000] flex items-center justify-center">
             <div className="w-10 h-10 border-2 border-soft-hot border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        
        <div className="w-full flex flex-col items-center">
          {activeTab === 'home' && (
            <div className="w-full space-y-0 animate-in fade-in duration-1000">
              
              {/* HERO SECTION */}
              <section className="w-full min-h-screen banner-gradient flex flex-col lg:flex-row items-center justify-center px-8 lg:px-32 py-40 gap-16 relative overflow-hidden">
                <div className="lg:w-1/2 text-center lg:text-left space-y-8 z-10">
                  <div className="inline-block bg-pink-50 dark:bg-pink-900/20 text-soft-hot px-5 py-2 rounded-full font-cute font-bold text-[10px] uppercase tracking-widest border border-pink-100 dark:border-pink-500/10">
                    🎀 Conteúdo Premium & Exclusivo
                  </div>
                  <h2 className="text-6xl lg:text-[86px] font-cute font-bold text-gray-800 dark:text-white leading-[1.1] tracking-tight">
                    {heroSlogan} <br/>
                    <span className="text-soft-hot dark:text-pink-300 italic opacity-80">{heroSubSlogan}</span>
                  </h2>
                  <p className="text-gray-400 dark:text-gray-500 text-xl max-w-xl mx-auto lg:mx-0 font-light leading-relaxed">
                    {heroDescription} <br/>
                    <span className="text-soft-hot/60 font-medium italic mt-4 block">"Seu refúgio secreto para momentos inesquecíveis."</span>
                  </p>
                  <div className="flex flex-wrap justify-center lg:justify-start gap-5 pt-4">
                    <button onClick={() => setActiveTab('subs')} className="btn-kawaii px-10 py-5 rounded-full text-sm uppercase tracking-wider shadow-sm">Ver Assinaturas</button>
                    <button onClick={() => setActiveTab('links')} className="px-10 py-5 rounded-full text-sm font-cute font-bold border border-pink-100 dark:border-pink-500/20 text-soft-hot hover:bg-white transition-all">Redes Sociais</button>
                  </div>
                </div>
                <div className="flex gap-4 lg:w-1/2 justify-center lg:justify-end items-center z-10">
                  {heroMedia.map((media, i) => (
                    <div key={i} className={`w-1/3 aspect-[3/4.5] rounded-[3rem] overflow-hidden border-4 border-white dark:border-slate-800 shadow-lg transition-all duration-1000 ${i === 1 ? 'translate-y-12' : '-translate-y-4'}`}>
                      {media.type === 'video' ? <video src={media.url} autoPlay loop muted playsInline className="w-full h-full object-cover" /> : <img src={media.url} className="w-full h-full object-cover" />}
                    </div>
                  ))}
                </div>
              </section>

              {/* MINIMAL MARQUEE */}
              <div className="w-full bg-white dark:bg-black/20 py-10 text-center overflow-hidden border-y border-pink-50 dark:border-pink-500/5">
                 <div className="flex gap-16 animate-[marquee_30s_linear_infinite] whitespace-nowrap">
                    {[1,2,3].map(i => (
                      <span key={i} className="text-2xl font-cute font-medium text-pink-200 dark:text-pink-900 uppercase tracking-[0.4em] italic">
                        O seu momento é agora • Acesso Imediato • 100% Real • Sem Censura • 
                      </span>
                    ))}
                 </div>
              </div>

              {/* PERSONALIZED CONNECTION SECTION */}
              <section className="w-full bg-[#fffcfd] dark:bg-transparent py-32 px-8 lg:px-32 flex flex-col items-center text-center space-y-12">
                 <div className="space-y-6 max-w-4xl">
                    <h3 className="text-xs font-bold text-soft-hot uppercase tracking-[0.5em]">Desejos Reais</h3>
                    <h4 className="text-4xl md:text-5xl font-cute font-bold text-gray-800 dark:text-white leading-tight">Quer me ter só para você?</h4>
                    <p className="text-gray-400 text-lg font-light max-w-2xl mx-auto leading-relaxed">Transformo seu desejo em realidade com chamadas privadas, sexting intenso e vídeos exclusivos onde registro seu nome na minha pele. Vamos brincar?</p>
                 </div>
                 <button onClick={() => setActiveTab('services')} className="bg-soft-hot text-white px-12 py-5 rounded-full font-cute font-bold text-lg shadow-xl shadow-pink-500/20 hover:scale-105 transition-all">Ver Menu VIP</button>
              </section>

              {/* FINAL CTA - SALES PAGE STYLE */}
              <section className="w-full bg-white dark:bg-transparent py-24 px-8 lg:px-32">
                 <div className="w-full bg-gradient-to-b from-pink-50 to-white dark:from-slate-900 dark:to-black rounded-[4rem] p-12 md:p-20 border border-pink-100 dark:border-pink-900/20 shadow-xl shadow-pink-500/5 flex flex-col items-center text-center space-y-12 overflow-hidden relative">
                    
                    {/* Background Decorative Elements */}
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-soft-hot to-transparent opacity-50"></div>
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-soft-pink/20 rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-soft-hot/10 rounded-full blur-3xl"></div>

                    <div className="relative z-10 space-y-4">
                        <span className="inline-flex items-center gap-2 bg-red-500/10 text-red-500 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border border-red-500/20">
                           <LockIcon /> Área Restrita +18
                        </span>
                        <h3 className="text-5xl md:text-7xl font-cute font-bold text-gray-800 dark:text-white tracking-tight leading-none">
                           Acesso Imediato <br/> <span className="text-soft-hot italic">ao Paraíso</span>
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400 font-light text-xl max-w-2xl mx-auto leading-relaxed">
                          Você já viu o básico nas redes sociais. Agora, imagine ter acesso a tudo o que eu não posso postar lá. <br/>
                          <strong className="font-medium text-gray-700 dark:text-gray-200">Vídeos completos, ângulos proibidos e uma conexão direta comigo.</strong>
                        </p>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl relative z-10">
                        {[
                            { title: 'Sem Censura', desc: 'Fotos e vídeos sem tarjas ou cortes.' },
                            { title: 'Chat Direto', desc: 'Fale comigo sempre que quiser.' },
                            { title: 'Conteúdo Diário', desc: 'Novidades quentes todo dia.' }
                        ].map((feat, i) => (
                            <div key={i} className="bg-white dark:bg-white/5 p-6 rounded-3xl border border-pink-50 dark:border-white/10 shadow-sm flex flex-col items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-soft-hot mb-2"></div>
                                <h4 className="font-bold text-gray-800 dark:text-white text-lg">{feat.title}</h4>
                                <p className="text-sm text-gray-400 font-light">{feat.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="relative z-10 pt-8 w-full flex justify-center">
                       <button onClick={() => setActiveTab('subs')} className="btn-kawaii px-16 py-6 rounded-full text-xl shadow-xl shadow-pink-500/30 uppercase tracking-widest hover:scale-105 transition-all w-full md:w-auto animate-pulse">
                           LIBERAR ACESSO AGORA 🔥
                       </button>
                    </div>

                    <p className="text-[10px] text-gray-300 dark:text-gray-600 uppercase tracking-widest mt-4">Compra 100% Segura & Discreta</p>
                 </div>
              </section>
            </div>
          )}

          {/* TAB: LINKS */}
          {activeTab === 'links' && (
            <div className="max-w-4xl w-full py-40 px-6 space-y-12 animate-in slide-in-from-bottom-8">
              <h2 className="text-4xl font-cute font-bold text-center dark:text-white">Redes Oficiais</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {links.map((link, idx) => (
                  <button 
                    key={link.id || idx} 
                    onClick={() => openLink(link.url)}
                    className="flex items-center p-6 rounded-[2rem] bg-white dark:bg-slate-900 border border-pink-50 dark:border-pink-500/10 hover:border-soft-hot transition-all shadow-sm w-full text-left group"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-pink-50 dark:bg-slate-800 flex items-center justify-center mr-5 shrink-0 group-hover:bg-pink-100 dark:group-hover:bg-pink-900/30 transition-colors">
                       {link.logo ? <img src={link.logo} className="w-6 h-6 object-contain" /> : <span className="text-xl">{link.icon}</span>}
                    </div>
                    <div>
                      <h4 className="font-cute font-bold text-lg dark:text-pink-300 group-hover:text-soft-hot transition-colors">{link.name}</h4>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{link.description || 'Acesse agora'}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* TAB: SUBS */}
          {activeTab === 'subs' && (
            <div className="max-w-6xl w-full py-40 px-6 grid grid-cols-1 md:grid-cols-2 gap-8 animate-in slide-in-from-bottom-8">
              {subs.map((sub) => (
                <div key={sub.id} className="bg-white dark:bg-slate-900 p-12 rounded-[3rem] border border-pink-50 dark:border-pink-500/10 hover:shadow-xl transition-all flex flex-col group">
                  <div className="flex justify-between items-start mb-8">
                    {sub.logo ? <img src={sub.logo} className="w-16 h-16 object-contain" /> : <div className="text-4xl">👑</div>}
                    <span className="bg-pink-50 dark:bg-pink-900/20 text-soft-hot text-[9px] font-bold px-4 py-2 rounded-full uppercase tracking-widest">VIP</span>
                  </div>
                  <h4 className="text-4xl font-cute font-bold mb-2 dark:text-white">{sub.name}</h4>
                  <p className="text-4xl font-cute font-bold text-soft-hot mb-10">{sub.price}</p>
                  <ul className="flex-1 space-y-4 mb-10">
                    {(Array.isArray(sub.benefits) ? sub.benefits : []).map((b, i) => (
                      <li key={i} className="flex items-center gap-3 text-gray-400 font-light text-sm">
                        <div className="w-4 h-4 rounded-full bg-pink-50 dark:bg-pink-900/40 flex items-center justify-center text-soft-hot text-[10px]">✓</div> {b}
                      </li>
                    ))}
                  </ul>
                  <button onClick={() => openLink(sub.url)} className="btn-kawaii w-full py-5 rounded-full text-center text-sm uppercase tracking-wider">ASSINAR AGORA</button>
                </div>
              ))}
            </div>
          )}

          {/* TAB: SERVICES */}
          {activeTab === 'services' && (
            <div className="max-w-7xl w-full py-40 px-6 space-y-12 animate-in slide-in-from-bottom-8">
              <h2 className="text-4xl font-cute font-bold text-center dark:text-white">Menu Exclusivo</h2>
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {services.map((service) => {
                  const isOptionsType = service.price_type === 'options' && Array.isArray(service.options) && service.options.length > 0;
                  const selectedOption = selectedServiceOptions[service.id];

                  return (
                    <div key={service.id} className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-pink-50 dark:border-pink-500/10 shadow-sm flex flex-col gap-6">
                      <div className="flex items-center gap-6">
                        <div className="w-16 h-16 bg-pink-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-3xl shrink-0">
                          {service.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                             <h3 className="text-xl font-cute font-bold dark:text-white">{service.title}</h3>
                             {isOptionsType && <span className="bg-pink-100 dark:bg-pink-900/40 text-soft-hot text-[8px] font-bold px-2 py-1 rounded-full uppercase tracking-widest">Personalizável</span>}
                          </div>
                          <p className="text-gray-400 font-light text-sm line-clamp-2 mt-1">{service.description}</p>
                        </div>
                      </div>
                      <div className="pt-6 border-t border-pink-50 dark:border-pink-500/5">
                           {isOptionsType ? (
                              <div className="flex flex-col gap-3">
                                  <span className="text-[10px] text-gray-400 uppercase font-bold">Selecione uma opção:</span>
                                  <div className="flex flex-col gap-2">
                                      {service.options.map((opt: any, idx: number) => {
                                          const isSelected = selectedOption === opt;
                                          return (
                                            <button 
                                                key={idx}
                                                onClick={() => setSelectedServiceOptions(prev => ({...prev, [service.id]: opt}))}
                                                className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${isSelected ? 'border-soft-hot bg-pink-50 dark:bg-pink-900/20 shadow-sm' : 'border-transparent bg-pink-50/30 dark:bg-slate-800 hover:bg-pink-50'}`}
                                            >
                                                {/* Radio Circle */}
                                                <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${isSelected ? 'border-soft-hot' : 'border-gray-300'}`}>
                                                    {isSelected && <div className="w-2 h-2 rounded-full bg-soft-hot" />}
                                                </div>
                                                <span className="text-sm font-medium flex-1 text-left dark:text-gray-200">{opt.title}</span>
                                                <span className="text-sm font-bold text-soft-hot">{opt.price}</span>
                                            </button>
                                          );
                                      })}
                                  </div>
                                  <button 
                                    disabled={!selectedOption}
                                    onClick={() => {
                                        if(!selectedOption) return;
                                        window.open(`https://wa.me/5531983103910?text=Quero%20o%20serviço:%20${service.title}%20-%20${selectedOption.title}%20(${selectedOption.price})`, '_blank');
                                    }}
                                    className={`mt-2 w-full btn-kawaii py-4 rounded-full text-xs uppercase tracking-widest transition-all shadow-lg ${!selectedOption ? 'opacity-50 cursor-not-allowed grayscale' : 'opacity-100 hover:scale-[1.02]'}`}
                                  >
                                    Contratar {selectedOption ? ` - ${selectedOption.price}` : ''}
                                  </button>
                              </div>
                           ) : (
                              <div className="flex items-center justify-between">
                                  <span className="text-2xl font-cute font-bold text-soft-hot">{service.price}</span>
                                  <button onClick={() => window.open(`https://wa.me/5511999999999?text=Quero%20o%20serviço:%20${service.title}`, '_blank')} className="btn-kawaii px-8 py-3 rounded-full text-xs uppercase">Contratar</button>
                              </div>
                           )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB: MIMOS */}
          {activeTab === 'mimos' && (
            <div className="max-w-6xl w-full py-40 px-6 space-y-12 animate-in slide-in-from-bottom-8">
              
              <div className="text-center space-y-4 max-w-3xl mx-auto">
                 <h2 className="text-4xl font-cute font-bold dark:text-white">Mimos & Presentes</h2>
                 <p className="text-lg text-gray-500 dark:text-gray-400 font-light italic">
                    "Cada mimo que vocês me enviam me faz sentir especial e muito amada. É uma forma linda de apoiar meu trabalho e me motivar a criar conteúdos cada vez melhores para vocês. Sou eternamente grata por todo carinho! 💖"
                 </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {mimos.map((gift, idx) => (
                  <div key={gift.id || idx} className="group relative aspect-[3/4] rounded-[2.5rem] overflow-hidden shadow-lg">
                    <img src={gift.image_url || gift.image} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent flex flex-col justify-end p-8">
                      <h4 className="text-white text-2xl font-cute font-bold mb-1">{gift.title}</h4>
                      <p className="text-soft-pink font-cute font-bold text-2xl mb-6">{gift.price}</p>
                      <button onClick={() => setSelectedGift(gift)} className="w-full bg-white py-4 rounded-full font-cute font-bold text-xs text-soft-hot uppercase tracking-widest hover:bg-pink-50 transition-all">Enviar Mimo</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* TAB: ABOUT (NOVA ÁREA) */}
          {activeTab === 'about' && (
            <div className="max-w-4xl w-full py-40 px-6 animate-in slide-in-from-bottom-8 flex flex-col items-center text-center">
                <div className="relative mb-8 group">
                    <div className="absolute inset-0 bg-soft-hot blur-2xl opacity-20 group-hover:opacity-40 transition-opacity rounded-full"></div>
                    <img src={avatarUrl} className="relative w-48 h-48 rounded-full object-cover border-4 border-white dark:border-slate-800 shadow-xl" />
                    {about.bio_age && (
                        <div className="absolute bottom-0 right-0 bg-white dark:bg-slate-900 text-soft-hot px-6 py-2 rounded-full font-cute font-bold text-xl shadow-lg border border-pink-50 dark:border-pink-500/20 rotate-[-5deg] group-hover:rotate-0 transition-transform">
                            {about.bio_age} anos
                        </div>
                    )}
                </div>
                
                <h2 className="text-5xl font-cute font-bold text-gray-800 dark:text-white mb-8">
                    Quem é a <span className="text-soft-hot">{siteTitle}</span>?
                </h2>

                <div className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-pink-50 dark:border-pink-500/10 shadow-sm max-w-2xl relative overflow-hidden">
                     <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-100 via-soft-hot to-pink-100 opacity-50"></div>
                     <p className="text-lg text-gray-500 dark:text-gray-300 font-light leading-loose whitespace-pre-wrap">
                        {about.bio_text || "Escreva algo sobre você no painel administrativo..."}
                     </p>
                     <div className="mt-8 flex justify-center gap-4">
                         <button onClick={() => setActiveTab('subs')} className="btn-kawaii px-8 py-3 rounded-full text-xs uppercase tracking-widest shadow-lg shadow-pink-500/20">
                            Virar Assinante
                         </button>
                     </div>
                </div>
            </div>
          )}

          {/* TAB: ADMIN (PROTECTED) */}
          {activeTab === 'admin' && (
            <div className="max-w-6xl w-full py-40 px-6 space-y-10 animate-in fade-in zoom-in duration-300 min-h-[60vh] flex flex-col items-center">
              
              {!isAuthenticated ? (
                  /* ADMIN LOGIN SCREEN */
                  <div className="bg-white dark:bg-slate-900 p-10 md:p-14 rounded-[3rem] border border-pink-50 dark:border-pink-500/10 shadow-xl max-w-md w-full flex flex-col items-center text-center space-y-6">
                      <div className="w-20 h-20 bg-pink-50 dark:bg-pink-900/20 rounded-full flex items-center justify-center text-soft-hot mb-2">
                          <LockIcon />
                      </div>
                      <div className="space-y-2">
                        <h2 className="text-3xl font-cute font-bold dark:text-white">Acesso Restrito</h2>
                        <p className="text-gray-400 text-sm">Esta área é exclusiva para administração.</p>
                      </div>

                      {rlsIssueDetected && (
                        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-xl text-left space-y-2 mb-4 w-full">
                          <p className="text-yellow-700 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                            ⚠️ Banco de Dados Bloqueado
                          </p>
                          <p className="text-yellow-600 text-xs leading-relaxed">
                            O Supabase retornou 0 senhas. Isso acontece quando o <strong>Row Level Security (RLS)</strong> está ativado sem políticas de acesso.
                          </p>
                          <p className="text-yellow-600 text-xs">
                            <strong>Solução:</strong> Vá no painel do Supabase {'>'} Table Editor {'>'} admin_access {'>'} RLS e desative-o.
                          </p>
                          <p className="text-yellow-800 text-xs font-bold mt-1">
                            Senha temporária liberada: <code className="bg-yellow-100 px-1 rounded">admin</code>
                          </p>
                        </div>
                      )}
                      
                      <form onSubmit={handleAdminLogin} className="w-full space-y-4">
                          <div className="space-y-4">
                              <input 
                                type="email" 
                                value={emailInput}
                                onChange={(e) => setEmailInput(e.target.value)}
                                placeholder="E-mail de administrador"
                                className="w-full p-4 rounded-2xl bg-pink-50/50 dark:bg-slate-800 outline-none text-center focus:ring-2 focus:ring-soft-hot/50 transition-all font-medium"
                              />
                              <div className="relative">
                                  <input 
                                    type={showPassword ? "text" : "password"} 
                                    value={passwordInput}
                                    onChange={(e) => setPasswordInput(e.target.value)}
                                    placeholder="Senha"
                                    className="w-full p-4 pr-12 rounded-2xl bg-pink-50/50 dark:bg-slate-800 outline-none text-center focus:ring-2 focus:ring-soft-hot/50 transition-all font-medium"
                                  />
                                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-soft-hot">
                                      {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                                  </button>
                              </div>
                          </div>
                          {loginError && <p className="text-red-400 text-xs font-bold uppercase tracking-widest animate-pulse">Login Inválido</p>}
                          <button type="submit" className="btn-kawaii w-full py-4 rounded-full text-sm uppercase tracking-widest font-bold">
                              Entrar no Painel
                          </button>
                      </form>
                  </div>
              ) : (
                  /* ADMIN DASHBOARD (AUTHENTICATED) */
                  <>
                      <div className="text-center space-y-2 relative w-full">
                        <h2 className="text-4xl font-cute font-bold dark:text-white tracking-tight">Dashboard VIP 🌸</h2>
                        <p className="text-soft-hot font-bold uppercase text-[10px] tracking-[0.4em]">Gerencie seu conteúdo</p>
                        
                        <button onClick={handleLogout} className="absolute right-0 top-0 hidden md:flex items-center gap-2 text-[10px] uppercase font-bold text-red-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 px-4 py-2 rounded-full transition-all">
                            <LogoutIcon /> Sair
                        </button>
                      </div>

                      {/* MENU ADMIN */}
                      <div className="flex flex-wrap justify-center gap-2">
                        {['settings', 'links', 'subs', 'services', 'mimos', 'about'].map((t) => (
                          <button key={t} onClick={() => { setAdminTab(t as any); handleCancelEdit(); }} className={`px-6 py-3 rounded-full text-[10px] uppercase font-bold tracking-widest transition-all ${adminTab === t ? 'bg-soft-hot text-white shadow-md' : 'bg-white dark:bg-slate-900 dark:text-white border border-pink-100 dark:border-pink-500/10 text-gray-400'}`}>
                            {t === 'services' ? 'Serviços' : t}
                          </button>
                        ))}
                      </div>

                      <div className="bg-white dark:bg-slate-900 p-8 md:p-12 rounded-[3rem] shadow-sm border border-pink-50 dark:border-pink-500/10 w-full relative">
                        {/* Mobile Logout */}
                        <button onClick={handleLogout} className="md:hidden absolute top-6 right-6 p-2 text-red-400 hover:bg-red-50 rounded-full">
                            <LogoutIcon />
                        </button>

                        {/* ADMIN: CONFIGURAÇÕES GERAIS */}
                        {adminTab === 'settings' && (
                          <form onSubmit={saveSettings} className="space-y-6 max-w-xl mx-auto font-light">
                            <div className="space-y-2">
                              <label className="text-[10px] font-bold uppercase text-soft-hot ml-4">Nome do Site</label>
                              <input name="site_title" defaultValue={siteTitle} className="w-full p-4 rounded-2xl bg-pink-50/50 dark:bg-slate-800 outline-none focus:ring-1 focus:ring-soft-hot" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase text-soft-hot ml-4">Slogan Principal</label>
                                <input name="hero_slogan" defaultValue={heroSlogan} className="w-full p-4 rounded-2xl bg-pink-50/50 dark:bg-slate-800 outline-none" />
                              </div>
                              <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase text-soft-hot ml-4">Sub-Slogan</label>
                                <input name="hero_sub_slogan" defaultValue={heroSubSlogan} className="w-full p-4 rounded-2xl bg-pink-50/50 dark:bg-slate-800 outline-none" />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <label className="text-[10px] font-bold uppercase text-soft-hot ml-4">Descrição curta</label>
                              <textarea name="hero_description" defaultValue={heroDescription} rows={3} className="w-full p-4 rounded-2xl bg-pink-50/50 dark:bg-slate-800 outline-none resize-none" />
                            </div>
                            <button type="submit" className="btn-kawaii w-full py-4 rounded-full text-xs uppercase tracking-widest">Salvar Home</button>
                          </form>
                        )}

                        {/* ADMIN: SOBRE MIM */}
                        {adminTab === 'about' && (
                          <form onSubmit={saveAboutMe} className="space-y-6 max-w-xl mx-auto font-light">
                            <div className="space-y-2">
                              <label className="text-[10px] font-bold uppercase text-soft-hot ml-4">Idade</label>
                              <input name="bio_age" defaultValue={about.bio_age} className="w-full p-4 rounded-2xl bg-pink-50/50 dark:bg-slate-800 outline-none" />
                            </div>
                            <div className="space-y-2">
                              <label className="text-[10px] font-bold uppercase text-soft-hot ml-4">Bio Completa</label>
                              <textarea name="bio_text" defaultValue={about.bio_text} rows={6} className="w-full p-4 rounded-2xl bg-pink-50/50 dark:bg-slate-800 outline-none resize-none" />
                            </div>
                            <button type="submit" className="btn-kawaii w-full py-4 rounded-full text-xs uppercase tracking-widest">Atualizar Perfil</button>
                          </form>
                        )}

                        {/* ADMIN: LINKS (CRUD + DRAG AND DROP) */}
                        {adminTab === 'links' && (
                          <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {links.map((link, idx) => (
                                <div 
                                    key={link.id} 
                                    className="p-6 rounded-3xl bg-pink-50/30 dark:bg-slate-800/50 border border-pink-50 dark:border-pink-500/5 transition-all group"
                                    draggable={editingId === null}
                                    onDragStart={(e) => handleDragStart(e, idx)}
                                    onDragOver={handleDragOver}
                                    onDrop={(e) => handleDrop(e, idx, links, setLinks, 'links_data')}
                                >
                                  {editingId === link.id ? (
                                    <div className="space-y-4">
                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                          <label className="text-[9px] font-bold text-soft-hot uppercase ml-2">Nome do Link</label>
                                          <input value={tempEditData.name} onChange={(e) => setTempEditData({...tempEditData, name: e.target.value})} className="w-full p-3 rounded-xl bg-white dark:bg-slate-900 text-sm border border-pink-50 dark:border-slate-700" placeholder="Ex: OnlyFans" />
                                        </div>
                                        <div className="space-y-1">
                                          <label className="text-[9px] font-bold text-soft-hot uppercase ml-2">URL de Destino</label>
                                          <input value={tempEditData.url} onChange={(e) => setTempEditData({...tempEditData, url: e.target.value})} className="w-full p-3 rounded-xl bg-white dark:bg-slate-900 text-sm border border-pink-50 dark:border-slate-700" placeholder="https://..." />
                                        </div>
                                      </div>
                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                          <label className="text-[9px] font-bold text-soft-hot uppercase ml-2">URL do Logo / Ícone</label>
                                          <input value={tempEditData.logo || ''} onChange={(e) => setTempEditData({...tempEditData, logo: e.target.value})} className="w-full p-3 rounded-xl bg-white dark:bg-slate-900 text-sm border border-pink-50 dark:border-slate-700" placeholder="https://imagem.png" />
                                        </div>
                                        <div className="space-y-1">
                                          <label className="text-[9px] font-bold text-soft-hot uppercase ml-2">Descrição Curta</label>
                                          <input value={tempEditData.description || ''} onChange={(e) => setTempEditData({...tempEditData, description: e.target.value})} className="w-full p-3 rounded-xl bg-white dark:bg-slate-900 text-sm border border-pink-50 dark:border-slate-700" placeholder="Ex: Conteúdo exclusivo" />
                                        </div>
                                      </div>
                                      <div className="flex gap-2 pt-2">
                                        <button onClick={() => handleSaveEdit('links_data')} className="flex-1 bg-soft-hot text-white py-3 rounded-xl text-[10px] font-bold uppercase shadow-sm">Confirmar Alterações</button>
                                        <button onClick={handleCancelEdit} className="px-6 bg-gray-200 dark:bg-slate-700 text-gray-500 py-3 rounded-xl text-[10px] font-bold uppercase">Cancelar</button>
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="flex items-center justify-between gap-4">
                                      <div className="flex items-center gap-4 flex-1 cursor-grab active:cursor-grabbing">
                                        <div className="p-2 text-gray-300">
                                           <DragHandleIcon />
                                        </div>
                                        <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-900 flex items-center justify-center shrink-0 border border-pink-50 dark:border-slate-700 overflow-hidden p-2">
                                          {link.logo ? <img src={link.logo} className="w-full h-full object-contain" /> : <span className="text-lg">🔗</span>}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                          <h4 className="font-cute font-bold text-gray-700 dark:text-white truncate">{link.name}</h4>
                                          <p className="text-[10px] text-gray-400 font-light truncate">{link.description || 'Nenhuma descrição'}</p>
                                          <p className="text-[8px] text-soft-hot/50 font-mono truncate">{link.url}</p>
                                        </div>
                                      </div>
                                      <div className="flex gap-3 shrink-0">
                                        <button onClick={() => handleStartEdit(link)} className="text-[10px] text-soft-hot uppercase font-bold hover:underline">Editar</button>
                                        <button onClick={() => handleDelete('links_data', link.id)} className={`text-[10px] uppercase font-bold transition-all ${confirmDeleteId === link.id ? 'text-red-500 animate-pulse' : 'text-gray-300 hover:text-red-400'}`}>{confirmDeleteId === link.id ? 'Confirma?' : 'Excluir'}</button>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                            <button onClick={() => handleCreate('links_data', { name: 'Novo Link', url: '#', order_index: links.length, logo: '', description: '' })} className="w-full py-8 border-2 border-dashed border-pink-100 dark:border-pink-900/40 rounded-[2.5rem] text-soft-hot font-bold text-[11px] uppercase tracking-widest hover:bg-pink-50/30 transition-all">+ Criar Novo Canal</button>
                          </div>
                        )}

                        {/* ADMIN: SUBSCRIPTIONS (CRUD) */}
                        {adminTab === 'subs' && (
                          <div className="space-y-6">
                            <div className="grid grid-cols-1 gap-6">
                              {subs.map((sub) => (
                                <div key={sub.id} className="p-8 rounded-3xl bg-pink-50/30 dark:bg-slate-800/50 border border-pink-50 dark:border-pink-500/5 transition-all">
                                  {editingId === sub.id ? (
                                    <div className="space-y-6">
                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                          <label className="text-[9px] font-bold text-soft-hot uppercase ml-2">Título do Plano</label>
                                          <input value={tempEditData.name} onChange={(e) => setTempEditData({...tempEditData, name: e.target.value})} className="w-full p-3 rounded-xl bg-white dark:bg-slate-900 text-sm border border-pink-50 dark:border-slate-700" placeholder="Ex: Assinatura Mensal" />
                                        </div>
                                        <div className="space-y-1">
                                          <label className="text-[9px] font-bold text-soft-hot uppercase ml-2">Valor/Preço</label>
                                          <input value={tempEditData.price} onChange={(e) => setTempEditData({...tempEditData, price: e.target.value})} className="w-full p-3 rounded-xl bg-white dark:bg-slate-900 text-sm border border-pink-50 dark:border-slate-700" placeholder="Ex: R$ 19,90/mês" />
                                        </div>
                                      </div>
                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                          <label className="text-[9px] font-bold text-soft-hot uppercase ml-2">URL do Checkout</label>
                                          <input value={tempEditData.url || ''} onChange={(e) => setTempEditData({...tempEditData, url: e.target.value})} className="w-full p-3 rounded-xl bg-white dark:bg-slate-900 text-sm border border-pink-50 dark:border-slate-700" placeholder="https://privacy.com.br/..." />
                                        </div>
                                        <div className="space-y-1">
                                          <label className="text-[9px] font-bold text-soft-hot uppercase ml-2">URL do Logo (Opcional)</label>
                                          <input value={tempEditData.logo || ''} onChange={(e) => setTempEditData({...tempEditData, logo: e.target.value})} className="w-full p-3 rounded-xl bg-white dark:bg-slate-900 text-sm border border-pink-50 dark:border-slate-700" placeholder="https://imagem.png" />
                                        </div>
                                      </div>
                                      <div className="space-y-1">
                                        <label className="text-[9px] font-bold text-soft-hot uppercase ml-2">Benefícios (Um por linha)</label>
                                        <textarea value={tempEditData.benefits} onChange={(e) => setTempEditData({...tempEditData, benefits: e.target.value})} rows={5} className="w-full p-3 rounded-xl bg-white dark:bg-slate-900 text-sm border border-pink-50 dark:border-slate-700 resize-none" placeholder="Conteúdo Exclusivo&#10;Chat Prioritário&#10;Fotos HD" />
                                      </div>
                                      <div className="flex gap-2 pt-2">
                                        <button onClick={() => handleSaveEdit('subscriptions_data')} className="flex-1 bg-soft-hot text-white py-4 rounded-xl text-[10px] font-bold uppercase shadow-sm">Salvar Alterações</button>
                                        <button onClick={handleCancelEdit} className="px-8 bg-gray-200 dark:bg-slate-700 text-gray-500 py-4 rounded-xl text-[10px] font-bold uppercase">Cancelar</button>
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                      <div className="flex items-center gap-6">
                                        <div className="w-16 h-16 rounded-2xl bg-white dark:bg-slate-900 flex items-center justify-center shrink-0 border border-pink-50 dark:border-slate-700 overflow-hidden p-3">
                                          {sub.logo ? <img src={sub.logo} className="w-full h-full object-contain" /> : <span className="text-2xl">💎</span>}
                                        </div>
                                        <div>
                                          <h4 className="font-cute font-bold text-xl dark:text-white">{sub.name}</h4>
                                          <p className="text-soft-hot font-bold text-lg">{sub.price}</p>
                                          <div className="mt-2 flex flex-wrap gap-2">
                                            {(Array.isArray(sub.benefits) ? sub.benefits : []).slice(0, 3).map((b, i) => (
                                              <span key={i} className="text-[8px] bg-pink-100 dark:bg-pink-900/30 text-soft-hot px-2 py-1 rounded-full font-bold uppercase tracking-widest">{b}</span>
                                            ))}
                                            {sub.benefits?.length > 3 && <span className="text-[8px] text-gray-400 font-bold uppercase">+{sub.benefits.length - 3} mais</span>}
                                          </div>
                                        </div>
                                      </div>
                                      <div className="flex gap-4 items-center justify-end">
                                        <button onClick={() => handleStartEdit(sub)} className="text-[10px] text-soft-hot uppercase font-bold hover:underline">Editar Plano</button>
                                        <button onClick={() => handleDelete('subscriptions_data', sub.id)} className={`text-[10px] uppercase font-bold transition-all ${confirmDeleteId === sub.id ? 'text-red-500 animate-pulse' : 'text-gray-300 hover:text-red-400'}`}>{confirmDeleteId === sub.id ? 'Confirma?' : 'Excluir'}</button>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                            <button onClick={() => handleCreate('subscriptions_data', { name: 'Novo Plano VIP', price: 'R$ 00,00/mês', benefits: ['Acesso ao feed'], url: '#', order_index: subs.length })} className="w-full py-10 border-2 border-dashed border-pink-100 dark:border-pink-900/40 rounded-[2.5rem] text-soft-hot font-bold text-[11px] uppercase tracking-widest hover:bg-pink-50/30 transition-all">+ Adicionar Nova Assinatura VIP</button>
                          </div>
                        )}

                        {/* ADMIN: SERVICES SECTION (DRAG AND DROP) */}
                        {adminTab === 'services' && (
                          <div className="space-y-6">
                            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 text-left">
                              {services.map((item, idx) => (
                                <div 
                                    key={item.id} 
                                    className="p-8 rounded-3xl bg-pink-50/30 dark:bg-slate-800/50 border border-pink-50 dark:border-pink-500/5 transition-all group"
                                    draggable={editingId === null}
                                    onDragStart={(e) => handleDragStart(e, idx)}
                                    onDragOver={handleDragOver}
                                    onDrop={(e) => handleDrop(e, idx, services, setServices, 'services_data')}
                                >
                                    {editingId === item.id ? (
                                        <div className="space-y-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="space-y-1">
                                                    <label className="text-[9px] font-bold text-soft-hot uppercase ml-2">Título do Serviço</label>
                                                    <input value={tempEditData.title} onChange={(e) => setTempEditData({...tempEditData, title: e.target.value})} className="w-full p-3 rounded-xl bg-white dark:bg-slate-900 text-sm border border-pink-50 dark:border-slate-700" placeholder="Ex: Chamada de Vídeo" />
                                                </div>
                                                <div className="space-y-1">
                                                    <label className="text-[9px] font-bold text-soft-hot uppercase ml-2">Ícone (Emoji)</label>
                                                    <input value={tempEditData.icon || '✨'} onChange={(e) => setTempEditData({...tempEditData, icon: e.target.value})} className="w-full p-3 rounded-xl bg-white dark:bg-slate-900 text-sm border border-pink-50 dark:border-slate-700 text-center text-xl" />
                                                </div>
                                            </div>
                                            
                                            <div className="space-y-2">
                                                <label className="text-[9px] font-bold text-soft-hot uppercase ml-2">Tipo de Cobrança</label>
                                                <select 
                                                  value={tempEditData.price_type || 'fixed'} 
                                                  onChange={(e) => setTempEditData({...tempEditData, price_type: e.target.value})}
                                                  className="w-full p-3 rounded-xl bg-white dark:bg-slate-900 text-sm border border-pink-50 dark:border-slate-700 outline-none"
                                                >
                                                  <option value="fixed">Valor Único (Fixo)</option>
                                                  <option value="options">Lista de Opções (Tabela Dinâmica)</option>
                                                </select>
                                            </div>

                                            {tempEditData.price_type === 'fixed' ? (
                                                <div className="space-y-1">
                                                    <label className="text-[9px] font-bold text-soft-hot uppercase ml-2">Valor/Preço</label>
                                                    <input value={tempEditData.price || ''} onChange={(e) => setTempEditData({...tempEditData, price: e.target.value})} className="w-full p-3 rounded-xl bg-white dark:bg-slate-900 text-sm border border-pink-50 dark:border-slate-700" placeholder="Ex: R$ 150,00" />
                                                </div>
                                            ) : (
                                                <div className="bg-pink-100/50 dark:bg-pink-900/10 p-4 rounded-2xl flex flex-col gap-3">
                                                    {/* LISTA DINÂMICA DE OPÇÕES */}
                                                    {(tempEditData.options || []).map((opt: any, idx: number) => (
                                                        <div key={idx} className="flex gap-2 items-center animate-in fade-in slide-in-from-left-4">
                                                            <div className="flex-1 space-y-1">
                                                                {idx === 0 && <label className="text-[9px] font-bold text-soft-hot uppercase ml-1">Descrição do Item</label>}
                                                                <input 
                                                                    value={opt.title} 
                                                                    onChange={(e) => handleUpdateOption(idx, 'title', e.target.value)} 
                                                                    className="w-full p-2 rounded-lg bg-white dark:bg-slate-900 text-xs border border-pink-50 dark:border-slate-700" 
                                                                    placeholder="Ex: 10 Minutos" 
                                                                />
                                                            </div>
                                                            <div className="w-1/3 space-y-1">
                                                                {idx === 0 && <label className="text-[9px] font-bold text-soft-hot uppercase ml-1">Valor</label>}
                                                                <input 
                                                                    value={opt.price} 
                                                                    onChange={(e) => handleUpdateOption(idx, 'price', e.target.value)} 
                                                                    className="w-full p-2 rounded-lg bg-white dark:bg-slate-900 text-xs border border-pink-50 dark:border-slate-700" 
                                                                    placeholder="R$ 00,00" 
                                                                />
                                                            </div>
                                                            <div className={idx === 0 ? "pt-5" : ""}>
                                                                <button onClick={() => handleRemoveOption(idx)} className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                                                                    <TrashIcon />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                    <button onClick={handleAddOption} className="mt-2 py-3 border border-dashed border-pink-300 rounded-xl text-[10px] font-bold uppercase text-soft-hot hover:bg-pink-50 transition-colors">+ Adicionar Opção</button>
                                                </div>
                                            )}

                                            <div className="space-y-1">
                                                <label className="text-[9px] font-bold text-soft-hot uppercase ml-2">Descrição Completa</label>
                                                <textarea value={tempEditData.description} onChange={(e) => setTempEditData({...tempEditData, description: e.target.value})} rows={3} className="w-full p-3 rounded-xl bg-white dark:bg-slate-900 text-sm border border-pink-50 dark:border-slate-700 resize-none" placeholder="Explique como funciona o serviço..." />
                                            </div>
                                            <div className="flex gap-2 pt-2">
                                                <button onClick={() => handleSaveEdit('services_data')} className="flex-1 bg-soft-hot text-white py-4 rounded-xl text-[10px] font-bold uppercase shadow-sm">Atualizar Serviço</button>
                                                <button onClick={handleCancelEdit} className="px-8 bg-gray-200 dark:bg-slate-700 text-gray-500 py-4 rounded-xl text-[10px] font-bold uppercase">Cancelar</button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                            <div className="flex items-center gap-6 cursor-grab active:cursor-grabbing">
                                                <div className="p-2 text-gray-300">
                                                    <DragHandleIcon />
                                                </div>
                                                <div className="w-16 h-16 rounded-2xl bg-white dark:bg-slate-900 flex items-center justify-center shrink-0 border border-pink-50 dark:border-slate-700 text-3xl">
                                                    {item.icon || '✨'}
                                                </div>
                                                <div>
                                                    <h4 className="font-cute font-bold text-xl dark:text-white flex items-center gap-2">
                                                      {item.title}
                                                      {item.price_type === 'options' && <span className="text-[8px] bg-sky-100 dark:bg-sky-900/40 text-sky-600 px-2 py-0.5 rounded-full">OPÇÕES</span>}
                                                    </h4>
                                                    <p className="text-soft-hot font-bold text-lg">
                                                        {item.price_type === 'options' && Array.isArray(item.options) && item.options.length > 0 
                                                            ? `${item.options[0].price} +` 
                                                            : item.price}
                                                    </p>
                                                    <p className="text-[10px] text-gray-400 font-light max-w-sm line-clamp-1">{item.description}</p>
                                                </div>
                                            </div>
                                            <div className="flex gap-4 items-center justify-end">
                                                <button onClick={() => handleStartEdit(item)} className="text-[10px] text-soft-hot uppercase font-bold hover:underline">Editar</button>
                                                <button onClick={() => handleDelete('services_data', item.id)} className={`text-[10px] uppercase font-bold transition-all ${confirmDeleteId === item.id ? 'text-red-500 animate-pulse' : 'text-gray-300 hover:text-red-400'}`}>{confirmDeleteId === item.id ? 'Confirma?' : 'Deletar'}</button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                              ))}
                            </div>
                            {/* Botão de criar agora passa o array de options vazio para evitar erros de schema */}
                            <button onClick={() => handleCreate('services_data', { title: 'Novo Serviço', price: 'R$ 0,00', description: 'Descrição do serviço aqui', icon: '✨', price_type: 'fixed', order_index: services.length, options: [] })} className="w-full py-10 border-2 border-dashed border-pink-100 dark:border-pink-900/40 rounded-[2.5rem] text-soft-hot font-bold text-[11px] uppercase tracking-widest hover:bg-pink-50/30 transition-all">+ Criar Novo Item de Menu</button>
                          </div>
                        )}

                        {/* ADMIN: MIMOS (FULL CRUD) */}
                        {adminTab === 'mimos' && (
                          <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                              {mimos.map((item) => (
                                <div key={item.id} className="p-6 rounded-3xl bg-pink-50/30 dark:bg-slate-800/50 border border-pink-50 dark:border-pink-500/5 transition-all">
                                    {editingId === item.id ? (
                                        <div className="space-y-4">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="space-y-1">
                                                    <label className="text-[9px] font-bold text-soft-hot uppercase ml-2">Nome do Mimo</label>
                                                    <input value={tempEditData.title} onChange={(e) => setTempEditData({...tempEditData, title: e.target.value})} className="w-full p-3 rounded-xl bg-white dark:bg-slate-900 text-sm border border-pink-50 dark:border-slate-700" placeholder="Ex: Café" />
                                                </div>
                                                <div className="space-y-1">
                                                    <label className="text-[9px] font-bold text-soft-hot uppercase ml-2">Preço Sugerido</label>
                                                    <input value={tempEditData.price} onChange={(e) => setTempEditData({...tempEditData, price: e.target.value})} className="w-full p-3 rounded-xl bg-white dark:bg-slate-900 text-sm border border-pink-50 dark:border-slate-700" placeholder="Ex: R$ 15,00" />
                                                </div>
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[9px] font-bold text-soft-hot uppercase ml-2">URL da Imagem</label>
                                                <input value={tempEditData.image_url || tempEditData.image || ''} onChange={(e) => setTempEditData({...tempEditData, image_url: e.target.value})} className="w-full p-3 rounded-xl bg-white dark:bg-slate-900 text-sm border border-pink-50 dark:border-slate-700" placeholder="https://..." />
                                            </div>
                                            <div className="flex gap-2 pt-2">
                                                <button onClick={() => handleSaveEdit('mimos_data')} className="flex-1 bg-soft-hot text-white py-3 rounded-xl text-[10px] font-bold uppercase shadow-sm">Salvar Alterações</button>
                                                <button onClick={handleCancelEdit} className="px-6 bg-gray-200 dark:bg-slate-700 text-gray-500 py-3 rounded-xl text-[10px] font-bold uppercase">Cancelar</button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-3">
                                                {(item.image || item.image_url) && <img src={item.image_url || item.image} className="w-10 h-10 rounded-lg object-cover" />}
                                                <span className="font-bold text-sm dark:text-white truncate max-w-[150px]">{item.title}</span>
                                                <span className="text-xs text-soft-hot font-bold">{item.price}</span>
                                            </div>
                                            <div className="flex gap-3 shrink-0">
                                              <button onClick={() => handleStartEdit(item)} className="text-[10px] text-soft-hot font-bold uppercase">Editar</button>
                                              <button onClick={() => handleDelete('mimos_data', item.id)} className={`text-[10px] font-bold uppercase ${confirmDeleteId === item.id ? 'text-red-500' : 'text-gray-400'}`}>{confirmDeleteId === item.id ? 'Fez?' : 'Deletar'}</button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                              ))}
                            </div>
                            <button onClick={() => handleCreate('mimos_data', { title: 'Novo Mimo', price: 'R$ 0,00', image_url: 'https://images.unsplash.com/photo-1541167760496-162955ed8a9f?w=400&h=500&fit=crop', order_index: mimos.length })} className="w-full py-6 border border-dashed border-pink-200 rounded-3xl text-soft-hot font-bold text-[10px] uppercase">+ Adicionar Mimo</button>
                          </div>
                        )}

                      </div>
                  </>
              )}
            </div>
          )}
        </div>
      </main>
      
      {/* GIFT MODAL POPUP */}
      {selectedGift && (
        <div className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-md flex items-center justify-center p-4" onClick={() => setSelectedGift(null)}>
            <div className="bg-white dark:bg-[#151213] border border-pink-200 dark:border-pink-500/20 rounded-[2.5rem] max-w-4xl w-full p-8 relative shadow-2xl overflow-y-auto max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
                <button onClick={() => setSelectedGift(null)} className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/5 transition-colors text-gray-400">
                    <CloseIcon />
                </button>
                
                {/* Modal Header: Gift Preview */}
                <div className="flex flex-col items-center mb-10 text-center">
                    <img src={selectedGift.image_url || selectedGift.image} className="w-32 h-32 rounded-3xl object-cover mb-4 shadow-lg border-2 border-white dark:border-pink-500/10" />
                    <h3 className="text-3xl font-cute font-bold dark:text-white mb-1">{selectedGift.title}</h3>
                    <p className="text-2xl text-soft-hot font-bold">{selectedGift.price}</p>
                </div>

                {/* Modal Body: Two Column Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left: How To */}
                    <div className="border border-pink-100 dark:border-pink-500/20 rounded-3xl p-6 bg-pink-50/20 dark:bg-white/5 flex flex-col gap-6">
                         <div className="flex items-center gap-3 text-soft-hot mb-2">
                             <div className="p-2 rounded-full bg-pink-100 dark:bg-pink-900/40"><InfoIcon /></div>
                             <h4 className="font-cute font-bold text-lg dark:text-gray-200">Como Presentear</h4>
                         </div>
                         
                         <div className="space-y-4">
                             <div className="flex gap-4 items-start">
                                 <div className="w-6 h-6 rounded-full bg-soft-hot text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">1</div>
                                 <p className="text-gray-500 dark:text-gray-300 text-sm leading-relaxed">
                                     No LivePix, digite o valor do presente: <br/>
                                     <span className="text-soft-hot font-bold text-lg">{selectedGift.price}</span>
                                 </p>
                             </div>
                             <div className="flex gap-4 items-start">
                                 <div className="w-6 h-6 rounded-full bg-soft-hot text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">2</div>
                                 <p className="text-gray-500 dark:text-gray-300 text-sm leading-relaxed">
                                     Na mensagem, escreva: <br/>
                                     <span className="italic text-gray-400 dark:text-gray-500">"Presente: {selectedGift.title}. De: [seu nome]"</span>
                                 </p>
                             </div>
                             <div className="flex gap-4 items-start">
                                 <div className="w-6 h-6 rounded-full bg-soft-hot text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">3</div>
                                 <p className="text-gray-500 dark:text-gray-300 text-sm leading-relaxed">
                                     Complete o pagamento e pronto!
                                 </p>
                             </div>
                         </div>
                    </div>

                    {/* Right: CTA */}
                    <div className="border border-pink-100 dark:border-pink-500/20 rounded-3xl p-6 bg-pink-50/20 dark:bg-white/5 flex flex-col items-center justify-center text-center gap-6 relative overflow-hidden">
                         {/* Decorative Circle */}
                         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-soft-hot/5 rounded-full blur-2xl"></div>

                         <div className="w-16 h-16 rounded-full bg-soft-hot/10 dark:bg-pink-900/20 flex items-center justify-center text-soft-hot relative z-10">
                             <GiftIcon />
                             <div className="absolute -top-1 -right-1 bg-white dark:bg-[#151213] border border-pink-200 dark:border-pink-500/30 w-6 h-6 rounded-full flex items-center justify-center text-[10px]">⭐️</div>
                         </div>
                         
                         <div className="relative z-10 space-y-2">
                             <h4 className="font-cute font-bold text-xl dark:text-white">Pronto para Presentear?</h4>
                             <p className="text-xs text-gray-400 max-w-xs mx-auto">Clique no botão abaixo para ir ao LivePix e fazer seu pagamento com segurança.</p>
                         </div>

                         <button onClick={() => window.open('https://livepix.gg/privacylysamami', '_blank')} className="relative z-10 w-full btn-kawaii py-4 rounded-full text-sm font-bold shadow-xl shadow-pink-500/20 uppercase tracking-widest hover:scale-105 transition-transform">
                             Presentear no LivePix ✨
                         </button>
                    </div>
                </div>
            </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="p-12 text-center text-gray-300 dark:text-gray-700 font-medium text-[10px] uppercase tracking-[0.5em] shrink-0">
        &copy; {new Date().getFullYear()} {siteTitle} &bull; Kawaii Minimalist Presence
      </footer>
    </div>
  );
};

export default App;
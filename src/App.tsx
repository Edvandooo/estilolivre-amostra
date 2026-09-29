import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Clock, 
  MapPin, 
  Phone, 
  Instagram, 
  ArrowUpRight, 
  Scissors,
  Check,
  Calendar,
  MessageCircle,
  ExternalLink,
  Menu,
  X,
  Search,
  Star,
  ChevronLeft,
  ChevronRight,
  Quote
} from 'lucide-react';

// Universal static assets from public/images: 100% build compatibility on Netlify, GitHub, Vercel & AI Studio
const heroCinematicBg = '/images/hero_cinematic_bg_1790649713873.jpg';
const clipperCutoutPng = '/images/clipper_cutout_transparent.png';
const barbeariaFotoOriginal = '/images/barbearia_foto_original.jpg';
const galeriaCorte1 = '/images/galeria_corte_1.jpg';
const galeriaCorte2 = '/images/galeria_corte_2.jpg';
const galeriaCorte3 = '/images/galeria_corte_3.jpg';
const galeriaCorte4 = '/images/galeria_corte_4.jpg';

// Official Booksy profile for Barbearia Estilo Livre
const BOOKSY_URL = "https://booksy.com/pt-br/111219_barbearia-estilo-livre_barbearias_1047773_sao-paulo";

// Official Google Maps profile and reviews for Barbearia Estilo Livre
const GOOGLE_MAPS_REVIEWS_URL = "https://www.google.com.br/maps/place/Barbearia+Estilo+Livre/@-23.4998209,-46.3947723,17z/data=!4m8!3m7!1s0x94ce65f29516ebc7:0xb9395243b826465d!8m2!3d-23.4998258!4d-46.3921974!9m1!1b1!16s%2Fg%2F11j79l_d5g?hl=pt-BR&entry=ttu";

interface ReviewItem {
  id: string;
  name: string;
  initials: string;
  rating: number;
  comment: string;
  accent: 'blue' | 'red' | 'gold';
}

const REVIEWS_DATA: ReviewItem[] = [
  {
    id: 'bruno',
    name: 'Bruno da Silva Bento',
    initials: 'BB',
    rating: 5,
    comment: 'Barbearia top Barbeiros de primeira bem atualizados sem falar o preço que e ótimo de todos lugares onde fui nunca fui tão bem recebido tem que ver o trabalho infantil excelente sem comentários nota 10',
    accent: 'blue'
  },
  {
    id: 'flavio',
    name: 'Flavio Lima',
    initials: 'FL',
    rating: 5,
    comment: 'Ambiente sensacional bem aconchegante e atendimento personalizado. Sai muito satisfeito com o corte e o profissionalismo.',
    accent: 'red'
  },
  {
    id: 'paulo',
    name: 'Paulo Guilherme',
    initials: 'PG',
    rating: 5,
    comment: 'Meus parabéns foi muito bem atendido vcs são os melhores que Deus abençoe vcs',
    accent: 'blue'
  },
  {
    id: 'guinho-milly',
    name: 'Guinho e Milly Santos',
    initials: 'GS',
    rating: 5,
    comment: 'Super indico...ótimo atendimento e o cliente são satisfeito com o corte... #superindico',
    accent: 'red'
  },
  {
    id: 'luis',
    name: 'Luis Souza',
    initials: 'LS',
    rating: 5,
    comment: 'Excelente atendimento, Airton e os meninos mandam bem no corte 😎',
    accent: 'blue'
  },
  {
    id: 'rodrigo',
    name: 'Rodrigo Ventura',
    initials: 'RV',
    rating: 5,
    comment: 'Atendimento nota 10!',
    accent: 'gold'
  },
  {
    id: 'nathan',
    name: 'Nathan Ribeiro',
    initials: 'NR',
    rating: 5,
    comment: 'Melhor barbearia do Itaim paulista recomendo',
    accent: 'red'
  },
  {
    id: 'micael',
    name: 'Micael',
    initials: 'M',
    rating: 5,
    comment: 'Ótimo lugar com ótimos profissionais',
    accent: 'blue'
  }
];

interface ServiceItem {
  name: string;
  duration: string;
  originalPrice?: string;
  price: string;
}

interface ServiceCategory {
  id: string;
  name: string;
  services: ServiceItem[];
}

const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: 'outros',
    name: 'OUTROS',
    services: [
      {
        name: 'Corte Degrade + Sobrancelhas',
        duration: '40 min',
        originalPrice: 'R$ 65,00',
        price: 'R$ 58,50'
      }
    ]
  },
  {
    id: 'cabelo',
    name: 'CABELO',
    services: [
      {
        name: 'Corte Degrade + penteado (selado)',
        duration: '1h',
        originalPrice: 'R$ 80,00+',
        price: 'R$ 72,00+'
      },
      {
        name: 'Corte Degrade (Máquina e tesoura)',
        duration: '40 min',
        originalPrice: 'R$ 50,00',
        price: 'R$ 45,00'
      },
      {
        name: 'Corte Degrade + nudred (Esponja)',
        duration: '1h',
        originalPrice: 'R$ 65,00',
        price: 'R$ 58,50'
      },
      {
        name: 'Corte Simples (máquina e tesoura)',
        duration: '30 min',
        originalPrice: 'R$ 45,00',
        price: 'R$ 40,50'
      },
      {
        name: 'Corte Degrade + Ativador de cachos (Curly hair)',
        duration: '1h',
        originalPrice: 'R$ 80,00+',
        price: 'R$ 72,00+'
      },
      {
        name: 'Matização',
        duration: '10 min',
        originalPrice: 'R$ 40,00+',
        price: 'R$ 36,00+'
      },
      {
        name: 'Acabamento (Pezinho)',
        duration: '10 min',
        originalPrice: 'R$ 20,00',
        price: 'R$ 18,00'
      }
    ]
  },
  {
    id: 'barba',
    name: 'BARBA',
    services: [
      {
        name: 'Sobrancelha',
        duration: '10 min',
        originalPrice: 'R$ 15,00',
        price: 'R$ 13,50'
      },
      {
        name: 'Barba simples (Modelada)',
        duration: '30 min',
        originalPrice: 'R$ 35,00',
        price: 'R$ 31,50'
      },
      {
        name: 'Barba + Pigmentação (Tintura)',
        duration: '30 min',
        originalPrice: 'R$ 55,00',
        price: 'R$ 49,50'
      }
    ]
  },
  {
    id: 'combo',
    name: 'COMBO',
    services: [
      {
        name: 'Corte Degrade + Barba',
        duration: '1h',
        originalPrice: 'R$ 90,00',
        price: 'R$ 81,00'
      },
      {
        name: 'Corte Degrade + Barba + sobrancelhas',
        duration: '1h',
        originalPrice: 'R$ 95,00',
        price: 'R$ 85,50'
      }
    ]
  },
  {
    id: 'quimica',
    name: 'QUÍMICA',
    services: [
      {
        name: 'Corte + progressiva (Selagem)',
        duration: '1h 40min',
        originalPrice: 'R$ 140,00+',
        price: 'R$ 126,00+'
      },
      {
        name: 'Corte + luzes',
        duration: '1h 30min',
        originalPrice: 'R$ 150,00+',
        price: 'R$ 135,00+'
      },
      {
        name: 'Corte + Descoloração global (Platinado)',
        duration: '1h 40min',
        originalPrice: 'R$ 160,00+',
        price: 'R$ 144,00+'
      },
      {
        name: 'Corte + Relaxamento',
        duration: '1h',
        originalPrice: 'R$ 120,00+',
        price: 'R$ 108,00+'
      },
      {
        name: 'Corte + botox (Redutor de volume)',
        duration: '1h 40min',
        originalPrice: 'R$ 130,00+',
        price: 'R$ 117,00+'
      }
    ]
  },
  {
    id: 'penteado',
    name: 'PENTEADO',
    services: [
      {
        name: 'Penteado simples',
        duration: '20 min',
        originalPrice: 'R$ 30,00',
        price: 'R$ 27,00'
      },
      {
        name: 'Penteado Dimil',
        duration: '30 min',
        originalPrice: 'R$ 40,00',
        price: 'R$ 36,00'
      }
    ]
  }
];

// Helper custom hook for smooth scroll reveal transitions using IntersectionObserver
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

export default function App() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hasScrolled, setHasScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const heroRef = useRef<HTMLDivElement>(null);

  // Filtered categories for services section
  const totalServicesCount = useMemo(() => {
    return SERVICE_CATEGORIES.reduce((acc, cat) => acc + cat.services.length, 0);
  }, []);

  const displayedCategories = useMemo(() => {
    const trimmedQuery = searchQuery.trim().toLowerCase();
    return SERVICE_CATEGORIES.map(category => {
      if (activeCategory !== 'todos' && category.id !== activeCategory) {
        return null;
      }
      if (!trimmedQuery) {
        return category;
      }
      const matchingServices = category.services.filter(s => 
        s.name.toLowerCase().includes(trimmedQuery) ||
        category.name.toLowerCase().includes(trimmedQuery) ||
        s.price.toLowerCase().includes(trimmedQuery)
      );
      if (matchingServices.length === 0) return null;
      return {
        ...category,
        services: matchingServices
      };
    }).filter(Boolean) as ServiceCategory[];
  }, [activeCategory, searchQuery]);

  // Section scroll reveal hooks (Sobre, Serviços, Galeria, Espaço, Avaliações, Contato)
  const sobreReveal = useScrollReveal();
  const servicosReveal = useScrollReveal();
  const galeriaReveal = useScrollReveal();
  const espacoReveal = useScrollReveal();
  const avaliacoesReveal = useScrollReveal();
  const contatoReveal = useScrollReveal();

  // Carousel state for Avaliações section
  const [reviewIndex, setReviewIndex] = useState(0);

  const nextReview = () => {
    setReviewIndex((prev) => (prev + 1) % REVIEWS_DATA.length);
  };

  const prevReview = () => {
    setReviewIndex((prev) => (prev - 1 + REVIEWS_DATA.length) % REVIEWS_DATA.length);
  };

  // Scroll detection for header styling
  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Desktop mouse parallax calculation (complements the automatic mobile animation)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // WhatsApp link generator preserving exact business phone and pre-filled message
  const getWhatsAppLink = (service?: string) => {
    const baseMessage = service 
      ? `Olá, gostaria de agendar um horário para ${service} na Barbearia Estilo Livre.`
      : "Olá, gostaria de agendar um horário na Barbearia Estilo Livre.";
    return `https://wa.me/5511985317522?text=${encodeURIComponent(baseMessage)}`;
  };

  const instagramUrl = "https://instagram.com/a_barbearia_estilolivre";
  const phoneUrl = "tel:+5511985317522";

  return (
    <div className="min-h-screen bg-[#060709] text-[#F4F5F7] selection:bg-[#25D366] selection:text-black font-body overflow-x-hidden antialiased">
      
      {/* ========================================================================= */}
      {/* 1. HEADER: MINIMALISTA, EDITORIAL & RESPONSIVO COM BLUR DINÂMICO         */}
      {/* ========================================================================= */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          hasScrolled 
            ? 'bg-[#060709]/92 backdrop-blur-xl border-b border-white/[0.08] py-4 shadow-2xl shadow-black/80' 
            : 'bg-transparent py-6 border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          {/* Logo Brand: Tipografia Híbrida (Grosso x Elegante) */}
          <a 
            href="#hero" 
            className="flex items-baseline gap-1.5 group select-none tracking-tight"
          >
            <span className="font-display text-xl sm:text-2xl font-black uppercase text-white tracking-tighter">
              ESTILO
            </span>
            <span className="font-serif-sophisticated italic text-2xl sm:text-3xl text-neutral-300 font-normal group-hover:text-white transition-colors">
              Livre
            </span>
          </a>

          {/* CTA & Ações Diretas */}
          <div className="flex items-center gap-4">
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex group items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#25D366] hover:bg-[#20ba59] active:scale-95 rounded-lg shadow-lg shadow-[#25D366]/20 hover:shadow-[#25D366]/35 transition-all duration-200 whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
              <span>Agendar pelo WhatsApp</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Abrir Menu"
              className="lg:hidden p-2 rounded-lg bg-white/[0.05] border border-white/[0.08] text-white hover:bg-white/[0.1] transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden px-6 pt-4 pb-6 bg-[#08090B]/98 border-b border-white/[0.08] backdrop-blur-2xl space-y-4 animate-in fade-in slide-in-from-top-4 duration-200">
            <nav className="flex flex-col space-y-3 text-sm font-mono-num uppercase tracking-wider text-neutral-300">
              <a 
                href="#sobre" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 border-b border-white/[0.04] hover:text-white"
              >
                01. Sobre Nós
              </a>
              <a 
                href="#servicos" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 border-b border-white/[0.04] hover:text-white"
              >
                02. Serviços
              </a>
              <a 
                href="#galeria" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 border-b border-white/[0.04] hover:text-white"
              >
                03. Galeria de Trabalhos
              </a>
              <a 
                href="#espaco" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 border-b border-white/[0.04] hover:text-white"
              >
                04. O Nosso Espaço
              </a>
              <a 
                href="#avaliacoes" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 border-b border-white/[0.04] hover:text-white"
              >
                05. Avaliações
              </a>
              <a 
                href="#contato" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 hover:text-white"
              >
                06. Horários & Contato
              </a>
            </nav>

            <div className="pt-2 flex flex-col gap-3">
              <div className="text-xs font-mono-num text-neutral-400">
                <span className="block text-white font-medium">Seg a Sáb · 09:00 às 21:00</span>
                <span>Zona Leste — São Paulo / SP</span>
              </div>
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-xl bg-[#25D366] text-white font-bold text-center text-xs uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Agendar no WhatsApp: (11) 98531-7522</span>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* ========================================================================= */}
      {/* 2. NOVO HERO: COMPOSIÇÃO EM CAMADAS COM MÁQUINA RECORTADA ANIMADA        */}
      {/* AUTOMÁTICA NO MOBILE E DESKTOP COM ILUMINAÇÃO FÍSICA VERMELHA E AZUL      */}
      {/* ========================================================================= */}
      <section 
        id="hero"
        ref={heroRef}
        className="relative min-h-[92vh] sm:min-h-screen w-full pt-24 sm:pt-28 flex flex-col justify-between overflow-hidden bg-[#060709]"
      >
        {/* Camada 0: Luz Física de Estúdio (Vermelha à Esquerda + Azul Cobalto à Direita) */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          {/* Textura fotográfica cinematográfica de estúdio */}
          <img
            src={heroCinematicBg}
            alt="Atmosfera da Barbearia Estilo Livre"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center opacity-20 scale-105"
          />

          {/* Vinheta atmosférica profunda */}
          <div className="absolute inset-0 bg-radial-vignette" />

          {/* LUZ VERMELHA REAL DE ESTÚDIO (Incidência à esquerda) */}
          <div 
            className="hero-red-beam absolute -top-1/4 -left-1/4 w-[85vw] h-[95vh] rounded-full blur-[140px] pointer-events-none opacity-80"
            style={{
              transform: `translate3d(${mousePos.x * -18}px, ${mousePos.y * -18}px, 0)`
            }}
          />

          {/* LUZ AZUL COBALTO REAL DE ESTÚDIO (Incidência à direita) */}
          <div 
            className="hero-blue-beam absolute -bottom-1/4 -right-1/4 w-[85vw] h-[95vh] rounded-full blur-[140px] pointer-events-none opacity-85"
            style={{
              transform: `translate3d(${mousePos.x * 18}px, ${mousePos.y * 18}px, 0)`
            }}
          />
        </div>

        {/* Barra Superior de Informações Autênticas */}
        <div className="relative z-30 max-w-7xl mx-auto px-6 w-full flex items-center justify-between text-xs text-neutral-400">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
            <span className="font-mono-num tracking-wider uppercase text-neutral-300 text-[11px]">
              Zona Leste · São Paulo / SP
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-neutral-400 font-mono-num text-[11px]">
            <Clock className="w-3.5 h-3.5 text-neutral-400" />
            <span>Segunda a Sábado · 09:00 às 21:00</span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* COMPOSIÇÃO EM CAMADAS: ESTILO -> MÁQUINA RECORTADA -> Livre              */}
        {/* ========================================================================= */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 w-full flex-1 flex flex-col justify-center items-center text-center py-4 sm:py-8">
          
          <div className="relative w-full max-w-6xl mx-auto select-none flex flex-col items-center justify-center">
            
            {/* ------------------------------------------------------------- */}
            {/* CAMADA 1 — TIPOGRAFIA GIGANTE AO FUNDO: "ESTILO"              */}
            {/* ------------------------------------------------------------- */}
            <div className="relative z-10 w-full max-w-full flex justify-center items-center text-center pointer-events-none px-2 sm:px-0">
              <h1 className="hero-title-estilo font-display font-black uppercase text-white/[0.88] drop-shadow-2xl">
                ESTILO
              </h1>
            </div>

            {/* ------------------------------------------------------------- */}
            {/* CAMADA 2 — MÁQUINA RECORTADA ANIMADA (PNG COM TRANSPARÊNCIA)  */}
            {/* ANIMAÇÃO AUTOMÁTICA EM MOBILE E DESKTOP (CSS KEYFRAMES)       */}
            {/* ------------------------------------------------------------- */}
            <div 
              className="relative z-20 -mt-[6vw] sm:-mt-[8vw] md:-mt-[7.5vw] lg:-mt-[7vw] flex justify-center items-center pointer-events-auto"
              style={{
                perspective: '1200px',
                transform: `translate3d(${mousePos.x * 12}px, ${mousePos.y * 12}px, 0)`
              }}
            >
              {/* Sombra de Contato Sincronizada com a Flutuação */}
              <div 
                className="animate-clipper-shadow absolute w-[44vw] sm:w-[36vw] md:w-[30vw] lg:w-[26vw] max-w-[320px] h-8 sm:h-12 bg-black/90 rounded-full pointer-events-none -bottom-6 sm:-bottom-8"
              />

              {/* Contêiner da Máquina com Animação Automática Flutuante Contínua */}
              <div 
                className="animate-clipper-float relative w-[48vw] sm:w-[38vw] md:w-[32vw] lg:w-[28vw] max-w-[340px]"
              >
                <img
                  src={clipperCutoutPng}
                  alt="Máquina de cortar cabelo profissional com lâmina de precisão - Barbearia Estilo Livre"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-contain select-none"
                  style={{
                    filter: 'drop-shadow(0 25px 35px rgba(0, 0, 0, 0.95)) drop-shadow(-18px 0 35px rgba(239, 68, 68, 0.45)) drop-shadow(18px 0 35px rgba(37, 99, 235, 0.45))'
                  }}
                />

                {/* Brilho Especular Reflexivo Dinâmico sobre a Lâmina (Luz de Estúdio) mascarado no formato da máquina */}
                <div 
                  className="absolute inset-0 pointer-events-none opacity-40 mix-blend-screen transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(${115 + mousePos.x * 40}deg, rgba(239,68,68,0.5) 15%, transparent 45%, rgba(37,99,235,0.5) 85%)`,
                    WebkitMaskImage: `url(${clipperCutoutPng})`,
                    maskImage: `url(${clipperCutoutPng})`,
                    WebkitMaskSize: 'contain',
                    maskSize: 'contain',
                    WebkitMaskRepeat: 'no-repeat',
                    maskRepeat: 'no-repeat',
                    WebkitMaskPosition: 'center',
                    maskPosition: 'center'
                  }}
                />
              </div>
            </div>

            {/* ------------------------------------------------------------- */}
            {/* CAMADA 3 — TIPOGRAFIA EM PRIMEIRO PLANO: "Livre"              */}
            {/* ------------------------------------------------------------- */}
            <div 
              className="relative z-30 -mt-[7vw] sm:-mt-[8vw] md:-mt-[7.5vw] lg:-mt-[7vw] pointer-events-none transition-transform duration-300 ease-out flex justify-center items-center text-center w-full"
            >
              <span className="font-serif-sophisticated italic font-normal text-white text-[15vw] sm:text-[13vw] md:text-[11vw] lg:text-[9.5vw] leading-[0.75] sm:leading-[0.72] tracking-tight drop-shadow-[0_25px_35px_rgba(0,0,0,0.95)] block">
                Livre
              </span>
            </div>

          </div>

          {/* Slogan Oficial da Empresa & Subtítulo Honesto */}
          <div className="relative z-30 max-w-xl mx-auto mt-4 sm:mt-6 mb-6">
            <p className="font-serif-sophisticated italic text-2xl sm:text-3xl md:text-4xl text-neutral-100 font-normal">
              “Liberdade para ser quem você é.”
            </p>
            <p className="text-neutral-400 text-xs sm:text-sm mt-2 font-body max-w-md mx-auto">
              Barbearia localizada na Zona Leste de São Paulo. Agende seu horário pelo WhatsApp.
            </p>
          </div>

          {/* CTA de Agendamento Oficial WhatsApp */}
          <div className="relative z-30 flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-md mx-auto">
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 shadow-xl shadow-[#25D366]/25 hover:shadow-[#25D366]/40 active:scale-95"
            >
              <MessageCircle className="w-5 h-5 fill-white text-[#25D366]" />
              <span>Agendar pelo WhatsApp</span>
            </a>

            <a
              href={phoneUrl}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-neutral-300 hover:text-white border border-white/[0.08] text-xs sm:text-sm font-mono-num transition-all duration-200 active:scale-95 whitespace-nowrap"
            >
              <Phone className="w-4 h-4 text-neutral-400" />
              <span>(11) 98531-7522</span>
            </a>
          </div>

        </div>

        {/* Faixa de Rodapé do Hero com Dados de Autoridade */}
        <div className="relative z-20 w-full border-t border-white/[0.08] bg-[#060709]/95 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-400 font-mono-num">
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-neutral-400" />
              <span className="text-neutral-300">Segunda a Sábado:</span>
              <span className="text-white font-semibold">09:00 às 21:00</span>
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-neutral-400" />
              <span className="text-neutral-300">Zona Leste · São Paulo / SP</span>
            </div>

            <div className="flex items-center gap-6">
              <a 
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-neutral-300 hover:text-white transition-colors"
              >
                <Instagram className="w-3.5 h-3.5" />
                <span>@a_barbearia_estilolivre</span>
              </a>

              <a 
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#25D366] hover:underline font-semibold"
              >
                Agendamento via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. SEÇÃO SOBRE: APRESENTAÇÃO EDITORIAL ASSIMÉTRICA COM FADE-IN NO SCROLL  */}
      {/* ========================================================================= */}
      <section 
        id="sobre" 
        ref={sobreReveal.ref}
        className={`py-28 sm:py-36 px-6 max-w-7xl mx-auto border-t border-white/[0.08] transition-all duration-1000 ease-out ${
          sobreReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Coluna de Conteúdo Editorial */}
          <div className="lg:col-span-7 space-y-8">
            <div className="flex items-center gap-3">
              <span className="font-mono-num text-xs uppercase tracking-[0.25em] text-[#25D366]">
                01 / SOBRE NÓS
              </span>
              <div className="h-[1px] w-12 bg-white/[0.1]" />
            </div>

            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.05]">
              Barbearia Estilo Livre
            </h2>

            <p className="text-neutral-300 text-lg sm:text-xl font-normal leading-relaxed">
              Localizada na Zona Leste de São Paulo, a <strong className="text-white font-medium">Barbearia Estilo Livre</strong> atende de segunda a sábado, das 09:00 às 21:00.
            </p>

            <blockquote className="border-l-2 border-[#25D366] pl-6 sm:pl-8 py-2">
              <p className="font-serif-sophisticated italic text-3xl sm:text-4xl text-white font-normal leading-snug">
                “Liberdade para ser quem você é.”
              </p>
              <footer className="text-xs text-neutral-500 font-mono-num mt-3 uppercase tracking-wider">
                Slogan Oficial
              </footer>
            </blockquote>

            <p className="text-neutral-400 text-base leading-relaxed">
              Trabalhamos com cortes de cabelo masculinos e cuidados com a barba, sempre focados no estilo de cada cliente e no atendimento com hora marcada pelo WhatsApp.
            </p>

            <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-white/[0.08] font-mono-num">
              <div>
                <span className="block text-xs uppercase text-neutral-500 tracking-wider">Horário</span>
                <span className="text-white text-sm font-semibold mt-1 block">Seg — Sáb · 09h às 21h</span>
              </div>
              <div>
                <span className="block text-xs uppercase text-neutral-500 tracking-wider">Localização</span>
                <span className="text-white text-sm font-semibold mt-1 block">Zona Leste — SP</span>
              </div>
              <div>
                <span className="block text-xs uppercase text-neutral-500 tracking-wider">WhatsApp</span>
                <a 
                  href={getWhatsAppLink()} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#25D366] text-sm font-semibold mt-1 block hover:underline"
                >
                  (11) 98531-7522
                </a>
              </div>
            </div>
          </div>

          {/* Fotografia 100% Original da Barbearia em Moldura Editorial */}
          <div className="lg:col-span-5">
            <div className="relative group">
              {/* Moldura física de recorte */}
              <div className="relative rounded-2xl overflow-hidden border border-white/[0.1] shadow-2xl bg-neutral-900">
                <img
                  src={barbeariaFotoOriginal}
                  alt="Foto original do espaço da Barbearia Estilo Livre na Zona Leste de São Paulo"
                  referrerPolicy="no-referrer"
                  className="w-full h-[460px] sm:h-[520px] object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-[#060709] via-transparent to-transparent opacity-85" />
                
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                  <div>
                    <span className="text-[11px] font-mono-num text-[#25D366] uppercase tracking-wider block">
                      Espaço Real
                    </span>
                    <h3 className="font-display text-lg font-bold text-white mt-1">
                      Nosso Espaço na Zona Leste
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono-num px-2.5 py-1 rounded bg-white/[0.08] text-neutral-300 border border-white/[0.1]">
                    Foto Original
                  </span>
                </div>
              </div>

              {/* Acento de luz de estúdio vermelho/azul nos cantos */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full bg-blue-600/20 blur-2xl pointer-events-none" />
              <div className="absolute -top-6 -left-6 w-32 h-32 rounded-full bg-red-600/15 blur-2xl pointer-events-none" />
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. NOVA SEÇÃO SERVIÇOS — MENU EDITORIAL DA BARBEARIA ESTILO LIVRE         */}
      {/* ========================================================================= */}
      <section 
        id="servicos" 
        ref={servicosReveal.ref}
        className={`relative py-28 sm:py-36 px-4 sm:px-6 border-t border-white/[0.08] bg-[#060709] transition-all duration-1000 ease-out overflow-hidden ${
          servicosReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
      >
        {/* Sutis feixes de atmosfera de estúdio (vermelho e azul cobalto) */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-red-600/[0.04] blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-blue-600/[0.05] blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto space-y-12 sm:space-y-16">
          
          {/* Header da Seção de Serviços */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/[0.08]">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444]" />
                <span className="font-mono-num text-xs uppercase tracking-[0.25em] text-neutral-400">
                  02 / TABELA OFICIAL
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
              </div>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight uppercase">
                SERVIÇOS
              </h2>
            </div>
            <p className="text-neutral-400 text-sm sm:text-base font-body leading-relaxed max-w-md">
              Escolha seu serviço e reserve seu horário.
            </p>
          </div>

          {/* Barra de Filtros e Busca Rápida */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 pb-2">
            {/* Categorias */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
              <button
                onClick={() => setActiveCategory('todos')}
                className={`px-3.5 py-2 rounded-lg text-xs font-mono-num uppercase tracking-wider transition-all whitespace-nowrap active:scale-95 cursor-pointer ${
                  activeCategory === 'todos'
                    ? 'bg-white text-black font-bold shadow-md'
                    : 'text-neutral-400 hover:text-white bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.08]'
                }`}
              >
                TODOS ({totalServicesCount})
              </button>
              {SERVICE_CATEGORIES.map(category => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-3.5 py-2 rounded-lg text-xs font-mono-num uppercase tracking-wider transition-all whitespace-nowrap active:scale-95 cursor-pointer ${
                    activeCategory === category.id
                      ? 'bg-white text-black font-bold shadow-md'
                      : 'text-neutral-400 hover:text-white bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.08]'
                  }`}
                >
                  {category.name} ({category.services.length})
                </button>
              ))}
            </div>

            {/* Campo de Busca Rápida */}
            <div className="relative w-full lg:w-72 shrink-0">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Pesquise por serviços..."
                className="w-full bg-white/[0.03] hover:bg-white/[0.05] focus:bg-white/[0.08] border border-white/[0.1] focus:border-white/30 rounded-lg px-3.5 py-2 pl-9 text-xs font-mono-num text-white placeholder-neutral-500 focus:outline-none transition-all"
              />
              <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  aria-label="Limpar pesquisa"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white text-xs p-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* LISTA EDITORIAL DE CATEGORIAS E SERVIÇOS */}
          {displayedCategories.length === 0 ? (
            <div className="py-16 text-center space-y-3 border border-dashed border-white/[0.1] rounded-2xl">
              <p className="text-neutral-400 text-sm font-mono-num">
                Nenhum serviço encontrado para "{searchQuery}".
              </p>
              <button
                onClick={() => { setSearchQuery(''); setActiveCategory('todos'); }}
                className="text-xs font-mono-num text-white underline hover:text-neutral-300"
              >
                Limpar filtros de busca
              </button>
            </div>
          ) : (
            <div className="space-y-14 sm:space-y-16">
              {displayedCategories.map((category) => (
                <div key={category.id} className="space-y-2">
                  
                  {/* Cabeçalho da Categoria com Divisor Editorial */}
                  <div className="flex items-center justify-between pb-3 border-b border-white/[0.14]">
                    <div className="flex items-center gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#EF4444] to-[#2563EB]" />
                      <h3 className="font-mono-num text-xs sm:text-sm uppercase tracking-[0.2em] text-white font-bold">
                        {category.name}
                      </h3>
                      <span className="text-xs font-mono-num text-neutral-500">
                        ({category.services.length})
                      </span>
                    </div>
                  </div>

                  {/* Linhas de Serviços da Categoria */}
                  <div className="divide-y divide-white/[0.06]">
                    {category.services.map((service) => (
                      <div
                        key={service.name}
                        className="group relative py-4 sm:py-5 px-3 sm:px-4 transition-all duration-200 hover:bg-white/[0.02] rounded-lg"
                      >
                        {/* Acento sutil vermelho e azul na borda esquerda no hover */}
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-0 group-hover:h-3/5 bg-gradient-to-b from-[#EF4444] to-[#2563EB] transition-all duration-300 rounded-full opacity-0 group-hover:opacity-100 pointer-events-none" />

                        {/* Layout Desktop (md+) */}
                        <div className="hidden md:flex md:items-center justify-between w-full gap-6">
                          {/* Nome do serviço */}
                          <div className="flex-1 min-w-0 pr-4">
                            <h4 className="text-base lg:text-lg font-medium text-white group-hover:text-white transition-colors tracking-tight">
                              {service.name}
                            </h4>
                          </div>

                          {/* Metadados: Duração, Preço e Botão */}
                          <div className="flex items-center gap-6 lg:gap-8 shrink-0">
                            {/* Duração */}
                            <div className="flex items-center gap-1.5 text-neutral-400 font-mono-num text-xs lg:text-sm min-w-[75px]">
                              <Clock className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                              <span>{service.duration}</span>
                            </div>

                            {/* Preço com destaque no promocional */}
                            <div className="text-right min-w-[110px] flex flex-col items-end justify-center">
                              {service.originalPrice && (
                                <span className="text-[11px] font-mono-num text-neutral-500 line-through leading-none mb-1">
                                  {service.originalPrice}
                                </span>
                              )}
                              <span className="text-base lg:text-lg font-mono-num font-bold text-white tracking-tight leading-tight">
                                {service.price}
                              </span>
                            </div>

                            {/* Botão RESERVAR → */}
                            <a
                              href={BOOKSY_URL}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-white/[0.04] hover:bg-white text-neutral-200 hover:text-black border border-white/[0.12] hover:border-white text-xs font-mono-num uppercase tracking-wider font-semibold transition-all duration-200 active:scale-95 group/btn whitespace-nowrap min-h-[38px]"
                            >
                              <span>RESERVAR</span>
                              <span className="transition-transform duration-200 group-hover/btn:translate-x-1">→</span>
                            </a>
                          </div>
                        </div>

                        {/* Layout Mobile (< md) */}
                        <div className="md:hidden flex flex-col gap-2.5">
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="text-[15px] font-medium text-white leading-snug">
                              {service.name}
                            </h4>
                          </div>

                          <div className="flex items-center justify-between gap-3 pt-1">
                            <div className="flex items-baseline gap-2 font-mono-num flex-wrap">
                              <div className="flex items-center gap-1 text-xs text-neutral-400">
                                <Clock className="w-3 h-3 text-neutral-500 shrink-0" />
                                <span>{service.duration}</span>
                              </div>
                              <span className="text-neutral-600 text-xs">•</span>
                              {service.originalPrice && (
                                <span className="text-xs text-neutral-500 line-through">
                                  {service.originalPrice}
                                </span>
                              )}
                              <span className="text-base font-bold text-white">
                                {service.price}
                              </span>
                            </div>

                            {/* Botão RESERVAR Touch Friendly */}
                            <a
                              href={BOOKSY_URL}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg bg-white/[0.06] hover:bg-white text-white hover:text-black border border-white/[0.14] text-xs font-mono-num uppercase tracking-wider font-semibold transition-all duration-200 active:scale-95 whitespace-nowrap min-h-[38px] shrink-0"
                            >
                              <span>RESERVAR</span>
                              <span>→</span>
                            </a>
                          </div>
                        </div>

                      </div>
                    ))}
                  </div>

                </div>
              ))}
            </div>
          )}

          {/* Indicação Discreta Booksy no Final da Seção */}
          <div className="pt-10 mt-12 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-num text-neutral-400">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#2563EB]" />
              <span className="text-neutral-300">Agendamento realizado pelo Booksy.</span>
            </div>
            <a
              href={BOOKSY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-neutral-300 hover:text-white transition-colors group"
            >
              <span>Barbearia Estilo Livre no Booksy</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. GALERIA: COMPOSIÇÃO EDITORIAL ASSIMÉTRICA COM AS 4 FOTOS REAIS         */}
      {/* COM FADE-IN NO SCROLL E LINKS DIRETOS PARA O INSTAGRAM OFICIAL            */}
      {/* ========================================================================= */}
      <section 
        id="galeria" 
        ref={galeriaReveal.ref}
        className={`py-28 sm:py-36 px-6 border-t border-white/[0.08] bg-[#060709] transition-all duration-1000 ease-out ${
          galeriaReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
      >
        <div className="max-w-7xl mx-auto space-y-16">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/[0.08]">
            <div>
              <span className="text-xs font-mono-num uppercase tracking-[0.25em] text-[#25D366] block mb-3">
                03 / TRABALHOS
              </span>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight">
                Galeria
              </h2>
            </div>

            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-mono-num uppercase tracking-wider text-neutral-300 hover:text-[#25D366] transition-colors"
            >
              <Instagram className="w-4 h-4" />
              <span>@a_barbearia_estilolivre no Instagram</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* GRID EDITORIAL ASSIMÉTRICO (Fotos 100% Autênticas) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
            
            {/* Foto 1: Destaque Principal Vertical (Desenho & Cor) */}
            <div className="md:col-span-6 lg:col-span-5 group relative rounded-2xl overflow-hidden border border-white/[0.1] bg-neutral-900 shadow-2xl min-h-[480px]">
              <img
                src={galeriaCorte1}
                alt="Trabalho real da Barbearia Estilo Livre - Desenho e cor"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060709] via-transparent to-transparent opacity-85" />
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                <div>
                  <span className="text-[11px] font-mono-num text-[#25D366] uppercase tracking-wider block">
                    Foto Real
                  </span>
                  <h3 className="font-display text-xl font-bold text-white mt-1">
                    Desenho & Cor
                  </h3>
                </div>
                <a
                  href={getWhatsAppLink("Corte com Desenho e Cor")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-lg bg-white/[0.1] hover:bg-[#25D366] text-white text-xs font-mono-num uppercase tracking-wider transition-colors"
                >
                  Agendar
                </a>
              </div>
            </div>

            {/* Coluna Direita com as Fotos 2, 3 e 4 */}
            <div className="md:col-span-6 lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Foto 2: Penteado & Degradê */}
              <div className="group relative rounded-2xl overflow-hidden border border-white/[0.1] bg-neutral-900 shadow-xl min-h-[280px]">
                <img
                  src={galeriaCorte2}
                  alt="Trabalho real da Barbearia Estilo Livre - Penteado e degradê"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060709] via-transparent to-transparent opacity-85" />
                <div className="absolute bottom-5 left-5 right-5">
                  <span className="text-[11px] font-mono-num text-[#25D366] uppercase tracking-wider block">
                    Foto Real
                  </span>
                  <h3 className="font-display text-base font-bold text-white mt-0.5">
                    Penteado & Degradê
                  </h3>
                </div>
              </div>

              {/* Foto 3: Tranças & Pezinho */}
              <div className="group relative rounded-2xl overflow-hidden border border-white/[0.1] bg-neutral-900 shadow-xl min-h-[280px]">
                <img
                  src={galeriaCorte3}
                  alt="Trabalho real da Barbearia Estilo Livre - Tranças e pezinho alinhado"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060709] via-transparent to-transparent opacity-85" />
                <div className="absolute bottom-5 left-5 right-5">
                  <span className="text-[11px] font-mono-num text-[#25D366] uppercase tracking-wider block">
                    Foto Real
                  </span>
                  <h3 className="font-display text-base font-bold text-white mt-0.5">
                    Tranças & Pezinho
                  </h3>
                </div>
              </div>

              {/* Foto 4: Fade com Risco & Barba (Ocupando a largura da sub-grade) */}
              <div className="sm:col-span-2 group relative rounded-2xl overflow-hidden border border-white/[0.1] bg-neutral-900 shadow-xl min-h-[280px]">
                <img
                  src={galeriaCorte4}
                  alt="Trabalho real da Barbearia Estilo Livre - Fade com risco e barba"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060709] via-transparent to-transparent opacity-85" />
                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                  <div>
                    <span className="text-[11px] font-mono-num text-[#25D366] uppercase tracking-wider block">
                      Foto Real
                    </span>
                    <h3 className="font-display text-lg font-bold text-white mt-0.5">
                      Fade com Risco & Barba
                    </h3>
                  </div>
                  <a
                    href={getWhatsAppLink("Fade com Risco e Barba")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 rounded-lg bg-white/[0.1] hover:bg-[#25D366] text-white text-xs font-mono-num uppercase tracking-wider transition-colors"
                  >
                    Agendar
                  </a>
                </div>
              </div>

            </div>

          </div>

          <div className="text-center pt-4">
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white border border-white/[0.08] text-xs uppercase tracking-wider font-semibold transition-colors"
            >
              <Instagram className="w-4 h-4 text-neutral-300" />
              <span>Ver mais fotos no Instagram @a_barbearia_estilolivre</span>
              <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
            </a>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. ESPAÇO FÍSICO COM A FOTO REAL: PANORÂMICA CINEMATOGRÁFICA COM FADE-IN */}
      {/* ========================================================================= */}
      <section 
        id="espaco" 
        ref={espacoReveal.ref}
        className={`py-28 sm:py-36 px-6 border-t border-white/[0.08] bg-[#0A0B0E]/40 transition-all duration-1000 ease-out ${
          espacoReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
      >
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="max-w-2xl">
            <span className="text-xs font-mono-num uppercase tracking-[0.25em] text-[#25D366] block mb-3">
              04 / AMBIENTE
            </span>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight">
              O Nosso Espaço
            </h2>
            <p className="text-neutral-400 text-base mt-3 leading-relaxed">
              Foto real da Barbearia Estilo Livre, pronta para receber você na Zona Leste de São Paulo.
            </p>
          </div>

          <div className="relative rounded-3xl overflow-hidden border border-white/[0.1] h-[380px] sm:h-[500px] shadow-2xl group">
            <img
              src={barbeariaFotoOriginal}
              alt="Ambiente da Barbearia Estilo Livre em São Paulo"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-[#060709] via-[#060709]/30 to-transparent" />
            
            <div className="absolute bottom-8 left-8 right-8 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
              <div>
                <span className="text-xs font-mono-num text-[#25D366] uppercase tracking-wider block">
                  São Paulo / SP
                </span>
                <p className="font-display text-2xl sm:text-3xl font-black text-white mt-1">
                  Barbearia Estilo Livre — Zona Leste
                </p>
              </div>

              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs uppercase tracking-wider font-semibold transition-all shadow-xl shadow-[#25D366]/20 active:scale-95"
              >
                <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
                <span>Agendar Atendimento</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. AVALIAÇÕES: DEPOIMENTOS REAIS DO GOOGLE MAPS (EDITORIAL & SOFISTICADO) */}
      {/* ========================================================================= */}
      <section 
        id="avaliacoes" 
        ref={avaliacoesReveal.ref}
        className={`py-28 sm:py-36 px-6 border-t border-white/[0.08] bg-[#07080B] relative overflow-hidden transition-all duration-1000 ease-out ${
          avaliacoesReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
      >
        {/* Luzes Físicas de Estúdio Sutis de Fundo */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="hero-red-beam absolute -top-1/3 -left-1/4 w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none opacity-20" />
          <div className="hero-blue-beam absolute -bottom-1/3 -right-1/4 w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none opacity-25" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto space-y-12 sm:space-y-16">
          
          {/* Cabeçalho da Seção com Badge Autêntico do Google Maps */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-white/[0.06]">
            <div className="max-w-2xl">
              <span className="text-xs font-mono-num uppercase tracking-[0.25em] text-[#25D366] block mb-3">
                05 / REPUTAÇÃO
              </span>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight">
                Avaliações Reais
              </h2>
              <p className="text-neutral-400 text-sm sm:text-base mt-3 leading-relaxed">
                Opiniões autênticas e espontâneas de quem frequenta a Barbearia Estilo Livre na Zona Leste de São Paulo.
              </p>
            </div>

            {/* Badge Editorial de Classificação no Google */}
            <a
              href={GOOGLE_MAPS_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3.5 px-5 py-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-white/[0.2] hover:bg-white/[0.06] transition-all group shrink-0"
              title="Ver perfil oficial no Google Maps"
            >
              <div className="w-10 h-10 rounded-xl bg-white/[0.08] border border-white/[0.1] flex items-center justify-center font-bold text-lg text-white">
                G
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-mono-num font-bold text-white text-base">5.0</span>
                  <div className="flex items-center text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
                <span className="text-[11px] text-neutral-400 group-hover:text-white flex items-center gap-1 transition-colors font-mono-num">
                  <span>Avaliações no Google Maps</span>
                  <ExternalLink className="w-3 h-3 text-neutral-500" />
                </span>
              </div>
            </a>
          </div>

          {/* Carrossel / Grade Editorial de Avaliações */}
          <div className="relative">
            {/* Grid no Desktop / Tablet (3 ou 2 colunas visíveis), Slide no Mobile */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[0, 1, 2].map((offset) => {
                const itemIndex = (reviewIndex + offset) % REVIEWS_DATA.length;
                const review = REVIEWS_DATA[itemIndex];
                
                const isHiddenOnMobile = offset > 0 ? 'hidden md:flex' : 'flex';
                const isHiddenOnTablet = offset === 2 ? 'md:hidden lg:flex' : '';

                return (
                  <article
                    key={review.id}
                    className={`${isHiddenOnMobile} ${isHiddenOnTablet} flex-col justify-between p-7 sm:p-8 rounded-2xl bg-[#0B0D11]/90 backdrop-blur-md border border-white/[0.08] hover:border-white/[0.2] transition-all duration-300 relative overflow-hidden group shadow-xl min-h-[320px]`}
                  >
                    {/* Borda superior de acento estilístico sutil */}
                    <div 
                      className={`absolute top-0 left-0 right-0 h-[2px] ${
                        review.accent === 'blue' 
                          ? 'bg-gradient-to-r from-transparent via-[#2563eb] to-transparent opacity-60' 
                          : review.accent === 'red'
                          ? 'bg-gradient-to-r from-transparent via-[#ef4444] to-transparent opacity-60'
                          : 'bg-gradient-to-r from-transparent via-amber-400/60 to-transparent opacity-60'
                      }`}
                    />

                    <div>
                      {/* Topo do Card: 5 Estrelas + Badge Discreto */}
                      <div className="flex items-center justify-between gap-2 mb-6">
                        <div className="flex items-center gap-1 text-amber-400">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                        <span className="text-[10px] font-mono-num uppercase tracking-wider text-neutral-400 bg-white/[0.04] px-2 py-0.5 rounded border border-white/[0.06]">
                          Google Review
                        </span>
                      </div>

                      {/* Ícone de Citação e Texto Original Verbatim */}
                      <Quote className="w-7 h-7 text-white/[0.12] mb-3 group-hover:text-white/[0.2] transition-colors" />
                      <p className="font-body text-neutral-200 text-sm sm:text-[15px] leading-relaxed italic font-normal">
                        “{review.comment}”
                      </p>
                    </div>

                    {/* Rodapé do Card: Identificação Real do Avaliador */}
                    <div className="pt-6 mt-6 border-t border-white/[0.06] flex items-center gap-3.5">
                      {/* Avatar Tipográfico com iniciais autênticas */}
                      <div 
                        className={`w-10 h-10 rounded-full bg-[#12141A] border flex items-center justify-center font-bold text-xs text-white uppercase tracking-wider shrink-0 ${
                          review.accent === 'blue'
                            ? 'border-[#2563eb]/40 text-blue-300'
                            : review.accent === 'red'
                            ? 'border-[#ef4444]/40 text-red-300'
                            : 'border-amber-400/40 text-amber-300'
                        }`}
                      >
                        {review.initials}
                      </div>

                      <div className="min-w-0 flex-1">
                        <h4 className="font-bold text-white text-sm tracking-tight truncate">
                          {review.name}
                        </h4>
                        <span className="text-[11px] text-neutral-400 flex items-center gap-1 font-mono-num mt-0.5">
                          <Check className="w-3 h-3 text-[#25D366] shrink-0" />
                          <span>Cliente verificado</span>
                        </span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Controles de Navegação do Carrossel */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-10">
              
              {/* Indicadores de Paginação / Dots */}
              <div className="flex items-center gap-2">
                {REVIEWS_DATA.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setReviewIndex(idx)}
                    aria-label={`Ver avaliação ${idx + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      reviewIndex === idx 
                        ? 'w-8 bg-[#25D366]' 
                        : 'w-2 bg-white/20 hover:bg-white/40'
                    }`}
                  />
                ))}
              </div>

              {/* Botões Anterior e Próximo */}
              <div className="flex items-center gap-3">
                <button
                  onClick={prevReview}
                  aria-label="Avaliação anterior"
                  className="p-3 rounded-full bg-white/[0.04] border border-white/[0.08] text-white hover:bg-white/[0.1] hover:border-white/[0.2] active:scale-95 transition-all"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-xs font-mono-num text-neutral-400 px-2">
                  <span className="text-white font-bold">{reviewIndex + 1}</span> / {REVIEWS_DATA.length}
                </span>
                <button
                  onClick={nextReview}
                  aria-label="Próxima avaliação"
                  className="p-3 rounded-full bg-white/[0.04] border border-white/[0.08] text-white hover:bg-white/[0.1] hover:border-white/[0.2] active:scale-95 transition-all"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

            </div>

          </div>

          {/* Chamada Final Conectada ao Google Maps */}
          <div className="text-center pt-4">
            <a
              href={GOOGLE_MAPS_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] text-white border border-white/[0.08] hover:border-white/[0.2] text-xs uppercase tracking-wider font-semibold transition-all group"
            >
              <span>Ver todas as avaliações no Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5 text-neutral-400 group-hover:text-white transition-colors" />
            </a>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. HORÁRIOS & CONTATO: LAYOUT ARQUITETURAL MINIMALISTA COM FADE-IN        */}
      {/* ========================================================================= */}
      <section 
        id="contato" 
        ref={contatoReveal.ref}
        className={`py-28 sm:py-36 px-6 border-t border-white/[0.08] bg-[#060709] transition-all duration-1000 ease-out ${
          contatoReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
      >
        <div className="max-w-7xl mx-auto space-y-16">
          
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-mono-num uppercase tracking-[0.25em] text-[#25D366] block mb-3">
              06 / INFORMAÇÕES
            </span>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight">
              Horários & Contato
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Horário de Funcionamento */}
            <div className="p-8 rounded-2xl bg-neutral-900/40 border border-white/[0.08] space-y-4 hover:border-white/[0.16] transition-colors">
              <Clock className="w-7 h-7 text-[#25D366]" />
              <h3 className="font-display text-xl font-bold text-white">Horário de Funcionamento</h3>
              <div className="space-y-1 text-sm text-neutral-400">
                <p>Segunda a Sábado</p>
                <p className="font-mono-num text-3xl font-extrabold text-white">09:00 — 21:00</p>
              </div>
              <p className="text-xs text-neutral-500 pt-4 border-t border-white/[0.08] font-mono-num">
                Agendamentos com hora marcada.
              </p>
            </div>

            {/* Agendamento WhatsApp Principal */}
            <div className="p-8 rounded-2xl bg-neutral-900/40 border border-[#25D366]/40 shadow-xl shadow-[#25D366]/5 space-y-4 hover:border-[#25D366] transition-colors">
              <MessageCircle className="w-7 h-7 fill-[#25D366] text-neutral-900" />
              <h3 className="font-display text-xl font-bold text-white">Agendamento</h3>
              <div className="space-y-1">
                <p className="text-xs text-neutral-400 uppercase font-mono-num">WhatsApp:</p>
                <a 
                  href={getWhatsAppLink()} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-mono-num text-3xl font-extrabold text-[#25D366] hover:underline block"
                >
                  (11) 98531-7522
                </a>
              </div>
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-xs uppercase tracking-wider transition-colors mt-2"
              >
                <span>Chamar no WhatsApp</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

            {/* Localização & Instagram */}
            <div className="p-8 rounded-2xl bg-neutral-900/40 border border-white/[0.08] space-y-4 hover:border-white/[0.16] transition-colors">
              <MapPin className="w-7 h-7 text-[#25D366]" />
              <h3 className="font-display text-xl font-bold text-white">Local & Instagram</h3>
              <div className="space-y-2 text-sm text-neutral-400">
                <p className="text-white font-medium">Zona Leste — São Paulo / SP</p>
                <p className="pt-2 text-xs uppercase font-mono-num text-neutral-500">Instagram</p>
                <a 
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-200 hover:text-[#25D366] font-mono-num block transition-colors text-base"
                >
                  @a_barbearia_estilolivre
                </a>
              </div>
              <div className="pt-4 border-t border-white/[0.08]">
                <a 
                  href={phoneUrl} 
                  className="text-xs text-neutral-400 hover:text-white font-mono-num transition-colors inline-flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Telefone: (11) 98531-7522</span>
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. CTA FINAL: CAMPANHA DE ALTO IMPACTO COM TIPOGRAFIA MONUMENTAL          */}
      {/* ========================================================================= */}
      <section className="relative py-32 px-6 border-t border-white/[0.08] overflow-hidden bg-[#060709]">
        {/* Feixes de iluminação física de estúdio */}
        <div className="hero-red-beam absolute -top-1/3 -left-1/4 w-[60vw] h-[80vh] rounded-full blur-[140px] pointer-events-none opacity-40" />
        <div className="hero-blue-beam absolute -bottom-1/3 -right-1/4 w-[60vw] h-[80vh] rounded-full blur-[140px] pointer-events-none opacity-40" />

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
          
          <span className="text-xs font-mono-num uppercase tracking-[0.25em] text-[#25D366] block">
            Barbearia Estilo Livre
          </span>

          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight uppercase leading-[0.95]">
            Liberdade para ser quem você é.
          </h2>

          <p className="text-neutral-400 text-base sm:text-xl max-w-xl mx-auto font-body">
            Entre em contato pelo WhatsApp e marque o seu horário na Zona Leste de São Paulo.
          </p>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm uppercase tracking-wider transition-all duration-200 shadow-2xl shadow-[#25D366]/30 hover:shadow-[#25D366]/50 active:scale-95"
            >
              <MessageCircle className="w-5 h-5 fill-white text-[#25D366]" />
              <span>Agendar pelo WhatsApp</span>
            </a>

            <a
              href={phoneUrl}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-white border border-white/[0.1] text-sm font-mono-num transition-all duration-200 active:scale-95"
            >
              <Phone className="w-4 h-4 text-neutral-400" />
              <span>(11) 98531-7522</span>
            </a>
          </div>

          <p className="text-xs text-neutral-500 font-mono-num pt-4">
            Segunda a Sábado, das 09:00 às 21:00.
          </p>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. FOOTER INSTITUCIONAL EDITORIAL                                         */}
      {/* ========================================================================= */}
      <footer className="border-t border-white/[0.08] pt-14 pb-28 md:pb-14 px-6 bg-[#060709]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="text-center md:text-left">
            <div className="flex items-baseline gap-1.5 justify-center md:justify-start">
              <span className="font-display text-xl font-black uppercase tracking-tight text-white">
                ESTILO
              </span>
              <span className="font-serif-sophisticated italic text-2xl text-neutral-300 font-normal">
                Livre
              </span>
            </div>
            <p className="text-xs text-neutral-500 mt-2 font-body">
              “Liberdade para ser quem você é.” · Zona Leste, São Paulo / SP.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 text-xs font-mono-num text-neutral-400 uppercase tracking-wider">
            <a 
              href={instagramUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-white transition-colors flex items-center gap-1.5"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span>Instagram</span>
            </a>

            <a 
              href={getWhatsAppLink()} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-[#25D366] transition-colors flex items-center gap-1.5"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>

            <a 
              href={phoneUrl} 
              className="hover:text-white transition-colors flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>(11) 98531-7522</span>
            </a>
          </div>

        </div>

        <div className="max-w-7xl mx-auto mt-10 pt-8 border-t border-white/[0.04] text-center text-[11px] font-mono-num text-neutral-600">
          <p>© {new Date().getFullYear()} Barbearia Estilo Livre. Todos os direitos reservados. Zona Leste — São Paulo / SP.</p>
        </div>
      </footer>

      {/* ========================================================================= */}
      {/* 10. MOBILE FLOATING WHATSAPP BAR: ACESSO IMEDIATO A 1 TOQUE              */}
      {/* ========================================================================= */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 p-3 bg-[#060709]/95 backdrop-blur-xl border-t border-white/[0.1] shadow-2xl">
        <a
          href={getWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] active:scale-95 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#25D366]/30 transition-all"
        >
          <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
          <span>Agendar pelo WhatsApp (11) 98531-7522</span>
        </a>
      </div>

    </div>
  );
}

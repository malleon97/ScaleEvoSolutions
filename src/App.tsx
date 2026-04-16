import React, { useState, useEffect, useRef, FormEvent } from 'react';
import emailjs from '@emailjs/browser';
import { motion, AnimatePresence, useInView, useAnimation } from 'motion/react';
import {
  Zap,
  Monitor,
  Filter,
  Settings,
  CheckCircle2,
  ChevronDown,
  Menu,
  X,
  ArrowRight,
  TrendingUp,
  Users,
  Clock,
  Linkedin,
  Instagram,
  Twitter,
  AlertCircle,
  MessageSquare,
  BarChart3
} from 'lucide-react';

// --- Components ---

const Counter = ({ value, suffix = "", prefix = "" }: { value: string, suffix?: string, prefix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const numericValue = parseInt(value.replace(/[^0-9]/g, ''));

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = numericValue;
      const duration = 2000;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, numericValue]);

  return (
    <span ref={ref} className="font-display font-bold">
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
};

const AccordionItem: React.FC<{ question: string, answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-border-subtle">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex justify-between items-center text-left hover:text-primary-glow transition-colors"
      >
        <span className="text-lg font-semibold pr-8">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-text-secondary leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormStatus('loading');
    await emailjs.sendForm('service_brogf5z', 'template_6qle42j', e.target);
    setTimeout(() => setFormStatus('success'), 1500);
  };

  const navLinks = [
    { name: 'Inicio', href: '#inicio' },
    { name: 'Servicios', href: '#servicios' },
    { name: 'Resultados', href: '#resultados' },
    { name: 'Cómo funciona', href: '#como-funciona' },
    { name: 'Precios', href: '#precios' },
    { name: 'Contacto', href: '#contacto' },
  ];

  return (
    <div className="min-h-screen selection:bg-primary selection:text-white">
      {/* Announcement Bar */}
      <div className="announcement-bar py-2 text-center overflow-hidden">
        <p className="text-amber text-[11px] uppercase tracking-[1px] font-semibold">
          🔥 Plazas limitadas este mes — Solo quedan 3 spots disponibles para auditoría
        </p>
      </div>

      {/* Navigation */}
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'glass-nav py-3' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <a href="#inicio" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center glow-blue group-hover:scale-110 transition-transform">
              <Zap className="text-white w-6 h-6 fill-current" />
            </div>
            <span className="text-2xl font-display font-bold tracking-tight">
              Scale <span className="text-primary-glow">Evo Solutions</span>
            </span>
          </a>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-text-secondary hover:text-primary-glow font-medium transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contacto"
              className="bg-primary hover:bg-primary/80 text-white px-4 py-2 rounded-sm font-semibold transition-all glow-blue flex items-center gap-2 text-[13px]"
            >
              Quiero escalar mi negocio →
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="lg:hidden text-text-main" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 w-full bg-bg-secondary border-b border-border-subtle p-6 lg:hidden"
            >
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-lg font-medium text-text-secondary hover:text-primary-glow"
                  >
                    {link.name}
                  </a>
                ))}
                <a
                  href="#contacto"
                  onClick={() => setIsMenuOpen(false)}
                  className="bg-primary text-white px-6 py-4 rounded-xl font-bold text-center"
                >
                  Quiero escalar mi negocio
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="inicio" className="relative pt-20 pb-32 overflow-hidden grid-bg">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
            <div className="flex flex-col items-start text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary text-primary-glow text-[11px] font-semibold mb-6 uppercase tracking-[0.5px]"
              >
                Sistema probado en +40 negocios
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-[48px] font-display font-bold leading-[1.1] mb-6 tracking-[-1px]"
              >
                Tu negocio está perdiendo clientes que <span className="text-primary-glow">ya pagaste</span> para conseguir.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg text-text-secondary max-w-[500px] mb-8 leading-[1.5]"
              >
                Scale Evo Solutions automatiza tu captación, reactiva tus leads dormidos y gestiona tu CRM — para que consigas más ventas sin trabajar el doble.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <a href="#contacto" className="bg-primary hover:bg-primary/80 text-white px-7 py-3.5 rounded-md font-semibold text-[15px] transition-all glow-blue flex items-center justify-center gap-2 group">
                  Consigue tu auditoría gratis →
                </a>
                <a href="#servicios" className="border border-primary text-primary-glow px-7 py-3.5 rounded-md font-semibold text-[15px] transition-all flex items-center justify-center gap-2">
                  Ver cómo funciona ↓
                </a>
              </motion.div>
            </div>

            {/* Dashboard Mockup */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="relative"
            >
              <div className="bg-bg-secondary border border-border-subtle rounded-lg p-4 md:p-6 shadow-[0_20px_40px_rgba(0,0,0,0.4)] border-t-2 border-t-primary overflow-hidden h-[380px]">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-2 h-2 rounded-full bg-[#ff5f57]" />
                  <div className="w-2 h-2 rounded-full bg-[#febc2e]" />
                  <div className="w-2 h-2 rounded-full bg-[#28c840]" />
                  <div className="ml-auto text-[10px] font-mono opacity-50">CRM_PIPELINE_ACTIVE</div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white/5 rounded-md p-3 border border-border-subtle">
                    <span className="text-[10px] text-text-muted block mb-1 uppercase tracking-wider">Leads Reactivados</span>
                    <span className="text-lg font-mono font-bold text-success">+248</span>
                  </div>
                  <div className="bg-white/5 rounded-md p-3 border border-border-subtle">
                    <span className="text-[10px] text-text-muted block mb-1 uppercase tracking-wider">ROI Generado</span>
                    <span className="text-lg font-mono font-bold text-success">14.2x</span>
                  </div>
                </div>
                <div className="text-[10px] text-text-muted uppercase mb-2">Tasa de Conversión (Semanas 1-8)</div>
                <div className="h-40 flex items-end gap-2 pt-4">
                  {[30, 45, 35, 60, 55, 90, 100].map((h, i) => (
                    <div
                      key={i}
                      className={`flex-1 rounded-t-sm transition-all duration-1000 ${i >= 5 ? 'bg-primary-glow opacity-100' : 'bg-primary opacity-40'}`}
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-[80px]" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary-glow/20 rounded-full blur-[80px]" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Metrics Bar */}
      <section className="metric-grid">
        <div className="metric-item">
          <div className="text-2xl font-display font-bold text-primary-glow mb-1">
            <Counter value="+340" suffix="%" />
          </div>
          <p className="text-[11px] text-text-muted uppercase tracking-[0.5px] font-semibold">Conversión Media</p>
        </div>
        <div className="metric-item">
          <div className="text-2xl font-display font-bold text-primary-glow mb-1">
            <Counter value="21" suffix=" días" />
          </div>
          <p className="text-[11px] text-text-muted uppercase tracking-[0.5px] font-semibold">Implementación</p>
        </div>
        <div className="metric-item">
          <div className="text-2xl font-display font-bold text-primary-glow mb-1">
            <Counter value="87" suffix="%" />
          </div>
          <p className="text-[11px] text-text-muted uppercase tracking-[0.5px] font-semibold">Lead Reactivation</p>
        </div>
        <div className="metric-item">
          <div className="text-2xl font-display font-bold text-primary-glow mb-1">
            <Counter value="3.2" suffix="M€" />
          </div>
          <p className="text-[11px] text-text-muted uppercase tracking-[0.5px] font-semibold">Ventas Atribuidas</p>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-32 bg-bg-tertiary">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl mb-6">¿Te suena familiar?</h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              La mayoría de los negocios no tienen un problema de producto, tienen un problema de sistema.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {[
              {
                icon: <AlertCircle className="text-amber w-8 h-8" />,
                text: "Tienes leads en el CRM que nunca contestaron — y ahí siguen, muertos, costándote dinero que ya gastaste."
              },
              {
                icon: <Monitor className="text-amber w-8 h-8" />,
                text: "Tu web tiene visitas pero no convierte. No sabes por qué. Cambias cosas y nada mejora."
              },
              {
                icon: <Clock className="text-amber w-8 h-8" />,
                text: "Haces seguimiento manual por WhatsApp o Excel. Se te escapan clientes todos los días sin darte cuenta."
              },
              {
                icon: <Filter className="text-amber w-8 h-8" />,
                text: "Pagas en publicidad, consigues leads, pero el 70% nunca llega a comprar porque nadie les da seguimiento rápido."
              },
              {
                icon: <Users className="text-amber w-8 h-8" />,
                text: "No tienes sistema. Tienes un negocio que depende de ti 100% — y eso tiene un techo muy bajo."
              },
              {
                icon: <Settings className="text-amber w-8 h-8" />,
                text: "Sabes que necesitas mejorar esto, pero no tienes tiempo, ni el equipo técnico para montarlo."
              }
            ].map((pain, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="bg-bg-secondary p-8 rounded-2xl border border-border-subtle hover:border-amber/40 transition-all"
              >
                <div className="mb-6">{pain.icon}</div>
                <p className="text-text-main text-lg leading-relaxed">{pain.text}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <h3 className="text-3xl md:text-4xl font-display font-bold text-primary-glow">Eso termina aquí.</h3>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="servicios" className="py-32 bg-bg-main relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl mb-8">Un sistema completo que trabaja por ti. <span className="text-primary-glow">24 horas. 7 días.</span></h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              No vendemos herramientas. Construimos el sistema entero, lo configuramos y lo dejamos funcionando en tu negocio.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Pilar 1 */}
            <motion.div
              whileHover={{ y: -10 }}
              className="bg-bg-secondary p-10 rounded-3xl border-t-4 border-t-primary border-x border-b border-border-subtle glow-blue-hover transition-all"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-8">
                <Monitor className="text-primary w-8 h-8" />
              </div>
              <h3 className="text-2xl mb-6">WEB DE ALTA CONVERSIÓN</h3>
              <p className="text-text-secondary mb-8 leading-relaxed">
                Diseñamos y construimos webs que convierten visitantes en leads. Arquitectura de conversión, copywriting persuasivo y diseño que transmite autoridad. No una web bonita. Una máquina de captar clientes.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Landing pages', 'Webs corporativas', 'Funnels de venta'].map(tag => (
                  <span key={tag} className="text-xs font-bold px-3 py-1 bg-bg-tertiary rounded-full text-text-muted border border-border-subtle">{tag}</span>
                ))}
              </div>
            </motion.div>

            {/* Pilar 2 */}
            <motion.div
              whileHover={{ y: -10 }}
              className="bg-bg-secondary p-10 rounded-3xl border-t-4 border-t-primary border-x border-b border-border-subtle glow-blue-hover transition-all"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-8">
                <Zap className="text-primary w-8 h-8" />
              </div>
              <h3 className="text-2xl mb-6">CAPTACIÓN Y LEAD REACTIVATION</h3>
              <p className="text-text-secondary mb-8 leading-relaxed">
                Montamos tu sistema de captación automatizado y reactivamos los leads que ya tienes dormidos en tu CRM. El 87% de los leads que no convirtieron tienen una segunda oportunidad — solo hay que saber cómo hablarles.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Email automation', 'WhatsApp flows', 'Lead scoring'].map(tag => (
                  <span key={tag} className="text-xs font-bold px-3 py-1 bg-bg-tertiary rounded-full text-text-muted border border-border-subtle">{tag}</span>
                ))}
              </div>
            </motion.div>

            {/* Pilar 3 */}
            <motion.div
              whileHover={{ y: -10 }}
              className="bg-bg-secondary p-10 rounded-3xl border-t-4 border-t-primary border-x border-b border-border-subtle glow-blue-hover transition-all"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-8">
                <Settings className="text-primary w-8 h-8" />
              </div>
              <h3 className="text-2xl mb-6">CRM Y AUTOMATIZACIÓN</h3>
              <p className="text-text-secondary mb-8 leading-relaxed">
                Implementamos y configuramos tu CRM completo con todas las automatizaciones activas: seguimientos, recordatorios, nurturing y reporting. Tu equipo de ventas cerrará más con menos esfuerzo.
              </p>
              <div className="flex flex-wrap gap-2">
                {['CRM setup', 'Pipeline automation', 'Integraciones'].map(tag => (
                  <span key={tag} className="text-xs font-bold px-3 py-1 bg-bg-tertiary rounded-full text-text-muted border border-border-subtle">{tag}</span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="como-funciona" className="py-32 bg-bg-tertiary relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl mb-6">De cero a sistema funcionando en 21 días</h2>
          </div>

          <div className="relative">
            {/* Connector Line */}
            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-1 bg-primary/20 -translate-y-1/2" />

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 relative z-10">
              {[
                { step: '01', title: 'AUDITORÍA', days: 'Días 1-3', desc: 'Analizamos tu negocio: qué tienes, qué falta y dónde estás perdiendo clientes y dinero. Sin coste.' },
                { step: '02', title: 'DISEÑO', days: 'Días 4-8', desc: 'Diseñamos la arquitectura completa: web, funnels, CRM y flujos de reactivación. Todo conectado.' },
                { step: '03', title: 'IMPLEMENTACIÓN', days: 'Días 9-18', desc: 'Construimos y configuramos todo. Integraciones, automatizaciones activas, testing completo.' },
                { step: '04', title: 'LANZAMIENTO', days: 'Día 19-21+', desc: 'Lanzamos, medimos resultados y optimizamos. Seguimiento mensual incluido para mejorar.' }
              ].map((item, i) => (
                <div key={i} className="bg-bg-secondary p-8 rounded-2xl border border-border-subtle relative">
                  <span className="text-5xl font-display font-bold text-primary/10 absolute top-4 right-4">{item.step}</span>
                  <span className="text-primary-glow font-mono text-sm block mb-2">{item.days}</span>
                  <h4 className="text-xl font-bold mb-4">{item.title}</h4>
                  <p className="text-text-secondary text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 flex justify-center">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-success/10 border border-success/30 text-success text-sm font-bold">
              <CheckCircle2 className="w-5 h-5" /> Garantía de resultados o devolvemos el dinero en los primeros 30 días
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section id="resultados" className="py-32 bg-bg-main">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl mb-6">Números reales de negocios reales</h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
            {[
              { val: '+340%', label: 'Aumento en conversión' },
              { val: '21', label: 'Días implementación', suffix: ' días' },
              { val: '87%', label: 'Tasa reactivación' },
              { val: '3.2', label: 'Ventas generadas', prefix: '', suffix: 'M€' }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-5xl md:text-7xl font-display font-bold text-primary-glow mb-4">
                  <Counter value={stat.val} prefix={stat.prefix} suffix={stat.suffix} />
                </div>
                <p className="text-text-muted font-semibold uppercase tracking-widest text-sm">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Carlos M.",
                role: "Director de clínica",
                company: "Clínica dental en Madrid",
                text: "Pasamos de 12 a 47 leads mensuales en 6 semanas. El sistema de reactivación recuperó 23 pacientes que llevaban +6 meses sin visitar la clínica.",
                result: "+290% Leads"
              },
              {
                name: "Laura S.",
                role: "Fundadora",
                company: "Academia de formación online",
                text: "Nuestra tasa de conversión web pasó de 1,2% a 4,8%. Las automatizaciones del CRM nos ahorran 15 horas semanales de trabajo manual.",
                result: "4.8% Conv."
              },
              {
                name: "Marcos T.",
                role: "CEO",
                company: "Empresa de reformas",
                text: "Tenía 340 leads en el CRM que nunca habían comprado. Reactivamos 89 de ellos y cerramos 31 presupuestos en el primer mes.",
                result: "31 Ventas"
              }
            ].map((caseStudy, i) => (
              <div key={i} className="bg-bg-secondary p-8 rounded-3xl border border-border-subtle flex flex-col h-full">
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, j) => <Zap key={j} className="w-4 h-4 text-amber fill-current" />)}
                </div>
                <p className="text-text-main text-lg italic mb-8 flex-grow leading-relaxed">"{caseStudy.text}"</p>
                <div className="flex items-center gap-4 border-t border-border-subtle pt-6">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center font-bold text-primary-glow">
                    {caseStudy.name[0]}
                  </div>
                  <div>
                    <h5 className="font-bold">{caseStudy.name}</h5>
                    <p className="text-xs text-text-muted">{caseStudy.role} · {caseStudy.company}</p>
                  </div>
                  <div className="ml-auto bg-success/10 text-success text-xs font-bold px-3 py-1 rounded-full">
                    {caseStudy.result}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="precios" className="py-32 bg-bg-tertiary">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl mb-6">Elige el nivel de escala que necesitas</h2>
            <p className="text-text-secondary text-lg">Sin contratos de permanencia. Sin sorpresas. Precio fijo, resultados claros.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {/* Plan Starter */}
            <div className="bg-bg-secondary p-10 rounded-3xl border border-border-subtle flex flex-col">
              <h3 className="text-2xl mb-2">Plan STARTER</h3>
              <p className="text-text-muted text-sm mb-8">Para negocios que quieren empezar con el pie derecho</p>
              <div className="mb-8">
                <span className="text-5xl font-display font-bold">1.497€</span>
                <span className="text-text-muted text-sm ml-2">pago único</span>
              </div>
              <ul className="space-y-4 mb-10 flex-grow">
                {['Web de alta conversión (5 pág)', 'Setup básico de CRM', '1 automatización de seguimiento', 'Auditoría inicial', '30 días de soporte'].map(item => (
                  <li key={item} className="flex items-center gap-3 text-text-secondary text-sm">
                    <CheckCircle2 className="w-4 h-4 text-primary-glow" /> {item}
                  </li>
                ))}
              </ul>
              <a href="#contacto" className="w-full py-4 rounded-xl border border-primary text-primary-glow font-bold text-center hover:bg-primary/10 transition-colors">
                Empezar con Starter
              </a>
            </div>

            {/* Plan Growth */}
            <div className="bg-bg-secondary p-10 rounded-3xl border-2 border-primary glow-blue relative flex flex-col scale-105 z-10">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                Más popular
              </div>
              <h3 className="text-2xl mb-2">Plan GROWTH</h3>
              <p className="text-text-muted text-sm mb-8">Para negocios que quieren un sistema completo</p>
              <div className="mb-8">
                <span className="text-5xl font-display font-bold">2.997€</span>
                <span className="text-text-muted text-sm ml-2">pago único</span>
                <p className="text-primary-glow text-xs font-bold mt-2">+ 497€/mes mantenimiento</p>
              </div>
              <ul className="space-y-4 mb-10 flex-grow">
                {['Todo lo de Starter', 'Web completa con funnel', 'CRM completo con pipelines', 'Campaña lead reactivation', '5 automatizaciones activas', 'Reporting mensual', 'Soporte prioritario'].map(item => (
                  <li key={item} className="flex items-center gap-3 text-text-secondary text-sm">
                    <CheckCircle2 className="w-4 h-4 text-primary-glow" /> {item}
                  </li>
                ))}
              </ul>
              <a href="#contacto" className="w-full py-4 rounded-xl bg-primary text-white font-bold text-center hover:bg-primary/80 transition-colors glow-blue">
                Quiero el sistema completo
              </a>
            </div>

            {/* Plan Scale */}
            <div className="bg-bg-secondary p-10 rounded-3xl border border-border-subtle flex flex-col">
              <h3 className="text-2xl mb-2">Plan SCALE</h3>
              <p className="text-text-muted text-sm mb-8">Para negocios que quieren escala total</p>
              <div className="mb-8">
                <span className="text-4xl font-display font-bold">Desde 5.997€</span>
                <p className="text-text-muted text-sm mt-2">Hablemos</p>
              </div>
              <ul className="space-y-4 mb-10 flex-grow">
                {['Todo lo de Growth', 'Estrategia custom completa', 'Integración con ads y redes', 'Equipo dedicado', 'Reunión semanal optimización', 'SLA de resultados garantizados'].map(item => (
                  <li key={item} className="flex items-center gap-3 text-text-secondary text-sm">
                    <CheckCircle2 className="w-4 h-4 text-primary-glow" /> {item}
                  </li>
                ))}
              </ul>
              <a href="#contacto" className="w-full py-4 rounded-xl border border-primary text-primary-glow font-bold text-center hover:bg-primary/10 transition-colors">
                Solicitar propuesta personalizada
              </a>
            </div>
          </div>

          <p className="text-center mt-12 text-text-muted text-sm">
            ¿No sabes cuál es el tuyo? <a href="#contacto" className="text-primary-glow underline">Empieza por la auditoría gratuita</a> y te lo decimos.
          </p>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-32 bg-bg-main">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="w-full aspect-square bg-bg-secondary rounded-3xl border border-border-subtle overflow-hidden flex items-center justify-center">
                <div className="w-48 h-48 bg-primary/20 rounded-full flex items-center justify-center text-8xl font-display font-bold text-primary-glow">
                  SS
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-primary p-8 rounded-2xl glow-blue hidden md:block">
                <span className="text-4xl font-display font-bold text-white block">40+</span>
                <span className="text-white/80 text-xs font-bold uppercase tracking-widest">Proyectos</span>
              </div>
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl mb-8">Quién hay detrás de Scale Evo Solutions</h2>
              <p className="text-text-secondary text-lg mb-6 leading-relaxed">
                Empecé construyendo sistemas para mis propios proyectos y pronto vi que la mayoría de negocios dejaban millones en la mesa simplemente por no tener las herramientas correctas bien configuradas.
              </p>
              <p className="text-text-secondary text-lg mb-10 leading-relaxed">
                No creo en la teoría de las agencias tradicionales. Creo en sistemas reales que generan resultados medibles. Mi objetivo es que tu tecnología trabaje para ti, no al revés.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                {[
                  'Certificado en GoHighLevel y HubSpot',
                  '+40 proyectos implementados',
                  'Especialista en automatización B2B',
                  'Partner de herramientas líderes'
                ].map(item => (
                  <div key={item} className="flex items-center gap-3 text-text-main font-medium">
                    <CheckCircle2 className="w-5 h-5 text-primary-glow" /> {item}
                  </div>
                ))}
              </div>

              <blockquote className="border-l-4 border-primary pl-6 py-2 italic text-xl text-text-main">
                "La diferencia entre un negocio que escala y uno que se estanca no es el producto. Es el sistema."
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 bg-bg-tertiary">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl text-center mb-16">Preguntas frecuentes</h2>
          <div className="space-y-2">
            {[
              { q: "¿Cuánto tiempo tardáis en tener el sistema listo?", a: "Nuestro proceso estándar dura exactamente 21 días desde la firma hasta el lanzamiento completo. Tenemos una metodología paso a paso para asegurar que no se pierde ni un día." },
              { q: "¿Necesito tener conocimientos técnicos?", a: "Absolutamente ninguno. Nosotros nos encargamos de toda la parte técnica, integraciones y configuración. Una vez listo, te entregamos un sistema que es tan fácil de usar como revisar tu email." },
              { q: "¿Funcionará esto para mi sector específico?", a: "Hemos trabajado con clínicas, academias, inmobiliarias y servicios profesionales. Si tu negocio necesita captar leads y hacerles seguimiento para cerrar ventas, nuestro sistema funcionará para ti." },
              { q: "¿Qué pasa si no veo resultados en el primer mes?", a: "Ofrecemos una garantía de satisfacción total de 30 días. Si el sistema no cumple con lo prometido o no estás satisfecho con la implementación, te devolvemos el dinero." },
              { q: "¿Trabajáis con algún CRM en concreto?", a: "Somos especialistas en GoHighLevel, HubSpot y Pipedrive, pero podemos adaptarnos a la herramienta que ya uses o recomendarte la mejor para tu caso específico." },
              { q: "¿Puedo empezar solo con la web?", a: "Sí, puedes empezar con el Plan Starter y escalar a Growth cuando estés listo para automatizar el seguimiento y la reactivación de leads." },
              { q: "¿Qué diferencia a Scale Evo Solutions de una agencia normal?", a: "Las agencias normales te venden 'visibilidad' o 'branding'. Nosotros vendemos sistemas de conversión. No nos importa cuántos likes tengas, nos importa cuánto dinero entra en tu cuenta gracias a nuestras automatizaciones." }
            ].map((faq, i) => (
              <AccordionItem key={i} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 bg-bg-main relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-bg-main to-bg-secondary opacity-50" />
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="bg-bg-secondary border border-border-subtle p-12 md:p-20 rounded-[40px] glow-blue"
          >
            <h2 className="text-4xl md:text-6xl mb-8">Tu competencia ya está automatizando. <span className="text-primary-glow">¿Cuándo empiezas tú?</span></h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto mb-12">
              Auditoría gratuita de 45 minutos. Analizamos tu situación y te decimos exactamente qué sistema necesitas y cuánto te costará.
            </p>
            <div className="flex flex-col items-center gap-6">
              <a href="#contacto" className="bg-primary hover:bg-primary/80 text-white px-10 py-6 rounded-2xl font-bold text-xl transition-all glow-blue flex items-center gap-3">
                Reservar mi auditoría gratuita <ArrowRight className="w-6 h-6" />
              </a>
              <div className="flex flex-wrap justify-center gap-6 text-text-muted text-sm font-semibold">
                <span>Ya han pasado +40 negocios</span>
                <span>·</span>
                <span>Respuesta en menos de 24h</span>
                <span>·</span>
                <span>Sin compromiso</span>
              </div>
              <p className="text-amber font-bold text-sm uppercase tracking-widest mt-4">
                Solo aceptamos 3 nuevos proyectos al mes para garantizar calidad
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contacto" className="py-32 bg-bg-tertiary">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl mb-4">Cuéntanos sobre tu negocio</h2>
            <p className="text-text-secondary">Rellena el formulario y agendaremos tu auditoría gratuita.</p>
          </div>

          <div className="bg-bg-secondary p-8 md:p-12 rounded-3xl border border-border-subtle">
            {formStatus === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-8">
                  <CheckCircle2 className="text-success w-10 h-10" />
                </div>
                <h3 className="text-3xl font-bold mb-4">¡Perfecto!</h3>
                <p className="text-text-secondary text-lg">Hemos recibido tu solicitud. Nos pondremos en contacto contigo en menos de 4 horas.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-text-muted">Nombre completo</label>
                    <input required type="text" className="w-full bg-bg-main border border-border-subtle rounded-xl px-4 py-4 focus:border-primary outline-none transition-colors" placeholder="Ej. Juan Pérez" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-text-muted">Email de empresa</label>
                    <input required type="email" className="w-full bg-bg-main border border-border-subtle rounded-xl px-4 py-4 focus:border-primary outline-none transition-colors" placeholder="juan@empresa.com" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-text-muted">Teléfono</label>
                    <input required type="tel" className="w-full bg-bg-main border border-border-subtle rounded-xl px-4 py-4 focus:border-primary outline-none transition-colors" placeholder="+34 600 000 000" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-text-muted">Tipo de negocio</label>
                    <select className="w-full bg-bg-main border border-border-subtle rounded-xl px-4 py-4 focus:border-primary outline-none transition-colors">
                      <option>Clínica / Salud</option>
                      <option>Academia / Formación</option>
                      <option>Servicios profesionales</option>
                      <option>E-commerce</option>
                      <option>Inmobiliaria</option>
                      <option>Otro</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-text-muted">¿Cuál es tu principal problema ahora mismo?</label>
                  <select className="w-full bg-bg-main border border-border-subtle rounded-xl px-4 py-4 focus:border-primary outline-none transition-colors">
                    <option>No tengo suficientes leads</option>
                    <option>Tengo leads pero no convierten</option>
                    <option>No tengo sistema de seguimiento</option>
                    <option>Mi web no convierte</option>
                    <option>Quiero automatizar mi CRM</option>
                    <option>Todo lo anterior</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-text-muted">Mensaje libre (opcional)</label>
                  <textarea rows={4} className="w-full bg-bg-main border border-border-subtle rounded-xl px-4 py-4 focus:border-primary outline-none transition-colors" placeholder="Cuéntanos un poco más..."></textarea>
                </div>
                <button
                  disabled={formStatus === 'loading'}
                  className="w-full bg-primary hover:bg-primary/80 disabled:bg-primary/50 text-white py-5 rounded-2xl font-bold text-lg transition-all glow-blue flex items-center justify-center gap-3"
                >
                  {formStatus === 'loading' ? 'Enviando...' : 'Enviar y reservar mi auditoría gratuita'}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#050A14] py-12 border-t border-border-subtle">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-text-muted text-xs">
              © 2025 Scale Evo Solutions · Sistemas que escalan negocios.
            </div>
            <div className="text-success text-xs font-semibold">
              ✓ Garantía de resultados por contrato
            </div>
          </div>
        </div>
      </footer>

      {/* Floating CTA Button (Desktop) */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: scrolled ? 1 : 0, x: scrolled ? 0 : 100 }}
        className="fixed bottom-8 right-8 z-40 hidden lg:block"
      >
        <a href="#contacto" className="bg-primary hover:bg-primary/80 text-white px-6 py-4 rounded-2xl font-bold shadow-2xl glow-blue flex items-center gap-2 transition-all">
          Auditoría gratis <ArrowRight className="w-4 h-4" />
        </a>
      </motion.div>
    </div>
  );
}

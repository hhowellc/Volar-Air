import React, { useState, useEffect } from 'react';
import { 
  Briefcase, 
  Map, 
  Users, 
  Clock, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle,
  PlaneTakeoff,
  ShieldCheck,
  X,
  MapPin,
  Calendar,
  ChevronRight,
  Menu
} from 'lucide-react';

// --- BANT PROFILER MODAL COMPONENT ---
const BantModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [formData, setFormData] = useState({
    destination: '',
    passengers: 1,
    purpose: '',
    date: '',
    name: '',
    email: '',
    phone: ''
  });

  // Reset modal when opened/closed
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep(1);
        setFormData({
          destination: '', passengers: 1, purpose: '', date: '', name: '', email: '', phone: ''
        });
      }, 300);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const nextStep = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setStep((prev) => prev + 1);
      setIsAnimating(false);
    }, 300);
  };

  const prevStep = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setStep((prev) => prev - 1);
      setIsAnimating(false);
    }, 300);
  };

  const handleSelect = (field, value) => {
    setFormData({ ...formData, [field]: value });
    setTimeout(nextStep, 250);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="w-full max-w-2xl bg-[#131316] rounded-2xl border border-[#27272A] shadow-2xl relative overflow-hidden z-10 animate-in-up">
        {/* Decorative Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-50"></div>
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors z-20"
        >
          <X size={24} />
        </button>

        {/* Header */}
        <div className="p-8 pb-4 border-b border-[#27272A] relative bg-[#131316]">
          <h2 className="text-xl font-bold tracking-widest uppercase text-white flex items-center gap-2">
            <PlaneTakeoff size={24} color="#D4AF37" />
            Volar <span className="text-[#D4AF37]">Air Charter</span>
          </h2>
          
          {/* Progress Indicator */}
          {step < 6 && (
            <div className="flex gap-2 mt-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <div 
                  key={i} 
                  className={`h-1 w-full rounded-full transition-all duration-500 ${
                    i === step ? 'bg-[#D4AF37]' : i < step ? 'bg-[#D4AF37] opacity-40' : 'bg-gray-800'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Dynamic Content Area */}
        <div className="relative min-h-[420px] bg-[#131316]">
          <div className={`absolute inset-0 p-8 ${isAnimating ? 'opacity-0 scale-95 transition-all duration-300' : 'opacity-100 scale-100 transition-all duration-300'}`}>
            
            {/* STEP 1: Destino / Ruta */}
            {step === 1 && (
              <div className="h-full flex flex-col justify-center">
                <h3 className="text-2xl font-light text-white mb-2">¿Cuál es su <span className="font-semibold text-[#D4AF37]">Destino</span>?</h3>
                <p className="text-gray-400 mb-8 text-sm">Seleccione una ruta popular o indique un destino personalizado.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                  {['Arenal / La Fortuna', 'Golfo de Papagayo', 'Manuel Antonio', 'San José (SJO)'].map((dest) => (
                    <button 
                      key={dest}
                      onClick={() => handleSelect('destination', dest)}
                      className="text-left p-4 rounded-xl border border-[#27272A] bg-[#18181A] hover:border-[#D4AF37] hover:bg-[#1C1C20] transition-all flex items-center gap-3 group"
                    >
                      <MapPin size={18} className="text-[#D4AF37] group-hover:scale-110 transition-transform" />
                      <span className="text-gray-200 text-sm font-medium">{dest}</span>
                    </button>
                  ))}
                </div>
                
                <div className="mt-auto">
                  <label className="block text-xs text-gray-500 mb-2 uppercase tracking-wider">O escriba otro destino:</label>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="Ej. Santa Teresa, Tamarindo..."
                      value={formData.destination}
                      onChange={(e) => setFormData({...formData, destination: e.target.value})}
                      className="flex-1 bg-[#18181A] border border-[#27272A] focus:border-[#D4AF37] rounded-lg px-4 py-3 text-white placeholder-gray-600 transition-colors outline-none"
                    />
                    <button 
                      onClick={nextStep}
                      disabled={!formData.destination}
                      className="bg-[#D4AF37] text-black px-6 rounded-lg font-medium disabled:opacity-50"
                    >
                      <ArrowRight size={20} />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Pasajeros */}
            {step === 2 && (
              <div className="h-full flex flex-col justify-center">
                <h3 className="text-2xl font-light text-white mb-2">Número de <span className="font-semibold text-[#D4AF37]">Pasajeros</span></h3>
                <p className="text-gray-400 mb-8 text-sm">Seleccione la cantidad de personas que viajarán.</p>
                
                <div className="grid grid-cols-3 gap-4 mb-8">
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <button
                      key={num}
                      onClick={() => handleSelect('passengers', num)}
                      className={`py-6 rounded-xl border transition-all duration-200 text-xl font-medium flex flex-col items-center gap-2 ${
                        formData.passengers === num 
                          ? 'bg-[#D4AF37] border-[#D4AF37] text-black' 
                          : 'bg-[#18181A] border-[#27272A] text-gray-300 hover:border-gray-500'
                      }`}
                    >
                      <Users size={24} className={formData.passengers === num ? 'text-black' : 'text-[#D4AF37]'} />
                      {num}
                    </button>
                  ))}
                </div>

                <div className="mt-auto pt-4">
                  <button onClick={prevStep} className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-sm">
                    <ArrowLeft size={16} /> Volver
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Motivo */}
            {step === 3 && (
              <div className="h-full flex flex-col justify-center">
                <h3 className="text-2xl font-light text-white mb-2">Motivo del <span className="font-semibold text-[#D4AF37]">Vuelo</span></h3>
                <p className="text-gray-400 mb-8 text-sm">Personalizamos la experiencia según sus necesidades.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button 
                    onClick={() => handleSelect('purpose', 'Turismo')}
                    className="p-8 rounded-xl border border-[#27272A] bg-[#18181A] hover:border-[#D4AF37] transition-all flex flex-col items-center text-center group"
                  >
                    <Map size={40} className="text-[#D4AF37] mb-4 group-hover:scale-110 transition-transform" />
                    <h4 className="text-lg font-medium text-white mb-2">Turismo & Aventura</h4>
                    <p className="text-xs text-gray-500">Tours panorámicos y vuelos recreativos.</p>
                  </button>

                  <button 
                    onClick={() => handleSelect('purpose', 'Corporativo')}
                    className="p-8 rounded-xl border border-[#27272A] bg-[#18181A] hover:border-[#D4AF37] transition-all flex flex-col items-center text-center group"
                  >
                    <Briefcase size={40} className="text-[#D4AF37] mb-4 group-hover:scale-110 transition-transform" />
                    <h4 className="text-lg font-medium text-white mb-2">Viaje Corporativo</h4>
                    <p className="text-xs text-gray-500">Traslados ejecutivos y máxima privacidad.</p>
                  </button>
                </div>

                <div className="mt-auto pt-8">
                  <button onClick={prevStep} className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-sm">
                    <ArrowLeft size={16} /> Volver
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: Fecha */}
            {step === 4 && (
              <div className="h-full flex flex-col justify-center">
                <h3 className="text-2xl font-light text-white mb-2">¿Cuándo desea <span className="font-semibold text-[#D4AF37]">Volar</span>?</h3>
                <p className="text-gray-400 mb-8 text-sm">Indique la fecha estimada para su chárter.</p>
                
                <div className="space-y-3 mb-8">
                  {['Lo antes posible (Urgente)', 'Esta semana', 'En los próximos 30 días', 'Aún decidiendo fechas'].map((dateOpt) => (
                    <button
                      key={dateOpt}
                      onClick={() => handleSelect('date', dateOpt)}
                      className="w-full p-4 rounded-xl border border-[#27272A] bg-[#18181A] hover:border-[#D4AF37] transition-all flex items-center justify-between text-left group"
                    >
                      <span className="text-gray-200 text-sm font-medium">{dateOpt}</span>
                      <Calendar size={18} className="text-gray-600 group-hover:text-[#D4AF37] transition-colors" />
                    </button>
                  ))}
                </div>

                <div className="mt-auto pt-4">
                  <button onClick={prevStep} className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-sm">
                    <ArrowLeft size={16} /> Volver
                  </button>
                </div>
              </div>
            )}

            {/* STEP 5: Contacto */}
            {step === 5 && (
              <div className="h-full flex flex-col">
                <h3 className="text-2xl font-light text-white mb-2">Datos de <span className="font-semibold text-[#D4AF37]">Contacto</span></h3>
                <p className="text-gray-400 mb-6 text-sm">Nuestro equipo VIP le enviará su cotización privada de inmediato.</p>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1 uppercase tracking-wider">Nombre Completo</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-[#18181A] border border-[#27272A] focus:border-[#D4AF37] rounded-lg px-4 py-3 text-white placeholder-gray-600 transition-colors outline-none"
                      placeholder="Su nombre"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1 uppercase tracking-wider">Email</label>
                      <input 
                        type="email" 
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-[#18181A] border border-[#27272A] focus:border-[#D4AF37] rounded-lg px-4 py-3 text-white placeholder-gray-600 transition-colors outline-none"
                        placeholder="email@ejemplo.com"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1 uppercase tracking-wider">Teléfono</label>
                      <input 
                        type="tel" 
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full bg-[#18181A] border border-[#27272A] focus:border-[#D4AF37] rounded-lg px-4 py-3 text-white placeholder-gray-600 transition-colors outline-none"
                        placeholder="+506 8888 8888"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-4 text-xs text-gray-500">
                    <ShieldCheck size={14} className="text-[#D4AF37]"/> Información estrictamente confidencial.
                  </div>

                  <div className="mt-8 flex justify-between items-center">
                    <button type="button" onClick={prevStep} className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-sm">
                      <ArrowLeft size={16} /> Volver
                    </button>
                    <button 
                      type="submit"
                      className="bg-gradient-to-r from-[#D4AF37] to-[#F3D568] text-black px-8 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all hover:scale-105"
                    >
                      Solicitar Cotización <ArrowRight size={18} />
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* STEP 6: Success */}
            {step === 6 && (
              <div className="h-full flex flex-col items-center justify-center text-center py-6">
                <div className="w-20 h-20 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mb-6 animate-pulse">
                  <CheckCircle size={40} className="text-[#D4AF37]" />
                </div>
                <h3 className="text-3xl font-light text-white mb-4">Solicitud <span className="font-semibold text-[#D4AF37]">Exitosa</span></h3>
                <p className="text-gray-400 max-w-md mx-auto text-sm leading-relaxed mb-8">
                  Gracias, <strong>{formData.name}</strong>. Hemos recibido su solicitud de vuelo hacia <strong>{formData.destination}</strong>. 
                  <br/><br/>
                  Un especialista de Volar Air Charter le contactará a través de {formData.email} en los próximos 15 minutos para coordinar los detalles.
                </p>
                <button 
                  onClick={onClose}
                  className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-lg font-medium transition-colors"
                >
                  Cerrar
                </button>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};


// --- MAIN LANDING PAGE COMPONENT ---
export default function VolarLandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#09090B] font-sans text-gray-200 selection:bg-[#D4AF37] selection:text-black">
      
      {/* Global Styles */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        .animate-in-up { animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .fade-in { animation: fadeIn 1s ease-out forwards; }
        
        html { scroll-behavior: smooth; }
      `}} />

      {/* NAVBAR */}
      <nav className={`fixed w-full z-40 transition-all duration-500 ${scrolled ? 'bg-black/90 backdrop-blur-md py-4 border-b border-[#27272A]' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer">
            <PlaneTakeoff size={28} className="text-[#D4AF37]" />
            <span className="text-xl font-bold tracking-widest uppercase text-white">
              Volar <span className="font-light text-gray-300">Charter</span>
            </span>
          </div>
          
          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#experiencia" className="text-sm font-medium text-gray-300 hover:text-[#D4AF37] transition-colors uppercase tracking-widest">La Experiencia</a>
            <a href="#destinos" className="text-sm font-medium text-gray-300 hover:text-[#D4AF37] transition-colors uppercase tracking-widest">Destinos</a>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-[#D4AF37] hover:bg-[#F3D568] text-black px-6 py-2.5 rounded-sm font-semibold uppercase tracking-wider text-xs transition-all hover:scale-105"
            >
              Cotizar Vuelo
            </button>
          </div>

          {/* Mobile Menu */}
          <button className="md:hidden text-white">
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Cinematic Background Video */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="absolute inset-0 w-full h-full object-cover scale-105"
        >
          <source src="https://videos.pexels.com/video-files/3017260/3017260-uhd_2560_1440_24fps.mp4" type="video/mp4" />
        </video>
        
        {/* Dark Overlay for Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-[#09090B] z-0"></div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center mt-20">
          <span className="text-[#D4AF37] font-semibold tracking-[0.3em] uppercase text-sm md:text-base mb-6 fade-in block">
            Exclusividad y Privacidad
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight fade-in" style={{ animationDelay: '0.2s', opacity: 0 }}>
            Volar Air Charter
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 font-light mb-12 max-w-2xl fade-in" style={{ animationDelay: '0.4s', opacity: 0 }}>
            Elevando la Experiencia en Costa Rica. <br className="hidden md:block"/>Vuelos corporativos y tours privados de clase mundial.
          </p>
          <div className="fade-in" style={{ animationDelay: '0.6s', opacity: 0 }}>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-gradient-to-r from-[#D4AF37] to-[#F3D568] text-black px-10 py-4 rounded-sm font-bold uppercase tracking-widest text-sm hover:scale-105 transition-transform flex items-center gap-3 shadow-[0_0_30px_rgba(212,175,55,0.3)]"
            >
              Cotizar Vuelo <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* LUXURY DIVIDER */}
      <div className="h-px w-full bg-gradient-to-r from-[#09090B] via-[#D4AF37]/50 to-[#09090B]"></div>

      {/* POPULAR DESTINATIONS SECTION */}
      <section id="destinos" className="py-24 bg-[#09090B]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-[#D4AF37] mb-2">Rutas Premium</h2>
            <h3 className="text-4xl md:text-5xl font-light text-white">Destinos <span className="font-bold">Icónicos</span></h3>
            <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
              Llegue a los rincones más hermosos de Costa Rica en minutos. Evite el tráfico terrestre y disfrute de vistas aéreas inigualables.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Tour Card 1 */}
            <div className="group relative rounded-2xl overflow-hidden bg-[#131316] border border-[#27272A] hover:border-[#D4AF37]/50 transition-all duration-500">
              <div className="h-64 overflow-hidden relative">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10"></div>
                <img 
                  src="https://images.unsplash.com/photo-1619566938997-758992ba0975?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Volcán Arenal" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="p-8">
                <h4 className="text-2xl font-semibold text-white mb-2">Volcán Arenal</h4>
                <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                  Vuele sobre el majestuoso cono volcánico y aterrice directamente en su resort de lujo en La Fortuna en menos de 30 minutos.
                </p>
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="text-[#D4AF37] font-medium uppercase tracking-wider text-xs flex items-center gap-2 group-hover:gap-4 transition-all"
                >
                  Reservar Ruta <ArrowRight size={14} />
                </button>
              </div>
            </div>

            {/* Tour Card 2 */}
            <div className="group relative rounded-2xl overflow-hidden bg-[#131316] border border-[#27272A] hover:border-[#D4AF37]/50 transition-all duration-500">
              <div className="h-64 overflow-hidden relative">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10"></div>
                <img 
                  src="https://images.unsplash.com/photo-1590418579979-4d6cb17f6920?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Golfo de Papagayo" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="p-8">
                <h4 className="text-2xl font-semibold text-white mb-2">Golfo de Papagayo</h4>
                <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                  Conectamos el aeropuerto SJO directamente con las playas prístinas de Guanacaste y la Marina de Papagayo con total confort.
                </p>
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="text-[#D4AF37] font-medium uppercase tracking-wider text-xs flex items-center gap-2 group-hover:gap-4 transition-all"
                >
                  Reservar Ruta <ArrowRight size={14} />
                </button>
              </div>
            </div>

            {/* Tour Card 3 */}
            <div className="group relative rounded-2xl overflow-hidden bg-[#131316] border border-[#27272A] hover:border-[#D4AF37]/50 transition-all duration-500">
              <div className="h-64 overflow-hidden relative">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10"></div>
                <img 
                  src="https://images.unsplash.com/photo-1589311029272-132d744b827e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="San José Ejecutivo" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="p-8">
                <h4 className="text-2xl font-semibold text-white mb-2">Chárter Corporativo</h4>
                <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                  El tiempo es oro. Optimice sus reuniones de negocios con traslados directos entre helipuertos privados y aeropuertos.
                </p>
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="text-[#D4AF37] font-medium uppercase tracking-wider text-xs flex items-center gap-2 group-hover:gap-4 transition-all"
                >
                  Agendar Vuelo <ArrowRight size={14} />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#050505] py-12 border-t border-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 opacity-50">
            <PlaneTakeoff size={20} />
            <span className="font-bold tracking-widest uppercase text-sm">Volar Air Charter</span>
          </div>
          <p className="text-gray-600 text-sm text-center">
            &copy; {new Date().getFullYear()} Volar Air Charter Costa Rica. Todos los derechos reservados.
          </p>
        </div>
      </footer>

      {/* BANT PROFILER MODAL */}
      <BantModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

    </div>
  );
}
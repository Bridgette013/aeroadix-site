import React, { useState, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Wind,
  Box,
  ShieldCheck,
  ArrowRight,
  Menu,
  X,
  Layers,
  Zap,
} from 'lucide-react';
import SEO from './components/SEO';

/**
 * AEROADIX - Single Page Application
 * An Automotive Aero Optimization Company — A Division of 3DBoomPrint
 * 
 * IMAGE ASSETS — place all in /public/assets/:
 *   aeroadix-logo.svg          → Hero logo (vector)
 *   gtr-canards-installed.jpg  → Flip card
 *   cfd-streamlines.jpg        → Flip card
 *   cfd-heatmap.jpg            → Flip card
 *   cfd-wind-tunnel.jpg        → Flip card
 */

// --- Shared Animation Variants ---
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: "easeOut" }
};

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.15 } }
};

// --- Chrome Card Wrapper ---
// Gives every card a subtle metallic border with a top-edge highlight
const ChromeCard = ({ children, className = "", hoverBorderColor = "rgba(148,163,184,0.35)" }) => (
  <div 
    className={`relative group ${className}`}
    style={{ padding: '1px' }}
  >
    {/* Metallic gradient border */}
    <div 
      className="absolute inset-0 rounded-sm opacity-60 group-hover:opacity-100 transition-opacity duration-500"
      style={{
        background: `linear-gradient(160deg, rgba(200,200,210,0.25) 0%, rgba(120,120,130,0.12) 30%, rgba(80,80,90,0.08) 60%, rgba(140,140,150,0.2) 100%)`
      }}
    />
    {/* Top edge shine */}
    <div 
      className="absolute top-0 left-[10%] right-[10%] h-[1px] opacity-20 group-hover:opacity-40 transition-opacity duration-500"
      style={{
        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)'
      }}
    />
    {/* Inner card */}
    <div className="relative rounded-sm bg-[#0a0a0a]">
      {children}
    </div>
  </div>
);

// --- Brand Mark ---
const BrandMark = ({ size = 32, className = "" }) => (
  <div 
    className={`relative flex items-center justify-center rotate-45 ${className}`}
    style={{ width: size, height: size }}
  >
    <div 
      className="absolute inset-0 rounded-[4px]"
      style={{
        background: 'linear-gradient(135deg, #1e40af, #3b82f6, #1e40af)',
        padding: '1.5px',
      }}
    >
      <div className="w-full h-full rounded-[3px] bg-black/80 backdrop-blur-sm" />
    </div>
    <svg 
      viewBox="0 0 20 20" 
      className="-rotate-45"
      style={{ width: size * 0.55, height: size * 0.55 }}
    >
      <defs>
        <linearGradient id="layerGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#93c5fd" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
      </defs>
      <rect x="4" y="5" width="12" height="1.8" rx="0.5" fill="url(#layerGrad)" opacity="0.6" />
      <rect x="3" y="9" width="14" height="1.8" rx="0.5" fill="url(#layerGrad)" opacity="0.8" />
      <rect x="2" y="13" width="16" height="1.8" rx="0.5" fill="url(#layerGrad)" opacity="1" />
    </svg>
  </div>
);

// --- Static Card ---
const FlipCard = ({ frontImage, frontLabel, frontTitle, backText, backStats }) => {
  return (
    <motion.div variants={fadeInUp}>
      <ChromeCard className="h-full">
        <div className="flex flex-col overflow-hidden rounded-sm">
           <div className="p-5 md:p-6 flex flex-col gap-3">
            <span className="text-blue-500 text-[9px] tracking-[0.5em] uppercase font-bold">{frontLabel}</span>
            <h4 className="text-lg md:text-xl font-black uppercase tracking-tighter italic text-white leading-tight">{frontTitle}</h4>
            <div className="w-8 h-[1px] bg-gradient-to-r from-zinc-500 to-transparent" />
            <p className="text-zinc-400 text-sm leading-relaxed">{backText}</p>
            {backStats && (
              <div className="mt-2 pt-4 border-t border-zinc-800/60 grid grid-cols-2 gap-4">
                {backStats.map((stat, i) => (
                  <div key={i}>
                    <span className="text-blue-500 text-lg font-black">{stat.value}</span>
                    <span className="block text-zinc-600 text-[8px] tracking-[0.3em] uppercase font-bold mt-1">{stat.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* Image */}
          <div className="relative w-full aspect-[4/3] overflow-hidden flex-shrink-0">
            <img
              src={frontImage}
              alt={frontTitle}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </ChromeCard>
    </motion.div>
  );
};

// --- Flip card data ---
const processCards = [
  {
    frontImage: "/assets/cfd-streamlines.jpg",
    frontLabel: "Step 01 — Analyze",
    frontTitle: "Streamline Analysis",
    backText: "Cool blues indicate slower air, hot reds show acceleration — revealing exactly how a shape redirects airflow and where turbulence begins.",
    backStats: [
      { value: "3,740", label: "cm/s Peak Velocity" },
      { value: "2D + 3D", label: "Multi-Axis Views" }
    ]
  },
  {
    frontImage: "/assets/cfd-heatmap.jpg",
    frontLabel: "Step 02 — Map",
    frontTitle: "Velocity Field Mapping",
    backText: "High-speed zones show where air accelerates around the canard profile, generating the low pressure that creates downforce. Blue zones reveal the controlled wake downstream.",
    backStats: [
      { value: "CFD", label: "Computational Fluid Dynamics" },
      { value: "Real-Time", label: "Iterative Refinement" }
    ]
  },
  {
    frontImage: "/assets/cfd-wind-tunnel.jpg",
    frontLabel: "Step 03 — Test",
    frontTitle: "Virtual Wind Tunnel",
    backText: "Each design runs through a full virtual wind tunnel — replicating inlet velocity, boundary layers, and ground effect — validating performance digitally before a single part is printed.",
    backStats: [
      { value: "Zero", label: "Physical Prototypes Wasted" },
      { value: "∞", label: "Design Iterations" }
    ]
  },
  {
    frontImage: "/assets/gtr-canards-installed.jpg",
    frontLabel: "Step 04 — Validate",
    frontTitle: "Real-World Fitment",
    backText: "Every canard is chassis-scanned and CFD-validated before printing. Flow visualization overlays confirm real-world aerodynamic behavior matches our digital predictions.",
    backStats: [
      { value: "OEM+", label: "Fitment Standard" },
      { value: "UV/Heat", label: "Stable Resin" }
    ]
  }
];

// --- Nav ---
const NavLink = ({ href, children }) => (
  <a href={href} className="hover:text-white transition-colors duration-300 relative group">
    {children}
    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-blue-600 transition-all duration-300 group-hover:w-full" />
  </a>
);

const Navbar = memo(({ scrolled, isMenuOpen, setIsMenuOpen }) => (
  <nav className={`fixed w-full z-50 transition-all duration-500 border-b ${
    scrolled ? 'bg-black/90 backdrop-blur-xl py-4 border-zinc-800' : 'bg-transparent py-8 border-transparent'
  }`}>
    <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
      <a href="#" className="flex items-center gap-3 group cursor-pointer">
        <BrandMark size={32} className="group-hover:rotate-0 transition-transform duration-500" />
        <span className="text-2xl font-black tracking-tighter italic">
          AERO<span className="text-blue-600">ADIX</span>
        </span>
      </a>

      <div className="hidden md:flex items-center space-x-8 text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400">
        <NavLink href="#engineering">Engineering</NavLink>
        <NavLink href="#flagship">R35 GTR</NavLink>
        <NavLink href="#process">The Process</NavLink>
        <NavLink href="#aerocomponents">Aero Components</NavLink>
        <NavLink href="#subsidiary">3DBoomPrint</NavLink>
        <button className="px-6 py-2 border border-zinc-700 hover:border-white transition-all text-white ml-4">
          Inquire
        </button>
      </div>

      <button className="md:hidden text-gray-400" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    </div>

    <AnimatePresence>
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute top-full left-0 w-full bg-zinc-950 border-b border-zinc-800 py-10 flex flex-col items-center gap-6 md:hidden"
        >
          {['Engineering', 'R35 GTR', 'The Process', 'Aero Components', '3DBoomPrint'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase().replace(/\s+/g, '')}`} 
              onClick={() => setIsMenuOpen(false)}
              className="text-xs font-black tracking-widest uppercase hover:text-blue-600"
            >
              {item}
            </a>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  </nav>
));

// --- Hero ---
const Hero = () => (
  <section className="relative min-h-screen flex flex-col items-center justify-start overflow-hidden pt-28 pb-16">
    <div className="absolute inset-0 z-0 opacity-20">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 via-transparent to-transparent" />
      <svg viewBox="0 0 800 300" className="w-full h-full object-cover fill-none stroke-zinc-800 stroke-[0.3]">
        <path d="M0,150 Q200,50 400,150 T800,150" />
        <path d="M0,160 Q200,60 400,160 T800,160" />
        <path d="M0,170 Q200,70 400,170 T800,170" />
      </svg>
    </div>

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative z-10 text-center px-6 w-full flex flex-col items-center"
    >
      {/* M.A.S.T. Concept Banner */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="inline-block px-8 py-4 text-[16px] tracking-[0.5em] uppercase mb-6 animate-pulse text-center"
        style={{
          border: 'none',
          background: 'transparent',
        }}
      >
        <span className="font-bold" style={{
          backgroundImage: 'linear-gradient(135deg, #a8a8a8 0%, #e8e8e8 25%, #ffffff 50%, #e8e8e8 75%, #a8a8a8 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>AeroAdix M.A.S.T. Concept:</span>
        <br />
        <span style={{
          backgroundImage: 'linear-gradient(135deg, #b0b0b0 0%, #e0e0e0 25%, #ffffff 50%, #e0e0e0 75%, #b0b0b0 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>Motorsports Aerodynamics Surface Technologies</span>
      </motion.div>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-2xl mt-8 mb-6 relative group"
      >
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
          <div className="w-3/4 h-3/4 bg-blue-600/8 blur-[80px] rounded-full group-hover:bg-blue-600/14 transition-all duration-700" />
        </div>
        <img
          src="/assets/aeroadix-logo.svg"
          alt="AeroAdix — An Automotive Aero Optimization Company"
          className="w-full h-auto max-h-48 object-contain relative z-10 drop-shadow-[0_0_40px_rgba(37,99,235,0.15)] group-hover:drop-shadow-[0_0_60px_rgba(37,99,235,0.25)] transition-all duration-700"
          draggable="false"
        />
      </motion.div>
      
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="text-gray-400 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed tracking-wide"
      >
        An Automotive O.E. Aero Optimization Company: 3D-Scanned | CFD-Engineered | 3D-Designed | 3D-Printed | Performance Aero Components.
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65 }}
        className="text-zinc-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed tracking-wide mt-4"
      >
        Functional Additive Aero, direct fit bolt-on. Accent trim.
      </motion.p>

      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="text-zinc-500 text-[10px] tracking-[0.3em] uppercase font-bold mt-4"
      >
        (OE-Plus) Additive Aerodynamics Performance Components
      </motion.span>

      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.75 }}
        className="text-zinc-700 text-[9px] tracking-[0.4em] uppercase font-bold mt-3"
      >
        AeroAdix — A Division of 3DBoomPrint
      </motion.span>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6"
      >
        <button className="group relative px-10 py-4 bg-blue-700 hover:bg-blue-600 text-white font-bold uppercase tracking-widest text-xs transition-all overflow-hidden">
          <span className="relative z-10">Explore the Platform</span>
          <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        </button>
        <button className="px-10 py-4 border border-zinc-700 hover:border-white text-white font-bold uppercase tracking-widest text-xs transition-all">
          Our Engineering Process
        </button>
      </motion.div>
    </motion.div>

    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-20">
      <div className="w-[1px] h-16 bg-gradient-to-b from-white to-transparent" />
    </div>
  </section>
);

// --- Main App ---
const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-black text-white min-h-screen font-sans selection:bg-blue-600/30 scroll-smooth antialiased">
      <SEO />
      <Navbar scrolled={scrolled} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      <main>
        <Hero />

        {/* ── Engineering Section ── */}
        <section id="engineering" className="py-32 bg-[#050505]">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div 
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-8"
            >
              {[
                {
                  icon: Layers,
                  title: "3D Laser Scanning",
                  desc: "Every build starts with a sub-millimeter 3D scan of the factory chassis. No assumptions — just data. The result is OE-Plus aero that fits like it came from the factory."
                },
                {
                  icon: Zap,
                  title: "CFD-Engineered Simulation",
                  desc: "Each profile is tested in full Computational Fluid Dynamics simulation. Downforce targets, drag coefficients, pressure mapping — solving Navier-Stokes equations to visualize pressure, velocity, and temperature."
                },
                {
                  icon: Box,
                  title: "3D-Printed Additive Fabrication",
                  desc: "Production-grade additive manufacturing unlocks geometries that injection molding and hand layup can't touch. Functional additive aero, direct fit bolt-on — printed with purpose."
                }
              ].map((feature, i) => (
                <motion.div key={i} variants={fadeInUp}>
                  <ChromeCard>
                    <div className="p-10 backdrop-blur-sm">
                      <feature.icon className="text-blue-600 mb-8 group-hover:scale-110 transition-transform duration-500" size={32} />
                      <h3 className="text-xl font-black mb-4 uppercase tracking-tighter">{feature.title}</h3>
                      <p className="text-zinc-500 text-sm leading-loose">{feature.desc}</p>
                    </div>
                  </ChromeCard>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Precision Engineering | OEM Level Fitment ── */}
        <section className="relative overflow-hidden bg-black border-t border-zinc-900">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-0 items-stretch">
            {/* Image Side */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative w-full aspect-[4/3] md:aspect-auto overflow-hidden"
            >
              <img
                src="/assets/precision-engineering-scan.png"
                alt="AeroAdix 3D Laser Scanning — Precision Engineering OEM Level Fitment"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/80 hidden md:block" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:hidden" />
            </motion.div>

            {/* Copy Side */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col justify-center px-8 py-16 md:px-16 md:py-24"
            >
              <span className="text-blue-600 text-[10px] font-black uppercase tracking-[0.5em] mb-6">Our Standard</span>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter italic leading-[0.95] mb-4">
                Precision{' '}
                <span className="bg-gradient-to-r from-zinc-400 via-zinc-200 to-zinc-400 bg-clip-text text-transparent">Engineering</span>
              </h2>

              <div className="flex items-center gap-4 mb-4">
                <div className="h-[2px] w-12 bg-gradient-to-r from-blue-600 to-transparent" />
                <span className="text-zinc-600 text-lg font-light italic tracking-wide">|</span>
                <div className="h-[2px] w-12 bg-gradient-to-l from-blue-600 to-transparent" />
              </div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter italic leading-[0.95] mb-8">
                OEM Level{' '}
                <span className="text-blue-600">Fitment</span>
              </h2>

              <p className="text-zinc-400 text-sm md:text-base leading-relaxed font-light max-w-md mb-8">
                Every component begins with a sub-millimeter 3D laser scan of the factory body. No guesswork, no generic templates — geometry captured directly from the vehicle ensures each part integrates with OEM-level precision.
              </p>

              <div className="flex flex-wrap gap-x-8 gap-y-4">
                {['Sub-mm Accuracy', '3D Laser Scanned', 'OEM+ Fitment'].map((tag, idx) => (
                  <span key={idx} className="flex items-center gap-3 text-[10px] text-zinc-300 font-bold tracking-[0.3em] uppercase">
                    <div className="h-1.5 w-1.5 bg-blue-600 rotate-45" />
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Flagship R35 GTR ── */}
        <section id="flagship" className="py-32 relative overflow-hidden bg-black">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-24 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-blue-600 text-[10px] font-black uppercase tracking-[0.5em]">First Platform Release</span>
              <h2 className="text-6xl md:text-8xl font-black italic tracking-tighter mt-4 mb-8">
                R35 GTR <br />
                <span className="bg-gradient-to-r from-zinc-500 via-zinc-200 to-zinc-500 bg-clip-text text-transparent italic">STAGE 1 AERO KIT</span>
              </h2>
              <p className="text-zinc-400 text-lg mb-12 leading-relaxed font-light">
                Front-end aero designed around the R35's factory body lines. Canards engineered to generate real front-axle load without cutting into the bumper or fighting the car's proportions.
              </p>
              <ul className="space-y-6 mb-12">
                {['Chassis-Matched Fitment', 'UV-Stable / High-Temp Resin', 'CFD-Validated Downforce Profile'].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-4 text-xs text-zinc-300 font-bold tracking-widest uppercase">
                    <div className="h-2 w-2 bg-blue-600 rotate-45" />
                    {item}
                  </li>
                ))}
              </ul>
              <button className="flex items-center gap-6 py-5 px-10 bg-white text-black font-black uppercase text-[10px] tracking-[0.3em] hover:bg-blue-600 hover:text-white transition-all">
                View Build Details <ArrowRight size={16} />
              </button>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Chrome-bordered product showcase */}
              <div className="relative" style={{ padding: '1px' }}>
                <div 
                  className="absolute inset-0 rounded-lg"
                  style={{
                    background: 'linear-gradient(160deg, rgba(200,200,210,0.35) 0%, rgba(100,100,110,0.1) 40%, rgba(80,80,90,0.08) 60%, rgba(180,180,190,0.3) 100%)'
                  }}
                />
                <div className="absolute top-0 left-[15%] right-[15%] h-[1px] opacity-30" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.7), transparent)' }} />
                <div className="relative bg-black rounded-lg p-12 aspect-square flex flex-col items-center justify-center overflow-hidden group">
                  <div className="w-56 h-14 bg-gradient-to-r from-zinc-800 to-blue-900/50 skew-x-[30deg] border-r-4 border-blue-600 shadow-2xl transition-transform duration-700 group-hover:scale-110" />
                  <div className="mt-16 text-center">
                    <span className="text-zinc-600 text-[9px] tracking-widest uppercase">Variant: Gunmetal Chrome</span>
                    <h4 className="text-2xl font-black text-white uppercase italic mt-2">Nismo-Spec Canard</h4>
                  </div>
                </div>
              </div>
              <div className="absolute -top-10 -right-10 w-80 h-80 bg-blue-600/10 blur-[150px] rounded-full -z-10" />
            </motion.div>
          </div>
        </section>

        {/* ── The Process — Flip Cards ── */}
        <section id="process" className="py-32 bg-[#030303] border-t border-zinc-900">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div {...fadeInUp} className="text-center mb-20">
              <span className="text-blue-600 text-[10px] font-black uppercase tracking-[0.6em] block mb-4">How We Engineer</span>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter italic mb-6">
                The <span className="text-blue-600">CFD</span> Process
              </h2>
              <p className="text-zinc-500 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
                Computational Fluid Dynamics (CFD) is a branch of fluid mechanics that uses numerical analysis, data structures, and computer simulation to analyze and solve problems involving fluid flows, heat transfer, and related physics. It models gas/liquid behavior by solving governing equations (Navier-Stokes) to visualize pressure, velocity, and temperature.
              </p>
            </motion.div>

            <motion.div 
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {processCards.map((card, i) => (
                <FlipCard key={i} {...card} />
              ))}
            </motion.div>

            <motion.p 
              {...fadeInUp}
              className="text-center text-zinc-700 text-[10px] tracking-[0.4em] uppercase font-bold mt-16"
            >
              All simulation data from AeroAdix R35 GTR canard development
            </motion.p>
          </div>
        </section>

        {/* ── Aero Components ── */}
        <section id="aerocomponents" className="py-32 border-t border-zinc-900 bg-zinc-950/20">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div 
              {...fadeInUp}
              className="flex flex-col items-center text-center"
            >
              <div className="text-lg md:text-2xl font-light tracking-[0.2em] text-blue-600/80 mb-6 flex flex-wrap justify-center gap-4 items-center uppercase">
                <span>3D-Scanned</span>
                <span className="text-zinc-800 font-thin">|</span>
                <span>CFD-Engineered</span>
                <span className="text-zinc-800 font-thin">|</span>
                <span>3D-Designed</span>
                <span className="text-zinc-800 font-thin">|</span>
                <span>3D-Printed</span>
              </div>
              <h3 className="font-bold text-white tracking-[0.4em] uppercase text-lg md:text-2xl mb-4">Performance Aero Components</h3>
              <p className="text-zinc-500 text-sm max-w-xl mx-auto leading-relaxed mb-16">
                (OE-Plus) Additive Aerodynamics Performance Components — functional additive aero, direct fit bolt-on enhancements.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full">
                {['Splitters', 'Diffusers', 'Canards', 'Vortex Generators'].map((comp, idx) => (
                  <motion.div 
                    key={idx}
                    whileHover={{ y: -5 }}
                  >
                    <ChromeCard>
                      <div className="p-10 group cursor-pointer">
                        <span className="block text-[9px] text-zinc-700 uppercase tracking-widest mb-4">Module 0{idx + 1}</span>
                        <h4 className="text-xl font-black italic uppercase tracking-tighter group-hover:text-blue-600 transition-colors">{comp}</h4>
                      </div>
                    </ChromeCard>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── DNA / 3DBoomPrint ── */}
        <section id="subsidiary" className="py-32 bg-[#020202]">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <motion.div {...fadeInUp}>
              <h3 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.6em] mb-6">The DNA</h3>
              <p className="text-4xl md:text-6xl font-black tracking-tight mb-20 italic">
                A Division of <span className="text-zinc-600 not-italic">3DBoomPrint</span>
              </p>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-10 text-left">
              {[
                { title: "Mission Statement", icon: ShieldCheck, content: "AeroAdix is an Automotive Aero OE-Plus Optimization Company. A Division of 3DBoomPrint — bridging the gap between imagination and fabrication through cutting-edge CAD and precision additive manufacturing." },
                { title: "AeroAdix Focus", icon: Wind, content: "3D-Scanned, CFD-Engineered, 3D-Designed, 3D-Printed functional additive aero. Direct fit bolt-on performance aero components and accent trim, engineered for elite performance vehicles." }
              ].map((card, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                >
                  <ChromeCard>
                    <div className="p-12">
                      <h4 className="text-white font-black uppercase text-[10px] tracking-[0.4em] mb-8 flex items-center gap-4">
                        <card.icon size={16} className="text-blue-600" /> {card.title}
                      </h4>
                      <p className="text-zinc-500 text-sm leading-loose italic">"{card.content}"</p>
                    </div>
                  </ChromeCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="py-24 border-t border-zinc-900 px-6 bg-black relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-16">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <BrandMark size={28} />
              <span className="text-4xl font-black italic">
                AERO<span className="text-blue-600">ADIX</span>
              </span>
            </div>
            <p className="text-zinc-600 text-[10px] tracking-[0.4em] uppercase font-bold">OE-Plus Automotive Aero Optimization</p>
            <p className="text-zinc-700 text-[9px] tracking-[0.3em] uppercase font-bold mt-2">A Division of 3DBoomPrint</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-20">
            {[
              { title: "Network", links: ["3DBoomPrint", "Bespoke Fabrication"] },
              { title: "Platform", links: ["Nissan R35 GTR", "Porsche 911 GT3", "BMW M-Series"] }
            ].map((col, i) => (
              <div key={i}>
                <h5 className="text-[10px] font-black uppercase tracking-[0.5em] text-white mb-8">{col.title}</h5>
                <ul className="space-y-4 text-[10px] text-zinc-500 uppercase tracking-widest font-bold">
                  {col.links.map(link => <li key={link} className="hover:text-blue-600 transition-colors cursor-pointer">{link}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-24 pt-12 border-t border-zinc-900/50 flex flex-col md:flex-row justify-between items-center text-[9px] text-zinc-700 tracking-[0.5em] uppercase font-bold">
          <p>© 2026 AEROADIX — A Division of 3DBoomPrint. Phoenix, AZ.</p>
          <div className="flex gap-10 mt-6 md:mt-0">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy</span>
            <span className="hover:text-white cursor-pointer transition-colors">Documentation</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
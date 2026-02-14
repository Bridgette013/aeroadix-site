import React, { useState, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Wind, 
  Box, 
  Cpu, 
  ShieldCheck, 
  ArrowRight, 
  ChevronRight,
  Menu,
  X,
  Layers,
  Zap,
  Maximize,
  Activity
} from 'lucide-react';

/**
 * AEROADIX - Optimized Single Page Application (SPA)
 * Layout: Single Page (Sections)
 * Build: Vite/React optimized with Framer Motion
 * 
 * IMAGE ASSET SETUP:
 * Place "aeroadix-logo.png" in your /public/assets/ directory.
 * The Hero component references it at "/assets/aeroadix-logo.png".
 * 
 * Alternative — Vite import method (uncomment below):
 *   import aeroadixLogo from './assets/aeroadix-logo.png';
 *   Then swap src="/assets/aeroadix-logo.png" → src={aeroadixLogo}
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
  whileInView: { transition: { staggerChildren: 0.1 } }
};

// --- Sub-Components ---

const NavLink = ({ href, children }) => (
  <a 
    href={href} 
    className="hover:text-white transition-colors duration-300 relative group"
  >
    {children}
    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-blue-600 transition-all duration-300 group-hover:w-full" />
  </a>
);

const Navbar = memo(({ scrolled, isMenuOpen, setIsMenuOpen }) => (
  <nav className={`fixed w-full z-50 transition-all duration-500 border-b ${
    scrolled ? 'bg-black/90 backdrop-blur-xl py-4 border-zinc-800' : 'bg-transparent py-8 border-transparent'
  }`}>
    <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
      <div className="flex items-center gap-2 group cursor-pointer">
        <div className="h-8 w-8 bg-blue-700 rounded-sm flex items-center justify-center rotate-45 group-hover:rotate-0 transition-transform duration-500">
          <Wind size={18} className="-rotate-45 group-hover:rotate-0 transition-transform text-white" />
        </div>
        <span className="text-2xl font-black tracking-tighter italic">
          AERO<span className="text-blue-600">ADIX</span>
        </span>
      </div>

      <div className="hidden md:flex items-center space-x-8 text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400">
        <NavLink href="#engineering">Engineering</NavLink>
        <NavLink href="#flagship">R35 GTR</NavLink>
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
          {['Engineering', 'R35 GTR', 'Aero Components', '3DBoomPrint'].map((item) => (
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

const Hero = () => (
  <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
    {/* Background streamline SVG */}
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
      className="relative z-10 text-center px-6 w-full max-w-5xl flex flex-col items-center"
    >
      {/* Tagline pill */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="inline-block px-4 py-1 border border-blue-600/30 bg-blue-600/5 text-blue-500 text-[10px] tracking-[0.5em] uppercase mb-12 animate-pulse"
      >
        Motorsport Aerodynamics Surface Technology.
      </motion.div>
      
      {/* ── Hero Logo (replaces placeholder) ── */}
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-3xl mb-8 relative group"
      >
        {/* Ambient blue glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
          <div className="w-3/4 h-3/4 bg-blue-600/8 blur-[80px] rounded-full group-hover:bg-blue-600/14 transition-all duration-700" />
        </div>
        
        <img 
          src="/assets/aeroadix-logo.png"
          alt="AeroAdix — Bespoke Luxury Automotive Aerodynamics"
          className="w-full h-auto max-h-64 object-contain relative z-10 drop-shadow-[0_0_40px_rgba(37,99,235,0.15)] group-hover:drop-shadow-[0_0_60px_rgba(37,99,235,0.25)] transition-all duration-700"
          draggable="false"
        />
      </motion.div>
      
      {/* Subheadline */}
      <motion.p 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="text-gray-400 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed tracking-wide"
      >
        Design, engineering, and development of functional aerodynamic components for elite performance vehicles.
      </motion.p>

      {/* CTA buttons */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6"
      >
        <button className="group relative px-10 py-4 bg-blue-700 hover:bg-blue-600 text-white font-bold uppercase tracking-widest text-xs transition-all overflow-hidden">
          <span className="relative z-10"><Custom> </Custom></span>
          <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        </button>
        <button className="px-10 py-4 border border-zinc-700 hover:border-white text-white font-bold uppercase tracking-widest text-xs transition-all">
          The CFD Process
        </button>
      </motion.div>
    </motion.div>
    
    {/* Scroll indicator */}
    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-20">
      <div className="w-[1px] h-16 bg-gradient-to-b from-white to-transparent" />
    </div>
  </section>
);

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
      <Navbar scrolled={scrolled} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      
      <main>
        <Hero />

        {/* Engineering Section */}
        <section id="engineering" className="py-32 bg-[#050505]">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div 
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-12"
            >
              {[
                { icon: Layers, title: "3D Laser Scanning", desc: "Sub-millimeter precision 3D scanning ensures every component fits the factory chassis with OEM+ integrity." },
                { icon: Zap, title: "CFD Simulation", desc: "Computational Fluid Dynamics testing validates our designs, ensuring real-world downforce and reduced drag." },
                { icon: Box, title: "Additive 3D Printed Fabrication", desc: "High-performance 3D printing allows for complex geometries that traditional manufacturing simply cannot replicate." }
              ].map((feature, i) => (
                <motion.div 
                  key={i} 
                  variants={fadeInUp}
                  className="group p-10 bg-zinc-900/30 border border-zinc-800/50 hover:border-blue-700/50 transition-all duration-500 backdrop-blur-sm"
                >
                  <feature.icon className="text-blue-600 mb-8 group-hover:scale-110 transition-transform duration-500" size={32} />
                  <h3 className="text-xl font-black mb-4 uppercase tracking-tighter">{feature.title}</h3>
                  <p className="text-zinc-500 text-sm leading-loose">{feature.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* AeroAdix Product Showcase */}
        <section id="AeroAdix" className="py-32 relative overflow-hidden bg-black">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-24 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-blue-600 text-[10px] font-black uppercase tracking-[0.5em]">Development</span>
              <h2 className="text-6xl md:text-8xl font-black italic tracking-tighter mt-4 mb-8">
                R35 GTR <br />
                <span className="bg-gradient-to-r from-zinc-500 via-zinc-200 to-zinc-500 bg-clip-text text-transparent italic">STAGE 1 AERO</span>
              </h2>
              <p className="text-zinc-400 text-lg mb-12 leading-relaxed font-light">
                Our R35 GTR canards are developed to provide front-end bite without disrupting the silhouette.
              </p>
              <ul className="space-y-6 mb-12">
                {['Precision Fitment', 'High-Temp UV Stable Materials', 'CFD Validated Profile'].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-4 text-xs text-zinc-300 font-bold tracking-widest uppercase">
                    <div className="h-2 w-2 bg-blue-600 rotate-45" />
                    {item}
                  </li>
                ))}
              </ul>
              <button className="flex items-center gap-6 py-5 px-10 bg-white text-black font-black uppercase text-[10px] tracking-[0.3em] hover:bg-blue-600 hover:text-white transition-all">
                Explore Component <ArrowRight size={16} />
              </button>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
               <div className="bg-gradient-to-br from-zinc-800 to-zinc-950 p-[1px] rounded-lg">
                  <div className="bg-black rounded-lg p-12 aspect-square flex flex-col items-center justify-center relative overflow-hidden group">
                     <div className="w-56 h-14 bg-gradient-to-r from-zinc-800 to-blue-900/50 skew-x-[30deg] border-r-4 border-blue-600 shadow-2xl transition-transform duration-700 group-hover:scale-110" />
                     <div className="mt-16 text-center">
                        <span className="text-zinc-600 text-[9px] tracking-widest uppercase">Placeholder</span>
                        <h4 className="text-2xl font-black text-white uppercase italic mt-2">Nismo-Spec Canard</h4>
                     </div>
                  </div>
               </div>
               <div className="absolute -top-10 -right-10 w-80 h-80 bg-blue-600/10 blur-[150px] rounded-full -z-10" />
            </motion.div>
          </div>
        </section>

        {/* Aero Components Section */}
        <section id="aerocomponents" className="py-32 border-t border-zinc-900 bg-zinc-950/20">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div 
              {...fadeInUp}
              className="flex flex-col items-center text-center"
            >
              <div className="text-lg md:text-2xl font-light tracking-[0.2em] text-blue-600/80 mb-16 flex flex-wrap justify-center gap-4 items-center uppercase">
                <span>Precision</span>
                <span className="text-zinc-800 font-thin">|</span>
                <span>Engineered</span>
                <span className="text-zinc-800 font-thin">|</span>
                <span>3D Printed</span>
                <span className="text-zinc-800 font-thin">|</span>
                <span className="font-bold text-white tracking-[0.4em]">Aero Components</span>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full">
                {['Splitters', 'Diffusers', 'Canards', 'Vortex Generators'].map((comp, idx) => (
                  <motion.div 
                    key={idx}
                    whileHover={{ y: -5 }}
                    className="border border-zinc-900 p-10 hover:bg-zinc-900/50 transition-colors group cursor-pointer"
                  >
                    <span className="block text-[9px] text-zinc-700 uppercase tracking-widest mb-4">Module 0{idx + 1}</span>
                    <h4 className="text-xl font-black italic uppercase tracking-tighter group-hover:text-blue-600 transition-colors">{comp}</h4>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* DNA Section */}
        <section id="subsidiary" className="py-32 bg-[#020202]">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <motion.div {...fadeInUp}>
              <h3 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.6em] mb-6">The DNA</h3>
              <p className="text-4xl md:text-6xl font-black tracking-tight mb-20 italic">
                A Division of <span className="text-zinc-600 not-italic">3DBoomPrint</span>
              </p>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-16 text-left">
              {[
                { title: "Mission Statement", icon: ShieldCheck, content: "3DBoomPrint exists to bridge the gap between imagination and fabrication through cutting-edge CAD and precision manufacturing." },
                { title: "AeroAdix Focus", icon: Wind, content: "We redefine customization by making high-quality, low-volume production accessible to the performance world." }
              ].map((card, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  className="p-12 border border-zinc-900 bg-black/50 hover:border-zinc-700 transition-colors"
                >
                  <h4 className="text-white font-black uppercase text-[10px] tracking-[0.4em] mb-8 flex items-center gap-4">
                    <card.icon size={16} className="text-blue-600" /> {card.title}
                  </h4>
                  <p className="text-zinc-500 text-sm leading-loose italic">"{card.content}"</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-24 border-t border-zinc-900 px-6 bg-black relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-16">
          <div>
            <div className="text-4xl font-black italic mb-6">
              AERO<span className="text-blue-600">ADIX</span>
            </div>
            <p className="text-zinc-600 text-[10px] tracking-[0.4em] uppercase font-bold">Bespoke Luxury Automotive Aerodynamics</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-20">
            {[
              { title: "Network", links: ["3DBoomPrint", "DynoComp Scottsdale", "Bespoke Fabrication"] },
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
          <p>© 2026 AEROADIX FABRICATION SOLUTIONS. Phoenix, AZ.</p>
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
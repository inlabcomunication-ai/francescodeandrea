import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";

/* =============================================================================
   FRANCESCO D'ANDREA — DESIGN STUDIO
   Single-file React site. Tailwind + Framer Motion.
   Routing interno via stato (mock) — sostituibile con React Router quando esporti.
   ============================================================================= */

/* ---------- DATI PROGETTI ---------- */

const PROJECTS = [
  {
    slug: "bilico-bar",
    title: "Bilico Bar",
    category: "Horeca",
    year: "2024",
    place: "Castellaneta (TA)",
    cover: "https://images.unsplash.com/photo-1559329007-40df8a9345d8?q=80&w=1600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1559329007-40df8a9345d8?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1592861956120-e524fc739696?q=80&w=1600&auto=format&fit=crop",
    ],
    objective: "Trasformare un bar di passaggio in un luogo riconoscibile, capace di funzionare dal mattino alla sera.",
    concept: "Un equilibrio costante — bilico — tra elementi materici grezzi e dettagli sartoriali. Il banco diventa il fulcro: monolite scuro affiancato da una mensola continua in ottone spazzolato.",
    materials: "Microcemento color terra cotta, ottone brunito, rovere termotrattato, vetro fumé.",
    solution: "Layout aperto con isola centrale. Illuminazione su tre livelli — diffusa, di accento, scenografica — che cambia il volto del locale nelle diverse fasce orarie. Sedute miste: sgabelli alti al banco, divani bassi in tessuto bouclé per l'aperitivo.",
    featured: true,
  },
  {
    slug: "casa-f-x-r",
    title: "Casa F × R",
    category: "Residenziale",
    year: "2024",
    place: "Bari",
    cover: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1600&auto=format&fit=crop",
    ],
    objective: "Riprogettare un appartamento anni '70 in chiave contemporanea, mantenendo memoria del costruito.",
    concept: "Tagli netti, soglie ridisegnate, una palette ridotta a tre toni. La casa si legge tutta insieme, in continuità.",
    materials: "Calce a spatolato, parquet rovere oliato chiaro, marmo botticino, dettagli in acciaio nero.",
    solution: "Pareti rimosse a favore di un open-space cucina–living. Una boiserie sospesa fa da filtro tra zona giorno e zona notte.",
    featured: true,
  },
  {
    slug: "casa-f-x-a",
    title: "Casa F × A",
    category: "Residenziale",
    year: "2023",
    place: "Taranto",
    cover: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1615874959474-d609969a20ed?q=80&w=1600&auto=format&fit=crop",
    ],
    objective: "Casa per giovane coppia. Funzionalità su 70 mq senza rinunciare al carattere.",
    concept: "Una scatola chiara dentro cui inserire 'mobili-architettura': la cucina come blocco scenico, la libreria come parete strutturale.",
    materials: "Resina chiara, frassino sbiancato, vernici opache color salvia.",
    solution: "Cucina lineare con isola compatta. Libreria su misura che integra ingresso e zona TV.",
  },
  {
    slug: "terrazzo-mp",
    title: "Terrazzo MP",
    category: "Residenziale",
    year: "2023",
    place: "Castellaneta Marina",
    cover: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?q=80&w=1600&auto=format&fit=crop",
    ],
    objective: "Rendere il terrazzo l'estensione naturale della casa, vivibile da maggio a ottobre.",
    concept: "Un giardino mediterraneo costruito con essenze autoctone, sedute basse e una pergola che disegna l'ombra.",
    materials: "Pietra di Trani, ferro brunito, tessuti outdoor color sabbia, ulivi e piante grasse.",
    solution: "Tre ambienti definiti dalla luce e dalla vegetazione: pranzo, lounge, angolo lettura.",
  },
  {
    slug: "casa-ld",
    title: "Casa LD",
    category: "Residenziale",
    year: "2023",
    place: "Lecce",
    cover: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1600&auto=format&fit=crop",
    images: ["https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1600&auto=format&fit=crop"],
    objective: "Recupero di una palazzina storica nel centro di Lecce.",
    concept: "Conservare le tracce del tempo — volte in pietra leccese, pavimenti originali — e dialogare con interventi contemporanei minimi.",
    materials: "Pietra leccese, calce naturale, ferro nero, legno di recupero.",
    solution: "Apertura di un patio interno. Cucina monolitica in pietra. Bagno padronale come piccola SPA materica.",
  },
  {
    slug: "casa-p-x-g",
    title: "Casa P × G",
    category: "Residenziale",
    year: "2022",
    place: "Matera",
    cover: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=1600&auto=format&fit=crop",
    images: ["https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=1600&auto=format&fit=crop"],
    objective: "Appartamento di famiglia, equilibrio tra ordine e vita reale.",
    concept: "Calma visiva. Pochi materiali, ripetuti con coerenza.",
    materials: "Rovere chiaro, intonaco panna, dettagli in ottone.",
    solution: "Disimpegno trasformato in studio. Cucina chiusa ma collegata visivamente al living.",
  },
  {
    slug: "contattoo",
    title: "Contattoo",
    category: "Retail",
    year: "2024",
    place: "Castellaneta",
    cover: "https://images.unsplash.com/photo-1582719188393-bb71ca45dbb9?q=80&w=1600&auto=format&fit=crop",
    images: ["https://images.unsplash.com/photo-1582719188393-bb71ca45dbb9?q=80&w=1600&auto=format&fit=crop"],
    objective: "Studio di tatuaggi che fosse tutto fuorché un cliché.",
    concept: "Galleria d'arte più che studio. Pareti chiare, illuminazione museale, sedute lounge.",
    materials: "Resina bianca, acciaio nero, vetro trasparente, dettagli in pelle.",
    solution: "Zona attesa-galleria che funziona anche come piccolo spazio espositivo per gli artisti residenti.",
  },
  {
    slug: "casa-a-x-m",
    title: "Casa A × M",
    category: "Residenziale",
    year: "2022",
    place: "Massafra",
    cover: "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?q=80&w=1600&auto=format&fit=crop",
    images: ["https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?q=80&w=1600&auto=format&fit=crop"],
    objective: "Una casa per chi lavora da remoto, divisa in zone di intensità diversa.",
    concept: "Tre 'climi': operativo, conviviale, intimo. Ognuno con palette propria.",
    materials: "Legno scuro, intonaci materici, tessuti naturali.",
    solution: "Studio dedicato con luce nord. Cucina di socialità. Zona notte come rifugio.",
  },
  {
    slug: "fdc-concept-store",
    title: "FDC — Concept Store",
    category: "Retail",
    year: "2023",
    place: "Bari",
    cover: "https://images.unsplash.com/photo-1604754742629-3e0498a8e3fe?q=80&w=1600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1604754742629-3e0498a8e3fe?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=1600&auto=format&fit=crop",
    ],
    objective: "Concept store che mescolasse moda, design e libri senza sembrare un assemblaggio casuale.",
    concept: "Una sola architettura — moduli a parete in tubolare brunito — che cambia ruolo a seconda del prodotto.",
    materials: "Acciaio nero, mensole in legno massello, pavimento in cemento lisciato.",
    solution: "Sistema espositivo modulare configurabile per ogni stagione. Camerini come piccole stanze materiche.",
    featured: true,
  },
  {
    slug: "macaron",
    title: "Macaron",
    category: "Horeca",
    year: "2023",
    place: "Polignano a Mare",
    cover: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?q=80&w=1600&auto=format&fit=crop",
    images: ["https://images.unsplash.com/photo-1565538810643-b5bdb714032a?q=80&w=1600&auto=format&fit=crop"],
    objective: "Pasticceria contemporanea, francese nei prodotti, mediterranea nello spirito.",
    concept: "Una vetrina-architettura. Il prodotto è il protagonista, l'ambiente fa da cornice.",
    materials: "Marmo crema, ottone, vetro curvato, velluto color cipria.",
    solution: "Banco vetrina centrale a 360°. Sedute basse lungo le pareti. Illuminazione calda mirata.",
  },
  {
    slug: "liliana",
    title: "Liliana",
    category: "Horeca",
    year: "2022",
    place: "Castellaneta",
    cover: "https://images.unsplash.com/photo-1592861956120-e524fc739696?q=80&w=1600&auto=format&fit=crop",
    images: ["https://images.unsplash.com/photo-1592861956120-e524fc739696?q=80&w=1600&auto=format&fit=crop"],
    objective: "Trattoria contemporanea che rispettasse la cucina pugliese senza scivolare nel rustico.",
    concept: "Atmosfera da sala di casa, materiali familiari riletti.",
    materials: "Intonaco a calce, sedie in paglia di Vienna, tavoli in noce massello, tessuti lino.",
    solution: "Sala unica con cucina a vista parziale. Cantina vini visibile dietro vetro.",
  },
  {
    slug: "herabuna-momi-poke",
    title: "Herabuna × Momi Pokè",
    category: "Horeca",
    year: "2024",
    place: "Taranto",
    cover: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1600&auto=format&fit=crop",
    ],
    objective: "Locale ibrido — pokè di giorno, ristorante fusion la sera — con un'identità unica.",
    concept: "Due anime, un'unica grammatica visiva: linee pulite, materiali grezzi, accenti caldi.",
    materials: "Legno chiaro, ceramica artigianale, cementine custom, carta giapponese retroilluminata.",
    solution: "Banco bowl in front, sala più intima sul retro. Illuminazione regolabile per scenari giorno/sera.",
    featured: true,
  },
  {
    slug: "selezione-le-ferre",
    title: "Selezione — Le Ferre",
    category: "Product Design",
    year: "2023",
    place: "Brand: Le Ferre",
    cover: "https://images.unsplash.com/photo-1474722883778-792e7990302f?q=80&w=1600&auto=format&fit=crop",
    images: ["https://images.unsplash.com/photo-1474722883778-792e7990302f?q=80&w=1600&auto=format&fit=crop"],
    objective: "Linea premium per olio EVO: comunicare ricerca e territorio senza retorica.",
    concept: "Etichetta come piccolo manifesto tipografico. Tutto è texture e gerarchia.",
    materials: "Carta cotone uncoated, stampa a caldo, vetro scuro.",
    solution: "Sistema modulare di etichette declinabile su tutta la gamma. Coordinate cromatiche per cultivar.",
  },
  {
    slug: "lf-box-le-ferre",
    title: "LF Box — Le Ferre",
    category: "Product Design",
    year: "2023",
    place: "Brand: Le Ferre",
    cover: "https://images.unsplash.com/photo-1607349913338-fca6f7fc42d0?q=80&w=1600&auto=format&fit=crop",
    images: ["https://images.unsplash.com/photo-1607349913338-fca6f7fc42d0?q=80&w=1600&auto=format&fit=crop"],
    objective: "Packaging regalo che funzionasse anche come oggetto a sé, da tenere.",
    concept: "Una scatola-libro. Si apre come una monografia, dentro l'olio è un capitolo.",
    materials: "Cartone teso, tela editoriale, stampa a secco.",
    solution: "Formato monobottiglia e tribottiglia. Interno con istruzioni-racconto sulla cultivar.",
  },
  {
    slug: "bottle-le-ferre",
    title: "Bottle Design — Le Ferre",
    category: "Product Design",
    year: "2024",
    place: "Brand: Le Ferre",
    cover: "https://images.unsplash.com/photo-1474722883634-cd3ba7d8c0e7?q=80&w=1600&auto=format&fit=crop",
    images: ["https://images.unsplash.com/photo-1474722883634-cd3ba7d8c0e7?q=80&w=1600&auto=format&fit=crop"],
    objective: "Bottiglia proprietaria, riconoscibile a scaffale anche senza etichetta.",
    concept: "Una forma asciutta, leggermente squadrata in alto, base ampia. Stabilità mediterranea.",
    materials: "Vetro scuro UV-protect, tappo legno-sughero, capsula cera.",
    solution: "Stampo dedicato. Tre formati: 250, 500, 1000 ml.",
    featured: true,
  },
  {
    slug: "orto-condiviso",
    title: "Orto Condiviso",
    category: "Product Design",
    year: "2022",
    place: "Progetto autoprodotto",
    cover: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=1600&auto=format&fit=crop",
    images: ["https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=1600&auto=format&fit=crop"],
    objective: "Sistema modulare per orti urbani condominiali.",
    concept: "Una grammatica di moduli che si combinano in base allo spazio: balcone, cortile, terrazzo.",
    materials: "Acciaio zincato, legno di castagno trattato, tessuto geotessile.",
    solution: "Tre moduli base + accessori (compostiera, raccoglitore acqua, banchi lavoro).",
    featured: true,
  },
];

const CATEGORIES = ["Tutti", "Horeca", "Retail", "Residenziale", "Product Design"];

const SERVICES = [
  { n: "01", title: "Case private", text: "Ristrutturazioni e nuovi progetti residenziali. Dalla pianta agli interruttori, ogni scelta calibrata sul modo di abitare di chi ci vive." },
  { n: "02", title: "Locali e horeca", text: "Bar, ristoranti, pizzerie. Progetti che funzionano dal turno della colazione al servizio serale, con identità visiva coerente." },
  { n: "03", title: "Retail e concept store", text: "Negozi, showroom, spazi espositivi. Sistemi modulari, percorsi cliente, illuminazione su misura." },
  { n: "04", title: "Product design", text: "Oggetti, packaging, sistemi di prodotto. Dalla ricerca alla prototipazione, fino alla produzione." },
  { n: "05", title: "Chiavi in mano", text: "Coordinamento completo: disegni tecnici, impianti, lista acquisti, computi, fornitori, cantiere e direzione estetica." },
];

const PROCESS = [
  { n: "I", title: "Ascolto e analisi", text: "Sopralluogo, conversazione lunga, raccolta vincoli. La fase più importante: capire chi vivrà lo spazio." },
  { n: "II", title: "Concept creativo", text: "Una direzione progettuale chiara: riferimenti, palette, prime planimetrie, atmosfere." },
  { n: "III", title: "Progetto tecnico", text: "Disegni esecutivi, impianti, dettagli costruttivi. Tutto quello che serve per andare in cantiere senza sorprese." },
  { n: "IV", title: "Materiali e fornitori", text: "Selezione finiture, arredi, illuminazione. Lista acquisti, computo, preventivi paralleli." },
  { n: "V", title: "Cantiere e direzione", text: "Coordinamento maestranze, controllo qualità, scelte in corso d'opera. Consegna con cura sartoriale." },
];

/* ---------- HOOKS ---------- */

function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setVisible(true),
      { threshold }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function useDate() {
  const [d] = useState(() => {
    const months = ["GEN", "FEB", "MAR", "APR", "MAG", "GIU", "LUG", "AGO", "SET", "OTT", "NOV", "DIC"];
    const now = new Date();
    return `${String(now.getDate()).padStart(2, "0")} ${months[now.getMonth()]} ${now.getFullYear()}`;
  });
  return d;
}

/* ---------- COMPONENTI ---------- */

function Loader({ onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 1400);
    return () => clearTimeout(t);
  }, [onDone]);
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ y: "-100%" }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.3 }}
      className="fixed inset-0 z-[100] bg-[#1A1614] flex items-center justify-center"
    >
      <div className="text-center text-[#F4EFE6]">
        <motion.div
          initial={{ opacity: 0, letterSpacing: "0.5em" }}
          animate={{ opacity: 1, letterSpacing: "0.05em" }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-5xl md:text-7xl tracking-tight"
          style={{ fontFamily: "'Fraunces', serif", fontVariationSettings: "'opsz' 144" }}
        >
          FD<span className="text-[#B8593A]">.</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-4 text-[10px] tracking-[0.3em] uppercase"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          Mangio pasta e design
        </motion.div>
      </div>
    </motion.div>
  );
}

function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);
  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    const over = (e) => {
      const t = e.target;
      setHovering(!!t.closest("a, button, .cursor-grow"));
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, []);
  return (
    <div
      className="hidden md:block pointer-events-none fixed z-[200] mix-blend-difference"
      style={{
        left: pos.x,
        top: pos.y,
        transform: `translate(-50%, -50%) scale(${hovering ? 2.4 : 1})`,
        transition: "transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <div className="w-3 h-3 rounded-full bg-[#F4EFE6]" />
    </div>
  );
}

function Nav({ route, setRoute, scrolled }) {
  const [open, setOpen] = useState(false);
  const items = [
    { id: "home", label: "Home" },
    { id: "portfolio", label: "Portfolio" },
    { id: "servizi", label: "Servizi" },
    { id: "about", label: "About" },
    { id: "contatti", label: "Contatti" },
  ];
  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-[#F4EFE6]/85 backdrop-blur-md py-3 border-b border-[#1A1614]/8" : "py-6"
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-6 md:px-10 flex items-center justify-between">
          <button
            onClick={() => setRoute({ name: "home" })}
            className="flex items-baseline gap-2 group"
          >
            <span
              className="font-serif text-2xl tracking-tight"
              style={{ fontFamily: "'Fraunces', serif", fontVariationSettings: "'opsz' 144" }}
            >
              Francesco D'Andrea
            </span>
            <span
              className="hidden md:inline text-[10px] tracking-[0.25em] uppercase text-[#6B6259]"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              — Design Studio
            </span>
          </button>

          <nav className="hidden md:flex items-center gap-10">
            {items.map((it) => (
              <button
                key={it.id}
                onClick={() => setRoute({ name: it.id })}
                className={`text-sm relative group ${
                  route.name === it.id ? "text-[#1A1614]" : "text-[#6B6259] hover:text-[#1A1614]"
                } transition-colors`}
                style={{ fontFamily: "'Inter Tight', sans-serif" }}
              >
                {it.label}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-[#B8593A] transition-all duration-500 ${
                    route.name === it.id ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </button>
            ))}
          </nav>

          <button
            className="md:hidden w-10 h-10 flex flex-col justify-center items-end gap-1.5"
            onClick={() => setOpen(true)}
          >
            <span className="w-7 h-px bg-[#1A1614]" />
            <span className="w-5 h-px bg-[#1A1614]" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[60] bg-[#1A1614] text-[#F4EFE6] flex flex-col"
          >
            <div className="flex justify-between items-center p-6">
              <span
                className="font-serif text-xl"
                style={{ fontFamily: "'Fraunces', serif" }}
              >
                FD.
              </span>
              <button onClick={() => setOpen(false)} className="text-3xl font-light">
                ×
              </button>
            </div>
            <div className="flex-1 flex flex-col justify-center px-8 gap-6">
              {items.map((it, i) => (
                <motion.button
                  key={it.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  onClick={() => {
                    setRoute({ name: it.id });
                    setOpen(false);
                  }}
                  className="text-left font-serif text-5xl tracking-tight"
                  style={{ fontFamily: "'Fraunces', serif" }}
                >
                  <span className="text-[#B8593A] text-sm align-top mr-3" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    0{items.indexOf(it) + 1}
                  </span>
                  {it.label}
                </motion.button>
              ))}
            </div>
            <div className="p-6 text-xs tracking-[0.25em] uppercase opacity-60" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              Mangio pasta e design
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Ticker() {
  const today = useDate();
  const items = [
    "Mangio pasta e design",
    `Castellaneta · ${today}`,
    "Selected works 2019—2025",
    "Mangio pasta e design",
    "Interior · Retail · Horeca · Product",
    "info@francesco-dandrea.it",
  ];
  return (
    <div className="bg-[#1A1614] text-[#F4EFE6] py-3 overflow-hidden border-y border-[#1A1614]">
      <div className="flex whitespace-nowrap animate-marquee">
        {[...items, ...items, ...items].map((it, i) => (
          <span
            key={i}
            className="text-xs tracking-[0.3em] uppercase px-8 flex items-center gap-8"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            {it}
            <span className="text-[#B8593A]">✶</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------- HOME ---------- */

function Hero({ setRoute }) {
  const today = useDate();
  return (
    <section className="relative min-h-screen bg-[#F4EFE6] text-[#1A1614] overflow-hidden pt-24">
      {/* indice laterale */}
      <div
        className="hidden lg:flex flex-col gap-2 fixed left-6 top-1/2 -translate-y-1/2 z-30 text-[10px] tracking-[0.3em] uppercase text-[#6B6259]"
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      >
        <span>— 00</span>
        <span className="rotate-180" style={{ writingMode: "vertical-rl" }}>
          INDEX
        </span>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-10 pt-10 md:pt-20">
        <div className="grid grid-cols-12 gap-6 items-start">
          {/* testo */}
          <div className="col-span-12 lg:col-span-7 relative z-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex items-center gap-3 mb-8 text-[10px] tracking-[0.3em] uppercase text-[#6B6259]"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              <span className="text-[#B8593A]">— 01</span>
              <span className="w-12 h-px bg-[#1A1614]/20" />
              <span>Manifesto · {today}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif leading-[0.95] tracking-[-0.02em]"
              style={{
                fontFamily: "'Fraunces', serif",
                fontVariationSettings: "'opsz' 144, 'SOFT' 30",
                fontSize: "clamp(3rem, 8.5vw, 8.5rem)",
              }}
            >
              Spazi
              <br />
              con <em className="italic font-light text-[#5A6650]">identità,</em>
              <br />
              progettati
              <br />
              per essere <em className="italic font-light">vissuti.</em>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="mt-10 text-lg max-w-md text-[#6B6259] leading-relaxed"
              style={{ fontFamily: "'Inter Tight', sans-serif" }}
            >
              Interior, retail e product design dalla Puglia. Per case, locali e attività che vogliono distinguersi.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <button
                onClick={() => setRoute({ name: "portfolio" })}
                className="group relative bg-[#1A1614] text-[#F4EFE6] px-8 py-4 text-sm tracking-[0.2em] uppercase overflow-hidden"
                style={{ fontFamily: "'Inter Tight', sans-serif" }}
              >
                <span className="relative z-10 flex items-center gap-3">
                  Vedi i progetti
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </span>
                <span className="absolute inset-0 bg-[#B8593A] -translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </button>
              <button
                onClick={() => setRoute({ name: "contatti" })}
                className="group text-sm tracking-[0.2em] uppercase px-8 py-4 border border-[#1A1614]/20 hover:border-[#1A1614] transition-colors"
                style={{ fontFamily: "'Inter Tight', sans-serif" }}
              >
                Parla del tuo spazio
              </button>
            </motion.div>
          </div>

          {/* immagine */}
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="col-span-12 lg:col-span-5 lg:absolute lg:right-10 lg:top-32 lg:w-[40vw] lg:max-w-[640px]"
          >
            <div className="relative aspect-[3/4] overflow-hidden bg-[#E8DFD0]">
              <motion.img
                src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1200&auto=format&fit=crop"
                alt="Interior design"
                className="w-full h-full object-cover"
                initial={{ scale: 1 }}
                animate={{ scale: 1.08 }}
                transition={{ duration: 18, ease: "linear" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1614]/30 via-transparent to-transparent" />
              <div
                className="absolute bottom-6 left-6 text-[#F4EFE6] text-[10px] tracking-[0.3em] uppercase"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                <div>Bilico Bar</div>
                <div className="opacity-70 mt-1">Horeca · 2024</div>
              </div>
              <div
                className="absolute top-6 right-6 text-[#F4EFE6] text-xs"
                style={{ fontFamily: "'Fraunces', serif" }}
              >
                Nº 001 / 016
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-[#6B6259]"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          <span>Scroll</span>
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-10 bg-[#1A1614]/30"
          />
        </motion.div>
      </div>
    </section>
  );
}

function Manifesto() {
  const [ref, visible] = useReveal();
  return (
    <section ref={ref} className="bg-[#5A6650] text-[#F4EFE6] py-32 md:py-48 px-6 md:px-10 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <div
          className="flex items-center gap-3 mb-12 text-[10px] tracking-[0.3em] uppercase opacity-70"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          <span>— 02</span>
          <span className="w-12 h-px bg-[#F4EFE6]/30" />
          <span>Manifesto</span>
        </div>

        <h2
          className="font-serif leading-[1.05] tracking-[-0.02em] max-w-5xl"
          style={{
            fontFamily: "'Fraunces', serif",
            fontVariationSettings: "'opsz' 144",
            fontSize: "clamp(2rem, 5.5vw, 5rem)",
          }}
        >
          {"Ogni spazio racconta qualcosa. Il mio lavoro è trasformare quell'intuizione in".split(" ").map((w, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.04, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block mr-[0.3em]"
            >
              {w}
            </motion.span>
          ))}
          <motion.em
            initial={{ opacity: 0 }}
            animate={visible ? { opacity: 1 } : {}}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="italic font-light text-[#E8DFD0]"
          >
            forma, materia, luce e funzione.
          </motion.em>
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-20 grid grid-cols-3 gap-6 md:gap-20 max-w-3xl"
        >
          {["Ricerca", "Materia", "Identità"].map((k, i) => (
            <div key={k} className="border-t border-[#F4EFE6]/30 pt-4">
              <span
                className="text-[10px] tracking-[0.3em] uppercase opacity-70 block mb-2"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                / 0{i + 1}
              </span>
              <span
                className="font-serif text-2xl md:text-3xl"
                style={{ fontFamily: "'Fraunces', serif" }}
              >
                {k}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function FeaturedWorks({ setRoute }) {
  const featured = useMemo(() => PROJECTS.filter((p) => p.featured).slice(0, 6), []);
  const [ref, visible] = useReveal(0.05);
  return (
    <section ref={ref} className="bg-[#F4EFE6] py-32 md:py-48 px-6 md:px-10">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div>
            <div
              className="flex items-center gap-3 mb-6 text-[10px] tracking-[0.3em] uppercase text-[#6B6259]"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              <span className="text-[#B8593A]">— 03</span>
              <span className="w-12 h-px bg-[#1A1614]/20" />
              <span>Selected Works · 2019—2025</span>
            </div>
            <h2
              className="font-serif tracking-[-0.02em] leading-[0.95]"
              style={{
                fontFamily: "'Fraunces', serif",
                fontSize: "clamp(2.5rem, 6vw, 6rem)",
              }}
            >
              Una selezione
              <br />
              <em className="italic font-light text-[#5A6650]">di progetti.</em>
            </h2>
          </div>
          <button
            onClick={() => setRoute({ name: "portfolio" })}
            className="group flex items-center gap-3 text-sm tracking-[0.2em] uppercase border-b border-[#1A1614] pb-2 self-start"
            style={{ fontFamily: "'Inter Tight', sans-serif" }}
          >
            Vedi tutti i progetti
            <span className="transition-transform group-hover:translate-x-2">→</span>
          </button>
        </div>

        {/* griglia editoriale asimmetrica */}
        <div className="grid grid-cols-12 gap-6 md:gap-10">
          {featured.map((p, i) => {
            // pattern asimmetrico: 7/5, 5/7, 6/6 alternati
            const layouts = [
              "col-span-12 md:col-span-7",
              "col-span-12 md:col-span-5 md:mt-32",
              "col-span-12 md:col-span-6",
              "col-span-12 md:col-span-6 md:mt-20",
              "col-span-12 md:col-span-5",
              "col-span-12 md:col-span-7 md:mt-20",
            ];
            const aspects = [
              "aspect-[4/3]",
              "aspect-[3/4]",
              "aspect-[4/3]",
              "aspect-[4/3]",
              "aspect-[3/4]",
              "aspect-[4/3]",
            ];
            return (
              <motion.button
                key={p.slug}
                initial={{ opacity: 0, y: 40 }}
                animate={visible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.08, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setRoute({ name: "project", slug: p.slug })}
                className={`${layouts[i]} group text-left cursor-grow`}
              >
                <div className={`relative ${aspects[i]} overflow-hidden bg-[#E8DFD0] mb-5`}>
                  <img
                    src={p.cover}
                    alt={p.title}
                    className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-[#1A1614]/0 group-hover:bg-[#1A1614]/10 transition-colors duration-700" />
                  <div
                    className="absolute top-5 left-5 text-[#F4EFE6] text-xs tracking-[0.25em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    Apri progetto →
                  </div>
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <span
                      className="text-[#B8593A] text-xs tracking-[0.3em] uppercase block mb-2"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      — 00{i + 1}
                    </span>
                    <h3
                      className="font-serif text-2xl md:text-3xl tracking-tight"
                      style={{ fontFamily: "'Fraunces', serif" }}
                    >
                      {p.title}
                    </h3>
                  </div>
                  <span
                    className="text-xs tracking-[0.25em] uppercase text-[#6B6259]"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {p.category} · {p.year}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ServicesSection({ setRoute }) {
  const [ref, visible] = useReveal(0.1);
  const [hover, setHover] = useState(null);
  return (
    <section ref={ref} className="bg-[#E8DFD0] py-32 md:py-48 px-6 md:px-10">
      <div className="max-w-[1400px] mx-auto">
        <div
          className="flex items-center gap-3 mb-12 text-[10px] tracking-[0.3em] uppercase text-[#6B6259]"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          <span className="text-[#B8593A]">— 04</span>
          <span className="w-12 h-px bg-[#1A1614]/20" />
          <span>Cosa progettiamo, insieme</span>
        </div>

        <h2
          className="font-serif tracking-[-0.02em] leading-[0.95] mb-16"
          style={{
            fontFamily: "'Fraunces', serif",
            fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
          }}
        >
          Servizi <em className="italic font-light text-[#5A6650]">— progettazione</em>
          <br />a 360°.
        </h2>

        <div className="divide-y divide-[#1A1614]/15">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 20 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.7 }}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              className="py-8 md:py-10 grid grid-cols-12 gap-6 items-start group cursor-default"
            >
              <span
                className="col-span-2 md:col-span-1 text-[#B8593A] text-sm tracking-[0.3em]"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {s.n}
              </span>
              <h3
                className="col-span-10 md:col-span-4 font-serif text-3xl md:text-4xl tracking-tight"
                style={{ fontFamily: "'Fraunces', serif" }}
              >
                {s.title}
              </h3>
              <p
                className={`col-span-12 md:col-span-7 text-base md:text-lg text-[#1A1614]/70 leading-relaxed transition-all duration-500 ${
                  hover === i ? "md:opacity-100 md:translate-x-2" : "md:opacity-80"
                }`}
                style={{ fontFamily: "'Inter Tight', sans-serif" }}
              >
                {s.text}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16">
          <button
            onClick={() => setRoute({ name: "contatti" })}
            className="group inline-flex items-center gap-3 text-sm tracking-[0.2em] uppercase border-b border-[#1A1614] pb-2"
            style={{ fontFamily: "'Inter Tight', sans-serif" }}
          >
            Richiedi una consulenza
            <span className="transition-transform group-hover:translate-x-2">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  const [ref, visible] = useReveal(0.1);
  return (
    <section ref={ref} className="bg-[#1A1614] text-[#F4EFE6] py-32 md:py-48 px-6 md:px-10">
      <div className="max-w-[1600px] mx-auto">
        <div
          className="flex items-center gap-3 mb-12 text-[10px] tracking-[0.3em] uppercase opacity-60"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          <span className="text-[#B8593A]">— 05</span>
          <span className="w-12 h-px bg-[#F4EFE6]/30" />
          <span>Method</span>
        </div>

        <h2
          className="font-serif tracking-[-0.02em] leading-[0.95] mb-20 max-w-5xl"
          style={{
            fontFamily: "'Fraunces', serif",
            fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
          }}
        >
          Dal concept
          <br />
          <em className="italic font-light text-[#E8DFD0]">al cantiere.</em>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-px bg-[#F4EFE6]/15">
          {PROCESS.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 30 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.7 }}
              className="bg-[#1A1614] p-8 md:p-6 min-h-[280px] flex flex-col"
            >
              <span
                className="font-serif text-5xl text-[#B8593A] mb-8 block"
                style={{ fontFamily: "'Fraunces', serif" }}
              >
                {s.n}
              </span>
              <h3
                className="font-serif text-xl md:text-2xl mb-4 tracking-tight"
                style={{ fontFamily: "'Fraunces', serif" }}
              >
                {s.title}
              </h3>
              <p
                className="text-sm text-[#F4EFE6]/70 leading-relaxed mt-auto"
                style={{ fontFamily: "'Inter Tight', sans-serif" }}
              >
                {s.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutSection({ setRoute }) {
  const [ref, visible] = useReveal(0.1);
  return (
    <section ref={ref} className="bg-[#F4EFE6] py-32 md:py-48 px-6 md:px-10 relative overflow-hidden">
      <div className="max-w-[1600px] mx-auto">
        <div
          className="flex items-center gap-3 mb-12 text-[10px] tracking-[0.3em] uppercase text-[#6B6259]"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          <span className="text-[#B8593A]">— 06</span>
          <span className="w-12 h-px bg-[#1A1614]/20" />
          <span>About · Francesco D'Andrea</span>
        </div>

        <div className="grid grid-cols-12 gap-6 md:gap-12 items-end">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={visible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1 }}
            className="col-span-12 md:col-span-5"
          >
            <div className="aspect-[3/4] bg-[#E8DFD0] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop"
                alt="Francesco D'Andrea"
                className="w-full h-full object-cover grayscale"
              />
            </div>
            <div className="mt-4 flex justify-between text-[10px] tracking-[0.3em] uppercase text-[#6B6259]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              <span>Studio · Castellaneta (TA)</span>
              <span>EST. 2019</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            className="col-span-12 md:col-span-7"
          >
            <h2
              className="font-serif tracking-[-0.02em] leading-[0.95] mb-10"
              style={{
                fontFamily: "'Fraunces', serif",
                fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
              }}
            >
              Mangio <em className="italic font-light text-[#B8593A]">pasta</em>
              <br />
              e <em className="italic font-light text-[#5A6650]">design.</em>
            </h2>

            <div
              className="space-y-6 text-lg text-[#1A1614]/80 leading-relaxed max-w-xl"
              style={{ fontFamily: "'Inter Tight', sans-serif" }}
            >
              <p>
                Designer freelance pugliese, formato in product e retail design presso la Facoltà di Architettura di Ferrara, con esperienze in studi a Bologna e Milano.
              </p>
              <p>
                Nel 2019 torno in Puglia per portare cultura del progetto sul territorio. Il mio lavoro unisce ricerca, funzionalità e sperimentazione — con un approccio ogni volta diverso, calibrato sull'identità dello spazio.
              </p>
              <p className="text-[#6B6259] italic" style={{ fontFamily: "'Fraunces', serif" }}>
                Progetto case, locali, oggetti. Spesso tutti insieme.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-8">
              {[
                ["50+", "progetti realizzati"],
                ["6", "anni di studio"],
                ["3", "regioni di formazione"],
              ].map(([n, l]) => (
                <div key={l}>
                  <div
                    className="font-serif text-4xl md:text-5xl text-[#1A1614]"
                    style={{ fontFamily: "'Fraunces', serif" }}
                  >
                    {n}
                  </div>
                  <div
                    className="text-[10px] tracking-[0.25em] uppercase text-[#6B6259] mt-2"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {l}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setRoute({ name: "about" })}
              className="mt-12 group inline-flex items-center gap-3 text-sm tracking-[0.2em] uppercase border-b border-[#1A1614] pb-2"
              style={{ fontFamily: "'Inter Tight', sans-serif" }}
            >
              Leggi tutto
              <span className="transition-transform group-hover:translate-x-2">→</span>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FinalCTA({ setRoute }) {
  return (
    <section className="bg-[#B8593A] text-[#F4EFE6] py-32 md:py-48 px-6 md:px-10 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto relative z-10">
        <div
          className="flex items-center gap-3 mb-12 text-[10px] tracking-[0.3em] uppercase opacity-80"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          <span>— 07</span>
          <span className="w-12 h-px bg-[#F4EFE6]/40" />
          <span>Contact</span>
        </div>

        <h2
          className="font-serif tracking-[-0.02em] leading-[0.95]"
          style={{
            fontFamily: "'Fraunces', serif",
            fontSize: "clamp(2.5rem, 7vw, 7rem)",
          }}
        >
          Hai una casa, un locale
          <br />
          o un'attività
          <br />
          <em className="italic font-light">da ripensare?</em>
        </h2>

        <p
          className="mt-10 text-lg md:text-xl max-w-xl opacity-90 leading-relaxed"
          style={{ fontFamily: "'Inter Tight', sans-serif" }}
        >
          Raccontami lo spazio che vuoi trasformare. Partiamo da un'idea, arriviamo a un progetto concreto.
        </p>

        <div className="mt-12 flex flex-wrap gap-4">
          <a
            href="https://wa.me/393349358494"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-[#F4EFE6] text-[#1A1614] px-8 py-4 text-sm tracking-[0.2em] uppercase relative overflow-hidden"
            style={{ fontFamily: "'Inter Tight', sans-serif" }}
          >
            <span className="relative z-10 flex items-center gap-3">
              Scrivi su WhatsApp
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </span>
          </a>
          <button
            onClick={() => setRoute({ name: "contatti" })}
            className="text-sm tracking-[0.2em] uppercase px-8 py-4 border border-[#F4EFE6]/40 hover:border-[#F4EFE6] transition-colors"
            style={{ fontFamily: "'Inter Tight', sans-serif" }}
          >
            Richiedi informazioni
          </button>
        </div>
      </div>

      {/* texture decorativa */}
      <div className="absolute -right-20 -bottom-20 opacity-10 pointer-events-none">
        <div
          className="font-serif text-[20rem] leading-none"
          style={{ fontFamily: "'Fraunces', serif" }}
        >
          FD.
        </div>
      </div>
    </section>
  );
}

function Footer({ setRoute }) {
  return (
    <footer className="bg-[#1A1614] text-[#F4EFE6] px-6 md:px-10 pt-20 pb-8">
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-12 gap-6 md:gap-12 pb-16 border-b border-[#F4EFE6]/15">
          <div className="col-span-12 md:col-span-6">
            <h3
              className="font-serif text-4xl md:text-6xl tracking-tight leading-[1]"
              style={{ fontFamily: "'Fraunces', serif" }}
            >
              Francesco
              <br />
              D'Andrea
              <span className="text-[#B8593A]">.</span>
            </h3>
            <p
              className="mt-6 text-sm text-[#F4EFE6]/60 max-w-xs leading-relaxed"
              style={{ fontFamily: "'Inter Tight', sans-serif" }}
            >
              Design Studio · Interior, retail e product design.
              <br />
              Studio su appuntamento — Castellaneta (TA).
            </p>
          </div>

          <div className="col-span-6 md:col-span-2">
            <div
              className="text-[10px] tracking-[0.3em] uppercase text-[#F4EFE6]/50 mb-4"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Navigazione
            </div>
            <ul className="space-y-3 text-sm" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              {[
                ["home", "Home"],
                ["portfolio", "Portfolio"],
                ["servizi", "Servizi"],
                ["about", "About"],
                ["contatti", "Contatti"],
              ].map(([id, label]) => (
                <li key={id}>
                  <button
                    onClick={() => setRoute({ name: id })}
                    className="hover:text-[#B8593A] transition-colors"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-6 md:col-span-4">
            <div
              className="text-[10px] tracking-[0.3em] uppercase text-[#F4EFE6]/50 mb-4"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Contatti
            </div>
            <ul className="space-y-3 text-sm" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              <li>
                <a href="mailto:info@francesco-dandrea.it" className="hover:text-[#B8593A] transition-colors">
                  info@francesco-dandrea.it
                </a>
              </li>
              <li>
                <a href="tel:+393349358494" className="hover:text-[#B8593A] transition-colors">
                  +39 334 935 8494
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/393349358494"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#B8593A] transition-colors"
                >
                  WhatsApp diretto →
                </a>
              </li>
              <li className="text-[#F4EFE6]/60">Castellaneta (TA) — su appuntamento</li>
            </ul>
          </div>
        </div>

        <div
          className="flex flex-col md:flex-row md:justify-between gap-4 mt-8 text-[10px] tracking-[0.3em] uppercase text-[#F4EFE6]/50"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          <div>© {new Date().getFullYear()} Francesco D'Andrea Studio · Tutti i diritti riservati</div>
          <div className="flex items-center gap-2">
            <span className="text-[#B8593A]">✶</span> Mangio pasta e design
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---------- PORTFOLIO PAGE ---------- */

function PortfolioPage({ setRoute }) {
  const [filter, setFilter] = useState("Tutti");
  const filtered = useMemo(
    () => (filter === "Tutti" ? PROJECTS : PROJECTS.filter((p) => p.category === filter)),
    [filter]
  );
  return (
    <div className="bg-[#F4EFE6] min-h-screen pt-32 md:pt-40 pb-32 px-6 md:px-10">
      <div className="max-w-[1600px] mx-auto">
        <div
          className="flex items-center gap-3 mb-8 text-[10px] tracking-[0.3em] uppercase text-[#6B6259]"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          <span className="text-[#B8593A]">— Index</span>
          <span className="w-12 h-px bg-[#1A1614]/20" />
          <span>Portfolio · {PROJECTS.length} progetti</span>
        </div>

        <h1
          className="font-serif tracking-[-0.02em] leading-[0.9] mb-16"
          style={{
            fontFamily: "'Fraunces', serif",
            fontSize: "clamp(3rem, 9vw, 10rem)",
          }}
        >
          Selected
          <br />
          <em className="italic font-light text-[#5A6650]">works.</em>
        </h1>

        <div className="flex flex-wrap gap-2 mb-16 border-y border-[#1A1614]/15 py-4">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`text-xs tracking-[0.2em] uppercase px-5 py-2 transition-all relative ${
                filter === c
                  ? "bg-[#1A1614] text-[#F4EFE6]"
                  : "text-[#6B6259] hover:text-[#1A1614]"
              }`}
              style={{ fontFamily: "'Inter Tight', sans-serif" }}
            >
              {c}
              {filter === c && (
                <span
                  className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#B8593A] rounded-full"
                />
              )}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-12 gap-6 md:gap-10"
          >
            {filtered.map((p, i) => {
              const layouts = [
                "col-span-12 md:col-span-6",
                "col-span-12 md:col-span-6 md:mt-20",
                "col-span-12 md:col-span-7",
                "col-span-12 md:col-span-5 md:mt-32",
                "col-span-12 md:col-span-5",
                "col-span-12 md:col-span-7 md:mt-20",
              ];
              const aspects = ["aspect-[4/3]", "aspect-[3/4]", "aspect-[16/10]", "aspect-[3/4]", "aspect-[3/4]", "aspect-[4/3]"];
              return (
                <motion.button
                  key={p.slug}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (i % 6) * 0.08, duration: 0.7 }}
                  onClick={() => setRoute({ name: "project", slug: p.slug })}
                  className={`${layouts[i % 6]} group text-left cursor-grow`}
                >
                  <div className={`relative ${aspects[i % 6]} overflow-hidden bg-[#E8DFD0] mb-5`}>
                    <img
                      src={p.cover}
                      alt={p.title}
                      className="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-[1.05]"
                    />
                  </div>
                  <div className="flex justify-between items-end">
                    <div>
                      <span
                        className="text-[#B8593A] text-xs tracking-[0.3em] uppercase block mb-2"
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                      >
                        — {String(i + 1).padStart(3, "0")}
                      </span>
                      <h3
                        className="font-serif text-2xl md:text-3xl tracking-tight"
                        style={{ fontFamily: "'Fraunces', serif" }}
                      >
                        {p.title}
                      </h3>
                    </div>
                    <span
                      className="text-xs tracking-[0.25em] uppercase text-[#6B6259]"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      {p.category} · {p.year}
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ---------- PROJECT PAGE ---------- */

function ProjectPage({ slug, setRoute }) {
  const project = PROJECTS.find((p) => p.slug === slug) || PROJECTS[0];
  const idx = PROJECTS.indexOf(project);
  const prev = PROJECTS[(idx - 1 + PROJECTS.length) % PROJECTS.length];
  const next = PROJECTS[(idx + 1) % PROJECTS.length];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  return (
    <div className="bg-[#F4EFE6] min-h-screen">
      {/* Hero */}
      <div className="relative h-[80vh] md:h-screen overflow-hidden">
        <motion.img
          src={project.cover}
          alt={project.title}
          className="w-full h-full object-cover"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1614]/60 via-[#1A1614]/10 to-[#1A1614]/30" />
        <div className="absolute inset-0 flex items-end p-6 md:p-12">
          <div className="text-[#F4EFE6] max-w-5xl">
            <div
              className="flex items-center gap-3 mb-6 text-[10px] tracking-[0.3em] uppercase opacity-90"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              <span>— Project {String(idx + 1).padStart(3, "0")}</span>
              <span className="w-12 h-px bg-[#F4EFE6]/50" />
              <span>{project.category}</span>
            </div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif tracking-[-0.02em] leading-[0.9]"
              style={{
                fontFamily: "'Fraunces', serif",
                fontSize: "clamp(3rem, 9vw, 9rem)",
              }}
            >
              {project.title}
            </motion.h1>
          </div>
        </div>
      </div>

      {/* Meta */}
      <div className="border-b border-[#1A1614]/15 px-6 md:px-12 py-8">
        <div className="max-w-[1600px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
          {[
            ["Categoria", project.category],
            ["Anno", project.year],
            ["Luogo", project.place],
            ["Nº progetto", String(idx + 1).padStart(3, "0")],
          ].map(([k, v]) => (
            <div key={k}>
              <div
                className="text-[10px] tracking-[0.3em] uppercase text-[#6B6259] mb-2"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {k}
              </div>
              <div style={{ fontFamily: "'Fraunces', serif" }} className="text-lg">
                {v}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-24 md:py-32 space-y-24">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-3">
            <div
              className="text-[10px] tracking-[0.3em] uppercase text-[#B8593A]"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              — La sfida
            </div>
          </div>
          <div className="col-span-12 md:col-span-9">
            <p
              className="font-serif text-2xl md:text-4xl leading-[1.2] tracking-tight"
              style={{ fontFamily: "'Fraunces', serif" }}
            >
              {project.objective}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-3">
            <div
              className="text-[10px] tracking-[0.3em] uppercase text-[#B8593A]"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              — Il concept
            </div>
          </div>
          <div className="col-span-12 md:col-span-9 space-y-6">
            <p
              className="text-lg md:text-xl text-[#1A1614]/80 leading-relaxed"
              style={{ fontFamily: "'Inter Tight', sans-serif" }}
            >
              {project.concept}
            </p>
            <div className="border-l-2 border-[#5A6650] pl-6">
              <div
                className="text-[10px] tracking-[0.3em] uppercase text-[#6B6259] mb-2"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                Materiali · Atmosfera
              </div>
              <p
                className="text-base text-[#1A1614]/70"
                style={{ fontFamily: "'Inter Tight', sans-serif" }}
              >
                {project.materials}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-3">
            <div
              className="text-[10px] tracking-[0.3em] uppercase text-[#B8593A]"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              — La soluzione
            </div>
          </div>
          <div className="col-span-12 md:col-span-9">
            <p
              className="text-lg md:text-xl text-[#1A1614]/80 leading-relaxed"
              style={{ fontFamily: "'Inter Tight', sans-serif" }}
            >
              {project.solution}
            </p>
          </div>
        </div>
      </div>

      {/* Gallery */}
      <div className="px-6 md:px-12 pb-32">
        <div className="max-w-[1600px] mx-auto">
          <div
            className="flex items-center gap-3 mb-12 text-[10px] tracking-[0.3em] uppercase text-[#6B6259]"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            <span className="text-[#B8593A]">— Gallery</span>
            <span className="w-12 h-px bg-[#1A1614]/20" />
            <span>{project.images.length} immagini</span>
          </div>
          <div className="grid grid-cols-12 gap-4 md:gap-8">
            {project.images.map((img, i) => {
              const cls = i % 3 === 0 ? "col-span-12" : "col-span-12 md:col-span-6";
              return (
                <div key={i} className={`${cls} aspect-[4/3] overflow-hidden bg-[#E8DFD0]`}>
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-[#5A6650] text-[#F4EFE6] px-6 md:px-12 py-24">
        <div className="max-w-[1400px] mx-auto text-center">
          <h2
            className="font-serif tracking-[-0.02em] leading-[1]"
            style={{
              fontFamily: "'Fraunces', serif",
              fontSize: "clamp(2rem, 5vw, 4.5rem)",
            }}
          >
            Hai un locale o una casa <em className="italic font-light">da ripensare?</em>
          </h2>
          <button
            onClick={() => setRoute({ name: "contatti" })}
            className="mt-10 bg-[#F4EFE6] text-[#1A1614] px-10 py-4 text-sm tracking-[0.2em] uppercase"
            style={{ fontFamily: "'Inter Tight', sans-serif" }}
          >
            Parliamone →
          </button>
        </div>
      </div>

      {/* Navigation prev/next */}
      <div className="grid grid-cols-2 border-t border-[#1A1614]/15">
        <button
          onClick={() => setRoute({ name: "project", slug: prev.slug })}
          className="group p-8 md:p-12 text-left border-r border-[#1A1614]/15 hover:bg-[#E8DFD0] transition-colors"
        >
          <div
            className="text-[10px] tracking-[0.3em] uppercase text-[#6B6259] mb-3"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            ← Progetto precedente
          </div>
          <div
            className="font-serif text-2xl md:text-3xl tracking-tight"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            {prev.title}
          </div>
        </button>
        <button
          onClick={() => setRoute({ name: "project", slug: next.slug })}
          className="group p-8 md:p-12 text-right hover:bg-[#E8DFD0] transition-colors"
        >
          <div
            className="text-[10px] tracking-[0.3em] uppercase text-[#6B6259] mb-3"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Progetto successivo →
          </div>
          <div
            className="font-serif text-2xl md:text-3xl tracking-tight"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            {next.title}
          </div>
        </button>
      </div>
    </div>
  );
}

/* ---------- SERVIZI PAGE ---------- */

function ServiziPage({ setRoute }) {
  return (
    <div className="bg-[#F4EFE6] min-h-screen pt-32 md:pt-40 pb-0">
      <div className="px-6 md:px-10 max-w-[1600px] mx-auto pb-24">
        <div
          className="flex items-center gap-3 mb-8 text-[10px] tracking-[0.3em] uppercase text-[#6B6259]"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          <span className="text-[#B8593A]">— Services</span>
          <span className="w-12 h-px bg-[#1A1614]/20" />
          <span>05 ambiti di intervento</span>
        </div>
        <h1
          className="font-serif tracking-[-0.02em] leading-[0.9] mb-12 max-w-5xl"
          style={{
            fontFamily: "'Fraunces', serif",
            fontSize: "clamp(3rem, 9vw, 10rem)",
          }}
        >
          Cosa
          <br />
          progettiamo,
          <br />
          <em className="italic font-light text-[#5A6650]">insieme.</em>
        </h1>
        <p
          className="max-w-2xl text-lg md:text-xl text-[#1A1614]/70 leading-relaxed"
          style={{ fontFamily: "'Inter Tight', sans-serif" }}
        >
          Lo studio si occupa di progettazione completa — dall'idea iniziale fino al cantiere. Cinque ambiti, una sola
          attitudine: ricerca, materia, identità.
        </p>
      </div>

      <ServicesSection setRoute={setRoute} />

      <div className="bg-[#1A1614] text-[#F4EFE6] py-24 px-6 md:px-10">
        <div className="max-w-[1400px] mx-auto">
          <h2
            className="font-serif text-3xl md:text-5xl mb-12 tracking-tight"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            Cosa è incluso, <em className="italic font-light text-[#E8DFD0]">in concreto.</em>
          </h2>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-3">
            {[
              "Progettazione completa chiavi in mano",
              "Interior design per abitazioni private",
              "Locali, bar, ristoranti, pizzerie, horeca",
              "Retail design e concept store",
              "Arredi su misura",
              "Disegni tecnici esecutivi",
              "Impianti elettrici, idraulici, climatizzazione",
              "Lista acquisti e fornitori selezionati",
              "Computo metrico estimativo",
              "Preventivi paralleli per ogni voce",
              "Prototipazione di prodotto",
              "Product design e packaging",
              "Coordinamento estetico e funzionale",
              "Direzione lavori e cantiere",
            ].map((it) => (
              <div
                key={it}
                className="flex items-baseline gap-3 py-3 border-b border-[#F4EFE6]/10"
                style={{ fontFamily: "'Inter Tight', sans-serif" }}
              >
                <span className="text-[#B8593A]">✶</span>
                <span>{it}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ProcessSection />
      <FinalCTA setRoute={setRoute} />
    </div>
  );
}

/* ---------- ABOUT PAGE ---------- */

function AboutPage({ setRoute }) {
  return (
    <div className="bg-[#F4EFE6] min-h-screen pt-32 md:pt-40 pb-0">
      <div className="px-6 md:px-10 max-w-[1600px] mx-auto pb-32">
        <div
          className="flex items-center gap-3 mb-8 text-[10px] tracking-[0.3em] uppercase text-[#6B6259]"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          <span className="text-[#B8593A]">— About</span>
          <span className="w-12 h-px bg-[#1A1614]/20" />
          <span>Francesco D'Andrea · EST. 2019</span>
        </div>

        <h1
          className="font-serif tracking-[-0.02em] leading-[0.9] mb-16"
          style={{
            fontFamily: "'Fraunces', serif",
            fontSize: "clamp(3rem, 10vw, 12rem)",
          }}
        >
          Mangio
          <br />
          <em className="italic font-light text-[#B8593A]">pasta</em> e<br />
          <em className="italic font-light text-[#5A6650]">design.</em>
        </h1>

        <div className="grid grid-cols-12 gap-8 md:gap-16">
          <div className="col-span-12 md:col-span-5">
            <div className="aspect-[3/4] bg-[#E8DFD0] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=1000&auto=format&fit=crop"
                alt="Francesco D'Andrea"
                className="w-full h-full object-cover grayscale"
              />
            </div>
          </div>
          <div className="col-span-12 md:col-span-7 space-y-8">
            <p
              className="text-xl md:text-2xl leading-relaxed text-[#1A1614]"
              style={{ fontFamily: "'Fraunces', serif" }}
            >
              Francesco D'Andrea è designer freelance pugliese, formato in product e retail design presso la Facoltà di
              Architettura di Ferrara, con esperienze in studi a Bologna e Milano.
            </p>
            <p
              className="text-lg leading-relaxed text-[#1A1614]/75"
              style={{ fontFamily: "'Inter Tight', sans-serif" }}
            >
              Nel 2019 torna in Puglia con un'idea precisa: portare cultura del progetto sul territorio. Lo studio
              nasce a Castellaneta come spazio operativo per case private, locali, attività commerciali e prodotti
              industriali.
            </p>
            <p
              className="text-lg leading-relaxed text-[#1A1614]/75"
              style={{ fontFamily: "'Inter Tight', sans-serif" }}
            >
              Il metodo è quello del designer-architetto: ascolto, ricerca, concept, esecutivo, cantiere. Ogni progetto
              è un caso a sé. Non esistono soluzioni preconfezionate, esistono spazi con un'identità da rivelare.
            </p>
            <p
              className="text-lg leading-relaxed text-[#1A1614]/75 italic"
              style={{ fontFamily: "'Fraunces', serif" }}
            >
              Progetto case, locali, oggetti. Spesso tutti insieme.
            </p>

            <div className="pt-8 border-t border-[#1A1614]/15">
              <div
                className="text-[10px] tracking-[0.3em] uppercase text-[#B8593A] mb-6"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                — Percorso
              </div>
              <div className="space-y-6">
                {[
                  ["2014—2019", "Università di Ferrara · Architettura — Indirizzo Product & Retail Design"],
                  ["2017—2019", "Studi di architettura a Bologna e Milano · Esperienze di formazione e collaborazione"],
                  ["2019—Oggi", "Ritorno in Puglia · Apertura dello studio a Castellaneta (TA)"],
                  ["2019—Oggi", "Oltre 50 progetti tra residenziale, horeca, retail, product design"],
                ].map(([year, text]) => (
                  <div key={year} className="grid grid-cols-12 gap-4 items-baseline">
                    <span
                      className="col-span-12 md:col-span-3 text-sm text-[#5A6650] tracking-wider"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      {year}
                    </span>
                    <span
                      className="col-span-12 md:col-span-9 text-base text-[#1A1614]/75"
                      style={{ fontFamily: "'Inter Tight', sans-serif" }}
                    >
                      {text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <FinalCTA setRoute={setRoute} />
    </div>
  );
}

/* ---------- CONTATTI PAGE ---------- */

function ContattiPage() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefono: "",
    tipologia: "casa",
    citta: "",
    budget: "",
    messaggio: "",
    privacy: false,
  });
  const [sent, setSent] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.privacy) return;
    setSent(true);
  };

  return (
    <div className="bg-[#F4EFE6] min-h-screen pt-32 md:pt-40 pb-32 px-6 md:px-10">
      <div className="max-w-[1600px] mx-auto">
        <div
          className="flex items-center gap-3 mb-8 text-[10px] tracking-[0.3em] uppercase text-[#6B6259]"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          <span className="text-[#B8593A]">— Contact</span>
          <span className="w-12 h-px bg-[#1A1614]/20" />
          <span>Studio · Castellaneta (TA)</span>
        </div>

        <h1
          className="font-serif tracking-[-0.02em] leading-[0.9] mb-16 max-w-6xl"
          style={{
            fontFamily: "'Fraunces', serif",
            fontSize: "clamp(2.5rem, 8vw, 9rem)",
          }}
        >
          Parliamo
          <br />
          del tuo prossimo
          <br />
          <em className="italic font-light text-[#5A6650]">spazio.</em>
        </h1>

        <div className="grid grid-cols-12 gap-8 md:gap-16">
          <div className="col-span-12 md:col-span-5 space-y-10">
            <p
              className="text-lg text-[#1A1614]/75 leading-relaxed max-w-md"
              style={{ fontFamily: "'Inter Tight', sans-serif" }}
            >
              Per una consulenza, un sopralluogo, una richiesta di preventivo. Rispondo personalmente a ogni messaggio,
              entro 48 ore.
            </p>

            <div className="space-y-6">
              {[
                ["Email", "info@francesco-dandrea.it", "mailto:info@francesco-dandrea.it"],
                ["Telefono", "+39 334 935 8494", "tel:+393349358494"],
                ["WhatsApp", "Scrivi direttamente", "https://wa.me/393349358494"],
              ].map(([label, val, href]) => (
                <div key={label}>
                  <div
                    className="text-[10px] tracking-[0.3em] uppercase text-[#6B6259] mb-1"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {label}
                  </div>
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="font-serif text-2xl md:text-3xl hover:text-[#B8593A] transition-colors"
                    style={{ fontFamily: "'Fraunces', serif" }}
                  >
                    {val} →
                  </a>
                </div>
              ))}
            </div>

            <div className="border-t border-[#1A1614]/15 pt-6">
              <div
                className="text-[10px] tracking-[0.3em] uppercase text-[#6B6259] mb-2"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                Studio
              </div>
              <p style={{ fontFamily: "'Inter Tight', sans-serif" }} className="text-lg">
                Castellaneta (TA), Puglia
                <br />
                <span className="text-[#6B6259] text-sm">Solo su appuntamento</span>
              </p>
            </div>
          </div>

          <div className="col-span-12 md:col-span-7">
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="thanks"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-[#5A6650] text-[#F4EFE6] p-12"
                >
                  <h3
                    className="font-serif text-4xl md:text-5xl mb-4"
                    style={{ fontFamily: "'Fraunces', serif" }}
                  >
                    Grazie<span className="text-[#E8DFD0]">.</span>
                  </h3>
                  <p style={{ fontFamily: "'Inter Tight', sans-serif" }} className="text-lg opacity-90">
                    Ho ricevuto il tuo messaggio. Ti rispondo personalmente entro 48 ore.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onSubmit={onSubmit}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Field label="Nome e cognome" required>
                      <input
                        required
                        value={form.nome}
                        onChange={(e) => setForm({ ...form, nome: e.target.value })}
                        className="w-full bg-transparent border-b border-[#1A1614]/30 focus:border-[#1A1614] py-3 outline-none text-lg"
                        style={{ fontFamily: "'Inter Tight', sans-serif" }}
                      />
                    </Field>
                    <Field label="Email" required>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full bg-transparent border-b border-[#1A1614]/30 focus:border-[#1A1614] py-3 outline-none text-lg"
                        style={{ fontFamily: "'Inter Tight', sans-serif" }}
                      />
                    </Field>
                    <Field label="Telefono">
                      <input
                        value={form.telefono}
                        onChange={(e) => setForm({ ...form, telefono: e.target.value })}
                        className="w-full bg-transparent border-b border-[#1A1614]/30 focus:border-[#1A1614] py-3 outline-none text-lg"
                        style={{ fontFamily: "'Inter Tight', sans-serif" }}
                      />
                    </Field>
                    <Field label="Città">
                      <input
                        value={form.citta}
                        onChange={(e) => setForm({ ...form, citta: e.target.value })}
                        className="w-full bg-transparent border-b border-[#1A1614]/30 focus:border-[#1A1614] py-3 outline-none text-lg"
                        style={{ fontFamily: "'Inter Tight', sans-serif" }}
                      />
                    </Field>
                  </div>

                  <Field label="Tipologia progetto">
                    <div className="flex flex-wrap gap-2 mt-2">
                      {[
                        ["casa", "Casa"],
                        ["locale", "Locale / Horeca"],
                        ["retail", "Retail"],
                        ["prodotto", "Prodotto"],
                        ["altro", "Altro"],
                      ].map(([v, l]) => (
                        <button
                          type="button"
                          key={v}
                          onClick={() => setForm({ ...form, tipologia: v })}
                          className={`px-4 py-2 text-xs tracking-[0.2em] uppercase transition-all ${
                            form.tipologia === v
                              ? "bg-[#1A1614] text-[#F4EFE6]"
                              : "border border-[#1A1614]/20 text-[#6B6259] hover:border-[#1A1614]"
                          }`}
                          style={{ fontFamily: "'Inter Tight', sans-serif" }}
                        >
                          {l}
                        </button>
                      ))}
                    </div>
                  </Field>

                  <Field label="Budget indicativo">
                    <select
                      value={form.budget}
                      onChange={(e) => setForm({ ...form, budget: e.target.value })}
                      className="w-full bg-transparent border-b border-[#1A1614]/30 focus:border-[#1A1614] py-3 outline-none text-lg"
                      style={{ fontFamily: "'Inter Tight', sans-serif" }}
                    >
                      <option value="">— Seleziona</option>
                      <option>Sotto 20.000 €</option>
                      <option>20.000 – 50.000 €</option>
                      <option>50.000 – 100.000 €</option>
                      <option>Oltre 100.000 €</option>
                      <option>Da definire</option>
                    </select>
                  </Field>

                  <Field label="Messaggio" required>
                    <textarea
                      required
                      rows={4}
                      value={form.messaggio}
                      onChange={(e) => setForm({ ...form, messaggio: e.target.value })}
                      placeholder="Raccontami lo spazio che vuoi trasformare…"
                      className="w-full bg-transparent border-b border-[#1A1614]/30 focus:border-[#1A1614] py-3 outline-none text-lg resize-none"
                      style={{ fontFamily: "'Inter Tight', sans-serif" }}
                    />
                  </Field>

                  <label className="flex items-start gap-3 text-sm text-[#6B6259] cursor-pointer" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                    <input
                      type="checkbox"
                      checked={form.privacy}
                      onChange={(e) => setForm({ ...form, privacy: e.target.checked })}
                      className="mt-1 accent-[#1A1614]"
                    />
                    <span>
                      Acconsento al trattamento dei dati personali secondo la <em>privacy policy</em>. I dati saranno
                      usati solo per rispondere alla richiesta.
                    </span>
                  </label>

                  <div className="flex flex-wrap gap-4 pt-4">
                    <button
                      type="submit"
                      disabled={!form.privacy}
                      className="group bg-[#1A1614] text-[#F4EFE6] px-8 py-4 text-sm tracking-[0.2em] uppercase disabled:opacity-30 disabled:cursor-not-allowed relative overflow-hidden"
                      style={{ fontFamily: "'Inter Tight', sans-serif" }}
                    >
                      <span className="relative z-10 flex items-center gap-3">
                        Invia richiesta
                        <span className="transition-transform group-hover:translate-x-1">→</span>
                      </span>
                    </button>
                    <a
                      href="https://wa.me/393349358494"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm tracking-[0.2em] uppercase px-8 py-4 border border-[#1A1614]/20 hover:border-[#1A1614] transition-colors"
                      style={{ fontFamily: "'Inter Tight', sans-serif" }}
                    >
                      Oppure WhatsApp
                    </a>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, required, children }) {
  return (
    <label className="block">
      <span
        className="text-[10px] tracking-[0.3em] uppercase text-[#6B6259] block mb-1"
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      >
        {label} {required && <span className="text-[#B8593A]">*</span>}
      </span>
      {children}
    </label>
  );
}

/* ---------- APP ---------- */

export default function App() {
  const [loading, setLoading] = useState(true);
  const [route, setRoute] = useState({ name: "home" });
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [route]);

  return (
    <div className="min-h-screen bg-[#F4EFE6] text-[#1A1614]" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
      <Cursor />
      <AnimatePresence>{loading && <Loader onDone={() => setLoading(false)} />}</AnimatePresence>

      <Nav route={route} setRoute={setRoute} scrolled={scrolled} />

      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={route.name + (route.slug || "")}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {route.name === "home" && (
              <>
                <Hero setRoute={setRoute} />
                <Ticker />
                <Manifesto />
                <FeaturedWorks setRoute={setRoute} />
                <ServicesSection setRoute={setRoute} />
                <ProcessSection />
                <AboutSection setRoute={setRoute} />
                <FinalCTA setRoute={setRoute} />
              </>
            )}
            {route.name === "portfolio" && <PortfolioPage setRoute={setRoute} />}
            {route.name === "project" && <ProjectPage slug={route.slug} setRoute={setRoute} />}
            {route.name === "servizi" && <ServiziPage setRoute={setRoute} />}
            {route.name === "about" && <AboutPage setRoute={setRoute} />}
            {route.name === "contatti" && <ContattiPage />}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer setRoute={setRoute} />
    </div>
  );
}

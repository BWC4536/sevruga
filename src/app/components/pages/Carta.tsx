import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router";
import { Wine } from "lucide-react";

type Allergen = "gluten" | "lacteos" | "marisco" | "pescado" | "huevos" | "vegano" | "singluten";

interface Dish {
  name: string;
  desc: string;
  price?: string;
  allergens: Allergen[];
}

const allergenIcons: Record<Allergen, { label: string; color: string }> = {
  gluten: { label: "G", color: "#D4A055" },
  lacteos: { label: "L", color: "#A8C5DA" },
  marisco: { label: "M", color: "#E8865A" },
  pescado: { label: "P", color: "#4A90D9" },
  huevos: { label: "H", color: "#F5C842" },
  vegano: { label: "VG", color: "#6BAF6B" },
  singluten: { label: "SG", color: "#9B8EC4" },
};

const menuData: Record<string, Dish[]> = {
  "Entradas Frías": [
    {
      name: "Ensalada Templada de Cangrejos de Río",
      desc: "Con vinagreta de miso blanco, brotes de temporada y sal de algas",
      allergens: ["marisco", "singluten"],
    },
    {
      name: "Tartar de Atún Rojo del Estrecho",
      desc: "Aguacate, togarashi, crema de wasabi y soja de trufa negra",
      allergens: ["pescado", "singluten"],
    },
    {
      name: "Gazpacho Andaluz de Tomate Asado",
      desc: "Con virutas de jamón ibérico, polvo de aceituna negra y aceite de arbequina",
      allergens: ["vegano"],
    },
    {
      name: "Foie Gras Mi-Cuit con Pan Brioche",
      desc: "Confitura de higo, sal Maldon y reducción de Pedro Ximénez",
      allergens: ["gluten", "lacteos", "huevos"],
    },
  ],
  "Entradas Calientes": [
    {
      name: "Croquetas de Albur del Guadalquivir",
      desc: "Bechamel de leche de oveja, paprika ahumada y alioli de limón",
      allergens: ["gluten", "lacteos", "pescado", "huevos"],
    },
    {
      name: "Huevos de Corral con Trufa Negra de Teruel",
      desc: "Puerro confitado, chips de patata morada y crema de patata",
      allergens: ["huevos", "lacteos", "singluten"],
    },
    {
      name: "Pulpo a la Gallega con Pimentón de la Vera",
      desc: "Sobre crema de patata ahumada y aceite de oliva virgen extra",
      allergens: ["marisco", "singluten"],
    },
    {
      name: "Alcachofas con Jamón Ibérico de Bellota",
      desc: "Salteadas con ajo negro y glaseadas con caldo de jamón",
      allergens: ["singluten"],
    },
  ],
  Pescados: [
    {
      name: "Albur de Estero a la Brasa",
      desc: "El pez icónico del Guadalquivir, con mantequilla de algas, limón de Lepe y caviar andaluz",
      allergens: ["pescado", "lacteos", "singluten"],
    },
    {
      name: "Lubina Salvaje al Horno",
      desc: "Con patatas confitadas, romesco de pimientos asados y salsa verde",
      allergens: ["pescado", "singluten"],
    },
    {
      name: "Lenguado Meunière con Alcaparras",
      desc: "Mantequilla noisette, limón, perejil fresco y croutons de brioche",
      allergens: ["pescado", "lacteos", "gluten"],
    },
    {
      name: "Gamba Blanca de Huelva a la Plancha",
      desc: "En su estado más puro, con aceite de albahaca y sal de vino fino",
      allergens: ["marisco", "singluten"],
    },
  ],
  Carnes: [
    {
      name: "Solomillo de Buey Retinto al Carbón",
      desc: "Con tuétano, jugo de carne reducido, hongos de temporada y patata fondant",
      allergens: ["lacteos", "singluten"],
    },
    {
      name: "Pichón de Bresse con Foie y Ciruela",
      desc: "Muslo confitado, pechuga rosada, puré trufado y jus de caza",
      allergens: ["singluten"],
    },
    {
      name: "Cordero Lechal de Extremadura",
      desc: "Asado lentamente, con cous cous de verduras, yogur de oveja y chermoula",
      allergens: ["lacteos", "gluten"],
    },
  ],
};

const wines: Record<string, { name: string; bodega: string; region: string; precio: string }[]> = {
  Espumosos: [
    { name: "Raventós i Blanc L'Hereu", bodega: "Raventós i Blanc", region: "Penedès", precio: "48€" },
    { name: "Recaredo Terrers Brut Nature", bodega: "Recaredo", region: "Penedès", precio: "62€" },
    { name: "Billecart-Salmon Brut Réserve", bodega: "Billecart-Salmon", region: "Champagne", precio: "95€" },
  ],
  Blancos: [
    { name: "Contino Blanco", bodega: "Contino", region: "Rioja", precio: "38€" },
    { name: "Telmo Rodríguez Mountain Wine", bodega: "Telmo Rodríguez", region: "Málaga", precio: "44€" },
    { name: "Goliardo Caiño Blanco", bodega: "Forjas del Salnés", region: "Rías Baixas", precio: "56€" },
    { name: "Pago de Capellanes Blanco", bodega: "Pago de Capellanes", region: "Ribera del Duero", precio: "42€" },
  ],
  Tintos: [
    { name: "Muga Reserva Selección Especial", bodega: "Muga", region: "Rioja Alta", precio: "72€" },
    { name: "Emilio Moro Finca Resalso", bodega: "Emilio Moro", region: "Ribera del Duero", precio: "35€" },
    { name: "Vega Sicilia Valbuena 5º", bodega: "Vega Sicilia", region: "Ribera del Duero", precio: "185€" },
    { name: "Álvaro Palacios L'Ermita", bodega: "Álvaro Palacios", region: "Priorat", precio: "420€" },
  ],
};

function FadeIn({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.75, ease: [0.25, 0.1, 0.25, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Carta() {
  const [activeCategory, setActiveCategory] = useState("Entradas Frías");
  const [activeWine, setActiveWine] = useState("Blancos");

  return (
    <div className="bg-[#F9F9F9]">
      {/* Page Header */}
      <div
        className="pt-40 pb-20 px-8 text-center relative overflow-hidden"
        style={{ backgroundColor: "#1A1A1A" }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1663530761401-15eefb544889?w=1400&fit=crop')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="relative z-10">
          <FadeIn>
            <p className="text-[0.6rem] tracking-[0.3em] uppercase mb-5" style={{ color: "#C4714A" }}>
              Restaurante Sevruga
            </p>
            <h1
              className="text-white"
              style={{
                fontFamily: "Playfair Display, serif",
                fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
                fontWeight: 500,
              }}
            >
              La Carta
            </h1>
            <p className="mt-4 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
              Temporada Primavera · Verano 2026
            </p>
          </FadeIn>
        </div>
      </div>

      {/* ── MENÚ DEGUSTACIÓN (FEATURED BOX) ── */}
      <section className="px-8 py-20">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div
              className="relative p-12 overflow-hidden"
              style={{
                backgroundColor: "#1B3A6B",
                boxShadow: "0 20px 60px rgba(27,58,107,0.25)",
              }}
            >
              {/* Decorative corner */}
              <div
                className="absolute top-0 right-0 w-32 h-32 opacity-10"
                style={{
                  backgroundImage: "radial-gradient(circle at 100% 0%, #C4714A 0%, transparent 70%)",
                }}
              />
              <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                <div>
                  <p
                    className="text-[0.6rem] tracking-[0.28em] uppercase mb-3"
                    style={{ color: "rgba(196,113,74,0.9)" }}
                  >
                    Experiencia Premium
                  </p>
                  <h2
                    className="text-white mb-4"
                    style={{
                      fontFamily: "Playfair Display, serif",
                      fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                      fontWeight: 500,
                    }}
                  >
                    Menú Degustación
                  </h2>
                  <div className="w-10 h-px bg-[#C4714A] mb-6" />
                  <div className="flex flex-col gap-2 mb-6">
                    {[
                      "Aperitivos de bienvenida de la casa",
                      "5 platos en formato degustación",
                      "Selección de postres artesanales",
                      "Pan artesano con mantequilla trufada",
                    ].map((item, i) => (
                      <p key={i} className="flex items-center gap-3 text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
                        <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ backgroundColor: "#C4714A" }} />
                        {item}
                      </p>
                    ))}
                  </div>
                  <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                    * Maridaje con vinos seleccionados disponible por +35€ por persona
                  </p>
                </div>
                <div className="text-center flex-shrink-0">
                  <p
                    className="text-white mb-1"
                    style={{ fontFamily: "Playfair Display, serif", fontSize: "3rem", fontWeight: 400 }}
                  >
                    40€
                  </p>
                  <p className="text-xs tracking-widest uppercase mb-6" style={{ color: "rgba(255,255,255,0.5)" }}>
                    por persona
                  </p>
                  <Link
                    to="/reservas"
                    className="inline-flex items-center px-8 py-3 text-white text-[0.68rem] tracking-[0.18em] uppercase transition-all duration-300 hover:bg-white hover:text-[#1B3A6B]"
                    style={{ border: "1px solid rgba(255,255,255,0.4)" }}
                  >
                    Reservar
                  </Link>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── MENU CATEGORIES ── */}
      <section className="px-8 pb-20">
        <div className="max-w-4xl mx-auto">
          {/* Category Tabs */}
          <FadeIn className="flex flex-wrap justify-center gap-2 mb-14">
            {Object.keys(menuData).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-6 py-2.5 text-[0.68rem] tracking-[0.15em] uppercase transition-all duration-300"
                style={{
                  backgroundColor: activeCategory === cat ? "#1A1A1A" : "transparent",
                  color: activeCategory === cat ? "#ffffff" : "#666",
                  border: `1px solid ${activeCategory === cat ? "#1A1A1A" : "#D5D5D5"}`,
                }}
              >
                {cat}
              </button>
            ))}
          </FadeIn>

          {/* Allergen Legend */}
          <FadeIn className="flex flex-wrap items-center gap-4 mb-10 p-5" style={{ backgroundColor: "#F0EDE8" }}>
            <span className="text-[0.6rem] tracking-[0.18em] uppercase" style={{ color: "#999" }}>
              Alérgenos:
            </span>
            {Object.entries(allergenIcons).map(([key, val]) => (
              <span key={key} className="flex items-center gap-1.5 text-xs" style={{ color: "#666" }}>
                <span
                  className="w-5 h-5 rounded-sm flex items-center justify-center text-white text-[0.55rem] font-medium"
                  style={{ backgroundColor: val.color }}
                >
                  {val.label}
                </span>
                {key.charAt(0).toUpperCase() + key.slice(1).replace("singluten", "Sin Gluten")}
              </span>
            ))}
          </FadeIn>

          {/* Dish List */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col divide-y"
              style={{ borderColor: "#E8E8E8" }}
            >
              {menuData[activeCategory].map((dish, i) => (
                <div key={i} className="py-7 flex items-start justify-between gap-6">
                  <div className="flex-1">
                    <h3
                      className="mb-2"
                      style={{
                        fontFamily: "Playfair Display, serif",
                        fontSize: "1.05rem",
                        fontWeight: 500,
                        color: "#1A1A1A",
                      }}
                    >
                      {dish.name}
                    </h3>
                    <p className="text-sm mb-4" style={{ color: "#777", lineHeight: 1.65 }}>
                      {dish.desc}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {dish.allergens.map((a) => (
                        <span
                          key={a}
                          className="w-5 h-5 rounded-sm flex items-center justify-center text-white text-[0.55rem] font-medium"
                          title={a}
                          style={{ backgroundColor: allergenIcons[a]?.color ?? "#aaa" }}
                        >
                          {allergenIcons[a]?.label ?? a}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── WINE LIST ── */}
      <section className="py-20 px-8" style={{ backgroundColor: "#1A1A1A" }}>
        <div className="max-w-4xl mx-auto">
          <FadeIn className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-5">
              <Wine className="w-5 h-5" style={{ color: "#C4714A" }} />
              <p className="text-[0.62rem] tracking-[0.25em] uppercase" style={{ color: "#C4714A" }}>
                Bodega
              </p>
            </div>
            <h2
              className="text-white"
              style={{
                fontFamily: "Playfair Display, serif",
                fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
                fontWeight: 500,
              }}
            >
              Nuestra Selección de Vinos
            </h2>
          </FadeIn>

          {/* Wine Tabs */}
          <FadeIn className="flex justify-center gap-1 mb-12">
            {Object.keys(wines).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveWine(cat)}
                className="px-8 py-3 text-[0.68rem] tracking-[0.15em] uppercase transition-all duration-300"
                style={{
                  backgroundColor: activeWine === cat ? "#C4714A" : "transparent",
                  color: activeWine === cat ? "#ffffff" : "rgba(255,255,255,0.5)",
                  border: `1px solid ${activeWine === cat ? "#C4714A" : "rgba(255,255,255,0.15)"}`,
                }}
              >
                {cat}
              </button>
            ))}
          </FadeIn>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeWine}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="flex flex-col divide-y"
              style={{ borderColor: "rgba(255,255,255,0.07)" }}
            >
              {wines[activeWine].map((wine, i) => (
                <div key={i} className="py-5 flex items-center justify-between gap-6">
                  <div>
                    <p
                      className="text-white mb-1"
                      style={{ fontFamily: "Playfair Display, serif", fontSize: "1rem" }}
                    >
                      {wine.name}
                    </p>
                    <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                      {wine.bodega} · {wine.region}
                    </p>
                  </div>
                  <p
                    className="flex-shrink-0"
                    style={{ fontFamily: "Playfair Display, serif", color: "#C4714A", fontSize: "1rem" }}
                  >
                    {wine.precio}
                  </p>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          <FadeIn className="mt-10 text-center">
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)", lineHeight: 1.8 }}>
              Nuestra sumiller estará encantada de asesorarle con el maridaje perfecto para su menú.<br />
              Carta de vinos completa disponible en sala.
            </p>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}

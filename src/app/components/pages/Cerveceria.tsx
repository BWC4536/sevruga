import { motion } from "motion/react";
import type { ReactNode } from "react";
import { MapPin, Phone, Clock } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import barImg from "../../../imports/image.png";
import bar2Img from "../../../imports/image-1.png";
import { Link } from "react-router";

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

const tapas = [
  { name: "Croquetas de Jamón Ibérico", desc: "Receta tradicional con bechamel de leche fresca y jamón 100% bellota" },
  { name: "Gambas al Pil-Pil", desc: "Gambas blancas de Huelva en aceite de oliva virgen, ajo y guindilla" },
  { name: "Puntillitas Fritas", desc: "Chocos pequeños rebozados con harina de garbanzo y sal marina" },
  { name: "Boquerones en Vinagre", desc: "Con pimiento rojo, ajo, aceite de oliva y perejil fresco" },
  { name: "Patatas Bravas Sevruga", desc: "Con nuestra salsa brava casera y alioli de ajo negro" },
  { name: "Chicharrones al Limón", desc: "Chicharrones crujientes con limón de Lepe y sal de verduras" },
  { name: "Jamón Ibérico de Bellota", desc: "Selección de jamón ibérico de bellota cortado a cuchillo" },
  { name: "Tabla de Quesos Andaluces", desc: "Selección de quesos artesanales de la provincia, con mermelada y nueces" },
];

export function Cerveceria() {
  return (
    <div className="bg-[#F9F9F9]">
      {/* Hero Header */}
      <div
        className="relative pt-40 pb-28 px-8 overflow-hidden"
        style={{ backgroundColor: "#2C1810" }}
      >
        {/* Background texture from bar image */}
        <div className="absolute inset-0">
          <ImageWithFallback
            src={bar2Img}
            alt="Interior de la Cervecería Sevruga"
            className="w-full h-full object-cover opacity-25"
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(135deg, rgba(44,24,16,0.9) 0%, rgba(44,24,16,0.75) 100%)" }}
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto">
          <FadeIn>
            <div
              className="inline-block px-4 py-1.5 mb-6 text-[0.58rem] tracking-[0.25em] uppercase"
              style={{ border: "1px solid rgba(196,113,74,0.5)", color: "#C4714A" }}
            >
              Un espacio diferente
            </div>
            <h1
              className="text-white mb-5"
              style={{
                fontFamily: "Playfair Display, serif",
                fontSize: "clamp(2.4rem, 6vw, 4rem)",
                fontWeight: 500,
                lineHeight: 1.15,
              }}
            >
              Cervecería Sevruga
            </h1>
            <div className="w-10 h-px bg-[#C4714A] mb-6" />
            <p
              className="max-w-lg"
              style={{
                color: "rgba(255,255,255,0.7)",
                fontSize: "1.05rem",
                lineHeight: 1.75,
                fontFamily: "Playfair Display, serif",
                fontStyle: "italic",
              }}
            >
              "Las tapitas de siempre con el característico toque Sevruga"
            </p>
          </FadeIn>
        </div>
      </div>

      {/* Info + Gallery Grid */}
      <section className="py-24 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* LEFT: Info */}
          <div className="lg:col-span-4">
            <FadeIn>
              <p className="text-[0.62rem] tracking-[0.25em] uppercase mb-8" style={{ color: "#C4714A" }}>
                Dónde encontrarnos
              </p>

              <div className="flex flex-col gap-8 mb-12">
                <div className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "#F0EDE8" }}
                  >
                    <MapPin className="w-4 h-4" style={{ color: "#C4714A" }} />
                  </div>
                  <div>
                    <p className="text-[0.6rem] tracking-[0.15em] uppercase mb-2" style={{ color: "#999" }}>Dirección</p>
                    <p className="text-sm leading-relaxed" style={{ color: "#1A1A1A" }}>
                      Pza. Manuel Ruíz Sosa<br />
                      (antigua Pza. Sagunto), 1<br />
                      Coria del Río (Centro)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "#F0EDE8" }}
                  >
                    <Phone className="w-4 h-4" style={{ color: "#C4714A" }} />
                  </div>
                  <div>
                    <p className="text-[0.6rem] tracking-[0.15em] uppercase mb-2" style={{ color: "#999" }}>Teléfono</p>
                    <a
                      href="tel:+34954772149"
                      className="text-sm hover:text-[#C4714A] transition-colors"
                      style={{ color: "#1A1A1A" }}
                    >
                      954 77 21 49
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "#F0EDE8" }}
                  >
                    <Clock className="w-4 h-4" style={{ color: "#C4714A" }} />
                  </div>
                  <div>
                    <p className="text-[0.6rem] tracking-[0.15em] uppercase mb-2" style={{ color: "#999" }}>Horario</p>
                    <p className="text-sm" style={{ color: "#1A1A1A" }}>
                      Martes a Domingo
                    </p>
                    <p className="text-xs mt-1" style={{ color: "#777" }}>
                      A partir de las 12:00
                    </p>
                    <p className="text-xs mt-2" style={{ color: "#AAA" }}>
                      Cerrado domingos noche y lunes
                    </p>
                  </div>
                </div>
              </div>

              {/* Atmosphere tags */}
              <div className="flex flex-wrap gap-2">
                {["Tapas", "Raciones", "Cerveza Artesana", "Vinos por Copa", "Ambiente Tradicional"].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 text-[0.58rem] tracking-[0.12em] uppercase"
                    style={{ border: "1px solid #D5D0C8", color: "#888" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </FadeIn>
          </div>

          {/* RIGHT: Photos Grid */}
          <div className="lg:col-span-8">
            <FadeIn delay={0.15}>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2" style={{ height: "360px" }}>
                  <ImageWithFallback
                    src={barImg}
                    alt="Barra de la Cervecería Sevruga"
                    className="w-full h-full object-cover"
                    style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.1)" }}
                  />
                </div>
                <div style={{ height: "240px" }}>
                  <ImageWithFallback
                    src={bar2Img}
                    alt="Ambiente de la Cervecería Sevruga"
                    className="w-full h-full object-cover"
                    style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.1)" }}
                  />
                </div>
                <div
                  className="flex items-center justify-center"
                  style={{
                    height: "240px",
                    backgroundColor: "#2C1810",
                    boxShadow: "0 8px 40px rgba(0,0,0,0.1)",
                  }}
                >
                  <div className="text-center px-8">
                    <p
                      className="text-white mb-3"
                      style={{ fontFamily: "Playfair Display, serif", fontSize: "2.5rem", fontWeight: 400 }}
                    >
                      1979
                    </p>
                    <p className="text-[0.6rem] tracking-[0.22em] uppercase" style={{ color: "rgba(196,113,74,0.8)" }}>
                      Tradición en el centro
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Tapas Menu */}
      <section className="py-20 px-8" style={{ backgroundColor: "#F0EDE8" }}>
        <div className="max-w-4xl mx-auto">
          <FadeIn className="text-center mb-16">
            <p className="text-[0.62rem] tracking-[0.25em] uppercase mb-4" style={{ color: "#C4714A" }}>
              Lo que nos define
            </p>
            <h2
              style={{
                fontFamily: "Playfair Display, serif",
                fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
                fontWeight: 500,
                color: "#1A1A1A",
              }}
            >
              Tapas & Raciones
            </h2>
            <p className="mt-4 text-sm max-w-md mx-auto" style={{ color: "#777", lineHeight: 1.7 }}>
              Producto de proximidad, recetas de siempre y ese toque especial que convierte cada visita en un recuerdo.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {tapas.map((tapa, i) => (
              <FadeIn key={tapa.name} delay={Math.floor(i / 2) * 0.1}>
                <div
                  className="p-7 border-b"
                  style={{
                    borderColor: "#DDD9D3",
                    borderRight: i % 2 === 0 ? "1px solid #DDD9D3" : "none",
                  }}
                >
                  <h3
                    className="mb-2"
                    style={{ fontFamily: "Playfair Display, serif", fontSize: "1rem", fontWeight: 500, color: "#1A1A1A" }}
                  >
                    {tapa.name}
                  </h3>
                  <p className="text-xs leading-relaxed" style={{ color: "#888", lineHeight: 1.7 }}>
                    {tapa.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.3} className="text-center mt-12">
            <p className="text-xs mb-6" style={{ color: "#999" }}>
              Carta completa disponible en el local · Elaboraciones pueden contener alérgenos · Consulte con el personal
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── MAP PLACEHOLDER ── */}
      <section className="py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <FadeIn className="mb-10">
            <p className="text-[0.62rem] tracking-[0.25em] uppercase mb-2" style={{ color: "#C4714A" }}>
              Ubicación
            </p>
            <h2
              style={{
                fontFamily: "Playfair Display, serif",
                fontSize: "1.8rem",
                fontWeight: 500,
                color: "#1A1A1A",
              }}
            >
              Cervecería en el Centro de Coria del Río
            </h2>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div
              className="relative w-full flex items-center justify-center"
              style={{
                minHeight: "480px",
                backgroundColor: "#E8E4DE",
                border: "2px solid #D5D0C8",
              }}
            >
              {/* Decorative grid */}
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage: "linear-gradient(#C8C2BA 1px, transparent 1px), linear-gradient(90deg, #C8C2BA 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />
              <div className="relative z-10 text-center px-8">
                <div
                  className="w-12 h-12 mx-auto mb-5 flex items-center justify-center"
                  style={{ backgroundColor: "rgba(196,113,74,0.15)", border: "1px solid rgba(196,113,74,0.3)" }}
                >
                  <MapPin className="w-6 h-6" style={{ color: "#C4714A" }} />
                </div>
                <p
                  className="text-sm font-medium mb-2"
                  style={{ fontFamily: "Playfair Display, serif", color: "#4A4540" }}
                >
                  Cervecería Sevruga
                </p>
                <p className="text-xs mb-6" style={{ color: "#8A8580" }}>
                  Pza. Manuel Ruíz Sosa · Coria del Río (Centro)
                </p>
                <div
                  className="inline-block px-5 py-2.5 text-[0.65rem] tracking-[0.15em] uppercase"
                  style={{ border: "1.5px dashed #B8B0A8", color: "#8A8580" }}
                >
                  [ PLACEHOLDER: GOOGLE MAPS IFRAME FOR CERVECERIA LOCATION ]
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Cross-link to fine dining */}
      <section className="py-20 px-8" style={{ backgroundColor: "#1A1A1A" }}>
        <FadeIn className="max-w-2xl mx-auto text-center">
          <p className="text-[0.62rem] tracking-[0.25em] uppercase mb-5" style={{ color: "rgba(255,255,255,0.4)" }}>
            ¿Busca una experiencia más elaborada?
          </p>
          <h2
            className="text-white mb-6"
            style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 500 }}
          >
            Descubra el Restaurante Sevruga
          </h2>
          <p className="mb-10" style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9rem", lineHeight: 1.7 }}>
            Alta cocina andaluza contemporánea frente al Guadalquivir, con sala acristalada y vistas al río.
          </p>
          <Link
            to="/reservas"
            className="inline-flex items-center px-10 py-4 text-white text-[0.7rem] tracking-[0.2em] uppercase transition-all duration-300 hover:bg-[#7B2D42]"
            style={{ backgroundColor: "#C4714A" }}
          >
            Reservar en el Restaurante
          </Link>
        </FadeIn>
      </section>
    </div>
  );
}

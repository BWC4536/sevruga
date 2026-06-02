import { useRef, useEffect, useState, type ReactNode } from "react";
import { Link } from "react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { ChevronDown, Star, Award, Leaf, Quote } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import heroImg from "../../../imports/image-3.png";
import riverImg from "../../../imports/image-4.png";
import signImg from "../../../imports/image-2.png";

const dishes = [
  {
    id: 1,
    name: "Albur de Estero a la Brasa",
    description: "El pez del Guadalquivir con mantequilla de algas, limón de Lepe y caviar andaluz",
    tag: "Signature",
    allergens: ["sin-gluten"],
    img: "https://images.unsplash.com/photo-1750943083961-6b50f527901c?w=800&h=900&fit=crop",
  },
  {
    id: 2,
    name: "Gamba Blanca de Huelva",
    description: "Gamba en su estado más puro, con emulsión de sus cabezas y aceite de albahaca",
    tag: "Mar",
    allergens: ["crustáceos"],
    img: "https://images.unsplash.com/photo-1750943083282-2542e334fbad?w=800&h=900&fit=crop",
  },
  {
    id: 3,
    name: "Buey de Mar con Gazpacho de Mango",
    description: "Buey desmenuzado artesanalmente con gazpacho de mango y pepino de temporada",
    tag: "Temporada",
    allergens: ["crustáceos", "sin-gluten"],
    img: "https://images.unsplash.com/photo-1750943082458-96205a2111ef?w=800&h=900&fit=crop",
  },
];

const testimonials = [
  {
    id: 1,
    quote: "Una experiencia que trasciende la gastronomía. Las vistas al Guadalquivir al atardecer con ese nivel de cocina… es magia pura.",
    author: "María G.",
    origin: "Madrid",
    rating: 5,
  },
  {
    id: 2,
    quote: "El servicio es impecable, pero lo que más me marcó fue la conexión entre el producto del río y la técnica contemporánea. Extraordinario.",
    author: "James R.",
    origin: "Londres",
    rating: 5,
  },
  {
    id: 3,
    quote: "Reservamos para nuestra luna de miel y fue perfecto. La sala acristalada con el río fluyendo fuera… no existe otro lugar así.",
    author: "Ana & Pablo",
    origin: "Sevilla",
    rating: 5,
  },
];

function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.85, ease: [0.25, 0.1, 0.25, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 700], [0, 180]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#F9F9F9]">
      {/* ── HERO ── */}
      <section ref={heroRef} className="relative h-screen min-h-[680px] overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: heroY }}>
          <ImageWithFallback
            src={heroImg}
            alt="Vista del Guadalquivir desde la terraza de Sevruga"
            className="w-full h-full object-cover scale-110"
          />
          {/* Gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.22) 0%, rgba(0,0,0,0.48) 55%, rgba(0,0,0,0.72) 100%)",
            }}
          />
        </motion.div>

        {/* Hero Content */}
        <motion.div
          className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
          style={{ opacity: heroOpacity }}
        >
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-[0.65rem] tracking-[0.35em] uppercase text-white/70 mb-6"
          >
            Coria del Río · Guadalquivir
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.5 }}
            className="text-white max-w-3xl mx-auto"
            style={{
              fontFamily: "Playfair Display, serif",
              fontSize: "clamp(2.4rem, 6vw, 4.2rem)",
              fontWeight: 500,
              lineHeight: 1.18,
              textShadow: "0 2px 30px rgba(0,0,0,0.3)",
            }}
          >
            Alta cocina, vino y paisaje en Coria del Río
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="w-12 h-px bg-[#C4714A] my-7"
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="text-white/75 max-w-md mx-auto mb-10"
            style={{ fontSize: "0.95rem", lineHeight: 1.7 }}
          >
            Una experiencia gastronómica frente al Guadalquivir, donde el producto local se transforma en alta cocina contemporánea.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <Link
              to="/reservas"
              className="inline-flex items-center px-10 py-4 text-white text-[0.72rem] tracking-[0.2em] uppercase font-medium transition-all duration-300 hover:bg-[#7B2D42] hover:shadow-lg"
              style={{ backgroundColor: "#C4714A" }}
            >
              Reservar Mesa
            </Link>
            <Link
              to="/carta"
              className="inline-flex items-center px-10 py-4 text-white text-[0.72rem] tracking-[0.2em] uppercase font-medium border border-white/40 hover:border-white/80 transition-all duration-300 hover:bg-white/10"
            >
              Ver la Carta
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
        >
          <span className="text-white/40 text-[0.55rem] tracking-[0.3em] uppercase">Descubrir</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <ChevronDown className="w-5 h-5 text-white/40" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── TRUST BADGES ── */}
      <section className="border-b border-black/8" style={{ backgroundColor: "#F9F9F9" }}>
        <div className="max-w-5xl mx-auto px-8 py-8 flex flex-col sm:flex-row items-center justify-center gap-10">
          <FadeIn delay={0.1} className="flex items-center gap-4">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: "#C4714A" }}
            >
              <Award className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-[0.6rem] tracking-[0.2em] uppercase" style={{ color: "#C4714A" }}>
                Reconocido por
              </p>
              <p className="text-sm font-medium" style={{ fontFamily: "Playfair Display, serif", color: "#1A1A1A" }}>
                Solete Guía Repsol
              </p>
            </div>
          </FadeIn>

          <div className="w-px h-10 bg-black/10 hidden sm:block" />

          <FadeIn delay={0.2} className="flex items-center gap-4">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: "#1B3A6B" }}
            >
              <Star className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-[0.6rem] tracking-[0.2em] uppercase" style={{ color: "#1B3A6B" }}>
                Seleccionado por
              </p>
              <p className="text-sm font-medium" style={{ fontFamily: "Playfair Display, serif", color: "#1A1A1A" }}>
                Michelin Guide España
              </p>
            </div>
          </FadeIn>

          <div className="w-px h-10 bg-black/10 hidden sm:block" />

          <FadeIn delay={0.3} className="flex items-center gap-4">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: "#7B2D42" }}
            >
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-[0.6rem] tracking-[0.2em] uppercase" style={{ color: "#7B2D42" }}>
                Filosofía
              </p>
              <p className="text-sm font-medium" style={{ fontFamily: "Playfair Display, serif", color: "#1A1A1A" }}>
                Producto Local & Km 0
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── ABOUT SNIPPET ── */}
      <section className="py-28 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-5 lg:col-start-2">
            <FadeIn>
              <p className="text-[0.62rem] tracking-[0.25em] uppercase mb-5" style={{ color: "#C4714A" }}>
                Nuestra Historia
              </p>
              <h2
                style={{
                  fontFamily: "Playfair Display, serif",
                  fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
                  fontWeight: 500,
                  lineHeight: 1.25,
                  color: "#1A1A1A",
                }}
                className="mb-8"
              >
                Donde el río inspira <em>cada plato</em>
              </h2>
              <div className="w-8 h-px bg-[#C4714A] mb-8" />
              <p className="leading-relaxed mb-5" style={{ color: "#555", fontSize: "0.95rem", lineHeight: 1.85 }}>
                En Sevruga convertimos el Albur de Estero —el pez del Guadalquivir— en el alma de nuestra cocina. Cada producto que llega a nuestra cocina tiene un origen trazable, una historia local y una técnica que lo eleva sin traicionarlo.
              </p>
              <p className="leading-relaxed mb-10" style={{ color: "#555", fontSize: "0.95rem", lineHeight: 1.85 }}>
                Nuestra sala, completamente acristalada, ofrece una vista privilegiada sobre el río. Las embarcaciones que pasan, la luz del atardecer sobre el agua: el paisaje forma parte de la experiencia gastronómica.
              </p>
              <Link
                to="/carta"
                className="inline-flex items-center gap-3 text-[0.7rem] tracking-[0.18em] uppercase font-medium transition-all duration-300 group"
                style={{ color: "#1A1A1A" }}
              >
                Explorar la Carta
                <span
                  className="w-8 h-px bg-current transition-all duration-300 group-hover:w-12"
                />
              </Link>
            </FadeIn>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <FadeIn delay={0.2}>
              <div className="relative">
                <ImageWithFallback
                  src={signImg}
                  alt="Fachada de Restaurante Sevruga en Coria del Río"
                  className="w-full object-cover"
                  style={{
                    height: "520px",
                    boxShadow: "20px 20px 60px rgba(0,0,0,0.12), -4px -4px 30px rgba(0,0,0,0.04)",
                  }}
                />
                {/* Decorative frame offset */}
                <div
                  className="absolute -bottom-4 -left-4 w-full h-full pointer-events-none"
                  style={{ border: "1px solid rgba(196, 113, 74, 0.25)", zIndex: -1 }}
                />
                <div
                  className="absolute bottom-8 right-8 px-5 py-4 text-white text-center"
                  style={{ backgroundColor: "rgba(26,26,26,0.85)", backdropFilter: "blur(8px)" }}
                >
                  <p
                    className="text-[1.4rem] mb-0.5"
                    style={{ fontFamily: "Playfair Display, serif", fontWeight: 500 }}
                  >
                    Desde 2008
                  </p>
                  <p className="text-[0.6rem] tracking-[0.18em] uppercase text-white/60">
                    Coria del Río
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── STAR DISHES ── */}
      <section className="py-28 px-8" style={{ backgroundColor: "#F3F0EC" }}>
        <div className="max-w-7xl mx-auto">
          <FadeIn className="text-center mb-20">
            <p className="text-[0.62rem] tracking-[0.25em] uppercase mb-4" style={{ color: "#C4714A" }}>
              Platos Estrella
            </p>
            <h2
              style={{
                fontFamily: "Playfair Display, serif",
                fontSize: "clamp(1.9rem, 3.2vw, 2.6rem)",
                fontWeight: 500,
                color: "#1A1A1A",
              }}
            >
              Sabores que definen Sevruga
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {dishes.map((dish, i) => (
              <FadeIn key={dish.id} delay={i * 0.15}>
                <div
                  className="group overflow-hidden bg-white"
                  style={{
                    boxShadow: "0 4px 30px rgba(0,0,0,0.07)",
                  }}
                >
                  <div className="relative overflow-hidden" style={{ height: "320px" }}>
                    <img
                      src={dish.img}
                      alt={dish.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    <span
                      className="absolute top-5 left-5 px-3 py-1 text-white text-[0.58rem] tracking-[0.2em] uppercase"
                      style={{ backgroundColor: "#C4714A" }}
                    >
                      {dish.tag}
                    </span>
                  </div>
                  <div className="p-8">
                    <h3
                      className="mb-3"
                      style={{
                        fontFamily: "Playfair Display, serif",
                        fontSize: "1.15rem",
                        fontWeight: 500,
                        color: "#1A1A1A",
                        lineHeight: 1.3,
                      }}
                    >
                      {dish.name}
                    </h3>
                    <p className="text-sm leading-relaxed mb-5" style={{ color: "#777", lineHeight: 1.7 }}>
                      {dish.description}
                    </p>
                    <div className="flex items-center gap-2">
                      {dish.allergens.map((a) => (
                        <span
                          key={a}
                          className="text-[0.58rem] tracking-wide uppercase px-2 py-0.5 border"
                          style={{ color: "#999", borderColor: "#ddd" }}
                        >
                          {a}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.4} className="text-center mt-14">
            <Link
              to="/carta"
              className="inline-flex items-center gap-3 px-10 py-4 border text-[0.7rem] tracking-[0.18em] uppercase font-medium transition-all duration-300 hover:bg-[#1A1A1A] hover:text-white hover:border-[#1A1A1A]"
              style={{ borderColor: "#1A1A1A", color: "#1A1A1A" }}
            >
              Ver Carta Completa
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ── RIVER PARALLAX CTA ── */}
      <section className="relative h-72 overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0">
          <ImageWithFallback
            src={riverImg}
            alt="Atardecer en el Guadalquivir"
            className="w-full h-full object-cover scale-110"
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to right, rgba(27,58,107,0.75), rgba(196,113,74,0.5))" }}
          />
        </div>
        <FadeIn className="relative z-10 text-center px-6">
          <p
            className="text-white mb-4 italic"
            style={{ fontFamily: "Playfair Display, serif", fontSize: "1.35rem" }}
          >
            "Alta cocina, vino y paisaje en Coria del Río"
          </p>
          <p className="text-white/65 text-sm tracking-wider">— La filosofía Sevruga</p>
        </FadeIn>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-28 px-8">
        <div className="max-w-4xl mx-auto">
          <FadeIn className="text-center mb-20">
            <p className="text-[0.62rem] tracking-[0.25em] uppercase mb-4" style={{ color: "#C4714A" }}>
              Lo que dicen nuestros clientes
            </p>
            <h2
              style={{
                fontFamily: "Playfair Display, serif",
                fontSize: "clamp(1.9rem, 3.2vw, 2.6rem)",
                fontWeight: 500,
                color: "#1A1A1A",
              }}
            >
              Experiencias que perduran
            </h2>
          </FadeIn>

          <div className="relative min-h-[220px]">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.id}
                className="absolute inset-0 flex flex-col items-center text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: i === activeTestimonial ? 1 : 0 }}
                transition={{ duration: 0.8 }}
              >
                <Quote className="w-8 h-8 mb-8" style={{ color: "#C4714A", opacity: 0.5 }} />
                <p
                  className="mb-8 italic"
                  style={{
                    fontFamily: "Playfair Display, serif",
                    fontSize: "clamp(1.05rem, 2vw, 1.3rem)",
                    lineHeight: 1.75,
                    color: "#2A2A2A",
                    maxWidth: "700px",
                  }}
                >
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, si) => (
                    <Star key={si} className="w-3.5 h-3.5 fill-current" style={{ color: "#C4714A" }} />
                  ))}
                </div>
                <p className="text-sm font-medium" style={{ color: "#1A1A1A" }}>
                  {t.author}
                </p>
                <p className="text-xs mt-1" style={{ color: "#999" }}>
                  {t.origin}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Dots */}
          <div className="flex items-center justify-center gap-3 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveTestimonial(i)}
                className="w-2 h-2 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: i === activeTestimonial ? "#C4714A" : "#D9D9D9",
                  transform: i === activeTestimonial ? "scale(1.3)" : "scale(1)",
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-24 px-8" style={{ backgroundColor: "#1B3A6B" }}>
        <FadeIn className="max-w-2xl mx-auto text-center">
          <p className="text-[0.62rem] tracking-[0.25em] uppercase mb-5" style={{ color: "rgba(255,255,255,0.5)" }}>
            Reserve su mesa
          </p>
          <h2
            className="text-white mb-6"
            style={{
              fontFamily: "Playfair Display, serif",
              fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
              fontWeight: 500,
            }}
          >
            Haga su reserva para una noche <em>inolvidable</em>
          </h2>
          <p className="mb-10" style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.95rem", lineHeight: 1.7 }}>
            Déjese sorprender por la cocina de Sevruga frente al Guadalquivir. Llámenos o reserve online con total comodidad.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/reservas"
              className="inline-flex items-center px-10 py-4 text-white text-[0.72rem] tracking-[0.2em] uppercase font-medium transition-all duration-300 hover:opacity-90"
              style={{ backgroundColor: "#C4714A" }}
            >
              Reservar Online
            </Link>
            <a
              href="tel:+34954776695"
              className="inline-flex items-center px-10 py-4 text-white text-[0.72rem] tracking-[0.2em] uppercase font-medium border border-white/30 hover:border-white/70 transition-all duration-300"
            >
              954 77 66 95
            </a>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}

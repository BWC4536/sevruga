import { useState, type ReactNode } from "react";
import { motion } from "motion/react";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";

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

export function Contactanos() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="bg-[#F9F9F9]">
      {/* Page Header */}
      <div className="pt-40 pb-20 px-8" style={{ backgroundColor: "#1A1A1A" }}>
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <p className="text-[0.6rem] tracking-[0.28em] uppercase mb-5" style={{ color: "#C4714A" }}>
              Estamos aquí para ayudarle
            </p>
            <h1
              className="text-white"
              style={{
                fontFamily: "Playfair Display, serif",
                fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
                fontWeight: 500,
              }}
            >
              Contacto & Ubicación
            </h1>
          </FadeIn>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-20 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* LEFT: Contact Info + Form */}
          <div className="lg:col-span-5">
            {/* Contact Info */}
            <FadeIn className="mb-14">
              <p className="text-[0.62rem] tracking-[0.25em] uppercase mb-8" style={{ color: "#C4714A" }}>
                Información de Contacto
              </p>
              <div className="flex flex-col gap-7">
                <div className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "#F0EDE8" }}
                  >
                    <MapPin className="w-4 h-4" style={{ color: "#C4714A" }} />
                  </div>
                  <div>
                    <p className="text-[0.62rem] tracking-[0.15em] uppercase mb-1" style={{ color: "#999" }}>Dirección</p>
                    <p className="text-sm leading-relaxed" style={{ color: "#1A1A1A" }}>
                      Avenida de Andalucía, 5<br />
                      41100 Coria del Río, Sevilla
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
                    <p className="text-[0.62rem] tracking-[0.15em] uppercase mb-1" style={{ color: "#999" }}>Teléfono</p>
                    <a
                      href="tel:+34954776695"
                      className="text-sm hover:text-[#C4714A] transition-colors"
                      style={{ color: "#1A1A1A" }}
                    >
                      954 77 66 95
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "#F0EDE8" }}
                  >
                    <Mail className="w-4 h-4" style={{ color: "#C4714A" }} />
                  </div>
                  <div>
                    <p className="text-[0.62rem] tracking-[0.15em] uppercase mb-1" style={{ color: "#999" }}>Email</p>
                    <a
                      href="mailto:info@sevruga.es"
                      className="text-sm hover:text-[#C4714A] transition-colors"
                      style={{ color: "#1A1A1A" }}
                    >
                      info@sevruga.es
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
                    <p className="text-[0.62rem] tracking-[0.15em] uppercase mb-2" style={{ color: "#999" }}>Horario</p>
                    <div className="flex flex-col gap-1">
                      <p className="text-sm" style={{ color: "#1A1A1A" }}>Martes a Domingo</p>
                      <p className="text-xs" style={{ color: "#777" }}>Almuerzo: 13:00 – 16:00</p>
                      <p className="text-xs" style={{ color: "#777" }}>Cena: 20:00 – 23:30</p>
                      <p className="text-xs mt-1" style={{ color: "#AAA" }}>Lunes: Cerrado</p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Contact Form */}
            <FadeIn delay={0.1}>
              <p className="text-[0.62rem] tracking-[0.25em] uppercase mb-8" style={{ color: "#C4714A" }}>
                Envíenos un Mensaje
              </p>
              {sent ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-8 text-center"
                  style={{ backgroundColor: "#F0EDE8" }}
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: "#C4714A" }}
                  >
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium mb-2" style={{ fontFamily: "Playfair Display, serif", color: "#1A1A1A" }}>
                    Mensaje enviado
                  </p>
                  <p className="text-xs" style={{ color: "#777" }}>
                    Nos pondremos en contacto con usted en breve.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  {[
                    { label: "Nombre", key: "name" as const, type: "text", placeholder: "Su nombre completo" },
                    { label: "Email", key: "email" as const, type: "email", placeholder: "su@email.com" },
                    { label: "Asunto", key: "subject" as const, type: "text", placeholder: "Motivo de su consulta" },
                  ].map(({ label, key, type, placeholder }) => (
                    <div key={key}>
                      <label className="block text-[0.62rem] tracking-[0.18em] uppercase mb-2" style={{ color: "#999" }}>
                        {label} *
                      </label>
                      <input
                        type={type}
                        value={form[key]}
                        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                        placeholder={placeholder}
                        required
                        className="w-full px-4 py-3 text-sm outline-none transition-all"
                        style={{ border: "1px solid #E0E0E0", backgroundColor: "#fff", color: "#1A1A1A" }}
                        onFocus={(e) => (e.target.style.borderColor = "#C4714A")}
                        onBlur={(e) => (e.target.style.borderColor = "#E0E0E0")}
                      />
                    </div>
                  ))}
                  <div>
                    <label className="block text-[0.62rem] tracking-[0.18em] uppercase mb-2" style={{ color: "#999" }}>
                      Mensaje *
                    </label>
                    <textarea
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Escriba su mensaje aquí..."
                      rows={5}
                      required
                      className="w-full px-4 py-3 text-sm outline-none transition-all resize-none"
                      style={{ border: "1px solid #E0E0E0", backgroundColor: "#fff", color: "#1A1A1A" }}
                      onFocus={(e) => (e.target.style.borderColor = "#C4714A")}
                      onBlur={(e) => (e.target.style.borderColor = "#E0E0E0")}
                    />
                  </div>
                  <button
                    type="submit"
                    className="flex items-center justify-center gap-3 px-8 py-4 text-white text-[0.7rem] tracking-[0.18em] uppercase transition-all duration-300 hover:bg-[#7B2D42]"
                    style={{ backgroundColor: "#C4714A" }}
                  >
                    <Send className="w-3.5 h-3.5" />
                    Enviar Mensaje
                  </button>
                </form>
              )}
            </FadeIn>
          </div>

          {/* RIGHT: Map Placeholder */}
          <div className="lg:col-span-7">
            <FadeIn delay={0.2} className="h-full">
              <p className="text-[0.62rem] tracking-[0.25em] uppercase mb-8" style={{ color: "#C4714A" }}>
                Cómo Llegar
              </p>
              <div
                className="relative w-full flex items-center justify-center overflow-hidden"
                style={{
                  minHeight: "600px",
                  backgroundColor: "#E8E4DE",
                  border: "2px solid #D5D0C8",
                }}
              >
                <iframe
                  src="https://maps.google.com/maps?q=Restaurante%20Sevruga,%20Coria%20del%20R%C3%ADo&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                />
              </div>

              {/* Directions hints */}
              <div className="mt-6 grid grid-cols-2 gap-4">
                {[
                  { title: "En Coche", desc: "A 20 minutos de Sevilla capital por la SE-30. Aparcamiento gratuito disponible en la zona." },
                  { title: "En Transporte", desc: "Autobús línea Sevilla–Coria del Río (Damas). Parada a 2 minutos del restaurante." },
                ].map(({ title, desc }) => (
                  <div key={title} className="p-5" style={{ backgroundColor: "#F0EDE8" }}>
                    <p className="text-[0.62rem] tracking-[0.15em] uppercase mb-2" style={{ color: "#C4714A" }}>
                      {title}
                    </p>
                    <p className="text-xs leading-relaxed" style={{ color: "#666" }}>{desc}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
}

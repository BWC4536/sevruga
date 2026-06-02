import { useState, type ReactNode } from "react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight, Users, Baby, Accessibility, Clock } from "lucide-react";
import riverImg from "../../../imports/image-4.png";
import { ImageWithFallback } from "../figma/ImageWithFallback";

const MONTHS = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
const DAYS = ["L","M","X","J","V","S","D"];

const timeSlots = [
  { id: "13:00", label: "13:00", period: "Almuerzo" },
  { id: "13:30", label: "13:30", period: "Almuerzo" },
  { id: "14:00", label: "14:00", period: "Almuerzo" },
  { id: "14:30", label: "14:30", period: "Almuerzo" },
  { id: "15:00", label: "15:00", period: "Almuerzo" },
  { id: "20:00", label: "20:00", period: "Cena" },
  { id: "20:30", label: "20:30", period: "Cena" },
  { id: "21:00", label: "21:00", period: "Cena" },
  { id: "21:30", label: "21:30", period: "Cena" },
  { id: "22:00", label: "22:00", period: "Cena" },
  { id: "22:30", label: "22:30", period: "Cena" },
];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfMonth(year: number, month: number) {
  let d = new Date(year, month, 1).getDay();
  return d === 0 ? 6 : d - 1; // Monday-first
}

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

export function Reservas() {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [accessibility, setAccessibility] = useState(false);
  const [prams, setPrams] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [step, setStep] = useState(1);

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth);

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  const isDisabled = (day: number) => {
    const d = new Date(viewYear, viewMonth, day);
    const dayOfWeek = d.getDay(); // 0=Sun, 1=Mon
    const isPast = d < new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return isPast || dayOfWeek === 1; // disabled on Mondays and past dates
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const selectedDateObj = selectedDate
    ? new Date(viewYear, viewMonth, selectedDate)
    : null;

  const stepIsComplete = (s: number) => {
    if (s === 1) return selectedDate !== null && selectedTime !== null;
    if (s === 2) return adults > 0;
    return false;
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-8 bg-[#F9F9F9]">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-lg text-center"
        >
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-8"
            style={{ backgroundColor: "#C4714A" }}
          >
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2
            className="mb-4"
            style={{ fontFamily: "Playfair Display, serif", fontSize: "2rem", color: "#1A1A1A" }}
          >
            Solicitud Recibida
          </h2>
          <p className="text-sm leading-relaxed mb-8" style={{ color: "#666" }}>
            Hemos recibido su solicitud de reserva para el{" "}
            <strong>{selectedDateObj?.toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long" })}</strong>{" "}
            a las <strong>{selectedTime}</strong> para <strong>{adults} adulto{adults !== 1 ? "s" : ""}</strong>.
            Le confirmaremos por email en menos de 24 horas.
          </p>
          <p className="text-xs mb-8" style={{ color: "#999" }}>
            Recuerde que puede llamarnos directamente al{" "}
            <a href="tel:+34954776695" className="underline">954 77 66 95</a>.
          </p>
          <button
            onClick={() => { setSubmitted(false); setStep(1); setSelectedDate(null); setSelectedTime(null); }}
            className="px-8 py-3 text-[0.7rem] tracking-[0.18em] uppercase text-white transition-colors"
            style={{ backgroundColor: "#C4714A" }}
          >
            Nueva Reserva
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-[#F9F9F9]">
      {/* Hero */}
      <div className="relative h-72 overflow-hidden flex items-end">
        <div className="absolute inset-0">
          <ImageWithFallback
            src={riverImg}
            alt="Guadalquivir al atardecer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75), rgba(0,0,0,0.2))" }} />
        </div>
        <div className="relative z-10 pb-12 px-8 w-full max-w-7xl mx-auto">
          <p className="text-[0.6rem] tracking-[0.28em] uppercase mb-3" style={{ color: "#C4714A" }}>
            Reserve su experiencia
          </p>
          <h1
            className="text-white"
            style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 500 }}
          >
            Reservas
          </h1>
        </div>
      </div>

      {/* Booking Form */}
      <section className="py-20 px-8">
        <div className="max-w-5xl mx-auto">
          {/* Steps Indicator */}
          <FadeIn className="flex items-center justify-center gap-4 mb-16">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-4">
                <button
                  onClick={() => s <= step && setStep(s)}
                  className="flex items-center gap-3 transition-all"
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-300"
                    style={{
                      backgroundColor: step >= s ? "#1A1A1A" : "transparent",
                      color: step >= s ? "#fff" : "#999",
                      border: `1.5px solid ${step >= s ? "#1A1A1A" : "#D0D0D0"}`,
                    }}
                  >
                    {s}
                  </div>
                  <span
                    className="text-[0.65rem] tracking-[0.15em] uppercase hidden sm:block"
                    style={{ color: step >= s ? "#1A1A1A" : "#999" }}
                  >
                    {s === 1 ? "Fecha & Hora" : s === 2 ? "Comensales" : "Datos"}
                  </span>
                </button>
                {s < 3 && <div className="w-12 h-px" style={{ backgroundColor: step > s ? "#1A1A1A" : "#E0E0E0" }} />}
              </div>
            ))}
          </FadeIn>

          <form onSubmit={handleSubmit}>
            {/* ── Step 1: Date & Time ── */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-10"
              >
                {/* Calendar */}
                <div>
                  <p className="text-[0.65rem] tracking-[0.2em] uppercase mb-6" style={{ color: "#999" }}>
                    Seleccione una fecha
                  </p>
                  <div className="bg-white p-6" style={{ boxShadow: "0 4px 30px rgba(0,0,0,0.06)" }}>
                    <div className="flex items-center justify-between mb-6">
                      <button type="button" onClick={prevMonth} className="p-2 hover:text-[#C4714A] transition-colors">
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <h3
                        style={{ fontFamily: "Playfair Display, serif", fontSize: "1.1rem", color: "#1A1A1A" }}
                      >
                        {MONTHS[viewMonth]} {viewYear}
                      </h3>
                      <button type="button" onClick={nextMonth} className="p-2 hover:text-[#C4714A] transition-colors">
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="grid grid-cols-7 gap-1 mb-2">
                      {DAYS.map((d) => (
                        <div key={d} className="text-center text-[0.6rem] tracking-wide py-2" style={{ color: "#aaa" }}>
                          {d}
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-7 gap-1">
                      {Array.from({ length: firstDay }).map((_, i) => <div key={`e-${i}`} />)}
                      {Array.from({ length: daysInMonth }).map((_, i) => {
                        const day = i + 1;
                        const disabled = isDisabled(day);
                        const selected = selectedDate === day && viewYear === today.getFullYear() || selectedDate === day;
                        return (
                          <button
                            type="button"
                            key={day}
                            disabled={disabled}
                            onClick={() => { setSelectedDate(day); setSelectedTime(null); }}
                            className="w-full aspect-square flex items-center justify-center text-sm transition-all duration-200"
                            style={{
                              backgroundColor: selected ? "#1A1A1A" : "transparent",
                              color: disabled ? "#CCC" : selected ? "#fff" : "#333",
                              cursor: disabled ? "not-allowed" : "pointer",
                            }}
                          >
                            {day}
                          </button>
                        );
                      })}
                    </div>
                    <p className="mt-4 text-[0.58rem]" style={{ color: "#bbb" }}>
                      * Lunes: cerrado. Reservas con mínimo 24h de antelación.
                    </p>
                  </div>
                </div>

                {/* Time Slots */}
                <div>
                  <p className="text-[0.65rem] tracking-[0.2em] uppercase mb-6" style={{ color: "#999" }}>
                    Seleccione una hora
                  </p>
                  {selectedDate ? (
                    <div>
                      <p className="text-sm mb-4" style={{ color: "#666" }}>
                        {new Date(viewYear, viewMonth, selectedDate).toLocaleDateString("es-ES", {
                          weekday: "long", day: "numeric", month: "long"
                        })}
                      </p>
                      {["Almuerzo", "Cena"].map((period) => (
                        <div key={period} className="mb-6">
                          <p className="text-[0.6rem] tracking-[0.18em] uppercase mb-3" style={{ color: "#aaa" }}>
                            {period}
                          </p>
                          <div className="grid grid-cols-3 gap-2">
                            {timeSlots.filter(t => t.period === period).map((slot) => (
                              <button
                                type="button"
                                key={slot.id}
                                onClick={() => setSelectedTime(slot.id)}
                                className="py-3 text-sm transition-all duration-200"
                                style={{
                                  backgroundColor: selectedTime === slot.id ? "#1A1A1A" : "transparent",
                                  color: selectedTime === slot.id ? "#fff" : "#444",
                                  border: `1px solid ${selectedTime === slot.id ? "#1A1A1A" : "#E0E0E0"}`,
                                }}
                              >
                                {slot.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div
                      className="h-48 flex items-center justify-center"
                      style={{ border: "1px dashed #DDD" }}
                    >
                      <div className="text-center">
                        <Clock className="w-6 h-6 mx-auto mb-3" style={{ color: "#CCC" }} />
                        <p className="text-sm" style={{ color: "#BBB" }}>
                          Seleccione primero una fecha
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* ── Step 2: Guests ── */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="max-w-lg mx-auto"
              >
                <div className="bg-white p-8" style={{ boxShadow: "0 4px 30px rgba(0,0,0,0.06)" }}>
                  <div className="mb-2 p-4 text-center" style={{ backgroundColor: "#F5F0EB" }}>
                    <p className="text-sm" style={{ color: "#666" }}>
                      {selectedDateObj?.toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long" })}
                      {" · "}
                      <strong style={{ color: "#1A1A1A" }}>{selectedTime}</strong>
                    </p>
                  </div>

                  <div className="mt-8 flex flex-col gap-8">
                    {/* Adults */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Users className="w-5 h-5" style={{ color: "#C4714A" }} />
                        <div>
                          <p className="text-sm font-medium" style={{ color: "#1A1A1A" }}>Adultos</p>
                          <p className="text-xs" style={{ color: "#999" }}>Mayores de 12 años</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <button
                          type="button"
                          onClick={() => setAdults(a => Math.max(1, a - 1))}
                          className="w-8 h-8 flex items-center justify-center border transition-colors hover:border-[#1A1A1A]"
                          style={{ borderColor: "#DDD" }}
                        >–</button>
                        <span className="text-lg w-6 text-center font-medium" style={{ color: "#1A1A1A" }}>{adults}</span>
                        <button
                          type="button"
                          onClick={() => setAdults(a => Math.min(20, a + 1))}
                          className="w-8 h-8 flex items-center justify-center border transition-colors hover:border-[#1A1A1A]"
                          style={{ borderColor: "#DDD" }}
                        >+</button>
                      </div>
                    </div>

                    {/* Children */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Baby className="w-5 h-5" style={{ color: "#C4714A" }} />
                        <div>
                          <p className="text-sm font-medium" style={{ color: "#1A1A1A" }}>Niños / Tronas</p>
                          <p className="text-xs" style={{ color: "#999" }}>Menores de 12 años</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <button
                          type="button"
                          onClick={() => setChildren(c => Math.max(0, c - 1))}
                          className="w-8 h-8 flex items-center justify-center border transition-colors hover:border-[#1A1A1A]"
                          style={{ borderColor: "#DDD" }}
                        >–</button>
                        <span className="text-lg w-6 text-center font-medium" style={{ color: "#1A1A1A" }}>{children}</span>
                        <button
                          type="button"
                          onClick={() => setChildren(c => Math.min(10, c + 1))}
                          className="w-8 h-8 flex items-center justify-center border transition-colors hover:border-[#1A1A1A]"
                          style={{ borderColor: "#DDD" }}
                        >+</button>
                      </div>
                    </div>

                    <div className="border-t pt-6" style={{ borderColor: "#F0F0F0" }}>
                      <p className="text-[0.65rem] tracking-[0.18em] uppercase mb-4" style={{ color: "#999" }}>
                        Necesidades especiales
                      </p>
                      <div className="flex flex-col gap-4">
                        <label className="flex items-center gap-3 cursor-pointer">
                          <div
                            className="w-5 h-5 flex items-center justify-center border-2 transition-colors flex-shrink-0"
                            style={{
                              borderColor: accessibility ? "#C4714A" : "#CCC",
                              backgroundColor: accessibility ? "#C4714A" : "transparent",
                            }}
                            onClick={() => setAccessibility(!accessibility)}
                          >
                            {accessibility && (
                              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <Accessibility className="w-4 h-4" style={{ color: "#999" }} />
                            <span className="text-sm" style={{ color: "#444" }}>
                              Necesidades de accesibilidad / movilidad reducida
                            </span>
                          </div>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer">
                          <div
                            className="w-5 h-5 flex items-center justify-center border-2 transition-colors flex-shrink-0"
                            style={{
                              borderColor: prams ? "#C4714A" : "#CCC",
                              backgroundColor: prams ? "#C4714A" : "transparent",
                            }}
                            onClick={() => setPrams(!prams)}
                          >
                            {prams && (
                              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                          <span className="text-sm" style={{ color: "#444" }}>
                            Carrito de bebé / espacio para silla de paseo
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── Step 3: Contact ── */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="max-w-lg mx-auto"
              >
                <div className="bg-white p-8" style={{ boxShadow: "0 4px 30px rgba(0,0,0,0.06)" }}>
                  <div className="mb-8 p-4 text-center" style={{ backgroundColor: "#F5F0EB" }}>
                    <p className="text-sm" style={{ color: "#666" }}>
                      {selectedDateObj?.toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long" })}
                      {" · "}<strong>{selectedTime}</strong>
                      {" · "}{adults} adulto{adults !== 1 ? "s" : ""}
                      {children > 0 && ` · ${children} niño${children !== 1 ? "s" : ""}`}
                    </p>
                  </div>

                  <div className="flex flex-col gap-5">
                    {[
                      { label: "Nombre completo *", value: name, onChange: setName, type: "text", placeholder: "Su nombre" },
                      { label: "Email *", value: email, onChange: setEmail, type: "email", placeholder: "su@email.com" },
                      { label: "Teléfono *", value: phone, onChange: setPhone, type: "tel", placeholder: "+34 600 000 000" },
                    ].map(({ label, value, onChange, type, placeholder }) => (
                      <div key={label}>
                        <label className="block text-[0.65rem] tracking-[0.18em] uppercase mb-2" style={{ color: "#999" }}>
                          {label}
                        </label>
                        <input
                          type={type}
                          value={value}
                          onChange={(e) => onChange(e.target.value)}
                          placeholder={placeholder}
                          required
                          className="w-full px-4 py-3 text-sm outline-none transition-all"
                          style={{
                            border: "1px solid #E0E0E0",
                            backgroundColor: "#FAFAFA",
                            color: "#1A1A1A",
                          }}
                          onFocus={(e) => (e.target.style.borderColor = "#C4714A")}
                          onBlur={(e) => (e.target.style.borderColor = "#E0E0E0")}
                        />
                      </div>
                    ))}
                    <div>
                      <label className="block text-[0.65rem] tracking-[0.18em] uppercase mb-2" style={{ color: "#999" }}>
                        Observaciones / Alergias
                      </label>
                      <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Alergias alimentarias, ocasión especial, preferencias de mesa..."
                        rows={3}
                        className="w-full px-4 py-3 text-sm outline-none transition-all resize-none"
                        style={{ border: "1px solid #E0E0E0", backgroundColor: "#FAFAFA", color: "#1A1A1A" }}
                        onFocus={(e) => (e.target.style.borderColor = "#C4714A")}
                        onBlur={(e) => (e.target.style.borderColor = "#E0E0E0")}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-10 max-w-lg mx-auto">
              <button
                type="button"
                onClick={() => step > 1 && setStep(s => s - 1)}
                className="px-6 py-3 text-[0.68rem] tracking-[0.15em] uppercase transition-colors"
                style={{ color: step > 1 ? "#666" : "transparent" }}
              >
                ← Anterior
              </button>

              {step < 3 ? (
                <button
                  type="button"
                  onClick={() => stepIsComplete(step) && setStep(s => s + 1)}
                  className="px-10 py-3.5 text-white text-[0.7rem] tracking-[0.18em] uppercase transition-all duration-300"
                  style={{
                    backgroundColor: stepIsComplete(step) ? "#1A1A1A" : "#CCC",
                    cursor: stepIsComplete(step) ? "pointer" : "not-allowed",
                  }}
                >
                  Continuar →
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-10 py-3.5 text-white text-[0.7rem] tracking-[0.18em] uppercase transition-all duration-300 hover:bg-[#7B2D42]"
                  style={{ backgroundColor: "#C4714A" }}
                >
                  Confirmar Reserva
                </button>
              )}
            </div>
          </form>
        </div>
      </section>

      {/* Info strip */}
      <section className="py-12 px-8" style={{ backgroundColor: "#F0EDE8" }}>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            { title: "Confirmación", desc: "Recibirá confirmación por email en menos de 24 horas." },
            { title: "Cancelaciones", desc: "Las cancelaciones deben realizarse con 24h de antelación." },
            { title: "Grupos", desc: "Para grupos de más de 10 personas, contacte directamente con el restaurante." },
          ].map(({ title, desc }) => (
            <div key={title}>
              <p className="text-sm font-medium mb-2" style={{ fontFamily: "Playfair Display, serif", color: "#1A1A1A" }}>
                {title}
              </p>
              <p className="text-xs leading-relaxed" style={{ color: "#888" }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

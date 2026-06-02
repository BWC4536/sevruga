import { Link } from "react-router";
import { MapPin, Phone, Mail, Clock, Instagram, Facebook } from "lucide-react";

function getOpenStatus(): { open: boolean; label: string } {
  const now = new Date();
  const day = now.getDay(); // 0=Sun, 1=Mon, ..., 6=Sat
  const hour = now.getHours();
  const min = now.getMinutes();
  const time = hour * 60 + min;

  // Closed Monday (day === 1)
  if (day === 1) return { open: false, label: "Cerrado · Abre martes" };

  const lunchOpen = 13 * 60;     // 13:00
  const lunchClose = 16 * 60;    // 16:00
  const dinnerOpen = 20 * 60;    // 20:00
  const dinnerClose = 23 * 60 + 30; // 23:30

  if ((time >= lunchOpen && time < lunchClose) || (time >= dinnerOpen && time < dinnerClose)) {
    return { open: true, label: "Abierto ahora" };
  }
  return { open: false, label: "Cerrado ahora" };
}

const instagramMock = [
  "https://images.unsplash.com/photo-1676471926534-d5c9771909fa?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1750943083282-2542e334fbad?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1663530761401-15eefb544889?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1750943082458-96205a2111ef?w=300&h=300&fit=crop",
];

export function Footer() {
  const status = getOpenStatus();

  return (
    <footer style={{ backgroundColor: "#1A1A1A", color: "#F9F9F9" }}>
      {/* Instagram Strip */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-8 lg:px-12 py-12">
          <div className="flex items-center gap-3 mb-8">
            <Instagram className="w-5 h-5" style={{ color: "#C4714A" }} />
            <span
              className="text-[0.68rem] tracking-[0.2em] uppercase"
              style={{ color: "#C4714A" }}
            >
              @sevrugarestaurante
            </span>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {instagramMock.map((url, i) => (
              <div
                key={i}
                className="aspect-square overflow-hidden group cursor-pointer relative"
              >
                <img
                  src={url}
                  alt={`Instagram post ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <Instagram className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-8 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <span
              className="tracking-[0.3em] block mb-2"
              style={{
                fontFamily: "Playfair Display, serif",
                fontSize: "1.25rem",
                fontWeight: 600,
              }}
            >
              SEVRUGA
            </span>
            <span
              className="text-[0.6rem] tracking-[0.2em] uppercase block mb-6"
              style={{ color: "#C4714A" }}
            >
              Alta cocina · Guadalquivir
            </span>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "rgba(249,249,249,0.55)", maxWidth: "220px" }}
            >
              Alta cocina, vino y paisaje en la orilla del Guadalquivir.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="text-[0.62rem] tracking-[0.22em] uppercase mb-6"
              style={{ color: "#C4714A" }}
            >
              Contacto
            </h4>
            <div className="flex flex-col gap-4">
              <a
                href="https://maps.google.com/?q=Avda.+Andalucía+5,+Coria+del+Río"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-sm transition-colors duration-200 hover:text-white"
                style={{ color: "rgba(249,249,249,0.6)" }}
              >
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#C4714A" }} />
                Avda. Andalucía 5, Coria del Río, Sevilla
              </a>
              <a
                href="tel:+34954776695"
                className="flex items-center gap-3 text-sm transition-colors duration-200 hover:text-white"
                style={{ color: "rgba(249,249,249,0.6)" }}
              >
                <Phone className="w-4 h-4 flex-shrink-0" style={{ color: "#C4714A" }} />
                954 77 66 95
              </a>
              <a
                href="mailto:info@sevruga.es"
                className="flex items-center gap-3 text-sm transition-colors duration-200 hover:text-white"
                style={{ color: "rgba(249,249,249,0.6)" }}
              >
                <Mail className="w-4 h-4 flex-shrink-0" style={{ color: "#C4714A" }} />
                info@sevruga.es
              </a>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h4
              className="text-[0.62rem] tracking-[0.22em] uppercase mb-6"
              style={{ color: "#C4714A" }}
            >
              Horario
            </h4>
            <div className="flex items-center gap-2 mb-4">
              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: status.open ? "#4CAF50" : "#999" }}
              />
              <span
                className="text-xs tracking-wide"
                style={{ color: status.open ? "#4CAF50" : "rgba(249,249,249,0.5)" }}
              >
                {status.label}
              </span>
            </div>
            <div className="flex flex-col gap-2" style={{ color: "rgba(249,249,249,0.6)" }}>
              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#C4714A" }} />
                <div className="text-sm">
                  <p>Mar – Dom</p>
                  <p className="text-xs mt-1" style={{ color: "rgba(249,249,249,0.45)" }}>
                    Almuerzo: 13:00 – 16:00
                  </p>
                  <p className="text-xs" style={{ color: "rgba(249,249,249,0.45)" }}>
                    Cena: 20:00 – 23:30
                  </p>
                  <p className="text-xs mt-1" style={{ color: "rgba(249,249,249,0.4)" }}>
                    Lunes cerrado
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Nav */}
          <div>
            <h4
              className="text-[0.62rem] tracking-[0.22em] uppercase mb-6"
              style={{ color: "#C4714A" }}
            >
              Navegación
            </h4>
            <div className="flex flex-col gap-3">
              {[
                { to: "/carta", label: "La Carta" },
                { to: "/reservas", label: "Reservas" },
                { to: "/cerveceria", label: "Cervecería Sevruga" },
                { to: "/contactanos", label: "Contacto" },
              ].map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className="text-sm transition-colors duration-200 hover:text-white"
                  style={{ color: "rgba(249,249,249,0.6)" }}
                >
                  {label}
                </Link>
              ))}
            </div>

            {/* Social */}
            <div className="flex items-center gap-4 mt-8">
              <a
                href="#"
                className="transition-colors duration-200"
                style={{ color: "rgba(249,249,249,0.4)" }}
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 hover:text-white transition-colors" />
              </a>
              <a
                href="#"
                className="transition-colors duration-200"
                style={{ color: "rgba(249,249,249,0.4)" }}
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 hover:text-white transition-colors" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/8">
        <div className="max-w-7xl mx-auto px-8 lg:px-12 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[0.65rem] tracking-wide" style={{ color: "rgba(249,249,249,0.3)" }}>
            © 2026 Restaurante Sevruga · Todos los derechos reservados
          </p>
          <div className="flex items-center gap-2">
            <span
              className="text-[0.6rem] tracking-[0.15em] uppercase px-2 py-1 border"
              style={{ color: "rgba(249,249,249,0.3)", borderColor: "rgba(249,249,249,0.15)" }}
            >
              Solete Guía Repsol
            </span>
            <span
              className="text-[0.6rem] tracking-[0.15em] uppercase px-2 py-1 border"
              style={{ color: "rgba(249,249,249,0.3)", borderColor: "rgba(249,249,249,0.15)" }}
            >
              Michelin Guide
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

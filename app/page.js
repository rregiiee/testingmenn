"use client";

import {
  FaEnvelope,
FaWhatsapp,
  FaFacebookF,
  FaInstagram,
  FaPhoneAlt,
} from "react-icons/fa";

import { useState, useEffect } from "react";
import {
  HomeIcon,
  InformationCircleIcon,
  ChevronDownIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";

const ICONS = {
  home: HomeIcon,
  about: InformationCircleIcon,
  features: ChevronDownIcon,
  contact: PhoneIcon,
};

export default function HomePage() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [visibleSections, setVisibleSections] = useState({});

  // Smooth scroll + close mobile menu
  function handleScroll(e, id) {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  }

  // Detect scroll for navbar style & active menu
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20);

      // Active section detection
      const sections = ["home", "about", "features", "contact"];
      let current = "home";
      const scrollPos = window.scrollY + window.innerHeight / 3;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el && el.offsetTop <= scrollPos) {
          current = section;
        }
      }
      setActiveSection(current);

      // For section fade-in visibility
      const visibility = {};
      sections.forEach((section) => {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          visibility[section] =
            rect.top < window.innerHeight * 0.8 && rect.bottom > 0;
        }
      });
      setVisibleSections(visibility);
    }

    window.addEventListener("scroll", onScroll);
    onScroll(); // Initial check
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const menuItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "features", label: "Features" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white to-white">
      {/* Navbar */}
   <header
  className={`fixed w-full z-20 transition-all duration-300 flex justify-between items-center px-6 py-2
    ${scrolled ? "bg-white shadow-md" : "bg-transparent"}
    ${scrolled ? "md:flex hidden" : "flex"}
  `}
>
  <div className="flex-shrink-0">
    <img
      src="/logoo.png"
      alt="Logo West Coast University"
      className="h-10 md:h-20 w-auto object-contain"
    />
  </div>





       <nav className="hidden md:flex flex-grow justify-center space-x-12 md:space-x-16 text-black font-semibold text-lg select-none">
    {menuItems.map(({ id, label }) => {
      const isActive = activeSection === id;
      return (
        <a
          key={id}
          href={`#${id}`}
          onClick={(e) => handleScroll(e, id)}
          className={`cursor-pointer relative py-1 transition-colors ${
            isActive ? "text-blue-700 font-bold" : "hover:text-blue-700"
          }`}
        >
          {label}
          <span
            className={`absolute left-0 -bottom-1 w-full h-[2px] bg-black transition-all duration-300 ${
              isActive ? "scale-x-100" : "scale-x-0"
            } origin-left`}
          />
        </a>
      );
    })}
  </nav>
        
        {/* Mobile hamburger */}
        <button
          className="md:hidden absolute right-6 top-3 text-black focus:outline-none z-30"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </header>

      {/* Mobile menu */}
    {isOpen && (
  <nav
    className="md:hidden fixed top-0 left-0 right-0 bg-white shadow-md z-10 animate-fadeIn"
    role="menu"
    aria-label="Mobile menu"
  >
    <ul className="flex flex-col space-y-3 px-6 pt-16 pb-6">
      {menuItems.map(({ id, label }) => {
        const isActive = activeSection === id;
        return (
          <li key={id}>
            <a
              href={`#${id}`}
              role="menuitem"
              className={`block text-black font-medium text-lg py-2 px-4 rounded-md transition-colors ${
                isActive ? "bg-blue-100 font-bold" : "hover:bg-blue-50"
              }`}
              onClick={(e) => handleScroll(e, id)}
            >
              {label}
            </a>
          </li>
        );
      })}
    </ul>
  </nav>
)}

      {/* Main content */}
      <main className="flex-grow pt-20 px-4 max-w-4xl mx-auto">
        {menuItems.map(({ id, label }) => {
          const Icon = ICONS[id];
          return (
            <section
              key={id}
              id={id}
              className={`py-20 max-w-3xl mx-auto text-center transition-all duration-700 ease-out
                ${
                  visibleSections[id]
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }
                ${
                  id === "home" ? "flex flex-col justify-center items-center" : ""
                }
              `}
            >
            {/* Judul dengan icon di kiri */}
{ id === "home" ? (
  <>
    <h2 className="text-center text-3xl md:text-4xl font-extrabold mb-2 text-black leading-tight">

      Welcome to <span className="text-blue-700">Tracer Study</span>
    </h2>
    <h3 className="text-center text-2xl md:text-2xl font-semibold text-black mb-6 tracking-wide">

      West Coast University
    </h3>
    <p className="text-center text-black max-w-xl mx-auto mb-8 text-base md:text-lg">
      Aplikasi ini membantu memantau keberhasilan lulusan, mengumpulkan data pekerjaan alumni,
      serta menyediakan visualisasi data untuk pengambilan keputusan strategis.
    </p>
    <div className="flex space-x-4 justify-center">
      <a
        href="/login"
        className="bg-black hover:bg-green-700 text-white px-6 py-3 rounded-md font-semibold transition transform hover:-translate-y-1"
      >
        Login
      </a>
      <a
        href="/register"
        className="bg-blue-700 hover:bg-green-700 text-white px-6 py-3 rounded-md font-semibold transition transform hover:-translate-y-1"
      >
        Register
      </a>
    </div>
  </>
            ) : id === "about" ? (
  <>
    <div className="flex items-center justify-center mb-4 space-x-3 transition duration-300 ease-in-out">
      <div className="text-3xl transition-transform duration-300 hover:rotate-12 hover:scale-110">
        🎓
      </div>
      <h3 className="text-3xl font-extrabold text-black transition duration-300 hover:text-blue-700 hover:scale-105">
        About
      </h3>
    </div>
    <p className="text-black text-base leading-relaxed text-center px-4 sm:px-6 max-w-3xl mx-auto transition duration-300 hover:text-black hover:scale-[1.01]">
  <span className="font-semibold text-blue-700">Tracer Study</span> adalah aplikasi digital yang dirancang untuk membantu perguruan tinggi dalam memantau dan mengevaluasi keberhasilan lulusan setelah menyelesaikan pendidikan mereka. 
  Aplikasi ini memungkinkan pengumpulan data alumni secara sistematis, termasuk status pekerjaan, kesesuaian bidang kerja dengan jurusan, hingga kontribusi pendidikan terhadap karier mereka. 
  Informasi yang dihimpun tidak hanya berguna sebagai bahan evaluasi internal, tetapi juga menjadi dasar dalam penyusunan strategi pengembangan kurikulum, peningkatan mutu pendidikan, dan pelaporan akreditasi institusi. 
  Dengan antarmuka yang mudah digunakan dan fitur pelacakan data yang komprehensif, Tracer Study menjadi alat penting dalam menjembatani institusi dengan para alumninya secara berkelanjutan.
</p>
  </>
              ) : id === "features" ? (
 <section className="max-w-5xl mx-auto px-4 py-8">
  <h3 className="group flex items-center justify-center text-3xl font-extrabold mb-10 text-black space-x-3 select-none transition-colors duration-300">
  <span className="text-blue-500 text-4xl transform transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110">
    ⭐
  </span>
  <span className="transition-colors duration-300 group-hover:text-blue-600">
    Features
  </span>
</h3>

  <div className="flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-12">

    {/* Kiri: 2 fitur */}
    <ul className="flex flex-col space-y-10 md:w-1/3">
      {[
        {
          icon: "🛡️",
          title: "Pengumpulan Data Mudah",
          text: "Memudahkan institusi dalam mengumpulkan data alumni dengan antarmuka yang sederhana.",
        },
        {
          icon: "📊",
          title: "Analisis Realtime",
          text: "Memberikan laporan dan analisis data dengan visualisasi grafik yang mudah dipahami, untuk membantu pengambilan keputusan.",
        },
      ].map(({ icon, title, text }, idx) => (
        <li
          key={idx}
          className="group flex items-start space-x-4 cursor-pointer select-none transition-transform duration-300 hover:scale-105 min-h-[150px]"
          title={title}
        >
          <div className="flex-shrink-0 mt-1 text-4xl">{icon}</div>
          <div>
            <h4 className="text-xl font-semibold group-hover:text-blue-600">{title}</h4>
            <p className="text-black text-sm md:text-base text-left">{text}</p>
          </div>
        </li>
      ))}
    </ul>

    {/* Tengah: Gambar */}
    <div className="md:w-1/3 flex justify-center ">
      <img
        src="../logoo.png"
        alt="Tracer Study Illustration"
        className="max-w-full h-auto rounded-lg shadow-lg"
      />
    </div>

    {/* Kanan: 2 fitur */}
    <ul className="flex flex-col space-y-10 md:w-1/3">
      {[
        {
          icon: "👥",
          title: "Jaringan Alumni",
          text: "Memfasilitasi koneksi antar alumni untuk memperkuat jejaring profesional dan peluang kolaborasi di berbagai bidang.",
        },
        {
          icon: "📈",
          title: "Pelaporan Otomatis",
          text: "Menyediakan fitur pengiriman laporan otomatis kepada pihak terkait, mempermudah proses monitoring dan evaluasi secara berkala.",
        },
      ].map(({ icon, title, text }, idx) => (
        <li
          key={idx}
          className="group flex items-start space-x-4 cursor-pointer select-none transition-transform duration-300 hover:scale-105 min-h-[150px]"
          title={title}
        >
          <div className="flex-shrink-0 mt-1 text-4xl">{icon}</div>
          <div>
            <h4 className="text-xl font-semibold group-hover:text-blue-600">{title}</h4>
            <p className="text-gray-700 text-sm md:text-base text-left">{text}</p>
          </div>
        </li>
      ))}
    </ul>
  </div>
</section>






              ) : (
    (
    <section className="flex flex-col items-center justify-center p-6">
      <h2 className="group text-3xl font-extrabold flex items-center space-x-2 mb-4 select-none text-black transition-colors duration-300">
  <span className="text-pink-500 transform transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-110">
    📩
  </span>
  <span className="transition-colors duration-300 group-hover:text-blue-700">
    Contact
  </span>
</h2>


      <p className="text-center max-w-md mb-6 text-black">
        Jika ingin terhubung dengan saya, silakan hubungi melalui platform di bawah ini.
      </p>

      <div className="mb-6 space-y-2 text-center text-lg text-black">
        <p className="flex items-center justify-center space-x-2">
          <span className="text-pink-500 text-xl">📞</span>
          <span>
            No HP:{" "}
            <a
              href="tel:+62895340480897"
              className="text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              +62895340480897
            </a>
          </span>
        </p>

        <p className="flex items-center justify-center space-x-2">
          <span className="text-blue-500 text-xl">📧</span>
          <span>
            Email:{" "}
            <a
              href="mailto:rmdregi@gmail.com"
              className="text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              rmdregi@gmail.com
            </a>
          </span>
        </p>
      </div>

      <div className="flex space-x-6 text-black text-2xl">
        <a
          href="mailto:rmdregi@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Email"
          className="hover:text-gray-500 transition"
        >
          <FaEnvelope />
        </a>
        <a
          href="https://wa.me/62895340480897"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
          className="hover:text-gray-500 transition"
        >
          <FaWhatsapp />
        </a>
        <a
          href="https://facebook.com/reggi.egi"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
          className="hover:text-gray-500 transition"
        >
          <FaFacebookF />
        </a>
        <a
          href="https://instagram.com/rregiiee"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="hover:text-gray-500 transition"
        >
          <FaInstagram />
        </a>
        <a
          href="tel:+62895340480897"
          aria-label="Phone"
          className="hover:text-gray-500 transition cursor-pointer"
        >
          <FaPhoneAlt />
        </a>
      </div>
    </section>
      )
)
              }
            </section>
          );
        })}
      </main>

      {/* Footer */}
     <footer
  className="bg-white text-gray-700 py-8 mt-16"
  style={{
    boxShadow: '0 -10px 15px -10px rgba(0, 0, 0, 0.1)', // shadow atas
  }}
>
  <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
    {/* Kolom 1 */}
    <div>
      <h4 className="text-lg font-extrabold mb-2 text-black">Tracer Study</h4>
      <p className="text-black">
        Platform pelacakan alumni untuk mendukung evaluasi pembelajaran dan pengembangan institusi.
      </p>
    </div>

    {/* Kolom 2 */}
    <div>
      <h4 className="text-lg font-extrabold mb-2 text-black">Navigasi</h4>
      <ul className="space-y-1 text-black">
        <li><a href="/" className="hover:text-blue-500">Beranda</a></li>
        <li><a href="/features" className="hover:text-blue-500">Fitur</a></li>
        <li><a href="/about" className="hover:text-blue-500">Tentang</a></li>
        <li><a href="/contact" className="hover:text-blue-500">Kontak</a></li>
      </ul>
    </div>

    {/* Kolom 3 */}
    <div>
      <h4 className="text-lg font-extrabold mb-2 text-black">Kontak</h4>
      <ul className="space-y-1 text-black">
        <li>Email: <a href="mailto:tracerstudy@universitasxyz.ac.id" className="hover:text-blue-500">tracerstudy@universitasxyz.ac.id</a></li>
        <li>Telepon: <a href="tel:+62211234567" className="hover:text-blue-500">(021) 123-4567</a></li>
        <li>Instagram: <a href="https://instagram.com/tracerstudy_xyz" target="_blank" className="hover:text-blue-500">@tracerstudy_xyz</a></li>
      </ul>
    </div>
  </div>

  <div className="mt-8 text-center text-black text-xs">
    &copy; {new Date().getFullYear()} Tracer Study • West Coast University. All rights reserved.
  </div>
</footer>



      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-in forwards;
        }
      `}</style>
    </div>
  );
}

"use client";

import { menuItems } from "../data/menuData";
import MenuItemCard from "../components/ui/menu-item-card";
import { Phone, MapPin, Flame } from "lucide-react";

const Facebook = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const Instagram = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const WhatsApp = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
    <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
  </svg>
);

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col justify-between selection:bg-[#FF6D00]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/70 backdrop-blur-md border-b border-white/10 px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/images/logo.jpg"
              alt="Gazo Fries Logo"
              className="w-10 h-10 rounded-full object-cover border border-[#FF6D00]"
            />
            <span className="text-2xl font-extrabold text-white tracking-wider font-english">
              GAZO <span className="text-[#FF6D00]">FRIES</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-base font-semibold">
            <a href="#hero" className="hover:text-[#FF6D00] transition-colors">
              الرئيسية
            </a>
            <a href="#menu" className="hover:text-[#FF6D00] transition-colors">
              المنيو
            </a>
            <a href="#about" className="hover:text-[#FF6D00] transition-colors">
              مميزاتنا
            </a>
            <a href="#contact" className="hover:text-[#FF6D00] transition-colors">
              التواصل
            </a>
          </nav>

          <a
            href="#menu"
            className="bg-[#FF6D00] hover:bg-[#e06000] text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-all shadow-md shadow-[#FF6D00]/20 hover:scale-105 active:scale-95"
          >
            اطلب الآن 🍔
          </a>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section
          id="hero"
          className="relative w-full h-[85vh] flex items-center justify-center overflow-hidden pt-16 bg-black"
        >
          {/* إطار الفيديو */}
          <div className="absolute inset-0 flex items-center justify-center z-0">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover opacity-50 scale-90 md:scale-95 rounded-3xl"
            >
              <source src="/images/burgers.mp4" type="video/mp4" />
            </video>
          </div>

          {/* الظل والتدرج */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-black/40 to-black/60 z-10" />

          <div className="relative z-20 text-center px-4 max-w-4xl mx-auto space-y-4 mt-8">
            <div className="inline-flex items-center gap-2 bg-[#FF6D00]/20 border border-[#FF6D00]/40 backdrop-blur-md text-[#FF6D00] px-4 py-1.5 rounded-full text-sm font-bold animate-bounce">
              <Flame className="w-4 h-4" /> طعم لا يُقاوم
            </div>

            <h1 className="text-5xl md:text-8xl font-extrabold tracking-tight leading-none font-english">
              GAZO <span className="text-[#FF6D00]">FRIES</span>
            </h1>

            <p dir="ltr" className="font-english text-2xl md:text-4xl text-gray-200 font-semibold tracking-wide">
              طعم شهي، قرمشة لذيذة، وتجربة لا تُنسى!&rlm;
            </p>

            <p className="text-lg md:text-xl text-gray-300 max-w-lg mx-auto font-medium">
              نحضر لكم أشهى وجبات البرجر والبطاطس بخلطتنا السرية المميزة.
            </p>

            <div className="pt-2">
              <a
                href="#menu"
                className="inline-block bg-gradient-to-r from-[#FF6D00] to-[#FF8E00] hover:from-[#e06000] hover:to-[#FF6D00] text-white font-extrabold text-lg px-8 py-3.5 rounded-2xl transition-all duration-300 shadow-xl shadow-[#FF6D00]/30 hover:scale-105 active:scale-95"
              >
                تصفح الأصناف الستة 🔥
              </a>
            </div>
          </div>
        </section>

        {/* Menu Section - 6 الأصناف الأساسية */}
        <section id="menu" className="py-20 px-6 max-w-7xl mx-auto relative z-20">
          <div className="text-center mb-14 space-y-2">
            <span className="text-[#FF6D00] text-sm font-bold uppercase tracking-widest">
              قائمة الطعام
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold">
              أصنافنا <span className="text-[#FF6D00]"> المميزة</span>
            </h2>
            <p className="text-gray-400 max-w-md mx-auto text-base">
              اختر وجبتك المفضلة والمحضرة بكل حب وطزاجة.
            </p>
          </div>

          {/* العرض على سطرين - 3 عناصر في السطر للشاشات المتوسطة والكبيرة */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {menuItems.map((item) => (
              <MenuItemCard key={item.id} item={item} />
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section id="about" className="py-16 bg-[#121212] border-y border-white/5">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-8 rounded-3xl bg-[#1A1A1A]/50 border border-white/5 hover:border-[#FF6D00]/30 transition-all">
              <div className="w-14 h-14 bg-[#FF6D00]/10 text-[#FF6D00] rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                🍔
              </div>
              <h3 className="text-xl font-bold mb-2">لحوم طازجة</h3>
              <p className="text-gray-400 text-sm">
                لحوم بقر ودجاج طازجة يتم إعدادها يومياً بأعلى جودة.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-[#1A1A1A]/50 border border-white/5 hover:border-[#FF6D00]/30 transition-all">
              <div className="w-14 h-14 bg-[#FF6D00]/10 text-[#FF6D00] rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                ⚡
              </div>
              <h3 className="text-xl font-bold mb-2">تحضير سريع</h3>
              <p className="text-gray-400 text-sm">
                وجبات ممتازة تقدم ساخنة وطازجة بدون انتظار طويل.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-[#1A1A1A]/50 border border-white/5 hover:border-[#FF6D00]/30 transition-all">
              <div className="w-14 h-14 bg-[#FF6D00]/10 text-[#FF6D00] rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                🔥
              </div>
              <h3 className="text-xl font-bold mb-2">خلطة جازو السرية</h3>
              <p className="text-gray-400 text-sm">
                صلصات حصرية وطعم قرمشة فريد لا تُنسى.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="contact" className="bg-[#050505] border-t border-white/10 pt-16 pb-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/images/logo.jpg"
                alt="Logo"
                className="w-10 h-10 rounded-full border border-[#FF6D00]"
              />
              <span className="text-2xl font-extrabold text-white font-english">
                GAZO <span className="text-[#FF6D00]">FRIES</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              نرحب بكم في جازو فرايز! يقدم لكم أفضل تجربة للبرجر والبطاطس بأفضل مكونات.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-lg font-bold text-[#FF6D00]">تواصل معنا</h4>
            <div className="flex items-center gap-3 text-gray-300 text-sm">
              <MapPin className="w-4 h-4 text-[#FF6D00]" />
              <span>فلسطين - غزة</span>
            </div>
            <div className="flex items-center gap-3 text-gray-300 text-sm font-english">
              <Phone className="w-4 h-4 text-[#FF6D00]" />
              <span dir="ltr">+970 590 000 000</span>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-bold text-[#FF6D00]">تابعنا على</h4>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-[#1A1A1A] flex items-center justify-center text-gray-300 hover:bg-[#FF6D00] hover:text-white transition-all"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-[#1A1A1A] flex items-center justify-center text-gray-300 hover:bg-[#FF6D00] hover:text-white transition-all"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-[#1A1A1A] flex items-center justify-center text-gray-300 hover:bg-[#FF6D00] hover:text-white transition-all"
              >
                <WhatsApp className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto border-t border-white/5 pt-8 text-center text-xs text-gray-500 font-english">
          جميع الحقوق محفوظة © {new Date().getFullYear()} GAZO FRIES
        </div>
      </footer>
    </div>
  );
}
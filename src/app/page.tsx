'use client';

import { useState } from 'react';
import { menuItems } from "../data/menuData";
import MenuItemCard, { MenuItem } from "../components/ui/menu-item-card";
import CheckoutSection from "../components/ui/CheckoutSection";
import { Phone, MapPin, Flame } from "lucide-react";

export default function HomePage() {
  const [cartItems, setCartItems] = useState<
    { id: string | number; name: string; price: number; quantity: number }[]
  >([]);

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // إضافة وجبة للسلة أو زيادة الكمية إذا كانت موجودة مسبقاً
  const handleAddToCart = (item: MenuItem) => {
    setCartItems((prev) => {
      const existingItem = prev.find((i) => i.id === item.id);

      if (existingItem) {
        return prev.map((i) =>
          i.id === item.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }

      return [
        ...prev,
        {
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: 1,
        },
      ];
    });
  };

  // حساب السعر الإجمالي
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // حساب عدد المنتجات
  const totalItemsCount = cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  // تفريغ السلة بالكامل
  const clearCart = () => {
    setCartItems([]);
  };

  // تعديل كمية الوجبة من الفاتورة
  const updateQuantity = (
    id: string | number,
    newQuantity: number
  ) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
      return;
    }

    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  // حذف الوجبة نهائياً من الفاتورة
  const removeFromCart = (id: string | number) => {
    setCartItems((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col justify-between selection:bg-[#FF6D00]">

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10 px-4 sm:px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">

          <div className="flex items-center gap-2 sm:gap-3">
            <img
              src="/images/logo.jpg"
              alt="Gazo Fries Logo"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover border border-[#FF6D00]"
            />

            <span className="text-xl sm:text-2xl font-extrabold text-white tracking-wider font-english">
              GAZO <span className="text-[#FF6D00]">FRIES</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-base font-semibold">
            <a
              href="#hero"
              className="hover:text-[#FF6D00] transition-colors"
            >
              الرئيسية
            </a>

            <a
              href="#menu"
              className="hover:text-[#FF6D00] transition-colors"
            >
              المنيو
            </a>

            <a
              href="#about"
              className="hover:text-[#FF6D00] transition-colors"
            >
              مميزاتنا
            </a>

            <a
              href="#contact"
              className="hover:text-[#FF6D00] transition-colors"
            >
              التواصل
            </a>
          </nav>

          {/* زر سلة الطلبات والفاتورة */}
          <button
            onClick={() => setIsCheckoutOpen(true)}
            className="bg-[#FF6D00] hover:bg-[#e06000] text-white text-xs sm:text-sm font-bold px-4 sm:px-5 py-2.5 rounded-xl transition-all shadow-md shadow-[#FF6D00]/20 flex items-center gap-2"
          >
            <span>🛒 سلة الطلبات والفاتورة</span>

            {totalItemsCount > 0 && (
              <span className="bg-black text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {totalItemsCount}
              </span>
            )}
          </button>

        </div>
      </header>

      <main>

        {/* Hero Section */}
        <section
          id="hero"
          className="relative w-full h-[80vh] sm:h-[85vh] flex items-center justify-center overflow-hidden pt-16 bg-black"
        >

          <div className="absolute inset-0 flex items-center justify-center z-0">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover opacity-40 scale-100"
            >
              <source
                src="/images/burgers.mp4"
                type="video/mp4"
              />
            </video>
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-black/40 to-black/60 z-10" />

          <div className="relative z-20 text-center px-4 max-w-4xl mx-auto space-y-3 sm:space-y-4 mt-8">

            <div className="inline-flex items-center gap-2 bg-[#FF6D00]/20 border border-[#FF6D00]/40 backdrop-blur-md text-[#FF6D00] px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold animate-bounce">
              <Flame className="w-4 h-4" />
              طعم لا يُقاوم
            </div>

            <h1 className="text-4xl sm:text-7xl md:text-8xl font-extrabold tracking-tight leading-none font-english">
              GAZO <span className="text-[#FF6D00]">FRIES</span>
            </h1>

            <p
              dir="ltr"
              className="font-english text-xl sm:text-3xl md:text-4xl text-gray-200 font-semibold tracking-wide"
            >
              طعم شهي، قرمشة لذيذة، وتجربة لا تُنسى!&rlm;
            </p>

            <p className="text-sm sm:text-lg md:text-xl text-gray-300 max-w-lg mx-auto font-medium">
              نحضر لكم أشهى وجبات البرجر والبطاطس بخلطتنا السرية المميزة.
            </p>

            <div className="pt-2">
              <a
                href="#menu"
                className="inline-block bg-gradient-to-r from-[#FF6D00] to-[#FF8E00] text-white font-extrabold text-base sm:text-lg px-7 py-3 rounded-2xl shadow-xl shadow-[#FF6D00]/30 hover:scale-105 transition-transform"
              >
                تصفح الأصناف المميزة 🔥
              </a>
            </div>

          </div>
        </section>

        {/* Menu Section */}
        <section
          id="menu"
          className="py-14 sm:py-20 px-4 sm:px-6 max-w-7xl mx-auto relative z-20"
        >

          <div className="text-center mb-10 sm:mb-14 space-y-2">

            <span className="text-[#FF6D00] text-xs sm:text-sm font-bold uppercase tracking-widest">
              قائمة الطعام
            </span>

            <h2 className="text-3xl sm:text-5xl font-extrabold">
              أصنافنا{" "}
              <span className="text-[#FF6D00]">المميزة</span>
            </h2>

            <p className="text-gray-400 max-w-md mx-auto text-sm sm:text-base">
              اختر وجبتك المفضلة والمحضرة بكل حب وطزاجة.
            </p>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {menuItems.map((item) => (
              <MenuItemCard
                key={item.id}
                item={item}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>

        </section>

        {/* Checkout Modal Component */}
        <CheckoutSection
          cartItems={cartItems}
          totalPrice={totalPrice}
          clearCart={clearCart}
          updateQuantity={updateQuantity}
          removeFromCart={removeFromCart}
          isOpen={isCheckoutOpen}
          setIsOpen={setIsCheckoutOpen}
        />

        {/* Features Section */}
        <section
          id="about"
          className="py-14 sm:py-16 bg-[#121212] border-y border-white/5"
        >

          <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center">

            <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#1A1A1A]/50 border border-white/5">

              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#FF6D00]/10 text-[#FF6D00] rounded-2xl flex items-center justify-center mx-auto mb-4 text-xl sm:text-2xl font-bold">
                🍔
              </div>

              <h3 className="text-lg sm:text-xl font-bold mb-2">
                لحوم طازجة
              </h3>

              <p className="text-gray-400 text-xs sm:text-sm">
                لحوم بقر ودجاج طازجة يتم إعدادها يومياً بأعلى جودة.
              </p>

            </div>

            <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#1A1A1A]/50 border border-white/5">

              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#FF6D00]/10 text-[#FF6D00] rounded-2xl flex items-center justify-center mx-auto mb-4 text-xl sm:text-2xl font-bold">
                ⚡
              </div>

              <h3 className="text-lg sm:text-xl font-bold mb-2">
                تحضير سريع
              </h3>

              <p className="text-gray-400 text-xs sm:text-sm">
                وجبات ممتازة تقدم ساخنة وطازجة بدون انتظار طويل.
              </p>

            </div>

            <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#1A1A1A]/50 border border-white/5">

              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#FF6D00]/10 text-[#FF6D00] rounded-2xl flex items-center justify-center mx-auto mb-4 text-xl sm:text-2xl font-bold">
                🔥
              </div>

              <h3 className="text-lg sm:text-xl font-bold mb-2">
                خلطة جازو السرية
              </h3>

              <p className="text-gray-400 text-xs sm:text-sm">
                صلصات حصرية وطعم قرمشة فريد لا يُنسى.
              </p>

            </div>

          </div>
        </section>

      </main>

      {/* Footer */}
      <footer
        id="contact"
        className="bg-[#050505] border-t border-white/10 pt-12 sm:pt-16 pb-10 sm:pb-12 px-4 sm:px-6"
      >

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 mb-10 sm:mb-12">

          <div className="space-y-3 sm:space-y-4">

            <div className="flex items-center gap-3">

              <img
                src="/images/logo.jpg"
                alt="Logo"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#FF6D00]"
              />

              <span className="text-xl sm:text-2xl font-extrabold text-white font-english">
                GAZO <span className="text-[#FF6D00]">FRIES</span>
              </span>

            </div>

            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
              نرحب بكم في جازو فرايز! يقدم لكم أفضل تجربة للبرجر والبطاطس بأفضل مكونات.
            </p>

          </div>

          <div className="space-y-3">

            <h4 className="text-base sm:text-lg font-bold text-[#FF6D00]">
              تواصل معنا
            </h4>

            <div className="flex items-center gap-3 text-gray-300 text-xs sm:text-sm">

              <MapPin className="w-4 h-4 text-[#FF6D00]" />

              <span>فلسطين - غزة</span>

            </div>

            <div className="flex items-center gap-3 text-gray-300 text-xs sm:text-sm font-english">

              <Phone className="w-4 h-4 text-[#FF6D00]" />

              <span dir="ltr">
                +970 590 000 000
              </span>

            </div>

          </div>

          <div className="space-y-3 sm:space-y-4">

            <h4 className="text-base sm:text-lg font-bold text-[#FF6D00]">
              تابعنا على
            </h4>

            <div className="flex items-center gap-4 text-gray-300 text-sm">
              <span>إنستغرام</span> |{" "}
              <span>فيسبوك</span> |{" "}
              <span>واتساب</span>
            </div>

          </div>

        </div>

        <div className="max-w-7xl mx-auto border-t border-white/5 pt-6 sm:pt-8 text-center text-[11px] sm:text-xs text-gray-500 font-english">
          جميع الحقوق محفوظة © {new Date().getFullYear()} GAZO FRIES
        </div>

      </footer>

    </div>
  );
}
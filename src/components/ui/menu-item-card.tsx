'use client';
import React, { useState } from "react";

export interface MenuItem {
  id: string | number;
  name: string;
  englishName?: string;
  description: string;
  price: number;
  image: string;
  isPopular?: boolean;
}

interface MenuItemCardProps {
  item: MenuItem;
  onAddToCart: (item: MenuItem) => void;
  cartQuantity?: number; // الكمية الحالية في السلة لهذه الوجبة
}

export default function MenuItemCard({ item, onAddToCart, cartQuantity = 0 }: MenuItemCardProps) {
  const [showToast, setShowToast] = useState(false);

  const handleAddClick = () => {
    onAddToCart(item);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 1500);
  };

  return (
    <div className="relative bg-[#141414] border border-white/10 rounded-2xl sm:rounded-3xl overflow-hidden flex flex-col justify-between hover:border-[#FF6D00]/50 transition-all duration-300 group shadow-lg">
      
      {/* إشعار Toast متحرك وواضح جداً */}
      {showToast && (
        <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-green-600 text-white text-xs font-bold px-4 py-2 rounded-full shadow-2xl z-30 animate-bounce whitespace-nowrap">
          ✨ تم إضافة {item.name} للسلة
        </div>
      )}

      {/* الصورة */}
      <div className="relative w-full h-48 sm:h-60 bg-[#0A0A0A] p-2 flex items-center justify-center overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover object-center rounded-xl sm:rounded-2xl group-hover:scale-105 transition-transform duration-500"
        />
        {item.isPopular && (
          <span className="absolute top-3 right-3 bg-[#FF6D00] text-white text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-full shadow-md z-10">
            الأكثر طلباً 🔥
          </span>
        )}
      </div>

      {/* التفاصيل */}
      <div className="p-3.5 sm:p-5 flex flex-col flex-grow justify-between space-y-3 text-right">
        <div className="space-y-1">
          <h3 className="text-lg sm:text-xl font-black text-white tracking-wide">{item.name}</h3>
          {item.englishName && (
            <span className="block text-[10px] font-extrabold text-[#FF6D00] uppercase tracking-wider">
              {item.englishName}
            </span>
          )}
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed line-clamp-2 pt-0.5 font-light">
            {item.description}
          </p>
        </div>

        {/* السعر وزر الإضافة مع مؤشر العدد المضاف */}
        <div className="flex items-center justify-between pt-2.5 sm:pt-3 border-t border-white/10">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl sm:text-3xl font-black text-white">{item.price}</span>
            <span className="text-[11px] font-bold text-[#FF6D00]">شيكل</span>
          </div>

          <div className="flex items-center gap-2">
            {cartQuantity > 0 && (
              <span className="bg-[#FF6D00]/20 text-[#FF6D00] border border-[#FF6D00]/40 text-xs font-bold px-2.5 py-1 rounded-xl">
                مضاف: {cartQuantity}
              </span>
            )}
            <button
              onClick={handleAddClick}
              aria-label="إضافة للطلب"
              className="w-10 h-10 bg-[#FF6D00] hover:bg-[#e06000] text-white rounded-xl flex items-center justify-center font-extrabold text-xl transition-transform active:scale-90 shadow-md shadow-[#FF6D00]/20"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
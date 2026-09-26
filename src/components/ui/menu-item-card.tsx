import React from "react";

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
}

export default function MenuItemCard({ item }: MenuItemCardProps) {
  return (
    <div className="bg-[#141414] border border-white/10 rounded-3xl overflow-hidden flex flex-col justify-between hover:border-[#FF6D00]/50 transition-all duration-300 group shadow-lg hover:shadow-[#FF6D00]/10">
      {/* حاوية الصورة - تم ضبط الارتفاع ووضع object-contain لإظهار الساندويش كاملاً */}
      <div className="relative w-full h-64 sm:h-72 bg-[#0A0A0A] p-2 flex items-center justify-center overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover object-center rounded-2xl group-hover:scale-105 transition-transform duration-500"
        />

        {item.isPopular && (
          <span className="absolute top-4 right-4 bg-[#FF6D00] text-white text-xs font-bold px-3 py-1 rounded-full shadow-md backdrop-blur-md z-10">
            الأكثر طلباً 🔥
          </span>
        )}
      </div>

      {/* تفاصيل الوجبة - القواعد الهرمية للنصوص والتنسيق */}
      <div className="p-5 flex flex-col flex-grow justify-between space-y-4 text-right">
        <div className="space-y-1">
          {/* العنوان الرئيسي بالعربي */}
          <h3 className="text-2xl font-black text-white tracking-wide">
            {item.name}
          </h3>

          {/* الاسم بالإنجليزي */}
          {item.englishName && (
            <span className="block text-xs font-extrabold text-[#FF6D00] font-english uppercase tracking-wider">
              {item.englishName}
            </span>
          )}

          {/* الوصف بتنسيق واضح وقابل للقراءة */}
          <p className="text-sm text-gray-300 leading-relaxed line-clamp-2 pt-1 font-light">
            {item.description}
          </p>
        </div>

        {/* السعر وزر الإضافة */}
        <div className="flex items-center justify-between pt-3 border-t border-white/10">
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-black text-white">{item.price}</span>
            <span className="text-xs font-bold text-[#FF6D00]">شيكل</span>
          </div>

          <button
            aria-label="إضافة للطلب"
            className="w-10 h-10 bg-[#FF6D00] hover:bg-[#e06000] text-white rounded-xl flex items-center justify-center font-extrabold text-xl transition-transform active:scale-90 shadow-md shadow-[#FF6D00]/20"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
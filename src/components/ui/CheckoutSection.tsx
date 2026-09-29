'use client';
import { createClient } from '@supabase/supabase-js';
import confetti from 'canvas-confetti';
import { useState } from 'react';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface CartItem {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
}

interface CheckoutSectionProps {
  cartItems: CartItem[];
  totalPrice: number;
  clearCart?: () => void;
  updateQuantity: (id: string | number, newQuantity: number) => void;
  removeFromCart: (id: string | number) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function CheckoutSection({
  cartItems = [],
  totalPrice = 0,
  clearCart,
  updateQuantity,
  removeFromCart,
  isOpen,
  setIsOpen
}: CheckoutSectionProps) {
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !phone || !address) {
      alert('الرجاء إدخال جميع بيانات التوصيل!');
      return;
    }

    setLoading(true);

    const { error } = await supabase.from('orders').insert([
      {
        customer_name: customerName,
        phone: phone,
        address: address,
        items: cartItems,
        total_price: totalPrice,
        status: 'pending'
      }
    ]);

    setLoading(false);

    if (error) {
      console.error('خطأ في إرسال الطلب:', error);
      alert('حدث خطأ أثناء إرسال الطلب، يرجى المحاولة مرة أخرى.');
    } else {
      setOrderSuccess(true);
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
      if (clearCart) clearCart();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" dir="rtl">
      <div className="bg-[#121212] border border-white/10 rounded-2xl shadow-2xl max-w-lg w-full p-5 sm:p-6 text-right text-white relative max-h-[90vh] overflow-y-auto">
        
        {/* زر إغلاق النافذة */}
        <button
          onClick={() => {
            setIsOpen(false);
            if (orderSuccess) {
              setOrderSuccess(false);
              window.location.reload();
            }
          }}
          className="absolute top-4 left-4 text-gray-400 hover:text-white text-xl font-bold"
        >
          ✕
        </button>

        <h2 className="text-xl sm:text-2xl font-bold text-[#FF6D00] mb-4">🛒 سلة الطلبات والفاتورة</h2>

        {orderSuccess ? (
          <div className="bg-green-900/40 border border-green-500 text-green-300 p-5 rounded-xl text-center space-y-4">
            <h3 className="text-xl sm:text-2xl font-bold">🎉 تم الطلب بنجاح!</h3>
            <p className="text-sm sm:text-base">جاري تحضير وتوصيل طلبيتك إلى باب منزلك في أسرع وقت 🚀</p>
            
            <div className="bg-black/50 p-4 rounded-lg border border-white/10 text-right space-y-2">
              <p className="text-amber-400 font-bold text-sm">ملاحظة هامة بشأن الدفع:</p>
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                يكون الدفع لصاحب الديلفري عند الاستلام، أو من خلال التحويل على الرقم:
                <span className="text-[#FF6D00] font-bold block text-base sm:text-lg mt-1 dir-ltr text-center">0599246722</span>
              </p>
            </div>

            <button
              onClick={() => {
                setIsOpen(false);
                setOrderSuccess(false);
              }}
              className="mt-4 bg-white text-black font-bold px-6 py-2 rounded-xl hover:bg-gray-200 transition text-sm"
            >
              إغلاق
            </button>
          </div>
        ) : (
          <>
            {/* عرض الوجبات والتحكم فيها */}
            <div className="border-b border-white/10 pb-4 mb-4">
              {cartItems.length > 0 ? (
                <>
                  <ul className="space-y-3 mb-3 max-h-56 overflow-y-auto pr-1">
                    {cartItems.map((item) => (
                      <li key={item.id} className="flex items-center justify-between bg-black/40 p-2.5 rounded-xl border border-white/5 text-xs sm:text-sm">
                        <div className="flex flex-col">
                          <span className="font-bold text-white">{item.name}</span>
                          <span className="text-[#FF6D00] font-semibold">{item.price * item.quantity} شيكل</span>
                        </div>

                        {/* أزرار التحكم في الكمية والحذف داخل الفاتورة */}
                        <div className="flex items-center gap-2">
                          <div className="flex items-center border border-white/20 rounded-lg overflow-hidden bg-black">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="px-2 py-1 text-gray-300 hover:bg-white/10 font-bold"
                            >
                              -
                            </button>
                            <span className="px-2.5 text-white font-bold text-xs">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-2 py-1 text-gray-300 hover:bg-white/10 font-bold"
                            >
                              +
                            </button>
                          </div>

                          {/* أيقونة الحذف (سلة المهملات) */}
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="w-8 h-8 bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white rounded-lg flex items-center justify-center transition"
                            title="حذف الوجبة"
                          >
                            🗑️
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="flex justify-between text-base sm:text-lg font-bold text-white bg-black/60 p-3 rounded-lg border border-white/10">
                    <span>المجموع الإجمالي:</span>
                    <span className="text-[#FF6D00]">{totalPrice} شيكل</span>
                  </div>
                </>
              ) : (
                <p className="text-gray-400 text-center py-6 text-sm">سلة الطلبات فارغة حالياً. أضف بعض الوجبات الشهية! 🍔</p>
              )}
            </div>

            {/* نموذج بيانات التوصيل */}
            {cartItems.length > 0 && (
              <form onSubmit={handleCheckout} className="space-y-3 sm:space-y-4">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1">الاسم الكامل:</label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    required
                    className="w-full px-3 sm:px-4 py-2 bg-black/60 border border-white/10 rounded-lg focus:ring-2 focus:ring-[#FF6D00] outline-none text-sm text-white"
                    placeholder="أدخل اسمك الكريم"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1">رقم الهاتف:</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="w-full px-3 sm:px-4 py-2 bg-black/60 border border-white/10 rounded-lg focus:ring-2 focus:ring-[#FF6D00] outline-none text-sm text-white"
                    placeholder="059xxxxxxx"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1">عنوان التوصيل بالتفصيل:</label>
                  <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    rows={2}
                    className="w-full px-3 sm:px-4 py-2 bg-black/60 border border-white/10 rounded-lg focus:ring-2 focus:ring-[#FF6D00] outline-none text-sm text-white"
                    placeholder="المدينة، الشارع، رقم العمارة"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#FF6D00] hover:bg-[#e06000] disabled:bg-gray-700 text-white font-bold py-3 rounded-xl transition duration-200 shadow-lg text-sm sm:text-base"
                >
                  {loading ? 'جاري إرسال الطلب...' : 'تأكيد الطلب 🚀'}
                </button>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
}
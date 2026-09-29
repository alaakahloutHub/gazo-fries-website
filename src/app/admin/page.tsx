'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  created_at: string;
  customer_name: string;
  customer_phone: string;
  total_price?: number;
  total_amount?: number;
  status: string;
  items: OrderItem[];
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [timeFilter, setTimeFilter] = useState<'all' | 'today' | 'week' | 'month'>('all');
  const [selectedInvoice, setSelectedInvoice] = useState<Order | null>(null);

  const ADMIN_PASSWORD = 'gazo123'; 

  useEffect(() => {
    const authStatus = sessionStorage.getItem('gazo_admin_auth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
      fetchOrders();
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem('gazo_admin_auth', 'true');
      fetchOrders();
    } else {
      alert('كلمة المرور غير صحيحة!');
    }
  };

  async function fetchOrders() {
    setLoading(true);
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching orders:', error);
    } else if (data) {
      setOrders(data);
    }
    setLoading(false);
  }

  async function updateOrderStatus(orderId: string, newStatus: string) {
    const { error } = await supabase
      .from('orders')
      .update({ status: newStatus })
      .eq('id', orderId);

    if (error) {
      alert('حدث خطأ أثناء تحديث الحالة');
    } else {
      setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4 font-['Noto_Sans_Arabic',sans-serif]" dir="rtl">
        <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-3xl shadow-2xl max-w-md w-full text-center space-y-6">
          <div className="text-5xl">🍟</div>
          <h1 className="text-2xl font-black text-white">GAZO FRIES <span className="text-yellow-400">Admin</span></h1>
          <p className="text-sm text-neutral-400 font-medium">الرجاء إدخال كلمة المرور للوصول للوحة التحكم</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-black border border-neutral-800 rounded-2xl focus:outline-none focus:border-yellow-400 text-center font-bold tracking-widest text-lg text-white"
              autoFocus
            />
            <button
              type="submit"
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-black py-3 rounded-2xl transition shadow-lg text-base"
            >
              تسجيل الدخول
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-yellow-400 flex items-center justify-center text-xl font-bold font-['Noto_Sans_Arabic',sans-serif]" dir="rtl">
        جاري تحميل بيانات المطعم...
      </div>
    );
  }

  const filteredOrders = orders.filter((order) => {
    if (timeFilter === 'all') return true;
    const orderDate = new Date(order.created_at);
    const now = new Date();
    
    if (timeFilter === 'today') {
      return orderDate.toDateString() === now.toDateString();
    }
    if (timeFilter === 'week') {
      const diffTime = Math.abs(now.getTime() - orderDate.getTime());
      const diffDays = diffTime / (1000 * 3600 * 24);
      return diffDays <= 7;
    }
    if (timeFilter === 'month') {
      return orderDate.getMonth() === now.getMonth() && orderDate.getFullYear() === now.getFullYear();
    }
    return true;
  });

  const getOrderTotal = (order: Order) => {
    if (order.total_price) return order.total_price;
    if (order.total_amount) return order.total_amount;
    if (order.items && Array.isArray(order.items)) {
      return order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }
    return 0;
  };

  const totalRevenue = filteredOrders.reduce((sum, order) => sum + getOrderTotal(order), 0);
  const totalOrdersCount = filteredOrders.length;
  const totalItemsSold = filteredOrders.reduce((sum, order) => {
    if (!order.items || !Array.isArray(order.items)) return sum;
    return sum + order.items.reduce((itemSum, item) => itemSum + (item.quantity || 0), 0);
  }, 0);
  const averageOrderValue = totalOrdersCount > 0 ? (totalRevenue / totalOrdersCount).toFixed(2) : '0';

  const handlePrint = () => { window.print(); };
  const handleLogout = () => {
    sessionStorage.removeItem('gazo_admin_auth');
    setIsAuthenticated(false);
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8 print:bg-white print:text-black font-['Noto_Sans_Arabic',sans-serif]" dir="rtl">
      {/* تضمين خط Noto Sans Arabic من Google Fonts */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@300;400;500;700;900&display=swap');
        body {
          font-family: 'Noto Sans Arabic', sans-serif;
        }
      `}</style>

      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* شريط الإدارة العلوي */}
        <div className="flex flex-col md:flex-row justify-between items-center bg-neutral-900 border border-neutral-800 p-6 rounded-3xl shadow-lg print:hidden gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-yellow-400 p-3 rounded-2xl text-2xl">🍟</div>
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-white tracking-wide">GAZO FRIES <span className="text-yellow-400 text-sm font-bold">لوحة التحكم</span></h1>
              <p className="text-xs text-neutral-400 font-medium mt-0.5">إدارة الطلبات الحية، الأرباح، والتقارير المالية</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <select
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value as any)}
              className="px-4 py-2.5 bg-black border border-neutral-800 rounded-xl font-bold text-neutral-200 focus:outline-none focus:border-yellow-400 text-sm"
            >
              <option value="all">كل الأوقات</option>
              <option value="today">طلبات اليوم</option>
              <option value="week">هذا الأسبوع</option>
              <option value="month">هذا الشهر</option>
            </select>

            <button
              onClick={handlePrint}
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-black px-4 py-2.5 rounded-xl transition shadow-md flex items-center gap-2 text-sm"
            >
              🖨️ طباعة التقرير العام
            </button>

            <button
              onClick={handleLogout}
              className="bg-red-950/40 hover:bg-red-900 text-red-400 font-bold px-4 py-2.5 rounded-xl transition text-sm border border-red-900/50"
            >
              تسجيل خروج
            </button>
          </div>
        </div>

        {/* بطاقات الإحصائيات (KPIs) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 print:hidden">
          <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-3xl shadow-lg flex flex-col justify-between">
            <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">إجمالي المبيعات</span>
            <div className="text-3xl font-black text-emerald-400 mt-2">${totalRevenue.toFixed(2)}</div>
            <span className="text-xs text-neutral-500 mt-1 font-medium">المبلغ الكلي المدفوع</span>
          </div>

          <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-3xl shadow-lg flex flex-col justify-between">
            <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">إجمالي الطلبات</span>
            <div className="text-3xl font-black text-white mt-2">{totalOrdersCount}</div>
            <span className="text-xs text-neutral-500 mt-1 font-medium">عدد الطلبات الناجحة</span>
          </div>

          <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-3xl shadow-lg flex flex-col justify-between">
            <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">الوجبات المباعة</span>
            <div className="text-3xl font-black text-yellow-400 mt-2">{totalItemsSold}</div>
            <span className="text-xs text-neutral-500 mt-1 font-medium">إجمالي القطع المباعة</span>
          </div>

          <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-3xl shadow-lg flex flex-col justify-between">
            <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">متوسط قيمة الطلب</span>
            <div className="text-3xl font-black text-indigo-400 mt-2">${averageOrderValue}</div>
            <span className="text-xs text-neutral-500 mt-1 font-medium">لكل طلب زبون</span>
          </div>
        </div>

        {/* جدول الطلبات */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-neutral-800 flex justify-between items-center">
            <h2 className="text-lg font-black text-white tracking-wide">سجل الطلبات الحية</h2>
            <span className="text-xs bg-yellow-400/10 text-yellow-400 font-bold px-3 py-1 rounded-full border border-yellow-400/20">{filteredOrders.length} طلب</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-right border-collapse">
              <thead>
                <tr className="bg-neutral-950 text-neutral-400 text-xs font-bold uppercase tracking-wider">
                  <th className="p-4">رقم الطلب / الوقت</th>
                  <th className="p-4">الزبون</th>
                  <th className="p-4">تفاصيل الوجبات</th>
                  <th className="p-4">المبلغ</th>
                  <th className="p-4">حالة الطلب</th>
                  <th className="p-4 text-center">الفاتورة</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800 text-sm">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-12 text-center text-neutral-500 font-semibold">
                      لا توجد طلبات مسجلة في هذه الفترة.
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => {
                    const total = getOrderTotal(order);
                    return (
                      <tr key={order.id} className="hover:bg-neutral-800/40 transition">
                        <td className="p-4">
                          <div className="font-black text-white">#{order.id.slice(0, 6)}</div>
                          <div className="text-xs text-neutral-400 mt-0.5 font-medium">{new Date(order.created_at).toLocaleString()}</div>
                        </td>
                        <td className="p-4">
                          <div className="font-bold text-neutral-100">{order.customer_name || 'زبون عام'}</div>
                          <div className="text-xs text-neutral-400 mt-0.5 font-medium" dir="ltr">{order.customer_phone || 'بدون رقم'}</div>
                        </td>
                        <td className="p-4">
                          <ul className="space-y-1">
                            {order.items && Array.isArray(order.items) ? (
                              order.items.map((item, idx) => (
                                <li key={idx} className="text-xs font-semibold text-neutral-300">
                                  • <span className="font-bold text-yellow-400">{item.quantity}x</span> {item.name} <span className="text-neutral-500">(${item.price})</span>
                                </li>
                              ))
                            ) : (
                              <li className="text-xs text-neutral-500">تفاصيل غير متوفرة</li>
                            )}
                          </ul>
                        </td>
                        <td className="p-4 font-black text-emerald-400 text-base">
                          ${total.toFixed(2)}
                        </td>
                        <td className="p-4">
                          <select
                            value={order.status || 'pending'}
                            onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                            className="px-3 py-1.5 rounded-xl text-xs font-bold bg-black border border-neutral-700 text-yellow-400 focus:outline-none focus:border-yellow-400 transition cursor-pointer"
                          >
                            <option value="pending">⏳ قيد الانتظار</option>
                            <option value="preparing">🔥 قيد التحضير</option>
                            <option value="completed">✅ تمت الطلبية</option>
                          </select>
                        </td>
                        <td className="p-4 text-center">
                          <button
                            onClick={() => setSelectedInvoice(order)}
                            className="bg-neutral-800 hover:bg-neutral-700 text-yellow-400 font-bold px-3.5 py-2 rounded-xl text-xs transition border border-neutral-700 shadow-sm"
                          >
                            📄 عرض الفاتورة
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* نافذة الفاتورة المنبثقة (Modal) */}
      {selectedInvoice && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-6 relative">
            <button 
              onClick={() => setSelectedInvoice(null)}
              className="absolute top-4 left-4 text-neutral-400 hover:text-white font-black text-lg"
            >
              ✕
            </button>

            <div className="text-center space-y-2 border-b border-neutral-800 pb-4">
              <div className="text-3xl">🍟</div>
              <h3 className="text-xl font-black text-white">GAZO FRIES - فاتورة الزبون</h3>
              <p className="text-xs text-neutral-400 font-medium">رقم الطلب: #{selectedInvoice.id.slice(0, 8)}</p>
              <p className="text-xs text-neutral-500 font-medium">{new Date(selectedInvoice.created_at).toLocaleString()}</p>
            </div>

            <div className="space-y-3 text-sm text-neutral-200">
              <div className="bg-black border border-neutral-800 p-4 rounded-2xl space-y-2">
                <p className="font-medium"><strong>اسم الزبون:</strong> <span className="text-white font-bold">{selectedInvoice.customer_name || 'غير متوفر'}</span></p>
                <p className="font-medium"><strong>رقم الهاتف:</strong> <span className="text-white font-bold" dir="ltr">{selectedInvoice.customer_phone || 'غير متوفر'}</span></p>
                <p className="font-medium"><strong>حالة الطلب:</strong> <span className="text-yellow-400 font-bold">{selectedInvoice.status || 'قيد الانتظار'}</span></p>
              </div>

              <div>
                <h4 className="font-bold text-neutral-300 mb-2 text-xs uppercase tracking-wider">الوجبات المطلوبة:</h4>
                <div className="divide-y divide-neutral-800 border border-neutral-800 rounded-2xl overflow-hidden bg-black">
                  {selectedInvoice.items?.map((item, idx) => (
                    <div key={idx} className="p-3.5 flex justify-between items-center text-xs">
                      <span className="text-neutral-200 font-medium"><strong className="text-yellow-400 font-bold">{item.quantity}x</strong> {item.name}</span>
                      <span className="font-bold text-white">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center pt-3 border-t border-neutral-800 text-base font-black">
                <span className="text-neutral-300">المبلغ الإجمالي المدفوع:</span>
                <span className="text-emerald-400 text-lg">${getOrderTotal(selectedInvoice).toFixed(2)}</span>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => window.print()}
                className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black font-black py-3 rounded-2xl transition shadow-md text-sm"
              >
                🖨️ طباعة الفاتورة
              </button>
              <button
                onClick={() => setSelectedInvoice(null)}
                className="px-5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-bold py-3 rounded-2xl transition text-sm border border-neutral-700"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
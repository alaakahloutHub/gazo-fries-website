export interface MenuItem {
  id: string;
  name: string;
  englishName: string;
  description: string;
  price: number;
  image: string;
  isPopular?: boolean;
}

export const menuItems: MenuItem[] = [
  {
    id: "1",
    name: "أميجوس برجر",
    englishName: "Amigos Burger",
    description: "شريحة لحم بقر طازجة مع الجبن الذائب، الصلصة الخاصة والمخلل المميز.",
    price: 30,
    image: "/images/burgers stock.jpg",
    isPopular: true,
  },
  {
    id: "2",
    name: "بيف برجر",
    englishName: "Beef Burger",
    description: "لحم بقر مشوي على الفحم مع الجبن الذهبي، الخس الطازج وصلصة البرجر.",
    price: 28,
    image: "/images/beef-burger.jpg",
  },
  {
    id: "3",
    name: "تشيكن برجر",
    englishName: "Chicken Burger",
    description: "صدر دجاج طري مشوي مع صلصة المايونيز بالثوم والشرائح الطازجة.",
    price: 26,
    image: "/images/chicken-burger.jpg",
  },
  {
    id: "4",
    name: "كرانشي برجر",
    englishName: "Crunchy Burger",
    description: "دجاج مقرمش للغاية مع التتبيلة الحارة المميزة والصلصة الغنية.",
    price: 32,
    image: "/images/crunchy-burger.jpg",
    isPopular: true,
  },
  {
    id: "5",
    name: "جيمي برجر",
    englishName: "Jimmy Burger",
    description: "شريحة لحم بقر ممتازة مع صوص جيمي الخاص والجبنة الذائبة.",
    price: 35,
    image: "/images/jimmy-burger.jpg",
  },
  {
    id: "6",
    name: "مشروم برجر",
    englishName: "Mushroom Burger",
    description: "شريحة لحم غنية بصلصة المشروم الكريمية والفطر المشوي.",
    price: 30,
    image: "/images/mushroom-burger.jpg",
  },
];
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingCart, X, Star, User, Edit2, LogOut } from "lucide-react";
import { Toaster, toast } from "react-hot-toast";

// ---------------- البيانات ----------------
const CATEGORIES = ["الكل","ألعاب","كاميرات","لوحات مفاتيح","ميكروفونات","كابلات","ساعات","إكسسوارات"];
const PRODUCTS = [
{ 
  id:1, 
  name:"وحدة تحكم ألعاب Switch/Lite/OLED لاسلكية", 
  category:"ألعاب", 
  price:35, 
  rating:4.6, 
  images: {
    black: ["/image/black.jpg","/image/black_2.jpg"],
    white: ["/image/white.jpg","/image/white_2.jpg"],
    extra: ["/image/e.jpg","/image/erx.jpg","/image/effe.jpg","/image/ed.jpg"],
  },
  colors: ["black","white"],
  description:"وحدة تحكم لاسلكية متوافقة مع أجهزة Nintendo Switch / Lite / OLED. توفر استجابة سريعة وتصميم مريح للاستخدام الطويل."
},
{ 
  id:2, 
  name:"كاميرا ويب Jiacuali HD 1080P مع ميكروفون", 
  category:"كاميرات", 
  price:22, 
  rating:4.4, 
  images: {
    black: ["/image/b.jpg"],
    extra: ["/image/k.jpg","/image/c.jpg","/image/m.jpg","/image/h.jpg","/image/mm.jpg"],
  },
  colors: ["black"],
  description:"كاميرا ويب بدقة 1080P عالية الوضوح مع ميكروفون مدمج لعقد الاجتماعات والدروس عبر الإنترنت بجودة صوت وصورة ممتازة."
},
{ 
  id:3, 
  name:"لوحة مفاتيح ألعاب ZIYOU LANG M75 لاسلكية", 
  category:"لوحات مفاتيح", 
  price:45, 
  rating:4.7, 
  images: {
    black: ["/image/pl.jpg"],
    pink: ["/image/pz.jpg"],
    purple: ["/image/ke.jpg"],
    extra: ["/image/z.jpg","/image/zy.jpg","/image/zx.jpg","/image/v.jpg","/image/qa.jpg"],
  },
  colors: ["black","purple","pink"],
  description:"لوحة مفاتيح ألعاب ميكانيكية لاسلكية بتصميم مدمج ودعم إضاءة خلفية RGB وأزرار عالية الاستجابة للألعاب."
},
{ 
  id:4, 
  name:"لوحة مفاتيح FREE WOLF F68 RGB ميكانيكية سلكية", 
  category:"لوحات مفاتيح", 
  price:40, 
  rating:4.5, 
  images: {
    black: ["/image/8.jpg"],
    white: ["/image/7.jpg"],
    extra:["/image/1.jpg","/image/2.jpg","/image/3.jpg","/image/4.jpg"],
  },
  colors:["black","white"],
  description:"لوحة مفاتيح ميكانيكية سلكية مع إضاءة RGB قابلة للتخصيص. تصميم مريح ومناسب للاعبين والمبرمجين."
},
{ 
  id:5, 
  name:"حامل ميكروفون فولاذي احترافي مع إدارة كابلات", 
  category:"ميكروفونات", 
  price:18, 
  rating:4.3, 
  images: {
    black:["/image/11.jpg"],
    extra:["/image/22.jpg","/image/33.jpg","/image/44.jpg","/image/55.jpg","/image/66.jpg","/image/77.jpg","/image/88.jpg"],
  },
  colors:["black"],
  description:"حامل ميكروفون معدني قابل للتعديل مع إمكانية تثبيت على الطاولة. مزود بنظام لإدارة الكابلات لتقليل الفوضى."
},
{ 
  id:6, 
  name:"وحدة تحكم XB360-04 سلكية عالية الأداء", 
  category:"ألعاب", 
  price:28, 
  rating:4.2, 
  images: {
    black: ["/image/1p.jpg"],
    white: ["/image/2p.jpg"],
    extra:["/image/3p.jpg","/image/4p.jpg","/image/5p.jpg","/image/6p.jpg"],
  },
  colors:["black","white"],
  description:"وحدة تحكم سلكية متوافقة مع أجهزة الكمبيوتر و Xbox 360. تتميز بأزرار دقيقة وتصميم مريح."
},
{ 
  id:8, 
  name:"ميكسر صوتي احترافي مع تأثيرات إضاءة", 
  category:"ميكروفونات", 
  price:65, 
  rating:4.5, 
  images: {
    default:["/image/1q.jpg"],
    extra:["/image/2q.jpg","/image/3q.jpg","/image/4q.jpg","/image/5q.jpg","/image/6q.jpg","/image/7q.jpg","/image/8q.jpg"],
  },
  colors:["default"],
  description:"ميكسر صوتي احترافي يدعم مؤثرات صوتية متعددة مع إضاءة LED مدمجة. مناسب للبث المباشر وتسجيل الأغاني."
},
{ 
  id:9, 
  name:"كابل شحن سريع Type-C PD 3.1 240W", 
  category:"كابلات", 
  price:12, 
  rating:4.8, 
  images: {
    gray: ["/image/1w.jpg"],
    green: ["/image/2w.jpg"],
    extra:["/image/3w.jpg","/image/4w.jpg","/image/5w.jpg","/image/6q.jpg"],
  },
  colors:["gray","green"],
  description:"كابل Type-C عالي الجودة يدعم Power Delivery 3.1 بقدرة تصل إلى 240W. مثالي للأجهزة الحديثة."
},
{ 
  id:10, 
  name:"لوحة مفاتيح ميكانيكية زرقاء 50/100 قطعة", 
  category:"لوحات مفاتيح", 
  price:55, 
  rating:4.4, 
  images: {
    blue: ["/image/1a.jpg"],
    extra:["/image/2a.jpg","/image/3a.jpg","/image/4a.jpg","/image/5a.jpg","/image/6a.jpg"],
  },
  colors:["blue"],
  description:"مجموعة مفاتيح ميكانيكية بلون أزرق (50 أو 100 مفتاح). مناسبة للتبديل في لوحات المفاتيح الميكانيكية."
},
{ 
  id:11, 
  name:"ساعة منبه LED رقمية مبتكرة", 
  category:"ساعات", 
  price:15, 
  rating:4.3, 
  images: {
    purple:["/image/1s.jpg"],
    green:["/image/2s.jpg"],
    blue: ["/image/3s.jpg"],
    extra:["/image/4s.jpg","/image/5s.jpg","/image/6s.jpg"],
  },
  colors:["blue","green","purple"],
  description:"ساعة رقمية مبتكرة تحتوي على وظائف متعددة مثل المنبه وإظهار درجة الحرارة."
},
{ 
  id:12, 
  name:"حصيرة ماوس كبيرة مضادة للانزلاق مقاومة للماء", 
  category:"إكسسوارات", 
  price:20, 
  rating:4.5, 
  images: {
    default:["/image/1e.jpg"],
    extra:["/image/2e.jpg","/image/3e.jpg","/image/4e.jpg"],
  },
  colors:["default"],
  description:"حصيرة ماوس بمساحة واسعة مصنوعة من مواد مقاومة للماء والانزلاق. مثالية للألعاب والعمل."
},
{ 
  id:13, 
  name:"موسع إشارة WiFi قوي تغطية 9000 قدم²", 
  category:"إكسسوارات", 
  price:30, 
  rating:4.7, 
  images: {
    default:["/image/1r.jpg"],
    extra:["/image/2r.jpg","/image/3r.jpg","/image/4r.jpg","/image/5r.jpg","/image/6r.jpg"],
  },
  colors:["default"],
  description:"موسع واي فاي عالمي 1200 ميجابت/ثانية، معزز WIFI6 مزود بـ 6 هوائيات شاملة بزاوية 360° لتغطية تصل إلى 11000 قدم مربع، يدعم منفذ إيثرنت – تشغيل سلس للألعاب والبث عالي الدقة لأكثر من 35 جهازًا في المنزل."
}
];
// ---------------- Local Storage ----------------
const saveUser = (user) => localStorage.setItem("user", JSON.stringify(user));
const getUser = () => JSON.parse(localStorage.getItem("user") || "null");
const removeUser = () => localStorage.removeItem("user");

const saveCart = (userEmail, cart) => localStorage.setItem("cart_" + userEmail, JSON.stringify(cart));
const getCart = (userEmail) => JSON.parse(localStorage.getItem("cart_" + userEmail) || "[]");

// ---------------- Product Card ----------------
function ProductCard({ product, onAddToCart, onViewDetails, inCart }) {
const [selectedColor,setSelectedColor]=useState(product.colors[0]);
const [currentImageIndex,setCurrentImageIndex]=useState(0);
const images = product.images[selectedColor] || [];
const image = images[currentImageIndex] || "";

return (
<motion.div layout initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-20}} className="bg-white shadow rounded-2xl p-4 hover:shadow-xl transition cursor-pointer" onClick={()=>onViewDetails(product)}>
{images.length>0 && (
<div className="relative">
<img src={image} alt={product.name} className="w-full h-40 object-cover rounded-xl mb-2"/>
{images.length>1 && (
<>
<button onClick={e=>{ e.stopPropagation(); setCurrentImageIndex((currentImageIndex-1+images.length)%images.length) }} className="absolute top-1/2 left-2 -translate-y-1/2 bg-white p-1 rounded-full shadow">{"<"}</button>
<button onClick={e=>{ e.stopPropagation(); setCurrentImageIndex((currentImageIndex+1)%images.length) }} className="absolute top-1/2 right-2 -translate-y-1/2 bg-white p-1 rounded-full shadow">{">"}</button>
</>
)}
</div>
)}
<h3 className="text-lg font-bold">{product.name}</h3>
<p className="text-blue-600 font-semibold">{product.price} ₪</p>
<div className="flex items-center text-yellow-500"><Star size={16}/> {product.rating}</div>
<div className="flex gap-1 mt-2">
{product.colors.map(c=>(
<span key={c} onClick={e=>{ e.stopPropagation(); setSelectedColor(c); setCurrentImageIndex(0) }}
className={`w-6 h-6 rounded-full border ${selectedColor===c?"border-black":"border-gray-300"}`} style={{backgroundColor:c==="default"?"#ddd":c}}></span>
))}
</div>
{!inCart && <button onClick={e=>{ e.stopPropagation(); onAddToCart({...product, selectedColor}) }} className="mt-2 w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition">إضافة للسلة</button>}
</motion.div>
);
}

// ---------------- Product Detail Modal ----------------
function ProductDetailModal({ product, onClose, onAddToCart }) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // صور اللون المحدد + الصور الإضافية
  const mainImages = product.images[selectedColor] || [];
  const extraImages = product.images.extra || [];
  const images = [...mainImages, ...extraImages];

  const image = images[currentImageIndex] || "";

  return (
    <motion.div
      initial={{opacity:0}}
      animate={{opacity:1}}
      exit={{opacity:0}}
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
    >
      <motion.div
        initial={{scale:0.8}}
        animate={{scale:1}}
        exit={{scale:0.8}}
        className="bg-white p-6 rounded-xl w-11/12 md:w-2/3 max-h-[90vh] overflow-y-auto relative"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 bg-gray-200 p-1 rounded-full"
        >
          <X />
        </button>

        {/* الصورة الرئيسية */}
        {image && (
          <div className="mb-4 flex justify-center">
            <img
              src={image}
              alt={product.name}
              className="w-full max-h-[400px] object-contain rounded-xl"
            />
          </div>
        )}

        {/* صور extra كمصغرات تحت الصورة */}
        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto mb-4">
            {images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                onClick={() => setCurrentImageIndex(idx)}
                className={`w-20 h-20 object-cover rounded cursor-pointer border-2 ${
                  currentImageIndex === idx ? "border-blue-600" : "border-gray-200"
                }`}
              />
            ))}
          </div>
        )}

        <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
        <p className="text-blue-600 font-semibold mb-2">{product.price} ₪</p>
        <div className="mb-2">{product.description}</div>

        {/* ألوان المنتج */}
        <div className="flex gap-2 mb-4">
          {product.colors.map(c => (
            <span
              key={c}
              onClick={() => { setSelectedColor(c); setCurrentImageIndex(0); }}
              className={`w-6 h-6 rounded-full border ${
                selectedColor === c ? "border-black" : "border-gray-300"
              }`}
              style={{ backgroundColor: c === "default" ? "#ddd" : c }}
            ></span>
          ))}
        </div>

        <button
          onClick={() => onAddToCart({ ...product, selectedColor })}
          className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
        >
          إضافة للسلة
        </button>
      </motion.div>
    </motion.div>
  );
}
function UserPanel({ isOpen, onClose, user, setUser, cart, setCart }) {
const [mode,setMode]=useState("login");
const [isEditing,setIsEditing]=useState(false);
const [editForm,setEditForm]=useState(user || {firstName:"",lastName:"",email:"",password:"",phone:"",city:"",address:""});

const handleLogin=(e)=>{
e.preventDefault();
const email=e.target[0].value;
const password=e.target[1].value;
const stored=getUser();
if(stored && stored.email===email && stored.password===password){
setUser(stored);
setEditForm(stored);
setMode("login");
toast.success("تم تسجيل الدخول");
} else { toast.error("خطأ في البريد أو كلمة المرور"); }
};

const handleRegister=(e)=>{
e.preventDefault();
const form={
firstName:e.target[0].value,
lastName:e.target[1].value,
email:e.target[2].value,
password:e.target[3].value,
phone:e.target[4].value,
city:e.target[5].value,
address:e.target[6].value
};
saveUser(form);
setUser(form);
setEditForm(form);
toast.success("تم إنشاء الحساب");
};

const handleSaveEdit=()=>{
saveUser(editForm);
setUser(editForm);
toast.success("تم تحديث البيانات");
setIsEditing(false);
};

const handleLogout=()=>{
removeUser();
setUser(null);
setCart([]);
toast.success("تم تسجيل الخروج");
};

if(!isOpen) return null;

return (
<div className="fixed top-0 right-0 w-96 h-full bg-white shadow-lg p-6 overflow-y-auto z-50">
<div className="flex justify-between items-center mb-6">
<h2 className="text-xl font-bold">👤 حساب المستخدم</h2>
<X onClick={onClose} className="cursor-pointer"/>
</div>

{user ? (
<div className="flex flex-col items-center gap-4">
<div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-3xl"><User/></div>
{isEditing ? (
<div className="flex flex-col gap-2 w-full">
<input type="text" value={editForm.firstName} onChange={e=>setEditForm({...editForm,firstName:e.target.value})} className="border p-2 rounded"/>
<input type="text" value={editForm.lastName} onChange={e=>setEditForm({...editForm,lastName:e.target.value})} className="border p-2 rounded"/>
<input type="email" value={editForm.email} onChange={e=>setEditForm({...editForm,email:e.target.value})} className="border p-2 rounded"/>
<input type="text" value={editForm.phone} onChange={e=>setEditForm({...editForm,phone:e.target.value})} className="border p-2 rounded"/>
<input type="text" value={editForm.city} onChange={e=>setEditForm({...editForm,city:e.target.value})} className="border p-2 rounded"/>
<input type="text" value={editForm.address} onChange={e=>setEditForm({...editForm,address:e.target.value})} className="border p-2 rounded"/>
<button onClick={handleSaveEdit} className="bg-green-600 text-white py-2 rounded">حفظ التغييرات</button>
</div>
) : (
<>
<p className="text-lg font-bold">{user.firstName} {user.lastName}</p>
<p className="text-gray-600">{user.email}</p>
{user.phone && <p>📞 {user.phone}</p>}
{user.city && <p>🏙️ {user.city}</p>}
{user.address && <p>📍 {user.address}</p>}
<div className="flex gap-2 mt-4">
<button onClick={()=>setIsEditing(true)} className="flex items-center gap-2 bg-gray-300 px-4 py-2 rounded"><Edit2 size={16}/> تعديل الحساب</button>
<button onClick={handleLogout} className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded"><LogOut size={16}/> تسجيل الخروج</button>
</div>
</>
)}
</div>
) : (
<div>
<div className="flex mb-4 border-b">
<button className={`flex-1 py-2 ${mode==="login"?"border-b-2 border-blue-600 font-bold":""}`} onClick={()=>setMode("login")}>تسجيل الدخول</button>
<button className={`flex-1 py-2 ${mode==="register"?"border-b-2 border-blue-600 font-bold":""}`} onClick={()=>setMode("register")}>إنشاء حساب</button>
</div>

{mode==="login" && (
<form onSubmit={handleLogin} className="flex flex-col gap-4">
<input type="email" placeholder="البريد الإلكتروني" className="border p-2 rounded" required/>
<input type="password" placeholder="كلمة المرور" className="border p-2 rounded" required/>
<button type="submit" className="bg-blue-600 text-white py-2 rounded">تسجيل الدخول</button>
</form>
)}

{mode==="register" && (
<form onSubmit={handleRegister} className="flex flex-col gap-4">
<input type="text" placeholder="الاسم الأول" className="border p-2 rounded" required/>
<input type="text" placeholder="اسم العائلة" className="border p-2 rounded" required/>
<input type="email" placeholder="البريد الإلكتروني" className="border p-2 rounded" required/>
<input type="password" placeholder="كلمة المرور" className="border p-2 rounded" required/>
<input type="text" placeholder="الهاتف" className="border p-2 rounded"/>
<input type="text" placeholder="المدينة" className="border p-2 rounded"/>
<input type="text" placeholder="العنوان" className="border p-2 rounded"/>
<button type="submit" className="bg-green-600 text-white py-2 rounded">إنشاء الحساب</button>
</form>
)}
</div>
)}
</div>
);
}

// ---------------- Cart Panel ----------------
function CartPanel({ cart, onClose, onRemove }) {
const total = cart.reduce((acc,p)=>acc+p.price,0);
return (
<motion.div initial={{x:300}} animate={{x:0}} exit={{x:300}} className="fixed right-0 top-0 h-full w-96 bg-white shadow-xl p-6 z-50">
<button onClick={onClose} className="absolute top-3 right-3 bg-gray-200 p-1 rounded-full"><X /></button>
<h2 className="text-xl font-bold mb-4">السلة ({cart.length})</h2>
<div className="flex flex-col gap-4 overflow-y-auto max-h-[70vh] mb-4">
{cart.map((p,i)=>(
<div key={i} className="flex justify-between items-center">
<span>{p.name} ({p.selectedColor})</span>
<span>{p.price} ₪</span>
<button onClick={()=>onRemove(p)} className="text-red-500"><X /></button>
</div>
))}
</div>
<div className="font-bold mb-4">المجموع: {total} ₪</div>
<button className="w-full bg-green-600 text-white py-2 rounded-xl hover:bg-green-700 transition">الدفع</button>
</motion.div>
);
}

// ---------------- Main Component ----------------
export default function ElectronicsStore() {
const [cart, setCart] = useState([]);
const [user, setUser] = useState(getUser());
const [isCartOpen, setIsCartOpen] = useState(false);
const [selectedProduct, setSelectedProduct] = useState(null);
const [isUserPanelOpen, setIsUserPanelOpen] = useState(false);
const [selectedCategory, setSelectedCategory] = useState("الكل"); // حالة لتصفية التصنيف
const [showVisaForm, setShowVisaForm] = useState(false);
const [showCashOnDelivery, setShowCashOnDelivery] = useState(false); // الدفع عند الاستلام
const [visaCard, setVisaCard] = useState({ number: "", expiry: "", cvv: "" }); // بيانات بطاقة Visa

useEffect(() => {
if (user) setCart(getCart(user.email));
}, [user]);

const addToCart = (product) => {
const newCart = [...cart, product];
setCart(newCart);
if (user) saveCart(user.email, newCart);
toast.success("تمت الإضافة للسلة");
};

const removeFromCart = (product) => {
const newCart = cart.filter(p => p !== product);
setCart(newCart);
if (user) saveCart(user.email, newCart);
};

// تصفية المنتجات حسب التصنيف
const filteredProducts = selectedCategory === "الكل"
? PRODUCTS
: PRODUCTS.filter(p => p.category === selectedCategory);

return (
<div className="p-6">
<Toaster position="top-right" />

{/* رأس الموقع */}
<div className="flex justify-between items-center mb-6">
<h1 className="text-3xl font-bold">Voltix Store</h1>
<div className="flex gap-4">
<button onClick={() => setIsUserPanelOpen(true)} className="flex items-center gap-1 bg-gray-200 px-4 py-2 rounded"><User /> الحساب</button>
<button onClick={() => setIsCartOpen(true)} className="flex items-center gap-1 bg-blue-600 text-white px-4 py-2 rounded"><ShoppingCart /> السلة ({cart.length})</button>
</div>
</div>

{/* شريط التصنيف */}
<div className="flex overflow-x-auto gap-3 mb-6 py-2">
{CATEGORIES.map(cat => (
<button
key={cat}
onClick={() => setSelectedCategory(cat)}
className={`flex-shrink-0 px-4 py-2 rounded-xl border ${
selectedCategory === cat ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-700 border-gray-300"
} hover:bg-blue-500 hover:text-white transition`}
>
{cat}
</button>
))}
</div>

{/* قائمة المنتجات */}
<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
{filteredProducts.map(p => (
<ProductCard key={p.id} product={p} onAddToCart={addToCart} onViewDetails={setSelectedProduct} inCart={cart.includes(p)} />
))}
</div>

{/* مودال تفاصيل المنتج */}
{selectedProduct && <ProductDetailModal product={selectedProduct} onClose={() => setSelectedProduct(null)} onAddToCart={addToCart} />}

{/* لوحة السلة */}
<AnimatePresence>
{isCartOpen && (
<motion.div
initial={{ x: "100%" }}
animate={{ x: 0 }}
exit={{ x: "100%" }}
className="fixed top-0 right-0 w-96 h-full bg-gradient-to-b from-white to-gray-100 shadow-2xl p-6 z-50 overflow-y-auto"
>
<div className="flex justify-between items-center mb-6">
<h2 className="text-2xl font-bold">🛒 سلتك</h2>
<X onClick={() => setIsCartOpen(false)} className="cursor-pointer" />
</div>

{cart.length === 0 ? (
<p className="text-center text-gray-500 mt-20">السلة فارغة</p>
) : (
<>
{cart.map((item, i) => (
<motion.div key={i} layout initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }} className="flex gap-3 items-center border-b py-3 px-2 rounded-xl mb-2 bg-white">
<img src={(item.images[item.selectedColor] || [])[0]} alt={item.name} className="w-16 h-16 object-cover rounded-lg shadow" />
<div className="flex-1">
<p className="font-semibold text-gray-800">{item.name}</p>
<p className="text-gray-600 text-sm">لون: {item.selectedColor}</p>
<p className="text-blue-600 font-bold">{item.price} ₪</p>
</div>
<button onClick={() => removeFromCart(item)} className="text-red-600 font-bold text-xl hover:text-red-800 transition">×</button>
</motion.div>
))}

<div className="mt-6 border-t pt-4 flex flex-col gap-2">
<p className="text-gray-700">تكلفة الشحن: 20 ₪</p>
<p className="font-bold text-xl text-gray-900">
المجموع: {cart.reduce((sum, item) => sum + item.price, 0) + 20} ₪
</p>
</div>

{/* أزرار الدفع */}
<div className="flex flex-col gap-3 mt-6">
<button
onClick={() => { setShowCashOnDelivery(!showCashOnDelivery); setShowVisaForm(false); }}
className="bg-gray-300 text-black py-3 rounded-xl text-lg font-bold shadow hover:bg-gray-400 active:scale-95 transition"
>
الدفع عند الاستلام
</button>

<button
onClick={() => { setShowVisaForm(!showVisaForm); setShowCashOnDelivery(false); }}
className="bg-blue-600 text-white py-3 rounded-xl text-lg font-bold shadow-lg hover:bg-blue-700 active:scale-95 transition"
>
دفع عبر Visa
</button>

{/* عرض بيانات الدفع عند الاستلام */}
{showCashOnDelivery && user && (
<div className="mt-2 p-3 bg-white border rounded text-gray-700 flex flex-col gap-1">
<p>📍 المدينة: {user.city || "غير محددة"}</p>
<p>🏠 العنوان: {user.address || "غير محدد"}</p>
<p>📞 رقم الهاتف: {user.phone || "غير محدد"}</p>
</div>
)}

{/* نموذج بيانات بطاقة Visa */}
{showVisaForm && (
<div className="mt-4 p-4 border rounded-xl bg-white shadow-md flex flex-col gap-3">
<input
type="text"
placeholder="رقم البطاقة"
maxLength={16}
value={visaCard.number}
onChange={e => setVisaCard({ ...visaCard, number: e.target.value.replace(/\D/g, "") })}
className="border p-2 rounded"
/>
<input
type="text"
placeholder="MM/YY"
maxLength={5}
value={visaCard.expiry}
onChange={e => {
let val = e.target.value.replace(/[^\d]/g, "");
if (val.length > 2) val = val.slice(0, 2) + "/" + val.slice(2, 4);
setVisaCard({ ...visaCard, expiry: val });
}}
className="border p-2 rounded"
/>
<input
type="text"
placeholder="CVV"
maxLength={4}
value={visaCard.cvv}
onChange={e => setVisaCard({ ...visaCard, cvv: e.target.value.replace(/\D/g, "") })}
className="border p-2 rounded"
/>
</div>
)}

{/* زر إتمام الشراء */}
{(showCashOnDelivery || showVisaForm) && (
<button
onClick={() => {
if (showVisaForm) {
const { number, expiry, cvv } = visaCard;
if (number.length !== 16) { toast.error("رقم البطاقة غير صحيح"); return; }
const [mm, yy] = expiry.split("/");
if (!mm || !yy || parseInt(mm) < 1 || parseInt(mm) > 12 || yy.length !== 2) { toast.error("تاريخ الانتهاء غير صالح"); return; }
if (cvv.length < 3 || cvv.length > 4) { toast.error("CVV غير صالح"); return; }
toast.success("تم الدفع بنجاح!");
} else if (showCashOnDelivery) {
toast.success("تم تأكيد الطلب وسيتم الدفع عند الاستلام!");
}
setCart([]);
setShowVisaForm(false);
setShowCashOnDelivery(false);
setVisaCard({ number: "", expiry: "", cvv: "" });
}}
className="bg-green-600 text-white py-3 rounded-xl text-lg font-bold shadow-lg hover:bg-green-700 active:scale-95 transition mt-3"
>
إتمام الشراء
</button>
)}
</div>
</>
)}
</motion.div>
)}
</AnimatePresence>

{/* لوحة المستخدم */}
<UserPanel isOpen={isUserPanelOpen} onClose={() => setIsUserPanelOpen(false)} user={user} setUser={setUser} cart={cart} setCart={setCart} />
</div>
);
}
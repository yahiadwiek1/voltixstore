import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingCart, X, Star, User } from "lucide-react";
import { Toaster, toast } from "react-hot-toast";

// ------------------ بيانات ------------------
const CATEGORIES = ["الكل","ألعاب","كاميرات","لوحات مفاتيح","ميكروفونات","كابلات","ساعات","إكسسوارات"];
const PRODUCTS = [
  { id:1, name:"وحدة تحكم ألعاب Switch/Lite/OLED لاسلكية", category:"ألعاب", price:35, rating:4.6, image:"https://via.placeholder.com/150", description:"وحدة تحكم لاسلكية متوافقة مع أجهزة Nintendo Switch / Lite / OLED. توفر استجابة سريعة وتصميم مريح للاستخدام الطويل." },
  { id:2, name:"كاميرا ويب Jiacuali HD 1080P مع ميكروفون", category:"كاميرات", price:22, rating:4.4, image:"https://via.placeholder.com/150", description:"كاميرا ويب بدقة 1080P عالية الوضوح مع ميكروفون مدمج لعقد الاجتماعات والدروس عبر الإنترنت بجودة صوت وصورة ممتازة." },
  { id:3, name:"لوحة مفاتيح ألعاب ZIYOU LANG M75 لاسلكية", category:"لوحات مفاتيح", price:45, rating:4.7, image:"https://via.placeholder.com/150", description:"لوحة مفاتيح ألعاب ميكانيكية لاسلكية بتصميم مدمج ودعم إضاءة خلفية RGB وأزرار عالية الاستجابة للألعاب." },
  { id:4, name:"لوحة مفاتيح FREE WOLF F68 RGB ميكانيكية سلكية", category:"لوحات مفاتيح", price:40, rating:4.5, image:"https://via.placeholder.com/150", description:"لوحة مفاتيح ميكانيكية سلكية مع إضاءة RGB قابلة للتخصيص. تصميم مريح ومناسب للاعبين والمبرمجين." },
  { id:5, name:"حامل ميكروفون فولاذي احترافي مع إدارة كابلات", category:"ميكروفونات", price:18, rating:4.3, image:"https://via.placeholder.com/150", description:"حامل ميكروفون معدني قابل للتعديل مع إمكانية تثبيت على الطاولة. مزود بنظام لإدارة الكابلات لتقليل الفوضى." },
  { id:6, name:"وحدة تحكم XB360-04 سلكية عالية الأداء", category:"ألعاب", price:28, rating:4.2, image:"https://via.placeholder.com/150", description:"وحدة تحكم سلكية متوافقة مع أجهزة الكمبيوتر و Xbox 360. تتميز بأزرار دقيقة وتصميم مريح." },
  { id:7, name:"ميكروفون USB 192KHz/24bit", category:"ميكروفونات", price:50, rating:4.6, image:"https://via.placeholder.com/150", description:"ميكروفون USB احترافي بجودة تسجيل تصل إلى 192kHz/24bit. مثالي للبودكاست والتسجيلات الصوتية والبث المباشر." },
  { id:8, name:"ميكسر صوتي احترافي مع تأثيرات إضاءة", category:"ميكروفونات", price:65, rating:4.5, image:"https://via.placeholder.com/150", description:"ميكسر صوتي احترافي يدعم مؤثرات صوتية متعددة مع إضاءة LED مدمجة. مناسب للبث المباشر وتسجيل الأغاني." },
  { id:9, name:"كابل شحن سريع Type-C PD 3.1 240W", category:"كابلات", price:12, rating:4.8, image:"https://via.placeholder.com/150", description:"كابل Type-C عالي الجودة يدعم Power Delivery 3.1 بقدرة تصل إلى 240W. مثالي للأجهزة الحديثة." },
  { id:10, name:"لوحة مفاتيح ميكانيكية زرقاء 50/100 قطعة", category:"لوحات مفاتيح", price:55, rating:4.4, image:"https://via.placeholder.com/150", description:"مجموعة مفاتيح ميكانيكية بلون أزرق (50 أو 100 مفتاح). مناسبة للتبديل في لوحات المفاتيح الميكانيكية." },
  { id:11, name:"ساعة منبه LED رقمية مبتكرة", category:"ساعات", price:15, rating:4.3, image:"https://via.placeholder.com/150", description:"ساعة منبه LED أنيقة مع شاشة رقمية واضحة. تحتوي على وظائف متعددة مثل المنبه وإظهار درجة الحرارة." },
  { id:12, name:"حصيرة ماوس كبيرة مضادة للانزلاق مقاومة للماء", category:"إكسسوارات", price:20, rating:4.5, image:"https://via.placeholder.com/150", description:"حصيرة ماوس بمساحة واسعة مصنوعة من مواد مقاومة للماء والانزلاق. مثالية للألعاب والعمل." },
  { id:13, name:"موسع إشارة WiFi قوي تغطية 9000 قدم²", category:"إكسسوارات", price:30, rating:4.7, image:"https://via.placeholder.com/150", description:"موسع WiFi احترافي بتغطية تصل إلى 9000 قدم². يعزز إشارة الإنترنت ويوفر اتصالاً ثابتاً وسريعاً." }
];

// ------------------ Local Storage ------------------
const saveUser = (user) => localStorage.setItem("voltix_user", JSON.stringify(user));
const getUser = () => JSON.parse(localStorage.getItem("voltix_user"));
const removeUser = () => localStorage.removeItem("voltix_user");
const saveCart = (userEmail, cart) => localStorage.setItem("voltix_cart_" + userEmail, JSON.stringify(cart));
const getCart = (userEmail) => JSON.parse(localStorage.getItem("voltix_cart_" + userEmail)) || [];
const saveOrder = (userEmail, order) => {
  const orders = JSON.parse(localStorage.getItem("voltix_orders_" + userEmail)) || [];
  orders.push(order);
  localStorage.setItem("voltix_orders_" + userEmail, JSON.stringify(orders));
};
const getOrders = (userEmail) => JSON.parse(localStorage.getItem("voltix_orders_" + userEmail)) || [];

// ------------------ بطاقة المنتج ------------------
function ProductCard({ product, onAddToCart, onViewDetails, onRemoveFromCart, inCart }) {
  return (
    <motion.div layout initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-20}} className="bg-white shadow rounded-2xl p-4 hover:shadow-xl transition duration-300 relative">
      {inCart && <button onClick={()=>onRemoveFromCart(product)} className="absolute top-2 right-2 text-red-600"><X/></button>}
      <img src={product.image} alt={product.name} className="w-full h-36 object-cover rounded-xl mb-2 cursor-pointer" onClick={()=>onViewDetails(product)}/>
      <h3 className="text-lg font-bold cursor-pointer" onClick={()=>onViewDetails(product)}>{product.name}</h3>
      <p className="text-blue-600 font-semibold">{product.price} ₪</p>
      <div className="flex items-center text-yellow-500"><Star size={16} className="fill-yellow-500"/> {product.rating}</div>
      {!inCart && <button onClick={()=>onAddToCart(product)} className="mt-2 w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-2 rounded-xl hover:from-blue-700 hover:to-blue-500 transition">إضافة للسلة</button>}
    </motion.div>
  );
}

// ------------------ تفاصيل المنتج ------------------
function ProductDetailModal({ product, onClose, onAddToCart }) {
  return (
    <AnimatePresence>
      {product && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <motion.div initial={{scale:0.8}} animate={{scale:1}} exit={{scale:0.8}} className="bg-white rounded-2xl p-6 max-w-md w-full relative">
            <button onClick={onClose} className="absolute top-4 right-4"><X size={24}/></button>
            <img src={product.image} alt={product.name} className="w-full h-64 object-cover rounded-xl mb-4"/>
            <h2 className="text-xl font-bold mb-2">{product.name}</h2>
            <p className="text-gray-700 mb-2">{product.description}</p>
            <p className="text-blue-600 font-bold mb-2">{product.price} ₪</p>
            <div className="flex items-center text-yellow-500 mb-4"><Star size={16} className="fill-yellow-500"/> {product.rating}</div>
            <button onClick={()=>{onAddToCart(product); onClose();}} className="w-full bg-green-600 text-white py-2 rounded">إضافة للسلة</button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ------------------ لوحة المستخدم ------------------
function UserPanel({ isOpen, onClose, user, setUser, cart, setCart }) {
  const [mode, setMode] = useState("login");
  const [formData, setFormData] = useState({ firstName:"", lastName:"", email:"", password:"", phone:"", city:"", address:"" });
  const [orders, setOrders] = useState([]);

  useEffect(()=>{ if(user) { setFormData(user); setOrders(getOrders(user.email)); setMode("login"); } },[user]);

  const handleLogin = e => {
    e.preventDefault();
    const stored = getUser();
    if(!stored || stored.email!==formData.email || stored.password!==formData.password){
      toast.error("البريد أو كلمة المرور خاطئة"); return;
    }
    setUser(stored);
    setCart(getCart(stored.email));
    setOrders(getOrders(stored.email));
    toast.success("تم تسجيل الدخول");
    onClose();
  };

  const handleRegister = e => {
    e.preventDefault();
    const required = ["firstName","lastName","email","password"];
    if(required.some(f => !formData[f])){ toast.error("الرجاء تعبئة جميع الحقول الأساسية"); return; }
    saveUser(formData);
    setUser(formData);
    setCart([]);
    toast.success("تم إنشاء الحساب");
    onClose();
  };

  const handleEdit = e => {
    e.preventDefault();
    saveUser(formData);
    setUser(formData);
    toast.success("تم تحديث البيانات");
    setMode("login");
  };

  const handleLogout = () => {
    if(user) saveCart(user.email, cart);
    removeUser();
    setUser(null);
    setCart([]);
    toast.success("تم تسجيل الخروج");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{x:"100%"}} animate={{x:0}} exit={{x:"100%"}} className="fixed top-0 right-0 w-96 h-full bg-white shadow-2xl p-6 z-50 overflow-y-auto">
          <button onClick={onClose} className="absolute top-4 left-4"><X size={24}/></button>

          {!user && mode==="login" && (
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <h2 className="text-2xl font-bold mb-4">تسجيل الدخول</h2>
              <input type="email" placeholder="البريد الإلكتروني" value={formData.email} onChange={e=>setFormData({...formData,email:e.target.value})} className="p-2 border rounded"/>
              <input type="password" placeholder="كلمة المرور" value={formData.password} onChange={e=>setFormData({...formData,password:e.target.value})} className="p-2 border rounded"/>
              <button type="submit" className="bg-blue-600 text-white py-2 rounded">تسجيل الدخول</button>
              <p className="text-sm text-gray-500">ليس لديك حساب؟ <span className="text-blue-600 cursor-pointer" onClick={()=>setMode("register")}>إنشاء حساب</span></p>
            </form>
          )}

          {!user && mode==="register" && (
            <form onSubmit={handleRegister} className="flex flex-col gap-4">
              <h2 className="text-2xl font-bold mb-4">إنشاء حساب</h2>
              <input type="text" placeholder="الاسم الأول" value={formData.firstName} onChange={e=>setFormData({...formData,firstName:e.target.value})} className="p-2 border rounded"/>
              <input type="text" placeholder="اسم العائلة" value={formData.lastName} onChange={e=>setFormData({...formData,lastName:e.target.value})} className="p-2 border rounded"/>
              <input type="email" placeholder="البريد الإلكتروني" value={formData.email} onChange={e=>setFormData({...formData,email:e.target.value})} className="p-2 border rounded"/>
              <input type="password" placeholder="كلمة المرور" value={formData.password} onChange={e=>setFormData({...formData,password:e.target.value})} className="p-2 border rounded"/>
              <input type="text" placeholder="الهاتف" value={formData.phone} onChange={e=>setFormData({...formData,phone:e.target.value})} className="p-2 border rounded"/>
              <input type="text" placeholder="المدينة" value={formData.city} onChange={e=>setFormData({...formData,city:e.target.value})} className="p-2 border rounded"/>
              <input type="text" placeholder="العنوان" value={formData.address} onChange={e=>setFormData({...formData,address:e.target.value})} className="p-2 border rounded"/>
              <button type="submit" className="bg-blue-600 text-white py-2 rounded">إنشاء الحساب</button>
              <p className="text-sm text-gray-500">لديك حساب؟ <span className="text-blue-600 cursor-pointer" onClick={()=>setMode("login")}>تسجيل الدخول</span></p>
            </form>
          )}

          {user && mode==="login" && (
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-bold mb-4">مرحبا {user.firstName}</h2>
              <button className="bg-blue-600 text-white py-2 rounded" onClick={()=>setMode("edit")}>تعديل البيانات</button>
              <h3 className="text-xl font-bold mt-4">طلباتك السابقة</h3>
              {orders.length===0 && <p>لم تقم بأي طلب بعد</p>}
              {orders.map((order,i)=>(<div key={i} className="border p-2 rounded mb-2">الطلب {i+1}: {order.items.map(it=>it.name).join(", ")} - الإجمالي: {order.total} ₪</div>))}
              <button onClick={handleLogout} className="bg-red-600 text-white py-2 rounded mt-4">تسجيل الخروج</button>
            </div>
          )}

          {user && mode==="edit" && (
            <form onSubmit={handleEdit} className="flex flex-col gap-4">
              <h2 className="text-2xl font-bold mb-4">تعديل البيانات</h2>
              <input type="text" placeholder="الاسم الأول" value={formData.firstName} onChange={e=>setFormData({...formData,firstName:e.target.value})} className="p-2 border rounded"/>
              <input type="text" placeholder="اسم العائلة" value={formData.lastName} onChange={e=>setFormData({...formData,lastName:e.target.value})} className="p-2 border rounded"/>
              <input type="email" placeholder="البريد الإلكتروني" value={formData.email} onChange={e=>setFormData({...formData,email:e.target.value})} className="p-2 border rounded"/>
              <input type="password" placeholder="كلمة المرور" value={formData.password} onChange={e=>setFormData({...formData,password:e.target.value})} className="p-2 border rounded"/>
              <input type="text" placeholder="الهاتف" value={formData.phone} onChange={e=>setFormData({...formData,phone:e.target.value})} className="p-2 border rounded"/>
              <input type="text" placeholder="المدينة" value={formData.city} onChange={e=>setFormData({...formData,city:e.target.value})} className="p-2 border rounded"/>
              <input type="text" placeholder="العنوان" value={formData.address} onChange={e=>setFormData({...formData,address:e.target.value})} className="p-2 border rounded"/>
              <button type="submit" className="bg-blue-600 text-white py-2 rounded">حفظ التعديلات</button>
            </form>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ------------------ لوحة السلة مع خيارات الدفع ------------------
function CartPanel({ isOpen, onClose, cart, setCart, user }) {
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [cardInfo, setCardInfo] = useState({ number:"", expiry:"", cvv:"" });
  const total = cart.reduce((sum,p)=>sum+p.price,0);
  const paymentAddress = user ? `${user.address}, ${user.city}` : "";

  const handleCheckout = () => {
    if(!user) { toast.error("الرجاء تسجيل الدخول لإتمام الشراء"); return; }
    const order = { items: cart, total, method: paymentMethod, address: paymentAddress, date: new Date().toLocaleString() };
    saveOrder(user.email, order);
    setCart([]);
    saveCart(user.email, []);
    toast.success("تم إتمام الطلب بنجاح");
    onClose();
  };

  const removeItem = (item) => {
    const updated = cart.filter(p=>p.id!==item.id);
    setCart(updated);
    if(user) saveCart(user.email, updated);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{x:"100%"}} animate={{x:0}} exit={{x:"100%"}} className="fixed top-0 right-0 w-96 h-full bg-white shadow-2xl p-6 z-50 overflow-y-auto">
          <button onClick={onClose} className="absolute top-4 left-4"><X size={24}/></button>
          <h2 className="text-2xl font-bold mb-4">سلة المشتريات</h2>
          {cart.length===0 && <p>السلة فارغة</p>}
          {cart.map(item=>(
            <div key={item.id} className="flex justify-between items-center border-b py-2">
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-blue-600">{item.price} ₪</p>
              </div>
              <button onClick={()=>removeItem(item)} className="text-red-600"><X/></button>
            </div>
          ))}
          {cart.length>0 && (
            <>
              <p className="font-bold mt-4">الإجمالي: {total} ₪</p>
              <div className="mt-4 flex flex-col gap-2">
                <label>
                  <input type="radio" name="payment" value="cod" checked={paymentMethod==="cod"} onChange={e=>setPaymentMethod(e.target.value)}/>
                  دفع عند الاستلام
                </label>
                <label>
                  <input type="radio" name="payment" value="visa" checked={paymentMethod==="visa"} onChange={e=>setPaymentMethod(e.target.value)}/>
                  Visa
                </label>
                {paymentMethod==="visa" && (
                  <div className="flex flex-col gap-2 mt-2">
                    <input type="text" placeholder="رقم البطاقة" value={cardInfo.number} onChange={e=>setCardInfo({...cardInfo,number:e.target.value})} className="p-2 border rounded"/>
                    <input type="text" placeholder="MM/YY" value={cardInfo.expiry} onChange={e=>setCardInfo({...cardInfo,expiry:e.target.value})} className="p-2 border rounded"/>
                    <input type="text" placeholder="CVV" value={cardInfo.cvv} onChange={e=>setCardInfo({...cardInfo,cvv:e.target.value})} className="p-2 border rounded"/>
                  </div>
                )}
                {user && <p className="mt-2 text-gray-700">سيتم شحن الطلب إلى: {paymentAddress}</p>}
              </div>
              <button onClick={handleCheckout} className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">إتمام الشراء</button>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ------------------ التطبيق الرئيسي ------------------
export default function App() {
  const [selectedCategory,setSelectedCategory] = useState("الكل");
  const [cart,setCart] = useState([]);
  const [user,setUser] = useState(getUser());
  const [productDetail,setProductDetail] = useState(null);
  const [isUserPanelOpen,setIsUserPanelOpen] = useState(false);
  const [isCartOpen,setIsCartOpen] = useState(false);

  useEffect(()=>{ if(user) setCart(getCart(user.email)); },[user]);

  const filtered = useMemo(()=>selectedCategory==="الكل"?PRODUCTS:PRODUCTS.filter(p=>p.category===selectedCategory),[selectedCategory]);

  const addToCart = (product) => {
    if(cart.some(p=>p.id===product.id)) return;
    const updated = [...cart, product];
    setCart(updated);
    if(user) saveCart(user.email, updated);
    toast.success("تمت الإضافة للسلة");
  };

  const removeFromCart = (product) => {
    const updated = cart.filter(p=>p.id!==product.id);
    setCart(updated);
    if(user) saveCart(user.email, updated);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <Toaster position="top-right"/>
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-blue-600">VoltixStore</h1>
        <div className="flex items-center gap-4">
          <button onClick={()=>setIsUserPanelOpen(true)} className="flex items-center gap-1"><User/> {user?user.firstName:"تسجيل/دخول"}</button>
          <button onClick={()=>setIsCartOpen(true)} className="flex items-center gap-1"><ShoppingCart/> ({cart.length})</button>
        </div>
      </header>

      <nav className="flex gap-2 mb-4 overflow-x-auto">
        {CATEGORIES.map(cat=>(
          <button key={cat} onClick={()=>setSelectedCategory(cat)} className={`px-3 py-1 rounded-xl ${selectedCategory===cat?"bg-blue-600 text-white":"bg-white border"}`}>{cat}</button>
        ))}
      </nav>

      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map(p=>(
          <ProductCard key={p.id} product={p} onAddToCart={addToCart} onViewDetails={setProductDetail} onRemoveFromCart={removeFromCart} inCart={cart.some(c=>c.id===p.id)}/>
        ))}
      </motion.div>

      <ProductDetailModal product={productDetail} onClose={()=>setProductDetail(null)} onAddToCart={addToCart}/>
      <UserPanel isOpen={isUserPanelOpen} onClose={()=>setIsUserPanelOpen(false)} user={user} setUser={setUser} cart={cart} setCart={setCart}/>
      <CartPanel isOpen={isCartOpen} onClose={()=>setIsCartOpen(false)} cart={cart} setCart={setCart} user={user}/>
    </div>
  );
}

// import { useState, useEffect } from 'react';
// import { mockProducts } from './data';
// import { Product } from './types';
// import DashboardView from './components/DashboardView';
// import CompareView from './components/CompareView';
// import HistoryView from './components/HistoryView';
// import TrendsView from './components/TrendsView';
// import ProductDetailView from './components/ProductDetailView';
// import { getAllProducts } from './services/productService';
// import { searchProducts } from './services/searchService';
// import { loginUser, signupUser } from "./services/authService";
// import axios from "axios";

// export default function App() {
//   const [products, setProducts] = useState<Product[]>(mockProducts);
//   const [activeTab, setActiveTab] = useState<'dashboard' | 'compare' | 'history' | 'trends'>('dashboard');
//   const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showLoginModal, setShowLoginModal] = useState(false);
//   const [signupName, setSignupName] = useState("");
//   const [signupEmail, setSignupEmail] = useState("");
//   const [signupPassword, setSignupPassword] = useState("");
//   const [showSignupModal, setShowSignupModal] = useState(false);

  
//   // Custom toast alert feedback
//   const [toastMessage, setToastMessage] = useState<string | null>(null);

//   // Load products from backend on mount
//   useEffect(() => {
//     const loadProducts = async () => {
//       try {
//         setLoading(true);
//         const data = await getAllProducts();
//         if (data && Array.isArray(data) && data.length > 0) {
//           console.log('✅ Loaded products from backend:', data.length);
//           setProducts(data);
//         } else {
//           console.log('✅ Backend returned empty array - using mock data');
//         }
//       } catch (error) {
//         console.error('❌ Backend error:', error);
//         console.log('📦 Falling back to mock data');
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadProducts();
//   }, []);

//   // Auto disappear toast after 4.5 seconds
//   useEffect(() => {
//     if (toastMessage) {
//       const timer = setTimeout(() => {
//         setToastMessage(null);
//       }, 4500);
//       return () => clearTimeout(timer);
//     }
//   }, [toastMessage]);

//   const showFeedback = (msg: string) => {
//     setToastMessage(msg);
//   };

//   const handleLogin = async () => {
//   console.log("HANDLE LOGIN STARTED");

//   try {
//     if (!email || !password) {
//       showFeedback("⚠️ Please enter Email and Password");
//       return;
//     }

//     const data = await loginUser(email, password);

//     console.log("LOGIN RESPONSE:", data);

//     localStorage.setItem("token", data.access_token);

//     setIsLoggedIn(true);

//      setActiveTab("dashboard");
//     setShowLoginModal(false);

//     setEmail("");
//     setPassword("");

//     showFeedback(`✅ Welcome ${data.full_name}!`);
//   } catch (error: any) {
//     console.log("LOGIN ERROR:", error);

//     showFeedback(
//       error.response?.data?.detail || "❌ Login Failed"
//     );
//   }
// };

//  const handleSignup = async () => {
//   try {
//     if (!signupName || !signupEmail || !signupPassword) {
//       showFeedback("⚠️ Please fill all fields");
//       return;
//     }

//     const data = await signupUser(
//       signupName,
//       signupEmail,
//       signupPassword
//     );

//     console.log("SIGNUP RESPONSE:", data);

//     setShowSignupModal(false);
//     setShowLoginModal(true);
//     showFeedback("✅ Account created! Please login.");

//     setSignupName("");
//     setSignupEmail("");
//     setSignupPassword("");
//   } catch (error: any) {
//     console.log("SIGNUP ERROR:", error);

//     showFeedback(
//       error.response?.data?.detail || "❌ Signup Failed"
//     );
//   }
// };

//   // Support adding a custom comparison dynamically
//   const handleAddComparison = (newProductData: {
//     name: string;
//     currentPrice: number;
//     category: string;
//     store: string;
//   }) => {
//     const id = newProductData.name.toLowerCase().replace(/\s+/g, '-');
    
//     if (products.some(p => p.id === id)) {
//       showFeedback(`Product "${newProductData.name}" is already tracked!`);
//       setSelectedProductId(id);
//       return;
//     }

//     const newProd: Product = {
//       id,
//       name: newProductData.name,
//       brand: 'Custom Tracked',
//       category: newProductData.category,
//       rating: 4.5,
//       reviewsCount: '1 review',
//       currentPrice: newProductData.currentPrice,
//       lowestPrice: newProductData.currentPrice * 0.9,
//       highestPrice: newProductData.currentPrice * 1.1,
//       averagePrice: newProductData.currentPrice,
//       description: `A custom-imported product tracking the latest market metrics from ${newProductData.store}.`,
//       specifications: [
//         { label: 'Imported', value: `via ${newProductData.store}`, icon: 'store' }
//       ],
//       image: 'https://via.placeholder.com/150',
//       trendDirection: 'stable',
//       trendPercentage: 0,
//       bestDealStore: newProductData.store,
//       bestDealSavingsPercent: 0,
//       bestDealSavingsAmount: 0,
//       stores: [
//         {
//           name: newProductData.store,
//           price: newProductData.currentPrice,
//           inStock: true,
//           shippingInfo: 'Custom mapped link',
//           isLowest: true
//         }
//       ],
//       priceHistory7d: [
//         { date: 'Oct 01', price: newProductData.currentPrice * 1.05 },
//         { date: 'Today', price: newProductData.currentPrice }
//       ],
//       priceHistory30d: [
//         { date: '30 days ago', price: newProductData.currentPrice * 1.05 },
//         { date: 'Today', price: newProductData.currentPrice }
//       ],
//       priceHistory1y: [
//         { date: 'Jan', price: newProductData.currentPrice * 1.1 },
//         { date: 'Today', price: newProductData.currentPrice }
//       ],
//       recentEvents: [
//         { date: 'Today', type: 'stable', title: 'Price monitor established', subtitle: `Started tracking price points at ${newProductData.store}.` }
//       ]
//     };

//     setProducts(prev => [newProd, ...prev]);
//     showFeedback(`🎉 Successfully added and started price tracking for "${newProductData.name}"!`);
//     setSelectedProductId(id);
//   };

//   const handleKeywordSearch = (keyword: string) => {
//     const cleaned = keyword.trim().toLowerCase();
//     const match = products.find(
//       p => p.name.toLowerCase().includes(cleaned) || p.brand.toLowerCase().includes(cleaned)
//     );

//     if (match) {
//       setSelectedProductId(match.id);
//       showFeedback(`🔎 Found results for "${keyword}". Viewing comparison spreadsheets...`);
//     } else {
//       showFeedback(`ℹ️ No direct catalog match for "${keyword}". Try searching for Sony or iPhone!`);
//     }
//   };

//   const navigationTabs = [
//     { id: 'dashboard' as const, label: 'Dashboard', icon: 'dashboard' },
//     { id: 'compare' as const, label: 'Compare', icon: 'compare_arrows' },
//     { id: 'history' as const, label: 'History', icon: 'history' },
//     { id: 'trends' as const, label: 'Trends', icon: 'trending_up' }
//   ];

//   return (
//     <div className="min-h-screen bg-[#0B0B12] text-white flex flex-col">

//       {toastMessage && (
//         <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] w-full max-w-md px-4 pointer-events-none">
//           <div className="bg-inverse-surface text-inverse-on-surface p-4 rounded-xl shadow-xl flex items-start gap-3 border border-outline-variant/20 tracking-normal text-xs font-semibold select-none animate-bounce pointer-events-auto">
//             <span className="material-symbols-outlined text-primary-fixed text-lg shrink-0 select-none">
//               celebration
//             </span>
//             <span className="flex-1">{toastMessage}</span>
//           </div>
//         </div>
//       )}

//      <header className="sticky top-0 z-50 bg-black/40 backdrop-blur-xl border-b border-violet-500/20 shadow-lg shadow-violet-500/10">
//   <div className="flex items-center justify-between px-4 py-3">

//     <div
//       className="flex items-center gap-4 cursor-pointer"
//       onClick={() => {
//         setSelectedProductId(null);
//         setActiveTab("dashboard");
//       }}
//     >
//       <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-600 via-purple-600 to-green-500 p-[2px]">
//         <div className="w-full h-full rounded-2xl bg-[#0B0B12] flex items-center justify-center">
//           <span className="material-symbols-outlined text-white text-2xl">
//             monitoring
//           </span>
//         </div>
//       </div>

//       <div className="flex flex-col leading-tight">
//         <h1 className="text-3xl font-extrabold bg-gradient-to-r from-violet-400 via-purple-400 to-green-400 bg-clip-text text-transparent">
//           PricePulse
//         </h1>

//         <span className="text-[11px] uppercase tracking-[0.3em] text-green-400">
//           AI Powered Price Intelligence
//         </span>
//       </div>
//     </div>

//     <div className="flex items-center gap-3">
//       {!isLoggedIn ? (
//         <>
//           <button
//             onClick={() => setShowLoginModal(true)}
//             className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-purple-500 text-white font-bold"
//           >
//             Login
//           </button>

//           <button
//             onClick={() => setShowSignupModal(true)}
//             className="px-6 py-3 rounded-xl border border-violet-500/30 text-violet-300"
//           >
//             Signup
//           </button>
//         </>
//       ) : (
//         <>
//           <button
//             onClick={() => {
//               localStorage.removeItem("token");
//               setIsLoggedIn(false);
//             }}
//             className="px-5 py-2 rounded-xl bg-red-500 text-white"
//           >
//             Logout
//           </button>
//         </>
//       )}
//     </div>

//   </div>
// </header>

// <main className="flex-grow max-w-[700px] w-full mx-auto px-4 pt-4">

//   {selectedProductId ? (
//     <ProductDetailView
//       product={products.find(p => p.id === selectedProductId) || products[0]}
//       onBack={() => setSelectedProductId(null)}
//       onSetAlertFeedback={showFeedback}
//     />
//   ) : (
//     <>
//       {activeTab === 'dashboard' && (
//         <DashboardView
//           products={products}
//           onSelectProduct={(id) => setSelectedProductId(id)}
//           onSearch={handleKeywordSearch}
//         />
//       )}

//       {activeTab === 'compare' && (
//         <CompareView
//           products={products}
//           onSelectProduct={(id) => setSelectedProductId(id)}
//           onAddComparison={handleAddComparison}
//         />
//       )}

//       {activeTab === 'history' && (
//         <HistoryView
//           onSelectProduct={(id) => setSelectedProductId(id)}
//         />
//       )}

//       {activeTab === 'trends' && (
//         <TrendsView
//           products={products}
//           onSelectProduct={(id) => setSelectedProductId(id)}
//           onSetAlertFeedback={showFeedback}
//         />
//       )}
//     </>
//   )}
// </main>
// {showLoginModal && (
//   <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
//     <div className="bg-white rounded-3xl shadow-2xl w-[420px] p-8">

//       <div className="text-center mb-6">
//         <h2 className="text-3xl font-bold text-gray-800">
//           Welcome Back
//         </h2>
//         <p className="text-gray-500 mt-2">
//           Login to PricePulse
//         </p>
//       </div>

//       <div className="space-y-4">

//         <input
//           type="email"
//           placeholder="Enter Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className=" w-full
//             border border-gray-300
//             rounded-xl
//             px-4 py-3
//             bg-white
//             text-black
//             placeholder:text-gray-500
//             focus:outline-none
//             focus:ring-2
//             focus:ring-green-500"
//         />

//         <input
//           type="password"
//           placeholder="Enter Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className=" w-full
//     border border-gray-300
//     rounded-xl
//     px-4 py-3
//     bg-white
//     text-black
//     placeholder:text-gray-500
//     focus:outline-none
//     focus:ring-2
//     focus:ring-green-500"
//         />

//         <button
//           onClick={handleLogin}
//           className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
//         >
//           Login
//         </button>

//         <button
//           onClick={() => setShowLoginModal(false)}
//           className=" w-full
//     border border-gray-300
//     rounded-xl
//     px-4 py-3
//     bg-white
//     text-black
//     placeholder:text-gray-500
//     focus:outline-none
//     focus:ring-2
//     focus:ring-green-500"
//         >
//           Cancel
//         </button>

//       </div>
//     </div>
//   </div>
// )}

// {showSignupModal && (
//   <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
//     <div className="bg-white rounded-3xl shadow-2xl w-[420px] p-8">

//       <div className="text-center mb-6">
//         <h2 className="text-3xl font-bold text-gray-800">
//           Create Account
//         </h2>
//         <p className="text-gray-500 mt-2">
//           Sign up for PricePulse
//         </p>
//       </div>

//       <div className="space-y-4">

//         <input
//   type="text"
//   placeholder="Enter Full Name"
//   value={signupName}
//   onChange={(e) => setSignupName(e.target.value)}
//   className="
//     w-full
//     border border-gray-300
//     rounded-xl
//     px-4 py-3
//     bg-white
//     text-black
//     placeholder:text-gray-500
//     focus:outline-none
//     focus:ring-2
//     focus:ring-green-500
//   "
// />
//         <input
//           type="email"
//           placeholder="Enter Email"
//           value={signupEmail}
//           onChange={(e) => setSignupEmail(e.target.value)}
//           className=" w-full
//     border border-gray-300
//     rounded-xl
//     px-4 py-3
//     bg-white
//     text-black
//     placeholder:text-gray-500
//     focus:outline-none
//     focus:ring-2
//     focus:ring-green-500
//   "
//         />

//         <input
//           type="password"
//           placeholder="Enter Password"
//           value={signupPassword}
//           onChange={(e) => setSignupPassword(e.target.value)}
//           className=" w-full
//     border border-gray-300
//     rounded-xl
//     px-4 py-3
//     bg-white
//     text-black
//     placeholder:text-gray-500
//     focus:outline-none
//     focus:ring-2
//     focus:ring-green-500
//   "
//         />

//         <button
//           onClick={handleSignup}
//           className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition"
//         >
//           Create Account
//         </button>

//         <button
//           onClick={() => setShowSignupModal(false)}
//           className=" w-full
//     border border-gray-300
//     rounded-xl
//     px-4 py-3
//     bg-white
//     text-black
//     placeholder:text-gray-500
//     focus:outline-none
//     focus:ring-2
//     focus:ring-green-500
//   "
//         >
//           Cancel
//         </button>

//       </div>
//     </div>
//   </div>
// )}

// <nav className="
// fixed bottom-0 left-0 right-0
// py-3
// bg-[#0B0B12]/95
// backdrop-blur-xl
// border-t border-violet-500/20
// shadow-lg shadow-violet-500/10
// flex justify-around items-center
// z-40
// select-none
// rounded-t-2xl
// max-w-[500px]
// md:max-w-[700px]
// mx-auto
// ">
//   {navigationTabs.map((tab) => {
//     const isActive =
//       activeTab === tab.id && !selectedProductId;

//     return (
//       <button
//   key={tab.id}
//   onClick={() => {
//     setSelectedProductId(null);
//     setActiveTab(tab.id);
//   }}
//   className={`
//     px-4 py-2 rounded-xl
//     transition-all duration-300
//     ${
//       isActive
//         ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-violet-500/30"
//         : "text-gray-400 hover:text-white"
//     }
//   `}
// >
//   {tab.label}
// </button>
//     );
//   })}
// </nav>
//     </div>
//   );
// }


import { useState, useEffect } from 'react';
import { Product, ProductListing, BestPrice, PriceTrend } from './types';
import DashboardView from './components/DashboardView';
import CompareView from './components/CompareView';
import HistoryView from './components/HistoryView';
import TrendsView from './components/TrendsView';
import ProductDetailView from './components/ProductDetailView';
import { getProducts } from './services/dashboardService';
import { getProductDetailData } from './services/productDetailService';
import { loginUser, signupUser } from './services/authService';

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'compare' | 'history' | 'trends'>('dashboard');
  // FIX: Product.id is a number (DB primary key), not a string slug --
  // this was the source of the "error at p.id" bug. Every comparison
  // like `p.id === selectedProductId` silently failed (or didn't
  // typecheck) because it compared a number to a string.
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  // Data for the currently open ProductDetailView -- fetched fresh each
  // time selectedProductId changes, since listings/prices/trends are
  // per-product and weren't loaded as part of the main product list.
  const [detailListings, setDetailListings] = useState<ProductListing[]>([]);
  const [detailBestPrice, setDetailBestPrice] = useState<BestPrice | undefined>(undefined);
  const [detailTrends, setDetailTrends] = useState<PriceTrend[]>([]);
  const [detailLoading, setDetailLoading] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [showSignupModal, setShowSignupModal] = useState(false);

  // Custom toast alert feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load products from backend on mount
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await getProducts();
        if (data && Array.isArray(data) && data.length > 0) {
          console.log('✅ Loaded products from backend:', data.length);
          setProducts(data);
        }
      } catch (error) {
        console.error('❌ Backend error:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  // Fetch listings/best-price/trend data whenever a product is selected
  useEffect(() => {
    if (selectedProductId === null) {
      setDetailListings([]);
      setDetailBestPrice(undefined);
      setDetailTrends([]);
      return;
    }

    let cancelled = false;
    setDetailLoading(true);

    getProductDetailData(selectedProductId)
      .then((data) => {
        if (cancelled) return;
        setDetailListings(data.listings);
        setDetailBestPrice(data.bestPrice);
        setDetailTrends(data.priceTrends);
      })
      .catch(() => {
        if (!cancelled) {
          setDetailListings([]);
          setDetailBestPrice(undefined);
          setDetailTrends([]);
        }
      })
      .finally(() => {
        if (!cancelled) setDetailLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [selectedProductId]);

  // Auto disappear toast after 4.5 seconds
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 4500);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const showFeedback = (msg: string) => {
    setToastMessage(msg);
  };

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        showFeedback('⚠️ Please enter Email and Password');
        return;
      }

      const data = await loginUser(email, password);
      localStorage.setItem('token', data.access_token);

      setIsLoggedIn(true);
      setActiveTab('dashboard');
      setShowLoginModal(false);

      setEmail('');
      setPassword('');

      showFeedback(`✅ Welcome ${data.full_name}!`);
    } catch (error: any) {
      showFeedback(error.response?.data?.detail || '❌ Login Failed');
    }
  };

  const handleSignup = async () => {
    try {
      if (!signupName || !signupEmail || !signupPassword) {
        showFeedback('⚠️ Please fill all fields');
        return;
      }

      await signupUser(signupName, signupEmail, signupPassword);

      setShowSignupModal(false);
      setShowLoginModal(true);
      showFeedback('✅ Account created! Please login.');

      setSignupName('');
      setSignupEmail('');
      setSignupPassword('');
    } catch (error: any) {
      showFeedback(error.response?.data?.detail || '❌ Signup Failed');
    }
  };

  // Re-runs a past search term / keyword by jumping into Compare,
  // where the real search input lives (matches CompareView's filter).
  const handleKeywordSearch = (keyword: string) => {
    setActiveTab('compare');
    showFeedback(`🔎 Searching for "${keyword}"…`);
  };

  const navigationTabs = [
    { id: 'dashboard' as const, label: 'Dashboard', icon: 'dashboard' },
    { id: 'compare' as const, label: 'Compare', icon: 'compare_arrows' },
    { id: 'history' as const, label: 'History', icon: 'history' },
    { id: 'trends' as const, label: 'Trends', icon: 'trending_up' },
  ];

  return (
    <div className="min-h-screen bg-[#0B0B12] text-white flex flex-col">

      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] w-full max-w-md px-4 pointer-events-none">
          <div className="bg-inverse-surface text-inverse-on-surface p-4 rounded-xl shadow-xl flex items-start gap-3 border border-outline-variant/20 tracking-normal text-xs font-semibold select-none animate-bounce pointer-events-auto">
            <span className="material-symbols-outlined text-primary-fixed text-lg shrink-0 select-none">
              celebration
            </span>
            <span className="flex-1">{toastMessage}</span>
          </div>
        </div>
      )}

      <header className="sticky top-0 z-50 bg-black/40 backdrop-blur-xl border-b border-violet-500/20 shadow-lg shadow-violet-500/10">
        <div className="flex items-center justify-between px-4 py-3">

          <div
            className="flex items-center gap-4 cursor-pointer"
            onClick={() => {
              setSelectedProductId(null);
              setActiveTab('dashboard');
            }}
          >
            <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-600 via-purple-600 to-green-500 p-[2px]">
              <div className="w-full h-full rounded-2xl bg-[#0B0B12] flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-2xl">
                  monitoring
                </span>
              </div>
            </div>

            <div className="flex flex-col leading-tight">
              <h1 className="text-3xl font-extrabold bg-gradient-to-r from-violet-400 via-purple-400 to-green-400 bg-clip-text text-transparent">
                PricePulse
              </h1>
              <span className="text-[11px] uppercase tracking-[0.3em] text-green-400">
                AI Powered Price Intelligence
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {!isLoggedIn ? (
              <>
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-purple-500 text-white font-bold"
                >
                  Login
                </button>
                <button
                  onClick={() => setShowSignupModal(true)}
                  className="px-6 py-3 rounded-xl border border-violet-500/30 text-violet-300"
                >
                  Signup
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  localStorage.removeItem('token');
                  setIsLoggedIn(false);
                }}
                className="px-5 py-2 rounded-xl bg-red-500 text-white"
              >
                Logout
              </button>
            )}
          </div>

        </div>
      </header>

      <main className="flex-grow max-w-[700px] w-full mx-auto px-4 pt-4">

        {selectedProductId !== null ? (
          detailLoading ? (
            <div className="py-20 text-center text-gray-400 text-sm">Loading product…</div>
          ) : (
            <ProductDetailView
              product={products.find((p) => p.id === selectedProductId) || products[0]}
              listings={detailListings}
              bestPrice={detailBestPrice}
              priceTrends={detailTrends}
              onBack={() => setSelectedProductId(null)}
              onSetAlertFeedback={showFeedback}
            />
          )
        ) : (
          <>
            {activeTab === 'dashboard' && (
              <DashboardView
                onSelectProduct={(id) => setSelectedProductId(id)}
                onSearch={handleKeywordSearch}
              />
            )}

            {activeTab === 'compare' && (
              <CompareView
                onSelectProduct={(id) => setSelectedProductId(id)}
              />
            )}

            {activeTab === 'history' && (
              <HistoryView
                onSearch={handleKeywordSearch}
              />
            )}

            {activeTab === 'trends' && (
              <TrendsView
                onSelectProduct={(id) => setSelectedProductId(id)}
              />
            )}
          </>
        )}
      </main>

      {showLoginModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl shadow-2xl w-[420px] p-8">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
              <p className="text-gray-500 mt-2">Login to PricePulse</p>
            </div>

            <div className="space-y-4">
              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                onClick={handleLogin}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
              >
                Login
              </button>
              <button
                onClick={() => setShowLoginModal(false)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white text-black focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showSignupModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl shadow-2xl w-[420px] p-8">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-gray-800">Create Account</h2>
              <p className="text-gray-500 mt-2">Sign up for PricePulse</p>
            </div>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Enter Full Name"
                value={signupName}
                onChange={(e) => setSignupName(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="email"
                placeholder="Enter Email"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="password"
                placeholder="Enter Password"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                onClick={handleSignup}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition"
              >
                Create Account
              </button>
              <button
                onClick={() => setShowSignupModal(false)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white text-black focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <nav className="fixed bottom-0 left-0 right-0 py-3 bg-[#0B0B12]/95 backdrop-blur-xl border-t border-violet-500/20 shadow-lg shadow-violet-500/10 flex justify-around items-center z-40 select-none rounded-t-2xl max-w-[500px] md:max-w-[700px] mx-auto">
        {navigationTabs.map((tab) => {
          const isActive = activeTab === tab.id && selectedProductId === null;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setSelectedProductId(null);
                setActiveTab(tab.id);
              }}
              className={`px-4 py-2 rounded-xl transition-all duration-300 ${
                isActive
                  ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-violet-500/30'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
}

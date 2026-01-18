import React, { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ScrollProgressBar from './components/ScrollProgressBar';
import BackToTop from './components/BackToTop';
import SocialFloating from './components/SocialFloating';
import LoadingScreen from './components/LoadingScreen';
// import ThemeCustomizer from './components/ThemeCustomizer';
import SecretAccess from './components/SecretAccess';
import { initGA, logPageView } from './utils/analytics';

const Home = lazy(() => import('./pages/Home'));
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const ProtectedRoute = lazy(() => import('./utils/ProtectedRoute'));

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
      <p className="mt-4 text-gray-600 dark:text-gray-400 font-semibold">Loading...</p>
    </div>
  </div>
);

function App() {
  useEffect(() => {
    initGA();
    logPageView();

    // Console Hints
    const styles = {
      title: 'background: linear-gradient(90deg, #667eea, #764ba2); color: white; padding: 10px 20px; border-radius: 8px; font-size: 20px; font-weight: bold;',
      desktop: 'color: #667eea; font-size: 16px; font-weight: bold;',
      mobile: 'color: #764ba2; font-size: 16px; font-weight: bold;',
      hint: 'color: #999; font-size: 12px;'
    };

setTimeout(() => {
  console.log('%c🔐 SECRET ADMIN ACCESS! 🔐', styles.title);
  console.log('%c\n💻 DESKTOP:', styles.desktop);
  console.log('%cKonami Code: ↑ ↑ ↓ ↓ ← → ← → B A', styles.hint);
  console.log('%c\n📱 MOBILE:', styles.mobile);
  console.log('%cLong Press Logo for 3 seconds', styles.hint);
  console.log('%c(Press and hold "MD SARIF ALI" logo)', styles.hint);
}, 1000);

  }, []);

  return (
    <BrowserRouter>
      <LoadingScreen />
      <SecretAccess />
      
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
        <ScrollProgressBar />
        <Navbar />
        <SocialFloating />
        <BackToTop />
        {/* <ThemeCustomizer /> */}
        
        <div className="pt-16">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route 
                path="/admin/dashboard" 
                element={
                  <Suspense fallback={<PageLoader />}>
                    <ProtectedRoute>
                      <AdminDashboard />
                    </ProtectedRoute>
                  </Suspense>
                } 
              />
            </Routes>
          </Suspense>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;

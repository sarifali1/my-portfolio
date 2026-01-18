import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function SecretAccess() {
  const navigate = useNavigate();
  const [showAnimation, setShowAnimation] = useState(false);
  const [progress, setProgress] = useState(0);
  const [accessMethod, setAccessMethod] = useState('');
  const [longPressProgress, setLongPressProgress] = useState(0);
  const longPressTimer = useRef(null);
  const progressInterval = useRef(null);

  useEffect(() => {
    // ========== DESKTOP: KONAMI CODE ==========
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;
    let konamiTimer = null;

    const handleKeyDown = (e) => {
      const key = e.key;

      if (key === konamiCode[konamiIndex]) {
        konamiIndex++;
        setProgress((konamiIndex / konamiCode.length) * 100);
        playBeep(200 + konamiIndex * 50, 50);

        if (konamiTimer) clearTimeout(konamiTimer);
        konamiTimer = setTimeout(() => {
          konamiIndex = 0;
          setProgress(0);
        }, 3000);

        if (konamiIndex === konamiCode.length) {
          setAccessMethod('konami');
          activateAccess();
          konamiIndex = 0;
          if (konamiTimer) clearTimeout(konamiTimer);
        }
      } else {
        konamiIndex = 0;
        setProgress(0);
        if (konamiTimer) clearTimeout(konamiTimer);
      }
    };

    const activateAccess = () => {
      setShowAnimation(true);
      setProgress(100);
      playBeep(800, 200);
      setTimeout(() => playBeep(1000, 300), 200);

      if (navigator.vibrate) {
        navigator.vibrate([100, 50, 100, 50, 200]);
      }

      setTimeout(() => {
        navigate('/admin/login');
        setShowAnimation(false);
        setProgress(0);
      }, 2000);
    };

    const playBeep = (frequency, duration) => {
      try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.value = frequency;
        oscillator.type = 'sine';

        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration / 1000);
      } catch (e) {
        // Silent fail
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (konamiTimer) clearTimeout(konamiTimer);
    };
  }, [navigate]);

  // ========== MOBILE: LOGO LONG PRESS ==========
  // This will be called from Navbar component
  useEffect(() => {
    // Create global function for Navbar to trigger
    window.startAdminLongPress = () => {
      let progress = 0;

      progressInterval.current = setInterval(() => {
        progress += 3.33; // 100% in 3 seconds (100/30 = 3.33)
        setLongPressProgress(progress);

        if (progress >= 100) {
          clearInterval(progressInterval.current);
          setAccessMethod('longpress');
          activateAccess();
          setLongPressProgress(0);
        }
      }, 100);

      // Vibrate feedback
      if (navigator.vibrate) {
        navigator.vibrate(30);
      }
    };

    window.stopAdminLongPress = () => {
      clearInterval(progressInterval.current);
      setLongPressProgress(0);
    };

    const activateAccess = () => {
      setShowAnimation(true);

      if (navigator.vibrate) {
        navigator.vibrate([100, 50, 100, 50, 200]);
      }

      setTimeout(() => {
        navigate('/admin/login');
        setShowAnimation(false);
      }, 2000);
    };

    return () => {
      clearInterval(progressInterval.current);
    };
  }, [navigate]);

  return (
    <>
      {/* Desktop Progress Bar */}
      <AnimatePresence>
        {progress > 0 && progress < 100 && !showAnimation && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-0 left-0 right-0 h-2 bg-gray-200 dark:bg-gray-800 z-50 shadow-lg"
          >
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Long Press Indicator */}
      <AnimatePresence>
        {longPressProgress > 0 && !showAnimation && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[9999]"
          >
            <svg className="w-32 h-32 transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="60"
                stroke="#e5e7eb"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="64"
                cy="64"
                r="60"
                stroke="url(#gradient)"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 60}`}
                strokeDashoffset={`${2 * Math.PI * 60 * (1 - longPressProgress / 100)}`}
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#667eea" />
                  <stop offset="100%" stopColor="#764ba2" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl mb-2">🔓</div>
                <div className="text-2xl font-bold text-blue-600">
                  {Math.round(longPressProgress)}%
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Animation */}
      <AnimatePresence>
        {showAnimation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
            style={{
              background: 'linear-gradient(45deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
              backgroundSize: '400% 400%'
            }}
          >
            <motion.div
              className="absolute inset-0"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{
                background: 'linear-gradient(45deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
                backgroundSize: '400% 400%'
              }}
            />

            <div className="relative z-10 text-center px-4">
              <motion.div
                animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                transition={{
                  rotate: { duration: 2, repeat: Infinity, ease: 'linear' },
                  scale: { duration: 1, repeat: Infinity }
                }}
                className="text-7xl md:text-9xl mb-8"
              >
                {accessMethod === 'konami' ? '🎮' : '📱'}
              </motion.div>

              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 200,
                  damping: 15,
                  delay: 0.2
                }}
              >
                <h1 className="text-4xl md:text-7xl font-bold text-white mb-4 drop-shadow-2xl">
                  {accessMethod === 'konami' ? '🎮 KONAMI CODE 🎮' : '📱 LONG PRESS 📱'}
                </h1>
                <h2 className="text-2xl md:text-5xl font-bold text-white mb-6 drop-shadow-xl">
                  ACTIVATED!
                </h2>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-lg md:text-2xl text-white opacity-90 font-semibold"
                >
                  🔓 Admin Access Granted...
                </motion.p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-8"
              >
                <div className="w-12 h-12 md:w-16 md:h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
              </motion.div>
            </div>

            {/* Particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(30)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute bg-white rounded-full"
                  style={{
                    width: Math.random() * 8 + 4 + 'px',
                    height: Math.random() * 8 + 4 + 'px'
                  }}
                  initial={{ x: '50vw', y: '50vh', scale: 0, opacity: 0 }}
                  animate={{
                    x: Math.random() * window.innerWidth,
                    y: Math.random() * window.innerHeight,
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 2,
                    delay: Math.random() * 0.5,
                    ease: 'easeOut'
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

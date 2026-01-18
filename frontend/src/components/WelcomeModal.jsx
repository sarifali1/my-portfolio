import { useState, useEffect } from 'react';

export default function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisited');
    if (!hasVisited) {
      setTimeout(() => setIsOpen(true), 2500);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem('hasVisited', 'true');
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-8 transform animate-[scale-in_0.3s_ease-out]">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-white text-3xl font-bold">👋</span>
          </div>
          <h2 className="text-3xl font-bold mb-4 dark:text-white">Welcome!</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Thanks for visiting my portfolio. Feel free to explore my projects, skills, and get in touch!
          </p>
          <button
            onClick={handleClose}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            Let's Explore
          </button>
        </div>
      </div>
    </div>
  );
}

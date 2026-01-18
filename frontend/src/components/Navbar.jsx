import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DarkModeToggle from './DarkModeToggle';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  const menuItems = [
    { name: 'Home', href: '#home' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = menuItems.map(item => item.href.substring(1));
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ========== ADMIN ACCESS: LONG PRESS ==========
  const handleLogoPress = () => {
    if (window.startAdminLongPress) {
      window.startAdminLongPress();
    }
  };

  const handleLogoRelease = () => {
    if (window.stopAdminLongPress) {
      window.stopAdminLongPress();
    }
  };

  return (
    <nav className={`fixed w-full z-40 transition-all duration-300 ${
      scrolled 
        ? 'bg-white dark:bg-gray-900 shadow-lg' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo with Profile Photo & Long Press Admin Access */}
          <div
            className="flex items-center gap-2.5 cursor-pointer select-none"
            onTouchStart={handleLogoPress}
            onTouchEnd={handleLogoRelease}
            onMouseDown={handleLogoPress}
            onMouseUp={handleLogoRelease}
            onMouseLeave={handleLogoRelease}
            style={{ touchAction: 'manipulation' }}
          >
            {/* Profile Photo - Small & Clean */}
            <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-blue-500 shadow-md hover:border-purple-500 hover:shadow-lg hover:scale-110 transition-all duration-300">
              <img 
                src="/profile.jpg" 
                alt="Sarif Ali" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = `
                    <div class="w-full h-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                      <span class="text-white text-xs font-bold">S</span>
                    </div>
                  `;
                }}
              />
            </div>

            {/* Logo Text */}
            <Link 
              to="/" 
              className="text-2xl font-bold"
              onClick={(e) => {
                if (window.isLongPressing) {
                  e.preventDefault();
                }
              }}
            >
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-purple-600 hover:to-blue-600 transition-all duration-300">
                mdsarifali.com
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`relative py-2 transition-colors duration-300 ${
                  activeSection === item.href.substring(1)
                    ? 'text-blue-600 dark:text-blue-400 font-semibold'
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
              >
                {item.name}
                {activeSection === item.href.substring(1) && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 animate-[slideIn_0.3s_ease-out]"></span>
                )}
              </a>
            ))}
            <DarkModeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <DarkModeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 dark:text-gray-300 focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 animate-[slideDown_0.3s_ease-out]">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`block py-3 px-4 rounded-lg transition-colors ${
                  activeSection === item.href.substring(1)
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 font-semibold'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {item.name}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}

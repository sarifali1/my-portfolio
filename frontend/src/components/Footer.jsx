import { FaLinkedin, FaGithub, FaTwitter, FaEnvelope, FaHeart } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' }
  ];

  const socials = [
    { icon: <FaLinkedin />, url: 'https://linkedin.com/in/yourusername', color: 'hover:text-blue-600' },
    { icon: <FaGithub />, url: 'https://github.com/sarifali1', color: 'hover:text-gray-600' },
    { icon: <FaTwitter />, url: 'https://twitter.com/yourusername', color: 'hover:text-sky-500' },
    { icon: <FaEnvelope />, url: 'mailto:msa2441139@gmail.com', color: 'hover:text-red-600' }
  ];

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              MD SARIF ALI
            </h3>
            <p className="text-gray-400 mb-4">
              MERN Stack Developer passionate about creating beautiful and functional web applications.
            </p>
            <div className="flex gap-4">
              {socials.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-2xl text-gray-400 ${social.color} transition-colors duration-300`}
                  aria-label="Social media link"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Get In Touch</h4>
            <div className="space-y-2 text-gray-400">
              <p>Email: msa2441139@gmail.com</p>
              <p>Location: West Bengal, India</p>
              <p>Available for freelance work</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p className="flex items-center justify-center gap-2">
            Made with <FaHeart className="text-red-500 animate-pulse" /> by MD SARIF ALI
          </p>
          <p className="mt-2">
            &copy; {currentYear} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

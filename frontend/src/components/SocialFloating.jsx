import { FaLinkedin, FaGithub, FaTwitter, FaEnvelope } from 'react-icons/fa';

export default function SocialFloating() {
  const socials = [
    {
      name: 'LinkedIn',
      icon: <FaLinkedin />,
      url: 'https://linkedin.com/in/yourusername',
      color: 'hover:bg-blue-600'
    },
    {
      name: 'GitHub',
      icon: <FaGithub />,
      url: 'https://github.com/yourusername',
      color: 'hover:bg-gray-800'
    },
    {
      name: 'Twitter',
      icon: <FaTwitter />,
      url: 'https://twitter.com/yourusername',
      color: 'hover:bg-sky-500'
    },
    {
      name: 'Email',
      icon: <FaEnvelope />,
      url: 'mailto:your.email@example.com',
      color: 'hover:bg-red-600'
    }
  ];

  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
      <div className="flex flex-col gap-4">
        {socials.map((social, index) => (
          <a
            key={index}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`bg-gray-800 dark:bg-gray-700 text-white p-3 rounded-full shadow-lg ${social.color} transform hover:scale-110 transition-all duration-300`}
            aria-label={social.name}
          >
            <div className="text-xl">{social.icon}</div>
          </a>
        ))}
      </div>
    </div>
  );
}

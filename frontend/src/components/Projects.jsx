import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaGithub, FaExternalLinkAlt, FaCode } from 'react-icons/fa';
import { useState } from 'react';

export default function Projects() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      title: "E-Commerce Platform",
      description: "Full-stack MERN e-commerce with payment integration, admin dashboard, and real-time inventory management.",
      image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800",
      tech: ["React", "Node.js", "MongoDB", "Stripe"],
      github: "https://github.com/yourusername/project1",
      demo: "https://demo-link.com",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      title: "Task Management App",
      description: "Collaborative task management tool with drag-and-drop, real-time updates, and team collaboration features.",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800",
      tech: ["React", "Express", "Socket.io", "PostgreSQL"],
      github: "https://github.com/yourusername/project2",
      demo: "https://demo-link.com",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      title: "Social Media Dashboard",
      description: "Analytics dashboard for social media metrics with data visualization and automated reporting.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
      tech: ["React", "Node.js", "Chart.js", "MongoDB"],
      github: "https://github.com/yourusername/project3",
      demo: "https://demo-link.com",
      gradient: "from-green-500 to-teal-500"
    },
    {
      title: "Blog Platform",
      description: "Modern blogging platform with rich text editor, comments system, and SEO optimization.",
      image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800",
      tech: ["React", "Express", "MongoDB", "AWS S3"],
      github: "https://github.com/yourusername/project4",
      demo: "https://demo-link.com",
      gradient: "from-orange-500 to-red-500"
    },
    {
      title: "Real Estate Portal",
      description: "Property listing platform with advanced search, virtual tours, and agent management system.",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800",
      tech: ["React", "Node.js", "MongoDB", "Google Maps API"],
      github: "https://github.com/yourusername/project5",
      demo: "https://demo-link.com",
      gradient: "from-indigo-500 to-purple-500"
    },
    {
      title: "Weather Forecast App",
      description: "Real-time weather application with location-based forecasts and interactive maps.",
      image: "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800",
      tech: ["React", "OpenWeather API", "Tailwind CSS"],
      github: "https://github.com/yourusername/project6",
      demo: "https://demo-link.com",
      gradient: "from-sky-500 to-blue-500"
    }
  ];

  return (
    <section id="projects" ref={ref} className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Some of my recent work and personal projects
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="relative h-48 overflow-hidden cursor-pointer" onClick={() => setSelectedProject(project)}>
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-90 transition-opacity duration-300 flex items-center justify-center`}>
                  <span className="text-white text-lg font-semibold">View Details</span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 dark:text-white group-hover:text-blue-600 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-3 py-1 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    <FaGithub /> Code
                  </a>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    <FaExternalLinkAlt /> Demo
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedProject(null)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-96 object-cover" />
            <div className="p-8">
              <h3 className="text-3xl font-bold mb-4 dark:text-white">{selectedProject.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{selectedProject.description}</p>
              <div className="flex flex-wrap gap-2">
                {selectedProject.tech.map((tech, i) => (
                  <span key={i} className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-4 py-2 rounded-full">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}

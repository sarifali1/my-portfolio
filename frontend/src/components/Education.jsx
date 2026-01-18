import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaGraduationCap, FaCalendar, FaMapMarkerAlt } from 'react-icons/fa';

export default function Education() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const education = [
    {
      degree: "Master of Computer Applications (MCA)",
      institution: "Brainware University",
      location: "Barasat, West Bengal",
      duration: "2024 - 2026",
      description: "Specialized in Full Stack Web Development, Data Structures, and Cloud Computing.",
      grade: "CGPA: 8.5/10",
      icon: "🎓"
    },
    {
      degree: "Bachelor of Computer Applications (BCA)",
      institution: "Murshidabad College of Engineering & Technology",
      location: "Murshidabad, West Bengal",
      duration: "2021 - 2024",
      description: "Focused on Programming Fundamentals, Database Management, and Software Engineering.",
      grade: "CGPA: 8.2/10",
      icon: "📚"
    },
    {
      degree: "Higher Secondary Education",
      institution: "Bhagawangola High School",
      location: "Bhagawangola, West Bengal",
      duration: "2020 - 2021",
      description: "Science stream with Computer Science, Mathematics, and Physics.",
      grade: "Percentage: 85%",
      icon: "🏫"
    }
  ];

  return (
    <section id="education" ref={ref} className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Education
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            My academic journey and qualifications
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500"></div>

          <div className="space-y-12">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative pl-20"
              >
                {/* Timeline Dot */}
                <div className="absolute left-4 top-4 w-9 h-9 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg transform -translate-x-1/2 z-10">
                  {edu.icon}
                </div>

                {/* Card */}
                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold dark:text-white mb-1">{edu.degree}</h3>
                      <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold mb-2">
                        <FaGraduationCap />
                        {edu.institution}
                      </div>
                    </div>
                    <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap">
                      {edu.grade}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                    <div className="flex items-center gap-1">
                      <FaCalendar />
                      {edu.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <FaMapMarkerAlt />
                      {edu.location}
                    </div>
                  </div>

                  <p className="text-gray-700 dark:text-gray-300">{edu.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

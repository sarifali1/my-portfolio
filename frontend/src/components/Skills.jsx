import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaReact, FaNodeJs, FaDatabase, FaGitAlt, FaDocker, FaAws } from 'react-icons/fa';
import { SiMongodb, SiExpress, SiTailwindcss, SiJavascript, SiTypescript, SiPostgresql } from 'react-icons/si';

export default function Skills() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const skillCategories = [
    {
      title: 'Frontend',
      skills: [
        { name: 'React.js', level: 90, icon: <FaReact className="text-cyan-500" /> },
        { name: 'JavaScript', level: 85, icon: <SiJavascript className="text-yellow-500" /> },
        { name: 'TypeScript', level: 75, icon: <SiTypescript className="text-blue-600" /> },
        { name: 'Tailwind CSS', level: 88, icon: <SiTailwindcss className="text-cyan-400" /> }
      ]
    },
    {
      title: 'Backend',
      skills: [
        { name: 'Node.js', level: 87, icon: <FaNodeJs className="text-green-600" /> },
        { name: 'Express.js', level: 85, icon: <SiExpress className="text-gray-700" /> },
        { name: 'REST APIs', level: 90, icon: <FaNodeJs className="text-green-500" /> },
        { name: 'JWT Auth', level: 82, icon: <FaNodeJs className="text-orange-500" /> }
      ]
    },
    {
      title: 'Database',
      skills: [
        { name: 'MongoDB', level: 88, icon: <SiMongodb className="text-green-500" /> },
        { name: 'PostgreSQL', level: 75, icon: <SiPostgresql className="text-blue-700" /> },
        { name: 'Mongoose ODM', level: 85, icon: <FaDatabase className="text-green-600" /> }
      ]
    },
    {
      title: 'Tools & Others',
      skills: [
        { name: 'Git & GitHub', level: 90, icon: <FaGitAlt className="text-orange-600" /> },
        { name: 'Docker', level: 70, icon: <FaDocker className="text-blue-500" /> },
        { name: 'AWS', level: 65, icon: <FaAws className="text-orange-400" /> }
      ]
    }
  ];

  const ProgressBar = ({ level, delay }) => (
    <motion.div
      className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full relative overflow-hidden"
      initial={{ width: 0 }}
      animate={inView ? { width: `${level}%` } : { width: 0 }}
      transition={{ duration: 1, delay, ease: "easeOut" }}
    >
      <div className="absolute inset-0 bg-white opacity-20 animate-pulse"></div>
    </motion.div>
  );

  return (
    <section id="skills" ref={ref} className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Technical Skills
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Technologies and tools I work with
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, x: categoryIndex % 2 === 0 ? -50 : 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <h3 className="text-2xl font-bold mb-6 dark:text-white flex items-center gap-2">
                <span className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></span>
                {category.title}
              </h3>

              <div className="space-y-6">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{skill.icon}</span>
                        <span className="font-semibold dark:text-white">{skill.name}</span>
                      </div>
                      <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <ProgressBar level={skill.level} delay={categoryIndex * 0.1 + skillIndex * 0.1} />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

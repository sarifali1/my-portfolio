import { useEffect, useState, useRef } from 'react';

export default function AchievementCounter() {
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef(null);

  const achievements = [
    { number: 50, label: 'Projects Completed', suffix: '+' },
    { number: 100, label: 'GitHub Commits', suffix: '+' },
    { number: 20, label: 'Technologies Mastered', suffix: '+' },
    { number: 95, label: 'Client Satisfaction', suffix: '%' }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const Counter = ({ end, duration = 2000, suffix = '' }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!isVisible) return;

      let startTime;
      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const progress = (currentTime - startTime) / duration;

        if (progress < 1) {
          setCount(Math.floor(end * progress));
          requestAnimationFrame(animate);
        } else {
          setCount(end);
        }
      };

      requestAnimationFrame(animate);
    }, [isVisible, end, duration]);

    return <span>{count}{suffix}</span>;
  };

  return (
    <section ref={counterRef} className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {achievements.map((achievement, index) => (
            <div key={index} className="text-center text-white">
              <div className="text-5xl font-bold mb-2">
                <Counter end={achievement.number} suffix={achievement.suffix} />
              </div>
              <div className="text-lg opacity-90">{achievement.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

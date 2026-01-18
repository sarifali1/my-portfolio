import { lazy, Suspense } from 'react';

const Hero = lazy(() => import('../components/Hero'));
const Skills = lazy(() => import('../components/Skills'));
const Projects = lazy(() => import('../components/Projects'));
const AchievementCounter = lazy(() => import('../components/AchievementCounter'));
const Education = lazy(() => import('../components/Education'));
const Contact = lazy(() => import('../components/Contact'));
const Footer = lazy(() => import('../components/Footer'));
const WelcomeModal = lazy(() => import('../components/WelcomeModal'));

const SectionLoader = () => (
  <div className="py-20 flex justify-center">
    <div className="flex gap-2">
      <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce"></div>
      <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
      <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
    </div>
  </div>
);

export default function Home() {
  return (
    <>
      <Suspense fallback={<SectionLoader />}>
        <WelcomeModal />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <Hero />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <Skills />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <Projects />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <AchievementCounter />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <Education />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <Contact />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <Footer />
      </Suspense>
    </>
  );
}

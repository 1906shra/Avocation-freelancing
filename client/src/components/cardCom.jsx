import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import bg21 from '../assets/bg21.jpeg';

const categories = [
  { title: 'Development & IT', content: 'Web dev, app dev, software engineering, etc.' },
  { title: 'Design & Creative', content: 'Graphic design, UX/UI, video editing, etc.' },
  { title: 'Sales & Marketing', content: 'SEO, social media, lead generation, etc.' },
  { title: 'Writing & Translation', content: 'Content writing, translation, copywriting, etc.' },
  { title: 'Admin & Customer Support', content: 'Virtual assistants, tech support, etc.' },
  { title: 'Finance & Accounting', content: 'Bookkeeping, tax help, financial consulting, etc.' },
  { title: 'Engineering & Architecture', content: 'CAD, civil/mechanical engineering, etc.' },
  { title: 'Legal', content: 'Legal advice, contracts, compliance, etc.' },
];

export default function CategoryCardsOverlay() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <div ref={ref} className="relative w-full h-screen overflow-hidden">
      {/* Background Image */}
      <img src={bg21} alt="Background" className="w-full h-full object-cover scale-105 blur-sm" />
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 z-10">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-4xl font-bold text-white text-center mb-2"
        >
          Explore Top Freelance Categories
        </motion.h2>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-white/90 text-center mb-8 max-w-2xl text-sm sm:text-base"
        >
          Find experts across design, development, marketing, and more — ready to elevate your project.
        </motion.p>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl w-full">
          {categories.map((cat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="group relative overflow-hidden backdrop-blur-md bg-white/10 border border-white/20 hover:border-blue-400 hover:ring-2 hover:ring-blue-300/40 rounded-2xl p-5 shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              {/* Soft overlay on hover */}
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-10 transition duration-300 rounded-2xl pointer-events-none" />

              <h3 className="text-lg font-semibold text-white mb-2 transition-transform group-hover:translate-y-[-2px]">
                {cat.title}
              </h3>
              <p className="text-sm text-gray-200 transition-opacity duration-300 group-hover:opacity-90">
                {cat.content}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

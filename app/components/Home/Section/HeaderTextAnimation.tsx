'use client'

import React from 'react';
import { motion } from 'framer-motion';

export default function HeaderTextAnimation({ children }: { children: React.ReactNode }) {

  const text = typeof children === 'string' ? children : '';


  const words = text.split(' ');

  // Variants for container
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 },
    },
  };

  // Variants for each word
  const child = {
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      x: 30,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      style={{ overflow: 'hidden', display: 'flex', fontSize: '2rem' }}
      variants={container}
      initial="hidden"
      animate="visible"
      className="sm:text-6xl text-3xl bg-gradient-to-b from-slate-50 via-slate-200 to-slate-400 text-transparent bg-clip-text"
    >
      {words.map((word, index) => (
        <motion.span
          variants={child}
          style={{ marginRight: '5px' }}
          key={index}
          className="sm:text-6xl text-3xl bg-gradient-to-b from-slate-50 via-slate-200 to-slate-400 text-transparent bg-clip-text"
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};


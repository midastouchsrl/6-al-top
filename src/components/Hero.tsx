"use client";

import { motion } from "framer-motion";
import { ArrowDown, MapPin, Star } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center blur-[2px]"
          style={{
            backgroundImage: `url('/hero-bg.png')`,
            transform: 'scale(1.02)',
          }}
        />
        <div className="absolute inset-0 bg-neutral-950/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-neutral-50 dark:to-neutral-950" />
        <div className="absolute inset-0 bg-grid opacity-30" />
      </div>

      {/* Floating badges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute top-32 left-8 md:left-16 hidden md:flex items-center gap-2 px-4 py-2 bg-black/10 dark:bg-white/10 backdrop-blur-md rounded-full border border-black/10 dark:border-white/10"
      >
        <MapPin className="w-4 h-4 text-gold-500 dark:text-gold-400" />
        <span className="text-sm text-white/80">Rome, Italy</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute top-32 right-8 md:right-16 hidden md:flex items-center gap-2 px-4 py-2 bg-black/10 dark:bg-white/10 backdrop-blur-md rounded-full border border-black/10 dark:border-white/10"
      >
        <Star className="w-4 h-4 text-gold-500 dark:text-gold-400 fill-gold-500 dark:fill-gold-400" />
        <span className="text-sm text-white/80">5.0 Rating</span>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 text-center container-custom">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="heading-hero text-white mb-8"
        >
          Live Above
          <br />
          <span className="text-gradient">The Eternal City</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-white/70 max-w-xl mx-auto mb-12 font-light leading-relaxed"
        >
          A designer suite on the 6th floor with panoramic views, steps from
          Rome&apos;s iconic landmarks
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a href="#apartment" className="btn-primary">
            Explore
          </a>
          <a href="#contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/30 text-white backdrop-blur-sm font-medium text-sm tracking-wide rounded-full transition-all duration-300 ease-out hover:bg-white/10 hover:border-white/50">
            Book Your Stay
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 grid grid-cols-3 gap-8 max-w-md mx-auto"
        >
          {[
            { value: "6th", label: "Floor" },
            { value: "2min", label: "to Termini" },
            { value: "4.9", label: "Guest Rating", showStar: true },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl md:text-3xl font-display font-semibold text-white flex items-center justify-center gap-1">
                {stat.value}
                {stat.showStar && <Star className="w-5 h-5 md:w-6 md:h-6 text-gold-500 dark:text-gold-400 fill-gold-500 dark:fill-gold-400" />}
              </div>
              <div className="text-sm text-white/50 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.a
          href="#apartment"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-12 inline-flex flex-col items-center gap-2 text-white/50 hover:text-gold-500 dark:hover:text-gold-400 transition-colors cursor-pointer"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowDown className="w-7 h-7" />
          </motion.div>
        </motion.a>
      </div>
    </section>
  );
}

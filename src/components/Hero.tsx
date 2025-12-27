"use client";

import { motion } from "framer-motion";
import { ArrowDown, Star } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Hero() {
  const t = useTranslations("Hero");

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-start justify-center pt-[20vh] overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center blur-[2px]"
          style={{
            backgroundImage: `url('/hero-bg.webp')`,
            transform: 'scale(1.02)',
          }}
        />
        <div className="absolute inset-0 bg-neutral-950/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent from-60% via-neutral-50/50 via-80% to-neutral-50 dark:via-neutral-950/50 dark:to-neutral-950" />
        <div className="absolute inset-0 bg-grid opacity-30" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center container-custom">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="heading-hero text-white mb-8"
        >
          {t("title.line1")}
          <br />
          <span className="text-gradient">{t("title.line2")}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-white/70 max-w-xl mx-auto mb-12 font-light leading-relaxed"
        >
          {t("subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a href="#apartment" className="btn-primary">
            {t("buttons.explore")}
          </a>
          <a href="#contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/30 text-white backdrop-blur-sm font-medium text-sm tracking-wide rounded-full transition-all duration-300 ease-out hover:bg-white/10 hover:border-white/50">
            {t("buttons.book")}
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
            { value: t("stats.floorValue"), label: t("stats.floor") },
            { value: "2min", label: t("stats.toTermini") },
            { value: "9.8", label: t("stats.guestRating"), showStar: true },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl md:text-3xl font-display font-semibold text-white flex items-center justify-center gap-1">
                {stat.value}
                {stat.showStar && <Star className="w-5 h-5 md:w-6 md:h-6 text-[#D4B896] fill-[#D4B896]" />}
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
          className="mt-6 inline-flex flex-col items-center gap-2 text-white/50 hover:text-gold-500 dark:hover:text-gold-400 transition-colors cursor-pointer"
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

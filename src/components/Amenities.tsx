"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Waves,
  Tv,
  Flame,
  Wind,
  Coffee,
  Wifi,
  ShowerHead,
  Sparkles,
} from "lucide-react";
import { useTranslations } from "next-intl";

const amenityConfig = [
  { key: "jacuzzi", icon: Waves },
  { key: "shower", icon: ShowerHead },
  { key: "tv", icon: Tv },
  { key: "fireplace", icon: Flame },
  { key: "climate", icon: Wind },
  { key: "kitchen", icon: Coffee },
  { key: "wifi", icon: Wifi },
  { key: "linens", icon: Sparkles },
] as const;

export default function Amenities() {
  const t = useTranslations("Amenities");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="amenities" className="section-padding bg-neutral-100 dark:bg-neutral-900/50 relative overflow-hidden transition-colors duration-300">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gold-500/5 dark:from-gold-400/5 to-transparent pointer-events-none" />

      <div className="container-custom relative">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20 max-w-2xl mx-auto"
        >
          <span className="text-label mb-4 block">{t("label")}</span>
          <h2 className="heading-section text-neutral-950 dark:text-white mb-6">
            {t("title.line1")} <span className="text-gradient">{t("title.line2")}</span>
          </h2>
          <p className="text-neutral-600 dark:text-white/60">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {amenityConfig.map((amenity, index) => (
            <motion.div
              key={amenity.key}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group card-glass p-6 md:p-8 hover:bg-neutral-200/50 dark:hover:bg-white/[0.06] transition-all duration-500"
            >
              <div className="w-12 h-12 rounded-2xl bg-gold-500/10 dark:bg-gold-400/10 flex items-center justify-center mb-5 group-hover:bg-gold-500/20 dark:group-hover:bg-gold-400/20 transition-colors duration-500">
                <amenity.icon className="w-6 h-6 text-gold-500 dark:text-gold-400" />
              </div>
              <h3 className="text-lg font-display font-semibold text-neutral-950 dark:text-white mb-2">
                {t(`items.${amenity.key}.title`)}
              </h3>
              <p className="text-sm text-neutral-500 dark:text-white/50 leading-relaxed">
                {t(`items.${amenity.key}.description`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

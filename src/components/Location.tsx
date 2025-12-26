"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Train, Clock, Utensils, Navigation } from "lucide-react";
import { useTranslations } from "next-intl";

const highlightConfig = [
  { key: "termini", icon: Train },
  { key: "colosseum", icon: Clock },
  { key: "vatican", icon: Navigation },
  { key: "restaurants", icon: Utensils },
] as const;

export default function Location() {
  const t = useTranslations("Location");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="location" className="section-padding bg-neutral-100 dark:bg-neutral-900/50 overflow-hidden transition-colors duration-300">
      <div className="container-custom">
        <div ref={ref} className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-label mb-4 block">{t("label")}</span>
            <h2 className="heading-section text-neutral-950 dark:text-white mb-6">
              {t("title.line1")}
              <br />
              <span className="text-gradient">{t("title.line2")}</span>
            </h2>

            <p className="text-neutral-600 dark:text-white/60 leading-relaxed mb-8 text-lg">
              {t("description")}
            </p>

            {/* Highlights Grid */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              {highlightConfig.map((item, index) => (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="card-glass p-4 flex items-center gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-gold-500/10 dark:bg-gold-400/10 flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-gold-500 dark:text-gold-400" />
                  </div>
                  <div>
                    <div className="text-neutral-950 dark:text-white font-medium text-sm">
                      {t(`highlights.${item.key}.title`)}
                    </div>
                    <div className="text-neutral-500 dark:text-white/50 text-xs">
                      {t(`highlights.${item.key}.subtitle`)}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Address Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="card-glass p-6 flex items-start gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-gold-500/10 dark:bg-gold-400/10 flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6 text-gold-500 dark:text-gold-400" />
              </div>
              <div>
                <div className="text-neutral-950 dark:text-white font-medium mb-1">{t("address.label")}</div>
                <div className="text-neutral-600 dark:text-white/60">{t("address.street")}</div>
                <div className="text-neutral-600 dark:text-white/60">{t("address.city")}</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="aspect-square lg:aspect-[4/5] rounded-3xl overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2969.8095847089387!2d12.498833!3d41.9035!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x132f61a5cf9548e5%3A0x8d5c7a8e9a4e8a0!2sVia%20Milazzo%2C%2014%2C%2000185%20Roma%20RM%2C%20Italy!5e0!3m2!1sen!2sus!4v1703000000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                className="grayscale dark:invert dark:contrast-[0.9]"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="6 Al Top Location"
              />
            </div>
            {/* Glow effect */}
            <div className="absolute -z-10 bottom-10 right-10 w-72 h-72 bg-gold-500/10 dark:bg-gold-400/10 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

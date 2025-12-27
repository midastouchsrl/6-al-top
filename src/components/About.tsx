"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function About() {
  const t = useTranslations("About");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="apartment" className="pt-8 md:pt-10 lg:pt-12 pb-24 md:pb-32 lg:pb-40 bg-neutral-50 dark:bg-neutral-950 overflow-hidden transition-colors duration-300">
      <div className="container-custom">
        <div ref={ref} className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
              <Image
                src="/515D515A-64F6-4CCB-B276-9B5A22456365.jpeg"
                alt="6 Al Top Luxury Interior"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-50/40 dark:from-neutral-950/40 to-transparent" />
            </div>

            {/* Decorative element */}
            <div className="absolute -z-10 top-10 -left-10 w-72 h-72 bg-gold-500/10 dark:bg-gold-400/10 rounded-full blur-3xl" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-label mb-4 block">{t("label")}</span>
            <h2 className="heading-section text-neutral-950 dark:text-white mb-6">
              {t("title.line1")}
              <br />
              <span className="text-gradient">{t("title.line2")}</span>
            </h2>

            <p className="text-neutral-600 dark:text-white/60 leading-relaxed mb-6 text-lg">
              {t("description1")}
            </p>

            <p className="text-neutral-600 dark:text-white/60 leading-relaxed mb-10">
              {t("description2")}
            </p>

            <a href="#gallery" className="btn-primary">
              {t("button")}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

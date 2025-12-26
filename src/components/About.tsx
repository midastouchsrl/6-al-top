"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Check } from "lucide-react";

const features = [
  "Designer furnishings throughout",
  "Floor-to-ceiling windows",
  "Smart home technology",
  "Premium sound system",
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="apartment" className="section-padding bg-neutral-50 dark:bg-neutral-950 overflow-hidden transition-colors duration-300">
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
                src="/IMG_0857.jpeg"
                alt="6 Al Top Luxury Interior"
                fill
                className="object-cover"
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
            <span className="text-label mb-4 block">The Experience</span>
            <h2 className="heading-section text-neutral-950 dark:text-white mb-6">
              Refined Living in the
              <br />
              <span className="text-gradient">Heart of Rome</span>
            </h2>

            <p className="text-neutral-600 dark:text-white/60 leading-relaxed mb-6 text-lg">
              6 Al Top is more than accommodation—it&apos;s an immersive experience.
              Our meticulously designed retreat combines contemporary luxury with
              authentic Roman character.
            </p>

            <p className="text-neutral-600 dark:text-white/60 leading-relaxed mb-10">
              Every element has been thoughtfully curated: from the custom Italian
              furnishings to the state-of-the-art amenities, creating a space that
              feels both sophisticated and welcoming.
            </p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              {features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-gold-500/20 dark:bg-gold-400/20 flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 text-gold-500 dark:text-gold-400" />
                  </div>
                  <span className="text-sm text-neutral-600 dark:text-white/70">{feature}</span>
                </motion.div>
              ))}
            </div>

            <a href="#gallery" className="btn-primary">
              View Gallery
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

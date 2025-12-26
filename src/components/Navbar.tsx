"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Menu, X, ArrowRight, Sun, Moon, Globe } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";

const navLinkKeys = ["home", "apartment", "amenities", "gallery", "location"] as const;

export default function Navbar() {
  const t = useTranslations("Navbar");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleLocale = () => {
    const newLocale = locale === "it" ? "en" : "it";
    // Get current path without locale prefix
    const pathWithoutLocale = pathname.replace(/^\/(it|en)/, "") || "/";
    router.push(`/${newLocale}${pathWithoutLocale === "/" ? "" : pathWithoutLocale}`);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-neutral-950/80 backdrop-blur-xl py-4"
            : "bg-transparent py-6"
        }`}
      >
        <div className="container-custom">
          <nav className="flex items-center justify-between">
            <a href="#home" className="relative z-10">
              <Image
                src="/logo.png"
                alt="6 Al Top"
                width={160}
                height={96}
                className="h-16 md:h-[77px] w-auto brightness-0 invert"
                priority
              />
            </a>

            <ul className="hidden lg:flex items-center gap-10">
              {navLinkKeys.map((key) => (
                <li key={key}>
                  <a
                    href={`#${key === "apartment" ? "apartment" : key}`}
                    className="text-sm text-white/60 hover:text-white transition-colors duration-300"
                  >
                    {t(key)}
                  </a>
                </li>
              ))}
            </ul>

            <div className="hidden lg:flex items-center gap-3">
              {/* Language Toggle */}
              <button
                onClick={toggleLocale}
                className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-full bg-white/10 text-white text-sm hover:bg-white/20 transition-colors"
                aria-label="Toggle language"
              >
                <Globe className="w-4 h-4" />
                <span className="uppercase font-medium">{locale === "it" ? "EN" : "IT"}</span>
              </button>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-sm font-medium text-neutral-950 bg-white dark:bg-white px-6 py-3 rounded-full hover:bg-gold-400 dark:hover:bg-gold-400 transition-colors duration-300"
              >
                {t("bookNow")}
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div className="flex items-center gap-2">
              {/* Mobile Language Toggle */}
              <button
                onClick={toggleLocale}
                className="lg:hidden flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-full bg-white/10 text-white text-xs hover:bg-white/20 transition-colors"
                aria-label="Toggle language"
              >
                <Globe className="w-3.5 h-3.5" />
                <span className="uppercase font-medium">{locale === "it" ? "EN" : "IT"}</span>
              </button>

              <button
                onClick={toggleTheme}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden relative z-10 p-2 text-white"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-neutral-950/95 backdrop-blur-xl"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-neutral-900/95 p-8 pt-28"
            >
              <ul className="space-y-2">
                {navLinkKeys.map((key, index) => (
                  <motion.li
                    key={key}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.08 }}
                  >
                    <a
                      href={`#${key === "apartment" ? "apartment" : key}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block py-4 text-2xl font-display font-medium text-white/80 hover:text-gold-400 transition-colors border-b border-white/5"
                    >
                      {t(key)}
                    </a>
                  </motion.li>
                ))}
              </ul>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-10"
              >
                <a
                  href="#contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="btn-primary w-full text-center"
                >
                  {t("bookNow")}
                </a>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

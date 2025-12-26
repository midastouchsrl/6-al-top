"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";

const navLinkKeys = ["home", "apartment", "amenities", "gallery", "location"] as const;

export default function Footer() {
  const t = useTranslations("Footer");
  const tNav = useTranslations("Navbar");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-100 dark:bg-neutral-900/50 border-t border-neutral-200 dark:border-white/5 transition-colors duration-300">
      <div className="container-custom py-16">
        <div className="grid md:grid-cols-3 gap-12 items-start">
          {/* Logo & Description */}
          <div>
            <Image
              src="/logo.png"
              alt="6 Al Top"
              width={160}
              height={96}
              className="h-[77px] w-auto dark:brightness-0 dark:invert mb-4"
            />
            <p className="text-neutral-500 dark:text-white/50 text-sm leading-relaxed">
              {t("description")}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-neutral-950 dark:text-white font-medium mb-4">{t("quickLinks")}</h4>
            <nav className="grid grid-cols-2 gap-2">
              {navLinkKeys.map((key) => (
                <a
                  key={key}
                  href={`#${key === "apartment" ? "apartment" : key}`}
                  className="text-sm text-neutral-500 dark:text-white/50 hover:text-gold-500 dark:hover:text-gold-400 transition-colors py-1"
                >
                  {tNav(key)}
                </a>
              ))}
              <a
                href="#contact"
                className="text-sm text-neutral-500 dark:text-white/50 hover:text-gold-500 dark:hover:text-gold-400 transition-colors py-1"
              >
                {t("contact")}
              </a>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-neutral-950 dark:text-white font-medium mb-4">{t("contact")}</h4>
            <div className="space-y-3 text-sm text-neutral-500 dark:text-white/50">
              <a href="mailto:info@6altop.com" className="block hover:text-gold-500 dark:hover:text-gold-400 transition-colors">
                info@6altop.com
              </a>
              <a href="tel:+393277293390" className="block hover:text-gold-500 dark:hover:text-gold-400 transition-colors">
                +39 327 7293 390
              </a>
            </div>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 mt-6 text-sm text-gold-500 dark:text-gold-400 hover:text-gold-600 dark:hover:text-gold-300 transition-colors group"
            >
              {t("bookNow")}
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-neutral-200 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-neutral-400 dark:text-white/30">
            &copy; {currentYear} 6 Al Top. {t("copyright")}
          </p>
          <p className="text-sm text-neutral-400 dark:text-white/30">
            {t("address")}
          </p>
        </div>
      </div>
    </footer>
  );
}

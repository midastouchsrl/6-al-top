"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, Phone, Send, CheckCircle, ArrowRight, Calendar, MessageCircle, ExternalLink } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";

export default function Contact() {
  const t = useTranslations("Contact");
  const locale = useLocale();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [privacyConsent, setPrivacyConsent] = useState(false);

  const formatDate = (date: Date | null) => {
    if (!date) return "";
    return date.toLocaleDateString(locale === "it" ? "it-IT" : "en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Compose email body
    const emailBody = `
${locale === "it" ? "Nuova Richiesta di Prenotazione dal sito 6 Al Top" : "New Booking Inquiry from 6 Al Top Website"}

${t("form.name")}: ${formState.name}
${t("form.email")}: ${formState.email}
${t("form.phone")}: ${formState.phone || (locale === "it" ? "Non fornito" : "Not provided")}

${t("form.checkIn")}: ${formatDate(checkIn) || (locale === "it" ? "Non specificato" : "Not specified")}
${t("form.checkOut")}: ${formatDate(checkOut) || (locale === "it" ? "Non specificato" : "Not specified")}

${t("form.message")}:
${formState.message}
    `.trim();

    // Open mailto with precompiled data
    const mailtoLink = `mailto:info@6altop.com?subject=${encodeURIComponent(
      `${t("emailSubject")} - ${formState.name}`
    )}&body=${encodeURIComponent(emailBody)}`;

    window.location.href = mailtoLink;

    // Show success state
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormState({ name: "", email: "", phone: "", message: "" });
      setCheckIn(null);
      setCheckOut(null);
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 500);
  };

  return (
    <section id="contact" className="section-padding bg-neutral-50 dark:bg-neutral-950 relative overflow-hidden transition-colors duration-300">
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gold-500/5 dark:bg-gold-400/5 rounded-full blur-3xl" />

      <div className="container-custom relative">
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

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            <a
              href="mailto:info@6altop.com"
              className="card-glass p-6 flex items-center gap-5 group hover:bg-neutral-200/50 dark:hover:bg-white/[0.06] transition-colors"
            >
              <div className="w-14 h-14 rounded-2xl bg-gold-500/10 dark:bg-gold-400/10 flex items-center justify-center group-hover:bg-gold-500/20 dark:group-hover:bg-gold-400/20 transition-colors">
                <Mail className="w-6 h-6 text-gold-500 dark:text-gold-400" />
              </div>
              <div>
                <div className="text-sm text-neutral-500 dark:text-white/50 mb-1">{t("info.email")}</div>
                <div className="text-neutral-950 dark:text-white font-medium group-hover:text-gold-500 dark:group-hover:text-gold-400 transition-colors">
                  info@6altop.com
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-neutral-400 dark:text-white/30 ml-auto group-hover:text-gold-500 dark:group-hover:text-gold-400 group-hover:translate-x-1 transition-all" />
            </a>

            <a
              href="tel:+393277293390"
              className="card-glass p-6 flex items-center gap-5 group hover:bg-neutral-200/50 dark:hover:bg-white/[0.06] transition-colors"
            >
              <div className="w-14 h-14 rounded-2xl bg-gold-500/10 dark:bg-gold-400/10 flex items-center justify-center group-hover:bg-gold-500/20 dark:group-hover:bg-gold-400/20 transition-colors">
                <Phone className="w-6 h-6 text-gold-500 dark:text-gold-400" />
              </div>
              <div>
                <div className="text-sm text-neutral-500 dark:text-white/50 mb-1">{t("info.phone")}</div>
                <div className="text-neutral-950 dark:text-white font-medium group-hover:text-gold-500 dark:group-hover:text-gold-400 transition-colors">
                  +39 327 7293 390
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-neutral-400 dark:text-white/30 ml-auto group-hover:text-gold-500 dark:group-hover:text-gold-400 group-hover:translate-x-1 transition-all" />
            </a>

            {/* Quick Book Button */}
            <div className="card-glass p-6">
              <p className="text-sm text-neutral-500 dark:text-white/50 mb-4">{t("bookDirectly")}</p>
              <a
                href="https://wa.me/393277293390?text=Hi!%20I%27m%20interested%20in%20booking%206%20Al%20Top%20apartment."
                target="_top"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-[#25D366] hover:bg-[#1fb855] rounded-xl text-white font-medium shadow-lg shadow-[#25D366]/25 hover:shadow-[#25D366]/40 hover:scale-[1.02] transition-all duration-300"
              >
                <MessageCircle className="w-5 h-5" />
                <span>{t("buttons.whatsapp")}</span>
              </a>
            </div>

            {/* Booking.com Credibility Card */}
            <div className="card-glass p-6 border-[#003580]/20 dark:border-[#003580]/30">
              <div className="flex items-center gap-3 mb-3">
                <div className="px-2 py-1 bg-[#003580] rounded-md">
                  <span className="text-white font-bold text-sm">9.8</span>
                </div>
                <span className="text-sm font-semibold text-neutral-700 dark:text-white/80">{t("bookingExcellent")}</span>
              </div>
              <p className="text-xs text-neutral-500 dark:text-white/50 mb-4">
                {t("bookingCredibility")}
              </p>
              <a
                href="https://www.booking.com/hotel/it/6-al-top.it.html"
                target="_top"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-[#003580] hover:bg-[#00224f] rounded-xl text-white font-medium transition-all duration-300 hover:scale-[1.02]"
              >
                <span>{t("buttons.bookingReviews")}</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <div className="card-glass p-8 md:p-10">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-16 text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-gold-500/20 dark:bg-gold-400/20 flex items-center justify-center mb-6">
                    <CheckCircle className="w-10 h-10 text-gold-500 dark:text-gold-400" />
                  </div>
                  <h4 className="text-2xl font-display font-semibold text-neutral-950 dark:text-white mb-2">
                    {t("success.title")}
                  </h4>
                  <p className="text-neutral-600 dark:text-white/60">
                    {t("success.message")}
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-sm text-neutral-500 dark:text-white/60 mb-2">
                        {t("form.name")} *
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        className="w-full px-5 py-4 bg-neutral-100 dark:bg-white/[0.03] border border-neutral-200 dark:border-white/10 rounded-xl text-neutral-950 dark:text-white placeholder-neutral-400 dark:placeholder-white/30 focus:border-gold-500/50 dark:focus:border-gold-400/50 focus:bg-white dark:focus:bg-white/[0.05] focus:outline-none transition-all"
                        placeholder={t("form.namePlaceholder")}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm text-neutral-500 dark:text-white/60 mb-2">
                        {t("form.email")} *
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        className="w-full px-5 py-4 bg-neutral-100 dark:bg-white/[0.03] border border-neutral-200 dark:border-white/10 rounded-xl text-neutral-950 dark:text-white placeholder-neutral-400 dark:placeholder-white/30 focus:border-gold-500/50 dark:focus:border-gold-400/50 focus:bg-white dark:focus:bg-white/[0.05] focus:outline-none transition-all"
                        placeholder={t("form.emailPlaceholder")}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm text-neutral-500 dark:text-white/60 mb-2">
                      {t("form.phone")}
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={formState.phone}
                      onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                      className="w-full px-5 py-4 bg-neutral-100 dark:bg-white/[0.03] border border-neutral-200 dark:border-white/10 rounded-xl text-neutral-950 dark:text-white placeholder-neutral-400 dark:placeholder-white/30 focus:border-gold-500/50 dark:focus:border-gold-400/50 focus:bg-white dark:focus:bg-white/[0.05] focus:outline-none transition-all"
                      placeholder={t("form.phonePlaceholder")}
                    />
                  </div>

                  {/* Date Pickers */}
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm text-neutral-500 dark:text-white/60 mb-2">
                        <Calendar className="w-4 h-4 inline-block mr-1.5 -mt-0.5" />
                        {t("form.checkIn")}
                      </label>
                      <DatePicker
                        selected={checkIn}
                        onChange={(date: Date | null) => setCheckIn(date)}
                        selectsStart
                        startDate={checkIn}
                        endDate={checkOut}
                        minDate={new Date()}
                        placeholderText={t("form.selectDate")}
                        dateFormat="dd MMM yyyy"
                        locale={locale === "it" ? "it" : "en"}
                        className="w-full px-5 py-4 bg-neutral-100 dark:bg-white/[0.03] border border-neutral-200 dark:border-white/10 rounded-xl text-neutral-950 dark:text-white placeholder-neutral-400 dark:placeholder-white/30 focus:border-gold-500/50 dark:focus:border-gold-400/50 focus:bg-white dark:focus:bg-white/[0.05] focus:outline-none transition-all cursor-pointer"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-neutral-500 dark:text-white/60 mb-2">
                        <Calendar className="w-4 h-4 inline-block mr-1.5 -mt-0.5" />
                        {t("form.checkOut")}
                      </label>
                      <DatePicker
                        selected={checkOut}
                        onChange={(date: Date | null) => setCheckOut(date)}
                        selectsEnd
                        startDate={checkIn}
                        endDate={checkOut}
                        minDate={checkIn || new Date()}
                        placeholderText={t("form.selectDate")}
                        dateFormat="dd MMM yyyy"
                        locale={locale === "it" ? "it" : "en"}
                        className="w-full px-5 py-4 bg-neutral-100 dark:bg-white/[0.03] border border-neutral-200 dark:border-white/10 rounded-xl text-neutral-950 dark:text-white placeholder-neutral-400 dark:placeholder-white/30 focus:border-gold-500/50 dark:focus:border-gold-400/50 focus:bg-white dark:focus:bg-white/[0.05] focus:outline-none transition-all cursor-pointer"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm text-neutral-500 dark:text-white/60 mb-2">
                      {t("form.message")} *
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={4}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="w-full px-5 py-4 bg-neutral-100 dark:bg-white/[0.03] border border-neutral-200 dark:border-white/10 rounded-xl text-neutral-950 dark:text-white placeholder-neutral-400 dark:placeholder-white/30 focus:border-gold-500/50 dark:focus:border-gold-400/50 focus:bg-white dark:focus:bg-white/[0.05] focus:outline-none transition-all resize-none"
                      placeholder={t("form.messagePlaceholder")}
                    />
                  </div>

                  {/* Privacy Consent */}
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="privacy"
                      checked={privacyConsent}
                      onChange={(e) => setPrivacyConsent(e.target.checked)}
                      className="mt-1 w-4 h-4 rounded border-neutral-300 dark:border-white/20 text-gold-500 focus:ring-gold-500 dark:focus:ring-gold-400 bg-neutral-100 dark:bg-white/[0.03]"
                      required
                    />
                    <label htmlFor="privacy" className="text-sm text-neutral-500 dark:text-white/50">
                      {t("form.privacyConsent")}{" "}
                      <Link
                        href={`/${locale}/privacy`}
                        target="_blank"
                        className="text-gold-500 dark:text-gold-400 hover:underline"
                      >
                        {t("form.privacyLink")}
                      </Link>
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="btn-primary w-full group text-white"
                    disabled={isSubmitting || !privacyConsent}
                  >
                    {isSubmitting ? t("form.submitting") : t("form.submit")}
                    <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <p className="text-center text-sm text-neutral-500 dark:text-white/50 mt-4">
                    <span className="text-gold-500 dark:text-gold-400 font-medium">{t("info.fastResponse")}</span>
                    {" · "}
                    {t("info.responseTime")}
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

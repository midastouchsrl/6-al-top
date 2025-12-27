import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const isItalian = locale === "it";

  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-neutral-950 pt-24 pb-16 transition-colors duration-300">
      <div className="container-custom max-w-3xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-neutral-500 dark:text-white/50 hover:text-gold-500 dark:hover:text-gold-400 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          {isItalian ? "Torna alla Home" : "Back to Home"}
        </Link>

        <h1 className="text-3xl md:text-4xl font-display font-semibold text-neutral-950 dark:text-white mb-8">
          Privacy & Cookie Policy
        </h1>

        <div className="prose prose-neutral dark:prose-invert max-w-none">
          {isItalian ? (
            <>
              <h2>Titolare del Trattamento</h2>
              <p>
                <strong>Alessandro Massoli</strong><br />
                Codice Fiscale: MSSLSN65T10H501K<br />
                Via Milazzo, 14 - 00185 Roma, Italia<br />
                Email: info@6altop.com<br />
                Telefono: +39 327 7293 390
              </p>

              <h2>Informativa ai sensi del D.Lgs. 196/2003 e GDPR 679/2016</h2>
              <p>
                Il trattamento dei dati personali (nome, cognome, email, telefono) avviene per
                elaborare le richieste di informazione e prenotazione inviate tramite il modulo
                di contatto presente sul sito.
              </p>

              <h3>Finalità del Trattamento</h3>
              <ul>
                <li>Rispondere alle richieste di informazioni</li>
                <li>Gestire le prenotazioni</li>
                <li>Inviare comunicazioni relative al soggiorno</li>
              </ul>

              <h3>Modalità del Trattamento</h3>
              <p>
                I dati vengono trattati con strumenti informatici e cartacei, con le misure
                di sicurezza previste dalla normativa vigente.
              </p>

              <h3>Conservazione dei Dati</h3>
              <p>
                I dati sono conservati per il tempo necessario a rispondere alle richieste
                effettuate e per gli adempimenti fiscali previsti dalla legge.
              </p>

              <h3>Diritti dell&apos;Interessato</h3>
              <p>
                Ai sensi degli artt. 15-22 del GDPR, l&apos;interessato può in qualsiasi momento
                esercitare i diritti di accesso, rettifica, cancellazione, limitazione,
                portabilità e opposizione scrivendo a info@6altop.com.
              </p>

              <h2>Cookie Policy</h2>
              <p>
                Questo sito utilizza esclusivamente cookie tecnici necessari per il corretto
                funzionamento. <strong>Non utilizziamo cookie di profilazione, analytics o di terze parti.</strong>
              </p>

              <h3>Cosa sono i Cookie</h3>
              <p>
                I cookie sono piccoli file di testo che i siti visitati inviano al browser
                dell&apos;utente, dove vengono memorizzati per essere poi ritrasmessi agli stessi
                siti alla visita successiva.
              </p>

              <h3>Cookie Utilizzati</h3>
              <p>Utilizziamo solo cookie tecnici strettamente necessari:</p>
              <ul>
                <li><strong>Preferenza tema:</strong> memorizza la scelta tema chiaro/scuro (localStorage)</li>
                <li><strong>Preferenza lingua:</strong> memorizza la lingua selezionata (IT/EN)</li>
              </ul>
              <p>
                Questi cookie sono esenti dall&apos;obbligo di consenso in quanto necessari per
                erogare il servizio richiesto dall&apos;utente (art. 122 D.Lgs. 196/2003).
              </p>

              <p className="text-sm text-neutral-500 dark:text-white/50 mt-8">
                Ultimo aggiornamento: Dicembre 2025
              </p>
            </>
          ) : (
            <>
              <h2>Data Controller</h2>
              <p>
                <strong>Alessandro Massoli</strong><br />
                Tax Code: MSSLSN65T10H501K<br />
                Via Milazzo, 14 - 00185 Rome, Italy<br />
                Email: info@6altop.com<br />
                Phone: +39 327 7293 390
              </p>

              <h2>Privacy Notice pursuant to GDPR 679/2016</h2>
              <p>
                Personal data (name, surname, email, phone) is processed to handle
                information requests and bookings submitted through the contact form
                on this website.
              </p>

              <h3>Purpose of Processing</h3>
              <ul>
                <li>Responding to information requests</li>
                <li>Managing bookings</li>
                <li>Sending communications related to your stay</li>
              </ul>

              <h3>Processing Methods</h3>
              <p>
                Data is processed using IT and paper-based tools, with security measures
                required by current legislation.
              </p>

              <h3>Data Retention</h3>
              <p>
                Data is retained for the time necessary to respond to requests and for
                tax compliance purposes as required by law.
              </p>

              <h3>Data Subject Rights</h3>
              <p>
                Pursuant to Articles 15-22 of the GDPR, data subjects may at any time
                exercise their rights of access, rectification, erasure, restriction,
                portability and objection by writing to info@6altop.com.
              </p>

              <h2>Cookie Policy</h2>
              <p>
                This website uses only technical cookies necessary for proper functioning.
                <strong> We do not use profiling, analytics, or third-party cookies.</strong>
              </p>

              <h3>What are Cookies</h3>
              <p>
                Cookies are small text files that visited websites send to the user&apos;s
                browser, where they are stored and then retransmitted to the same sites
                on subsequent visits.
              </p>

              <h3>Cookies Used</h3>
              <p>We only use strictly necessary technical cookies:</p>
              <ul>
                <li><strong>Theme preference:</strong> stores light/dark theme choice (localStorage)</li>
                <li><strong>Language preference:</strong> stores selected language (IT/EN)</li>
              </ul>
              <p>
                These cookies are exempt from consent requirements as they are necessary
                to provide the service requested by the user (GDPR Art. 6(1)(b)).
              </p>

              <p className="text-sm text-neutral-500 dark:text-white/50 mt-8">
                Last updated: December 2025
              </p>
            </>
          )}
        </div>
      </div>
    </main>
  );
}

export function generateStaticParams() {
  return [{ locale: "it" }, { locale: "en" }];
}

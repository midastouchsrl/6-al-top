# Lessons Learned

## Cosa Funziona
- Next.js 15 con App Router è stabile
- Framer Motion per animazioni scroll-triggered (useInView)
- Font Google (Sora, DM Sans) per look moderno
- Glassmorphism cards con bg-white/[0.03] + backdrop-blur
- Tailwind CSS variabili custom per palette coerente
- next.config.js invece di .ts evita problemi TypeScript

## Cosa Evitare
- Font serif tradizionali (Playfair) = aspetto datato
- next.config.ts può causare errori "Cannot find module typescript"
- Oro troppo saturo (#c4a35a) → meglio amber-400 per look contemporaneo
- Design "hotel lusso classico" → preferire minimal/tech

## Fix specifici per questo ambiente
- Aggiungere `NODE_PATH=./node_modules` negli script npm per evitare conflitti con parent workspace
- Usare outputFileTracingRoot nel next.config.js per workspace isolation
- **IMPORTANTE**: Se NODE_ENV=production nell'ambiente, lo script dev fallisce con errore `@tailwind` non riconosciuto. Forzare `NODE_ENV=development` nello script dev.
- **npm omit=dev**: L'ambiente ha npm configurato per omettere devDependencies. Usare `npm install --include=dev` per installarle.
- **ThemeProvider SSR**: Non usare early return `{children}` senza Provider, altrimenti useTheme() fallisce durante prerendering. Sempre wrappare con Provider.

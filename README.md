# Francesco D'Andrea — Design Studio

Sito ufficiale dello studio. React + Vite + Tailwind + Framer Motion.

## 🚀 Deploy su Vercel — 3 modi

### Opzione 1 — Drag & Drop (più semplice)
1. Vai su https://vercel.com/new
2. Trascina questa cartella nella pagina
3. Clicca "Deploy"

Vercel rileva Vite automaticamente. Build pronta in ~30 secondi.

### Opzione 2 — Via GitHub (raccomandato per aggiornamenti continui)
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/TUO_USER/fdandrea-studio.git
git push -u origin main
```
Poi su https://vercel.com/new → Import dal repo → Deploy. Ogni `git push` aggiornerà il sito.

### Opzione 3 — CLI Vercel
```bash
npm install -g vercel
vercel
```

---

## 🛠 Sviluppo locale

```bash
npm install
npm run dev
```
Apri http://localhost:5173

```bash
npm run build      # build produzione in /dist
npm run preview    # preview locale del build
```

---

## 📂 Struttura

```
.
├── index.html              # meta SEO, OG, JSON-LD, Google Fonts
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── vercel.json             # SPA rewrites + security headers
├── public/
│   ├── favicon.svg
│   ├── robots.txt
│   └── sitemap.xml
└── src/
    ├── main.jsx
    ├── index.css           # Tailwind + base + animazioni
    └── App.jsx             # tutto il sito (6 pagine, 16 progetti)
```

---

## ✏️ Cosa modificare per prima cosa

### 1. Le immagini dei progetti
Apri `src/App.jsx`, cerca `const PROJECTS = [`. Ogni progetto ha:
```js
{
  slug: "bilico-bar",
  cover: "https://images.unsplash.com/...",     // ← sostituisci
  images: ["url1", "url2", "url3"],             // ← sostituisci
  ...
}
```

**Carica le foto reali** in `public/images/projects/bilico-bar/01.jpg` e usa percorsi locali:
```js
cover: "/images/projects/bilico-bar/01.jpg",
```

Formato consigliato: WebP o JPG q=80, min 1600px sul lato lungo, ratio 4:3 o 3:4.

### 2. La foto di Francesco
Cerca `Francesco D'Andrea` (la stringa appare nelle sezioni About). Le due immagini placeholder sono:
- `https://images.unsplash.com/photo-1507003211169-...` (homepage About)
- `https://images.unsplash.com/photo-1556157382-97eda2d62296...` (pagina About)

Sostituiscile con una foto reale (ratio 3:4, b/n o colore).

### 3. Il dominio nel sitemap
Apri `public/sitemap.xml` e `index.html` → sostituisci ogni occorrenza di `francesco-dandrea.it` col dominio finale.

### 4. L'immagine Open Graph
Crea un'immagine 1200×630 px (di solito uno screenshot artistico della home o un progetto featured + logo) e mettila in `public/og-image.jpg`.

### 5. Far funzionare davvero il form contatti
Lo state è già pronto e validato. Per inviare le email scegli:

**A) Formspree (più semplice)** — crea account su formspree.io, ottieni l'endpoint, e in `ContattiPage` sostituisci `onSubmit`:
```js
const onSubmit = async (e) => {
  e.preventDefault();
  if (!form.privacy) return;
  await fetch("https://formspree.io/f/TUO_ID", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(form),
  });
  setSent(true);
};
```

**B) Vercel Function + Resend** — crea `api/contact.js` (Vercel lo riconosce automaticamente):
```js
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const data = req.body;
  await resend.emails.send({
    from: 'sito@francesco-dandrea.it',
    to: 'info@francesco-dandrea.it',
    subject: `Nuova richiesta · ${data.tipologia} · ${data.nome}`,
    html: `<pre>${JSON.stringify(data, null, 2)}</pre>`,
  });
  res.status(200).json({ ok: true });
}
```
Poi aggiungi `RESEND_API_KEY` su Vercel → Settings → Environment Variables.

---

## 🎨 Palette colori (per riferimento)

| Ruolo | Hex | Tailwind |
|---|---|---|
| Carbone (testo, hero scuri) | `#1A1614` | `carbon` |
| Calce/panna (sfondo) | `#F4EFE6` | `cream` |
| Pietra (sezioni alternate) | `#E8DFD0` | `stone` |
| Salvia (accento freddo) | `#5A6650` | `sage` |
| Terracotta (accento caldo) | `#B8593A` | `terracotta` |
| Antracite tenue (testo sec.) | `#6B6259` | `ash` |

---

## 🔤 Font

- **Display** — Fraunces (serif editoriale variabile)
- **Body** — Inter Tight (sans tecnico)
- **Mono** — JetBrains Mono (dettagli, numerazioni, tag)

Caricati via Google Fonts in `index.html` con `preconnect` per performance ottimale.

---

## 📊 SEO checklist pre-lancio

- [ ] Sostituite tutte le foto placeholder
- [ ] Creata `og-image.jpg` 1200×630 in `/public`
- [ ] Aggiornato il dominio in `sitemap.xml` e `index.html`
- [ ] Form contatti collegato (Formspree o Resend)
- [ ] Dominio configurato su Vercel → Settings → Domains
- [ ] Verificato Lighthouse > 90 su mobile
- [ ] Configurato Google Search Console (verifica via meta tag in `index.html`)
- [ ] Aggiunto Plausible o Google Analytics 4
- [ ] Privacy policy reale linkata dal checkbox del form

---

*Mangio pasta e design.*

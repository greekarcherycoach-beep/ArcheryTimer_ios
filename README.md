# Archery Lab – Timer (PWA)

## Ανέβασμα στο GitHub Pages
1. Φτιάξε ένα repository (π.χ. `archery-lab-timer`) και ανέβασε **όλα τα περιεχόμενα** αυτού του φακέλου στο root (το `index.html` να είναι στο root, όχι μέσα σε υποφάκελο).
2. Repository → **Settings → Pages** → Source: *Deploy from a branch* → Branch: `main` / `(root)` → Save.
3. Μετά από ~1 λεπτό η εφαρμογή είναι στο `https://<username>.github.io/archery-lab-timer/`.
4. Άνοιξέ την μία φορά με ίντερνετ (ώστε να αποθηκευτούν τα αρχεία) και μετά δουλεύει offline.

## Εγκατάσταση
- Android/Chrome: μενού ⋮ → *Εγκατάσταση εφαρμογής* / *Προσθήκη στην αρχική οθόνη*.
- iPhone/iPad (Safari): Κοινοποίηση → *Προσθήκη στην οθόνη Αφετηρίας*.
- Windows/Chrome/Edge: εικονίδιο εγκατάστασης στη γραμμή διευθύνσεων.

## Ενημέρωση
Το service worker (`sw.js`) ανανεώνει τα αρχεία στο παρασκήνιο: μετά από νέο upload, η αλλαγή φαίνεται στο **δεύτερο** άνοιγμα.
Για άμεση ανανέωση άλλαξε το `VERSION` στο `sw.js` (π.χ. `'v2'`).

## Αρχεία
- `index.html` – η εφαρμογή (με manifest, εικονίδια και εγγραφή service worker)
- `manifest.webmanifest` – όνομα, εικονίδια, χρώματα, standalone οθόνη
- `sw.js` – cache για offline
- `fonts/` – Orbitron και Share Tech Mono τοπικά (πριν φορτώνονταν από Google Fonts)
- `icons/` – 192, 512, maskable 512, apple-touch 180

Σημείωση: ο έλεγχος service worker δουλεύει μόνο μέσω https (GitHub Pages) ή `localhost`, όχι με διπλό κλικ στο αρχείο.

## Πλήρης οθόνη
- Το manifest ζητά `fullscreen` (με fallback σε `standalone`). Σε Android/Chrome χρειάζεται **διαγραφή της παλιάς συντόμευσης και νέα εγκατάσταση** ώστε να διαβαστεί το νέο manifest.
- Στο iPhone/iPad το «Προσθήκη στην οθόνη Αφετηρίας» ανοίγει χωρίς γραμμή Safari (standalone), αλλά το iOS δεν επιτρέπει πραγματικό fullscreen.

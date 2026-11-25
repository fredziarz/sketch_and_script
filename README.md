# sketchandscript.pl

Strona Michała Wicherka – projektowanie architektury i wnętrz. Polski pod `/`, angielski pod `/en/`.

Eleventy + GitHub Actions + GitHub Pages. Bez frameworków JS po stronie przeglądarki.

## Praca lokalna

```bash
npm ci        # instalacja
npm start     # podgląd na http://localhost:8080 z przeładowaniem
npm run build # wynik w _site/
npm test      # sprawdza zbudowaną stronę (linki, kotwice, PL/EN, ukryte /code/)
```

## Gdzie co jest

- `src/_data/site.json` – kontakt, social, klucz formularza, token analityki, `codingVisible`.
- `src/_data/home.json` – wszystkie teksty strony głównej (`pl` i `en`).
- `src/_data/projects/*.json` – projekty portfolio; jeden plik to jeden projekt w obu językach.
- `src/images/` – zdjęcia (optymalizowane przy buildzie).
- `src/index.njk`, `src/project.njk`, `src/_includes/base.njk` – szablony.
- `src/assets/` – CSS, JS, fonty.
- `src/code/` – część o kodowaniu (po angielsku, `noindex`, bez linku w menu, dopóki `codingVisible` jest `false`).
- `src/_data/redirects.json` – przekierowania ze starych adresów.
- `wrangler.jsonc`, `src/_headers` – strona testowa na Cloudflare (Worker `sketch-and-script`, buduje gałąź `dev`, `noindex`).

## Panel treści (CMS)

`/admin/` – Sveltia CMS, konfiguracja w `src/admin/config.yml`. Edytuje te same pliki JSON co wyżej, w obu językach naraz. Każdy zapis to commit na `dev`: zmiana trafia na stronę testową, nie na live (patrz Publikacja). Zdjęcia przy wgrywaniu są zmniejszane i zamieniane na WebP.

- Online: „Sign In Using Access Token”. Użyj tokenu typu fine-grained z konta z prawem zapisu do repo (właściciel: `fredziarz`), ograniczonego tylko do tego repo, z jednym uprawnieniem Contents: Read and write i z datą wygaśnięcia. Okno logowania podaje link do wygenerowania tokenu.
- Tłumaczenie PL → EN: przycisk tłumaczenia Sveltia z usługą Google Cloud Translation (projekt `sketchandscript-cms`). Klucz API wpisuje się w Ustawieniach panelu, zakładka Internacjonalizacja, i zostaje tylko w przeglądarce; klucz jest ograniczony do domen panelu i Cloud Translation API, a limit 15 000 znaków dziennie trzyma użycie w darmowym progu. Przycisk w nagłówku wersji EN wypełnia puste pola, przycisk przy polu nadpisuje jego treść.
- Wersja Sveltia jest przypięta w `src/admin/index.html`; aktualizacja to zmiana numeru w adresie skryptu.
- Lokalnie (`npm start`, potem `localhost:8080/admin/` w Chrome): „Work with Local Repository” i wskazanie folderu repo. Zmiany trafiają prosto do plików, bez commitów.

## Publikacja

Dwa środowiska:

- **dev** – gałąź `dev`, strona testowa https://sketch-and-script.michalwicherek.workers.dev (Cloudflare, `noindex`). Trafiają tu zapisy z panelu i push z kodem; przed pracą `git pull origin dev`.
- **produkcja** – gałąź `main`, www.sketchandscript.pl (GitHub Pages). Zmienia się tylko przez pull request `dev` → `main`: [otwórz PR](https://github.com/fredziarz/sketch_and_script/compare/main...dev?expand=1), poczekaj na zielony check `build` (build + `npm test`), kliknij „Merge”. Workflow `.github/workflows/deploy.yml` publikuje stronę po około minucie.

Gałąź `main` jest chroniona: bez PR i zielonego `build` nie da się na nią nic wypchnąć.

Punkt powrotu do starej strony: gałąź `legacy-site` (tag `pre-redesign`).

## Wersje

SemVer w `package.json`, historia w `CHANGELOG.md`, commity w konwencji Conventional Commits.

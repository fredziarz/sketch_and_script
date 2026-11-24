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

## Panel treści (CMS)

`/admin/` – Sveltia CMS, konfiguracja w `src/admin/config.yml`. Edytuje te same pliki JSON co wyżej, w obu językach naraz. Każdy zapis to commit na GitHubie, na gałęzi ustawionej w `backend.branch`. Zdjęcia przy wgrywaniu są zmniejszane i zamieniane na WebP.

- Online: „Sign In Using Access Token” i token GitHuba z uprawnieniem Contents: Read and write do tego repo. Okno logowania podaje link do wygenerowania tokenu.
- Lokalnie (`npm start`, potem `localhost:8080/admin/` w Chrome): „Work with Local Repository” i wskazanie folderu repo. Zmiany trafiają prosto do plików, bez commitów.

Po edycji online zrób `git pull`, zanim zaczniesz zmieniać pliki lokalnie.

## Publikacja

Praca na gałęzi `dev`. Merge do `main` uruchamia workflow `.github/workflows/deploy.yml`: build, `npm test`, publikacja na GitHub Pages.

## Wersje

SemVer w `package.json`, historia w `CHANGELOG.md`, commity w konwencji Conventional Commits.

# Changelog

Format: [Keep a Changelog](https://keepachangelog.com/), wersje: [SemVer](https://semver.org/).

## [2.0.1] – 2026-11-25

### Fixes

- Panel treści wczytuje istniejące teksty strony głównej w obu językach, więc można zmienić pojedyncze pole bez wypełniania całego formularza.
- Panel ma link do podglądu strony głównej i stron projektów na żywo.

## [2.0.0] – 2026-11-24

### BREAKING CHANGES

- Strona zbudowana od nowa na Eleventy. Polski pod `/`, angielski pod `/en/`. Projekty pod `/projekty/{slug}/` i `/en/projects/{slug}/`. Stare adresy (`/architecture.html`, `/projects/*.html`, `/coding.html`) przekierowują na nowe.
- Część o kodowaniu przeniesiona pod `/code/`, bez linku w menu i z `noindex`.
- Usunięty stary CMS i skrypty publikacji (`publish.sh`, `sync-from-cms.sh`, skrypty serwerów).

### Features

- Strona główna: pokaz zdjęć projektów, portfolio, „Jak pracuję” zgodne z umową z klientem, oferta, o mnie, kontakt.
- Kontakt: formularz, e-mail, telefon, LinkedIn; w stopce nazwa działalności, adres i NIP.
- Panel treści Sveltia CMS pod `/admin/`: teksty i projekty w obu językach, zdjęcia zamieniane na WebP przy wgrywaniu.
- Zdjęcia optymalizowane przy buildzie (AVIF, WebP, kilka rozmiarów), sitemap z wersjami językowymi.
- Publikacja przez GitHub Actions z automatycznym sprawdzeniem linków, kotwic, przekierowań i wersji językowych.

### Fixes

- Stare angielskie adresy prowadzą do angielskich wersji stron.
- Poprawki przed startem: pojedyncze escapowanie tytułów, kontrast akcentu (WCAG AA), lightbox obsługiwany z klawiatury, fallback pustych pól angielskich na polskie.

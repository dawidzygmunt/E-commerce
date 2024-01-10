# Ecommerce CMS - Dawid Zygmunt

## Opis

Ecommerce CMS to aplikacja internetowa, która umożliwia efektywne zarządzanie treścią sklepów internetowych. Projekt wykorzystuje technologie takie jak [Next.js](https://nextjs.org/), [React](https://reactjs.org/), [Typescript](https://www.typescriptlang.org/), [TailwindCSS](https://tailwindcss.com/), [Prisma](https://www.prisma.io/) oraz [MySQL](https://www.mysql.com/). Celem aplikacji jest usprawnienie procesu zarządzania zawartością e-commerce, z naciskiem na prostotę obsługi i intuicyjność.

## Live
Zobacz Demo: https://dawidzygmuntdev.pl/e-commerce

## Wymagania Systemowe

Aby korzystać z Ecommerce CMS, upewnij się, że na Twoim środowisku zainstalowane są:

- [Node.js](https://nodejs.org/) (w wersji v18.16.1 lub nowszej)
- [Prisma CLI](https://www.prisma.io/docs/getting-started/installation-prisma-cli) (do obsługi bazy danych)

## Instalacja

1. Sklonuj repozytorium na swój lokalny komputer.
   ```
   git clone git@github.com:dawidzygmunt/E-commerce.git
   ```

2. Przejdź do katalogu projektu.
   ```
   cd E-commerce
   ```

3. Zainstaluj zależności.
   ```
   npm install
   ```

4. Uruchom migracje bazy danych przy użyciu Prisma CLI.
   ```
   npx prisma migrate dev
   ```

## Konfiguracja

1. Skonfiguruj połączenie z bazą danych w pliku `.env`, korzystając z przykładowego pliku `.env.example`.

## Uruchamianie

Uruchom projekt za pomocą poniższej komendy:

```bash
npm run dev
```

Otwórz przeglądarkę i przejdź do `http://localhost:3000`, aby korzystać z Ecommerce CMS.

## Dokumentacja

Dokumentacja projektu znajduje się w katalogu `docs`. Przeczytaj pliki dokumentacji, aby zaznajomić się z dostępnymi funkcjami i ich użyciem.

## Zgłaszanie Błędów

Jeśli znajdziesz błąd lub masz propozycję ulepszenia, zgłoś to, tworząc nowe zgłoszenie w zakładce "Issues" tego repozytorium.

## Autorzy

- Dawid Zygmunt (dawid.zygmunt86@gmail.com)

## Licencja

Ten projekt jest objęty licencją MIT. Zobacz plik LICENSE.md, aby uzyskać więcej informacji.

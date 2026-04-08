# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

VELIQ Alpha ("alfa-trans") — a bilingual (Arabic/English) logistics company website built with Next.js 14 App Router, Tailwind CSS, and Framer Motion. Default locale is Arabic (RTL).

## Commands

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run lint` — ESLint
- `npm start` — serve production build

## Architecture

**Routing & i18n:** Uses Next.js App Router with a `[locale]` dynamic segment (`src/app/[locale]/`). Supported locales: `ar` (default, RTL) and `en`. Configuration lives in `src/i18n/config.ts`. Translation strings are JSON files in `src/i18n/dictionaries/`. Client components access translations via `useDictionary()` hook from `src/i18n/dictionary-provider.tsx`; server components use `getDictionary()` from `src/i18n/get-dictionary.ts`.

**Middleware** (`src/middleware.ts`): Handles two concerns — locale prefix redirect (adds default locale to bare paths) and admin route protection (cookie-based `is_admin` check, redirects to login).

**Layout:** `src/app/[locale]/layout.tsx` wraps all pages with Google Fonts (Tajawal, Cairo), `DictionaryProvider`, `Navbar`, and `Footer`. RTL direction is set on `<html>` based on locale.

**Database:** Prisma with PostgreSQL (Neon serverless). Schema in `prisma/schema.prisma` with models: `User`, `Service`, `Career`. All content models store both `_ar` and `_en` field variants.

**Styling:** Tailwind with custom brand colors (`primary: #213B63`, `secondary: #7A363B`, `accent: #C1922C`, `dark: #141414`, `cream: #F5F0E8`) and custom font families (`font-tajawal`, `font-cairo`). Path alias `@/*` maps to `./src/*`.

## Key Patterns

- Pages are client components using `"use client"` with `useDictionary()` for translations and Framer Motion for animations.
- RTL handling: check `params.locale === "ar"` and conditionally flip icons/layout (e.g., `ArrowLeft` vs `ArrowRight`).
- Dictionary strings use `..` as a delimiter for multi-part text (e.g., `dict.hero.title2.split("..")`).
- Prisma content fields are duplicated per locale (`title_ar`/`title_en`, `desc_ar`/`desc_en`) rather than using a relation-based translation approach.

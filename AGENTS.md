# AGENTS.md

NestJS 11 Todo CRUD API + static browser frontend. No database — todos live in an in-memory `Map` in `src/todos/todos.service.ts`, so all data resets on every server restart.

## Commands

- `npm run start:dev` — watch-mode dev server on `http://localhost:3000` (override with `PORT` env var)
- `npm run build` then `npm run start:prod` (`node dist/main`) — production flow
- `npm test` — **jest is installed but there are no spec files and no jest config in `package.json`; it currently fails/finds nothing**. Add `*.spec.ts` under `src/` to make it useful.
- No lint, format, or typecheck scripts exist. Verify types with `npx tsc --noEmit -p tsconfig.json`.

## Behavior quirks (easy to get wrong)

- `PATCH /todos/:id`: `additionalDetails` is **appended** to the description on a new line; it does not replace it. `description` replaces. Omit fields to keep them.
- Global `ValidationPipe` uses `whitelist: true, forbidNonWhitelisted: true` — any unknown body key is rejected with 400. DTOs in `src/todos/dto/` define the allowed keys.
- Frontend (`public/index.html`, served from `public/` via `useStaticAssets`) mirrors the append quirk: with a todo selected, text in the Description box is sent as `additionalDetails`, not `description`.
- `DELETE /todos/:id` returns 200 (not 204) and the deleted todo body.

## Repo state / gotchas

- `temp\.json` is a real file whose name literally contains a backslash — it looks like a draft OpenCode config and is not part of the app. Leave it alone.
- `thunder-collection_todos.json` — Thunder Client collection; requests with IDs need `REPLACE_WITH_TODO_ID` substituted.
- `dist/` is checked in locally and stale relative to edits — run `npm run build` rather than trusting it.
- No CI, pre-commit, or codegen config present.

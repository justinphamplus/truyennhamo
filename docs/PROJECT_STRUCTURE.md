# Project Structure

## Current Files

```text
index.html
styles.css
app.js
docs/
```

## File Responsibilities

### `index.html`

Chua markup cua public website:

- Header.
- Homepage.
- Story detail page.
- Footer.
- Mobile CTA.

Dung cac `data-*` attribute de JavaScript gan interaction va render mock data.

### `styles.css`

Chua toan bo UI styling:

- CSS variables.
- Layout desktop/mobile.
- Component styles.
- Cover art CSS mock.
- Responsive breakpoints.

### `app.js`

Chua:

- Mock data stories, genres, chapters, comments.
- Render functions.
- Hash routing.
- UI interactions.

### `docs/`

Chua tai lieu du an:

- `README.md`
- `SPEC.md`
- `IMPLEMENTATION_PLAN.md`
- `TASKS.md`
- `PROGRESS.md`
- `DESIGN_SYSTEM.md`
- `PROJECT_STRUCTURE.md`
- `DECISIONS.md`
- `TEST_PLAN.md`

## Future Structure If Converted To React

Chi dung neu user xac nhan chuyen framework:

```text
src/
  components/
    base/
    home/
    story/
  data/
    mock-stories.ts
  pages/
    HomePage.tsx
    StoryDetailPage.tsx
  styles/
    tokens.css
    global.css
```

Hien tai khong tao cau truc nay de tranh lam phuc tap qua som.

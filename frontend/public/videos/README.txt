HOW TO ADD A REAL BACKGROUND VIDEO TO THE HOME PAGE
=====================================================

The Home page hero is already wired up to play a blurred background
video automatically — it just needs the actual video file placed here.

STEP 1 — Get a free video (no copyright issues, no attribution needed):
  - https://www.pexels.com/search/videos/traditional%20dance/
  - https://pixabay.com/videos/search/indian%20dance/
  - https://pixabay.com/videos/search/stage%20performance/
  Search terms that work well: "traditional dance", "stage lights",
  "indian dance", "folk performance", "dance silhouette"

STEP 2 — Download the MP4 file, rename it exactly to:
  yakshagana-bg.mp4

STEP 3 — Drop it right here, in this same folder:
  frontend/public/videos/yakshagana-bg.mp4

STEP 4 — Refresh the browser. That's it — no code changes needed.

WHY THIS APPROACH:
  Real performance footage (e.g. from YouTube) is owned by the person
  who filmed it. Most YouTube videos also block being embedded on other
  websites — a setting only the original uploader controls, and there's
  no reliable way to detect that in advance. A locally-hosted video file
  you've verified yourself (free stock footage, or your own recording)
  avoids both problems entirely and is guaranteed to actually play.

NOTE: If no file is present, the page still looks complete — animated
gold/crimson/indigo "stage light" glows play automatically as the
background instead, so the hero never looks broken either way.

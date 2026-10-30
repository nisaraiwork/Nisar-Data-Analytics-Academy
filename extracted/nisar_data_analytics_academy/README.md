# Nisar Data Analytics Academy

A lightweight, mobile-friendly beginner learning app.

## Features
- Seven-stage Data Analytics roadmap
- Urdu-English lesson explanations and practice tasks
- Progress saved in the current browser using localStorage
- CSV checker: row count, column count, and empty-cell counts
- Mini sales arithmetic exercise
- No API key, backend, account, or paid service required

## Run locally
1. Extract the ZIP.
2. Open `index.html` in a modern browser.
3. For local development, you can also run `python -m http.server 8000` in this folder and visit `http://localhost:8000`.

## Privacy and security
- CSV parsing happens in the browser. The file is not sent to a server.
- The app does not collect credentials or personal information.
- Progress is stored in browser localStorage. Clearing browser data may clear progress.
- CSV inspection is intentionally basic; it is not a replacement for validating financial or operational datasets.

## Reset progress
Open browser developer tools and run:
`localStorage.removeItem('nisarAnalyticsProgressV1')`
Then refresh the page.

## Current scope
This is a working front-end learning prototype, not a deployed public SaaS product. It has no authentication, cloud sync, payments, or admin backend.

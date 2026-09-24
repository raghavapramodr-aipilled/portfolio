# Raghava Pramod

My personal site, live at **[raghavapramod.com](https://raghavapramod.com)**. It has the photos I've taken (mostly on my phone), a few articles on work and hiring, and the music I've been listening to.

![Home page](screenshots/home.jpg)

## My shots

Photos are grouped by the kind of shot. Hover a focal length on the lens to preview it, and click to open it.

![Lens picker on the My shots page](screenshots/shots-lens.jpg)

| A series, with the story behind it | Full-size viewer |
|---|---|
| ![A photo series](screenshots/shots-series.jpg) | ![Photo viewer](screenshots/shots-viewer.jpg) |

## Articles, Music, Say hi

| Articles | Music | Say hi |
|---|---|---|
| ![Articles page](screenshots/articles.jpg) | ![Music page](screenshots/music.jpg) | ![Contact page](screenshots/contact.jpg) |

## On a phone

![Home, My shots and Music on a phone](screenshots/mobile.jpg)

## How it's built

Plain HTML, CSS and JavaScript, with no framework and no build step.

| File | What it is |
|------|------------|
| `index.html` | Home (About me) |
| `shots.html` | My shots, with the lens picker and photo viewer |
| `articles.html` | Articles |
| `music.html` | Music (Spotify playlists) |
| `contact.html` | Say hi |
| `script.js` | Photo series data and all page behaviour |
| `styles.css` | Styles for every page |
| `images/` | The photos |
| `netlify.toml` | Netlify settings: short page links and image caching |
| `deploy.sh` | Publishes the site |

## Updating the site

Double-click **Update Website** on the Desktop, or run:

```bash
./deploy.sh "what changed"
```

It saves the changes, backs them up to this repo, and publishes the site to Netlify.

## Preview locally

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.

This README and the `screenshots/` folder stay on GitHub only and are never published to the site.

# NordTek Dive Planner

NordTek Dive Planner is a personal scuba planning and gas calculation project created to simplify my own dive planning workflow and dive-related calculations.

The project is publicly accessible because it is hosted online, primarily so I can access it wherever I am. It is continuously evolving, with new features, corrections, and improvements added over time.

## Current Version

Beta v1.6.2

## What It Does

NordTek currently includes:

* Recreational single-dive no-decompression planning
* SAC / RMV calculator
* Gas planning calculator
* MOD calculator
* Best Mix calculator
* Trimix Blender beta
* Basic learning and reference notes
* Mobile-friendly layout
* PWA/service worker caching

## Important Disclaimer

NordTek Dive Planner is not an official dive planning service, certification agency, training platform, commercial product, dive computer, decompression planner, or substitute for proper training and judgment.

Use it only as a calculation aid alongside proper training, gas analysis, dive computers, tables, local procedures, and personal judgment. You are responsible for your own dive decisions.

## Project Direction

The current version keeps recreational dive planning and advanced gas tools separated.

Planned future direction includes:

* More learning and reference content
* Better calculator result summaries
* Local user settings
* Personal SAC/RMV history
* Local dive log prototype
* Saved plans
* Future technical diving tools
* Later code separation into HTML, CSS, and JavaScript files
* Possible user login and dive log imports in a future major version

## Version Notes

For each new release, the visible version, service worker registration version, and cache name should be updated together.

Example:

```js
navigator.serviceWorker.register("/service-worker.js?v=1.6.2");
```

```js
const CACHE_NAME = "nordtek-cache-v1.6.2";
```

This helps browsers fetch the newest live version instead of relying on old cached files.

## Status

This is a personal beta project under active development.

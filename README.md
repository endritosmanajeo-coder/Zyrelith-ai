# ZYRELITH AI — Android-first PWA starter

## What is included
- Mobile-first installable web app shell
- Gemini API chat (requires your own API key and is subject to free-tier limits)
- Optional Google Search grounding toggle (availability depends on selected model, account, and quotas)
- Local chat history and user-editable memory
- Speech input where browser speech recognition is supported
- Hosted AI image/video demo directory links (not an embedded unlimited generator)

## Run it using only your Android phone
1. Install a code editor app such as Acode or use a browser-based static hosting workflow.
2. Upload the contents of this folder to a static host that supports HTTPS, such as a GitHub Pages repository.
3. Open the HTTPS site in Chrome on Android, then use Chrome's menu → Add to Home screen / Install app.
4. Open Settings inside ZYRELITH and add a Gemini API key from https://aistudio.google.com/app/apikey.
5. Start chatting. Toggle Web search for requests that need current information.

## Important security and free-tier limits
- This prototype calls Gemini directly from the browser. The API key is stored in localStorage and is visible to someone who can inspect the browser profile or site code. Do not publish this as a public multi-user service or reuse a valuable key. A production app needs a secure backend/proxy.
- Gemini free-tier models, rate limits, Search grounding quotas, and data-use terms can change. Check https://ai.google.dev/gemini-api/docs/pricing. Do not send confidential information; check current terms.
- LocalStorage memory is only on this browser/device. Clearing browser data can erase it.
- Voice dictation depends on Android/browser support and may send audio to the browser's speech provider.
- Image/video links open hosted model demos. Free availability, queue times, file limits, and model access vary. This app does not claim unlimited free generation.
- A truly on-device high-quality video generator is not realistic on an ordinary Android phone. Open video models generally require substantial GPU memory and compute.
- This is a starter prototype, not a store-ready native APK. An installed PWA provides an app-like home-screen experience without compiling an APK.

## Next development steps
1. Move API calls behind a secure backend before sharing the app.
2. Add a native voice conversation interface.
3. Add an image upload flow to image-to-video providers that explicitly support it.
4. Add a provider adapter for each image/video model only after verifying its free quota and API terms.

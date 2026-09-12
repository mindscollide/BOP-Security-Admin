import "./App.css";
import "./assets/custom-icons/custom-icon.css";
import "@fontsource/montserrat";
import "@fontsource/poppins";
import "@fontsource/roboto";
// import Userreport from "./container/Reports/Userreport";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Routes";
import { Loader } from "./components/elements";
import { NotificationProvider } from "./context/NotificationContext";
import { useEffect, useRef } from "react";
// Matches the entry bundle's <script src="..."> tag in index.html, e.g.
// <script defer="defer" src="/static/js/main.f1587a40.js"></script>
// Deliberately anchored to a .js src so it can't match the <link ...rel="stylesheet">
// tag also present in the built HTML.
const ENTRY_SCRIPT_SRC_REGEX = /<script[^>]+src="([^"]+\.js)"[^>]*>/i;

function App() {
  // Holds the entry bundle path (e.g. "/static/js/main.f1587a40.js") seen on the
  // previous check, so a later check can tell a new deployment landed.
  const entryScriptSrcRef = useRef(null);

  // 🔹 Detect a new deployment and auto-reload.
  // index.html is already unavoidably public (it's what boots the SPA) and the
  // build tool stamps a fresh content hash into its entry <script src> on every
  // build, so it doubles as a version signal for free — no separate, guessable
  // version.json endpoint needed for this.
  useEffect(() => {
    const checkForNewDeployment = async () => {
      try {
        const response = await fetch("/index.html", { cache: "no-cache" });
        const html = await response.text();
        const match = html.match(ENTRY_SCRIPT_SRC_REGEX);

        if (!match) {
          console.error(
            "Deployment check: entry script tag not found in index.html",
          );
          return;
        }

        const entryScriptSrc = match[1];

        if (
          entryScriptSrcRef.current &&
          entryScriptSrcRef.current !== entryScriptSrc
        ) {
          // 🔹 New deployment detected — clear caches (service workers / Cache API)
          // and reload so the user picks up the new bundle instead of a stale one.
          if ("caches" in window) {
            const cacheNames = await caches.keys();
            await Promise.all(cacheNames.map((name) => caches.delete(name)));
          }
          window.location.reload();
          return;
        }

        entryScriptSrcRef.current = entryScriptSrc;
      } catch (err) {
        console.error("Deployment check failed:", err);
      }
    };

    checkForNewDeployment();
    const interval = setInterval(checkForNewDeployment, 30000); // check every 30 sec
    return () => clearInterval(interval);
  }, []);

  return (
    <NotificationProvider>
      <RouterProvider router={router} />
      <Loader />
    </NotificationProvider>
  );
}

export default App;

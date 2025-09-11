import "./App.css";
import "./assets/custom-icons/custom-icon.css";
import "@fontsource/montserrat";
import "@fontsource/poppins";
import "@fontsource/roboto";
// import Userreport from "./container/Reports/Userreport";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Routes";
import { Loader } from "./components/elements";
import { useEffect, useRef } from "react";
function App() {
  const currentVersion = useRef(null);
  // 🔹 Auto-update page when version.json changes
  useEffect(() => {
    const checkVersion = async () => {
      try {
        const response = await fetch("/version.json", { cache: "no-cache" }); // ✅ root path

        const data = await response.json();

        console.log(data, currentVersion.current, "version");

        if (currentVersion.current && currentVersion.current !== data.version) {
          // 🔹 Clear browser caches (for service workers / cache API)
          if ("caches" in window) {
            caches.keys().then((names) => {
              for (let name of names) {
                caches.delete(name);
              }
            });
          }
          window.location.reload(true); // force reload
        }

        currentVersion.current = data.version;
      } catch (err) {
        console.error("Error checking version.json:", err);
      }
    };

    checkVersion();
    const interval = setInterval(checkVersion, 30000); // check every 30 sec
    return () => clearInterval(interval);
  }, []);

  return (
    <RouterProvider router={router}>
      <Loader />
    </RouterProvider>
  );
}

export default App;

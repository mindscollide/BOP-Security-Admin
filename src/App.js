import "./App.css";
import "./assets/custom-icons/custom-icon.css";
import "@fontsource/montserrat";
import "@fontsource/poppins";
import "@fontsource/roboto";
// import Userreport from "./container/Reports/Userreport";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Routes";
function App() {
  return <RouterProvider router={router} />;
}

export default App;

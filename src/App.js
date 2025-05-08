import logo from "./logo.svg";
import "./App.css";
import "./assets/custom-icons/custom-icon.css";
import "@fontsource/roboto"; // default to weight 400
import "@fontsource/roboto/100.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css"; // regular
import "@fontsource/roboto/500.css"; // medium
import "@fontsource/roboto/700.css"; // bold
import "@fontsource/roboto/900.css";
import Header from "./components/layout/Header/Header";
import Sidebar from "./components/layout/Sidebar/Sidebar";
import Userreport from "./container/Reports/Userreport";
import { useContext, useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Routes";
import { useMqtt } from "./context/MQTTContext";
function App() {
  const { isConnected, bankUserRequested } = useMqtt();
  console.log(bankUserRequested, isConnected, "lastMessageslastMessages");
  console.log("App component rendered", isConnected);
  return <RouterProvider router={router} />;
}

export default App;

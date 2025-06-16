import logo from "./logo.svg";
import "./App.css";
import "./assets/custom-icons/custom-icon.css";
import "@fontsource/montserrat";
import "@fontsource/poppins";
import "@fontsource/roboto";
import Header from "./components/layout/Header/Header";
import Sidebar from "./components/layout/Sidebar/Sidebar";
// import Userreport from "./container/Reports/Userreport";
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

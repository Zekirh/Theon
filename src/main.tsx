import { createRoot } from "react-dom/client";

import App from "./App.tsx";
import "./index.css";
import "./lib/firebase"; // Initialize Firebase (app + analytics)

createRoot(document.getElementById("root")!).render(<App />);

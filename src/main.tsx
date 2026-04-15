import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { gsap } from "gsap";
import { loadRuntimeConfig } from '@/lib/runtimeConfig';

gsap.registerPlugin(ScrollTrigger);

// Load runtime config (if present) before mounting the app so API_BASE can be updated
(async function bootstrap() {
	try {
		await loadRuntimeConfig();
	} catch (e) {
		// ignore — runtimeConfig handles its own errors
	}
	createRoot(document.getElementById("root")!).render(<App />);
})();

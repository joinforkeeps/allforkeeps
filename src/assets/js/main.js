import AOS from "aos";

function readSavedTheme() {
	try {
		return localStorage.getItem("dark_mode") === "true";
	} catch {
		return document.documentElement.classList.contains("dark");
	}
}

function applyTheme(isDark, persist = false) {
	const root = document.documentElement;

	root.classList.toggle("dark", isDark);
	root.style.colorScheme = isDark ? "dark" : "light";
	window.darkMode = isDark;

	if (persist) {
		try {
			localStorage.setItem("dark_mode", String(isDark));
		} catch {
			// The theme still works when browser storage is unavailable.
		}
	}
}

function initSite() {
	applyTheme(readSavedTheme());

	const themeToggle = document.getElementById("darkToggle");

	if (themeToggle && !themeToggle.dataset.themeBound) {
		themeToggle.dataset.themeBound = "true";

		themeToggle.addEventListener("click", () => {
			applyTheme(
				!document.documentElement.classList.contains("dark"),
				true,
			);
		});
	}

	const header = document.getElementById("header");
	const container = header?.firstElementChild;

	const stickyClasses = [
		"shadow-[0px_1px_4px_0_rgba(25,33,61,0.06)]",
		"rounded-[20px]",
		"bg-[#ffffff]/65",
		"border-[#ffffff]/65",
		"dark:border-neutral-600/40",
		"dark:bg-neutral-900/60",
		"backdrop-blur-2xl",
		"backdrop-brightness-120",
	];

	const plainClasses = [
		"shadow-none",
		"border-transparent",
		"rounded-none",
		"bg-transparent",
	];

	function updateHeader() {
		if (!container) return;

		const isSticky = window.scrollY > 48;

		container.classList.remove(
			...(isSticky ? plainClasses : stickyClasses),
		);

		container.classList.add(
			...(isSticky ? stickyClasses : plainClasses),
		);
	}

	updateHeader();
	window.addEventListener("scroll", updateHeader, { passive: true });

	for (const link of document.querySelectorAll("#menu a")) {
		if (link.pathname === window.location.pathname) {
			link.classList.add("text-neutral-900", "dark:text-white");
			link.setAttribute("aria-current", "page");
		}
	}

	AOS.init({
		duration: 400,
		easing: "ease-out-cubic",
		once: true,
		offset: 20,
		delay: 0,
		disable: () =>
			window.matchMedia("(prefers-reduced-motion: reduce)").matches,
	});
}

if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", initSite, { once: true });
} else {
	initSite();
}
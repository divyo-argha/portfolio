"use client";

import { useEffect, useState } from "react";
import { IconMoon, IconSun } from "@/components/primitives/Icons";
import { THEME_STORAGE_KEY } from "@/lib/theme";
import styles from "./ThemeToggle.module.css";

type Theme = "light" | "dark";

function getSystemTheme(): Theme {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    // Deferred a tick rather than set synchronously: the pre-hydration script
    // already painted the right theme via CSS, this only syncs the icon.
    const timeout = setTimeout(() => {
      const current = document.documentElement.getAttribute("data-theme") as Theme | null;
      setTheme(current ?? getSystemTheme());
    }, 0);
    return () => clearTimeout(timeout);
  }, []);

  function toggle() {
    const next: Theme = (theme ?? getSystemTheme()) === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Storage may be unavailable (private browsing) — theme just won't persist.
    }
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      className={styles.toggle}
      aria-pressed={isDark}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
    >
      {isDark ? <IconSun /> : <IconMoon />}
    </button>
  );
}

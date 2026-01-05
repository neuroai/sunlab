/**
 * Sun Lab - Theme Toggle
 * Handles light/dark mode switching with localStorage persistence
 * and system preference detection
 */

(function() {
  'use strict';

  const THEME_KEY = 'theme';
  const DARK = 'dark';
  const LIGHT = 'light';

  // Get the theme toggle button
  const themeToggle = document.querySelector('.theme-toggle');

  if (!themeToggle) return;

  /**
   * Get the current theme from localStorage or system preference
   */
  function getPreferredTheme() {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored) return stored;

    // Default to light mode
    return LIGHT;
  }

  /**
   * Set the theme on the document
   */
  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);

    // Update aria attributes for accessibility
    const isDark = theme === DARK;
    const label = isDark ? 'Switch to light mode' : 'Switch to dark mode';
    themeToggle.setAttribute('aria-label', label);
    themeToggle.setAttribute('aria-checked', isDark.toString());
  }

  /**
   * Toggle between light and dark themes
   */
  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === DARK ? LIGHT : DARK;
    setTheme(next);
  }

  // Initialize theme
  setTheme(getPreferredTheme());

  // Handle toggle click
  themeToggle.addEventListener('click', toggleTheme);

  // Handle keyboard
  themeToggle.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleTheme();
    }
  });

  // Listen for system preference changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
    // Only update if user hasn't manually set a preference
    if (!localStorage.getItem(THEME_KEY)) {
      setTheme(e.matches ? DARK : LIGHT);
    }
  });

})();

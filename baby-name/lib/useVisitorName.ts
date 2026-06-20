"use client";

import { useCallback, useEffect, useState } from "react";

const KEY = "babyName.visitor";

/**
 * Remembers who the visitor is across pages (and reloads) using localStorage,
 * so we only ever ask for their name once.
 */
export function useVisitorName() {
  const [name, setNameState] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(KEY);
      if (stored) setNameState(stored);
    } catch {
      /* ignore (e.g. private mode) */
    }
    setReady(true);
  }, []);

  const setName = useCallback((value: string) => {
    setNameState(value);
    try {
      const trimmed = value.trim();
      if (trimmed) localStorage.setItem(KEY, trimmed);
      else localStorage.removeItem(KEY);
    } catch {
      /* ignore */
    }
  }, []);

  const clearName = useCallback(() => {
    setNameState("");
    try {
      localStorage.removeItem(KEY);
    } catch {
      /* ignore */
    }
  }, []);

  return { name, setName, clearName, ready };
}

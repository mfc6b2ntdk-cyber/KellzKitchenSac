import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return reduced;
}

export const SLIDE_EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

/** Fade the current view out, swap the value, fade back in. Interruptible. */
export function useDeferredSwap<T>(value: T, ms = 200) {
  const reduced = usePrefersReducedMotion();
  const [shown, setShown] = useState(value);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (Object.is(value, shown)) return;
    if (reduced) {
      setShown(value);
      setVisible(true);
      return;
    }
    setVisible(false);
    const t = window.setTimeout(() => {
      setShown(value);
      requestAnimationFrame(() => setVisible(true));
    }, ms);
    return () => window.clearTimeout(t);
  }, [value, shown, reduced, ms]);

  return { shown, visible };
}

/**
 * Overlay carousel state: the outgoing slide keeps fading while the next
 * one sits parked off-canvas for one frame, then slides over it.
 */
export function useDirectedIndex(count: number, initial = 0) {
  const [index, setIndex] = useState(initial);
  const [dir, setDir] = useState<1 | -1>(1);
  const [leaving, setLeaving] = useState<number | null>(null);
  const [arming, setArming] = useState(false);
  const indexRef = useRef(initial);
  const reduced = usePrefersReducedMotion();

  const go = useCallback(
    (next: number) => {
      const n = ((next % count) + count) % count;
      const current = indexRef.current;
      if (n === current) return;
      const forward = (n - current + count) % count;
      const backward = (current - n + count) % count;
      setDir(forward <= backward ? 1 : -1);
      setLeaving(reduced ? null : current);
      indexRef.current = n;
      setIndex(n);
      if (!reduced) setArming(true);
    },
    [count, reduced],
  );

  useEffect(() => {
    if (!arming) return;
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => setArming(false));
    });
    return () => cancelAnimationFrame(id);
  }, [arming]);

  useEffect(() => {
    if (leaving === null) return;
    const t = window.setTimeout(() => setLeaving(null), 980);
    return () => window.clearTimeout(t);
  }, [leaving]);

  return { index, dir, leaving, arming, go };
}

export function overlayClass(
  i: number,
  index: number,
  leaving: number | null,
  dir: 1 | -1,
  axis: "x" | "y" = "x",
  arming = false,
) {
  const state =
    i === index
      ? arming
        ? "is-parked"
        : "is-on"
      : i === leaving
        ? "is-leaving"
        : "is-parked";
  const direction = dir === 1 ? "dir-next" : "dir-prev";
  const axisClass = axis === "y" ? "axis-y" : "axis-x";
  return `overlay-slide ${state} ${direction} ${axisClass}`;
}

/** Sliding highlight behind the [data-pill=true] child. */
export function useSlidingPill(active: string | number) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [pill, setPill] = useState({
    x: 0,
    y: 0,
    w: 0,
    h: 0,
    ready: false,
  });

  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const measure = () => {
      const el = wrap.querySelector<HTMLElement>("[data-pill='true']");
      if (!el) {
        setPill((p) => ({ ...p, ready: false }));
        return;
      }
      const wr = wrap.getBoundingClientRect();
      const er = el.getBoundingClientRect();
      setPill({
        x: Math.round(er.left - wr.left + wrap.scrollLeft),
        y: Math.round(er.top - wr.top + wrap.scrollTop),
        w: Math.round(er.width),
        h: Math.round(er.height),
        ready: true,
      });
    };

    measure();
    const onFont = () => measure();
    void document.fonts?.ready.then(onFont);
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(measure);
    });
    const ro = new ResizeObserver(measure);
    ro.observe(wrap);
    for (const child of wrap.children) {
      if (child instanceof HTMLElement) ro.observe(child);
    }
    wrap.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      wrap.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, [active]);

  return { wrapRef, pill };
}

/** Interruptible count that eases toward the latest value. */
export function useAnimatedNumber(value: number, duration = 520) {
  const reduced = usePrefersReducedMotion();
  const [shown, setShown] = useState(value);
  const shownRef = useRef(value);

  useEffect(() => {
    if (reduced) {
      shownRef.current = value;
      setShown(value);
      return;
    }
    const from = shownRef.current;
    const to = value;
    if (from === to) return;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const e = 1 - (1 - t) ** 3;
      const next = from + (to - from) * e;
      shownRef.current = next;
      setShown(next);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, reduced, duration]);

  return shown;
}

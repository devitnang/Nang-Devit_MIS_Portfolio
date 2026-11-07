import * as React from "react";

export type IndicatorRect = {
  left: number;
  top: number;
  width: number;
  height: number;
};

/**
 * Tracks the layout bounding rectangle of the currently active child matching `selector`
 * relative to the container element referenced by `containerRef`.
 */
export function useActiveIndicator(
  containerRef: React.RefObject<HTMLElement | null>,
  selector: string
): IndicatorRect | null {
  const [rect, setRect] = React.useState<IndicatorRect | null>(null);

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const update = () => {
      const activeEl = container.querySelector(selector) as HTMLElement | null;
      if (!activeEl) {
        setRect(null);
        return;
      }

      const containerRect = container.getBoundingClientRect();
      const elRect = activeEl.getBoundingClientRect();

      setRect({
        left: elRect.left - containerRect.left,
        top: elRect.top - containerRect.top,
        width: elRect.width,
        height: elRect.height,
      });
    };

    // Initial measurement
    update();

    // Use requestAnimationFrame for smooth hydration
    const rafId = requestAnimationFrame(update);

    // Watch for size changes
    const resizeObserver = new ResizeObserver(() => {
      update();
    });
    resizeObserver.observe(container);

    // Watch for active state DOM attribute changes
    const mutationObserver = new MutationObserver(() => {
      update();
    });
    mutationObserver.observe(container, {
      attributes: true,
      subtree: true,
      attributeFilter: ["aria-current", "class"],
    });

    window.addEventListener("resize", update, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      mutationObserver.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [containerRef, selector]);

  return rect;
}


import "@testing-library/jest-dom/vitest";
import { createElement, forwardRef, type ReactNode } from "react";
import { vi } from "vitest";

vi.mock("motion/react", () => {
  const motion = new Proxy(
    {},
    {
      get: (_target, tag: string) =>
        forwardRef<HTMLElement, Record<string, unknown> & { children?: ReactNode }>(
          ({ children, initial: _initial, animate: _animate, exit: _exit, transition: _transition, whileInView: _whileInView, viewport: _viewport, ...props }, ref) =>
            createElement(tag, { ...props, ref }, children),
        ),
    },
  );

  return {
    m: motion,
    motion,
    AnimatePresence: ({ children }: { children: ReactNode }) => children,
    MotionConfig: ({ children }: { children: ReactNode }) => children,
    useReducedMotion: () => true,
  };
});

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => undefined,
    removeListener: () => undefined,
    addEventListener: () => undefined,
    removeEventListener: () => undefined,
    dispatchEvent: () => false,
  }),
});

class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

Object.defineProperty(window, "ResizeObserver", {
  writable: true,
  value: ResizeObserverMock,
});

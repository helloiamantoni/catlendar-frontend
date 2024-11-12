"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { WalkingCat } from "./cat/Walk";

export function MouseTracker() {
  const position = useMousePosition();
  const delayedPosition = useThrottle(position, 500);

  return (
    <div
      style={{
        position: "absolute",
        top: delayedPosition.y,
        left: delayedPosition.x,
        transition: "all 0.5s",
      }}
    >
      <WalkingCat />
    </div>
  );
}

function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return position;
}

export function useDebounce<T>(value: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
}

const getRemainingTime = (lastTriggeredTime: number, throttleMs: number) => {
  const elapsedTime = Date.now() - lastTriggeredTime;
  const remainingTime = throttleMs - elapsedTime;

  return remainingTime < 0 ? 0 : remainingTime;
};

function useThrottle<T>(value: T, throttleMs: number) {
  const [throttledValue, setThrottledValue] = useState(value);
  const lastTriggered = useRef(Date.now());
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const cancel = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  useEffect(() => {
    let remainingTime = getRemainingTime(lastTriggered.current, throttleMs);

    if (remainingTime === 0) {
      lastTriggered.current = Date.now();
      setThrottledValue(value);
      cancel();
    } else if (!timeoutRef.current) {
      timeoutRef.current = setTimeout(() => {
        remainingTime = getRemainingTime(lastTriggered.current, throttleMs);

        if (remainingTime === 0) {
          lastTriggered.current = Date.now();
          setThrottledValue(value);
          cancel();
        }
      }, remainingTime);
    }

    return cancel;
  }, [cancel, throttleMs, value]);

  return throttledValue;
}

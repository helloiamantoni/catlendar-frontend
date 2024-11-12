import { useEffect, useMemo } from "react";
import { useState } from "react";

interface Props {
  src: string;

  frameWidth: number;
  frameHeight: number;
  frameCount: number;
  frameCountPerRow: number;
  frameHorizontalGap: number;
  frameVerticalGap: number;
  /** @default 100 (ms) */
  frameInterval?: number;

  style?: React.CSSProperties;
}
export function SpriteAnimation({
  src,
  frameWidth,
  frameHeight,
  frameCount,
  frameCountPerRow,
  frameHorizontalGap,
  frameVerticalGap,
  frameInterval = 100,
  style,
}: Props) {
  const [currentFrame, setCurrentFrame] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFrame((prev) => (prev + 1) % frameCount);
    }, frameInterval);
    return () => clearInterval(interval);
  }, [frameCount, frameInterval]);

  const backgroundPosition = useMemo(() => {
    const row = Math.floor(currentFrame / frameCountPerRow);
    const column = currentFrame % frameCountPerRow;
    return `${-column * (frameWidth + frameHorizontalGap)}px ${
      -row * (frameHeight + frameVerticalGap)
    }px`;
  }, [
    currentFrame,
    frameCountPerRow,
    frameHorizontalGap,
    frameHeight,
    frameVerticalGap,
    frameWidth,
  ]);

  return (
    <div
      style={{
        width: `${frameWidth}px`,
        height: `${frameHeight}px`,
        backgroundImage: `url(${src})`,
        backgroundPosition,
        ...style,
      }}
    ></div>
  );
}

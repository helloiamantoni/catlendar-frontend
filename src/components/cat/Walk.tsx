import { RUSSIAN_BLUE__WALK } from "@/constants/catSpriteImages";
import { SpriteAnimation } from "../SpriteAnimation";

export function WalkingCat() {
  return (
    <SpriteAnimation
      src={RUSSIAN_BLUE__WALK}
      frameWidth={170}
      frameHeight={72}
      frameCount={11}
      frameCountPerRow={3}
      frameHorizontalGap={2}
      frameVerticalGap={46}
      style={{ scale: 1.5 }}
    />
  );
}

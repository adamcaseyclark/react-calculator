import { PI } from "../../../constants/values";

// CALCULATOR CONVERTS DEGREES TO RADIANS BEFORE CALCULATING
// FOR sine, cosine, and tan

export function degrees(radians) {
  return radians * (180 / PI);
}

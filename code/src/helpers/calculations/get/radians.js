import { PI } from "../../../constants/values";

// CALCULATOR CONVERTS DEGREES TO RADIANS BEFORE CALCULATING
// FOR sine, cosine, and tan

export function radians(degrees) {
  return (Number(PI) / 180) * degrees;
}

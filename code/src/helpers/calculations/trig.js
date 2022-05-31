import { TextConstants } from "../../constants/text";
import { PI } from "../../constants/values";

export function trig({ current, previous, operator }, key, isRadians) {
  const numberToUse = isRadians
    ? Number(current)
    : ((Number(current) * Number(PI)) / 180).toFixed(6);

  switch (key) {
    case TextConstants.SINE:
      return Math.sin(numberToUse).toString();
    case TextConstants.COSINE:
      return Math.cos(numberToUse).toString();
    case TextConstants.TANGENT:
      return Math.tan(numberToUse).toString();
    case TextConstants.INVERSE_SINE:
      return Math.asin(numberToUse).toString();
    case TextConstants.INVERSE_COSINE:
      return Math.acos(numberToUse).toString();
    case TextConstants.INVERSE_TANGENT:
      return Math.atan(numberToUse).toString();
    case TextConstants.HYPERBOLIC_SINE:
      return Math.sinh(numberToUse).toString();
    case TextConstants.HYPERBOLIC_COSINE:
      return Math.cosh(numberToUse).toString();
    case TextConstants.HYPERBOLIC_TANGENT:
      return Math.tanh(numberToUse).toString();
    case TextConstants.INVERSE_HYPERBOLIC_SINE:
      return Math.asinh(numberToUse).toString();
    case TextConstants.INVERSE_HYPERBOLIC_COSINE:
      return Math.acosh(numberToUse).toString();
    case TextConstants.INVERSE_HYPERBOLIC_TANGENT:
      return Math.atanh(numberToUse).toString();
  }
}

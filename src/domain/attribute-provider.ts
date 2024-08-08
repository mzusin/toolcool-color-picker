/**
 * Provides consistent handling of the show-alpha attribute.
 * Returns true if attr is not one of "false" or "0".
 */
export const castShowAlphaAttribute = (attr: string | null): boolean => {
  return attr !== "false" && attr !== "0";
};

/**
 * Formats a number as a USD currency string (e.g., "$4.99").
 */
export const formatCurrency = (amount: number): string => {
  return amount.toFixed(2);
};

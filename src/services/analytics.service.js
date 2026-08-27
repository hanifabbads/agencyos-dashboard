/**
 * AgencyOS — Analytics & Finance Service Abstraction
 *
 * Revenue trends, invoices, category metrics and currency formatters.
 */

import {
  monthlyRevenueData,
  categoryBreakdownData,
  overduePaymentsList,
  parseCurrencyValue,
  formatIndonesianCurrency,
} from '../data/demo/finance.data';

export function getRevenueTrend() {
  return monthlyRevenueData;
}

export function getCategoryBreakdown() {
  return categoryBreakdownData;
}

export function getOverduePayments() {
  return overduePaymentsList;
}

export { parseCurrencyValue, formatIndonesianCurrency };

export default {
  getRevenueTrend,
  getCategoryBreakdown,
  getOverduePayments,
  parseCurrencyValue,
  formatIndonesianCurrency,
};

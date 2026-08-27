/**
 * AgencyOS — Demo Finance & Analytics Data
 *
 * Revenue overview, overdue invoices, category mix, and KPI metric defaults.
 */

export const monthlyRevenueData = [
  { month: 'Mar', revenue: 'Rp 0', outstanding: 'Rp 0', revVal: 0, outVal: 0 },
  { month: 'Apr', revenue: 'Rp 0', outstanding: 'Rp 0', revVal: 0, outVal: 0 },
  { month: 'May', revenue: 'Rp 120.000.000', outstanding: 'Rp 80.000.000', revVal: 0.12, outVal: 0.08 },
  { month: 'Jun', revenue: 'Rp 1.850.000.000', outstanding: 'Rp 720.000.000', revVal: 1.85, outVal: 0.72 },
  { month: 'Jul', revenue: 'Rp 4.015.249.993', outstanding: 'Rp 4.387.416.664', revVal: 4.015, outVal: 4.387 },
  { month: 'Aug', revenue: 'Rp 0', outstanding: 'Rp 0', revVal: 0, outVal: 0 },
];

export const categoryBreakdownData = [
  { name: 'Branding', fullName: 'Branding', count: 8, revenue: 'Rp 1.7 M', color: '#FF9352' },
  { name: 'Web Development', fullName: 'Web Development', count: 8, revenue: 'Rp 911 jt', color: '#00D500' },
  { name: 'Social Media Design', fullName: 'Social Media Design', count: 13, revenue: 'Rp 872 jt', color: '#FDB022' },
  { name: 'Digital Marketing', fullName: 'Digital Marketing', count: 9, revenue: 'Rp 711 jt', color: '#6E64DE' },
  { name: 'Mobile App Development', fullName: 'Mobile App Development', count: 9, revenue: 'Rp 510 jt', color: '#95BAEB' },
  { name: 'UI/UX Design', fullName: 'UI/UX Design', count: 5, revenue: 'Rp 465 jt', color: '#F14437' },
];

export const overduePaymentsList = [
  { id: 1, title: 'Project Z — Digital Marketing', client: 'Petani Mandiri', due: 'Due 6 Nov 2026', amount: 'Rp 3.000.000', overdueText: '84d overdue' },
  { id: 2, title: 'Project B — Digital Marketing', client: 'Oase Travel', due: 'Due 4 Nov 2026', amount: 'Rp 165.000.000', overdueText: '82d overdue' },
  { id: 3, title: 'Project A — Digital Marketing', client: 'Quantum Finance', due: 'Due 4 Nov 2026', amount: 'Rp 145.000.000', overdueText: '82d overdue' },
  { id: 4, title: 'Project C — Social Media Design', client: 'Petani Mandiri', due: 'Due 13 Oct 2026', amount: 'Rp 218.000.000', overdueText: '60d overdue' },
  { id: 5, title: 'Project R — UI/UX Design', client: 'Oase Travel', due: 'Due 13 Oct 2026', amount: 'Rp 75.000.000', overdueText: '60d overdue' },
  { id: 6, title: 'Project L — Web Development', client: 'Lentera Pendidikan', due: 'Due 13 Oct 2026', amount: 'Rp 70.666.666', overdueText: '60d overdue' },
  { id: 7, title: 'Project A — Digital Marketing', client: 'Mahakam Properti', due: 'Due 9 Oct 2026', amount: 'Rp 243.000.000', overdueText: '56d overdue' },
  { id: 8, title: 'Project J — Social Media Design', client: 'Kota Sehat Klinik', due: 'Due 29 Sept 2026', amount: 'Rp 149.000.000', overdueText: '46d overdue' },
];

export function parseCurrencyValue(str) {
  if (!str) return 0;
  const digits = String(str).replace(/[^\d]/g, '');
  return digits ? parseInt(digits, 10) : 0;
}

export function formatIndonesianCurrency(amount) {
  if (!amount || amount <= 0) return 'Rp 0';
  if (amount >= 1000000000) {
    const formatted = (amount / 1000000000).toFixed(1);
    return `Rp ${formatted} M`;
  }
  if (amount >= 1000000) {
    const formatted = Math.round(amount / 1000000);
    return `Rp ${formatted} jt`;
  }
  return `Rp ${amount.toLocaleString('id-ID')}`;
}

export default {
  monthlyRevenueData,
  categoryBreakdownData,
  overduePaymentsList,
  parseCurrencyValue,
  formatIndonesianCurrency,
};

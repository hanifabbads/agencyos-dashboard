/**
 * AgencyOS — Demo Deadlines & Alerts Data
 *
 * Upcoming deadlines, alert items, and date calculation utilities.
 */

export const dashboardDeadlines = [
  { daysLeft: 24, label: 'Project X — E-Commerce Integration', sub: 'Prima Niaga Labs', color: '#EF4444' },
  { daysLeft: 35, label: 'Project V — Cloud Migration', sub: 'Solusi Digital', color: '#EF4444' },
  { daysLeft: 48, label: 'Project T — Web Development', sub: 'Teknologi Muria', color: '#F97316' },
  { daysLeft: 57, label: 'Project O — Web Development', sub: 'Bu n Ribu Organic', color: '#F97316' },
  { daysLeft: 61, label: 'Project E — Branding', sub: 'Plan Teknologi', color: '#F97316' },
  { daysLeft: 65, label: 'Project F — Mobile App Development', sub: 'Geos Natalenta', color: '#0C61CF' },
  { daysLeft: 69, label: 'Project J — Branding', sub: 'Aginka Coffee', color: '#0C61CF' },
  { daysLeft: 75, label: 'Project N — Mobile App Development', sub: 'Djawa Organic', color: '#0C61CF' },
  { daysLeft: 75, label: 'Project C — Social Media Design', sub: 'Studio Kreatif Studio', color: '#0C61CF' },
];

export const deadlinesAlertsList = [
  { id: 1, title: 'Project Overdue', desc: 'Project C is overdue', time: '20 Jul 2026', type: 'overdue' },
  { id: 2, title: 'Project Overdue', desc: 'Project H is overdue', time: '20 Jul 2026', type: 'overdue' },
  { id: 3, title: 'Project At Risk', desc: 'Project G is at_risk', time: '20 Jul 2026', type: 'at_risk' },
  { id: 4, title: 'Project At Risk', desc: 'Project N is at_risk', time: '20 Jul 2026', type: 'at_risk' },
  { id: 5, title: 'Project Overdue', desc: 'Project M is overdue', time: '20 Jul 2026', type: 'overdue' },
  { id: 6, title: 'Project Overdue', desc: 'Project T is overdue', time: '20 Jul 2026', type: 'overdue' },
];

export const calculateDueIn = (deadlineStr, statusStr) => {
  const monthMap = {
    'januari': 0, 'jan': 0,
    'februari': 1, 'feb': 1,
    'maret': 2, 'mar': 2,
    'april': 3, 'apr': 3,
    'mei': 4,
    'juni': 5, 'jun': 5,
    'juli': 6, 'jul': 6,
    'agustus': 7, 'agu': 7, 'aug': 7,
    'september': 8, 'sep': 8,
    'oktober': 9, 'okt': 9, 'oct': 9,
    'november': 10, 'nov': 10,
    'desember': 11, 'des': 11, 'dec': 11,
  };

  if (deadlineStr) {
    const parts = deadlineStr.trim().split(' ');
    if (parts.length === 3) {
      const day = parseInt(parts[0], 10);
      const monthKey = parts[1].toLowerCase();
      const month = monthMap[monthKey] !== undefined ? monthMap[monthKey] : 0;
      const year = parseInt(parts[2], 10);
      const deadlineDate = new Date(year, month, day);
      const today = new Date();

      deadlineDate.setHours(0, 0, 0, 0);
      const todayZero = new Date(today.getFullYear(), today.getMonth(), today.getDate());

      const diffTime = deadlineDate.getTime() - todayZero.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays < 0) {
        return { text: `${Math.abs(diffDays)}d Overdue`, type: 'overdue' };
      } else if (diffDays === 0) {
        return { text: 'Due Today', type: 'today' };
      } else {
        const s = statusStr?.toLowerCase() || '';
        return { text: `${diffDays}d Left`, type: s === 'at risk' ? 'at_risk' : 'left' };
      }
    }
  }

  const s = statusStr?.toLowerCase() || '';
  if (s === 'overdue') return { text: '27d Overdue', type: 'overdue' };
  if (s === 'at risk') return { text: '5d Left', type: 'at_risk' };
  return { text: '12d Left', type: 'left' };
};

export default {
  dashboardDeadlines,
  deadlinesAlertsList,
  calculateDueIn,
};

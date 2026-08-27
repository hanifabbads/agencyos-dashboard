/**
 * AgencyOS — Demo Notifications Data
 *
 * In-app notifications with risk severity and timestamps.
 */

export const notificationItems = [
  {
    id: 1,
    type: 'overdue',
    title: 'Project Overdue',
    sub: 'Project C is overdue',
    date: '20 Jul 2026',
    bg: 'var(--fg-error-transparent, #FEF2F2)',
    color: 'var(--icon-color-error, #D92D20)',
    iconType: 'alert-triangle',
  },
  {
    id: 2,
    type: 'overdue',
    title: 'Project Overdue',
    sub: 'Project H is overdue',
    date: '20 Jul 2026',
    bg: 'var(--fg-error-transparent, #FEF2F2)',
    color: 'var(--icon-color-error, #D92D20)',
    iconType: 'alert-triangle',
  },
  {
    id: 3,
    type: 'at_risk',
    title: 'Project At Risk',
    sub: 'Project G is at_risk',
    date: '20 Jul 2026',
    bg: 'var(--fg-warning-transparent, #FFFAEB)',
    color: 'var(--icon-color-warning, #DC6803)',
    iconType: 'clock',
  },
  {
    id: 4,
    type: 'at_risk',
    title: 'Project At Risk',
    sub: 'Project N is at_risk',
    date: '20 Jul 2026',
    bg: 'var(--fg-warning-transparent, #FFFAEB)',
    color: 'var(--icon-color-warning, #DC6803)',
    iconType: 'clock',
  },
  {
    id: 5,
    type: 'completed',
    title: 'Project Completed',
    sub: 'Project A — Digital Marketing was completed',
    date: '18 Jul 2026',
    bg: 'var(--fg-success-transparent, #ECFDF3)',
    color: 'var(--icon-color-success, #067647)',
    iconType: 'check-circle',
  },
  {
    id: 6,
    type: 'upcoming',
    title: 'Upcoming Deadline',
    sub: 'Project X deadline is in 24 days',
    date: '17 Jul 2026',
    bg: 'var(--fg-info-transparent, #EFF6FF)',
    color: 'var(--icon-color-info, #0C61CF)',
    iconType: 'bell',
  },
];

export default notificationItems;

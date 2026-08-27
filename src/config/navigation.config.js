/**
 * AgencyOS — Navigation Configuration
 *
 * Central configuration for sidebar navigation items, route keys,
 * and page titles.
 */

export const navItems = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    icon: 'IconDashboard',
    hash: '#/dashboard',
  },
  {
    key: 'projects',
    label: 'Projects',
    icon: 'IconProjects',
    hash: '#/projects',
  },
  {
    key: 'team',
    label: 'Team',
    icon: 'IconTeam',
    hash: '#/team',
  },
  {
    key: 'deadlines',
    label: 'Deadlines',
    icon: 'IconDeadlines',
    hash: '#/deadlines',
    badgeKey: 'deadlinesCount',
  },
];

export const pageTitles = {
  dashboard: 'Dashboard',
  projects: 'Projects',
  team: 'Team',
  deadlines: 'Deadlines & Alerts',
  projectDetails: 'Project Details',
  signIn: 'Sign In',
  signUp: 'Register Account',
  landing: 'Home',
};

export default {
  navItems,
  pageTitles,
};

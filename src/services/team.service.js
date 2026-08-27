/**
 * AgencyOS — Team Service Abstraction
 *
 * Provides team member and project manager data retrieval and capacity calculations.
 */

import { projectManagersData, teamMembersData, dashboardTeamWorkload, recentActivityData } from '../data/demo/team.data';

export function getProjectManagers() {
  return projectManagersData;
}

export function getTeamMembers() {
  return teamMembersData;
}

export function getTeamWorkload() {
  return dashboardTeamWorkload;
}

export function getRecentActivity() {
  return recentActivityData;
}

export default {
  getProjectManagers,
  getTeamMembers,
  getTeamWorkload,
  getRecentActivity,
};

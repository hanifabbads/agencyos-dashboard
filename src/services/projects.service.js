/**
 * AgencyOS — Projects Service Abstraction
 *
 * Provides CRUD operations and KPI calculation for agency projects.
 * Supports persistent local storage in demo mode and ready for cloud backend integration.
 */

import { appConfig } from '../config/app.config';
import { all300Projects } from '../data/demo/projects.data';
import { overduePaymentsList, parseCurrencyValue, formatIndonesianCurrency } from '../data/demo/finance.data';

const STORAGE_KEY = appConfig.storageKeys.projects;

/**
 * Fetch all projects (from local storage if customized, or default demo data)
 */
export function getProjects() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Failed to load projects from storage:', e);
  }
  return all300Projects;
}

/**
 * Persist projects list to local storage
 */
export function saveProjects(projectsList) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projectsList));
  } catch (e) {
    console.warn('Failed to save projects to storage:', e);
  }
}

/**
 * Create a new project
 */
export function createProject(projectData, currentProjectsList) {
  const list = currentProjectsList || getProjects();
  const newProject = {
    id: Date.now(),
    name: projectData.name,
    client: projectData.client,
    category: projectData.category,
    status: projectData.status || 'Active',
    statusColor:
      projectData.status === 'Completed'
        ? '#067647'
        : projectData.status === 'Overdue'
        ? '#D92D20'
        : projectData.status === 'At Risk'
        ? '#DC6803'
        : projectData.status === 'Planning'
        ? '#717680'
        : '#0C61CF',
    statusBg:
      projectData.status === 'Completed'
        ? '#ECFDF3'
        : projectData.status === 'Overdue'
        ? '#FEF2F2'
        : projectData.status === 'At Risk'
        ? '#FFFAEB'
        : projectData.status === 'Planning'
        ? '#F4F5F7'
        : '#EFF6FF',
    pmInitials: projectData.pmInitials || 'DN',
    pmName: projectData.pmName || 'Dimas Nugraha',
    pmGrad: projectData.pmGrad || 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
    deadline: projectData.deadline || '25 Desember 2026',
    budget: projectData.budget ? `${projectData.budget}` : 'Rp 10.000.000',
  };

  const updatedList = [newProject, ...list];
  saveProjects(updatedList);
  return { newProject, updatedList };
}

/**
 * Update an existing project
 */
export function updateProject(id, updatedFields, currentProjectsList) {
  const list = currentProjectsList || getProjects();
  const updatedList = list.map((p) => {
    if (p.id === id || p.name === id) {
      return { ...p, ...updatedFields };
    }
    return p;
  });
  saveProjects(updatedList);
  return updatedList;
}

/**
 * Delete a project
 */
export function deleteProject(id, currentProjectsList) {
  const list = currentProjectsList || getProjects();
  const updatedList = list.filter((p) => p.id !== id && p.name !== id);
  saveProjects(updatedList);
  return updatedList;
}

/**
 * Calculate KPI summary statistics from a project list
 */
export function calculateKPIStats(projectsList) {
  const list = projectsList || getProjects();
  const totalEngagements = list.length;
  const activeCount = list.filter((p) => p && p.status === 'Active').length;
  const atRiskCount = list.filter((p) => p && p.status === 'At Risk').length;
  const overdueCount = list.filter((p) => p && p.status === 'Overdue').length;
  const completedCount = list.filter((p) => p && (p.status === 'Completed' || p.status === 'Resolved')).length;
  const uniqueClientsCount = new Set(list.map((p) => p?.client).filter(Boolean)).size;

  // Financial Outstanding calculation
  const paymentsList = overduePaymentsList || [];
  const totalPendingAmount = paymentsList.reduce((sum, item) => sum + parseCurrencyValue(item.amount), 0);
  const outstandingInvoicesCount = paymentsList.length;

  return {
    totalEngagements,
    activeCount,
    atRiskCount,
    overdueCount,
    alertSum: atRiskCount + overdueCount,
    completedCount,
    uniqueClientsCount,
    totalPendingAmount,
    pendingPaymentsFormatted: formatIndonesianCurrency(totalPendingAmount),
    outstandingInvoicesCount,
  };
}

export default {
  getProjects,
  saveProjects,
  createProject,
  updateProject,
  deleteProject,
  calculateKPIStats,
};

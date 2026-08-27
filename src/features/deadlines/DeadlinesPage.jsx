import React, { useState, useMemo } from 'react';
import { all300Projects } from '../../data/demo/projects.data';
import {
  deadlinesAlertsList,
  calculateDueIn,
} from '../../data/demo/deadlines.data';
import { overduePaymentsList } from '../../data/demo/finance.data';

export { overduePaymentsList, deadlinesAlertsList, calculateDueIn };

/* Warning Icons */
const IconWarningRed = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M8 5v4M8 11h.01M14 8A6 6 0 112 8a6 6 0 0112 0z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconWarningOrange = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M8 5v4M8 11h.01M14 8A6 6 0 112 8a6 6 0 0112 0z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function DeadlinesPage({ projectsList = all300Projects, onViewDetails }) {
  const [filterStatus, setFilterStatus] = useState('All');

  // Base Whitelist for Deadlines Page
  const baseWhitelistedProjects = useMemo(() => {
    return projectsList.filter((p) => {
      const status = p.status?.toLowerCase();
      return status === 'overdue' || status === 'at risk';
    });
  }, [projectsList]);

  // Apply page-level filter pills on top of the base dataset
  const filteredProjects = useMemo(() => {
    if (filterStatus === 'All') return baseWhitelistedProjects;
    return baseWhitelistedProjects.filter(
      (p) => p.status?.toLowerCase() === filterStatus.toLowerCase()
    );
  }, [baseWhitelistedProjects, filterStatus]);

  return (
    <div className="dl-page-container">
      {/* ── SECTION 1: ALERTS ────────────────────────── */}
      <div className="dl-section-card">
        <div className="dl-section-header">
          <div className="dl-section-title">Alerts</div>
          <div className="dl-section-sub">{deadlinesAlertsList.length} active</div>
        </div>

        <div className="dl-alerts-list">
          {deadlinesAlertsList.map((alert) => (
            <div key={alert.id} className="dl-alert-item">
              <div className={`dl-alert-icon-box dl-alert-icon-box--${alert.type}`}>
                {alert.type === 'overdue' ? <IconWarningRed /> : <IconWarningOrange />}
              </div>
              <div className="dl-alert-content">
                <div className="dl-alert-top">
                  <span className="dl-alert-name">{alert.title}</span>
                  <span className="dl-alert-desc">{alert.desc}</span>
                </div>
                <div className="dl-alert-time">{alert.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── SECTION 2: PROJECT DEADLINES ─────────────── */}
      <div className="dl-section-card">
        <div className="dl-section-header-row">
          <div className="dl-section-header-text">
            <div className="dl-section-title">Project Deadlines</div>
            <div className="dl-section-sub">All upcoming and overdue engagements</div>
          </div>
          <div className="dl-filter-pills">
            {['All', 'Overdue', 'At Risk'].map((btn) => (
              <button
                key={btn}
                className={`dl-pill-btn ${filterStatus === btn ? 'dl-pill-btn--active' : ''}`}
                onClick={() => setFilterStatus(btn)}
              >
                {btn}
              </button>
            ))}
          </div>
        </div>

        <div className="dl-table-card">
          <table className="dl-table">
            <thead>
              <tr>
                <th style={{ width: '300px' }}>Project</th>
                <th style={{ width: '200px' }}>Category</th>
                <th style={{ width: '134px' }}>Status</th>
                <th style={{ width: '200px' }}>PM</th>
                <th style={{ width: '200px' }}>Deadline</th>
                <th style={{ width: '192px' }}>Due In</th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.slice(0, 20).map((row) => {
                const dueInObj = calculateDueIn(row.deadline, row.status);
                return (
                  <tr
                    key={row.id}
                    className="dl-table-row"
                    onClick={() => onViewDetails?.(row)}
                  >
                    {/* Project */}
                    <td>
                      <div className="dl-project-name">{row.name}</div>
                      <div className="dl-project-client">{row.client}</div>
                    </td>

                    {/* Category */}
                    <td>
                      <span className="dl-category-badge">{row.category}</span>
                    </td>

                    {/* Status */}
                    <td>
                      <span className={`dl-status-badge status-${(row.status || '').toLowerCase().replace(/\s+/g, '-')}`}>
                        <span className="dl-status-dot" />
                        {row.status}
                      </span>
                    </td>

                    {/* PM */}
                    <td>
                      <div className="dl-pm-cell">
                        <div
                          className="dl-pm-avatar"
                          style={{ backgroundImage: row.pmGrad }}
                        >
                          {row.pmInitials}
                        </div>
                        <span className="dl-pm-name">{row.pmName}</span>
                      </div>
                    </td>

                    {/* Deadline */}
                    <td>
                      <span className="dl-deadline-text">{row.deadline}</span>
                    </td>

                    {/* Due In */}
                    <td>
                      <span className={`dl-due-pill dl-due-pill--${dueInObj.type}`}>
                        {dueInObj.text}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

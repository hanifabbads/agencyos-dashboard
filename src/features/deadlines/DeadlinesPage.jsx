import React, { useState, useMemo } from 'react';

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

/* Helper to compute dynamic "Due In" status from string deadline date relative to today */
const calculateDueIn = (deadlineStr, statusStr) => {
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
    'desember': 11, 'des': 11, 'dec': 11
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

/* Default Alert List (Figma Node 21139:10944) */
const alertsList = [
  { id: 1, title: 'Project Overdue', desc: 'Project C is overdue', time: '20 Jul 2026', type: 'overdue' },
  { id: 2, title: 'Project Overdue', desc: 'Project C is overdue', time: '20 Jul 2026', type: 'overdue' },
  { id: 3, title: 'Project At Risk', desc: 'Project G is at_risk', time: '20 Jul 2026', type: 'at_risk' },
  { id: 4, title: 'Project At Risk', desc: 'Project G is at_risk', time: '20 Jul 2026', type: 'at_risk' },
  { id: 5, title: 'Project Overdue', desc: 'Project M is overdue', time: '20 Jul 2026', type: 'overdue' },
  { id: 6, title: 'Project Overdue', desc: 'Project M is overdue', time: '20 Jul 2026', type: 'overdue' },
];

/* Default Overdue Payments List (Figma Node 21139:10944) */
export const overduePaymentsList = [
  { id: 1, title: 'Project Z — Digital Marketing', client: 'Petani Mandiri', due: 'Due 6 Nov 2026', amount: 'Rp 3.000.000', overdueText: '84d overdue' },
  { id: 2, title: 'Project b — Digital Marketing', client: 'Oase Travel', due: 'Due 4 Nov 2026', amount: 'Rp 165.000.000', overdueText: '82d overdue' },
  { id: 3, title: 'Project A — Digital Marketing', client: 'Quantum Finance', due: 'Due 4 Nov 2026', amount: 'Rp 145.000.000', overdueText: '82d overdue' },
  { id: 4, title: 'Project \\ — Social Media Design', client: 'Petani Mandiri', due: 'Due 13 Oct 2026', amount: 'Rp 218.000.000', overdueText: '60d overdue' },
  { id: 5, title: 'Project R — UI/UX Design', client: 'Oase Travel', due: 'Due 13 Oct 2026', amount: 'Rp 75.000.000', overdueText: '60d overdue' },
  { id: 6, title: 'Project L — Web Development', client: 'Lentera Pendidikan', due: 'Due 13 Oct 2026', amount: 'Rp 70.666.666', overdueText: '60d overdue' },
  { id: 7, title: 'Project a — Digital Marketing', client: 'Mahakam Properti', due: 'Due 9 Oct 2026', amount: 'Rp 243.000.000', overdueText: '56d overdue' },
  { id: 8, title: 'Project J — Social Media Design', client: 'Kota Sehat Klinik', due: 'Due 29 Sept 2026', amount: 'Rp 149.000.000', overdueText: '46d overdue' },
];

import { all300Projects } from '../projects/ProjectsPage';

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
          <div className="dl-section-sub">6 unread</div>
        </div>

        <div className="dl-alerts-list">
          {alertsList.map((alert) => (
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

                    {/* Due In Dynamic Badge */}
                    <td>
                      <span className={`dl-due-badge dl-due-badge--${dueInObj.type}`}>
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

      {/* ── SECTION 3: OVERDUE PAYMENTS ──────────────── */}
      <div className="dl-section-card">
        <div className="dl-section-header">
          <div className="dl-section-title">Overdue Payments</div>
          <div className="dl-section-sub">8 invoices past due</div>
        </div>

        <div className="dl-payments-list">
          {overduePaymentsList.map((item) => (
            <div key={item.id} className="dl-payment-item">
              <div className="dl-payment-left">
                <div className="dl-payment-icon-box">
                  <IconWarningRed />
                </div>
                <div className="dl-payment-info">
                  <div className="dl-payment-title">{item.title}</div>
                  <div className="dl-payment-sub">
                    {item.client} · {item.due}
                  </div>
                </div>
              </div>
              <div className="dl-payment-right">
                <div className="dl-payment-amount">{item.amount}</div>
                <div className="dl-payment-overdue-tag">{item.overdueText}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

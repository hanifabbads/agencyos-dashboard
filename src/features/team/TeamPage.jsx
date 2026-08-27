import React from 'react';
import { projectManagersData, teamMembersData } from '../../data/demo/team.data';

export { projectManagersData, teamMembersData };

/* Mail Icon */
const IconMail = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="2" y="3.5" width="12" height="9" rx="1.5" stroke="#717680" strokeWidth="1.2"/>
    <path d="M2.5 4.5L8 8.5L13.5 4.5" stroke="#717680" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function TeamPage() {
  return (
    <div className="tm-page-container">
      {/* ── TOP KPI SUMMARY CARDS ────────────────────── */}
      <div className="tm-kpi-row">
        <div className="tm-kpi-card">
          <div className="tm-kpi-title">Total Members</div>
          <div className="tm-kpi-value">{projectManagersData.length + teamMembersData.length}</div>
        </div>
        <div className="tm-kpi-card">
          <div className="tm-kpi-title">Project Managers</div>
          <div className="tm-kpi-value">{projectManagersData.length}</div>
        </div>
        <div className="tm-kpi-card">
          <div className="tm-kpi-title">At Capacity</div>
          <div className="tm-kpi-value">-</div>
        </div>
      </div>

      {/* ── SECTION 1: PROJECT MANAGERS ─────────────── */}
      <div className="tm-section-card">
        <div className="tm-section-header">
          <div className="tm-section-title">Project Managers</div>
          <div className="tm-section-sub">Leading active engagements</div>
        </div>

        <div className="tm-grid">
          {projectManagersData.map((pm) => {
            const pct = Math.round((pm.activeNum / pm.maxNum) * 100);
            return (
              <div key={pm.id} className="tm-member-card">
                <div className="tm-card-top">
                  <div className="tm-user-meta">
                    <div
                      className="tm-user-avatar"
                      style={{ backgroundImage: pm.grad }}
                    >
                      {pm.initials}
                    </div>
                    <div className="tm-user-details">
                      <div className="tm-user-name">{pm.name}</div>
                      <div className="tm-user-role">{pm.subRole}</div>
                    </div>
                  </div>
                  <span className="tm-role-badge tm-role-badge--pm">
                    {pm.badge}
                  </span>
                </div>

                <div className="tm-tasks-section">
                  <div className="tm-tasks-top">
                    <span>Active tasks</span>
                    <span>{pm.activeTasks}</span>
                  </div>
                  <div className="tm-progress-track">
                    <div
                      className="tm-progress-fill"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>

                <div className="tm-metrics-row">
                  <div className="tm-metric-item">
                    <span className="tm-metric-num">{pm.projects}</span>
                    <span className="tm-metric-lbl">Projects</span>
                  </div>
                  <div className="tm-metric-item">
                    <span className="tm-metric-num">{pm.total}</span>
                    <span className="tm-metric-lbl">Total</span>
                  </div>
                  <div className="tm-metric-item">
                    <span className="tm-metric-num">{pm.done}</span>
                    <span className="tm-metric-lbl">Done</span>
                  </div>
                </div>

                <div className="tm-email-row">
                  <IconMail />
                  <span>{pm.email}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── SECTION 2: TEAM MEMBERS ────────────────── */}
      <div className="tm-section-card">
        <div className="tm-section-header">
          <div className="tm-section-title">Team Members</div>
          <div className="tm-section-sub">Workload across active projects</div>
        </div>

        <div className="tm-grid">
          {teamMembersData.map((m) => {
            const pct = Math.round((m.activeNum / m.maxNum) * 100);
            return (
              <div key={m.id} className="tm-member-card">
                <div className="tm-card-top">
                  <div className="tm-user-meta">
                    <div
                      className="tm-user-avatar"
                      style={{ backgroundImage: m.grad }}
                    >
                      {m.initials}
                    </div>
                    <div className="tm-user-details">
                      <div className="tm-user-name">{m.name}</div>
                      <div className="tm-user-role">{m.subRole}</div>
                    </div>
                  </div>
                  <span className="tm-role-badge tm-role-badge--member">
                    {m.badge}
                  </span>
                </div>

                <div className="tm-tasks-section">
                  <div className="tm-tasks-top">
                    <span>Active tasks</span>
                    <span>{m.activeTasks}</span>
                  </div>
                  <div className="tm-progress-track">
                    <div
                      className="tm-progress-fill"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>

                <div className="tm-metrics-row">
                  <div className="tm-metric-item">
                    <span className="tm-metric-num">{m.projects}</span>
                    <span className="tm-metric-lbl">Projects</span>
                  </div>
                  <div className="tm-metric-item">
                    <span className="tm-metric-num">{m.total}</span>
                    <span className="tm-metric-lbl">Total</span>
                  </div>
                  <div className="tm-metric-item">
                    <span className="tm-metric-num">{m.done}</span>
                    <span className="tm-metric-lbl">Done</span>
                  </div>
                </div>

                <div className="tm-email-row">
                  <IconMail />
                  <span>{m.email}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

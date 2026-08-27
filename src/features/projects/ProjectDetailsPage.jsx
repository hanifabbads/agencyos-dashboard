import React, { useState } from 'react';
import NewProjectModal from './NewProjectModal';
import { defaultTasksList } from '../../data/demo/tasks.data';

/* Inline icons for Project Details Page */
const IconAngleLeft = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M10 12L4 8L10 4" stroke="#717680" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconCalendar = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="2" y="3" width="12" height="11" rx="2" stroke="#717680" strokeWidth="1.5"/>
    <path d="M5 1.5v3M11 1.5v3M2 6.5h12" stroke="#717680" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const IconCheckCircle = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M8 14.667A6.667 6.667 0 108 1.333a6.667 6.667 0 000 13.334z" stroke="#717680" strokeWidth="1.5"/>
    <path d="M5.5 8l2 2 3.5-3.5" stroke="#717680" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconClock = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="6.25" stroke="#717680" strokeWidth="1.5"/>
    <path d="M8 4.5V8L10.25 10.25" stroke="#717680" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const IconUsers = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M6 10.5A3.75 3.75 0 1 0 6 3a3.75 3.75 0 0 0 0 7.5Z" stroke="#717680" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M1.5 15a4.5 4.5 0 0 1 9 0" stroke="#717680" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12.75 3.9a3.75 3.75 0 0 1 0 5.2" stroke="#717680" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16.5 15a4.5 4.5 0 0 0-3.75-4.4" stroke="#717680" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconDollar = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M8 1v14M11.5 4H6.25a2.25 2.25 0 000 4.5h3.5a2.25 2.25 0 010 4.5H4.5" stroke="#717680" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconTabOverview = ({ active }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    {active ? (
      <>
        <path d="M8 1.5L14.5 5L8 8.5L1.5 5Z" fill="currentColor" />
        <path d="M1.5 8L8 11.5L14.5 8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M1.5 11L8 14.5L14.5 11" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ) : (
      <>
        <path d="M8 1.5L14.5 5L8 8.5L1.5 5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M1.5 8.5L8 12L14.5 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M1.5 12L8 15.5L14.5 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </>
    )}
  </svg>
);

const IconTabTasks = ({ active }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    {active ? (
      <>
        <circle cx="8" cy="8" r="7" fill="currentColor" />
        <path d="M5.2 8.2l2 2 3.6-3.6" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ) : (
      <>
        <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.5" />
        <path d="M5.5 8.2l1.8 1.8 3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </>
    )}
  </svg>
);

const IconTabTimeline = ({ active }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    {active ? (
      <>
        <rect x="2" y="3" width="12" height="11" rx="2" fill="currentColor" />
        <path d="M5 1.5v2.5M11 1.5v2.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M2.5 6.5h11" stroke="#ffffff" strokeWidth="1.2" />
      </>
    ) : (
      <>
        <rect x="2" y="3" width="12" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M5 1.5v3M11 1.5v3M2 6.5h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </>
    )}
  </svg>
);

const IconTabActivity = ({ active }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    {active ? (
      <>
        <path d="M3.2 2.8L1.8 4.2M12.8 2.8l1.4 1.4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M3.5 13.5L2.5 15M12.5 13.5l1 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="8" cy="8.5" r="5.75" fill="currentColor" />
        <path d="M8 5.5v3" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" />
      </>
    ) : (
      <>
        <path d="M3.2 2.8L1.8 4.2M12.8 2.8l1.4 1.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M3.5 13.5L2.5 15M12.5 13.5l1 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="8" cy="8.5" r="5.25" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M8 5.5v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </>
    )}
  </svg>
);

const defaultTimelineMilestones = [
  {
    id: 1,
    title: 'Discovery & Design',
    status: 'In Progress',
    progressPct: 65,
  },
  {
    id: 2,
    title: 'Development & Build',
    status: 'In Progress',
    progressPct: 45,
  },
  {
    id: 3,
    title: 'Testing & QA',
    status: 'In Progress',
    progressPct: 50,
  },
];

const defaultActivityLogs = [
  {
    id: 1,
    initials: 'RS',
    user: 'Rangga Saputra',
    action: 'a file was uploaded',
    time: '11 Jul 2026',
    grad: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
  },
  {
    id: 2,
    initials: 'DN',
    user: 'Dimas Nugraha',
    action: 'project status updated to active',
    time: '15 Jul 2026',
    grad: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
  },
  {
    id: 3,
    initials: 'CM',
    user: 'Citra Maharani',
    action: 'a milestone was created',
    time: '18 Jul 2026',
    grad: 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)',
  },
];

export default function ProjectDetailsPage({ project, onBack, onUpdateProject }) {
  const [activeTab, setActiveTab] = useState('Overview');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Fallback defaults if props are partial
  const name = project?.name || 'Project B — Mobile App Development';
  const client = project?.client || 'Sinar Abadi Group';
  const category = project?.category || 'Mobile App Development';
  const status = project?.status || 'Active';
  const pmName = project?.pmName || 'Dimas Nugraha';
  const pmInitials = project?.pmInitials || 'DN';
  const pmGrad = project?.pmGrad || 'linear-gradient(135deg, #40CCEA 0%, #0891B2 100%)';
  const deadline = project?.deadline || '12 September 2026';
  const budget = project?.budget || 'Rp 350 jt';
  const progressPct = project?.progress || 52;

  return (
    <div className="pd-page-container">
      {/* ── BACK BUTTON ────────────────────────────── */}
      <button className="pd-back-btn" onClick={onBack} aria-label="Back to projects">
        <IconAngleLeft />
        <span>Project</span>
      </button>

      {/* ── TOP HERO CARD ──────────────────────────── */}
      <div className="pd-hero-card">
        {/* Top Header Row */}
        <div className="pd-hero-top">
          <div className="pd-hero-meta">
            {/* Badges */}
            <div className="pd-badges-row">
              <span className={`pd-status-badge status-${(status || '').toLowerCase().replace(/\s+/g, '-')}`}>
                <span className="pd-status-dot" />
                {status}
              </span>
              <span className="pd-category-badge">{category}</span>
            </div>

            {/* Title & Subtitle */}
            <h1 className="pd-project-title">{name}</h1>
            <div className="pd-project-sub">
              <span className="pd-client-name">{client}</span>
              <span className="pd-sub-divider">·</span>
              <span className="pd-pm-label">PM:</span>
              <span className="pd-pm-val">{pmName}</span>
            </div>
          </div>

          {/* Edit Project Button */}
          <button className="pd-edit-btn" onClick={() => setIsEditModalOpen(true)}>
            Edit Project
          </button>
        </div>

        {/* Key Metrics Row */}
        <div className="pd-metrics-row">
          {/* Budget Metric */}
          <div className="pd-metric-col">
            <div className="pd-metric-header">
              <IconDollar />
              <span>Budget</span>
            </div>
            <div className="pd-metric-value">{budget}</div>
            <div className="pd-metric-sub">Rp 0 collected</div>
          </div>

          {/* Deadline Metric */}
          <div className="pd-metric-col">
            <div className="pd-metric-header">
              <IconCalendar />
              <span>Deadline</span>
            </div>
            <div className="pd-metric-value">{deadline}</div>
            <div className="pd-metric-sub">30 days left</div>
          </div>

          {/* Progress Metric */}
          <div className="pd-metric-col">
            <div className="pd-metric-header">
              <IconCheckCircle />
              <span>Progress</span>
            </div>
            <div className="pd-metric-value">{progressPct}%</div>
            <div className="pd-progress-bar-row">
              <div className="pd-progress-track">
                <div
                  className="pd-progress-fill"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
              <span className="pd-progress-pct-label">{progressPct}%</span>
            </div>
          </div>

          {/* Team Metric */}
          <div className="pd-metric-col">
            <div className="pd-metric-header">
              <IconUsers />
              <span>Team</span>
            </div>
            <div className="pd-team-avatars">
              <div className="pd-avatar" style={{ backgroundImage: 'linear-gradient(135deg, #60A5FA 0%, #BF5AF2 100%)' }}>
                SD
              </div>
              <div className="pd-avatar" style={{ backgroundImage: pmGrad }}>
                {pmInitials}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── TABS BAR ───────────────────────────────── */}
      <div className="pd-tabs-bar">
        <button
          className={`pd-tab-item ${activeTab === 'Overview' ? 'pd-tab-item--active' : ''}`}
          onClick={() => setActiveTab('Overview')}
        >
          <IconTabOverview active={activeTab === 'Overview'} />
          <span>Overview</span>
        </button>
        <button
          className={`pd-tab-item ${activeTab === 'Tasks' ? 'pd-tab-item--active' : ''}`}
          onClick={() => setActiveTab('Tasks')}
        >
          <IconTabTasks active={activeTab === 'Tasks'} />
          <span>Tasks</span>
        </button>
        <button
          className={`pd-tab-item ${activeTab === 'Timeline' ? 'pd-tab-item--active' : ''}`}
          onClick={() => setActiveTab('Timeline')}
        >
          <IconTabTimeline active={activeTab === 'Timeline'} />
          <span>Timeline</span>
        </button>
        <button
          className={`pd-tab-item ${activeTab === 'Activity' ? 'pd-tab-item--active' : ''}`}
          onClick={() => setActiveTab('Activity')}
        >
          <IconTabActivity active={activeTab === 'Activity'} />
          <span>Activity</span>
        </button>
      </div>

      {/* ── OVERVIEW CONTENT GRID ───────────────────── */}
      {activeTab === 'Overview' && (
        <div className="pd-overview-grid">
          {/* Phase Breakdown Card */}
          <div className="pd-card pd-phase-card">
            <div className="pd-card-header">
              <div className="pd-card-title">Phase Breakdown</div>
              <div className="pd-card-sub">Weighted phase progress</div>
            </div>

            <div className="pd-phase-list">
              {/* Design Phase */}
              <div className="pd-phase-item">
                <div className="pd-phase-row">
                  <span className="pd-phase-name">Design</span>
                  <span className="pd-phase-sub">65% · weight 30%</span>
                </div>
                <div className="pd-phase-track">
                  <div className="pd-phase-fill" style={{ width: '65%' }} />
                </div>
              </div>

              {/* Development Phase */}
              <div className="pd-phase-item">
                <div className="pd-phase-row">
                  <span className="pd-phase-name">Development</span>
                  <span className="pd-phase-sub">45% · weight 50%</span>
                </div>
                <div className="pd-phase-track">
                  <div className="pd-phase-fill" style={{ width: '45%' }} />
                </div>
              </div>

              {/* Testing Phase */}
              <div className="pd-phase-item">
                <div className="pd-phase-row">
                  <span className="pd-phase-name">Testing</span>
                  <span className="pd-phase-sub">50% · weight 20%</span>
                </div>
                <div className="pd-phase-track">
                  <div className="pd-phase-fill" style={{ width: '50%' }} />
                </div>
              </div>
            </div>

            {/* Overall Progress Row */}
            <div className="pd-phase-footer">
              <span className="pd-overall-label">Overall</span>
              <span className="pd-overall-val">{progressPct}%</span>
            </div>
          </div>

          {/* Payments Card */}
          <div className="pd-card pd-payments-card">
            <div className="pd-card-header">
              <div className="pd-card-title">Payments</div>
              <div className="pd-card-sub">Rp 0 of {budget}</div>
            </div>

            <div className="pd-payment-box">
              <div className="pd-payment-info">
                <div className="pd-payment-amount">{budget}</div>
                <div className="pd-payment-due">Due 9 Aug 2026</div>
              </div>
              <span className="pd-payment-status">
                <span className="pd-payment-status-dot" />
                Pending
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ── TASKS TAB CONTENT ────────────────────────── */}
      {activeTab === 'Tasks' && (
        <div className="pd-tasks-card">
          <table className="pd-tasks-table">
            <thead>
              <tr>
                <th style={{ width: '330px' }}>Task</th>
                <th style={{ width: '180px' }}>Status</th>
                <th style={{ width: '180px' }}>Priority</th>
                <th style={{ width: '220px' }}>Assignee</th>
                <th>Due</th>
              </tr>
            </thead>
            <tbody>
              {defaultTasksList.map((task) => (
                <tr key={task.id} className="pd-tasks-row">
                  {/* Task Name & Stage */}
                  <td>
                    <div className="pd-task-name">{task.name}</div>
                    <div className="pd-task-stage">{task.stage}</div>
                  </td>

                  {/* Status Badge */}
                  <td>
                    <span
                      className="pd-task-status-badge"
                      style={{ backgroundColor: task.statusBg, color: task.statusColor }}
                    >
                      <span
                        className="pd-task-status-dot"
                        style={{ backgroundColor: task.statusColor }}
                      />
                      {task.status}
                    </span>
                  </td>

                  {/* Priority Badge */}
                  <td>
                    <span
                      className="pd-priority-badge"
                      style={{ backgroundColor: task.priorityBg, color: task.priorityColor }}
                    >
                      {task.priority}
                    </span>
                  </td>

                  {/* Assignee */}
                  <td>
                    <div className="pd-assignee-cell">
                      <div
                        className="pd-assignee-avatar"
                        style={{ backgroundImage: task.assigneeGrad }}
                      >
                        {task.assigneeInitials}
                      </div>
                      <span className="pd-assignee-name">{task.assigneeName}</span>
                    </div>
                  </td>

                  {/* Due */}
                  <td>
                    <span className="pd-task-due">{task.due}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ── TIMELINE TAB CONTENT ──────────────────────── */}
      {activeTab === 'Timeline' && (
        <div className="pd-card pd-timeline-card">
          <div className="pd-card-header" style={{ marginBottom: '24px' }}>
            <div className="pd-card-title">Project Timeline</div>
            <div className="pd-card-sub">Key milestones & schedule</div>
          </div>

          <div className="pd-timeline-wrapper">
            <div className="pd-timeline-line" />
            <div className="pd-timeline-list">
              {defaultTimelineMilestones.map((item) => (
                <div key={item.id} className="pd-timeline-item">
                  <div className="pd-timeline-dot" />
                  <div className="pd-timeline-content">
                    <div className="pd-timeline-top">
                      <span className="pd-timeline-title">{item.title}</span>
                      <span className="pd-timeline-status">{item.status}</span>
                    </div>
                    <div className="pd-timeline-track">
                      <div
                        className="pd-timeline-fill"
                        style={{ width: `${item.progressPct}%` }}
                      />
                    </div>
                    <div className="pd-timeline-pct">{item.progressPct}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── ACTIVITY TAB CONTENT ───────────────────────── */}
      {activeTab === 'Activity' && (
        <div className="pd-card pd-activity-card">
          <div className="pd-card-header" style={{ marginBottom: '24px' }}>
            <div className="pd-card-title">Activity Log</div>
            <div className="pd-card-sub">Recent changes & updates</div>
          </div>

          <div className="pd-activity-list">
            {defaultActivityLogs.map((log) => (
              <div key={log.id} className="pd-activity-item">
                <div className="pd-activity-avatar" style={{ backgroundImage: log.grad }}>
                  {log.initials}
                </div>
                <div className="pd-activity-info">
                  <div className="pd-activity-text">
                    <span className="pd-activity-user">{log.user}</span>{' '}
                    <span className="pd-activity-action">{log.action}</span>
                  </div>
                  <div className="pd-activity-time">
                    <IconClock />
                    <span>{log.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {isEditModalOpen && (
        <NewProjectModal
          isEdit={true}
          initialData={project}
          onClose={() => setIsEditModalOpen(false)}
          onCreateProject={(updatedProjData) => {
            onUpdateProject?.(updatedProjData);
            setIsEditModalOpen(false);
          }}
        />
      )}
    </div>
  );
}

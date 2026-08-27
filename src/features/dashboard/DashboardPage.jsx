import React, { useState, useEffect, useMemo, useRef } from 'react';
import ProjectsPage from '../projects/ProjectsPage';
import ProjectDetailsPage from '../projects/ProjectDetailsPage';
import TeamPage from '../team/TeamPage';
import DeadlinesPage from '../deadlines/DeadlinesPage';
import NewProjectModal from '../projects/NewProjectModal';
import SettingsModal from './SettingsModal';
import { brandingConfig } from '../../config/branding.config';
import { navItems, pageTitles } from '../../config/navigation.config';
import {
  getStoredUserProfile,
  saveStoredUserProfile,
  getInitials,
} from '../../services/auth.service';
import {
  getProjects,
  saveProjects,
  createProject,
  updateProject,
  deleteProject,
  calculateKPIStats,
} from '../../services/projects.service';
import {
  categoryBreakdownData,
  monthlyRevenueData,
  parseCurrencyValue,
  formatIndonesianCurrency,
} from '../../data/demo/finance.data';
import { dashboardDeadlines } from '../../data/demo/deadlines.data';
import {
  dashboardTeamWorkload,
  recentActivityData,
  avatarColors,
} from '../../data/demo/team.data';
import { notificationItems } from '../../data/demo/notifications.data';

const IconWallet = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path
      d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zM16 14h.01M4 7V5a2 2 0 012-2h12a2 2 0 012 2v2"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

function safeIncludes(target, query) {
  if (target === null || target === undefined || !query) return false;
  return String(target).toLowerCase().includes(String(query).toLowerCase());
}

function highlightMatch(text, query) {
  if (text === null || text === undefined) return '';
  if (!query) return String(text);
  const strText = String(text);
  const idx = strText.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return strText;
  const before = strText.substring(0, idx);
  const match = strText.substring(idx, idx + query.length);
  const after = strText.substring(idx + query.length);
  return (
    <>
      {before}
      <mark className="db-search-highlight">{match}</mark>
      {after}
    </>
  );
}

/* Inline SVG icons */
const IconLogo = () => (
  <img
    src={brandingConfig.logo.src}
    alt={brandingConfig.logo.alt}
    width="36"
    height="36"
    style={{ borderRadius: brandingConfig.logo.borderRadius, objectFit: 'contain', display: 'block' }}
  />
);

const IconDashboard = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <rect x="2.5" y="2.5" width="6.5" height="6.5" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
    <rect x="11" y="2.5" width="6.5" height="6.5" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
    <rect x="2.5" y="11" width="6.5" height="6.5" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
    <rect x="11" y="11" width="6.5" height="6.5" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

const IconProjects = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M2 7.5C2 6.4 2.9 5.5 4 5.5H7.5L9 7.5H16C17.1 7.5 18 8.4 18 9.5V15C18 16.1 17.1 17 16 17H4C2.9 17 2 16.1 2 15V7.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="none"/>
    <path d="M5.5 11h9M5.5 13.5h6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
  </svg>
);

const IconTeam = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="7.5" cy="6.5" r="2.75" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M2 16.5C2 13.7 4.5 11.5 7.5 11.5C10.5 11.5 13 13.7 13 16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="14.5" cy="7.5" r="2" stroke="currentColor" strokeWidth="1.3"/>
    <path d="M17 16.5C17 14.6 15.9 13 14.5 12.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
  </svg>
);

const IconDeadlines = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <rect x="2.5" y="3.5" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M6 2V5M10 2V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M2.5 7.5H13.5" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="15" cy="15" r="3.5" fill="var(--bg-secondary)" stroke="currentColor" strokeWidth="1.3"/>
    <path d="M15 13.5V15L16 16" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconSearch = () => (
  <svg width="16" height="16" viewBox="0 0 13 13" fill="none">
    <path d="M12.8534 12.1467L10.2927 9.586C11.1487 8.57067 11.6667 7.262 11.6667 5.83333C11.6667 2.61667 9.05 0 5.83333 0C2.61667 0 0 2.61667 0 5.83333C0 9.05 2.61667 11.6667 5.83333 11.6667C7.262 11.6667 8.57069 11.1487 9.58602 10.2927L12.1466 12.8533C12.244 12.9507 12.372 13 12.5 13C12.628 13 12.756 12.9513 12.8534 12.8533C13.0487 12.6587 13.0487 12.342 12.8534 12.1467ZM1 5.83333C1 3.168 3.168 1 5.83333 1C8.49867 1 10.6667 3.168 10.6667 5.83333C10.6667 8.49867 8.49867 10.6667 5.83333 10.6667C3.168 10.6667 1 8.49867 1 5.83333Z" fill="currentColor"/>
  </svg>
);

const IconMoon = () => (
  <svg width="20" height="20" viewBox="0 0 17 17" fill="none">
    <path d="M8.22131 16.2492C7.82131 16.2492 7.41716 16.2208 7.00966 16.1625C3.35216 15.6408 0.494665 12.7417 0.059665 9.1125C-0.157002 7.30416 0.218831 5.53166 1.148 3.98666C2.62633 1.5275 5.34215 0 8.23632 0C8.62882 0.000833333 8.96215 0.232507 9.09465 0.590006C9.22881 0.95084 9.12632 1.34667 8.83382 1.59833C7.51882 2.73 6.9305 4.43249 7.26133 6.15166C7.64466 8.14999 9.28964 9.6775 11.353 9.95333C12.6005 10.1192 13.8013 9.84 14.8188 9.14167C15.138 8.92417 15.548 8.92584 15.8621 9.14668C16.1755 9.36584 16.3163 9.74667 16.2222 10.1158C15.2863 13.7742 11.963 16.2483 8.22131 16.2492ZM7.36298 1.30501C5.23881 1.57251 3.32131 2.79584 2.21881 4.63084C1.43548 5.93501 1.11715 7.43334 1.30048 8.96334C1.66798 12.0317 4.08799 14.4825 7.18549 14.925C10.4722 15.3933 13.5771 13.58 14.7438 10.6275C13.6538 11.1575 12.4197 11.3575 11.1855 11.1933C8.58798 10.8467 6.51716 8.91499 6.03216 6.38832C5.67716 4.53249 6.17048 2.69251 7.36298 1.30501ZM1.68381 4.30834H1.69215H1.68381Z" fill="currentColor"/>
  </svg>
);

const IconSun = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="4" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.22 4.22l1.42 1.42M14.36 14.36l1.42 1.42M4.22 15.78l1.42-1.42M14.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const IconBell = () => (
  <svg width="20" height="20" viewBox="0 0 15 17" fill="none">
    <path d="M7.29334 16.25C6.47001 16.25 5.72917 15.8225 5.31167 15.1058C5.13834 14.8075 5.23917 14.425 5.5375 14.2517C5.835 14.0775 6.21834 14.1783 6.39167 14.4775C6.77334 15.1317 7.81251 15.1333 8.19501 14.4775C8.36918 14.1792 8.75251 14.0792 9.05001 14.2525C9.34834 14.4258 9.44917 14.8092 9.275 15.1075C8.85667 15.8225 8.11668 16.25 7.29334 16.25ZM14.5192 13.3958C14.6233 13.1792 14.5942 12.9225 14.4442 12.735C14.4292 12.7158 12.915 10.7967 12.915 8.54251V6.45833C12.915 6.11333 12.635 5.83333 12.29 5.83333C11.945 5.83333 11.665 6.11333 11.665 6.45833V8.54167C11.665 10.155 12.2883 11.59 12.8025 12.5H1.77833C2.2925 11.59 2.91584 10.155 2.91584 8.54167V5.625C2.91584 3.2125 4.87834 1.25 7.29084 1.25C7.63584 1.25 7.91584 0.97 7.91584 0.625C7.91584 0.28 7.63584 0 7.29084 0C4.18917 0 1.66584 2.52333 1.66584 5.625V8.54167C1.66584 10.7825 0.150839 12.7158 0.135839 12.735C-0.013328 12.9225 -0.0424926 13.18 0.0625074 13.3958C0.166674 13.6117 0.38501 13.75 0.62501 13.75H13.9583C14.1958 13.75 14.415 13.6125 14.5192 13.3958ZM13.7475 2.29167C13.7475 1.02833 12.72 0 11.4558 0C10.1917 0 9.16417 1.02833 9.16417 2.29167C9.16417 3.555 10.1917 4.58333 11.4558 4.58333C12.72 4.58333 13.7475 3.555 13.7475 2.29167ZM12.4975 2.29167C12.4975 2.86583 12.03 3.33333 11.4558 3.33333C10.8817 3.33333 10.4142 2.86583 10.4142 2.29167C10.4142 1.7175 10.8817 1.25 11.4558 1.25C12.03 1.25 12.4975 1.7175 12.4975 2.29167Z" fill="currentColor"/>
  </svg>
);

const IconPlus = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M12.5 5.83333H7.5V0.833333C7.5 0.373333 7.12667 0 6.66667 0C6.20667 0 5.83333 0.373333 5.83333 0.833333V5.83333H0.833333C0.373333 5.83333 0 6.20667 0 6.66667C0 7.12667 0.373333 7.5 0.833333 7.5H5.83333V12.5C5.83333 12.96 6.20667 13.3333 6.66667 13.3333C7.12667 13.3333 7.5 12.96 7.5 12.5V7.5H12.5C12.96 7.5 13.3333 7.12667 13.3333 6.66667C13.3333 6.20667 12.96 5.83333 12.5 5.83333Z" fill="white"/>
  </svg>
);

const IconChevronRight = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconArrowUpRight = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M3.5 10.5L10.5 3.5M10.5 3.5H5M10.5 3.5V9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconArrowDownRight = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M3.5 3.5L10.5 10.5M10.5 10.5H5M10.5 10.5V5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconDollar = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path
      d="M10 2v16M14.5 5H7.75a2.75 2.75 0 000 5.5h4.5a2.75 2.75 0 010 5.5H5.5"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconFolder = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M2 6C2 4.9 2.9 4 4 4H7L9 6H14C15.1 6 16 6.9 16 8V13C16 14.1 15.1 15 14 15H4C2.9 15 2 14.1 2 13V6Z" stroke="currentColor" strokeWidth="1.4" fill="none"/>
  </svg>
);

const IconAlert = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M9 2L16 15H2L9 2Z" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinejoin="round"/>
    <path d="M9 8v3M9 12.5v.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
  </svg>
);

const IconCheck = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.4"/>
    <path d="M5.5 9l2.5 2.5 4-4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconTasks = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <rect x="2" y="2" width="14" height="14" rx="3" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    <path d="M5.5 7.5L7.8 9.8L12.5 5.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M5.5 12.5H12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const IconTrend = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M2 13L7 8l3 3 6-7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M13 4h3v3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconUsers = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <circle cx="7" cy="6" r="3" stroke="currentColor" strokeWidth="1.4"/>
    <path d="M1 16c0-3 2.7-5 6-5s6 2 6 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    <path d="M12 7c1.7 0 3 1.3 3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    <path d="M14.5 13.5C15.9 14 17 15 17 16" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
  </svg>
);

const IconAlertTriangle = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconClock = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
    <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconCheckCircle = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
    <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconClose = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconMenu = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconLogout = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <polyline points="16 17 21 12 16 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <line x1="21" y1="12" x2="9" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/* Pure SVG Revenue Chart with interactive tooltip */
function RevenueChart() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const monthsData = monthlyRevenueData;
  const W = 570, H = 170;
  const maxVal = 6.0;

  const points = monthsData.map((d, i) => {
    const x = (i / (monthsData.length - 1)) * W;
    const revY = H * (1 - d.revVal / maxVal);
    const outY = H * (1 - d.outVal / maxVal);
    return { ...d, x, revY, outY };
  });

  const getSmoothPath = (key) => {
    let d = `M ${points[0].x} ${points[0][key]}`;
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      const cpx = (prev.x + curr.x) / 2;
      d += ` C ${cpx} ${prev[key]} ${cpx} ${curr[key]} ${curr.x} ${curr[key]}`;
    }
    return d;
  };

  const blueLine = getSmoothPath('revY');
  const orangeLine = getSmoothPath('outY');
  const blueArea = blueLine + ` L ${W} ${H} L 0 ${H} Z`;

  const activePoint = hoveredIndex !== null ? points[hoveredIndex] : null;

  let tooltipStyle = {};
  if (activePoint) {
    const isRightHalf = activePoint.x > W * 0.5;
    const leftPx = isRightHalf ? activePoint.x - 210 : activePoint.x + 16;
    const topPx = Math.max(10, Math.min(activePoint.outY, activePoint.revY) - 15);
    tooltipStyle = {
      left: `${leftPx}px`,
      top: `${topPx}px`,
    };
  }

  const yLabels = ['Rp 6.0 M', 'Rp 4.5 M', 'Rp 3.0 M', 'Rp 1.5 M', 'Rp 0'];

  return (
    <div style={{ position: 'relative', width: '100%' }} onMouseLeave={() => setHoveredIndex(null)}>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: `${H}px`, paddingBottom: '0px', flexShrink: 0 }}>
          {yLabels.map((l) => (
            <span key={l} style={{ fontSize: '10px', color: 'var(--text-tertiary)', whiteSpace: 'nowrap', lineHeight: 1 }}>{l}</span>
          ))}
        </div>

        <div style={{ flex: 1, position: 'relative' }}>
          <svg
            width="100%"
            height={H}
            viewBox={`0 0 ${W} ${H}`}
            preserveAspectRatio="none"
            overflow="visible"
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <defs>
              <linearGradient id="blueGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0C61CF" stopOpacity="0.18"/>
                <stop offset="100%" stopColor="#0C61CF" stopOpacity="0"/>
              </linearGradient>
            </defs>

            {[0, 0.25, 0.5, 0.75, 1].map((t, i) => (
              <line key={i} x1="0" y1={t * H} x2={W} y2={t * H} stroke="var(--border-subtle, #E9EAEB)" strokeWidth="1"/>
            ))}

            <path d={blueArea} fill="url(#blueGrad)"/>
            <path d={blueLine} fill="none" stroke="#0C61CF" strokeWidth="2.5" strokeLinejoin="round"/>
            <path d={orangeLine} fill="none" stroke="#F59E0B" strokeWidth="2.5" strokeLinejoin="round"/>

            {activePoint && (
              <g style={{ pointerEvents: 'none' }}>
                <line
                  x1={activePoint.x}
                  y1="0"
                  x2={activePoint.x}
                  y2={H}
                  stroke="var(--border-primary, #D5D7DA)"
                  strokeWidth="1.2"
                  strokeDasharray="4 4"
                />
                <circle cx={activePoint.x} cy={activePoint.outY} r="4.5" fill="#F59E0B" stroke="#ffffff" strokeWidth="2"/>
                <circle cx={activePoint.x} cy={activePoint.revY} r="4.5" fill="#0C61CF" stroke="#ffffff" strokeWidth="2"/>
              </g>
            )}

            {points.map((p, i) => {
              const colW = W / (points.length - 1);
              const xStart = i === 0 ? 0 : p.x - colW / 2;
              return (
                <rect
                  key={i}
                  x={xStart}
                  y="0"
                  width={colW}
                  height={H}
                  fill="transparent"
                  style={{ cursor: 'pointer' }}
                  onMouseEnter={() => setHoveredIndex(i)}
                />
              );
            })}
          </svg>

          {activePoint && (
            <div className="db-chart-tooltip" style={tooltipStyle}>
              <div className="db-tooltip-title">{activePoint.month}</div>
              <div className="db-tooltip-list">
                <div className="db-tooltip-rev">
                  Revenue : {activePoint.revenue}
                </div>
                <div className="db-tooltip-out">
                  Outstanding : {activePoint.outstanding}
                </div>
              </div>
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
            {monthsData.map((m, i) => (
              <span
                key={m.month}
                style={{
                  fontSize: '11px',
                  color: hoveredIndex === i ? 'var(--text-primary)' : 'var(--text-tertiary)',
                  fontWeight: hoveredIndex === i ? 600 : 400,
                  cursor: 'pointer',
                  transition: 'color 0.15s ease',
                }}
                onMouseEnter={() => setHoveredIndex(i)}
              >
                {m.month}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* Donut Chart */
function DonutChart({ hoveredCategory, setHoveredCategory }) {
  const categoryData = categoryBreakdownData;
  const total = 52;
  const size = 176;
  const cx = size / 2;
  const cy = size / 2;
  const r = 62;
  const strokeW = 24;
  const circ = 2 * Math.PI * r;

  let accumOffset = 0;

  const slices = categoryData.map((cat, i) => {
    const pct = cat.count / total;
    const len = pct * circ;
    const gap = circ - len;
    const dashoffset = -accumOffset + circ * 0.25;
    accumOffset += len;

    return {
      ...cat,
      index: i,
      len,
      gap,
      dashoffset,
    };
  });

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{ overflow: 'visible', flexShrink: 0 }}
      onMouseLeave={() => setHoveredCategory(null)}
    >
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#F0F1F3" strokeWidth={strokeW}/>

      {slices.map((s) => {
        const isHovered = hoveredCategory === s.index;
        return (
          <circle
            key={s.index}
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke={s.color}
            strokeWidth={isHovered ? strokeW + 4 : strokeW}
            strokeDasharray={`${s.len} ${s.gap}`}
            strokeDashoffset={s.dashoffset}
            transform={`rotate(-90 ${cx} ${cy})`}
            style={{
              cursor: 'pointer',
              transition: 'stroke-width 0.2s ease, opacity 0.2s ease',
              opacity: hoveredCategory !== null && !isHovered ? 0.6 : 1,
            }}
            onMouseEnter={() => setHoveredCategory(s.index)}
          />
        );
      })}

      <text
        x={cx}
        y={cy - 4}
        textAnchor="middle"
        fontSize="20"
        fontWeight="600"
        fill="var(--text-primary)"
        fontFamily="Geist, sans-serif"
      >
        52
      </text>
      <text
        x={cx}
        y={cy + 14}
        textAnchor="middle"
        fontSize="12"
        fill="var(--text-tertiary)"
        fontFamily="Geist, sans-serif"
      >
        Projects
      </text>
    </svg>
  );
}

/* Status Badge */
function StatusBadge({ status }) {
  const statusKey = (status || 'Active').toLowerCase().replace(/\s+/g, '-');
  return (
    <span className={`status-badge status-${statusKey}`}>
      <span className="status-dot" />
      {status}
    </span>
  );
}

/* Avatar Component */
function Avatar({ initials, gradient, size = 32 }) {
  return (
    <div style={{
      width: size,
      height: size,
      borderRadius: '50%',
      backgroundImage: gradient,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      fontSize: size === 36 ? '13px' : '11px',
      fontWeight: 600,
      color: '#fff',
      fontFamily: 'Geist, sans-serif',
    }}>
      {initials}
    </div>
  );
}

function ProgressBar({ pct, color = '#0C61CF' }) {
  return (
    <div className="db-progress-track">
      <div style={{ width: `${pct}%`, height: '100%', borderRadius: '3px', background: color, transition: 'width 0.3s ease' }}/>
    </div>
  );
}

export default function DashboardPage({ onLogout, currentUser }) {
  const [activeNav, setActiveNav] = useState(() => {
    const hash = window.location.hash.toLowerCase().replace('#/', '').replace('#', '');
    if (['projects', 'team', 'deadlines'].includes(hash)) return hash;
    return 'dashboard';
  });

  const [selectedProject, setSelectedProject] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [categoryMousePos, setCategoryMousePos] = useState({ x: 0, y: 0 });
  const [isNewProjectOpen, setIsNewProjectOpen] = useState(false);
  const [allProjectsList, setAllProjectsList] = useState(getProjects);
  const [activityList, setActivityList] = useState(recentActivityData);
  const [userProfile, setUserProfile] = useState(() => getStoredUserProfile());
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [hasUnreadNotifs, setHasUnreadNotifs] = useState(true);
  const [readNotifIndices, setReadNotifIndices] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef(null);
  const notifRef = useRef(null);

  // Sync route on hash changes
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase().replace('#/', '').replace('#', '');
      if (['dashboard', 'projects', 'team', 'deadlines'].includes(hash)) {
        setActiveNav(hash);
      }
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleNavChange = (navKey) => {
    setActiveNav(navKey);
    setSelectedProject(null);
    window.location.hash = `#/${navKey}`;
  };

  const handleMarkAllAsRead = () => {
    setHasUnreadNotifs(false);
    setReadNotifIndices(notificationItems.map((_, i) => i));
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setIsNotifOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const queryLower = searchQuery.trim().toLowerCase();

  // 1. Projects search matching
  const matchingProjects = useMemo(() => {
    if (!queryLower) return [];
    return (allProjectsList || [])
      .filter((p) => {
        if (!p) return false;
        return (
          safeIncludes(p.name, queryLower) ||
          safeIncludes(p.client, queryLower) ||
          safeIncludes(p.category, queryLower) ||
          safeIncludes(p.pmName, queryLower) ||
          safeIncludes(p.status, queryLower) ||
          safeIncludes(p.description, queryLower)
        );
      })
      .slice(0, 5);
  }, [allProjectsList, queryLower]);

  // 2. Clients search matching
  const matchingClients = useMemo(() => {
    if (!queryLower) return [];
    const clientMap = new Map();
    (allProjectsList || []).forEach((p) => {
      if (p?.client && !clientMap.has(p.client)) {
        clientMap.set(p.client, {
          name: p.client,
          category: p.category || 'Client Account',
        });
      }
    });
    return Array.from(clientMap.values())
      .filter((c) => safeIncludes(c.name, queryLower) || safeIncludes(c.category, queryLower))
      .slice(0, 3);
  }, [allProjectsList, queryLower]);

  // 3. Team search matching
  const matchingTeam = useMemo(() => {
    if (!queryLower) return [];
    const teamMap = new Map();
    (allProjectsList || []).forEach((p) => {
      if (p?.pmName && !teamMap.has(p.pmName)) {
        teamMap.set(p.pmName, {
          name: p.pmName,
          initials: p.pmInitials || 'PM',
          role: 'Project Manager',
        });
      }
    });
    return Array.from(teamMap.values())
      .filter((t) => safeIncludes(t.name, queryLower) || safeIncludes(t.role, queryLower))
      .slice(0, 3);
  }, [allProjectsList, queryLower]);

  // 4. Deadlines search matching
  const matchingDeadlines = useMemo(() => {
    if (!queryLower) return [];
    return (dashboardDeadlines || [])
      .filter(
        (d) =>
          d &&
          (safeIncludes(d.label, queryLower) ||
            safeIncludes(d.sub, queryLower) ||
            safeIncludes(d.daysLeft, queryLower))
      )
      .slice(0, 3);
  }, [queryLower]);

  const allFlatResults = useMemo(() => {
    const list = [];
    matchingProjects.forEach((p) => list.push({ type: 'project', data: p }));
    matchingClients.forEach((c) => list.push({ type: 'client', data: c }));
    matchingTeam.forEach((t) => list.push({ type: 'team', data: t }));
    matchingDeadlines.forEach((d) => list.push({ type: 'deadline', data: d }));
    return list;
  }, [matchingProjects, matchingClients, matchingTeam, matchingDeadlines]);

  const handleSelectResult = (item) => {
    if (!item) return;
    if (item.type === 'project') {
      setSelectedProject(item.data);
    } else if (item.type === 'client') {
      handleNavChange('projects');
      setSelectedProject(null);
    } else if (item.type === 'team') {
      handleNavChange('team');
      setSelectedProject(null);
    } else if (item.type === 'deadline') {
      handleNavChange('deadlines');
      setSelectedProject(null);
    }
    setIsSearchOpen(false);
  };

  const activeProjects = useMemo(() => {
    let list = (allProjectsList || []).filter((p) => p && p.status === 'Active');
    if (queryLower) {
      list = list.filter(
        (p) =>
          p &&
          (safeIncludes(p.name, queryLower) ||
            safeIncludes(p.client, queryLower) ||
            safeIncludes(p.category, queryLower) ||
            safeIncludes(p.pmName, queryLower))
      );
    }
    return list.slice(0, 6);
  }, [allProjectsList, queryLower]);

  const kpiStats = useMemo(() => {
    return calculateKPIStats(allProjectsList);
  }, [allProjectsList]);

  const topMetrics = useMemo(() => [
    {
      label: 'Total Revenue',
      value: 'Rp 5.1 M',
      sub: 'Rp 4.7 M outstanding',
      trend: '+12.4%',
      trendUp: true,
      icon: <IconDollar />,
      type: 'revenue',
    },
    {
      label: 'Active Projects',
      value: `${kpiStats.activeCount}`,
      sub: `${kpiStats.totalEngagements} total engagements`,
      trend: '+3.1%',
      trendUp: true,
      icon: <IconFolder />,
      type: 'projects',
    },
    {
      label: 'At Risk + Overdue',
      value: `${kpiStats.alertSum}`,
      sub: `${kpiStats.atRiskCount} at risk · ${kpiStats.overdueCount} overdue`,
      trend: '-1.8%',
      trendUp: false,
      icon: <IconAlert />,
      type: 'alert',
    },
    {
      label: 'Pending Payments',
      value: `${kpiStats.pendingPaymentsFormatted}`,
      sub: `${kpiStats.outstandingInvoicesCount} ${kpiStats.outstandingInvoicesCount === 1 ? 'invoice' : 'invoices'} outstanding`,
      trend: null,
      icon: <IconWallet />,
      type: 'payment',
    },
  ], [kpiStats]);

  const bottomMetrics = useMemo(() => [
    { label: 'Completed', value: `${kpiStats.completedCount}`, icon: <IconCheck />, type: 'completed' },
    { label: 'Tasks Done', value: '158 / 502', icon: <IconTasks />, type: 'tasks' },
    { label: 'Avg Progress', value: '52%', icon: <IconTrend />, type: 'progress' },
    { label: 'Clients', value: `${kpiStats.uniqueClientsCount}`, icon: <IconUsers />, type: 'clients' },
  ], [kpiStats]);

  const deadlinesCount = 27;

  const handleCreateProject = (newProjData) => {
    const { newProject, updatedList } = createProject(newProjData, allProjectsList);
    setAllProjectsList(updatedList);

    const newActivityItem = {
      initials: newProjData.pmInitials || 'DN',
      name: newProjData.pmName || 'Dimas Nugraha',
      action: `project "${newProjData.name.toLowerCase()}" was created`,
      sub: `${newProjData.client} · Just now`,
      color: newProjData.pmGrad || avatarColors[0],
    };

    setActivityList((prev) => [newActivityItem, ...prev]);
    setIsNewProjectOpen(false);
  };

  const handleUpdateProject = (updatedProj) => {
    setSelectedProject(updatedProj);
    const updatedList = updateProject(updatedProj.id || updatedProj.name, updatedProj, allProjectsList);
    setAllProjectsList(updatedList);
  };

  const handleDeleteProject = (deletedId) => {
    const updatedList = deleteProject(deletedId, allProjectsList);
    setAllProjectsList(updatedList);
  };

  const handleCategoryMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCategoryMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const toggleTheme = () => {
    const next = !isDarkMode;
    setIsDarkMode(next);
    if (next) document.documentElement.setAttribute('data-theme', 'dark');
    else document.documentElement.removeAttribute('data-theme');
  };

  const getNavIcon = (iconName) => {
    switch (iconName) {
      case 'IconDashboard': return <IconDashboard />;
      case 'IconProjects': return <IconProjects />;
      case 'IconTeam': return <IconTeam />;
      case 'IconDeadlines': return <IconDeadlines />;
      default: return <IconDashboard />;
    }
  };

  return (
    <div className="db-root">
      {/* ── SIDEBAR ─────────────────────────────── */}
      <aside className="db-sidebar">
        <div className="db-sidebar-top">
          {/* Brand */}
          <div className="db-sidebar-brand" onClick={() => handleNavChange('dashboard')} style={{ cursor: 'pointer' }}>
            <IconLogo />
            <span className="db-sidebar-name">{brandingConfig.brandName}</span>
          </div>

          {/* Navigation Links */}
          <nav className="db-nav">
            {navItems.map((item) => {
              const isActive = activeNav === item.key;
              return (
                <a
                  key={item.key}
                  href={item.hash}
                  className={`db-nav-item ${item.key === 'deadlines' ? 'db-nav-item--deadlines' : ''} ${isActive ? 'db-nav-item--active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavChange(item.key);
                  }}
                >
                  <span className="db-nav-icon">{getNavIcon(item.icon)}</span>
                  <span className="db-nav-label">{item.label}</span>
                  {item.badgeKey && (
                    <span className="db-nav-badge">{deadlinesCount}</span>
                  )}
                </a>
              );
            })}
          </nav>
        </div>

        {/* Bottom Profile & Logout */}
        <div className="db-sidebar-bottom">
          <div className="db-sidebar-user-card" onClick={() => setIsSettingsOpen(true)} title="Customize profile">
            <div className="db-user-avatar">
              {userProfile.initials || getInitials(userProfile.name)}
            </div>
            <div className="db-user-info">
              <div className="db-user-name">{userProfile.name}</div>
              <div className="db-user-role">{userProfile.role}</div>
            </div>
          </div>

          <button
            type="button"
            className="db-sidebar-logout-btn"
            onClick={() => {
              setIsSettingsOpen(false);
              setIsLogoutModalOpen(true);
            }}
          >
            <span>Logout</span>
            <IconLogout />
          </button>
        </div>
      </aside>

      {/* ── MAIN AREA ───────────────────────────── */}
      <div className="db-main-area">
        {/* HEADER */}
        <header className="db-header">
          <div className="db-header-left">
            <button
              type="button"
              className="db-mobile-menu-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              title="Toggle navigation"
              aria-label="Toggle navigation"
            >
              {isMobileMenuOpen ? <IconClose /> : <IconMenu />}
            </button>
            <h1 className="db-page-title">
              {selectedProject
                ? pageTitles.projectDetails
                : pageTitles[activeNav] || pageTitles.dashboard}
            </h1>
          </div>

          <div className="db-header-right">
            {/* Global Live Search Bar & Popover */}
            <div className="db-search-wrapper" ref={searchRef}>
              <div className="db-search">
                <span className="db-search-icon"><IconSearch /></span>
                <input
                  className="db-search-input"
                  placeholder="Search projects, clients..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setIsSearchOpen(true);
                    setSelectedIndex(-1);
                  }}
                  onFocus={() => setIsSearchOpen(true)}
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') {
                      setIsSearchOpen(false);
                    } else if (e.key === 'ArrowDown') {
                      e.preventDefault();
                      if (allFlatResults.length > 0) {
                        setSelectedIndex((prev) => (prev + 1) % allFlatResults.length);
                      }
                    } else if (e.key === 'ArrowUp') {
                      e.preventDefault();
                      if (allFlatResults.length > 0) {
                        setSelectedIndex((prev) => (prev - 1 + allFlatResults.length) % allFlatResults.length);
                      }
                    } else if (e.key === 'Enter' && selectedIndex >= 0 && selectedIndex < allFlatResults.length) {
                      e.preventDefault();
                      handleSelectResult(allFlatResults[selectedIndex]);
                    }
                  }}
                />
                {searchQuery && (
                  <button
                    type="button"
                    className="db-search-clear"
                    onClick={() => {
                      setSearchQuery('');
                      setIsSearchOpen(false);
                      setSelectedIndex(-1);
                    }}
                    title="Clear search"
                    aria-label="Clear search"
                  >
                    <IconClose />
                  </button>
                )}
              </div>

              {isSearchOpen && (
                <div className="db-search-popover">
                  {searchQuery.trim() === '' ? (
                    <div className="db-search-section">
                      <div className="db-search-section-title">Quick Navigation</div>
                      <div
                        className="db-search-item"
                        onClick={() => {
                          handleNavChange('projects');
                          setIsSearchOpen(false);
                        }}
                      >
                        <div className="db-search-item-icon"><IconProjects /></div>
                        <div className="db-search-item-info">
                          <div className="db-search-item-title">All Projects</div>
                          <div className="db-search-item-sub">Browse 300+ agency engagements</div>
                        </div>
                      </div>
                      <div
                        className="db-search-item"
                        onClick={() => {
                          handleNavChange('team');
                          setIsSearchOpen(false);
                        }}
                      >
                        <div className="db-search-item-icon"><IconTeam /></div>
                        <div className="db-search-item-info">
                          <div className="db-search-item-title">Team Roster</div>
                          <div className="db-search-item-sub">View member workload & capacity</div>
                        </div>
                      </div>
                      <div
                        className="db-search-item"
                        onClick={() => {
                          handleNavChange('deadlines');
                          setIsSearchOpen(false);
                        }}
                      >
                        <div className="db-search-item-icon"><IconClock /></div>
                        <div className="db-search-item-info">
                          <div className="db-search-item-title">Upcoming Deadlines</div>
                          <div className="db-search-item-sub">Alerts & project milestones</div>
                        </div>
                      </div>
                    </div>
                  ) : allFlatResults.length === 0 ? (
                    <div className="db-search-empty">
                      <div className="db-empty-title">No results found for "<strong>{searchQuery}</strong>"</div>
                      <div className="db-empty-sub">Try searching by project name, client, team lead, or category.</div>
                    </div>
                  ) : (
                    <>
                      {/* Projects Section */}
                      {matchingProjects.length > 0 && (
                        <div className="db-search-section">
                          <div className="db-search-section-title">Projects ({matchingProjects.length})</div>
                          {matchingProjects.map((p, idx) => {
                            const isSelected = selectedIndex === idx;
                            return (
                              <div
                                key={idx}
                                className={`db-search-item ${isSelected ? 'is-keyboard-selected' : ''}`}
                                onClick={() => handleSelectResult({ type: 'project', data: p })}
                              >
                                <div className="db-search-item-icon">
                                  <IconProjects />
                                </div>
                                <div className="db-search-item-info">
                                  <div className="db-search-item-title">
                                    {highlightMatch(p.name, searchQuery)}
                                  </div>
                                  <div className="db-search-item-sub">
                                    {highlightMatch(p.client, searchQuery)} · {highlightMatch(p.category, searchQuery)} · PM: {highlightMatch(p.pmName, searchQuery)}
                                  </div>
                                </div>
                                <span className="db-search-item-badge">
                                  {p.status}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {/* Clients Section */}
                      {matchingClients.length > 0 && (
                        <div className="db-search-section">
                          <div className="db-search-section-title">Clients ({matchingClients.length})</div>
                          {matchingClients.map((c, idx) => {
                            const flatIdx = matchingProjects.length + idx;
                            const isSelected = selectedIndex === flatIdx;
                            return (
                              <div
                                key={idx}
                                className={`db-search-item ${isSelected ? 'is-keyboard-selected' : ''}`}
                                onClick={() => handleSelectResult({ type: 'client', data: c })}
                              >
                                <div className="db-search-item-icon">
                                  <IconProjects />
                                </div>
                                <div className="db-search-item-info">
                                  <div className="db-search-item-title">
                                    {highlightMatch(c.name, searchQuery)}
                                  </div>
                                  <div className="db-search-item-sub">Client Account · {c.category}</div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {/* Team Section */}
                      {matchingTeam.length > 0 && (
                        <div className="db-search-section">
                          <div className="db-search-section-title">Team Members ({matchingTeam.length})</div>
                          {matchingTeam.map((t, idx) => {
                            const flatIdx = matchingProjects.length + matchingClients.length + idx;
                            const isSelected = selectedIndex === flatIdx;
                            return (
                              <div
                                key={idx}
                                className={`db-search-item ${isSelected ? 'is-keyboard-selected' : ''}`}
                                onClick={() => handleSelectResult({ type: 'team', data: t })}
                              >
                                <div className="db-search-item-avatar">
                                  {t.initials}
                                </div>
                                <div className="db-search-item-info">
                                  <div className="db-search-item-title">
                                    {highlightMatch(t.name, searchQuery)}
                                  </div>
                                  <div className="db-search-item-sub">{t.role}</div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {/* Deadlines Section */}
                      {matchingDeadlines.length > 0 && (
                        <div className="db-search-section">
                          <div className="db-search-section-title">Deadlines ({matchingDeadlines.length})</div>
                          {matchingDeadlines.map((d, idx) => {
                            const flatIdx = matchingProjects.length + matchingClients.length + matchingTeam.length + idx;
                            const isSelected = selectedIndex === flatIdx;
                            return (
                              <div
                                key={idx}
                                className={`db-search-item ${isSelected ? 'is-keyboard-selected' : ''}`}
                                onClick={() => handleSelectResult({ type: 'deadline', data: d })}
                              >
                                <div className="db-search-item-icon">
                                  <IconClock />
                                </div>
                                <div className="db-search-item-info">
                                  <div className="db-search-item-title">
                                    {highlightMatch(d.label, searchQuery)}
                                  </div>
                                  <div className="db-search-item-sub">{d.sub} · Deadline in {d.daysLeft}d</div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Header Right Actions */}
            <div className="db-header-actions">
              <button className="db-icon-btn" onClick={toggleTheme} title="Toggle theme" aria-label="Toggle dark/light theme">
                {isDarkMode ? <IconSun /> : <IconMoon />}
              </button>

              {/* Notifications Popover */}
              <div style={{ position: 'relative' }} ref={notifRef}>
                <button
                  type="button"
                  className={`db-icon-btn ${isNotifOpen ? 'is-active' : ''}`}
                  onClick={() => setIsNotifOpen(!isNotifOpen)}
                  title="Notifications"
                  aria-label="View notifications"
                >
                  <IconBell />
                  {hasUnreadNotifs && readNotifIndices.length < notificationItems.length && (
                    <span className="db-notif-dot" />
                  )}
                </button>

                {isNotifOpen && (
                  <div className="db-notif-popover">
                    <div className="db-notif-header">
                      <span className="db-notif-header-title">Notifications</span>
                      <button
                        type="button"
                        className="db-notif-close-btn"
                        onClick={() => setIsNotifOpen(false)}
                        aria-label="Close notifications"
                      >
                        <IconClose />
                      </button>
                    </div>

                    <div className="db-notif-list">
                      {notificationItems.map((item, idx) => {
                        const isRead = !hasUnreadNotifs || readNotifIndices.includes(idx);
                        return (
                          <div
                            key={idx}
                            className={`db-notif-item ${isRead ? 'is-read' : ''}`}
                            onClick={() => {
                              if (!readNotifIndices.includes(idx)) {
                                setReadNotifIndices((prev) => [...prev, idx]);
                              }
                            }}
                          >
                            <div
                              className="db-notif-icon-badge"
                              style={{
                                backgroundColor: item.bg,
                                color: item.color,
                                opacity: isRead ? 0.55 : 1,
                              }}
                            >
                              {item.iconType === 'alert-triangle' && <IconAlertTriangle />}
                              {item.iconType === 'clock' && <IconClock />}
                              {item.iconType === 'check-circle' && <IconCheckCircle />}
                              {item.iconType === 'bell' && <IconBell />}
                            </div>
                            <div
                              className="db-notif-item-content"
                              style={{ opacity: isRead ? 0.6 : 1 }}
                            >
                              <div className="db-notif-item-title">{item.title}</div>
                              <div className="db-notif-item-sub">{item.sub}</div>
                              <div className="db-notif-item-date">{item.date}</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="db-notif-footer">
                      <button
                        type="button"
                        className="db-notif-footer-btn"
                        onClick={handleMarkAllAsRead}
                        style={{
                          opacity: (!hasUnreadNotifs || readNotifIndices.length === notificationItems.length) ? 0.5 : 1,
                          cursor: (!hasUnreadNotifs || readNotifIndices.length === notificationItems.length) ? 'default' : 'pointer',
                        }}
                      >
                        {(!hasUnreadNotifs || readNotifIndices.length === notificationItems.length)
                          ? 'All Marked As Read'
                          : 'Mark All As Read'}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* New Project CTA */}
              <button className="db-btn-primary" onClick={() => setIsNewProjectOpen(true)} title="New Project">
                <IconPlus />
                <span>New Project</span>
              </button>
            </div>
          </div>
        </header>

        {/* SCROLLABLE CONTENT */}
        <main className="db-content">
          {selectedProject ? (
            <ProjectDetailsPage
              project={selectedProject}
              onBack={() => setSelectedProject(null)}
              onUpdateProject={handleUpdateProject}
            />
          ) : activeNav === 'projects' ? (
            <ProjectsPage
              projectsList={allProjectsList}
              onViewDetails={(proj) => setSelectedProject(proj)}
              onDeleteProject={handleDeleteProject}
              onUpdateProjectsList={(newList) => {
                setAllProjectsList(newList);
                saveProjects(newList);
              }}
            />
          ) : activeNav === 'team' ? (
            <TeamPage />
          ) : activeNav === 'deadlines' ? (
            <DeadlinesPage
              projectsList={allProjectsList}
              onViewDetails={(proj) => setSelectedProject(proj)}
            />
          ) : (
            <>
              {/* ── ROW 1: TOP METRICS ─────────────────── */}
              <div className="db-metrics-row">
                {topMetrics.map((m, i) => (
                  <div key={i} className="db-metric-card">
                    <div className="db-metric-top">
                      <div>
                        <div className="db-metric-label">{m.label}</div>
                        <div className="db-metric-value">{m.value}</div>
                        <div className="db-metric-sub">{m.sub}</div>
                      </div>
                      <div className={`db-metric-icon db-metric-icon--${m.type}`}>
                        {m.icon}
                      </div>
                    </div>
                    {m.trend && (
                      <div className="db-metric-trend">
                        <span className={`db-metric-trend-val ${m.trendUp ? 'db-metric-trend-up' : 'db-metric-trend-down'}`}>
                          {m.trendUp ? <IconArrowUpRight /> : <IconArrowDownRight />}
                          <span>{m.trend}</span>
                        </span>
                        <span className="db-metric-trend-label">vs last month</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* ── ROW 2: BOTTOM METRICS ──────────────── */}
              <div className="db-metrics-row2">
                {bottomMetrics.map((m, i) => (
                  <div key={i} className="db-metric-card2">
                    <div className={`db-metric2-icon db-metric-icon--${m.type}`}>
                      {m.icon}
                    </div>
                    <div>
                      <div className="db-metric-label">{m.label}</div>
                      <div className="db-metric-value2">{m.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* ── ROW 3: CHARTS ──────────────────────── */}
              <div className="db-charts-row">
                {/* Revenue Overview */}
                <div className="db-card db-chart-card">
                  <div className="db-card-header">
                    <div>
                      <div className="db-card-title">Revenue Overview</div>
                      <div className="db-card-sub">Collected vs outstanding — last 6 months</div>
                    </div>
                    <div className="db-chart-legend">
                      <span className="db-legend-dot" style={{ background: '#0C61CF' }}/> Revenue
                      <span className="db-legend-dot" style={{ background: '#F59E0B', marginLeft: '12px' }}/> Outstanding
                    </div>
                  </div>
                  <div className="db-chart-scroll-wrapper">
                    <RevenueChart />
                  </div>
                </div>

                {/* By Category */}
                <div
                  className="db-card db-category-card"
                  onMouseMove={handleCategoryMouseMove}
                  onMouseLeave={() => setHoveredCategory(null)}
                >
                  <div className="db-card-title" style={{ marginBottom: '4px' }}>By Category</div>
                  <div className="db-card-sub" style={{ marginBottom: '16px' }}>Project mix &amp; revenue</div>
                  <div className="db-category-scroll-wrapper">
                    <div className="db-category-body">
                      <DonutChart hoveredCategory={hoveredCategory} setHoveredCategory={setHoveredCategory} />
                      <div className="db-category-legend">
                        {categoryBreakdownData.map((c, i) => (
                          <div
                            key={i}
                            className={`db-cat-row ${hoveredCategory === i ? 'db-cat-row--active' : ''}`}
                            onMouseEnter={() => setHoveredCategory(i)}
                            onMouseLeave={() => setHoveredCategory(null)}
                            style={{ cursor: 'pointer' }}
                          >
                            <span className="db-legend-dot" style={{ background: c.color, flexShrink: 0 }}/>
                            <span className="db-cat-name">{c.name}</span>
                            <span className="db-cat-count">{c.count}</span>
                            <span className="db-cat-rev">{c.revenue}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {hoveredCategory !== null && (
                    <div
                      className="db-category-tooltip"
                      style={{
                        left: `${Math.min(categoryMousePos.x + 12, 175)}px`,
                        top: `${Math.max(10, categoryMousePos.y - 38)}px`,
                      }}
                    >
                      {categoryBreakdownData[hoveredCategory].fullName}: {categoryBreakdownData[hoveredCategory].count} Projects
                    </div>
                  )}
                </div>
              </div>

              {/* ── ROW 4: PROJECTS + DEADLINES ────────── */}
              <div className="db-bottom-row">
                {/* Active Projects Table */}
                <div className="db-card db-projects-card">
                  <div className="db-card-header" style={{ marginBottom: '12px' }}>
                    <div>
                      <div className="db-card-title">Active Projects</div>
                      <div className="db-card-sub">Highest-priority engagements</div>
                    </div>
                    <button
                      type="button"
                      className="db-view-all"
                      onClick={() => handleNavChange('projects')}
                    >
                      View All <IconChevronRight />
                    </button>
                  </div>
                  <div className="db-table-wrapper">
                    <table className="db-table">
                      <thead>
                        <tr>
                          <th>Project</th>
                          <th>Category</th>
                          <th>Status</th>
                          <th>Deadline</th>
                        </tr>
                      </thead>
                      <tbody>
                        {activeProjects.map((p, i) => (
                          <tr
                            key={p.id || i}
                            style={{ cursor: 'pointer' }}
                            onClick={() => setSelectedProject(p)}
                          >
                            <td>
                              <div className="db-proj-name">{p.name}</div>
                              <div className="db-proj-client">{p.client}</div>
                            </td>
                            <td>
                              <span className="db-cat-pill">{p.category}</span>
                            </td>
                            <td>
                              <StatusBadge
                                status={p.status || 'Active'}
                              />
                            </td>
                            <td className="db-table-date">{p.deadline}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Upcoming Deadlines */}
                <div className="db-card db-deadlines-card">
                  <div className="db-card-header" style={{ marginBottom: '12px' }}>
                    <div>
                      <div className="db-card-title">Upcoming Deadlines</div>
                      <div className="db-card-sub">Next 14 days</div>
                    </div>
                    <button
                      type="button"
                      className="db-view-all"
                      onClick={() => handleNavChange('deadlines')}
                    >
                      View All <IconChevronRight />
                    </button>
                  </div>
                  <div className="db-deadlines-list">
                    {dashboardDeadlines.map((d, i) => (
                      <div key={i} className="db-deadline-item">
                        <div className="db-deadline-badge" style={{ background: d.color + '20', color: d.color }}>
                          {d.daysLeft}d
                        </div>
                        <div>
                          <div className="db-deadline-name">{d.label}</div>
                          <div className="db-deadline-sub">{d.sub}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ── ROW 5: TEAM WORKLOAD + ACTIVITY ────── */}
              <div className="db-bottom-row">
                {/* Team Workload */}
                <div className="db-card db-workload-card">
                  <div className="db-card-header" style={{ marginBottom: '16px' }}>
                    <div>
                      <div className="db-card-title">Team Workload</div>
                      <div className="db-card-sub">Active tasks per member</div>
                    </div>
                    <button
                      type="button"
                      className="db-view-all"
                      onClick={() => handleNavChange('team')}
                    >
                      Manage <IconChevronRight />
                    </button>
                  </div>
                  <div className="db-workload-list">
                    {dashboardTeamWorkload.map((m, i) => (
                      <div key={i} className="db-workload-item">
                        <Avatar initials={m.initials} gradient={avatarColors[i % avatarColors.length]} size={32} />
                        <div className="db-workload-details">
                          <div className="db-workload-name">{m.name}</div>
                          <ProgressBar pct={m.pct} color={m.color} />
                        </div>
                        <span className="db-workload-count">{m.tasks}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="db-card db-activity-card">
                  <div className="db-card-header" style={{ marginBottom: '16px' }}>
                    <div>
                      <div className="db-card-title">Recent Activity</div>
                      <div className="db-card-sub">Across all projects</div>
                    </div>
                  </div>
                  <div className="db-activity-list">
                    {activityList.map((a, i) => (
                      <div key={i} className="db-activity-item">
                        <Avatar initials={a.initials} gradient={a.color} size={32} />
                        <div>
                          <div className="db-activity-text">
                            <span className="db-activity-name">{a.name}</span>{' '}
                            <span className="db-activity-action">{a.action}</span>
                          </div>
                          <div className="db-activity-sub">{a.sub}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </main>

        {/* ── NEW PROJECT MODAL ── */}
        {isNewProjectOpen && (
          <NewProjectModal
            onClose={() => setIsNewProjectOpen(false)}
            onCreateProject={(newProjData) => {
              handleCreateProject(newProjData);
              setIsNewProjectOpen(false);
            }}
          />
        )}

        {/* ── SETTINGS / PROFILE MODAL ── */}
        <SettingsModal
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          userProfile={userProfile}
          onSave={(updated) => {
            const saved = saveStoredUserProfile(updated);
            setUserProfile(saved);
          }}
        />

        {/* ── LOGOUT CONFIRMATION MODAL ── */}
        {isLogoutModalOpen && (
          <div className="db-logout-overlay" onClick={() => setIsLogoutModalOpen(false)}>
            <div className="db-logout-modal" onClick={(e) => e.stopPropagation()}>
              <div className="db-logout-icon-wrap">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="7" x2="12" y2="13" />
                  <circle cx="12" cy="17" r="0.75" fill="#FFFFFF" strokeWidth="1" />
                </svg>
              </div>

              <div className="db-logout-text-wrap">
                <h2 className="db-logout-title">Logout</h2>
                <p className="db-logout-desc">
                  Are you sure you want to log out of the dashboard?
                </p>
              </div>

              <div className="db-logout-actions">
                <button
                  type="button"
                  className="db-logout-btn-cancel"
                  onClick={() => setIsLogoutModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="db-logout-btn-confirm"
                  onClick={() => {
                    setIsLogoutModalOpen(false);
                    onLogout();
                  }}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── MOBILE NAVIGATION DRAWER ── */}
        {isMobileMenuOpen && (
          <div className="db-mobile-drawer-overlay" onClick={() => setIsMobileMenuOpen(false)}>
            <div className="db-mobile-drawer" onClick={(e) => e.stopPropagation()}>
              <div className="db-mobile-drawer-header">
                <div className="db-sidebar-brand">
                  <IconLogo />
                  <span className="db-sidebar-name">{brandingConfig.brandName}</span>
                </div>
                <button
                  type="button"
                  className="db-mobile-menu-close"
                  onClick={() => setIsMobileMenuOpen(false)}
                  title="Close Menu"
                  aria-label="Close menu"
                >
                  <IconClose />
                </button>
              </div>

              <nav className="db-mobile-nav">
                {navItems.map((item) => {
                  const isActive = activeNav === item.key;
                  return (
                    <a
                      key={item.key}
                      href={item.hash}
                      className={`db-nav-item ${item.key === 'deadlines' ? 'db-nav-item--deadlines' : ''} ${isActive ? 'db-nav-item--active' : ''}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavChange(item.key);
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <span className="db-nav-icon">{getNavIcon(item.icon)}</span>
                      <span className="db-nav-label">{item.label}</span>
                      {item.badgeKey && (
                        <span className="db-nav-badge">{deadlinesCount}</span>
                      )}
                    </a>
                  );
                })}
              </nav>

              <div className="db-mobile-drawer-bottom">
                <div
                  className="db-sidebar-user-card"
                  onClick={() => {
                    setIsSettingsOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  title="Customize profile"
                >
                  <div className="db-user-avatar">{userProfile.initials || getInitials(userProfile.name)}</div>
                  <div className="db-user-info">
                    <div className="db-user-name">{userProfile.name}</div>
                    <div className="db-user-role">{userProfile.role}</div>
                  </div>
                </div>

                <button
                  type="button"
                  className="db-sidebar-logout-btn"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsLogoutModalOpen(true);
                  }}
                >
                  <span>Logout</span>
                  <IconLogout />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

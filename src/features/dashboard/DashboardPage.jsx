import React, { useState } from 'react';
import ProjectsPage, { all300Projects } from '../projects/ProjectsPage';
import ProjectDetailsPage from '../projects/ProjectDetailsPage';
import TeamPage from '../team/TeamPage';
import DeadlinesPage, { overduePaymentsList } from '../deadlines/DeadlinesPage';
import NewProjectModal from '../projects/NewProjectModal';
import SettingsModal from './SettingsModal';
import agencyosLogo from '../../assets/agencyos-logo.png';

function parseCurrencyValue(str) {
  if (!str) return 0;
  const digits = String(str).replace(/[^\d]/g, '');
  return digits ? parseInt(digits, 10) : 0;
}

function formatIndonesianCurrency(amount) {
  if (!amount || amount <= 0) return 'Rp 0';
  if (amount >= 1000000000) {
    const formatted = (amount / 1000000000).toFixed(1);
    return `Rp ${formatted} M`;
  }
  if (amount >= 1000000) {
    const formatted = Math.round(amount / 1000000);
    return `Rp ${formatted} jt`;
  }
  return `Rp ${amount.toLocaleString('id-ID')}`;
}

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

/* ─────────────────────────────────────────────
   INLINE SVG ICONS  (all from Figma design)
───────────────────────────────────────────── */
const IconLogo = () => (
  <img
    src={agencyosLogo}
    alt="AgencyOS Logo"
    width="36"
    height="36"
    style={{ borderRadius: '8px', objectFit: 'contain', display: 'block' }}
  />
);

// Dashboard — 2×2 grid of rounded squares (matches Figma exactly)
const IconDashboard = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <rect x="2.5" y="2.5" width="6.5" height="6.5" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
    <rect x="11" y="2.5" width="6.5" height="6.5" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
    <rect x="2.5" y="11" width="6.5" height="6.5" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
    <rect x="11" y="11" width="6.5" height="6.5" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

// Projects — folder icon with table lines (matches Figma)
const IconProjects = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M2 7.5C2 6.4 2.9 5.5 4 5.5H7.5L9 7.5H16C17.1 7.5 18 8.4 18 9.5V15C18 16.1 17.1 17 16 17H4C2.9 17 2 16.1 2 15V7.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="none"/>
    <path d="M5.5 11h9M5.5 13.5h6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
  </svg>
);

// Team — person with group circle (matches Figma)
const IconTeam = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="7.5" cy="6.5" r="2.75" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M2 16.5C2 13.7 4.5 11.5 7.5 11.5C10.5 11.5 13 13.7 13 16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="14.5" cy="7.5" r="2" stroke="currentColor" strokeWidth="1.3"/>
    <path d="M17 16.5C17 14.6 15.9 13 14.5 12.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
  </svg>
);

// Deadlines — calendar with clock overlay (matches Figma)
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

const IconSettings = () => (
  <svg width="20" height="20" viewBox="0 0 17 17" fill="none">
    <path d="M8.12321 4.99916C6.39987 4.99916 4.99821 6.40083 4.99821 8.12416C4.99821 9.84749 6.39987 11.2492 8.12321 11.2492C9.84654 11.2492 11.2482 9.84749 11.2482 8.12416C11.2482 6.40083 9.84654 4.99916 8.12321 4.99916ZM8.12321 9.99916C7.08904 9.99916 6.24821 9.15833 6.24821 8.12416C6.24821 7.08999 7.08904 6.24916 8.12321 6.24916C9.15737 6.24916 9.99821 7.08999 9.99821 8.12416C9.99821 9.15833 9.15737 9.99916 8.12321 9.99916ZM15.7965 9.75166C15.2182 9.41666 14.8582 8.79333 14.8574 8.12416C14.8565 7.45666 15.214 6.83417 15.7999 6.49501C16.229 6.24584 16.3757 5.69332 16.1274 5.26332L14.7341 2.85833C14.4857 2.42916 13.9332 2.28167 13.5032 2.52917C12.9207 2.865 12.1966 2.865 11.6124 2.52584C11.0366 2.19167 10.6782 1.57083 10.6782 0.904999C10.6782 0.405832 10.2715 0 9.77238 0H6.47653C5.97653 0 5.57072 0.405832 5.57072 0.904999C5.57072 1.57083 5.21237 2.19166 4.63487 2.52749C4.05237 2.86499 3.32904 2.86582 2.74654 2.52998C2.31571 2.28165 1.76405 2.43 1.51572 2.85917L0.120709 5.26667C-0.127624 5.69584 0.0198652 6.24748 0.453199 6.49915C1.0307 6.83332 1.39071 7.45582 1.39238 8.12332C1.39404 8.79165 1.03571 9.41583 0.450706 9.75499C0.242373 9.87583 0.0923747 10.07 0.0307081 10.3033C-0.0309586 10.5358 0.00071538 10.7783 0.121549 10.9875L1.51404 13.3908C1.76237 13.8208 2.31488 13.97 2.74654 13.7208C3.32904 13.385 4.05155 13.3858 4.62571 13.7183L4.62737 13.7192C4.62987 13.7208 4.63238 13.7225 4.63571 13.7242C5.21154 14.0583 5.56903 14.6791 5.5682 15.3458C5.5682 15.845 5.97403 16.2508 6.4732 16.2508H9.77238C10.2715 16.2508 10.6774 15.845 10.6774 15.3467C10.6774 14.68 11.0357 14.0592 11.614 13.7233C12.1957 13.3858 12.919 13.3842 13.5024 13.7208C13.9324 13.9692 14.484 13.8217 14.7332 13.3925L16.1282 10.985C16.3757 10.5542 16.2282 10.0017 15.7965 9.75166ZM13.8157 12.48C12.9074 12.0842 11.8532 12.1383 10.9849 12.6408C10.124 13.14 9.55571 14.0225 9.44571 14.9992H6.79821C6.68988 14.0225 6.11986 13.1383 5.25903 12.64C4.39236 12.1375 3.33655 12.0842 2.43071 12.48L1.36738 10.6441C2.16321 10.0583 2.64403 9.11834 2.6407 8.11834C2.6382 7.125 2.15821 6.19166 1.36654 5.60582L2.43071 3.76915C3.33738 4.16415 4.39321 4.11082 5.26155 3.60748C6.12155 3.10915 6.68986 2.22583 6.79986 1.25H9.44571C9.55488 2.22667 10.124 3.10916 10.9865 3.60916C11.8524 4.11166 12.9082 4.16499 13.8157 3.76999L14.8799 5.60582C14.0857 6.19082 13.6057 7.12916 13.6074 8.12749C13.6082 9.12249 14.0882 10.0575 14.8807 10.645L13.8157 12.48Z" fill="currentColor"/>
  </svg>
);

const IconPlus = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M12.5 5.83333H7.5V0.833333C7.5 0.373333 7.12667 0 6.66667 0C6.20667 0 5.83333 0.373333 5.83333 0.833333V5.83333H0.833333C0.373333 5.83333 0 6.20667 0 6.66667C0 7.12667 0.373333 7.5 0.833333 7.5H5.83333V12.5C5.83333 12.96 6.20667 13.3333 6.66667 13.3333C7.12667 13.3333 7.5 12.96 7.5 12.5V7.5H12.5C12.96 7.5 13.3333 7.12667 13.3333 6.66667C13.3333 6.20667 12.96 5.83333 12.5 5.83333Z" fill="white"/>
  </svg>
);

const IconChevronDown = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
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

// Metric card icon components (adaptive to theme via currentColor)
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

const IconZap = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M10 2L4 10h6l-2 6 8-8h-6l2-6z" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinejoin="round"/>
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

const notificationItems = [
  {
    type: 'overdue',
    title: 'Project Overdue',
    sub: 'Project C is overdue',
    date: '20 Jul 2026',
    bg: 'var(--fg-error-transparent, #FEF2F2)',
    color: 'var(--icon-color-error, #D92D20)',
    icon: <IconAlertTriangle />,
  },
  {
    type: 'overdue',
    title: 'Project Overdue',
    sub: 'Project H is overdue',
    date: '20 Jul 2026',
    bg: 'var(--fg-error-transparent, #FEF2F2)',
    color: 'var(--icon-color-error, #D92D20)',
    icon: <IconAlertTriangle />,
  },
  {
    type: 'at_risk',
    title: 'Project At Risk',
    sub: 'Project G is at_risk',
    date: '20 Jul 2026',
    bg: 'var(--fg-warning-transparent, #FFFAEB)',
    color: 'var(--icon-color-warning, #DC6803)',
    icon: <IconClock />,
  },
  {
    type: 'at_risk',
    title: 'Project At Risk',
    sub: 'Project N is at_risk',
    date: '20 Jul 2026',
    bg: 'var(--fg-warning-transparent, #FFFAEB)',
    color: 'var(--icon-color-warning, #DC6803)',
    icon: <IconClock />,
  },
  {
    type: 'completed',
    title: 'Project Completed',
    sub: 'Project A — Digital Marketing was completed',
    date: '18 Jul 2026',
    bg: 'var(--fg-success-transparent, #ECFDF3)',
    color: 'var(--icon-color-success, #067647)',
    icon: <IconCheckCircle />,
  },
  {
    type: 'upcoming',
    title: 'Upcoming Deadline',
    sub: 'Project X deadline is in 24 days',
    date: '17 Jul 2026',
    bg: 'var(--fg-info-transparent, #EFF6FF)',
    color: 'var(--icon-color-info, #0C61CF)',
    icon: <IconBell />,
  },
];

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */

const categoryData = [
  { name: 'Branding', fullName: 'Branding', count: 8, revenue: 'Rp 1.7 M', color: '#FF9352' },
  { name: 'Web Development', fullName: 'Web Development', count: 8, revenue: 'Rp 911 jt', color: '#00D500' },
  { name: 'Social Media Design', fullName: 'Social Media Design', count: 13, revenue: 'Rp 872 jt', color: '#FDB022' },
  { name: 'Digital Marketing', fullName: 'Digital Marketing', count: 9, revenue: 'Rp 711 jt', color: '#6E64DE' },
  { name: 'Mobile App Development', fullName: 'Mobile App Development', count: 9, revenue: 'Rp 510 jt', color: '#95BAEB' },
  { name: 'UI/UX Design', fullName: 'UI/UX Design', count: 5, revenue: 'Rp 465 jt', color: '#F14437' },
];

const projects = [
  { name: 'Project C — Social Media Design', client: 'Rp budi Bandung · Social Media Design', status: 'Pending', statusColor: '#F59E0B', statusBg: '#FFFAEB', progress: 37, deadline: '21 Aug 2026', budget: 'Rp 446 JT' },
  { name: 'Project M — Mobile App Development', client: 'Aginka Coffee · Mobile App Development', status: 'Resolved', statusColor: '#067647', statusBg: '#ECFDF3', progress: 58, deadline: '21 Jun 2026', budget: 'Rp 142 JT' },
  { name: 'Project P — Mobile App Development', client: 'Naftyan Satan · Mobile App Development', status: 'In Progress', statusColor: '#0C61CF', statusBg: '#EFF6FF', progress: 29, deadline: '15 Aug 2026', budget: 'Rp 72 JT' },
  { name: 'Project R — UI/UX Design', client: 'Dano Travel · UI/UX Design', status: 'Resolved', statusColor: '#067647', statusBg: '#ECFDF3', progress: 13, deadline: '13 Nov 2026', budget: 'Rp 76 JT' },
  { name: 'Project T — Web Development', client: 'Teknologi Muria · Web Development', status: 'Overdue', statusColor: '#D92D20', statusBg: '#FEF2F2', progress: 59, deadline: '4 Nov 2026', budget: 'Rp 271 JT' },
  { name: 'Project E — Branding', client: 'Plan Teknologi · Branding', status: 'Resolved', statusColor: '#067647', statusBg: '#ECFDF3', progress: 83, deadline: '4 Jun 2025', budget: 'Rp 405 JT' },
];

const deadlines = [
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

const teamWorkload = [
  { initials: 'SD', name: 'Sinta Dewi', tasks: '10/15', pct: 67, color: '#3B82F6' },
  { initials: 'CM', name: 'Citra Maharani', tasks: '9/15', pct: 60, color: '#F59E0B' },
  { initials: 'GR', name: 'Galih Ramadhan', tasks: '8/15', pct: 53, color: '#10B981' },
  { initials: 'LM', name: 'Lina Martina', tasks: '8/15', pct: 53, color: '#8B5CF6' },
  { initials: 'NA', name: 'Nadia Anggraini', tasks: '8/15', pct: 53, color: '#EC4899' },
  { initials: 'SW', name: 'Sarah Wijaya', tasks: '7/15', pct: 47, color: '#6366F1' },
  { initials: 'KD', name: 'Kevin Dara', tasks: '4/15', pct: 27, color: '#14B8A6' },
];

const avatarColors = [
  'linear-gradient(135deg, #40CCEA 0%, #0891B2 100%)',
  'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
  'linear-gradient(135deg, #10B981 0%, #059669 100%)',
  'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
  'linear-gradient(135deg, #EC4899 0%, #DB2777 100%)',
  'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)',
  'linear-gradient(135deg, #14B8A6 0%, #0D9488 100%)',
];

const recentActivity = [
  { initials: 'RS', name: 'Rangga Saputra', action: 'project "sisemsi kpk" was created', sub: 'Sisemsi KPK · 55m ago', color: avatarColors[0] },
  { initials: 'DN', name: 'Dimas Nugraha', action: 'project "website tokopedia" was created', sub: 'Website Tokopedia · 1h ago', color: avatarColors[2] },
  { initials: 'CM', name: 'Citra Maharani', action: 'project status updated to planning', sub: 'Project Q — Mobile App Development · 19 Jul 2026', color: avatarColors[1] },
  { initials: 'CM', name: 'Citra Maharani', action: 'a file was uploaded', sub: 'Project P — Mobile App Development · 19 Jul 2026', color: avatarColors[1] },
  { initials: 'BH', name: 'Bayu Hartanto', action: 'a team member joined the project', sub: 'Project I — Mobile App Development · 19 Jul 2026', color: avatarColors[5] },
  { initials: 'RS', name: 'Rangga Saputra', action: 'a team member joined the project', sub: 'Project J — Social Media Design · 19 Jul 2026', color: avatarColors[0] },
  { initials: 'BH', name: 'Bayu Hartanto', action: 'project status updated to active', sub: 'Project T — Digital Marketing · 19 Jul 2026', color: avatarColors[5] },
  { initials: 'DN', name: 'Dimas Nugraha', action: 'project status updated to completed', sub: 'Project Q — Mobile App Development · 18 Jul 2026', color: avatarColors[2] },
];

/* ─────────────────────────────────────────────
   REVENUE CHART  (pure SVG)
───────────────────────────────────────────── */
/* ─────────────────────────────────────────────
   REVENUE CHART  (pure SVG + interactive hover tooltip)
───────────────────────────────────────────── */
function RevenueChart() {
  const [hoveredIndex, setHoveredIndex] = useState(null); // Only show when hovering

  const monthsData = [
    { month: 'Mar', revenue: 'Rp 0', outstanding: 'Rp 0', revVal: 0, outVal: 0 },
    { month: 'Apr', revenue: 'Rp 0', outstanding: 'Rp 0', revVal: 0, outVal: 0 },
    { month: 'May', revenue: 'Rp 120.000.000', outstanding: 'Rp 80.000.000', revVal: 0.12, outVal: 0.08 },
    { month: 'Jun', revenue: 'Rp 1.850.000.000', outstanding: 'Rp 720.000.000', revVal: 1.85, outVal: 0.72 },
    { month: 'Jul', revenue: 'Rp 4.015.249.993', outstanding: 'Rp 4.387.416.664', revVal: 4.015, outVal: 4.387 },
    { month: 'Aug', revenue: 'Rp 0', outstanding: 'Rp 0', revVal: 0, outVal: 0 },
  ];

  const W = 570, H = 170;
  const maxVal = 6.0; // 6.0 M scale

  // Points along chart width W
  const points = monthsData.map((d, i) => {
    const x = (i / (monthsData.length - 1)) * W;
    const revY = H * (1 - d.revVal / maxVal);
    const outY = H * (1 - d.outVal / maxVal);
    return { ...d, x, revY, outY };
  });

  // Smooth curve generators
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

  // Tooltip positioning relative to SVG container
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
        {/* Y-axis labels */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: `${H}px`, paddingBottom: '0px', flexShrink: 0 }}>
          {yLabels.map(l => (
            <span key={l} style={{ fontSize: '10px', color: 'var(--text-tertiary)', whiteSpace: 'nowrap', lineHeight: 1 }}>{l}</span>
          ))}
        </div>

        {/* Chart SVG + Overlay */}
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

            {/* Grid lines */}
            {[0, 0.25, 0.5, 0.75, 1].map((t, i) => (
              <line key={i} x1="0" y1={t * H} x2={W} y2={t * H} stroke="var(--border-subtle, #E9EAEB)" strokeWidth="1"/>
            ))}

            {/* Area fill */}
            <path d={blueArea} fill="url(#blueGrad)"/>

            {/* Blue line */}
            <path d={blueLine} fill="none" stroke="#0C61CF" strokeWidth="2.5" strokeLinejoin="round"/>

            {/* Orange line */}
            <path d={orangeLine} fill="none" stroke="#F59E0B" strokeWidth="2.5" strokeLinejoin="round"/>

            {/* Active vertical guide line & dots */}
            {activePoint && (
              <g style={{ pointerEvents: 'none' }}>
                {/* Vertical dashed line */}
                <line
                  x1={activePoint.x}
                  y1="0"
                  x2={activePoint.x}
                  y2={H}
                  stroke="var(--border-primary, #D5D7DA)"
                  strokeWidth="1.2"
                  strokeDasharray="4 4"
                />
                {/* Orange dot */}
                <circle
                  cx={activePoint.x}
                  cy={activePoint.outY}
                  r="4.5"
                  fill="#F59E0B"
                  stroke="#ffffff"
                  strokeWidth="2"
                />
                {/* Blue dot */}
                <circle
                  cx={activePoint.x}
                  cy={activePoint.revY}
                  r="4.5"
                  fill="#0C61CF"
                  stroke="#ffffff"
                  strokeWidth="2"
                />
              </g>
            )}

            {/* Interactive hover detection bands */}
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

          {/* Tooltip Popup */}
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

          {/* X-axis month labels */}
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

/* ─────────────────────────────────────────────
   DONUT CHART  (pure SVG + hover interaction)
───────────────────────────────────────────── */
function DonutChart({ hoveredCategory, setHoveredCategory }) {
  const total = 52;
  const size = 176;
  const cx = size / 2; // 88
  const cy = size / 2; // 88
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
      {/* Background circle */}
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#F0F1F3" strokeWidth={strokeW}/>

      {/* Colored category slices */}
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

      {/* Center text: 52 Projects */}
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

/* ─────────────────────────────────────────────
   PROGRESS BAR
───────────────────────────────────────────── */
function ProgressBar({ pct, color = '#0C61CF' }) {
  return (
    <div className="db-progress-track">
      <div style={{ width: `${pct}%`, height: '100%', borderRadius: '3px', background: color, transition: 'width 0.3s ease' }}/>
    </div>
  );
}

/* ─────────────────────────────────────────────
   STATUS BADGE (Figma Node 21163:19509)
───────────────────────────────────────────── */
function StatusBadge({ status }) {
  const statusKey = (status || 'Active').toLowerCase().replace(/\s+/g, '-');
  return (
    <span className={`status-badge status-${statusKey}`}>
      <span className="status-dot" />
      {status}
    </span>
  );
}

/* ─────────────────────────────────────────────
   AVATAR
───────────────────────────────────────────── */
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

function getInitials(fullName) {
  if (!fullName) return 'AO';
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export default function DashboardPage({ onLogout, currentUser }) {
  const [activeNav, setActiveNav] = useState('dashboard');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [categoryMousePos, setCategoryMousePos] = useState({ x: 0, y: 0 });
  const [isNewProjectOpen, setIsNewProjectOpen] = useState(false);
  const [allProjectsList, setAllProjectsList] = useState(all300Projects);
  const [activityList, setActivityList] = useState(recentActivity);
  const [userProfile, setUserProfile] = useState(() => {
    try {
      const stored = localStorage.getItem('agencyos_user_profile');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed?.name) return parsed;
      }
    } catch (e) {
      console.warn('Failed to parse user profile from localStorage:', e);
    }
    const displayName = currentUser?.displayName;
    const email = currentUser?.email || 'admin@agencyos.app';
    const fallbackName = displayName || (currentUser?.email ? currentUser.email.split('@')[0] : 'Agency Owner');
    return {
      name: fallbackName,
      role: 'Agency Owner',
      email: email,
      initials: getInitials(fallbackName),
      taskThreshold: 30,
      emailNotifications: true,
    };
  });

  React.useEffect(() => {
    if (currentUser?.displayName) {
      setUserProfile((prev) => {
        if (prev.name === currentUser.displayName && prev.email === currentUser.email) return prev;
        const updated = {
          ...prev,
          name: currentUser.displayName,
          email: currentUser.email || prev.email,
          initials: getInitials(currentUser.displayName),
        };
        try {
          localStorage.setItem('agencyos_user_profile', JSON.stringify(updated));
        } catch (e) {}
        return updated;
      });
    }
  }, [currentUser]);

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [hasUnreadNotifs, setHasUnreadNotifs] = useState(true);
  const [readNotifIndices, setReadNotifIndices] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = React.useRef(null);
  const notifRef = React.useRef(null);

  const handleMarkAllAsRead = () => {
    setHasUnreadNotifs(false);
    setReadNotifIndices(notificationItems.map((_, i) => i));
  };

  React.useEffect(() => {
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

  // 1. Projects
  const matchingProjects = React.useMemo(() => {
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

  // 2. Clients
  const matchingClients = React.useMemo(() => {
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

  // 3. Team Members & Project Managers
  const matchingTeam = React.useMemo(() => {
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

  // 4. Deadlines
  const matchingDeadlines = React.useMemo(() => {
    if (!queryLower) return [];
    return (deadlines || [])
      .filter(
        (d) =>
          d &&
          (safeIncludes(d.name, queryLower) ||
            safeIncludes(d.days, queryLower) ||
            safeIncludes(d.status, queryLower))
      )
      .slice(0, 3);
  }, [queryLower]);

  // Flat array for keyboard navigation
  const allFlatResults = React.useMemo(() => {
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
      setActiveNav('projects');
      setSelectedProject(null);
    } else if (item.type === 'team') {
      setActiveNav('team');
      setSelectedProject(null);
    } else if (item.type === 'deadline') {
      setActiveNav('deadlines');
      setSelectedProject(null);
    }
    setIsSearchOpen(false);
  };

  const activeProjects = React.useMemo(() => {
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

  const kpiStats = React.useMemo(() => {
    const list = allProjectsList || [];
    const totalEngagements = list.length;
    const activeCount = list.filter((p) => p && p.status === 'Active').length;
    const atRiskCount = list.filter((p) => p && p.status === 'At Risk').length;
    const overdueCount = list.filter((p) => p && p.status === 'Overdue').length;
    const completedCount = list.filter((p) => p && (p.status === 'Completed' || p.status === 'Resolved')).length;
    const uniqueClientsCount = new Set(list.map((p) => p?.client).filter(Boolean)).size;

    // Financial Outstanding calculation from authoritative overduePaymentsList
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
  }, [allProjectsList]);

  const topMetrics = React.useMemo(() => [
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

  const bottomMetrics = React.useMemo(() => [
    { label: 'Completed', value: `${kpiStats.completedCount}`, icon: <IconCheck />, type: 'completed' },
    { label: 'Tasks Done', value: '158 / 502', icon: <IconTasks />, type: 'tasks' },
    { label: 'Avg Progress', value: '52%', icon: <IconTrend />, type: 'progress' },
    { label: 'Clients', value: `${kpiStats.uniqueClientsCount}`, icon: <IconUsers />, type: 'clients' },
  ], [kpiStats]);

  const deadlinesCount = React.useMemo(() => {
    return 27; // Matches Figma Node 21083:233
  }, []);

  const handleCreateProject = (newProjData) => {
    const newProj = {
      id: Date.now(),
      name: newProjData.name,
      client: newProjData.client,
      category: newProjData.category,
      status: newProjData.status || 'Active',
      statusColor:
        newProjData.status === 'Completed'
          ? '#067647'
          : newProjData.status === 'Overdue'
          ? '#D92D20'
          : newProjData.status === 'At Risk'
          ? '#DC6803'
          : newProjData.status === 'Planning'
          ? '#717680'
          : '#0C61CF',
      statusBg:
        newProjData.status === 'Completed'
          ? '#ECFDF3'
          : newProjData.status === 'Overdue'
          ? '#FEF2F2'
          : newProjData.status === 'At Risk'
          ? '#FFFAEB'
          : newProjData.status === 'Planning'
          ? '#F4F5F7'
          : '#EFF6FF',
      pmInitials: newProjData.pmInitials || 'RS',
      pmName: newProjData.pmName || 'Rangga Saputra',
      pmGrad: newProjData.pmGrad || 'linear-gradient(135deg, #40CCEA 0%, #0891B2 100%)',
      deadline: newProjData.deadline || '25 Desember 2026',
      budget: newProjData.budget ? `${newProjData.budget}` : 'Rp 1.000.000',
    };

    setAllProjectsList((prev) => [newProj, ...prev]);

    // Create activity record matching Figma design:
    // e.g., "Rangga Saputra project \"sosmed kpk\" was created"
    // "Sosmed KPK · 58m ago" / "Just now"
    const newActivityItem = {
      initials: newProjData.pmInitials || 'RS',
      name: newProjData.pmName || 'Rangga Saputra',
      action: `project "${newProjData.name.toLowerCase()}" was created`,
      sub: `${newProjData.client} · Just now`,
      color: newProjData.pmGrad || avatarColors[0],
    };

    setActivityList((prev) => [newActivityItem, ...prev]);
    setIsNewProjectOpen(false);
  };

  const handleUpdateProject = (updatedProj) => {
    setSelectedProject(updatedProj);
    setAllProjectsList((prev) =>
      prev.map((p) => (p.name === updatedProj.name || (p.id && p.id === updatedProj.id) ? updatedProj : p))
    );
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

  return (
    <div className="db-root">
      {/* ── SIDEBAR ─────────────────────────────── */}
      <aside className="db-sidebar">
        {/* Top section: brand + nav */}
        <div className="db-sidebar-top">
          {/* Brand */}
          <div className="db-sidebar-brand">
            <IconLogo />
            <span className="db-sidebar-name">AgencyOS</span>
          </div>

          {/* Nav — 16px padding, items 230px wide, gap 8px */}
          <nav className="db-nav">
            {/* Dashboard */}
            <a
              href="#dashboard"
              className={`db-nav-item ${activeNav === 'dashboard' ? 'db-nav-item--active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                setActiveNav('dashboard');
                setSelectedProject(null);
              }}
            >
              <span className="db-nav-icon"><IconDashboard /></span>
              <span className="db-nav-label">Dashboard</span>
            </a>

            {/* Projects */}
            <a
              href="#projects"
              className={`db-nav-item ${activeNav === 'projects' ? 'db-nav-item--active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                setActiveNav('projects');
                setSelectedProject(null);
              }}
            >
              <span className="db-nav-icon"><IconProjects /></span>
              <span className="db-nav-label">Projects</span>
            </a>

            {/* Team */}
            <a
              href="#team"
              className={`db-nav-item ${activeNav === 'team' ? 'db-nav-item--active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                setActiveNav('team');
                setSelectedProject(null);
              }}
            >
              <span className="db-nav-icon"><IconTeam /></span>
              <span className="db-nav-label">Team</span>
            </a>

            {/* Deadlines — badge on right */}
            <a
              href="#deadlines"
              className={`db-nav-item db-nav-item--deadlines ${activeNav === 'deadlines' ? 'db-nav-item--active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                setActiveNav('deadlines');
                setSelectedProject(null);
              }}
            >
              <span className="db-nav-icon"><IconDeadlines /></span>
              <span className="db-nav-label">Deadlines</span>
              <span className="db-nav-badge">{deadlinesCount}</span>
            </a>
          </nav>
        </div>

        {/* Bottom: User profile & Logout */}
        <div className="db-sidebar-bottom">
          <div className="db-sidebar-user-card" onClick={() => setIsSettingsOpen(true)} title="Customize profile">
            <div className="db-user-avatar">
              {userProfile.initials}
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
            >
              {isMobileMenuOpen ? <IconClose /> : <IconMenu />}
            </button>
            <h1 className="db-page-title">
              {selectedProject
                ? 'Projects Details'
                : activeNav === 'projects'
                ? 'Projects'
                : activeNav === 'team'
                ? 'Team'
                : activeNav === 'deadlines'
                ? 'Deadlines & Alerts'
                : 'Dashboard'}
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
                  onFocus={() => {
                    setIsSearchOpen(true);
                  }}
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
                          setActiveNav('projects');
                          setSelectedProject(null);
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
                          setActiveNav('team');
                          setSelectedProject(null);
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
                          setActiveNav('deadlines');
                          setSelectedProject(null);
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
                            const flatIdx = idx;
                            const isSelected = selectedIndex === flatIdx;
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
                                    {highlightMatch(d.name, searchQuery)}
                                  </div>
                                  <div className="db-search-item-sub">Deadline in {d.days}</div>
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

            {/* Right Actions Group (Frame 11 in Figma spec) */}
            <div className="db-header-actions">
              <button className="db-icon-btn" onClick={toggleTheme} title="Toggle theme">
                {isDarkMode ? <IconSun /> : <IconMoon />}
              </button>

              {/* Notifications Button & Popover */}
              <div style={{ position: 'relative' }} ref={notifRef}>
                <button
                  type="button"
                  className={`db-icon-btn ${isNotifOpen ? 'is-active' : ''}`}
                  onClick={() => setIsNotifOpen(!isNotifOpen)}
                  title="Notifications"
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
                              {item.icon}
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

              {/* CTA */}
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
              onDeleteProject={(deletedId) => {
                setAllProjectsList((prev) =>
                  prev.filter((p) => (p.id !== undefined && p.id !== null ? p.id !== deletedId : p.name !== deletedId))
                );
              }}
              onUpdateProjectsList={(newList) => setAllProjectsList(newList)}
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
                    {categoryData.map((c, i) => (
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

              {/* Interactive Tooltip Card that follows cursor movement */}
              {hoveredCategory !== null && (
                <div
                  className="db-category-tooltip"
                  style={{
                    left: `${Math.min(categoryMousePos.x + 12, 175)}px`,
                    top: `${Math.max(10, categoryMousePos.y - 38)}px`,
                  }}
                >
                  {categoryData[hoveredCategory].fullName}: {categoryData[hoveredCategory].count} Projects
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
                  onClick={() => setActiveNav('projects')}
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
                          color={p.statusColor || '#0C61CF'}
                          bg={p.statusBg || '#EFF6FF'}
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
                  onClick={() => setActiveNav('deadlines')}
                >
                  View All <IconChevronRight />
                </button>
              </div>
              <div className="db-deadlines-list">
                {deadlines.map((d, i) => (
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
                  onClick={() => setActiveNav('team')}
                >
                  Manage <IconChevronRight />
                </button>
              </div>
              <div className="db-workload-list">
                {teamWorkload.map((m, i) => (
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

        {/* ── NEW PROJECT POPUP MODAL ── */}
        {isNewProjectOpen && (
          <NewProjectModal
            onClose={() => setIsNewProjectOpen(false)}
            onCreateProject={(newProjData) => {
              handleCreateProject(newProjData);
              setIsNewProjectOpen(false);
            }}
          />
        )}

        {/* ── SETTINGS / PROFILE POPUP MODAL ── */}
        <SettingsModal
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          userProfile={userProfile}
          onSave={(updated) => {
            setUserProfile(updated);
            try {
              localStorage.setItem('agencyos_user_profile', JSON.stringify(updated));
            } catch (e) {
              console.warn('Failed to save profile:', e);
            }
          }}
        />

        {/* ── LOGOUT CONFIRMATION POPUP MODAL ── */}
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

        {/* ── MOBILE NAVIGATION DRAWER OVERLAY ── */}
        {isMobileMenuOpen && (
          <div className="db-mobile-drawer-overlay" onClick={() => setIsMobileMenuOpen(false)}>
            <div className="db-mobile-drawer" onClick={(e) => e.stopPropagation()}>
              <div className="db-mobile-drawer-header">
                <div className="db-sidebar-brand">
                  <IconLogo />
                  <span className="db-sidebar-name">AgencyOS</span>
                </div>
                <button
                  type="button"
                  className="db-mobile-menu-close"
                  onClick={() => setIsMobileMenuOpen(false)}
                  title="Close Menu"
                >
                  <IconClose />
                </button>
              </div>

              <nav className="db-mobile-nav">
                <a
                  href="#dashboard"
                  className={`db-nav-item ${activeNav === 'dashboard' ? 'db-nav-item--active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveNav('dashboard');
                    setSelectedProject(null);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <span className="db-nav-icon"><IconDashboard /></span>
                  <span className="db-nav-label">Dashboard</span>
                </a>

                <a
                  href="#projects"
                  className={`db-nav-item ${activeNav === 'projects' ? 'db-nav-item--active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveNav('projects');
                    setSelectedProject(null);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <span className="db-nav-icon"><IconProjects /></span>
                  <span className="db-nav-label">Projects</span>
                </a>

                <a
                  href="#team"
                  className={`db-nav-item ${activeNav === 'team' ? 'db-nav-item--active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveNav('team');
                    setSelectedProject(null);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <span className="db-nav-icon"><IconTeam /></span>
                  <span className="db-nav-label">Team</span>
                </a>

                <a
                  href="#deadlines"
                  className={`db-nav-item db-nav-item--deadlines ${activeNav === 'deadlines' ? 'db-nav-item--active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveNav('deadlines');
                    setSelectedProject(null);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <span className="db-nav-icon"><IconDeadlines /></span>
                  <span className="db-nav-label">Deadlines</span>
                  <span className="db-nav-badge">{deadlinesCount}</span>
                </a>
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
                  <div className="db-user-avatar">{userProfile.initials}</div>
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

import React, { useState, useEffect, useRef } from 'react';
import agencyosLogo from '../../assets/agencyos-logo.png';
import './LandingPage.css';

// ─── SVG ICONS (inline, no extra dep) ─────────────────────
const IconLogo = ({ size = 36 }) => (
  <img
    src={agencyosLogo}
    alt="AgencyOS Logo"
    width={size}
    height={size}
    style={{ borderRadius: '8px', objectFit: 'contain', display: 'block' }}
  />
);

const IconArrowRight = () => (
  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.16669 10H15.8334M15.8334 10L10.8334 5M15.8334 10L10.8334 15" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconCheck = () => (
  <svg viewBox="0 0 12 12" fill="none">
    <path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconChevronRight = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconBriefcase = () => (
  <svg viewBox="0 0 20 20" fill="none">
    <path d="M7 4a2 2 0 012-2h2a2 2 0 012 2v1H7V4zM3 7h14a1 1 0 011 1v7a2 2 0 01-2 2H4a2 2 0 01-2-2V8a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const IconClock = () => (
  <svg viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M10 6v4l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const IconUsers = () => (
  <svg viewBox="0 0 20 20" fill="none">
    <path d="M9 11a4 4 0 100-8 4 4 0 000 8zm-7 8a7 7 0 0114 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M19 21a5 5 0 00-5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M15 7a4 4 0 010 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const IconDollar = () => (
  <svg viewBox="0 0 20 20" fill="none">
    <path d="M10 2v1m0 14v1M6 10H4m12 0h-2M7.05 7.05l-1.41-1.41m8.71 8.71l-1.41-1.41M7.05 12.95l-1.41 1.41M15.76 5.64l-1.41 1.41" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

const IconTrendUp = () => (
  <svg viewBox="0 0 20 20" fill="none">
    <path d="M2 14l5-5 4 4 6-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M13 6h4v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconBell = () => (
  <svg viewBox="0 0 20 20" fill="none">
    <path d="M10 2a6 6 0 016 6v3l1 2H3l1-2V8a6 6 0 016-6z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M8 16a2 2 0 004 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const IconZap = () => (
  <svg viewBox="0 0 20 20" fill="none">
    <path d="M11 2L4 12h7l-2 6 9-10h-7l2-6z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconGrid = () => (
  <svg viewBox="0 0 20 20" fill="none">
    <rect x="3" y="3" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
    <rect x="11" y="3" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
    <rect x="3" y="11" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
    <rect x="11" y="11" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

const IconStar = () => (
  <svg viewBox="0 0 20 20" fill="none">
    <path d="M10 1l2.39 6.26H19l-5.42 3.94 2.07 6.26L10 13.52l-5.65 3.94 2.07-6.26L1 7.26h6.61L10 1z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconMoon = () => (
  <svg viewBox="0 0 20 20" fill="none">
    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const IconSmartphone = () => (
  <svg viewBox="0 0 20 20" fill="none">
    <rect x="4" y="2" width="12" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="10" cy="15" r="1" fill="currentColor"/>
  </svg>
);

const IconAlertCircle = () => (
  <svg viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M10 6v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="10" cy="14" r="0.5" fill="currentColor" stroke="currentColor"/>
  </svg>
);

const IconWarning = () => (
  <svg viewBox="0 0 20 20" fill="none">
    <path d="M10 3L2 17h16L10 3z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10 9v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="10" cy="14" r="0.5" fill="currentColor" stroke="currentColor"/>
  </svg>
);

const IconCheckCircle = () => (
  <svg viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M7 10l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// ─── SCROLL REVEAL HOOK ────────────────────────────────────
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    const el = ref.current;
    if (el) observer.observe(el);
    return () => el && observer.unobserve(el);
  }, []);
  return ref;
}

// ─── CHECK ICON ────────────────────────────────────────────
const CheckIcon = () => (
  <span className="lp-check-icon">
    <IconCheck />
  </span>
);

// ─── AUTHENTIC DASHBOARD MOCKUP (Light & Dark) ─────────────
const DashboardMockup = ({ theme = 'light' }) => {
  const isDark = theme === 'dark';
  return (
    <div className={`lp-hdm-root ${isDark ? 'theme-dark' : 'theme-light'}`}>
      {/* SIDEBAR */}
      <aside className="lp-hdm-sidebar">
        <div className="lp-hdm-sidebar-top">
          <div className="lp-hdm-brand">
            <IconLogo size={24} />
            <span className="lp-hdm-brand-name">AgencyOS</span>
          </div>
          <nav className="lp-hdm-nav">
            <div className="lp-hdm-nav-item is-active">
              <span className="lp-hdm-nav-icon"><IconGrid /></span>
              <span>Dashboard</span>
            </div>
            <div className="lp-hdm-nav-item">
              <span className="lp-hdm-nav-icon"><IconBriefcase /></span>
              <span>Projects</span>
            </div>
            <div className="lp-hdm-nav-item">
              <span className="lp-hdm-nav-icon"><IconUsers /></span>
              <span>Team</span>
            </div>
            <div className="lp-hdm-nav-item">
              <span className="lp-hdm-nav-icon"><IconClock /></span>
              <span>Deadlines</span>
              <span className="lp-hdm-nav-badge">7</span>
            </div>
          </nav>
        </div>
        <div className="lp-hdm-sidebar-bottom">
          <div className="lp-hdm-user-card">
            <div className="lp-hdm-user-avatar">HA</div>
            <div className="lp-hdm-user-info">
              <div className="lp-hdm-user-name">Hanif Abbads</div>
              <div className="lp-hdm-user-role">Operations Lead</div>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN AREA */}
      <div className="lp-hdm-main">
        {/* HEADER */}
        <header className="lp-hdm-header">
          <div className="lp-hdm-page-title">Dashboard</div>
          <div className="lp-hdm-header-right">
            <div className="lp-hdm-search">
              <span className="lp-hdm-search-icon">🔍</span>
              <span className="lp-hdm-search-placeholder">Search projects, clients...</span>
            </div>
            <div className="lp-hdm-header-actions">
              <div className="lp-hdm-icon-btn"><IconBell /><span className="lp-hdm-notif-dot" /></div>
              <div className="lp-hdm-btn-primary">+ New Project</div>
            </div>
          </div>
        </header>

        {/* CONTENT BODY */}
        <div className="lp-hdm-content">
          {/* ROW 1: TOP 4 METRICS */}
          <div className="lp-hdm-metrics-row">
            <div className="lp-hdm-metric-card">
              <div className="lp-hdm-metric-label">Active Projects</div>
              <div className="lp-hdm-metric-val-row">
                <span className="lp-hdm-metric-val">12</span>
                <span className="lp-hdm-metric-tag tag-risk">3 at risk</span>
              </div>
              <div className="lp-hdm-metric-sub">+2 vs last month</div>
            </div>
            <div className="lp-hdm-metric-card">
              <div className="lp-hdm-metric-label">Team Capacity</div>
              <div className="lp-hdm-metric-val-row">
                <span className="lp-hdm-metric-val">87%</span>
                <span className="lp-hdm-metric-tag tag-blue">High</span>
              </div>
              <div className="lp-hdm-metric-bar"><div className="lp-hdm-bar-fill" style={{ width: '87%' }} /></div>
            </div>
            <div className="lp-hdm-metric-card">
              <div className="lp-hdm-metric-label">Deadlines This Week</div>
              <div className="lp-hdm-metric-val-row">
                <span className="lp-hdm-metric-val">5</span>
                <span className="lp-hdm-metric-tag tag-warning">2 due today</span>
              </div>
              <div className="lp-hdm-metric-sub">Across 4 clients</div>
            </div>
            <div className="lp-hdm-metric-card">
              <div className="lp-hdm-metric-label">Monthly Revenue</div>
              <div className="lp-hdm-metric-val-row">
                <span className="lp-hdm-metric-val">Rp 845 jt</span>
              </div>
              <div className="lp-hdm-metric-sub tag-success-text">↗ +12% vs last month</div>
            </div>
          </div>

          {/* ROW 2: CHARTS */}
          <div className="lp-hdm-charts-row">
            <div className="lp-hdm-card lp-hdm-chart-revenue">
              <div className="lp-hdm-card-header">
                <div>
                  <div className="lp-hdm-card-title">Revenue Overview</div>
                  <div className="lp-hdm-card-sub">Collected vs outstanding — last 6 months</div>
                </div>
                <div className="lp-hdm-chart-legend">
                  <span className="lp-hdm-dot dot-blue" /> Revenue
                  <span className="lp-hdm-dot dot-amber" style={{ marginLeft: 8 }} /> Outstanding
                </div>
              </div>
              <div className="lp-hdm-bar-chart">
                {[
                  { month: 'Jan', rev: 45, out: 15 },
                  { month: 'Feb', rev: 60, out: 20 },
                  { month: 'Mar', rev: 50, out: 12 },
                  { month: 'Apr', rev: 75, out: 25 },
                  { month: 'May', rev: 68, out: 18 },
                  { month: 'Jun', rev: 92, out: 30 },
                ].map((b, i) => (
                  <div className="lp-hdm-bar-group" key={i}>
                    <div className="lp-hdm-bars-pair">
                      <div className="lp-hdm-bar bar-rev" style={{ height: `${b.rev}%` }} />
                      <div className="lp-hdm-bar bar-out" style={{ height: `${b.out}%` }} />
                    </div>
                    <span className="lp-hdm-bar-month">{b.month}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lp-hdm-card lp-hdm-chart-category">
              <div className="lp-hdm-card-title">By Category</div>
              <div className="lp-hdm-card-sub">Project mix & revenue</div>
              <div className="lp-hdm-cat-list">
                {[
                  { name: 'Brand Identity', pct: '40%', rev: 'Rp 338jt', color: isDark ? '#3A7FD8' : '#0C61CF' },
                  { name: 'Mobile App', pct: '30%', rev: 'Rp 253jt', color: '#10B981' },
                  { name: 'Web Dev', pct: '20%', rev: 'Rp 169jt', color: '#F59E0B' },
                  { name: 'Marketing', pct: '10%', rev: 'Rp 85jt', color: '#8B5CF6' },
                ].map((c, i) => (
                  <div className="lp-hdm-cat-row" key={i}>
                    <span className="lp-hdm-dot" style={{ background: c.color }} />
                    <span className="lp-hdm-cat-name">{c.name}</span>
                    <span className="lp-hdm-cat-pct">{c.pct}</span>
                    <span className="lp-hdm-cat-rev">{c.rev}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ROW 3: ACTIVE PROJECTS TABLE */}
          <div className="lp-hdm-card lp-hdm-table-card">
            <div className="lp-hdm-card-header">
              <div>
                <div className="lp-hdm-card-title">Active Projects</div>
                <div className="lp-hdm-card-sub">Highest-priority engagements</div>
              </div>
              <div className="lp-hdm-view-all">View All →</div>
            </div>
            <table className="lp-hdm-table">
              <thead>
                <tr>
                  <th>Project</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Progress</th>
                  <th>Deadline</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'Tokopedia Brand Identity', client: 'PT Tokopedia', cat: 'Brand Identity', status: 'Active', sCls: 'tag-active', prog: 72, date: '15 Mar 2026' },
                  { name: 'Mandiri Mobile App UX', client: 'Bank Mandiri', cat: 'Mobile App', status: 'At Risk', sCls: 'tag-risk', prog: 45, date: '28 Feb 2026' },
                  { name: 'Pegadaian UX Redesign', client: 'PT Pegadaian', cat: 'Web Dev', status: 'Active', sCls: 'tag-active', prog: 88, date: '10 Mar 2026' },
                  { name: 'Bukalapak Campaign Engine', client: 'Bukalapak', cat: 'Marketing', status: 'In Review', sCls: 'tag-blue', prog: 95, date: '04 Mar 2026' },
                ].map((p, i) => (
                  <tr key={i}>
                    <td>
                      <div className="lp-hdm-proj-name">{p.name}</div>
                      <div className="lp-hdm-proj-client">{p.client}</div>
                    </td>
                    <td><span className="lp-hdm-cat-badge">{p.cat}</span></td>
                    <td><span className={`lp-hdm-status-badge ${p.sCls}`}>{p.status}</span></td>
                    <td>
                      <div className="lp-hdm-table-prog">
                        <div className="lp-hdm-table-prog-bar"><div className="lp-hdm-bar-fill" style={{ width: `${p.prog}%` }} /></div>
                        <span>{p.prog}%</span>
                      </div>
                    </td>
                    <td className="lp-hdm-table-date">{p.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const HeroDashboardMockup = () => <DashboardMockup theme="light" />;

// ─── FEATURE SHOWCASE UI MOCKS ──────────────────────────────
const ProjectPipelineUI = () => (
  <div className="lp-showcase-ui">
    <div className="lp-showcase-ui-header">Project Pipeline</div>
    <div className="lp-showcase-ui-body">
      <div className="lp-ui-pipeline-stats">
        <div className="lp-ui-stat"><div className="lp-ui-stat-num">3</div><div className="lp-ui-stat-lbl">Planning</div></div>
        <div className="lp-ui-stat"><div className="lp-ui-stat-num">12</div><div className="lp-ui-stat-lbl">Active</div></div>
        <div className="lp-ui-stat"><div className="lp-ui-stat-num">3</div><div className="lp-ui-stat-lbl">At Risk</div></div>
        <div className="lp-ui-stat"><div className="lp-ui-stat-num">7</div><div className="lp-ui-stat-lbl">Done</div></div>
      </div>
      <div className="lp-ui-rows">
        {[
          { name: 'Tokopedia Brand Identity', pct: '72%', tag: 'Active', cls: 'active', dot: '#22C55E' },
          { name: 'Mandiri Mobile App UX', pct: '45%', tag: 'At Risk', cls: 'risk', dot: '#EF4444' },
          { name: 'Pegadaian Redesign', pct: '88%', tag: 'Active', cls: 'active', dot: '#22C55E' },
          { name: 'Bukalapak Campaign', pct: '20%', tag: 'Planning', cls: '', dot: '#A3A7AE' },
        ].map((r, i) => (
          <div className="lp-ui-row" key={i}>
            <div className="lp-ui-row-dot" style={{ background: r.dot }} />
            <div className="lp-ui-row-name">{r.name}</div>
            <div className={`lp-ui-row-tag ${r.cls}`}>{r.tag}</div>
            <div className="lp-ui-row-pct">{r.pct}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const TeamWorkloadUI = () => (
  <div className="lp-showcase-ui">
    <div className="lp-showcase-ui-header">Team Workload</div>
    <div className="lp-showcase-ui-body">
      <div className="lp-ui-team-rows">
        {[
          { initials: 'DP', name: 'Dinda Permata', count: '8/10', pct: 80, cls: '', avCls: 'a1' },
          { initials: 'RA', name: 'Reza Aditya', count: '10/10', pct: 100, cls: 'overload', avCls: 'a2' },
          { initials: 'SW', name: 'Sari Wulandari', count: '4/8', pct: 50, cls: '', avCls: 'a3' },
          { initials: 'BS', name: 'Budi Santoso', count: '6/8', pct: 75, cls: '', avCls: 'a4' },
        ].map((m, i) => (
          <div className="lp-ui-team-row" key={i}>
            <div className={`lp-ui-avatar ${m.avCls}`}>{m.initials}</div>
            <div className="lp-ui-team-info">
              <div className="lp-ui-team-name">{m.name}</div>
              <div className="lp-ui-team-bar-wrap">
                <div className={`lp-ui-team-bar ${m.cls}`} style={{ width: `${m.pct}%` }} />
              </div>
            </div>
            <div className="lp-ui-team-count">{m.count}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const NotificationsUI = () => (
  <div className="lp-showcase-ui">
    <div className="lp-showcase-ui-header">Notifications</div>
    <div className="lp-ui-notif-rows">
      {[
        { Icon: IconAlertCircle, cls: 'danger', title: 'Mandiri App overdue', time: '2d ago' },
        { Icon: IconWarning, cls: 'warning', title: 'Tokopedia deadline in 3 days', time: '5h ago' },
        { Icon: IconCheckCircle, cls: 'success', title: 'New payment received', time: '1d ago' },
        { Icon: IconBell, cls: 'warning', title: 'Reza Aditya at capacity', time: '3h ago' },
      ].map((n, i) => (
        <div className="lp-ui-notif-row" key={i}>
          <div className={`lp-ui-notif-icon ${n.cls}`}><n.Icon /></div>
          <div className="lp-ui-notif-body">
            <div className="lp-ui-notif-title">{n.title}</div>
            <div className="lp-ui-notif-time">{n.time}</div>
          </div>
          {i < 2 && <div className="lp-ui-notif-dot" />}
        </div>
      ))}
    </div>
  </div>
);

const RevenueUI = () => {
  const bars = [30, 52, 42, 68, 58, 88, 72];
  return (
    <div className="lp-showcase-ui">
      <div className="lp-showcase-ui-header">Revenue Overview — Last 6 months</div>
      <div className="lp-showcase-ui-body">
        <div className="lp-ui-revenue">
          <div className="lp-ui-revenue-vals">
            <div className="lp-ui-revenue-val">
              <div className="lp-ui-revenue-val-num">Rp 845jt</div>
              <div className="lp-ui-revenue-val-lbl">Revenue</div>
            </div>
            <div className="lp-ui-revenue-val">
              <div className="lp-ui-revenue-val-num">Rp 127jt</div>
              <div className="lp-ui-revenue-val-lbl">Outstanding</div>
            </div>
            <div className="lp-ui-revenue-val">
              <div className="lp-ui-revenue-val-num">Rp 42jt</div>
              <div className="lp-ui-revenue-val-lbl">Overdue</div>
            </div>
          </div>
          <div className="lp-ui-chart-bars">
            {bars.map((h, i) => (
              <div
                key={i}
                className={`lp-ui-chart-bar ${i === bars.length - 2 || i === bars.length - 1 ? 'peak' : ''}`}
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
          <div className="lp-ui-chart-labels">
            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'].map((m) => (
              <div key={m} className="lp-ui-chart-label">{m}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};



// ─── MAIN LANDING PAGE ─────────────────────────────────────
export default function LandingPage({ onGetStarted }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Scroll state for sticky navbar
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => { if (window.innerWidth > 900) setMobileOpen(false); };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Smooth scroll helper
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMobileOpen(false);
  };

  // Reveal refs
  const revealTrusted    = useReveal();
  const revealProblem    = useReveal();
  const revealSolution   = useReveal();
  const revealFeatures   = useReveal();
  const revealHiw        = useReveal();
  const revealExperience = useReveal();
  const revealPreview    = useReveal();
  const revealCta        = useReveal();

  return (
    <div className="lp-root">
      {/* ── 01. NAVBAR ─────────────────────────────────── */}
      <nav className={`lp-nav${scrolled ? ' scrolled' : ''}`}>
        <div className="lp-nav-inner">
          {/* Logo */}
          <div className="lp-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <IconLogo size={36} />
            <span className="lp-logo-name">AgencyOS</span>
          </div>

          {/* Desktop links */}
          <div className="lp-nav-links">
            <button className="lp-nav-link" onClick={() => scrollTo('lp-features')}>Features</button>
            <button className="lp-nav-link" onClick={() => scrollTo('lp-hiw')}>How it works</button>
            <button className="lp-nav-link" onClick={() => scrollTo('lp-experience')}>Benefits</button>
          </div>

          {/* Desktop CTA */}
          <div className="lp-nav-cta">
            <button className="lp-nav-login-btn" onClick={onGetStarted}>
              <span>Login</span>
              <IconArrowRight />
            </button>
          </div>

          {/* Hamburger */}
          <button
            className="lp-hamburger"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`lp-mobile-menu${mobileOpen ? ' open' : ''}`}>
        <button className="lp-mobile-link" onClick={() => scrollTo('lp-features')}>Features</button>
        <button className="lp-mobile-link" onClick={() => scrollTo('lp-hiw')}>How it works</button>
        <button className="lp-mobile-link" onClick={() => scrollTo('lp-experience')}>Benefits</button>
        <div className="lp-mobile-cta">
          <button
            className="lp-nav-login-btn"
            style={{ width: '100%', justifyContent: 'center' }}
            onClick={() => { onGetStarted(); setMobileOpen(false); }}
          >
            <span>Login</span>
            <IconArrowRight />
          </button>
        </div>
      </div>

      {/* ── 02. HERO ────────────────────────────────────── */}
      <section className="lp-hero" id="lp-hero">
        <div className="lp-hero-content">
          <div className="lp-hero-badge">
            <span className="lp-hero-badge-dot" />
            Trusted by 18+ Indonesian agencies
          </div>
          <h1 className="lp-hero-headline">
            Run your creative agency<br />
            <span>without the chaos</span>
          </h1>
          <p className="lp-hero-sub">
            AgencyOS brings projects, teams, deadlines, and finances into one beautiful workspace. Stop juggling spreadsheets and chat tabs — see everything that matters, in real time.
          </p>
          <div className="lp-hero-actions">
            <button className="lp-btn lp-btn-primary" onClick={onGetStarted}>
              <span>Open Dashboard</span>
              <IconArrowRight />
            </button>
            <button
              className="lp-btn lp-btn-white"
              onClick={() => scrollTo('lp-features')}
            >
              See it in action
            </button>
          </div>
        </div>

        {/* Hero dashboard preview */}
        <div className="lp-hero-preview">
          <div className="lp-browser-chrome">
            <div className="lp-browser-bar">
              <div className="lp-browser-dots">
                <div className="lp-browser-dot" />
                <div className="lp-browser-dot" />
                <div className="lp-browser-dot" />
              </div>
              <div className="lp-browser-url">agencyos.app/dashboard</div>
            </div>
            <HeroDashboardMockup />
          </div>
        </div>
      </section>

      {/* ── 03. TRUSTED BY ──────────────────────────────── */}
      <section className="lp-trusted" ref={revealTrusted}>
        <div className="lp-container">
          <div className="lp-trusted-label">Powering agencies across Indonesia</div>
          <div className="lp-trusted-logos">
            {['Tokopedia', 'Mandiri', 'Pegadaian', 'Bukalapak', 'Traveloka', 'Gojek'].map((brand) => (
              <div key={brand} className="lp-trusted-logo">{brand}</div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 04. PROBLEM SECTION ─────────────────────────── */}
      <section className="lp-problem" id="lp-problem">
        <div className="lp-container">
          <div className="lp-problem-header lp-reveal" ref={revealProblem}>
            <span className="lp-label">The Problem</span>
            <h2 className="lp-heading-h2">
              Agency life is messy.<br />Your tools shouldn't make it worse.
            </h2>
          </div>
          <div className="lp-problem-cards">
            {[
              {
                Icon: IconClock,
                title: 'Missed deadlines',
                desc: "Projects slip because no one has a single view of what's due, what's blocked, and who's responsible.",
              },
              {
                Icon: IconDollar,
                title: 'Hidden finances',
                desc: "Invoices scattered across tools. You don't know what's been paid, what's overdue, or what's outstanding.",
              },
              {
                Icon: IconUsers,
                title: 'Team blind spots',
                desc: "No idea who's overloaded, who has capacity, or which team member is quietly drowning in tasks.",
              },
            ].map((card, i) => (
              <div className="lp-problem-card" key={i}>
                <div className="lp-problem-icon"><card.Icon /></div>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 05. SOLUTION SECTION ────────────────────────── */}
      <section className="lp-solution">
        <div className="lp-container">
          <div className="lp-solution-header lp-reveal" ref={revealSolution}>
            <span className="lp-label">The Solution</span>
            <h2 className="lp-heading-h2">One workspace. Total clarity.</h2>
            <p className="lp-body-lg">
              Every project, every team member, every rupiah — organized in a single, beautiful interface built for how agencies actually work.
            </p>
          </div>
          <div className="lp-solution-grid">
            <div className="lp-solution-features">
              {[
                { Icon: IconGrid,      title: 'Unified project hub',    desc: 'See status, progress, budget, and team for every project at a glance.' },
                { Icon: IconBell,      title: 'Smart alerts',           desc: 'Get notified before deadlines slip, not after. Risk-coded severity.' },
                { Icon: IconTrendUp,   title: 'Live financials',        desc: 'Track revenue, outstanding invoices, and payment status in real time.' },
                { Icon: IconUsers,     title: 'Team workload balance',  desc: "Know exactly who's at capacity and who can take on more — instantly." },
              ].map((f, i) => (
                <div className="lp-solution-feature" key={i}>
                  <div className="lp-solution-feature-icon"><f.Icon /></div>
                  <div className="lp-solution-feature-text">
                    <h3>{f.title}</h3>
                    <p>{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="lp-solution-image">
              <div className="lp-solution-ui-mock">
                <div className="lp-mock-card">
                  <div className="lp-mock-card-title">Project Pipeline</div>
                  <div className="lp-mock-pipeline">
                    {[{n:'3',l:'Planning'},{n:'12',l:'Active'},{n:'3',l:'At Risk'},{n:'7',l:'Done'}].map((s,i)=>(
                      <div className="lp-mock-pipeline-col" key={i}>
                        <div className="lp-mock-pipeline-num">{s.n}</div>
                        <div className="lp-mock-pipeline-lbl">{s.l}</div>
                      </div>
                    ))}
                  </div>
                  {[{n:'Tokopedia Brand',p:72},{n:'Mandiri App',p:45},{n:'Pegadaian UX',p:88}].map((r,i)=>(
                    <div className="lp-mock-progress-row" key={i}>
                      <span style={{minWidth:96,fontSize:11,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{r.n}</span>
                      <div className="lp-mock-progress-bar-wrap">
                        <div className="lp-mock-progress-bar" style={{width:`${r.p}%`}} />
                      </div>
                      <span className="lp-mock-progress-pct">{r.p}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 06-09. FEATURE SHOWCASES ────────────────────── */}
      <section className="lp-features" id="lp-features">
        <div className="lp-container">
          <div className="lp-features-header lp-reveal" ref={revealFeatures}>
            <span className="lp-label">Everything you need</span>
            <h2 className="lp-heading-h2">Powerful features, zero complexity</h2>
          </div>

          {/* Feature 1 — Projects */}
          <div className="lp-feature-showcase">
            <div>
              <div className="lp-showcase-tag"><IconBriefcase />Project Management</div>
              <h2 className="lp-showcase-heading">Every project, perfectly tracked</h2>
              <p className="lp-showcase-body">
                From planning to completion, see exactly where each project stands. Budget, team, progress, and status — all in one card.
              </p>
              <ul className="lp-feature-list">
                {['Visual progress tracking', 'Phase-based milestones', 'Status: planning → active → completed', 'Category filtering & search'].map((item, i) => (
                  <li key={i}><CheckIcon />{item}</li>
                ))}
              </ul>
            </div>
            <ProjectPipelineUI />
          </div>

          {/* Feature 2 — Team (reversed) */}
          <div className="lp-feature-showcase reverse">
            <div>
              <div className="lp-showcase-tag"><IconUsers />Team Management</div>
              <h2 className="lp-showcase-heading">Know who's loaded, who's free</h2>
              <p className="lp-showcase-body">
                See every team member's active tasks, completed work, and current capacity. Never accidentally overload someone again.
              </p>
              <ul className="lp-feature-list">
                {['Capacity thresholds', 'Active task counts', 'Utilization percentages', 'At-capacity early warnings'].map((item, i) => (
                  <li key={i}><CheckIcon />{item}</li>
                ))}
              </ul>
            </div>
            <TeamWorkloadUI />
          </div>

          {/* Feature 3 — Notifications */}
          <div className="lp-feature-showcase">
            <div>
              <div className="lp-showcase-tag"><IconBell />Smart Notifications</div>
              <h2 className="lp-showcase-heading">Never miss a deadline again</h2>
              <p className="lp-showcase-body">
                Automatic alerts for overdue projects, at-risk workloads, and incoming payments. Severity-coded so you always know what needs attention first.
              </p>
              <ul className="lp-feature-list">
                {['Overdue & at-risk detection', 'Severity-coded alerts', 'Mark-as-read notifications', 'Deadline countdown view'].map((item, i) => (
                  <li key={i}><CheckIcon />{item}</li>
                ))}
              </ul>
            </div>
            <NotificationsUI />
          </div>

          {/* Feature 4 — Finance (reversed) */}
          <div className="lp-feature-showcase reverse">
            <div>
              <div className="lp-showcase-tag"><IconTrendUp />Finance Dashboard</div>
              <h2 className="lp-showcase-heading">See your revenue at a glance</h2>
              <p className="lp-showcase-body">
                Track every invoice, payment, and outstanding balance. Six-month revenue trends give you the full picture at a glance.
              </p>
              <ul className="lp-feature-list">
                {['Revenue trend charts', 'Outstanding invoice tracking', 'Payment status: paid → pending → overdue', 'Category-based revenue breakdown'].map((item, i) => (
                  <li key={i}><CheckIcon />{item}</li>
                ))}
              </ul>
            </div>
            <RevenueUI />
          </div>
        </div>
      </section>

      {/* ── 10. HOW IT WORKS ────────────────────────────── */}
      <section className="lp-hiw" id="lp-hiw">
        <div className="lp-container">
          <div className="lp-hiw-header lp-reveal" ref={revealHiw}>
            <span className="lp-label">How It Works</span>
            <h2 className="lp-heading-h2 lp-heading-center">Up and running in minutes</h2>
          </div>
          <div className="lp-hiw-steps">
            {[
              {
                Icon: IconBriefcase,
                num: '01',
                title: 'Create your projects',
                desc: 'Add projects with clients, budgets, deadlines, and team members. Structure your work from day one.',
              },
              {
                Icon: IconTrendUp,
                num: '02',
                title: 'Track in real time',
                desc: 'Update status, progress, and tasks. Everyone sees the same picture — no more status meetings.',
              },
              {
                Icon: IconBell,
                num: '03',
                title: 'Stay ahead of risks',
                desc: 'Automatic alerts flag overdue work and overloaded team members before they become problems.',
              },
            ].map((step, i) => (
              <div className="lp-hiw-step" key={i}>
                <div className="lp-hiw-step-num-wrap">
                  <div className="lp-hiw-step-circle">
                    <step.Icon />
                  </div>
                  <div className="lp-hiw-step-badge">{step.num}</div>
                </div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 11. EXPERIENCE SECTION ──────────────────────── */}
      <section className="lp-experience">
        <div className="lp-container">
          <div className="lp-experience-grid lp-reveal" ref={revealExperience}>
            <div>
              <span className="lp-label">The Experience</span>
              <h2 className="lp-experience-heading">Designed to feel effortless</h2>
              <p className="lp-experience-body">
                Every pixel follows a deliberate design language — frosted surfaces, spring-motion animations, and a dark mode that's actually beautiful.
              </p>
              <div className="lp-experience-bullets">
                {[
                  { Icon: IconStar,       title: 'Glassmorphic UI',        desc: 'Frosted, translucent surfaces with depth and layering.' },
                  { Icon: IconZap,        title: 'Spring-motion animations', desc: 'Every interaction feels natural with cubic-bezier easing.' },
                  { Icon: IconSmartphone, title: 'Fully responsive',        desc: 'Works beautifully from phone to widescreen.' },
                  { Icon: IconMoon,       title: 'Dark mode built-in',      desc: "A complete dark theme that's easy on the eyes." },
                ].map((b, i) => (
                  <div className="lp-experience-bullet" key={i}>
                    <div className="lp-experience-bullet-icon"><b.Icon /></div>
                    <div className="lp-experience-bullet-text">
                      <h4>{b.title}</h4>
                      <p>{b.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lp-experience-image">
              <div className="lp-exp-img-fallback">
                <div className="lp-exp-img-avatars">
                  {['DP','RA','SW','BS'].map((a,i)=>(
                    <div key={i} className="lp-exp-img-avatar">{a}</div>
                  ))}
                </div>
                <div className="lp-exp-img-caption">A team that moves together</div>
                <div className="lp-exp-img-sub">11 team members · 12 active projects</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 12. DASHBOARD PREVIEW ───────────────────────── */}
      <section className="lp-preview" id="lp-preview">
        <div className="lp-container">
          <div className="lp-preview-header lp-reveal" ref={revealPreview}>
            <span className="lp-label lp-label-dark">Dashboard Preview</span>
            <h2 className="lp-heading-h2">Your agency, at a glance</h2>
            <p className="lp-body-lg">
              Real data from your workspace. Real-time updates. One dashboard to rule them all.
            </p>
          </div>

          <div className="lp-preview-kpis">
            {[
              { Icon: IconBriefcase, value: '12',     label: 'Active Projects' },
              { Icon: IconUsers,     value: '11',     label: 'Team Members' },
              { Icon: IconStar,      value: '18',     label: 'Total Clients' },
              { Icon: IconTrendUp,   value: 'Rp 845jt', label: 'Revenue Tracked' },
            ].map((k, i) => (
              <div className="lp-preview-kpi" key={i}>
                <div className="lp-preview-kpi-icon"><k.Icon /></div>
                <div className="lp-preview-kpi-value">{k.value}</div>
                <div className="lp-preview-kpi-label">{k.label}</div>
              </div>
            ))}
          </div>

          {/* Comparison of Light Mode (Left) & Dark Mode (Right) */}
          <div className="lp-preview-comparison">
            {/* LEFT: LIGHT MODE */}
            <div className="lp-comparison-col">
              <div className="lp-comparison-badge badge-light">
                <span className="lp-badge-title">☀️ Light Mode</span>
                <span className="lp-badge-tag">Default</span>
              </div>
              <div className="lp-comparison-window window-light">
                <div className="lp-browser-bar">
                  <div className="lp-browser-dots">
                    <div className="lp-browser-dot" />
                    <div className="lp-browser-dot" />
                    <div className="lp-browser-dot" />
                  </div>
                  <div className="lp-browser-url">agencyos.app/dashboard</div>
                </div>
                <DashboardMockup theme="light" />
              </div>
            </div>

            {/* RIGHT: DARK MODE */}
            <div className="lp-comparison-col">
              <div className="lp-comparison-badge badge-dark">
                <span className="lp-badge-title">🌙 Dark Mode</span>
                <span className="lp-badge-tag">Built-in</span>
              </div>
              <div className="lp-comparison-window window-dark">
                <div className="lp-browser-bar dark-bar">
                  <div className="lp-browser-dots">
                    <div className="lp-browser-dot" />
                    <div className="lp-browser-dot" />
                    <div className="lp-browser-dot" />
                  </div>
                  <div className="lp-browser-url dark-url">agencyos.app/dashboard</div>
                </div>
                <DashboardMockup theme="dark" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 13. FINAL CTA ───────────────────────────────── */}
      <section className="lp-cta" id="lp-cta">
        <div className="lp-container">
          <div className="lp-cta-inner lp-reveal" ref={revealCta}>
            <h2 className="lp-cta-heading">Ready to take control?</h2>
            <p className="lp-cta-sub">
              Open the dashboard and see your agency in a whole new way. No setup required — demo data is ready and waiting.
            </p>
            <div className="lp-cta-actions">
              <button className="lp-btn lp-btn-primary lp-btn-pill" onClick={onGetStarted}>
                <span>Open Dashboard</span>
                <IconArrowRight />
              </button>
            </div>
            <p className="lp-cta-note">No credit card. No setup. Just click.</p>
          </div>
        </div>
      </section>

      {/* ── 14. FOOTER ──────────────────────────────────── */}
      <footer className="lp-footer">
        <div className="lp-container">
          <div className="lp-footer-inner">
            <div className="lp-footer-logo">
              <IconLogo size={32} />
              <span className="lp-footer-logo-name">AgencyOS</span>
            </div>
            <div className="lp-footer-links">
              <button className="lp-footer-link" onClick={() => scrollTo('lp-features')}>Features</button>
              <button className="lp-footer-link" onClick={() => scrollTo('lp-hiw')}>How it works</button>
              <button className="lp-footer-link" onClick={() => scrollTo('lp-experience')}>Benefits</button>
              <button className="lp-footer-link" onClick={onGetStarted}>Login</button>
            </div>
          </div>
          <hr className="lp-footer-divider" />
          <div className="lp-footer-bottom">
            <span className="lp-footer-copy">© 2025 AgencyOS. All rights reserved.</span>
            <span className="lp-footer-tagline">Built for creative agencies in Indonesia.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

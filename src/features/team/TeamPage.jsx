import React from 'react';

/* Mail Icon */
const IconMail = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="2" y="3.5" width="12" height="9" rx="1.5" stroke="#717680" strokeWidth="1.2"/>
    <path d="M2.5 4.5L8 8.5L13.5 4.5" stroke="#717680" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/* Data for Project Managers (Figma Node 21135:12443) */
const projectManagersData = [
  {
    id: 1,
    name: 'Citra Maharani',
    subRole: 'Project Manager',
    badge: 'Project Manager',
    initials: 'CM',
    grad: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
    activeTasks: '9/15',
    activeNum: 9,
    maxNum: 15,
    projects: 3,
    total: 46,
    done: 8,
    email: 'citra.1837@gmail.com',
  },
  {
    id: 2,
    name: 'Bayu Hartanto',
    subRole: 'Project Manager',
    badge: 'Project Manager',
    initials: 'BH',
    grad: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
    activeTasks: '6/15',
    activeNum: 6,
    maxNum: 15,
    projects: 3,
    total: 38,
    done: 17,
    email: 'har.bayu@gmail.com',
  },
  {
    id: 3,
    name: 'Dimas Nugraha',
    subRole: 'Project Manager',
    badge: 'Project Manager',
    initials: 'DN',
    grad: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
    activeTasks: '4/15',
    activeNum: 4,
    maxNum: 15,
    projects: 1,
    total: 46,
    done: 14,
    email: 'dimsnugraha@gmail.com',
  },
  {
    id: 4,
    name: 'Rangga Saputra',
    subRole: 'Senior Project Manager',
    badge: 'Project Manager',
    initials: 'RS',
    grad: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
    activeTasks: '6/15',
    activeNum: 6,
    maxNum: 15,
    projects: 1,
    total: 61,
    done: 19,
    email: 'saputrarangga43@gmail.com',
  },
];

/* Data for Team Members (Figma Node 21135:12443) */
const teamMembersData = [
  {
    id: 1,
    name: 'Sinta Dewi',
    subRole: 'Brand Designer',
    badge: 'Team Member',
    initials: 'SD',
    grad: 'linear-gradient(135deg, #60A5FA 0%, #BF5AF2 100%)',
    activeTasks: '10/15',
    activeNum: 10,
    maxNum: 15,
    projects: 4,
    total: 33,
    done: 14,
    email: 'sintaxxd@gmail.com',
  },
  {
    id: 2,
    name: 'Galih Ramadhan',
    subRole: 'Full-stack Developer',
    badge: 'Team Member',
    initials: 'GR',
    grad: 'linear-gradient(135deg, #A855F7 0%, #7E22CE 100%)',
    activeTasks: '8/15',
    activeNum: 8,
    maxNum: 15,
    projects: 3,
    total: 28,
    done: 11,
    email: 'galih.ramadhan@gmail.com',
  },
  {
    id: 3,
    name: 'Edgar Robel',
    subRole: 'QA Engineer',
    badge: 'Team Member',
    initials: 'ER',
    grad: 'linear-gradient(135deg, #818CF8 0%, #4F46E5 100%)',
    activeTasks: '8/15',
    activeNum: 8,
    maxNum: 15,
    projects: 5,
    total: 41,
    done: 8,
    email: 'edgarrbel67@gmail.com',
  },
  {
    id: 4,
    name: 'Gordon Monahan',
    subRole: 'Social Media Designer',
    badge: 'Team Member',
    initials: 'GM',
    grad: 'linear-gradient(135deg, #9CA3AF 0%, #4B5563 100%)',
    activeTasks: '8/15',
    activeNum: 8,
    maxNum: 15,
    projects: 2,
    total: 26,
    done: 6,
    email: 'gordon_nss@gmail.com',
  },
  {
    id: 5,
    name: 'Maya Collins',
    subRole: 'Product Manager',
    badge: 'Team Member',
    initials: 'MC',
    grad: 'linear-gradient(135deg, #C084FC 0%, #9333EA 100%)',
    activeTasks: '12/20',
    activeNum: 12,
    maxNum: 20,
    projects: 6,
    total: 39,
    done: 15,
    email: 'maya.collins@company.com',
  },
  {
    id: 6,
    name: 'Liam Foster',
    subRole: 'UX Researcher',
    badge: 'Team Member',
    initials: 'LF',
    grad: 'linear-gradient(135deg, #A855F7 0%, #6B21A8 100%)',
    activeTasks: '7/10',
    activeNum: 7,
    maxNum: 10,
    projects: 4,
    total: 22,
    done: 9,
    email: 'liam.foster@company.com',
  },
  {
    id: 7,
    name: 'Amelia Rivera',
    subRole: 'DevOps Engineer',
    badge: 'Team Member',
    initials: 'AR',
    grad: 'linear-gradient(135deg, #818CF8 0%, #4F46E5 100%)',
    activeTasks: '9/12',
    activeNum: 9,
    maxNum: 12,
    projects: 3,
    total: 30,
    done: 12,
    email: 'amelia.rivera@company.com',
  },
  {
    id: 8,
    name: 'Noah Kim',
    subRole: 'Data Analyst',
    badge: 'Team Member',
    initials: 'NK',
    grad: 'linear-gradient(135deg, #EC4899 0%, #BE185D 100%)',
    activeTasks: '5/10',
    activeNum: 5,
    maxNum: 10,
    projects: 5,
    total: 27,
    done: 10,
    email: 'noah.kim@company.com',
  },
  {
    id: 9,
    name: 'Sophia Reynolds',
    subRole: 'Marketing Specialist',
    badge: 'Team Member',
    initials: 'SR',
    grad: 'linear-gradient(135deg, #818CF8 0%, #4F46E5 100%)',
    activeTasks: '8/15',
    activeNum: 8,
    maxNum: 15,
    projects: 4,
    total: 39,
    done: 13,
    email: 'sophia.reynolds@company.com',
  },
  {
    id: 10,
    name: 'Ethan Rhodes',
    subRole: 'Backend Developer',
    badge: 'Team Member',
    initials: 'ER',
    grad: 'linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)',
    activeTasks: '6/7',
    activeNum: 6,
    maxNum: 7,
    projects: 2,
    total: 29,
    done: 8,
    email: 'ethan.rhodes@company.com',
  },
  {
    id: 11,
    name: 'Julia Lopez',
    subRole: 'Graphic Designer',
    badge: 'Team Member',
    initials: 'JL',
    grad: 'linear-gradient(135deg, #60A5FA 0%, #2563EB 100%)',
    activeTasks: '4/12',
    activeNum: 4,
    maxNum: 12,
    projects: 5,
    total: 25,
    done: 9,
    email: 'julia.lopez@company.com',
  },
  {
    id: 12,
    name: 'Marcus Thompson',
    subRole: 'Frontend Developer',
    badge: 'Team Member',
    initials: 'MT',
    grad: 'linear-gradient(135deg, #A855F7 0%, #7E22CE 100%)',
    activeTasks: '9/16',
    activeNum: 9,
    maxNum: 16,
    projects: 4,
    total: 31,
    done: 11,
    email: 'marcus.thompson@company.com',
  },
  {
    id: 13,
    name: 'Carmen Vega',
    subRole: 'Mobile Developer',
    badge: 'Team Member',
    initials: 'CV',
    grad: 'linear-gradient(135deg, #818CF8 0%, #4338CA 100%)',
    activeTasks: '6/17',
    activeNum: 6,
    maxNum: 17,
    projects: 3,
    total: 20,
    done: 7,
    email: 'carmen.vega@company.com',
  },
  {
    id: 14,
    name: 'Ryan Jenkins',
    subRole: 'UI/UX Designer',
    badge: 'Team Member',
    initials: 'RJ',
    grad: 'linear-gradient(135deg, #A855F7 0%, #6B21A8 100%)',
    activeTasks: '10/18',
    activeNum: 10,
    maxNum: 18,
    projects: 6,
    total: 40,
    done: 14,
    email: 'ryan.jenkins@company.com',
  },
  {
    id: 15,
    name: 'Kylie Andrews',
    subRole: 'Frontend Developer',
    badge: 'Team Member',
    initials: 'KA',
    grad: 'linear-gradient(135deg, #818CF8 0%, #4F46E5 100%)',
    activeTasks: '6/14',
    activeNum: 6,
    maxNum: 14,
    projects: 4,
    total: 27,
    done: 10,
    email: 'kylie.andrews@company.com',
  },
  {
    id: 16,
    name: 'Derek Shaw',
    subRole: 'Digital Marketer',
    badge: 'Team Member',
    initials: 'DS',
    grad: 'linear-gradient(135deg, #8B5CF6 0%, #5B21B6 100%)',
    activeTasks: '7/12',
    activeNum: 7,
    maxNum: 12,
    projects: 3,
    total: 23,
    done: 9,
    email: 'derek.shaw@company.com',
  },
];

export default function TeamPage() {
  return (
    <div className="tm-page-container">
      {/* ── TOP KPI SUMMARY CARDS ────────────────────── */}
      <div className="tm-kpi-row">
        <div className="tm-kpi-card">
          <div className="tm-kpi-title">Total Members</div>
          <div className="tm-kpi-value">16</div>
        </div>
        <div className="tm-kpi-card">
          <div className="tm-kpi-title">Project Managers</div>
          <div className="tm-kpi-value">4</div>
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

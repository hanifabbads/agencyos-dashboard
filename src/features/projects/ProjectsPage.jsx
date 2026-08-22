import React, { useState, useMemo, useEffect } from 'react';

/* ─────────────────────────────────────────────
   30 INITIAL PROJECTS DATA (Matching Figma Node 21107:696)
───────────────────────────────────────────── */
const initialProjectsData = [
  { id: 1, name: 'Project A — Digital Marketing', client: 'Quantum Finance', category: 'Digital Marketing', status: 'Active', statusColor: '#0C61CF', statusBg: '#EFF6FF', pmInitials: 'DN', pmName: 'Dimas Nugraha', pmGrad: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', deadline: '7 November 2026', budget: 'Rp 9.5 jt' },
  { id: 2, name: 'Project B — Mobile App Development', client: 'Sinar Abadi Group', category: 'Mobile App Development', status: 'Active', statusColor: '#0C61CF', statusBg: '#EFF6FF', pmInitials: 'RS', pmName: 'Rangga Saputra', pmGrad: 'linear-gradient(135deg, #40CCEA 0%, #0891B2 100%)', deadline: '2 Agustus 2026', budget: 'Rp 70 jt' },
  { id: 3, name: 'Project C — Social Media Design', client: 'Rumah Mode Bandung', category: 'Web Development', status: 'Active', statusColor: '#0C61CF', statusBg: '#EFF6FF', pmInitials: 'BH', pmName: 'Bayu Hartanto', pmGrad: 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)', deadline: '15 Desember 2026', budget: 'Rp 16 jt' },
  { id: 4, name: 'Project D — E-commerce Platform', client: 'Nusantara Retail', category: 'UI/UX Design', status: 'Active', statusColor: '#0C61CF', statusBg: '#EFF6FF', pmInitials: 'AW', pmName: 'Ayu Wati', pmGrad: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)', deadline: '28 Januari 2027', budget: 'Rp 21 jt' },
  { id: 5, name: 'Project E — Cloud Storage Solution', client: 'TechWave Solutions', category: 'Social Media Design', status: 'Active', statusColor: '#0C61CF', statusBg: '#EFF6FF', pmInitials: 'FR', pmName: 'Fatma Risty', pmGrad: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)', deadline: '10 Februari 2027', budget: 'Rp 12 jt' },
  { id: 6, name: 'Project F — Virtual Reality Experience', client: 'DreamScape Innovations', category: 'Branding', status: 'Completed', statusColor: '#067647', statusBg: '#ECFDF3', pmInitials: 'TI', pmName: 'Tina Irawansyah', pmGrad: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', deadline: '22 Maret 2027', budget: 'Rp 430 jt' },
  { id: 7, name: 'Project G — AI Chatbot Integration', client: 'SmartAssist Corp', category: 'Digital Marketing', status: 'Planning', statusColor: '#717680', statusBg: '#F4F5F7', pmInitials: 'MW', pmName: 'Megan Wijaya', pmGrad: 'linear-gradient(135deg, #EC4899 0%, #DB2777 100%)', deadline: '19 September 2027', budget: 'Rp 23 jt' },
  { id: 8, name: 'Project H — Blockchain Security', client: 'CryptoGuard Labs', category: 'Mobile App Development', status: 'Active', statusColor: '#0C61CF', statusBg: '#EFF6FF', pmInitials: 'SJ', pmName: 'Satria Jaya', pmGrad: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)', deadline: '18 Mei 2027', budget: 'Rp 2.7 M' },
  { id: 9, name: 'Project I — Health Tracker App', client: 'FitLife Technologies', category: 'Web Development', status: 'At Risk', statusColor: '#DC6803', statusBg: '#FFFAEB', pmInitials: 'UR', pmName: 'Una Rahmawati', pmGrad: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)', deadline: '8 Desember 2028', budget: 'Rp 15 jt' },
  { id: 10, name: 'Project J — Educational Platform', client: 'Learnify Network', category: 'UI/UX Design', status: 'Active', statusColor: '#0C61CF', statusBg: '#EFF6FF', pmInitials: 'AG', pmName: 'Agus Gunawan', pmGrad: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)', deadline: '23 Mei 2029', budget: 'Rp 60 jt' },
  { id: 11, name: 'Project K — Augmented Reality Shopping', client: 'ShopEase Inc', category: 'Social Media Design', status: 'Completed', statusColor: '#067647', statusBg: '#ECFDF3', pmInitials: 'ND', pmName: 'Nadia Dewi', pmGrad: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', deadline: '24 Agustus 2027', budget: 'Rp 22 jt' },
  { id: 12, name: 'Project L — Data Analytics Dashboard', client: 'Insight Metrics', category: 'Branding', status: 'Active', statusColor: '#0C61CF', statusBg: '#EFF6FF', pmInitials: 'HR', pmName: 'Hendra Ramadhan', pmGrad: 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)', deadline: '17 Februari 2028', budget: 'Rp 11 jt' },
  { id: 13, name: 'Project M — Renewable Energy Monitoring', client: 'GreenGrid Energy', category: 'Digital Marketing', status: 'Overdue', statusColor: '#D92D20', statusBg: '#FEF2F2', pmInitials: 'YS', pmName: 'Yusuf Satria', pmGrad: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)', deadline: '3 November 2030', budget: 'Rp 38 jt' },
  { id: 14, name: 'Project N — Smart Home Automation', client: 'HomeIQ Systems', category: 'Mobile App Development', status: 'At Risk', statusColor: '#DC6803', statusBg: '#FFFAEB', pmInitials: 'MK', pmName: 'Maya Kusuma', pmGrad: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)', deadline: '11 April 2029', budget: 'Rp 14 jt' },
  { id: 15, name: 'Project O — Online Booking System', client: 'TravelNest', category: 'Web Development', status: 'Active', statusColor: '#0C61CF', statusBg: '#EFF6FF', pmInitials: 'RS', pmName: 'Rizky Saputra', pmGrad: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)', deadline: '29 Juli 2027', budget: 'Rp 50 jt' },
  { id: 16, name: 'Project P — Cybersecurity Audit', client: 'SecureNet Solutions', category: 'UI/UX Design', status: 'Completed', statusColor: '#067647', statusBg: '#ECFDF3', pmInitials: 'DP', pmName: 'Dewi Pertiwi', pmGrad: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', deadline: '27 Januari 2028', budget: 'Rp 29 jt' },
  { id: 17, name: 'Project Q — Food Delivery App', client: 'QuickBite', category: 'Social Media Design', status: 'Planning', statusColor: '#717680', statusBg: '#F4F5F7', pmInitials: 'FH', pmName: 'Fajar Hidayat', pmGrad: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)', deadline: '18 Oktober 2028', budget: 'Rp 17 jt' },
  { id: 18, name: 'Project R — Virtual Conference Platform', client: 'ConnectNow', category: 'Branding', status: 'Overdue', statusColor: '#D92D20', statusBg: '#FEF2F2', pmInitials: 'IA', pmName: 'Indah Ayu', pmGrad: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)', deadline: '6 Juni 2031', budget: 'Rp 41 jt' },
  { id: 19, name: 'Project S — Personalized News Feed', client: 'NewsPulse Media', category: 'Digital Marketing', status: 'At Risk', statusColor: '#DC6803', statusBg: '#FFFAEB', pmInitials: 'AK', pmName: 'Adi Kurniawan', pmGrad: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)', deadline: '15 Desember 2027', budget: 'Rp 120 jt' },
  { id: 20, name: 'Project T — IoT Sensor Network', client: 'EnviroSense Labs', category: 'Mobile App Development', status: 'Active', statusColor: '#0C61CF', statusBg: '#EFF6FF', pmInitials: 'SN', pmName: 'Sinta Nuraini', pmGrad: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)', deadline: '2 Maret 2030', budget: 'Rp 35 jt' },
  { id: 21, name: 'Project U — Cryptocurrency Wallet', client: 'BlockSafe Technologies', category: 'Web Development', status: 'Completed', statusColor: '#067647', statusBg: '#ECFDF3', pmInitials: 'RV', pmName: 'Rosid Yulianto', pmGrad: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', deadline: '29 Juni 2028', budget: 'Rp 13 jt' },
  { id: 22, name: 'Project V — AI-Powered Recruitment', client: 'TalentMatch Solutions', category: 'UI/UX Design', status: 'Active', statusColor: '#0C61CF', statusBg: '#EFF6FF', pmInitials: 'LT', pmName: 'Lutfi Tifana', pmGrad: 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)', deadline: '25 September 2028', budget: 'Rp 48 jt' },
  { id: 23, name: 'Project W — Smart City Traffic Management', client: 'UrbanFlow Systems', category: 'Social Media Design', status: 'Overdue', statusColor: '#D92D20', statusBg: '#FEF2F2', pmInitials: 'WP', pmName: 'Wulan Putri', pmGrad: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)', deadline: '9 Januari 2029', budget: 'Rp 18 jt' },
  { id: 24, name: 'Project X — Personalized Learning AI', client: 'EduTech Innovations', category: 'Branding', status: 'Planning', statusColor: '#717680', statusBg: '#F4F5F7', pmInitials: 'EC', pmName: 'Eko Cahyono', pmGrad: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)', deadline: '31 Mei 2027', budget: 'Rp 24 jt' },
  { id: 25, name: 'Project Y — Drone Delivery Service', client: 'SkyTrack Logistics', category: 'UI/UX Design', status: 'Completed', statusColor: '#067647', statusBg: '#ECFDF3', pmInitials: 'GB', pmName: 'Gilang Budi', pmGrad: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', deadline: '18 Oktober 2028', budget: 'Rp 31 jt' },
  { id: 26, name: 'Project Z — Voice-Activated Assistants', client: 'SonoWave Technologies', category: 'Digital Marketing', status: 'Active', statusColor: '#0C61CF', statusBg: '#EFF6FF', pmInitials: 'JS', pmName: 'Joko Susanto', pmGrad: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)', deadline: '20 Agustus 2030', budget: 'Rp 16 jt' },
  { id: 27, name: 'Project AA — Biometric Access Control', client: 'SecureEntry Systems', category: 'Branding', status: 'Active', statusColor: '#0C61CF', statusBg: '#EFF6FF', pmInitials: 'CH', pmName: 'Candra Hapsari', pmGrad: 'linear-gradient(135deg, #40CCEA 0%, #0891B2 100%)', deadline: '12 April 2028', budget: 'Rp 39 jt' },
  { id: 28, name: 'Project AB — Gamified Fitness Platform', client: 'ActivePlay Studios', category: 'Web Development', status: 'Overdue', statusColor: '#D92D20', statusBg: '#FEF2F2', pmInitials: 'NV', pmName: 'Novi Viani', pmGrad: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)', deadline: '27 November 2031', budget: 'Rp 23 jt' },
  { id: 29, name: 'Project AC — Smart Agriculture Monitoring', client: 'AgriSense Tech', category: 'Mobile App Development', status: 'At Risk', statusColor: '#DC6803', statusBg: '#FFFAEB', pmInitials: 'RM', pmName: 'Rafli Maulana', pmGrad: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)', deadline: '16 Juli 2029', budget: 'Rp 28 jt' },
  { id: 30, name: 'Project AD — AI-Driven Content Creation', client: 'CreatiBot Labs', category: 'UI/UX Design', status: 'Overdue', statusColor: '#D92D20', statusBg: '#FEF2F2', pmInitials: 'AP', pmName: 'Anisa Putri', pmGrad: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)', deadline: '4 Maret 2028', budget: 'Rp 21 jt' },
  { id: 301, name: 'Project AE — Enterprise ERP Migration', client: 'Bumi Nusantara Logistics', category: 'Web Development', status: 'Overdue', statusColor: '#D92D20', statusBg: '#FEF2F2', pmInitials: 'CM', pmName: 'Citra Maharani', pmGrad: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)', deadline: '28 Juli 2026', budget: 'Rp 85 jt' },
];

/* Generator for 300 realistic projects across 10 pages */
const generate300Projects = () => {
  const categories = [
    'Digital Marketing',
    'Mobile App Development',
    'Web Development',
    'UI/UX Design',
    'Social Media Design',
    'Branding'
  ];

  const statuses = [
    { label: 'Completed', color: '#067647', bg: '#ECFDF3' },
    { label: 'Active', color: '#0C61CF', bg: '#EFF6FF' },
    { label: 'Overdue', color: '#D92D20', bg: '#FEF2F2' },
    { label: 'At Risk', color: '#DC6803', bg: '#FFFAEB' },
    { label: 'Planning', color: '#717680', bg: '#F4F5F7' }
  ];

  const pms = [
    { initials: 'DN', name: 'Dimas Nugraha', grad: 'linear-gradient(135deg, #10B981 0%, #059669 100%)' },
    { initials: 'RS', name: 'Rangga Saputra', grad: 'linear-gradient(135deg, #40CCEA 0%, #0891B2 100%)' },
    { initials: 'BH', name: 'Bayu Hartanto', grad: 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)' },
    { initials: 'AW', name: 'Ayu Wati', grad: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)' },
    { initials: 'FR', name: 'Fatma Risty', grad: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)' },
    { initials: 'TI', name: 'Tina Irawansyah', grad: 'linear-gradient(135deg, #10B981 0%, #059669 100%)' },
    { initials: 'MW', name: 'Megan Wijaya', grad: 'linear-gradient(135deg, #EC4899 0%, #DB2777 100%)' },
    { initials: 'SJ', name: 'Satria Jaya', grad: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)' },
    { initials: 'UR', name: 'Una Rahmawati', grad: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)' },
    { initials: 'AG', name: 'Agus Gunawan', grad: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)' },
    { initials: 'CM', name: 'Citra Maharani', grad: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)' },
  ];

  const clients = [
    'Quantum Finance', 'Sinar Abadi Group', 'Rumah Moda Bandung', 'Nusantara Retail',
    'TechWave Solutions', 'DreamScape Innovations', 'SmartAssist Corp', 'CryptoGuard Labs',
    'FitLife Technologies', 'Learnify Network', 'ShopEase Inc', 'Insight Metrics',
    'GreenGrid Energy', 'HomeIQ Systems', 'TravelNest', 'SecureNet Solutions',
    'QuickBite', 'ConnectNow', 'NewsPulse Media', 'EnviroSense Labs'
  ];

  const projectTopics = [
    'Digital Transformation', 'Enterprise App', 'Cloud Infrastructure', 'Cybersecurity Audit',
    'Omnichannel Marketing', 'AI Recommendation Engine', 'Smart Telemetry', 'Payment Gateway Integration',
    'SaaS Analytics', 'Automated Workflow', 'Brand Revamp', 'Customer Loyalty Platform',
    'POS System Upgrade', 'Data Pipeline Optimization', 'BI Reporting Portal', 'Video Streaming Network',
    'IoT Control Center', 'AR Interactive Experience', 'Microservices Modernization', 'Mobile Wallet Solution'
  ];

  const getLetterCode = (num) => {
    let result = '';
    while (num > 0) {
      const rem = (num - 1) % 26;
      result = String.fromCharCode(65 + rem) + result;
      num = Math.floor((num - 1) / 26);
    }
    return result;
  };

  const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

  const list = [...initialProjectsData];
  const futureYearsPool = [2027, 2028, 2029, 2030, 2031, 2032];

  for (let i = 31; i <= 300; i++) {
    const code = getLetterCode(i);
    const category = categories[(i - 1) % categories.length];
    const statusObj = statuses[(i - 1) % statuses.length];
    const pm = pms[(i - 1) % pms.length];
    const client = clients[(i - 1) % clients.length];
    const topic = projectTopics[(i - 1) % projectTopics.length];
    const budgetVal = ((i * 13) % 90) + 10;

    let day, month, year;
    if (statusObj.label === 'Completed') {
      day = ((i * 7) % 28) + 1;
      month = months[(i - 1) % months.length];
      year = 2027 + (i % 3);
    } else {
      // Future or far-in-the-future out of order
      day = ((i * 17) % 28) + 1;
      month = months[(i * 5) % months.length];
      year = futureYearsPool[(i * 11) % futureYearsPool.length];
    }

    list.push({
      id: i,
      name: `Project ${code} — ${topic}`,
      client: client,
      category: category,
      status: statusObj.label,
      statusColor: statusObj.color,
      statusBg: statusObj.bg,
      pmInitials: pm.initials,
      pmName: pm.name,
      pmGrad: pm.grad,
      deadline: `${day} ${month} ${year}`,
      budget: `Rp ${budgetVal} jt`
    });
  }

  return list;
};

export const all300Projects = generate300Projects();

const categoryOptions = [
  'All Categories',
  'Digital Marketing',
  'Mobile App Development',
  'Web Development',
  'UI/UX Design',
  'Social Media Design',
  'Branding',
];

export default function ProjectsPage({ onViewDetails, projectsList: propProjectsList, onDeleteProject, onUpdateProjectsList }) {
  const [projectsList, setProjectsList] = useState(propProjectsList || all300Projects);

  useEffect(() => {
    if (propProjectsList) {
      setProjectsList(propProjectsList);
    }
  }, [propProjectsList]);
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [searchQuery, setSearchQuery] = useState('');
  const [openMenuId, setOpenMenuId] = useState(null);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 30;

  // Reset to page 1 whenever filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedStatus, selectedCategory, searchQuery]);

  // Close open menus when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!e.target.closest('.pj-action-cell')) {
        setOpenMenuId(null);
      }
      if (!e.target.closest('.pj-dropdown-wrapper')) {
        setIsCategoryOpen(false);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  // Dynamically calculate status pill counts directly from table data
  const statusPills = useMemo(() => {
    const categories = ['All', 'Active', 'At Risk', 'Overdue', 'Planning', 'Completed'];
    return categories.map((label) => {
      const count =
        label === 'All'
          ? projectsList.length
          : projectsList.filter((p) => p.status.toLowerCase() === label.toLowerCase()).length;
      return { label, count };
    });
  }, [projectsList]);

  // Filter logic
  const filteredProjects = useMemo(() => {
    return projectsList.filter((p) => {
      // Status filter
      if (selectedStatus !== 'All' && p.status.toLowerCase() !== selectedStatus.toLowerCase()) {
        return false;
      }
      // Category filter
      if (selectedCategory !== 'All Categories' && p.category.toLowerCase() !== selectedCategory.toLowerCase()) {
        return false;
      }
      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = p.name.toLowerCase().includes(q);
        const matchClient = p.client.toLowerCase().includes(q);
        const matchPm = p.pmName.toLowerCase().includes(q);
        if (!matchName && !matchClient && !matchPm) return false;
      }
      return true;
    });
  }, [projectsList, selectedStatus, selectedCategory, searchQuery]);

  // Pagination bounds calculation
  const totalFiltered = filteredProjects.length;
  const totalPages = Math.ceil(totalFiltered / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalFiltered);

  // Paginated data slice
  const displayedProjects = useMemo(() => {
    return filteredProjects.slice(startIndex, endIndex);
  }, [filteredProjects, startIndex, endIndex]);

  // Render pagination number buttons matching Figma Node 21139:9187
  const renderPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show 1, 2, 3 ... 10 if on page <= 3
      if (currentPage <= 3) {
        pages.push(1, 2, 3, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }

    return pages.map((item, index) => {
      if (item === '...') {
        return (
          <span key={`dots-${index}`} className="pj-page-dots">
            ...
          </span>
        );
      }
      const isActive = item === currentPage;
      return (
        <button
          key={item}
          className={`pj-page-num ${isActive ? 'pj-page-num--active' : ''}`}
          onClick={() => setCurrentPage(item)}
        >
          {item}
        </button>
      );
    });
  };

  return (
    <div className="pj-page-container">
      {/* ── TOP STATUS PILLS BAR ────────────────────── */}
      <div className="pj-filter-bar">
        {statusPills.map((pill) => {
          const isActive = selectedStatus === pill.label;
          return (
            <button
              key={pill.label}
              className={`pj-status-pill ${isActive ? 'pj-status-pill--active' : ''}`}
              onClick={() => setSelectedStatus(pill.label)}
            >
              <span>{pill.label}</span>
              <span className={`pj-pill-badge ${isActive ? 'pj-pill-badge--active' : ''}`}>
                {pill.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── SEARCH & CATEGORY DROPDOWN CONTROLS ──────── */}
      <div className="pj-controls-bar">
        {/* Search input */}
        <div className="pj-search-box">
          <svg className="pj-search-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="7" cy="7" r="4.5" stroke="#717680" strokeWidth="1.4" />
            <path d="M10.5 10.5L14 14" stroke="#717680" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
          <input
            className="pj-search-input"
            type="text"
            placeholder="Search Project Name, PM Name, Client Name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Custom Category Dropdown (Matching Figma Node 21133:9812 & 21133:10435) */}
        <div className="pj-dropdown-wrapper">
          <button
            className="pj-category-btn"
            onClick={() => setIsCategoryOpen(!isCategoryOpen)}
          >
            <span>{selectedCategory}</span>
            <svg
              className={`pj-dropdown-chevron ${isCategoryOpen ? 'pj-dropdown-chevron--open' : ''}`}
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path d="M4 6L8 10L12 6" stroke="#717680" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {isCategoryOpen && (
            <div className="pj-category-menu">
              {categoryOptions.map((cat) => (
                <div
                  key={cat}
                  className={`pj-category-option ${selectedCategory === cat ? 'pj-category-option--selected' : ''}`}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setIsCategoryOpen(false);
                  }}
                >
                  {cat}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── PROJECTS TABLE ──────────────────────────── */}
      <div className="pj-table-card">
        <table className="pj-table">
          <thead>
            <tr>
              <th style={{ width: '280px' }}>Project</th>
              <th style={{ width: '180px' }}>Category</th>
              <th style={{ width: '120px' }}>Status</th>
              <th style={{ width: '180px' }}>PM</th>
              <th style={{ width: '160px' }}>Deadline</th>
              <th style={{ width: '110px' }}>Budget</th>
              <th style={{ width: '60px', textAlign: 'center' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {displayedProjects.map((row, index) => {
              const isNearBottom = index >= displayedProjects.length - 3;
              return (
                <tr key={row.id} className="pj-table-row">
                  {/* Project Name & Client */}
                  <td>
                    <div className="pj-project-name">{row.name}</div>
                    <div className="pj-project-client">{row.client}</div>
                  </td>

                  {/* Category Pill */}
                  <td>
                    <span className="pj-category-badge">{row.category}</span>
                  </td>

                  {/* Status Pill Badge */}
                  <td>
                    <span className={`pj-status-badge status-${(row.status || '').toLowerCase().replace(/\s+/g, '-')}`}>
                      <span className="pj-status-dot" />
                      {row.status}
                    </span>
                  </td>

                  {/* PM (Avatar + Name) */}
                  <td>
                    <div className="pj-pm-cell">
                      <div
                        className="pj-pm-avatar"
                        style={{ backgroundImage: row.pmGrad }}
                      >
                        {row.pmInitials}
                      </div>
                      <span className="pj-pm-name">{row.pmName}</span>
                    </div>
                  </td>

                  {/* Deadline */}
                  <td>
                    <span className="pj-deadline-text">{row.deadline}</span>
                  </td>

                  {/* Budget */}
                  <td>
                    <span className="pj-budget-text">{row.budget}</span>
                  </td>

                  {/* Action Menu Cell */}
                  <td style={{ textAlign: 'center' }} className="pj-action-cell">
                    <button
                      className="pj-action-btn"
                      title="More options"
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenMenuId(openMenuId === row.id ? null : row.id);
                      }}
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <circle cx="8" cy="3" r="1.5" fill="#717680" />
                        <circle cx="8" cy="8" r="1.5" fill="#717680" />
                        <circle cx="8" cy="13" r="1.5" fill="#717680" />
                      </svg>
                    </button>

                    {/* List of Option Popup (Matching Figma Node 21107:8674) */}
                    {openMenuId === row.id && (
                      <div className={`pj-action-menu ${isNearBottom ? 'pj-action-menu--up' : ''}`}>
                        <button
                          className="pj-action-menu-item"
                          onClick={(e) => {
                            e.stopPropagation();
                            const targetId = row.id !== undefined ? row.id : row.name;
                            const updated = (projectsList || []).filter((p) => (p.id !== undefined ? p.id !== row.id : p.name !== row.name));
                            setProjectsList(updated);
                            if (onUpdateProjectsList) {
                              onUpdateProjectsList(updated);
                            }
                            if (onDeleteProject) {
                              onDeleteProject(targetId);
                            }
                            setOpenMenuId(null);
                          }}
                        >
                          Delete
                        </button>
                        <button
                          className="pj-action-menu-item"
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenMenuId(null);
                            onViewDetails?.(row);
                          }}
                        >
                          Detail
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ── SORT BY BOTTOM PAGINATION BAR (Matching Figma Node 21139:9187) ── */}
      <div className="pj-pagination-bar">
        <div className="pj-pagination-text">
          Showing {totalFiltered === 0 ? 0 : startIndex + 1} to {endIndex} of {totalFiltered} entries
        </div>

        <div className="pj-pagination-controls">
          {/* Previous Button */}
          <button
            className="pj-page-btn pj-page-btn--prev"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            title="Previous page"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 12L6 8L10 4" stroke="#717680" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Page Numbers */}
          <div className="pj-page-numbers">
            {renderPageNumbers()}
          </div>

          {/* Next Button */}
          <button
            className="pj-page-btn pj-page-btn--next"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            title="Next page"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 12L10 8L6 4" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

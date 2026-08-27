import React, { useState, useMemo, useEffect } from 'react';
import {
  all300Projects,
  categoryOptions,
  initialProjectsData,
  generate300Projects,
} from '../../data/demo/projects.data';

export { all300Projects, initialProjectsData, generate300Projects, categoryOptions };

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

  // Render pagination number buttons
  const renderPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
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

        {/* Custom Category Dropdown */}
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
                      aria-label="More options"
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

      {/* ── SORT BY BOTTOM PAGINATION BAR ── */}
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
            aria-label="Previous page"
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
            aria-label="Next page"
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

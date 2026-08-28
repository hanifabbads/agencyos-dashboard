import React, { useState, useRef, useEffect } from 'react';
import { clientOptions, projectCategories, pmOptions } from '../../data/demo/projects.data';

const IconClose = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconBuilding = () => (
  <svg width="18" height="18" viewBox="0 0 16.25 16.251" fill="none">
    <path d="M14.7925 5.74689L12.0833 5.12698V3.79865C12.0833 2.92032 11.4858 2.16937 10.63 1.97187L2.29665 0.0486524C1.73665 -0.0805143 1.15831 0.050223 0.708313 0.408556C0.258313 0.76689 0 1.30104 0 1.87604V13.9594C0 15.416 0.835 16.251 2.29167 16.251H13.9583C15.415 16.251 16.25 15.416 16.25 13.9594V7.5753C16.25 6.6953 15.6508 5.94273 14.7925 5.74689ZM1.25 13.9586V1.87523C1.25 1.68356 1.33663 1.5053 1.4858 1.38614C1.5983 1.29697 1.73421 1.25023 1.87337 1.25023C1.92087 1.25023 1.96831 1.25525 2.01497 1.26691L10.3483 3.19013C10.6341 3.25597 10.8333 3.50615 10.8333 3.79865V5.62523V15.0002H8.33333V12.2919C8.33333 11.0277 7.30583 10.0002 6.04167 10.0002C4.7775 10.0002 3.75 11.0277 3.75 12.2919V15.0002H2.29167C1.5225 15.0002 1.25 14.7277 1.25 13.9586ZM7.08333 15.0002H5V12.2919C5 11.7177 5.4675 11.2502 6.04167 11.2502C6.61583 11.2502 7.08333 11.7177 7.08333 12.2919V15.0002ZM15 13.9586C15 14.7277 14.7275 15.0002 13.9583 15.0002H12.0833V6.40933L14.5142 6.96516C14.8 7.03099 15 7.28116 15 7.57449V13.9586ZM6.66667 5.62523C6.66667 5.28023 6.94667 5.00023 7.29167 5.00023H8.125C8.47 5.00023 8.75 5.28023 8.125 5.62523C8.75 5.97023 8.47 6.25023 8.125 6.25023H7.29167C6.94667 6.25023 6.66667 5.97023 6.66667 5.62523ZM3.33333 5.62523C3.33333 5.28023 3.61333 5.00023 3.95833 5.00023H4.79167C5.13667 5.00023 5.41667 5.28023 5.41667 5.62523C5.41667 5.97023 5.13667 6.25023 4.79167 6.25023H3.95833C3.61333 6.25023 3.33333 5.97023 3.33333 5.62523ZM6.66667 8.12523C6.66667 7.78023 6.94667 7.50023 7.29167 7.50023H8.125C8.47 7.50023 8.75 7.78023 8.125 8.75023H7.29167C6.94667 8.75023 6.66667 8.47023 6.66667 8.12523ZM3.33333 8.12523C3.33333 7.78023 3.61333 7.50023 3.95833 7.50023H4.79167C5.13667 7.50023 5.41667 7.78023 5.41667 8.12523C5.41667 8.47023 5.13667 8.75023 4.79167 8.75023H3.95833C3.61333 8.75023 3.33333 8.47023 3.33333 8.12523Z" fill="currentColor"/>
  </svg>
);

const IconCalendar = () => (
  <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
    <path d="M6 2v2m8-2v2M3.5 7.5h13m-14 -1a2 2 0 012-2h11a2 2 0 012 2v10a2 2 0 01-2 2h-11a2 2 0 01-2-2v-10z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconAngleDownSmall = () => (
  <svg width="10" height="6" viewBox="0 0 5.83366 3.50016" fill="none">
    <path d="M2.91683 3.50016C2.7675 3.50016 2.61815 3.44302 2.5044 3.32927L0.171063 0.995932C-0.0570208 0.767849 -0.0570208 0.399146 0.171063 0.171063C0.399146 -0.0570208 0.767849 -0.0570208 0.995932 0.171063L2.91683 2.09196L4.83773 0.171063C5.06581 -0.0570208 5.43452 -0.0570208 5.6626 0.171063C5.89068 0.399146 5.89068 0.767849 5.6626 0.995932L3.32927 3.32927C3.21552 3.44302 3.06616 3.50016 2.91683 3.50016Z" fill="currentColor"/>
  </svg>
);

function CustomDropdown({ value, onChange, options, placeholder, isCurrency = false, isStatus = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedItem = options.find((opt) => (typeof opt === 'object' ? opt.name === value : opt === value));
  const displayLabel = selectedItem
    ? (typeof selectedItem === 'object' ? selectedItem.name : selectedItem)
    : placeholder;

  return (
    <div className={`npm-custom-select-wrapper ${isCurrency ? 'npm-currency-wrapper' : ''}`} ref={containerRef}>
      <button
        type="button"
        className={`npm-custom-select-control ${!value ? 'is-empty' : ''} ${isOpen ? 'is-open' : ''} ${isCurrency ? 'is-currency' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{displayLabel}</span>
        {!isCurrency && (
          <span className="npm-custom-select-arrow">
            <IconAngleDownSmall />
          </span>
        )}
      </button>

      {isOpen && (
        <div className={`npm-custom-dropdown-menu ${isCurrency ? 'npm-currency-menu' : ''} ${isStatus ? 'npm-status-menu' : ''}`}>
          {options.map((opt) => {
            const val = typeof opt === 'object' ? opt.name : opt;
            const labelText = typeof opt === 'object' ? opt.name : opt;
            const isSelected = value === val;
            return (
              <div
                key={val}
                className={`npm-dropdown-option ${isSelected ? 'is-selected' : ''}`}
                onClick={() => {
                  onChange(val);
                  setIsOpen(false);
                }}
              >
                {labelText}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function DateField({ value, onChange }) {
  const inputRef = useRef(null);

  const handleIconClick = () => {
    if (inputRef.current) {
      if (typeof inputRef.current.showPicker === 'function') {
        inputRef.current.showPicker();
      } else {
        inputRef.current.focus();
      }
    }
  };

  return (
    <div className="npm-date-wrapper">
      <input
        ref={inputRef}
        type="date"
        className={`npm-input npm-date-input ${!value ? 'is-empty' : ''}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <button
        type="button"
        className="npm-date-icon-btn"
        onClick={handleIconClick}
        title="Open Calendar"
        aria-label="Open Calendar"
      >
        <IconCalendar />
      </button>
    </div>
  );
}

const statusOptions = ['Active', 'Planning', 'Overdue', 'At Risk', 'Completed'];

const currencySymbols = {
  IDR: 'Rp',
  USD: '$',
  EUR: '€',
};

export default function NewProjectModal({ onClose, onCreateProject, initialData = null, isEdit = false }) {
  const [name, setName] = useState(initialData?.name || '');
  const [fieldMode, setFieldMode] = useState(initialData?.fieldMode || 'client');
  const [client, setClient] = useState(initialData?.client || '');
  const [category, setCategory] = useState(initialData?.category || '');
  const [pmName, setPmName] = useState(initialData?.pmName || '');
  const [budget, setBudget] = useState(
    initialData?.budget ? initialData.budget.replace(/^(Rp|\$|€)\s*/, '') : ''
  );
  const [currency, setCurrency] = useState(initialData?.currency || 'IDR');
  const [status, setStatus] = useState(initialData?.status || '');
  const [startDate, setStartDate] = useState(initialData?.startDate || '');
  const [deadline, setDeadline] = useState(initialData?.deadline || '');
  const [description, setDescription] = useState(initialData?.description || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    const pmObj = pmOptions.find((p) => p.name === pmName) || pmOptions[0];
    const currSymbol = currencySymbols[currency] || 'Rp';

    // Format deadline date for display if raw YYYY-MM-DD
    let formattedDeadline = deadline;
    if (deadline && deadline.includes('-')) {
      const [y, m, d] = deadline.split('-');
      const monthNames = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
      formattedDeadline = `${parseInt(d, 10)} ${monthNames[parseInt(m, 10) - 1]} ${y}`;
    }

    onCreateProject({
      ...initialData,
      name,
      client: client || (fieldMode === 'company' ? 'Company Client' : 'Client Account'),
      category: category || 'Web Development',
      pmName: pmObj.name,
      pmInitials: pmObj.initials,
      pmGrad: pmObj.grad,
      budget: budget ? `${currSymbol} ${budget}` : `${currSymbol} 10.000.000`,
      currency,
      status: status || 'Active',
      startDate,
      deadline: formattedDeadline || '25 Desember 2026',
      description,
    });
  };

  return (
    <div className="npm-overlay" onClick={onClose}>
      <div className="npm-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="npm-header">
          <div>
            <h2 className="npm-title">{isEdit ? 'Edit Project' : 'New Project'}</h2>
            <p className="npm-subtitle">
              {isEdit ? 'Update project details' : 'Create a new engagement for your agency'}
            </p>
          </div>
          <button className="npm-close-btn" onClick={onClose} aria-label="Close">
            <IconClose />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="npm-form-body">
          {/* Row 1: Project Name (Full Width) */}
          <div className="npm-field-group">
            <label className="npm-label">
              Project Name <span className="npm-required">*</span>
            </label>
            <input
              type="text"
              className={`npm-input ${!name ? 'is-empty' : ''}`}
              placeholder="e.g. Website Redesign"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Row 2: Client & Category (2-Column Grid) */}
          <div className="npm-grid-2col">
            <div className="npm-field-group">
              <label className="npm-label">
                Client <span className="npm-required">*</span>
              </label>
              <div className="npm-input-with-action">
                {fieldMode === 'client' ? (
                  <CustomDropdown
                    value={client}
                    onChange={setClient}
                    options={clientOptions}
                    placeholder="Select Client..."
                  />
                ) : (
                  <input
                    type="text"
                    className={`npm-input ${!client ? 'is-empty' : ''}`}
                    placeholder="e.g. Acme International"
                    value={client}
                    onChange={(e) => setClient(e.target.value)}
                  />
                )}
                <button
                  type="button"
                  className="npm-action-btn"
                  onClick={() => setFieldMode(fieldMode === 'client' ? 'company' : 'client')}
                  title={fieldMode === 'client' ? 'Enter Custom Client Name' : 'Select from Presets'}
                  aria-label="Toggle client mode"
                >
                  <IconBuilding />
                </button>
              </div>
            </div>

            <div className="npm-field-group">
              <label className="npm-label">
                Category <span className="npm-required">*</span>
              </label>
              <CustomDropdown
                value={category}
                onChange={setCategory}
                options={projectCategories}
                placeholder="Select Category..."
              />
            </div>
          </div>

          {/* Row 3: Project Manager & Budget (2-Column Grid) */}
          <div className="npm-grid-2col">
            <div className="npm-field-group">
              <label className="npm-label">
                Project Manager <span className="npm-required">*</span>
              </label>
              <CustomDropdown
                value={pmName}
                onChange={setPmName}
                options={pmOptions}
                placeholder="Select PM..."
              />
            </div>

            <div className="npm-field-group">
              <label className="npm-label">
                Budget <span className="npm-required">*</span>
              </label>
              <div className="npm-budget-group">
                <span className="npm-currency-prefix">{currencySymbols[currency] || 'Rp'}</span>
                <input
                  type="text"
                  className={`npm-budget-input ${!budget ? 'is-empty' : ''}`}
                  placeholder="10.000.000"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                />
                <div className="npm-currency-wrapper">
                  <CustomDropdown
                    value={currency}
                    onChange={setCurrency}
                    options={['IDR', 'USD', 'EUR']}
                    placeholder="IDR"
                    isCurrency={true}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Row 4: Status + Start Date + Deadline (3-Column Grid) */}
          <div className="npm-grid-3col">
            <div className="npm-field-group">
              <label className="npm-label">
                Status <span className="npm-required">*</span>
              </label>
              <CustomDropdown
                value={status}
                onChange={setStatus}
                options={statusOptions}
                placeholder="Select Status..."
                isStatus={true}
              />
            </div>

            <div className="npm-field-group">
              <label className="npm-label">Start Date</label>
              <DateField value={startDate} onChange={setStartDate} />
            </div>

            <div className="npm-field-group">
              <label className="npm-label">
                Deadline <span className="npm-required">*</span>
              </label>
              <DateField value={deadline} onChange={setDeadline} />
            </div>
          </div>

          {/* Row 5: Description (Full Width) */}
          <div className="npm-field-group">
            <label className="npm-label">Description (Optional)</label>
            <textarea
              className={`npm-textarea ${!description ? 'is-empty' : ''}`}
              placeholder="Brief summary of the engagement scope..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          {/* Footer (Cancel + Create Project) */}
          <div className="npm-footer">
            <button type="button" className="npm-btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="npm-btn-submit">
              {isEdit ? 'Save Changes' : '+ Create Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

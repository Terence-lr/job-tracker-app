import React from 'react';

const StatusFilter = ({ currentFilter, onFilterChange, statusCounts }) => {
  const statusOptions = [
    { value: 'All', label: 'All Jobs', count: statusCounts?.All || 0 },
    { value: 'Applied', label: 'Applied', count: statusCounts?.Applied || 0 },
    { value: 'Interview', label: 'Interview', count: statusCounts?.Interview || 0 },
    { value: 'Offer', label: 'Offer', count: statusCounts?.Offer || 0 },
    { value: 'Rejected', label: 'Rejected', count: statusCounts?.Rejected || 0 }
  ];

  return (
    <div className="status-filter">
      <h3>Filter by Status</h3>
      <div className="filter-buttons">
        {statusOptions.map(option => (
          <button
            key={option.value}
            onClick={() => onFilterChange(option.value)}
            className={`filter-btn ${currentFilter === option.value ? 'active' : ''}`}
          >
            {option.label}
            <span className="filter-count">({option.count})</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default StatusFilter;

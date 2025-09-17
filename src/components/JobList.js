import React from 'react';
import JobCard from './JobCard';
import StatusFilter from './StatusFilter';

const JobList = ({ jobs, onEdit, onDelete, filterStatus, onFilterChange }) => {
  // Calculate status counts for filter buttons
  const getStatusCounts = () => {
    const counts = {
      'All': jobs.length,
      'Applied': 0,
      'Interview': 0,
      'Offer': 0,
      'Rejected': 0
    };

    jobs.forEach(job => {
      if (counts.hasOwnProperty(job.status)) {
        counts[job.status]++;
      }
    });

    return counts;
  };

  const statusCounts = getStatusCounts();

  return (
    <div className="job-list-container">
      <div className="job-list-header">
        <h2>Your Job Applications</h2>
        <p className="job-count">
          {jobs.length === 0 
            ? 'No job applications yet' 
            : `${jobs.length} job application${jobs.length === 1 ? '' : 's'} found`
          }
        </p>
      </div>

      <StatusFilter 
        currentFilter={filterStatus}
        onFilterChange={onFilterChange}
        statusCounts={statusCounts}
      />

      {jobs.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-content">
            <h3>No jobs to display</h3>
            <p>
              {filterStatus === 'All' 
                ? 'Start by adding your first job application above!'
                : `No jobs found with status "${filterStatus}". Try changing the filter or add a new job.`
              }
            </p>
          </div>
        </div>
      ) : (
        <div className="job-grid">
          {jobs.map(job => (
            <JobCard
              key={job.id}
              job={job}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default JobList;

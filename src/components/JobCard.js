import React from 'react';

const JobCard = ({ job, onEdit, onDelete }) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Applied':
        return 'status-applied';
      case 'Interview':
        return 'status-interview';
      case 'Offer':
        return 'status-offer';
      case 'Rejected':
        return 'status-rejected';
      default:
        return 'status-applied';
    }
  };

  return (
    <div className="job-card">
      <div className="job-card-header">
        <div className="job-title-section">
          <h3 className="job-position">{job.position}</h3>
          <p className="job-company">{job.company}</p>
        </div>
        
        <div className="job-status">
          <span className={`status-badge ${getStatusColor(job.status)}`}>
            {job.status}
          </span>
        </div>
      </div>

      <div className="job-card-body">
        <div className="job-details">
          {job.salary && (
            <div className="job-detail">
              <span className="detail-label">Salary:</span>
              <span className="detail-value">{job.salary}</span>
            </div>
          )}
          
          <div className="job-detail">
            <span className="detail-label">Applied:</span>
            <span className="detail-value">{formatDate(job.dateApplied)}</span>
          </div>
          
          {job.url && (
            <div className="job-detail">
              <span className="detail-label">Job Posting:</span>
              <a 
                href={job.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="job-url"
              >
                View Posting
              </a>
            </div>
          )}
        </div>

        {job.notes && (
          <div className="job-notes">
            <span className="detail-label">Notes:</span>
            <p className="notes-text">{job.notes}</p>
          </div>
        )}
      </div>

      <div className="job-card-actions">
        <button 
          onClick={() => onEdit(job)} 
          className="btn btn-edit"
          title="Edit job"
        >
          ✏️ Edit
        </button>
        
        <button 
          onClick={() => onDelete(job.id)} 
          className="btn btn-delete"
          title="Delete job"
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
};

export default JobCard;

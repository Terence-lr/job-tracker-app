import React, { useState, useEffect } from 'react';

const JobForm = ({ onSubmit, editingJob, onCancel }) => {
  const [formData, setFormData] = useState({
    company: '',
    position: '',
    salary: '',
    status: 'Applied',
    notes: '',
    url: ''
  });

  // Populate form when editing
  useEffect(() => {
    if (editingJob) {
      setFormData({
        company: editingJob.company || '',
        position: editingJob.position || '',
        salary: editingJob.salary || '',
        status: editingJob.status || 'Applied',
        notes: editingJob.notes || '',
        url: editingJob.url || ''
      });
    } else {
      // Reset form for new job
      setFormData({
        company: '',
        position: '',
        salary: '',
        status: 'Applied',
        notes: '',
        url: ''
      });
    }
  }, [editingJob]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.company.trim() || !formData.position.trim()) {
      alert('Please fill in company and position fields');
      return;
    }

    if (editingJob) {
      onSubmit(editingJob.id, formData);
    } else {
      onSubmit(formData);
    }
  };

  return (
    <div className="job-form-container">
      <h2>{editingJob ? 'Edit Job Application' : 'Add New Job Application'}</h2>
      
      <form onSubmit={handleSubmit} className="job-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="company">Company *</label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
              placeholder="Enter company name"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="position">Position *</label>
            <input
              type="text"
              id="position"
              name="position"
              value={formData.position}
              onChange={handleChange}
              required
              placeholder="Enter job position"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="salary">Salary</label>
            <input
              type="text"
              id="salary"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              placeholder="e.g., $80,000 or $80k-100k"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="url">Job Posting URL</label>
          <input
            type="url"
            id="url"
            name="url"
            value={formData.url}
            onChange={handleChange}
            placeholder="https://..."
          />
        </div>

        <div className="form-group">
          <label htmlFor="notes">Notes</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Any additional notes about this application..."
            rows="3"
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {editingJob ? 'Update Job' : 'Add Job'}
          </button>
          
          {editingJob && (
            <button type="button" onClick={onCancel} className="btn btn-secondary">
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default JobForm;

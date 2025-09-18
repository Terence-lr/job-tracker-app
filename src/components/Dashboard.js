import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import JobForm from './JobForm';
import JobList from './JobList';

const Dashboard = () => {
  // State management for jobs array
  const [jobs, setJobs] = useState([]);
  const [editingJob, setEditingJob] = useState(null);
  const [filterStatus, setFilterStatus] = useState('All');
  const { currentUser, logout } = useAuth();

  // Add a new job
  const addJob = (jobData) => {
    const newJob = {
      id: Date.now().toString(), // Simple unique ID generation
      ...jobData,
      dateApplied: new Date().toISOString().split('T')[0], // Current date in YYYY-MM-DD format
      userId: currentUser.uid // Associate job with current user
    };
    setJobs([...jobs, newJob]);
  };

  // Update an existing job
  const updateJob = (jobId, updatedData) => {
    setJobs(jobs.map(job => 
      job.id === jobId ? { ...job, ...updatedData } : job
    ));
    setEditingJob(null);
  };

  // Delete a job
  const deleteJob = (jobId) => {
    setJobs(jobs.filter(job => job.id !== jobId));
  };

  // Start editing a job
  const startEditing = (job) => {
    setEditingJob(job);
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingJob(null);
  };

  // Filter jobs by status
  const filteredJobs = filterStatus === 'All' 
    ? jobs 
    : jobs.filter(job => job.status === filterStatus);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Job Application Tracker</h1>
          <div className="user-info">
            <span className="welcome-text">
              Welcome, {currentUser.displayName || currentUser.email}!
            </span>
            <button onClick={handleLogout} className="btn btn-secondary logout-btn">
              Logout
            </button>
          </div>
        </div>
      </header>
      
      <main className="dashboard-main">
        <JobForm 
          onSubmit={editingJob ? updateJob : addJob}
          editingJob={editingJob}
          onCancel={cancelEditing}
        />
        
        <JobList 
          jobs={filteredJobs}
          onEdit={startEditing}
          onDelete={deleteJob}
          filterStatus={filterStatus}
          onFilterChange={setFilterStatus}
        />
      </main>
    </div>
  );
};

export default Dashboard;

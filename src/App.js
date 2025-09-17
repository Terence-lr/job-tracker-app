import React, { useState } from 'react';
import './App.css';
import JobForm from './components/JobForm';
import JobList from './components/JobList';

function App() {
  // State management for jobs array
  const [jobs, setJobs] = useState([]);
  const [editingJob, setEditingJob] = useState(null);
  const [filterStatus, setFilterStatus] = useState('All');

  // Add a new job
  const addJob = (jobData) => {
    const newJob = {
      id: Date.now().toString(), // Simple unique ID generation
      ...jobData,
      dateApplied: new Date().toISOString().split('T')[0] // Current date in YYYY-MM-DD format
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

  return (
    <div className="App">
      <header className="App-header">
        <h1>Job Application Tracker</h1>
      </header>
      
      <main className="App-main">
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
}

export default App;

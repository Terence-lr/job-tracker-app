import React, { useEffect, useState } from 'react';
import { verifyFirebaseConfig } from '../firebase/config';

const ConfigTest = () => {
  const [configInfo, setConfigInfo] = useState(null);
  const [testResults, setTestResults] = useState({});

  useEffect(() => {
    // Run configuration test
    const config = verifyFirebaseConfig();
    setConfigInfo(config);
    
    // Test Firebase connectivity
    testFirebaseConnectivity();
  }, []);

  const testFirebaseConnectivity = async () => {
    const results = {
      configLoaded: false,
      authInitialized: false,
      dbInitialized: false,
      timestamp: new Date().toISOString()
    };

    try {
      // Test if config is loaded
      results.configLoaded = !!configInfo;
      
      // Test auth initialization
      const { auth } = await import('../firebase/config');
      results.authInitialized = !!auth;
      
      // Test db initialization
      const { db } = await import('../firebase/config');
      results.dbInitialized = !!db;
      
      console.log('🧪 FIREBASE CONNECTIVITY TEST RESULTS:', results);
    } catch (error) {
      console.error('❌ Firebase connectivity test failed:', error);
      results.error = error.message;
    }

    setTestResults(results);
  };

  return (
    <div style={{ 
      position: 'fixed', 
      top: '10px', 
      right: '10px', 
      background: 'white', 
      border: '2px solid #333', 
      padding: '10px', 
      borderRadius: '8px',
      fontSize: '12px',
      maxWidth: '300px',
      zIndex: 9999,
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
    }}>
      <h4 style={{ margin: '0 0 10px 0', color: '#333' }}>🔧 Config Test</h4>
      
      {configInfo && (
        <div>
          <div><strong>Version:</strong> {configInfo.version}</div>
          <div><strong>Deployed:</strong> {new Date(configInfo.deploymentTime).toLocaleTimeString()}</div>
          <div><strong>App ID:</strong> {configInfo.appIdValue}</div>
          <div><strong>Auth:</strong> {configInfo.authInitialized ? '✅' : '❌'}</div>
          <div><strong>DB:</strong> {configInfo.dbInitialized ? '✅' : '❌'}</div>
        </div>
      )}
      
      {Object.keys(testResults).length > 0 && (
        <div style={{ marginTop: '10px', paddingTop: '10px', borderTop: '1px solid #ccc' }}>
          <div><strong>Connectivity Test:</strong></div>
          <div>Config: {testResults.configLoaded ? '✅' : '❌'}</div>
          <div>Auth: {testResults.authInitialized ? '✅' : '❌'}</div>
          <div>DB: {testResults.dbInitialized ? '✅' : '❌'}</div>
          {testResults.error && (
            <div style={{ color: 'red' }}>Error: {testResults.error}</div>
          )}
        </div>
      )}
    </div>
  );
};

export default ConfigTest;

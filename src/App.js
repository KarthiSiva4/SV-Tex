import React from 'react';
import './App.css';
import Layout from './components/Layout';
import Homepage from './components/Homepage';

function App() {
  return (
    <div className="App">
      <Layout>
        <Homepage />
      </Layout>
    </div>
  );
}

export default App;

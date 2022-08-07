import React from 'react';
import './App.css';
import Layout from './components/Layout';
import Homepage from './components/Homepage';
import Contact from './components/Contact';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Gallery from './components/Gallery';

function App() {
  return (
    <div className="App">
      <Layout>
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="*" element={<Homepage />} />
        </Routes>
        </BrowserRouter>
      </Layout>
    </div>
  );
}

export default App;

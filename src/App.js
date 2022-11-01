import React from 'react';
import './App.css';
import Layout from './components/Layout';
import Homepage from './components/Homepage';
import Contact from './components/Contact';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import GalleryView from './components/GalleryView';
import ImagesGallery from './components/ImageGalleryView';

function App() {
  return (
    <div className="App">
      <Layout>
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/contact" element={<Contact />} />
          {/* <Route path="/gallery" element={<GalleryView />} /> */}
          <Route path="/gallery" element={<ImagesGallery />} />
          <Route path="*" element={<Homepage />} />
        </Routes>
        </BrowserRouter>
      </Layout>
    </div>
  );
}

export default App;

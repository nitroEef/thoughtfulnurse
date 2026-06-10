import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Homepage from './components/Homepage';
import BlogPage from './components/Blog/Blogpage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/blog" element={<BlogPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
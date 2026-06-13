import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Homepage from "./components/Homepage";

function App() {
  return (
    <BrowserRouter basename="/thoughtfulnurse">
      <Routes>
        <Route path="/" element={<Homepage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
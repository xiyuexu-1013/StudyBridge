import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import CardDetail from './pages/CardDetail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/card/:cardId" element={<CardDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

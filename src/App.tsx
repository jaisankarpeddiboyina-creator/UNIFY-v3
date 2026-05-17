import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import CategoryPage from './pages/CategoryPage';
import SharedResult from './pages/SharedResult';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { ErrorBoundary } from './components/ErrorBoundary';

export default function App() {
  return (
    <Router>
      <ErrorBoundary>
        <div className="app-layout">
          <Navbar />
          <Sidebar />
          <main className="content-area">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/category/:category" element={<CategoryPage />} />
              <Route path="/share" element={<SharedResult />} />
            </Routes>
          </main>
        </div>
      </ErrorBoundary>
    </Router>
  );
}

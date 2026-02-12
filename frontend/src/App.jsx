import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Authors from './pages/Authors';
import Contact from './pages/Contact';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import Registration from './pages/Registration';
import Sponsors from './pages/Sponsors';
import ProtectedRoute from './components/ProtectedRoute';


// New Pages
import CallForPapers from './pages/CallForPapers';
import PaperSubmission from './pages/PaperSubmission';
import PaperPublications from './pages/PaperPublications';
import AcceptedPapers from './pages/AcceptedPapers';
import BestPaperAward from './pages/BestPaperAward';
import ImportantDates from './pages/ImportantDates';
import VisaInformation from './pages/VisaInformation';
import Accommodation from './pages/Accommodation';
import TouristPlaces from './pages/TouristPlaces';
import Committees from './pages/Committees';
import Speakers from './pages/Speakers';
import Archive from './pages/Archive';
import { YearProvider } from './context/YearContext';

function AppContent() {
  const location = useLocation();
  const isHiddenPath = location.pathname.startsWith('/admin') || location.pathname === '/login';

  return (
    <div className="flex flex-col min-h-screen">
      {!isHiddenPath && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/authors" element={<Authors />} />
          <Route path="/for-authors" element={<Authors />} />

          <Route path="/committees" element={<Committees />} />
          <Route path="/speakers" element={<Speakers />} />

          <Route path="/contact" element={<Contact />} />
          <Route path="/call-for-papers" element={<CallForPapers />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />

          <Route path="/paper-submission" element={<PaperSubmission />} />
          <Route path="/paper-publications" element={<PaperPublications />} />
          <Route path="/accepted-papers" element={<AcceptedPapers />} />
          <Route path="/best-paper-award" element={<BestPaperAward />} />

          <Route path="/important-dates" element={<ImportantDates />} />
          <Route path="/visa-information" element={<VisaInformation />} />
          <Route path="/accommodation" element={<Accommodation />} />
          <Route path="/tourist-places" element={<TouristPlaces />} />
          <Route path="/sponsors" element={<Sponsors />} />
          <Route path="/archive" element={<Archive />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute adminOnly={true}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      {!isHiddenPath && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <YearProvider>
        <AppContent />
      </YearProvider>
    </Router>
  );
}

export default App;

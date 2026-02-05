import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Authors from './pages/Authors';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';

// New Pages
import CallForPapers from './pages/CallForPapers';
import PaperSubmission from './pages/PaperSubmission';
import PaperPublications from './pages/PaperPublications';
import AcceptedPapers from './pages/AcceptedPapers';
import BestPaperAward from './pages/BestPaperAward';
import ImportantDates from './pages/ImportantDates';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/authors" element={<Authors />} />
            <Route path="/for-authors" element={<Authors />} />
            {/* Placeholders for new items without specific requests yet */}
            <Route path="/committees" element={<div className="pt-32 pb-20 text-center text-3xl font-bold text-gray-600">Committees Coming Soon</div>} />
            <Route path="/speakers" element={<div className="pt-32 pb-20 text-center text-3xl font-bold text-gray-600">Speakers Coming Soon</div>} />

            <Route path="/contact" element={<Contact />} />
            <Route path="/call-for-papers" element={<CallForPapers />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/registration" element={<Register />} />

            <Route path="/paper-submission" element={<PaperSubmission />} />
            <Route path="/paper-publications" element={<PaperPublications />} />
            <Route path="/accepted-papers" element={<AcceptedPapers />} />
            <Route path="/best-paper-award" element={<BestPaperAward />} />

            <Route path="/important-dates" element={<ImportantDates />} />
            <Route path="/visa-information" element={<div className="pt-32 pb-20 text-center text-3xl font-bold text-gray-600">Visa Information Coming Soon</div>} />
            <Route path="/accommodation" element={<div className="pt-32 pb-20 text-center text-3xl font-bold text-gray-600">Accommodation Coming Soon</div>} />
            <Route path="/tourist-places" element={<div className="pt-32 pb-20 text-center text-3xl font-bold text-gray-600">Tourist Places Coming Soon</div>} />
            <Route path="/sponsors" element={<div className="pt-32 pb-20 text-center text-3xl font-bold text-gray-600">Sponsors Coming Soon</div>} />
            <Route path="/archive" element={<div className="pt-32 pb-20 text-center text-3xl font-bold text-gray-600">Archive Coming Soon</div>} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/dashboard" element={<UserDashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Components/Layout';
import Inde from './Components/Inde';
import Contact from './Components/Contact';
import Requests from './Components/Requests';
import AboutUs from './Components/AboutUs';
import LandingPage from './Components/LandingPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Wrap routes with Layout to include Navbar and Footer */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Inde />} /> {/* Default home route */}
          <Route path="about" element={<AboutUs />} />
          <Route path="contact" element={<Contact />} />
          <Route path="request" element={<Requests />} />
        </Route>
        <Route path="LandingPage" element={<LandingPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;

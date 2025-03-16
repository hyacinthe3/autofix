import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Components/Layout';
import Inde from './Components/Inde';
import Contact from './Components/Contact';
import Requests from './Components/Requests';
import AboutUs from './Components/AboutUs';
import LandingPage from './Components/LandingPage';
import DriverRegistrationForm from './Components/Register';
import LoginForm from './Components/LoginForm';
import MechanicRegistrationForm from './Components/MechanicRegister';
import MechanicLoginForm from './Components/MechanicLogin';


import DashboardLayout from './Dashboard/DashboardLayout'; // Layout will wrap other pages
import Dashboard from './Dashboard/Dashboard'; // Your Dashboard page
import DashboardRequests from './Dashboard/DashboardRequests';
import Older_requests from './Dashboard/Older_requests'
import Earnings from './Dashboard/Earnings';
import Communication from './Dashboard/Communication';
import FeedBack from './Dashboard/FeedBack';
import Support from './Dashboard/Support';



import AdminLayout from './AdminComponents/AdminLayout'; // Layout will wrap other pages
import AdminDashboard from './AdminComponents/AdminDashboard'; // Your Dashboard page
import AdminRequests from './AdminComponents/AdminRequests';
import AdminOlder_requests from './AdminComponents/AdminOlder_requests'
import AdminEarnings from './AdminComponents/AdminEarnings';
import AdminCommunication from './AdminComponents/AdminCommunication';
import AdminFeedBack from './AdminComponents/AdminFeedBack';
import AdminSupport from './AdminComponents/AdminSupport';
import Users from './AdminComponents/Users';
import Viewdrivers from './AdminComponents/Viewdrivers';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Wrap routes with Layout to include Navbar and Footer */}
        <Route path="/" element={<Layout />}>
          <Route path="home" element={<Inde/>} /> {/* Default home route */}
          <Route path="about" element={<AboutUs />} />
          <Route path="contact" element={<Contact />} />
          <Route path="request" element={<Requests />} />
         

        </Route>
        <Route path="LandingPage" element={<LandingPage />} />
        <Route path="register" element={<DriverRegistrationForm/>}/>
        <Route path="LoginForm" element={<LoginForm/>}/>
        <Route path='MechanicRegistrationForm'  element={<MechanicRegistrationForm/>}/>
        <Route path='MechanicLoginForm' element={<MechanicLoginForm/>}/>




        <Route path="/" element={<DashboardLayout />}>
          {/* Nested route for Dashboard inside Layout */}
          <Route path='Dashboard' element={<Dashboard />} />
          <Route path='DashboardRequests' element={<DashboardRequests/>}/>
          <Route path='Older-requests' element={<Older_requests/>}/>
          <Route path='Earnings' element={<Earnings/>}/>
          <Route path='Communication' element={<Communication/>}/>
          <Route path='FeedBack' element={<FeedBack/>}/>
          <Route path='support' element={<Support/>}/>
          <Route path='Viewdrivers' element={<Viewdrivers/>}/>
        </Route>




        <Route path="/" element={<AdminLayout />}>
          {/* Nested route for Dashboard inside Layout */}
          <Route path='admin' element={<AdminDashboard />} />
          <Route path='Adminrequests' element={<AdminRequests/>}/>
          <Route path='AdminOlder-requests' element={<AdminOlder_requests/>}/>
          <Route path='AdminEarnings' element={<AdminEarnings/>}/>
          <Route path='AdminCommunication' element={<AdminCommunication/>}/>
          <Route path='AdminFeedBack' element={<AdminFeedBack/>}/>
          <Route path='Adminsupport' element={<AdminSupport/>}/>
          <Route path='users' element={<Users/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

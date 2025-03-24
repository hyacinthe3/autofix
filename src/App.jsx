import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Components/Layout';
import Inde from './Components/Inde';
import Contact from './Components/Contact';
import Requests from './Components/Requests';
import AboutUs from './Components/AboutUs';
import LandingPage from './Components/LandingPage';
import DriverRegistrationForm from './Components/Register';
import LoginForm from './Components/LoginForm';
import GarageLogin from './Components/GarageLogin';
import GarageRegistrationForm from './Components/GarageRegister';
import ViewRequests from './Components/ViewRequests';


import DashboardLayout from './Dashboard/DashboardLayout'; // Layout will wrap other pages
import Dashboard from './Dashboard/Dashboard'; // Your Dashboard page
import DashboardRequests from './Dashboard/DashboardRequests';
import Older_requests from './Dashboard/Older_requests'
import Earnings from './Dashboard/Earnings';
import Communication from './Dashboard/Communication';
import FeedBack from './Dashboard/FeedBack';
import Support from './Dashboard/Support';
import MechanicRegister from './Dashboard/MechanicRegister';
import MechanicList from './Dashboard/MechanicList';
import MechanicUpdate from './Dashboard/MechanicUpdates';
import GarageList from './AdminComponents/ViewGarages';




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
import ApprovedGarages from './AdminComponents/ApprovedGarages';
import Messages from './AdminComponents/Messages';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Wrap routes with Layout to include Navbar and Footer */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Inde/>} /> {/* Default home route */}
          <Route path="about" element={<AboutUs />} />
          <Route path="contact" element={<Contact />} />
          <Route path="request" element={<Requests />} />
          <Route path='ViewRequests'  element={<ViewRequests/>}/>
         

        </Route>
        <Route path="LandingPage" element={<LandingPage />} />
        <Route path="register" element={<DriverRegistrationForm/>}/>
        <Route path="LoginForm" element={<LoginForm/>}/>
        <Route path='GarageRegistrationForm'  element={<GarageRegistrationForm/>}/>
        <Route path='GarageLogin' element={<GarageLogin/>}/>




        <Route path="/" element={<DashboardLayout />}>
          {/* Nested route for Dashboard inside Layout */}
          <Route path='Dashboard' element={<Dashboard />} />
          <Route path='DashboardRequests' element={<DashboardRequests/>}/>
          {/* <Route path='/garage/:garageId/requests' element={<DashboardRequests />} /> */}
          <Route path='Older-requests' element={<Older_requests/>}/>
          <Route path='Earnings' element={<Earnings/>}/>
          <Route path='Communication' element={<Communication/>}/>
          <Route path='FeedBack' element={<FeedBack/>}/>
          <Route path='support' element={<Support/>}/>
          <Route path='Viewdrivers' element={<Viewdrivers/>}/>
          <Route path='MechanicRegister' element={<MechanicRegister/>}/>
          <Route path='MechanicList' element={<MechanicList/>}/>
          <Route path="/edit-mechanic/:id" element={<MechanicUpdate />} /> 
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
          <Route path='GarageList' element={<GarageList/>}/>
          <Route path='ApprovedGarages' element={<ApprovedGarages/>}/>
          <Route path='Messages' element={<Messages/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
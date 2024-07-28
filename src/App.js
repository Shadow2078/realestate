
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Header from "./pages/components/Header";
import Navbar from "./pages/components/Navbar";
import Footer from "./pages/components/Footer";
import Gallery from "./pages/Gallery";

import AdminDashboard from "./pages/User/AdminDashboard";
import Contact from "./pages/Contact";
import Plots from "./pages/Plots";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminRoutes from "./PrivaterRoutes/AdminRoutes";
import ScrollToTop from "./pages/components/ScrollToTop";

import Register from "./pages/Register";
import Login from "./pages/Login";
import SearchComponent from "./pages/homepageComponent/SearchComponent";
import AgentDashboard from "./pages/User/AgentDashboard";
import BuyerDashboard from "./pages/User/BuyerDashboard";
import OwnerDashboard from "./pages/User/OwnerDashboard";
import AgentRoutes from "./PrivaterRoutes/AgentRoutes";
import BuyerRoutes from "./PrivaterRoutes/BuyerRoutes";
import OwnerRoutes from "./PrivaterRoutes/OwnerRoutes";
import UserProfile from "./pages/Admin/UserProfile";
import PropertyPage from "./pages/propertyPage";
import Mission from "./pages/Mission";
function App() {
  return (
   <Router>
    <Header/>
    <Navbar/>

    <ToastContainer />
  <ScrollToTop />
    <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/gallery" element={<Gallery />} />
    <Route path="/about" element={<Mission />} />
    {/* <Route path="/community/:id" element={<CommunityDetail/>} /> */}
    {/* <Route path="/house/:id" element={<HouseDetails/>} /> */}
    <Route path="/Properties" element={<Plots/>} />
    <Route path="/contact" element={<Contact/>} />
    <Route path="/register" element={<Register/>}/>
    <Route path="/login" element={<Login/>} />
    <Route path="/explore" element={<SearchComponent />} />
    <Route path="/property/:propertyId" element={<PropertyPage />} />
    <Route path="/users/:id" element={<UserProfile/>} />
    <Route element={<AgentRoutes/>}>
    <Route path="/agentdashboard/*" element={<AgentDashboard/>} />
    </Route>
    <Route element={<BuyerRoutes/>}>
    <Route path="/buyerdashboard/*" element={<BuyerDashboard/>} />
    </Route>
    <Route element={<OwnerRoutes/>}>
    <Route path="/ownerdashboard/*" element={<OwnerDashboard/>} />
    </Route>
    <Route element={<AdminRoutes />}>
    <Route path="/admindashboard/*" element={<AdminDashboard />} />
    </Route>

    </Routes>
    <Footer/>
   </Router>
  );
}

export default App;

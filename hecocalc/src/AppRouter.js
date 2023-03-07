import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Uploads from "./pages/Uploads";
import GenerateTree from "./pages/GenerateTree";
import InputPage from "./components/InputPage";
import Simulation from "./pages/Simulation";
import LoginSettings from "./pages/SettingsPage";
import Snapshots from "./pages/Snapshots";
import { useState } from "react";
import App from "./App";
import Settings from "./pages/Settings";
import ManagerSelection from "./pages/managerSelection";

function AppRouter() {
  const [iterationNum, setIterationNum] = useState(0);
  const [digitalProbability, setDigitalProbability] = useState(
    localStorage.getItem("tpValue: DIGITAL") * 100
  );
  const [appropriateTreatment, setAppropriateTreatment] = useState(
    localStorage.getItem("tpValue: AEAT - DIGITAL") * 100
  );
  const [hospitalWithDigital, setHospitalWithDigital] = useState(0);
  const [serviceWithDigital, setServiceWithDigital] = useState(0);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Login />} />
          <Route path="/loginsettings" element={<LoginSettings />} />
          <Route path="/managerselect" element={<ManagerSelection />} />
          <Route
            path="/dashboard"
            element={
              <Dashboard
                iterationNum={iterationNum}
                setIterationNum={setIterationNum}
                digitalProbability={digitalProbability}
                setDigitalProbability={setDigitalProbability}
                appropriateTreatment={appropriateTreatment}
                setAppropriateTreatment={setAppropriateTreatment}
                hospitalWithDigital={hospitalWithDigital}
                setHospitalWithDigital={setHospitalWithDigital}
                serviceWithDigital={serviceWithDigital}
                setServiceWithDigital={setServiceWithDigital}
              />
            }
          />
          <Route path="/uploads" element={<Uploads />} />
          <Route path="/generatetree" element={<GenerateTree />} />
          <Route path="/input-page" element={<InputPage />} />
          <Route
            path="/simulation"
            element={
              <Simulation
                iterationNum={iterationNum}
                digitalProbability={digitalProbability}
              />
            }
          />
        </Route>
        <Route path='/snapshots' element={<Snapshots/>} />
        <Route path='/settings' element={<Settings/>} />
      </Routes>
    </Router>
  );
}

export default AppRouter;

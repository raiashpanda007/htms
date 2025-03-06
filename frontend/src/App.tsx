import { Outlet } from "react-router-dom";
function App() {
  return <div className="text-white bg-black dark h-screen w-screen overflow-hidden">
    <Outlet />
  </div>;
}

export default App;

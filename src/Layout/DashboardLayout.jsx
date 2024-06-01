import { Outlet } from "react-router-dom"
import SideBar from "../Dashboard/SideBar/SideBar"

function DashboardLayout() {
  return (
    <div className="flex">
      <div>
        <SideBar />
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default DashboardLayout
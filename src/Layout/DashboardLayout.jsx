import { Outlet } from "react-router-dom"
import SideBar from "../Dashboard/SideBar/SideBar"

function DashboardLayout() {
  return (
    <div className="flex gap-6">
      <div>
        <SideBar />
      </div>
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  );
}

export default DashboardLayout
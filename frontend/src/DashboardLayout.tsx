import Sidebar from "../src/components/Sidebar";

const DashboardLayout = ({ children }: any) => {
  return (
    <div className="flex min-h-screen">

      {/* LEFT SIDEBAR */}
      <div className="w-64">
        <Sidebar />
      </div>

      {/* RIGHT CONTENT */}
      <div className="flex-1 p-4">
        {children}
      </div>

    </div>
  );
};

export default DashboardLayout;
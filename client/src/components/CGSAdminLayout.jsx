import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, BookOpen, Menu, X, LogOut, Bell, User, BarChart3 } from 'lucide-react';

export default function CGSAdminLayout({ children, onLogout }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigation = [
    { name: 'Dashboard', href: '/cgs-admin/dashboard', icon: LayoutDashboard },
    { name: 'Supervisors', href: '/cgs-admin/supervisors', icon: Users },
    { name: 'Students', href: '/cgs-admin/students', icon: BookOpen },
    { name: 'Analytics', href: '/cgs-admin/analytics', icon: BarChart3 },
  ];

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    onLogout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden transition-opacity ${
          sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setSidebarOpen(false)}
      />

      <aside className={`fixed top-0 left-0 z-50 h-screen w-64 bg-white shadow-lg transform transition-transform duration-300 lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-800">CGS Admin Portal</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-600 hover:text-gray-800"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  active
                    ? 'bg-purple-50 text-purple-700 font-semibold'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon size={20} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 bg-white shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-600 hover:text-gray-800"
            >
              <Menu size={24} />
            </button>

            <div className="flex-1 lg:flex-none" />

            <div className="flex items-center gap-4">
              <button className="relative p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>

              <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-all cursor-pointer">
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                  <User size={18} className="text-white" />
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-semibold text-gray-800">CGS Administrator</p>
                  <p className="text-xs text-gray-500">Admin</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

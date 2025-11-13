import React from 'react';
import { BarChart3, Users, BookOpen } from 'lucide-react';

export default function CGSAdminDashboard() {
  const stats = [
    { label: 'Total Supervisors', value: 12, icon: Users, color: 'bg-blue-50 text-blue-600' },
    { label: 'Total Students', value: 85, icon: BookOpen, color: 'bg-green-50 text-green-600' },
    { label: 'Active Programs', value: 5, icon: BarChart3, color: 'bg-purple-50 text-purple-600' },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">CGS Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">Monitor all supervisors and students in the system</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-800 mt-2">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Supervisor Activities</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3 pb-3 border-b border-gray-200">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              <p className="text-sm text-gray-700">Dr. Sarah Johnson reviewed 5 thesis submissions</p>
              <span className="text-xs text-gray-500 ml-auto">2 hours ago</span>
            </div>
            <div className="flex items-center gap-3 pb-3 border-b border-gray-200">
              <div className="w-2 h-2 bg-green-600 rounded-full"></div>
              <p className="text-sm text-gray-700">Prof. Ahmed Khan created 3 progress reports</p>
              <span className="text-xs text-gray-500 ml-auto">4 hours ago</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
              <p className="text-sm text-gray-700">Dr. Emma Wilson updated student feedback</p>
              <span className="text-xs text-gray-500 ml-auto">6 hours ago</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Student Activities</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3 pb-3 border-b border-gray-200">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              <p className="text-sm text-gray-700">John Doe submitted thesis chapter 1</p>
              <span className="text-xs text-gray-500 ml-auto">1 hour ago</span>
            </div>
            <div className="flex items-center gap-3 pb-3 border-b border-gray-200">
              <div className="w-2 h-2 bg-green-600 rounded-full"></div>
              <p className="text-sm text-gray-700">Jane Smith uploaded progress update</p>
              <span className="text-xs text-gray-500 ml-auto">3 hours ago</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
              <p className="text-sm text-gray-700">Mike Johnson viewed feedback from supervisor</p>
              <span className="text-xs text-gray-500 ml-auto">5 hours ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

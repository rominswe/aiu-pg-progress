import React from 'react';
import { FileCheck, Users, TrendingUp } from 'lucide-react';

export default function ExaminerDashboard() {
  const stats = [
    { label: 'Pending Evaluations', value: 12, icon: FileCheck, color: 'bg-orange-50 text-orange-600' },
    { label: 'Completed Evaluations', value: 45, icon: TrendingUp, color: 'bg-green-50 text-green-600' },
    { label: 'Assigned Students', value: 28, icon: Users, color: 'bg-blue-50 text-blue-600' },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Examiner Dashboard</h1>
        <p className="text-gray-600 mt-2">Manage thesis evaluations and student assessments</p>
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

      {/* Recent Activities */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Activities</h2>
        <div className="space-y-3">
          <div className="flex items-center gap-3 pb-3 border-b border-gray-200">
            <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
            <p className="text-sm text-gray-700">John Doe's thesis assigned for evaluation</p>
            <span className="text-xs text-gray-500 ml-auto">2 hours ago</span>
          </div>
          <div className="flex items-center gap-3 pb-3 border-b border-gray-200">
            <div className="w-2 h-2 bg-green-600 rounded-full"></div>
            <p className="text-sm text-gray-700">Completed evaluation for Jane Smith</p>
            <span className="text-xs text-gray-500 ml-auto">4 hours ago</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
            <p className="text-sm text-gray-700">New thesis submission by Mike Johnson</p>
            <span className="text-xs text-gray-500 ml-auto">6 hours ago</span>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function CGSAnalytics() {
  // Sample data for charts
  const programDistribution = [
    { name: 'Computer Science', value: 25 },
    { name: 'Engineering', value: 18 },
    { name: 'Physics', value: 15 },
    { name: 'Mathematics', value: 12 },
    { name: 'Others', value: 15 },
  ];

  const monthlySubmissions = [
    { month: 'Jan', students: 45, supervisors: 12 },
    { month: 'Feb', students: 52, supervisors: 14 },
    { month: 'Mar', students: 48, supervisors: 13 },
    { month: 'Apr', students: 61, supervisors: 15 },
    { month: 'May', students: 55, supervisors: 12 },
    { month: 'Jun', students: 67, supervisors: 16 },
  ];

  const progressDistribution = [
    { range: '0-25%', count: 5 },
    { range: '25-50%', count: 12 },
    { range: '50-75%', count: 35 },
    { range: '75-100%', count: 33 },
  ];

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">System Analytics</h1>
        <p className="text-gray-600 mt-2">Overview of system performance and student progress</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm font-medium">Total Submissions</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">328</p>
          <p className="text-xs text-green-600 mt-2">↑ 12% from last month</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm font-medium">Avg Student Progress</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">62%</p>
          <p className="text-xs text-blue-600 mt-2">↑ 8% improvement</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm font-medium">Completion Rate</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">85%</p>
          <p className="text-xs text-green-600 mt-2">↑ 3% from last month</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm font-medium">Active Sessions</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">24</p>
          <p className="text-xs text-gray-600 mt-2">Currently online</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Monthly Submissions Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Monthly Activity</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlySubmissions}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="students" stroke="#3b82f6" name="Student Submissions" />
              <Line type="monotone" dataKey="supervisors" stroke="#10b981" name="Supervisor Reviews" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Progress Distribution Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Progress Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={progressDistribution}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="range" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#3b82f6" name="Number of Students" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Program and Status Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Program Distribution */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Program Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={programDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {programDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Key Metrics Table */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Key Performance Indicators</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center pb-3 border-b border-gray-200">
              <span className="text-gray-700">Total Students</span>
              <span className="font-semibold text-gray-800">85</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-gray-200">
              <span className="text-gray-700">Total Supervisors</span>
              <span className="font-semibold text-gray-800">12</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-gray-200">
              <span className="text-gray-700">Active Programs</span>
              <span className="font-semibold text-gray-800">5</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-gray-200">
              <span className="text-gray-700">Avg Supervision Quality</span>
              <span className="font-semibold text-green-600">4.2/5</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">System Uptime</span>
              <span className="font-semibold text-green-600">99.8%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

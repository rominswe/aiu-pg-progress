import React, { useState } from 'react';
import { Search, Eye, Edit2, Trash2 } from 'lucide-react';

export default function SupervisorManagement() {
  const [supervisors] = useState([
    { id: 'SUP001', name: 'Dr. Sarah Johnson', email: 'sarah.johnson@university.edu', department: 'Computer Science', studentsSupervised: 8, status: 'Active' },
    { id: 'SUP002', name: 'Prof. Ahmed Khan', email: 'ahmed.khan@university.edu', department: 'Engineering', studentsSupervised: 6, status: 'Active' },
    { id: 'SUP003', name: 'Dr. Emma Wilson', email: 'emma.wilson@university.edu', department: 'Physics', studentsSupervised: 5, status: 'Active' },
    { id: 'SUP004', name: 'Prof. Michael Brown', email: 'michael.brown@university.edu', department: 'Mathematics', studentsSupervised: 7, status: 'Inactive' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredSupervisors = supervisors.filter(supervisor =>
    supervisor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supervisor.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Supervisor Management</h1>
        <p className="text-gray-600 mt-2">Monitor and manage all supervisors in the system</p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
          />
        </div>
      </div>

      {/* Supervisors Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-800">Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-800">Email</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-800">Department</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-800">Students</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-800">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-800">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredSupervisors.map((supervisor) => (
              <tr key={supervisor.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm text-gray-800">{supervisor.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{supervisor.email}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{supervisor.department}</td>
                <td className="px-6 py-4 text-sm text-gray-800 font-medium">{supervisor.studentsSupervised}</td>
                <td className="px-6 py-4 text-sm">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    supervisor.status === 'Active' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {supervisor.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-blue-100 rounded-lg transition-colors text-blue-600" title="View">
                      <Eye size={18} />
                    </button>
                    <button className="p-2 hover:bg-green-100 rounded-lg transition-colors text-green-600" title="Edit">
                      <Edit2 size={18} />
                    </button>
                    <button className="p-2 hover:bg-red-100 rounded-lg transition-colors text-red-600" title="Delete">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredSupervisors.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No supervisors found matching your search.</p>
        </div>
      )}
    </div>
  );
}

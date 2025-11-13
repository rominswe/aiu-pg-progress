import React, { useState } from 'react';
import { Search, Eye, Edit2, Trash2 } from 'lucide-react';

export default function StudentManagement() {
  const [students] = useState([
    { id: 'STU001', name: 'John Doe', email: 'john.doe@university.edu', supervisor: 'Dr. Sarah Johnson', program: 'Computer Science', status: 'Active', progress: 65 },
    { id: 'STU002', name: 'Jane Smith', email: 'jane.smith@university.edu', supervisor: 'Prof. Ahmed Khan', program: 'Engineering', status: 'Active', progress: 72 },
    { id: 'STU003', name: 'Mike Johnson', email: 'mike.johnson@university.edu', supervisor: 'Dr. Emma Wilson', program: 'Physics', status: 'Active', progress: 58 },
    { id: 'STU004', name: 'Sarah Lee', email: 'sarah.lee@university.edu', supervisor: 'Dr. Sarah Johnson', program: 'Computer Science', status: 'Inactive', progress: 45 },
    { id: 'STU005', name: 'David Wilson', email: 'david.wilson@university.edu', supervisor: 'Prof. Michael Brown', program: 'Mathematics', status: 'Active', progress: 80 },
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Student Management</h1>
        <p className="text-gray-600 mt-2">Monitor and manage all students in the system</p>
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

      {/* Students Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-800">Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-800">Email</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-800">Supervisor</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-800">Program</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-800">Progress</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-800">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-800">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredStudents.map((student) => (
              <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm text-gray-800">{student.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{student.email}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{student.supervisor}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{student.program}</td>
                <td className="px-6 py-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${student.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-xs font-medium text-gray-600">{student.progress}%</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    student.status === 'Active' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {student.status}
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

      {filteredStudents.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No students found matching your search.</p>
        </div>
      )}
    </div>
  );
}

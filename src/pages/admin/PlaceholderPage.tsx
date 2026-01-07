import { Users, BookOpen, Calendar, FileText, Settings } from 'lucide-react';

const PlaceholderPage = ({ title }: { title: string }) => {
  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{title}</h1>
          <p className="text-gray-600">Manage your school's academic and administrative systems.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Academic Management Card */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-blue-100 rounded-lg mr-4">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">Academic Programs</h2>
            </div>
            <p className="text-gray-600 mb-4">Manage courses, curriculum, and academic standards.</p>
            <button className="text-blue-600 font-medium hover:text-blue-800 transition-colors">
              Manage Programs →
            </button>
          </div>

          {/* Student Management Card */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-green-100 rounded-lg mr-4">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">Student Records</h2>
            </div>
            <p className="text-gray-600 mb-4">View and manage student information and enrollment.</p>
            <button className="text-green-600 font-medium hover:text-green-800 transition-colors">
              View Students →
            </button>
          </div>

          {/* Staff Management Card */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-purple-100 rounded-lg mr-4">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">Staff Directory</h2>
            </div>
            <p className="text-gray-600 mb-4">Manage faculty and staff information and assignments.</p>
            <button className="text-purple-600 font-medium hover:text-purple-800 transition-colors">
              View Staff →
            </button>
          </div>

          {/* Schedule Management Card */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-orange-100 rounded-lg mr-4">
                <Calendar className="h-6 w-6 text-orange-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">Class Schedules</h2>
            </div>
            <p className="text-gray-600 mb-4">Create and manage class schedules and room assignments.</p>
            <button className="text-orange-600 font-medium hover:text-orange-800 transition-colors">
              Manage Schedules →
            </button>
          </div>

          {/* Reporting Card */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-indigo-100 rounded-lg mr-4">
                <FileText className="h-6 w-6 text-indigo-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">Reports</h2>
            </div>
            <p className="text-gray-600 mb-4">Generate academic and administrative reports.</p>
            <button className="text-indigo-600 font-medium hover:text-indigo-800 transition-colors">
              View Reports →
            </button>
          </div>

          {/* System Settings Card */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-gray-100 rounded-lg mr-4">
                <Settings className="h-6 w-6 text-gray-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">System Settings</h2>
            </div>
            <p className="text-gray-600 mb-4">Configure system preferences and user permissions.</p>
            <button className="text-gray-600 font-medium hover:text-gray-800 transition-colors">
              Configure →
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">School Management Overview</h2>
          <p className="text-gray-600 mb-6">
            The School Management System provides a comprehensive platform for managing all aspects of your educational institution. 
            From student records to academic programs, our system streamlines administrative tasks and improves operational efficiency.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4">
              <div className="text-3xl font-bold text-blue-600 mb-2">1,250+</div>
              <div className="text-gray-600">Students Enrolled</div>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl font-bold text-green-600 mb-2">85</div>
              <div className="text-gray-600">Teaching Staff</div>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl font-bold text-purple-600 mb-2">24</div>
              <div className="text-gray-600">Academic Programs</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceholderPage;
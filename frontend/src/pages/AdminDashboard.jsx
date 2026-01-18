import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

export default function AdminDashboard() {
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
  try {
    setLoading(true);
    const res = await api.get('/contact');
    console.log('API Response:', res.data);
    
    // Handle both array and object responses
    const contactData = Array.isArray(res.data) 
      ? res.data 
      : (res.data.data || []);
    
    setMessages(contactData);
    console.log('Loaded messages:', contactData.length);
  } catch (error) {
    console.error('Failed to fetch messages:', error);
    setMessages([]);
  } finally {
    setLoading(false);
  }
};


  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        await api.delete(`/contact/${id}`);
        fetchMessages();
      } catch (error) {
        console.error('Failed to delete message:', error);
        alert('Failed to delete message');
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin/login');
  };

  const exportToCSV = () => {
    if (messages.length === 0) {
      alert('No messages to export');
      return;
    }

    const csv = [
      ['Name', 'Email', 'Message', 'Date'],
      ...messages.map(m => [
        m.name,
        m.email,
        m.message.replace(/,/g, ';'),
        new Date(m.createdAt).toLocaleString()
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'messages.csv';
    a.click();
  };

  const replyToMessage = (email) => {
    window.location.href = `mailto:${email}`;
  };

  // Safe filtering
  const filteredMessages = Array.isArray(messages) 
    ? messages.filter(msg =>
        msg.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.email?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  // Safe statistics
  const totalMessages = Array.isArray(messages) ? messages.length : 0;
  const todayMessages = Array.isArray(messages) 
    ? messages.filter(m => 
        new Date(m.createdAt).toDateString() === new Date().toDateString()
      ).length 
    : 0;
  const weekMessages = Array.isArray(messages)
    ? messages.filter(m => 
        new Date(m.createdAt) > new Date(Date.now() - 7*24*60*60*1000)
      ).length
    : 0;
  const uniqueContacts = Array.isArray(messages)
    ? new Set(messages.map(m => m.email)).size
    : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold dark:text-white">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
          >
            Logout
          </button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-blue-600 p-6 rounded-xl text-white shadow-lg">
            <p className="text-sm opacity-80">Total Messages</p>
            <h3 className="text-4xl font-bold mt-2">{totalMessages}</h3>
          </div>
          <div className="bg-green-600 p-6 rounded-xl text-white shadow-lg">
            <p className="text-sm opacity-80">Today</p>
            <h3 className="text-4xl font-bold mt-2">{todayMessages}</h3>
          </div>
          <div className="bg-purple-600 p-6 rounded-xl text-white shadow-lg">
            <p className="text-sm opacity-80">This Week</p>
            <h3 className="text-4xl font-bold mt-2">{weekMessages}</h3>
          </div>
          <div className="bg-orange-600 p-6 rounded-xl text-white shadow-lg">
            <p className="text-sm opacity-80">Unique Contacts</p>
            <h3 className="text-4xl font-bold mt-2">{uniqueContacts}</h3>
          </div>
        </div>

        {/* Search & Export */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={exportToCSV}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
            >
              Export CSV
            </button>
          </div>
        </div>

        {/* Messages Table */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold dark:text-white">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold dark:text-white">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold dark:text-white">Message</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold dark:text-white">Date</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold dark:text-white">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredMessages.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center">
                      <div className="text-gray-500 dark:text-gray-400">
                        <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                        <p className="text-lg font-semibold">
                          {searchTerm ? 'No messages found' : 'No messages yet'}
                        </p>
                        <p className="text-sm mt-2">
                          {searchTerm ? 'Try a different search term' : 'Messages will appear here when users contact you'}
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredMessages.map((message) => (
                    <tr key={message._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                      <td className="px-6 py-4 dark:text-white font-medium">{message.name}</td>
                      <td className="px-6 py-4 dark:text-gray-300">{message.email}</td>
                      <td 
                        className="px-6 py-4 dark:text-gray-300 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400"
                        onClick={() => setSelectedMessage(message)}
                        title="Click to view full message"
                      >
                        <div className="max-w-xs truncate">
                          {message.message.substring(0, 50)}...
                        </div>
                      </td>
                      <td className="px-6 py-4 dark:text-gray-300 whitespace-nowrap">
                        {new Date(message.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2 justify-center">
                          <button
                            onClick={() => replyToMessage(message.email)}
                            className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition"
                            title="Reply via email"
                          >
                            Reply
                          </button>
                          <button
                            onClick={() => setSelectedMessage(message)}
                            className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition"
                            title="View full message"
                          >
                            View
                          </button>
                          <button
                            onClick={() => handleDelete(message._id)}
                            className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition"
                            title="Delete message"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Message Details Modal */}
        {selectedMessage && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedMessage(null)}
          >
            <div
              className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white rounded-t-2xl">
                <h3 className="text-2xl font-bold">Message Details</h3>
              </div>

              {/* Body */}
              <div className="p-6 space-y-4">
                <div>
                  <label className="text-sm font-semibold text-gray-500 dark:text-gray-400">From</label>
                  <p className="text-lg font-medium dark:text-white mt-1">{selectedMessage.name}</p>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-500 dark:text-gray-400">Email</label>
                  <p className="text-lg text-blue-600 dark:text-blue-400 mt-1">{selectedMessage.email}</p>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-500 dark:text-gray-400">Date & Time</label>
                  <p className="text-lg dark:text-white mt-1">
                    {new Date(selectedMessage.createdAt).toLocaleString()}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2 block">Message</label>
                  <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                    <p className="dark:text-white whitespace-pre-wrap leading-relaxed">{selectedMessage.message}</p>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="bg-gray-50 dark:bg-gray-900 p-6 flex gap-3 justify-end rounded-b-2xl border-t dark:border-gray-700">
                <button
                  onClick={() => replyToMessage(selectedMessage.email)}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
                >
                  Reply via Email
                </button>
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

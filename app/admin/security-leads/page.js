'use client';
import { useState, useEffect } from 'react';
import { Download, Eye, X, Phone, MessageCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function SecurityLeadsAdmin() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('All');
  
  const [selectedLead, setSelectedLead] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    fetchLeads();
  }, [filterStatus]);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/admin/security-leads?status=${filterStatus}`);
      const data = await res.json();
      if (data.success) {
        setLeads(data.data);
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      toast.error('Failed to load leads');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await fetch(`/api/admin/security-leads/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        toast.success(`Status updated to ${newStatus}`);
        setLeads(leads.map(l => l._id === id ? { ...l, status: newStatus } : l));
        if (selectedLead && selectedLead._id === id) {
          setSelectedLead({ ...selectedLead, status: newStatus });
        }
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  const exportCSV = () => {
    if (leads.length === 0) {
      toast.error("No leads to export");
      return;
    }

    const headers = ['Society Name', 'Secretary Name', 'Contact Number', 'Status', 'Date Submitted'];
    const csvContent = [
      headers.join(','),
      ...leads.map(lead => [
        `"${lead.societyName.replace(/"/g, '""')}"`,
        `"${lead.secretaryName.replace(/"/g, '""')}"`,
        `"${lead.contactNumber}"`,
        `"${lead.status}"`,
        `"${new Date(lead.createdAt).toLocaleDateString('en-GB')}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    const dateStr = new Date().toISOString().split('T')[0];
    link.setAttribute('download', `security-leads-${dateStr}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'New': return 'bg-blue-100 text-blue-700';
      case 'Contacted': return 'bg-yellow-100 text-yellow-700';
      case 'Converted': return 'bg-green-100 text-green-700';
      case 'Not Interested': return 'bg-red-100 text-red-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  // Stats calculation
  const totalLeads = leads.length;
  const newLeads = leads.filter(l => l.status === 'New').length;
  const contactedLeads = leads.filter(l => l.status === 'Contacted').length;
  const convertedLeads = leads.filter(l => l.status === 'Converted').length;

  return (
    <div className="max-w-6xl mx-auto pb-10">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-bold text-xl" style={{ color: '#0F172A' }}>
          Society Security Leads
        </h2>
        <button
          onClick={exportCSV}
          className="flex items-center gap-2 px-4 py-2 bg-navy text-white rounded-md text-sm font-medium hover:bg-navy/90 transition-colors"
        >
          <Download className="w-4 h-4" /> Export CSV
        </button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Leads', value: totalLeads },
          { label: 'New', value: newLeads },
          { label: 'Contacted', value: contactedLeads },
          { label: 'Converted', value: convertedLeads }
        ].map((stat, i) => (
          <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
            <p className="text-sm text-slate-500 mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-navy">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm">
                <th className="py-3 px-4 font-medium">Society Name</th>
                <th className="py-3 px-4 font-medium">Secretary Name</th>
                <th className="py-3 px-4 font-medium">Contact Number</th>
                <th className="py-3 px-4 font-medium">Date</th>
                <th className="py-3 px-4 font-medium">Status</th>
                <th className="py-3 px-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-slate-500">Loading leads...</td>
                </tr>
              ) : leads.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-slate-500">No security leads found.</td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr key={lead._id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 font-medium text-navy">{lead.societyName}</td>
                    <td className="py-3 px-4 text-slate-600">{lead.secretaryName}</td>
                    <td className="py-3 px-4 text-slate-600">{lead.contactNumber}</td>
                    <td className="py-3 px-4 text-slate-500 text-sm">
                      {new Date(lead.createdAt).toLocaleDateString('en-GB')}
                    </td>
                    <td className="py-3 px-4">
                      <select
                        value={lead.status}
                        onChange={(e) => handleStatusChange(lead._id, e.target.value)}
                        className={`text-xs font-semibold px-2 py-1 rounded-full outline-none cursor-pointer appearance-none ${getStatusColor(lead.status)}`}
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Converted">Converted</option>
                        <option value="Not Interested">Not Interested</option>
                      </select>
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => { setSelectedLead(lead); setIsDrawerOpen(true); }}
                        className="p-1.5 text-slate-400 hover:text-navy hover:bg-slate-200 rounded transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Side Drawer */}
      {isDrawerOpen && selectedLead && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-navy/20 backdrop-blur-sm z-40 transition-opacity"
            onClick={() => setIsDrawerOpen(false)}
          />
          
          {/* Drawer */}
          <div className="fixed top-0 right-0 h-screen w-full sm:w-[400px] bg-white shadow-2xl z-50 flex flex-col transform transition-transform">
            <div className="flex justify-between items-center p-6 border-b border-slate-100">
              <h3 className="font-bold text-lg text-navy">Lead Details</h3>
              <button onClick={() => setIsDrawerOpen(false)} className="p-2 text-slate-400 hover:bg-slate-100 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Society Name</p>
                <p className="text-navy font-medium text-lg">{selectedLead.societyName}</p>
              </div>
              
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Secretary Name</p>
                <p className="text-slate-700">{selectedLead.secretaryName}</p>
              </div>

              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Contact Actions</p>
                <div className="flex flex-col gap-3">
                  <a 
                    href={`tel:${selectedLead.contactNumber}`}
                    className="flex items-center gap-3 bg-slate-50 hover:bg-slate-100 p-3 rounded-lg text-navy font-medium transition-colors border border-slate-200"
                  >
                    <div className="bg-navy text-white p-2 rounded-md"><Phone className="w-4 h-4" /></div>
                    {selectedLead.contactNumber}
                  </a>
                  <a 
                    href={`https://wa.me/91${selectedLead.contactNumber.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-[#25D366]/10 hover:bg-[#25D366]/20 p-3 rounded-lg text-[#1EAA52] font-medium transition-colors border border-[#25D366]/20"
                  >
                    <div className="bg-[#25D366] text-white p-2 rounded-md"><MessageCircle className="w-4 h-4" /></div>
                    Message on WhatsApp
                  </a>
                </div>
              </div>

              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Date & Time Submitted</p>
                <p className="text-slate-700">
                  {new Date(selectedLead.createdAt).toLocaleString('en-GB', { 
                    dateStyle: 'medium', 
                    timeStyle: 'short' 
                  })}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Current Status</p>
                <select
                  value={selectedLead.status}
                  onChange={(e) => handleStatusChange(selectedLead._id, e.target.value)}
                  className={`w-full p-3 font-semibold rounded-lg outline-none cursor-pointer border ${getStatusColor(selectedLead.status)}`}
                >
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Converted">Converted</option>
                  <option value="Not Interested">Not Interested</option>
                </select>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

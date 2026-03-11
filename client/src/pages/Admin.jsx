import React, { useEffect, useState } from 'react';
import { serverUrl } from '../App';
import { useSelector, useDispatch } from 'react-redux';
import { setForms } from '../slices/formSlice';

const Admin = () => {
  const forms = useSelector((state) => state.form.forms);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await fetch(`${serverUrl}/api/forms/all`);
        const data = await response.json();
        dispatch(setForms(data));
      } catch (error) {
        console.error("Error fetching forms:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchForms();
  }, [dispatch]);

  return (
    <div className="w-full max-w-6xl mx-auto py-8 px-4 md:px-0">
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 md:gap-0">
        <div>
          <h1 className="text-3xl font-bold heading-gradient">Admin Dashboard</h1>
          <p className="text-[var(--text-secondary)] mt-2">Overview of all submitted registrations.</p>
        </div>
        <div className="text-sm text-[var(--text-secondary)] bg-[var(--panel-bg)] border border-[var(--panel-border)] px-4 py-2 rounded-full backdrop-blur-md">
          Total Submissions: <span className="text-white font-bold ml-1">{forms.length}</span>
        </div>
      </div>

      <div className="glass-panel overflow-hidden border border-[var(--panel-border)] rounded-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[rgba(22,27,34,0.8)] border-b border-[var(--panel-border)]">
                <th className="py-4 px-6 text-[var(--text-secondary)] font-medium text-sm w-[20%]">Name</th>
                <th className="py-4 px-6 text-[var(--text-secondary)] font-medium text-sm w-[20%]">Email</th>
                <th className="py-4 px-6 text-[var(--text-secondary)] font-medium text-sm w-[15%]">Phone</th>
                <th className="py-4 px-6 text-[var(--text-secondary)] font-medium text-sm w-[45%]">Message</th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-[var(--panel-border)]">
              {loading ? (
                <tr>
                  <td colSpan="4" className="py-12 text-center text-[var(--text-secondary)]">
                    <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-solid border-[var(--accent-color)] border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                    <span className="ml-3">Loading records...</span>
                  </td>
                </tr>
              ) : forms.length === 0 ? (
                <tr>
                  <td colSpan="4" className="py-12 text-center text-[var(--text-secondary)]">
                    No submissions found.
                  </td>
                </tr>
              ) : (
                forms.map((form, index) => (
                  <tr key={index} className="hover:bg-[rgba(255,255,255,0.02)] transition-colors group">
                    <td className="py-4 px-6 font-medium text-[var(--text-primary)]">
                      {form.name}
                      <div className="text-xs text-[var(--text-secondary)] mt-1 font-normal opacity-0 group-hover:opacity-100 transition-opacity">
                        {form.address}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-[var(--text-secondary)]">{form.email}</td>
                    <td className="py-4 px-6 text-[var(--text-secondary)]">{form.phone}</td>
                    <td className="py-4 px-6 text-[var(--text-secondary)] text-sm max-w-xs truncate" title={form.message}>
                      {form.message}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Admin;
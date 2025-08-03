// src/components/LogViewer.jsx
import React, { useEffect, useState } from 'react';

const LogViewer = () => {
  const [logs, setLogs] = useState([]);

  const fetchLogs = async () => {
    try {
      const res = await fetch('http://127.0.0.1:5000/monitor/recent?limit=50');
      const data = await res.json();
      setLogs(data.reverse());
    } catch (e) {
      console.warn('Failed to fetch logs', e);
    }
  };

  useEffect(() => {
    fetchLogs();
    const interval = setInterval(fetchLogs, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 bg-white rounded shadow mt-6 max-w-3xl mx-auto">
      <h2 className="text-lg font-bold mb-2">Live SilentWatch Events</h2>
      <div className="overflow-auto max-h-96">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-2 py-1">Time</th>
              <th className="border px-2 py-1">Type</th>
              <th className="border px-2 py-1">Details</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((rec, i) => {
              const ev = rec.event || {};
              return (
                <tr
                  key={i}
                  className={`${
                    ['button_click_no_followup', 'missing_dom_element', 'console_error', 'unhandled_promise_rejection'].includes(
                      ev.type
                    )
                      ? 'bg-red-50'
                      : ''
                  }`}
                >
                  <td className="border px-2 py-1">{new Date(rec.received_at).toLocaleTimeString()}</td>
                  <td className="border px-2 py-1 font-mono">{ev.type}</td>
                  <td className="border px-2 py-1">
                    <pre className="whitespace-pre-wrap break-words">{JSON.stringify(ev, null, 1)}</pre>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LogViewer;

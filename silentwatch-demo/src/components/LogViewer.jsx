import React, { useEffect, useState } from 'react';

const LogViewer = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const fetchLogs = async () => {
      try {
        const res = await fetch('/monitor/recent?limit=50'); // Use relative URL
        const data = await res.json();
        if (isMounted) {
          setLogs(data.reverse());
        }
      } catch (e) {
        console.warn('Failed to fetch logs', e);
      }
    };

    fetchLogs(); // Initial fetch
    const interval = setInterval(fetchLogs, 5000); // Fetch every 5 seconds

    return () => {
      clearInterval(interval);  // Prevent memory leaks or duplicate fetches
      isMounted = false;        // Block state updates after unmount
    };
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

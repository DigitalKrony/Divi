import React, { useEffect, useState } from 'react';

export const LiveDashboard: React.FC = () => {
  const [entries, setEntries] = useState<string[]>([]);

  useEffect(() => {
    const eventSource = new EventSource('/api/stream');

    eventSource.onmessage = (event) => {
      const newData = JSON.parse(event.data);
      setEntries((prev) => [...prev, newData.message]);
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Live Entries</h2>
      <ul className="mt-4 space-y-2">
        {entries.map((entry, index) => (
          <li key={index} className="bg-gray-100 p-2 rounded shadow">
            {entry}
          </li>
        ))}
      </ul>
    </div>
  );
};
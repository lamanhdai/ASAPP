import React from 'react';

interface TableProps<T> {
  rows: T[];
  selected: Set<number>;
  onRowSelect: (index: number) => void;
}

export function Table<T extends Record<string, any>>({
  rows,
  selected,
  onRowSelect,
}: TableProps<T>) {
  if (rows.length === 0) return <p className="p-4 text-center text-gray-500">No data.</p>;

  const headers = Object.keys(rows[0]);

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th className="p-3 border-b text-center">
              {/* Optional: Add select all checkbox here */}
            </th>
            {headers.map((h) => (
              <th
                key={h}
                className="p-3 border-b text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200">
          {rows.map((row, idx) => (
            <tr
              key={idx}
              className={`hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors ${selected.has(idx) ? 'bg-primary-50 dark:bg-primary-900/20' : ''
                }`}
              onClick={() => onRowSelect(idx)}
            >
              <td className="p-3 text-center">
                <input
                  type="checkbox"
                  checked={selected.has(idx)}
                  readOnly
                  className="rounded text-primary-600 focus:ring-primary-500"
                />
              </td>
              {headers.map((h) => {
                const value = row[h];
                const isLink = h === 'affiliateLink' || h === 'imageUrl';

                return (
                  <td
                    key={h}
                    className="p-3 text-sm text-gray-800 dark:text-gray-200 whitespace-nowrap overflow-hidden text-ellipsis max-w-xs"
                  >
                    {isLink && typeof value === 'string' ? (
                      <a
                        href={value}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:text-primary-700 hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {value}
                      </a>
                    ) : (
                      value
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

import React from 'react';

interface SkeletonMessagesTableProps {
  rowCount?: number;
}

const SkeletonMessagesTable: React.FC<SkeletonMessagesTableProps> = ({ rowCount = 8 }) => {
  return (
    <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
      <table className="min-w-full leading-normal">
        <thead>
          <tr>
            <th className="px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider">
              Source
            </th>
            <th className="px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider">
              Sender
            </th>
            <th className="px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider">
              Receiver
            </th>
            <th className="px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider">
              Message
            </th>
            <th className="px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider">
              Created At
            </th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rowCount }).map((_, index) => (
            <tr key={index} className="odd:bg-white even:bg-gray-50">
              <td className="px-5 py-5 border-b border-gray-200 text-sm">
                <div className="skeleton-row w-24 h-5 bg-gray-300 rounded-md"></div>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 text-sm">
                <div className="skeleton-row w-24 h-5 bg-gray-300 rounded-md"></div>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 text-sm">
                <div className="skeleton-row w-24 h-5 bg-gray-300 rounded-md"></div>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 text-sm">
                <div className="skeleton-row w-full h-5 bg-gray-300 rounded-md"></div>
                <div className="skeleton-row w-16 h-4 mt-2 bg-gray-300 rounded-md"></div>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 text-sm">
                <div className="skeleton-row w-24 h-5 bg-gray-300 rounded-md"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SkeletonMessagesTable;

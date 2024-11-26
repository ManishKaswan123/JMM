import React from 'react';

const SkeletonContractorTable: React.FC = () => {
  return (
    <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
      <table className="min-w-full leading-normal">
        <thead>
          <tr>
            <th className="px-5 py-3 bg-gray-200"></th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 8 }).map((_, index) => (
            <tr key={index} className="bg-white">
              <td className="px-5 py-5 border-b border-gray-200 animate-pulse">
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SkeletonContractorTable;

import React, { useState } from 'react';
import { FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface Checklist {
    _id: string;
    name: string;
    type: string;
    subtype: string;
    company_id: string;
    customer_id: string;
    task_ids: string[];
    createdAt: string;
    updatedAt: string;
    __v: number;
  }
  
  interface Company {
    _id: string;
    username: string;
    email: string;
    mobile_number: string;
    company_name: string;
    business_type: string[];
    intent: string[];
    candidate_msg: boolean;
    user_id: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }
  
  interface Customer {
    _id: string;
    company_id: string;
    email: string;
    mobile_number: string;
    name: string;
    type: string;
    location_ids: string[];
    checklist_ids: string[];
    status: string;
    contacts: any[];  // Adjust type as needed for contacts if it has a specific structure
    createdAt: string;
    updatedAt: string;
    __v: number;
  }
  

interface TaskResponse {
  name: string
  description: string
  type: string
  checklist_id: Checklist
  company_id: Company
  customer_id: Customer
  images: string[]
  videos: string[]
  createdAt: string
  updatedAt: string
  id: string  
}

interface Props {
  data?: TaskResponse[];
}

const TaskTable: React.FC<Props> = ({ data }) => {
    const [showMore, setShowMore] = useState(false);

    const toggleShowMore = () => setShowMore((prev) => !prev);
  
    return (
      <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider">
                Name
              </th>
              <th className="px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider">
                Description
              </th>
              <th className="px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider">
                Type
              </th>
              <th className="px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider">
                Checklist
              </th>
              <th className="px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider">
                Company
              </th>
              <th className="px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item) => {
              return (
                <tr key={item?.id} className="odd:bg-white even:bg-gray-50">
                  <td className="px-5 py-5 border-b border-gray-200 text-sm">
                    <p className="text-gray-900 text-ellipsis">{item?.name}</p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm">
                    <div className="flex items-center">
                        <p
                        className={`text-gray-900 ${
                            showMore
                            ? "whitespace-normal"
                            : "whitespace-nowrap overflow-hidden text-ellipsis"
                        }`}
                        style={{ maxWidth: showMore ? "none" : "200px" }}
                        >
                        {item?.description}
                        </p>
                        {item?.description?.length > 50 && (
                        <button
                            onClick={toggleShowMore}
                            className="ml-2 text-blue-500 hover:underline focus:outline-none"
                        >
                            {showMore ? "less" : "more"}
                        </button>
                        )}
                    </div>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{item?.type}</p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm">
                    <Link
                      to={`/checklist/${item?.checklist_id?._id}`}
                      className="text-blue-500 hover:underline"
                    >
                      {item?.checklist_id?.name}
                    </Link>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm">
                    <Link
                      to={`/company/${item?.company_id?._id}`}
                      className="text-blue-500 hover:underline"
                    >
                      {item?.company_id?.company_name}
                    </Link>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm">
                    <Link
                      to={`/customer/${item?.customer_id?._id}`}
                      className="text-blue-500 hover:underline"
                    >
                      {item?.customer_id?.name}
                    </Link>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm">
                    <Link
                      to={`/task/${item?.id}`}
                      className="text-blue-500 hover:font-medium"
                    >
                      <FaEye
                        className="cursor-pointer text-blue-500 hover:text-gray-700"
                        style={{ fontSize: '1.1rem' }}
                      />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
};

export default TaskTable;

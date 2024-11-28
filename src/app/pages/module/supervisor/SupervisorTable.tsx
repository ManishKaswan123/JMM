import React from 'react';
import { FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface SupervisorAccess {
  job_management: {
    view_job: boolean;
    add_job: boolean;
    update_job: boolean;
    delete_job: boolean;
  };
  work_order_management: {
    view_work_order: boolean;
    add_work_order: boolean;
    update_work_order: boolean;
    delete_work_order: boolean;
  };
  customer_management: {
    view_customer: boolean;
    add_customer: boolean;
    update_customer: boolean;
    delete_customer: boolean;
  };
  contractor_management: {
    view_contractor: boolean;
    add_contractor: boolean;
    update_contractor: boolean;
    delete_contractor: boolean;
  };
}

interface SupervisorCompanyDetails {
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
}

interface SupervisorResponse {
  access: SupervisorAccess;
  company_id: SupervisorCompanyDetails;
  username: string;
  mobile_number: string;
  email: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  user_id: string;
  id: string;
}

interface Props {
  data?: SupervisorResponse[];
}

const SupervisorTable: React.FC<Props> = ({ data }) => {
  return (
    <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
      <table className="min-w-full leading-normal">
        <thead>
          <tr>
            <th className="px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider">
              Company Name
            </th>
            <th className="px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider">
              Username
            </th>
            <th className="px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider">
              Mobile Number
            </th>
            <th className="px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider">
              Email
            </th>
            <th className="px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider">
              Status
            </th>
            <th className="px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map((supervisor) => (
            <tr key={supervisor?.id} className="odd:bg-white even:bg-gray-50">
              <td className="px-5 py-5 border-b border-gray-200 text-sm">
                <Link
                  to={`/company/${supervisor?.company_id?._id}`}
                  className="text-blue-500 hover:font-medium"
                >
                  {supervisor?.company_id?.company_name}
                </Link>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 text-sm">
                <Link
                  to={`/user/${supervisor?.user_id}`}
                  className="text-blue-500 hover:font-medium"
                >
                  {supervisor?.username}
                </Link>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 text-sm">
                {supervisor?.mobile_number}
              </td>
              <td className="px-5 py-5 border-b border-gray-200 text-sm">
                {supervisor?.email}
              </td>
              <td className="px-5 py-5 border-b border-gray-200 text-sm">
                <p
                    className={`whitespace-no-wrap ${
                    supervisor?.status === 'active'
                        ? 'text-green-500'
                        : supervisor?.status === 'deleted'
                        ? 'text-red-600'
                        : supervisor?.status === 'pending'
                        ? 'text-yellow-500'
                        : 'text-gray-500' // Default for unknown or undefined statuses
                    }`}
                >
                    {supervisor?.status || 'Unknown'} {/* Fallback text for undefined statuses */}
                </p>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 text-sm">
                <Link
                  to={`/supervisor/${supervisor?.id}`}
                  className="text-blue-500 hover:font-medium"
                >
                  <FaEye
                    className="cursor-pointer text-blue-500 hover:text-gray-700"
                    style={{ fontSize: '1.1rem' }}
                  />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SupervisorTable;

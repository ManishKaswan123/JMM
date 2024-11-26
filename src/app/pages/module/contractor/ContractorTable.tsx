import React from 'react';


interface Address {
    address_line_1: string
    address_line_2?: string
    country: string
    city: string
    state: string
    postal: string
    lat: number
    lng: number
    _id: string
  }
  
  interface Cleaner {
    _id: string
    username: string
    first_name: string
    last_name: string
    mobile_number: string
    email: string
    date_of_birth: string
    user_id: string
    status: string
    createdAt: string
    updatedAt: string
    __v: number
    address: Address
  }
  
  interface Company {
    _id: string
    username: string
    email: string
    mobile_number: string
    company_name: string
    business_type: string[]
    intent: string[]
    candidate_msg: boolean
    user_id: string
    status: string
    createdAt: string
    updatedAt: string
    __v: number
  }
  
  interface Contractor {
    cleaner_id: Cleaner
    first_name: string
    last_name: string
    mobile_number: string
    email?: string
    date_of_birth: string
    address: Address
    customer_location_ids: string[]
    company_id: Company
    status: string
    createdAt: string
    updatedAt: string
    id: string
  }
interface Props {
  data?: Contractor[];
}

const ContractorTable: React.FC<Props> = ({ data }) => {
  return (
    <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
      <table className="min-w-full leading-normal">
        <thead>
          <tr>
            <th className="px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider">
              Name
            </th>
            <th className="px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider">
              Email
            </th>
            <th className="px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider">
              Company
            </th>
            <th className="px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider">
              Created At
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map((contractor) => (
            <tr key={contractor.id} className="bg-white">
              <td className="px-5 py-5 border-b border-gray-200 text-sm">{contractor.first_name}</td> 
              <td className="px-5 py-5 border-b border-gray-200 text-sm">{contractor.email}</td>
              <td className="px-5 py-5 border-b border-gray-200 text-sm">{contractor.last_name}</td>
              <td className="px-5 py-5 border-b border-gray-200 text-sm">{contractor.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContractorTable;

import React, { useState } from 'react';
import { FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface MessageResponse {
  message: string;
  source_id: string;
  sender_id: string;
  recipient_id: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

interface Props {
  data?: MessageResponse[];
}

const MessagesTable: React.FC<Props> = ({ data }) => {
  const [expandedRows, setExpandedRows] = useState<{ [key: string]: boolean }>({});

  const toggleExpand = (id: string) => {
    setExpandedRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
      <table className="min-w-full leading-normal">
        <thead>
          <tr>
            <th className="px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider">
              Source ID
            </th>
            <th className="px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider">
              Sender ID
            </th>
            <th className="px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider">
              Recipient ID
            </th>
            <th className="px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider">
              Message
            </th>
            <th className="px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider">
              Type
            </th>
            <th className="px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map((message) => (
            <tr key={message.id} className="odd:bg-white even:bg-gray-50">
              <td className="px-5 py-5 border-b border-gray-200 text-sm">
                <Link to={`/source/${message.source_id}`} className="text-blue-500 hover:underline">
                  {message.source_id}
                </Link>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 text-sm">
                <Link to={`/user/${message.sender_id}`} className="text-blue-500 hover:underline">
                  {message.sender_id}
                </Link>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 text-sm">
                <Link to={`/user/${message.recipient_id}`} className="text-blue-500 hover:underline">
                  {message.recipient_id}
                </Link>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 text-sm">
                <div>
                    <p 
                    className={`text-gray-900 ${
                        expandedRows[message.id] ? '' : 'whitespace-nowrap overflow-hidden text-ellipsis'
                    }`}
                        style={!expandedRows[message.id] ? { maxWidth: '300px', display: 'inline-block' } : {}}
                    >
                        {expandedRows[message.id]
                            ? message.message
                            : `${message?.message?.slice(0, 20)}...`
                        }
                    </p>
                    <button
                        onClick={() => toggleExpand(message.id)}
                        className="text-blue-500 hover:underline ml-2"
                    >
                        {expandedRows[message.id] ? 'Less' : 'More'}
                    </button>
                </div>
              </td>

              <td className="px-5 py-5 border-b border-gray-200 text-sm">
                <p className="text-gray-900 whitespace-nowrap">{message.type}</p>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 text-sm">
                <Link to={`/message/${message.id}`} className="text-blue-500 hover:underline">
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

export default MessagesTable;

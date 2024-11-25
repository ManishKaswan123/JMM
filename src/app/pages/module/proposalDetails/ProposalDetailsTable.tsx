import React, { useState } from 'react';
import { FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface ProposalDetailsResponse {
    cleaner_id: string
    descrption: string
    expected_rate: string
    createdAt: string
    updatedAt: string
    id: string
}

interface Props {
  data?: ProposalDetailsResponse[];
}

const ProposalDetailsTable: React.FC<Props> = ({ data }) => {
    const [showMore, setShowMore] = useState<string | null>(null);

    const toggleShowMore = (id: string) => {
        setShowMore((prev) => (prev === id ? null : id));
    };

    return (
        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
                <thead>
                    <tr>
                        <th className="px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider">
                            Cleaner ID
                        </th>
                        <th className="px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider">
                            Description
                        </th>
                        <th className="px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider">
                            Expected Rate
                        </th>
                        <th className="px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider">
                            Created At
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
                                    <p className="text-gray-900">{item?.cleaner_id}</p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 text-sm">
                                    <div className="flex items-center">
                                        <p
                                            className={`text-gray-900 ${
                                                showMore === item.id
                                                    ? "whitespace-normal"
                                                    : "whitespace-nowrap overflow-hidden text-ellipsis"
                                            }`}
                                            style={{ maxWidth: showMore === item.id ? "none" : "200px" }}
                                        >
                                            {item?.descrption}
                                        </p>
                                        {item?.descrption?.length > 50 && (
                                            <button
                                                onClick={() => toggleShowMore(item.id)}
                                                className="ml-2 text-blue-500 hover:underline focus:outline-none"
                                            >
                                                {showMore === item.id ? "less" : "more"}
                                            </button>
                                        )}
                                    </div>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 text-sm">
                                    <p className="text-gray-900 whitespace-no-wrap">{item?.expected_rate}</p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 text-sm">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                        {new Date(item?.createdAt).toLocaleDateString()}
                                    </p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 text-sm">
                                    <Link
                                        to={`/task/${item?.id}`}
                                        className="text-blue-500 hover:font-medium"
                                    >
                                        <FaEye
                                            className="cursor-pointer text-blue-500 hover:text-gray-700"
                                            style={{ fontSize: "1.1rem" }}
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

export default ProposalDetailsTable;

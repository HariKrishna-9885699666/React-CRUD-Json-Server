import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loadUsers, updateUser } from "../api";
import Pagination from './user/Pagination';
const toastParams = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
}

function Home() {
  const [users, setUsers] = useState([]);
  const [currentUsers, setCurrentUsers] = useState([]);
  const [filterKey, setFilterKey] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filterResults, setFilterResults] = useState(0);
  const [usersPerPage] = useState(10);
  const [loading, setLoading] = useState(false);

  const userData = async () => {
    const allUsers = await loadUsers(null, setLoading);
    setUsers(allUsers);
  };

  useEffect(() => {
    userData();
  }, []);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  useEffect(() => {
    setCurrentUsers(users.filter(item => item.name.includes(filterKey) || item.phoneNumber.toString().includes(filterKey) || item.uid.includes(filterKey)).slice(indexOfFirstUser, indexOfLastUser));
  }, [indexOfFirstUser, indexOfLastUser, users]);

  const paginateFront = () => setCurrentPage(currentPage + 1);
  const paginateBack = () => setCurrentPage(currentPage - 1);
  return (
    <>

      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div>
            <h2 className="text-2xl font-semibold leading-tight">All Users</h2>
          </div>
          <div className="my-2 flex sm:flex-row flex-col">
            <div className="block relative">
              <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current text-gray-500">
                  <path
                    d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z">
                  </path>
                </svg>
              </span>
              <input
                className="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none w-2/5" placeholder="Filter with name, phone number and reference number"
                onChange={(e) => {
                  const searchValue = e.target.value;
                  setFilterKey(searchValue);
                  setCurrentPage(1);
                  const filterData = users.filter(item => item.name.includes(searchValue) || item.phoneNumber.toString().includes(searchValue) || item.uid.includes(searchValue));
                  setFilterResults(filterData.length);
                  setCurrentUsers(filterData);
                }} />
            </div>
          </div>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th
                      className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider font-extrabold">
                      Reference number
                    </th>
                    <th
                      className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider font-extrabold">
                      Name
                    </th>
                    <th
                      className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider font-extrabold">
                      Date of birth
                    </th>
                    <th
                      className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider font-extrabold">
                      Phone Number
                    </th>
                    <th
                      className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider font-extrabold">
                      Address
                    </th>
                    <th
                      className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider font-extrabold">
                      Activation status
                    </th>
                    <th
                      className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider font-extrabold">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                {!currentUsers.length && (<tr><td className="px-5 py-5 border-b border-gray-200 bg-white text-sm" colSpan={7}>No users found</td></tr>)}
                  {currentUsers.map((data, index) => (
                    <tr key={index}>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <div className="flex items-center">
                          <div className="ml-3">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {data.uid}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="flex items-center text-gray-900 whitespace-no-wrap">{data.name}</p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="flex items-center text-gray-900 whitespace-no-wrap">
                          {data.dob}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="flex items-center text-gray-900 whitespace-no-wrap">
                          {data.phoneNumber}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="flex items-center text-gray-900 whitespace-no-wrap">
                          {data.address}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="flex items-center text-gray-900 whitespace-no-wrap">
                          {data.activationStatus}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <div className="flex flex-row items-center">
                          <div><Link
                            to={`/edit-user/${data.id}`}
                            className="text-white rounded-lg"
                          >
                            <img src="images/pencil.gif" alt="edit" width={50} height={50} />
                          </Link></div>
                          <div><Link
                            onClick={() => {
                              Swal.fire({
                                title: 'Do you want to delete this user?',
                                showCancelButton: true,
                                confirmButtonText: 'Delete',
                              }).then(async (result) => {
                                if (result.isConfirmed) {
                                  setLoading(true);
                                  await updateUser(data.id, { ...data, isDeleted: true });
                                  const filterData = users.filter(item => item.id !== data.id)
                                  setUsers(filterData);
                                  setCurrentUsers(filterData);
                                  setFilterResults(filterData.length);
                                  toast.success('User deleted successfully', toastParams);
                                  setLoading(false);
                                }
                              })
                            }}
                            to={"#"}
                            className="text-white rounded-lg"
                          >
                            <img src="images/delete.gif" alt="delete" width={50} height={50} />
                          </Link></div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div
                className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
                <Pagination
                  usersPerPage={usersPerPage}
                  totalUsers={!filterKey ? users.length : filterResults}
                  paginateBack={paginateBack}
                  paginateFront={paginateFront}
                  currentPage={currentPage}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {loading && (<div className="loader"></div>)}
      <ToastContainer />
    </>
  );
}

export default Home;

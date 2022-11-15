import React from "react";

export default function Pagination({
  usersPerPage,
  totalUsers,
  paginateFront,
  paginateBack,
  currentPage,
  currentUsers
}) {
  return (
    <div className='py-2'>
      <div>
        <p className="text-xs xs:text-sm text-gray-900">
          Showing&nbsp;
          <span className='font-medium'>{currentPage * usersPerPage - 10}</span>
          &nbsp;to
          <span className='font-medium'> {currentPage * usersPerPage} </span>
          of
          <span className='font-medium'> {totalUsers} </span>
          results
        </p>
        <p>&nbsp;</p>
      </div>
      <nav className='block'></nav>
      <div>
        <nav
          className='relative z-0 inline-flex rounded-md shadow-sm -space-x-px'
          aria-label='Pagination'
        >
          <a
            onClick={() => {
              paginateBack();
            }}
            href='#'
            className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 text-sm font-medium text-gray-500 hover:bg-gray-50 ${currentPage === 1 ? 'disable-link bg-grey' : 'bg-white'}`}
          >
            <span>Previous</span>
          </a>
          &nbsp;
          <a
            onClick={() => {
              paginateFront();
            }}
            href='#'
            className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 text-sm font-medium text-gray-500 hover:bg-gray-50 ${currentPage === Math.ceil(totalUsers / usersPerPage) ? 'disable-link bg-grey' : 'bg-white'}`}
          >
            <span>Next</span>
          </a>
        </nav>
      </div>
    </div>
  );
}
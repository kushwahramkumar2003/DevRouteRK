import React from "react";
import Pagination from "../../../components/Pagination.tsx";

const DataTable = ({
  pageTitle,
  DataListName,
  searchKeywordOnSubmitHandler,
  searchInputPlaceHolder,
  searchKeywordOnChangeHandler,
  searchKeyword,
  tableHeaderTitleList,
  isLoading,
  isFetching,
  data,
  children,
  setCurrentPage,
  currentPage,
  headers,
  userState,
}) => {
  return (
    <div>
      <h1 className="text-2xl font-semibold">{pageTitle}</h1>

      <div className="w-full px-4 mx-auto">
        <div className="py-8">
          <div className="flex flex-row justify-between w-full mb-1 sm:mb-0">
            <h2 className="text-2xl leading-tight">{DataListName}</h2>
            <div className="text-end">
              <form
                onSubmit={searchKeywordOnSubmitHandler}
                className="flex flex-col justify-center w-3/4 max-w-sm space-y-3 md:flex-row md:w-full md:space-x-3 md:space-y-0"
              >
                <div className="relative ">
                  <input
                    type="text"
                    id='"form-subscribe-Filter'
                    className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder={searchInputPlaceHolder}
                    onChange={searchKeywordOnChangeHandler}
                    value={searchKeyword}
                  />
                </div>
                <button
                  className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
                  type="submit"
                >
                  Filter
                </button>
              </form>
            </div>
          </div>
          <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
            <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    {tableHeaderTitleList.map((title) => (
                      <th
                        scope="col"
                        className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                      >
                        {title}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {isLoading || isFetching ? (
                    <tr>
                      <td colSpan={5} className="w-full py-10 text-center">
                        Loading...
                      </td>
                    </tr>
                  ) : data?.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="w-full py-10 text-center">
                        No records found
                      </td>
                    </tr>
                  ) : (
                    children
                  )}
                </tbody>
              </table>
              {!isLoading && (
                <Pagination
                  onPageChange={(page) => setCurrentPage(page)}
                  currentPage={currentPage}
                  totalPageCount={JSON.parse(headers?.["x-totalpagescount"])}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTable;

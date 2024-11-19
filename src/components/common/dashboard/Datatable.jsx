import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";

const Datatable = ({ datas, headers, actions }) => {
  const [searchValue, setSearchValue] = useState();
  const [dataList, setDataList] = useState([...datas]);
  const [itemsPerPage] = useState(5);
  const [rowsToShow, setRowsToShow] = useState(
    dataList?.slice(0, itemsPerPage)
  );
  const [customPagination, setCustomPagination] = useState([]);
  const [activeColumn, setActiveColumn] = useState(["Price"]);
  const [sortingColumn, setSortingColumn] = useState(["Price"]);
  const [totalPage, setTotalPage] = useState(
    Math.ceil(dataList?.length / itemsPerPage)
  );
  const [currentPage, setCurrentPage] = useState(1);
  function searchProducts(keyword) {
    keyword = keyword.toLowerCase();
    setSearchValue(keyword);
    if (!keyword == "") {
      const results = dataList.filter((product) => {
        return (
          product.Category.toLowerCase().includes(keyword) ||
          product.Company.toLowerCase().includes(keyword) ||
          product.Product.toLowerCase().includes(keyword) ||
          product.Description.toLowerCase().includes(keyword) ||
          product.Price?.toString().toLowerCase().includes(keyword)
        );
      });
      setDataList(results);
      setRowsToShow(results?.slice(0, itemsPerPage));
      setCurrentPage(0);
      setTotalPage(Math.ceil(results?.length / itemsPerPage));
      setCustomPagination(
        Array(Math.ceil(results?.length / itemsPerPage)).fill(null)
      );
    } else {
      clearData();
    }
  }
  const clearData = () => {
    setSearchValue("");
    const sortedProducts = datas?.slice().sort((a, b) => a.Price - b.Price);
    setDataList(sortedProducts);
    setRowsToShow(sortedProducts?.slice(0, itemsPerPage));
    setCustomPagination(
      Array(Math.ceil(datas?.length / itemsPerPage)).fill(null)
    );
    setTotalPage(Math.ceil(datas?.length / itemsPerPage));
  };
  const sortByColumn = (column, changeSortingColumn = true) => {
    if (column != "Price") {
      if (sortingColumn?.includes(column) && changeSortingColumn) {
        const sortData = dataList
          ?.slice()
          .sort((a, b) =>
            b[column].toString().localeCompare(a[column].toString())
          );
        setRowsToShow(
          sortData?.slice(
            currentPage * itemsPerPage,
            (currentPage + 1) * itemsPerPage
          )
        );
        if (changeSortingColumn) {
          setSortingColumn([]);
          setDataList(sortData);
        }
      } else {
        const sortData = dataList
          ?.slice()
          .sort((a, b) =>
            a[column].toString().localeCompare(b[column].toString())
          );
        setRowsToShow(
          sortData?.slice(
            currentPage * itemsPerPage,
            (currentPage + 1) * itemsPerPage
          )
        );
        if (changeSortingColumn) {
          setDataList(sortData);
          setSortingColumn([`${column}`]);
        }
      }
    } else {
      if (sortingColumn?.includes(column)) {
        const sortedProducts = dataList
          ?.slice()
          .sort((a, b) => b.Price - a.Price);
        setRowsToShow(
          sortedProducts?.slice(
            currentPage * itemsPerPage,
            (currentPage + 1) * itemsPerPage
          )
        );
        if (changeSortingColumn) {
          setSortingColumn([]);
          setDataList(sortedProducts);
        }
      } else {
        const sortedProducts = dataList
          ?.slice()
          .sort((a, b) => a.Price - b.Price);
        setRowsToShow(
          sortedProducts?.slice(
            currentPage * itemsPerPage,
            (currentPage + 1) * itemsPerPage
          )
        );
        if (changeSortingColumn) {
          setSortingColumn([`${column}`]);
          setDataList(sortedProducts);
        }
      }
    }
    setActiveColumn([`${column}`]);
    // setCurrentPage(0);
  };
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    const startIndex = pageNumber * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setRowsToShow(dataList.slice(startIndex, endIndex));
  };
  useMemo(() => {
    setCustomPagination(
      Array(Math.ceil(dataList?.length / itemsPerPage)).fill(null)
    );
  }, []);
  useEffect(() => {
    const sortedProducts = datas?.slice().sort((a, b) => a.Price - b.Price);
    setDataList(sortedProducts);
    setRowsToShow(sortedProducts?.slice(0, itemsPerPage));
  }, [datas, itemsPerPage]);
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10">
      <div className="w-full max-w-7xl px-4">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="bg-gray-200 flex justify-between  items-center p-4 border-b border-gray-300">
            <div className="flex items-center bg-white border rounded-full shadow-sm">
              <input
                type="text"
                className="py-2 px-4 rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search..."
                onChange={(e) => searchProducts(e.target.value)}
                value={searchValue}
              />
              <button
                className={`p-2 rounded-full ${
                  searchValue
                    ? "text-gray-500 hover:text-gray-700"
                    : "text-transparent"
                }`}
                onClick={clearData}
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 2a8 8 0 110 16A8 8 0 0112 4zm4.7 10.3l-1.4 1.4L12 13.4l-3.3 3.3-1.4-1.4L10.6 12 7.3 8.7l1.4-1.4L12 10.6l3.3-3.3 1.4 1.4L13.4 12l3.3 3.3z" />
                </svg>
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {headers.map((header, index) => (
                    <th
                      key={index}
                      className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => sortByColumn(header)}
                    >
                      <div className="flex items-center gap-2">{header}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {rowsToShow?.map((data, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-3 px-6 text-gray-700">
                      {itemsPerPage * currentPage + index + 1}
                    </td>
                    <td className="py-3 px-6 text-gray-700">{data?.name}</td>
                    <td className="py-3 px-6 text-gray-700">
                      {data?.subjects?.length}
                    </td>
                    <td className="flex">
                      {actions.map((action, index) => (
                        <div key={index} className="py-3 px-6 text-gray-700">
                          <button
                            onClick={(e) => {
                              action.function(data?.grade_id);
                            }}
                          >
                            {action.label}
                          </button>
                        </div>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
            <div className="flex items-center">
              <span className="text-sm text-gray-700">
                Showing{" "}
                <span className="font-medium">
                  {currentPage * itemsPerPage + 1}
                </span>{" "}
                to{" "}
                <span className="font-medium">
                  {Math.min((currentPage + 1) * itemsPerPage, dataList?.length)}
                </span>{" "}
                of <span className="font-medium">{dataList?.length}</span>{" "}
                results
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 0}
                className={`relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md 
                  ${
                    currentPage === 0
                      ? "text-gray-300 cursor-not-allowed"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
              >
                Previous
              </button>

              {Array.from({
                length: Math.min(5, Math.ceil(dataList?.length / itemsPerPage)),
              }).map((_, idx) => {
                const pageNumber = currentPage - 2 + idx;
                if (
                  pageNumber < 0 ||
                  pageNumber >= Math.ceil(dataList?.length / itemsPerPage)
                )
                  return null;

                return (
                  <button
                    key={idx}
                    onClick={() => handlePageChange(pageNumber)}
                    className={`relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md
                      ${
                        currentPage === pageNumber
                          ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                  >
                    {pageNumber + 1}
                  </button>
                );
              })}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={
                  currentPage >= Math.ceil(dataList?.length / itemsPerPage) - 1
                }
                className={`relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md
                  ${
                    currentPage >=
                    Math.ceil(dataList?.length / itemsPerPage) - 1
                      ? "text-gray-300 cursor-not-allowed"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Datatable;

import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";

const NoticeDatatable = ({ datas, headers, actions }) => {
  const [searchValue, setSearchValue] = useState();
  const [dataList, setDataList] = useState([...datas]);
  const [rowsLimit] = useState(5);
  const [rowsToShow, setRowsToShow] = useState(dataList?.slice(0, rowsLimit));
  const [customPagination, setCustomPagination] = useState([]);
  const [activeColumn, setActiveColumn] = useState(["Price"]);
  const [sortingColumn, setSortingColumn] = useState(["Price"]);
  const [totalPage, setTotalPage] = useState(
    Math.ceil(dataList?.length / rowsLimit)
  );
  const [currentPage, setCurrentPage] = useState(0);
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
      setRowsToShow(results?.slice(0, rowsLimit));
      setCurrentPage(0);
      setTotalPage(Math.ceil(results?.length / rowsLimit));
      setCustomPagination(
        Array(Math.ceil(results?.length / rowsLimit)).fill(null)
      );
    } else {
      clearData();
    }
  }
  const clearData = () => {
    setSearchValue("");
    const sortedProducts = datas?.slice().sort((a, b) => a.Price - b.Price);
    setDataList(sortedProducts);
    setRowsToShow(sortedProducts?.slice(0, rowsLimit));
    setCustomPagination(Array(Math.ceil(datas?.length / rowsLimit)).fill(null));
    setTotalPage(Math.ceil(datas?.length / rowsLimit));
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
            currentPage * rowsLimit,
            (currentPage + 1) * rowsLimit
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
            currentPage * rowsLimit,
            (currentPage + 1) * rowsLimit
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
            currentPage * rowsLimit,
            (currentPage + 1) * rowsLimit
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
            currentPage * rowsLimit,
            (currentPage + 1) * rowsLimit
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
  const nextPage = () => {
    const startIndex = rowsLimit * (currentPage + 1);
    const endIndex = startIndex + rowsLimit;
    const newArray = datas?.slice(startIndex, endIndex);
    setRowsToShow(newArray);
    setCurrentPage(currentPage + 1);
  };
  const changePage = (value) => {
    const startIndex = value * rowsLimit;
    const endIndex = startIndex + rowsLimit;
    const newArray = datas?.slice(startIndex, endIndex);
    setRowsToShow(newArray);
    setCurrentPage(value);
  };
  const previousPage = () => {
    const startIndex = (currentPage - 1) * rowsLimit;
    const endIndex = startIndex + rowsLimit;
    const newArray = datas?.slice(startIndex, endIndex);
    setRowsToShow(newArray);
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else {
      setCurrentPage(0);
    }
  };
  useMemo(() => {
    setCustomPagination(
      Array(Math.ceil(dataList?.length / rowsLimit)).fill(null)
    );
  }, []);
  useEffect(() => {
    const sortedProducts = datas?.slice().sort((a, b) => a.Price - b.Price);
    setDataList(sortedProducts);
    setRowsToShow(sortedProducts?.slice(0, rowsLimit));
  }, []);
  return (
    <div className="min-h-screen bg-gray-100 flex  justify-center py-10">
      <div className="w-full max-w-7xl px-4">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="bg-gray-200 flex justify-between  items-center p-4 border-b border-gray-300">
            <div>
              <Link
                to={"add"}
                className="bg-[#bc8c4e] text-white p-2 rounded-md"
              >
                Add Grade
              </Link>
            </div>
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
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-6 text-left text-gray-600 font-semibold">
                    ID
                  </th>
                  {headers.map((header) => (
                    <th
                      key={header}
                      className="py-3 px-6 text-left text-gray-600 font-semibold"
                    >
                      <div
                        className="flex items-center cursor-pointer"
                        onClick={() => sortByColumn("Company")}
                      >
                        <svg
                          className={`w-4 h-4 transform ${
                            sortingColumn === "Company"
                              ? "rotate-180"
                              : "rotate-0"
                          } transition-transform duration-200`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M19 14l-7 7-7-7" />
                        </svg>
                        <span className="ml-2">{header}</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-300">
                {rowsToShow?.map((data, index) => (
                  <tr
                    key={index}
                    className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                  >
                    <td className="py-3 px-6 text-gray-700">
                      {rowsLimit * currentPage + index + 1}
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
          <div className="flex justify-between items-center p-4 border-t border-gray-300">
            <div className="text-gray-600">
              Showing {currentPage * rowsLimit + 1} to{" "}
              {Math.min((currentPage + 1) * rowsLimit, dataList?.length)} of{" "}
              {dataList?.length} entries
            </div>
            <div className="flex items-center">
              <button
                className={`p-2 rounded-full border border-gray-300 ${
                  currentPage === 0
                    ? "bg-gray-200 cursor-not-allowed"
                    : "bg-white cursor-pointer"
                }`}
                onClick={previousPage}
                disabled={currentPage === 0}
              >
                <img
                  src="https://www.tailwindtap.com/assets/travelagency-admin/leftarrow.svg"
                  alt="Previous"
                />
              </button>
              <ul className="flex mx-4">
                {customPagination?.map((_, index) => (
                  <li
                    key={index}
                    className={`w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 cursor-pointer ${
                      currentPage === index
                        ? "bg-blue-500 text-white border-blue-500"
                        : "bg-white"
                    }`}
                    onClick={() => changePage(index)}
                  >
                    {index + 1}
                  </li>
                ))}
              </ul>
              <button
                className={`p-2 rounded-full border border-gray-300 ${
                  currentPage === totalPage - 1
                    ? "bg-gray-200 cursor-not-allowed"
                    : "bg-white cursor-pointer"
                }`}
                onClick={nextPage}
                disabled={currentPage === totalPage - 1}
              >
                <img
                  src="https://www.tailwindtap.com/assets/travelagency-admin/rightarrow.svg"
                  alt="Next"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NoticeDatatable;

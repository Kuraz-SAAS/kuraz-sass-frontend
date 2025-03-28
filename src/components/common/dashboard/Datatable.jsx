import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";

const ReactDataTable = ({ datas, headers, actions, used_id }) => {
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState(datas);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    setFilteredData(datas);
  }, [datas]);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchValue(value);
    const filtered = datas.filter((item) =>
      Object.values(item).some((field) =>
        String(field).toLowerCase().includes(value)
      )
    );
    setFilteredData(filtered);
    setCurrentPage(1); // Reset to first page on search
  };

  const columns = headers.map((header) => ({
    name: header.name,
    selector: (row) => row[header.selector],
    sortable: true,
  }));

  if (actions.length > 0){
    columns.push({
      name: "Actions",
      cell: (row) => (
        <div className="flex gap-2">
          {actions.map((action, index) => (
            <button
              key={index}
              onClick={() => action.function(row[used_id])}
              className="text-blue-600 hover:text-blue-800"
            >
              {action.label}
            </button>
          ))}
        </div>
      ),
    });
  }
  

  const paginationOptions = {
    rowsPerPageText: "Rows per page",
    rangeSeparatorText: "of",
    selectAllRowsItem: true,
    selectAllRowsItemText: "All",
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10">
      <div className="w-full max-w-7xl px-4">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-4 border-b border-gray-300">
            <input
              type="text"
              placeholder="Search..."
              className="py-2 px-4 rounded-full text-gray-700 border border-gray-300"
              value={searchValue}
              onChange={handleSearch}
            />
          </div>
          <DataTable
            columns={columns}
            data={filteredData}
            pagination
            paginationComponentOptions={paginationOptions}
            paginationPerPage={itemsPerPage}
            paginationRowsPerPageOptions={[5, 10, 15]}
            onRowClicked={(row) => {
              // Handle row click if necessary
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ReactDataTable;

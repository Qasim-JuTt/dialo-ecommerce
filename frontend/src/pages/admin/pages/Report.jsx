import React, { useState } from "react";
import SideBar from "../../../components/admin/SideBar";
import SearchBar from "../../../components/admin/SearchBar";
import Pagination from "../../../components/admin/Pagination";
import { FileText, Download } from "lucide-react";

const reports = [
  { id: 1, title: "Monthly Sales Report", date: "2025-04-01", type: "PDF" },
  { id: 2, title: "Inventory Summary", date: "2025-03-28", type: "Excel" },
  { id: 3, title: "Revenue Forecast Q2", date: "2025-03-15", type: "PDF" },
  { id: 4, title: "Customer Feedback", date: "2025-03-10", type: "Word" },
  { id: 5, title: "Product Performance", date: "2025-03-01", type: "PDF" },
  { id: 6, title: "Returns and Refunds", date: "2025-02-25", type: "Excel" },
];

const Report = () => {
  const [search, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 4;

  const filtered = reports.filter(
    (r) =>
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.type.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / perPage);
  const visible = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      <SideBar />

      <main className="flex-1 p-6 space-y-6">
        {/* Page Title with SearchBar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <h1 className="text-2xl md:text-3xl font-bold text-indigo-600">
            Report Records
          </h1>
          <div className="max-w-md w-full md:w-auto">
            <SearchBar
              placeholder="Search by product or customer"
              value={search}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset page on search
              }}
            />
          </div>
        </div>

        {/* Reports List */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <ul className="divide-y divide-gray-200 text-sm">
            {visible.map((report) => (
              <li
                key={report.id}
                className="py-4 flex justify-between items-center"
              >
                <div className="flex items-center gap-4">
                  <FileText className="text-indigo-500 w-5 h-5" />
                  <div>
                    <p className="font-semibold text-gray-800">
                      {report.title}
                    </p>
                    <p className="text-xs text-gray-500">
                      {report.date} • {report.type}
                    </p>
                  </div>
                </div>
                <button className="text-indigo-600 hover:text-indigo-800 flex items-center gap-1">
                  <Download className="w-4 h-4" />
                  <span className="text-sm">Download</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-4">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default Report;

import { useEffect, useState } from "react";
import { getHistoryExam } from "../../../services/apiService";
import _ from "lodash";
import moment from "moment";
const HistoryExam = (props) => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const [itemsPerPage] = useState(10); // Số mục trên mỗi trang
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filterData, setFilterData] = useState([]);
  useEffect(() => {
    fetchDataHistoryExam();
  }, []);
  const handleClear = () => {
    setStartDate("");
    setEndDate("");
    fetchDataHistoryExam();
  };
  const handleFilter = () => {
    const start = moment(startDate);
    const end = moment(endDate);
    const dataFilter = _.cloneDeep(filterData);
    const result = dataFilter.filter((item) => {
      const itemTime = moment(item.timeExam, "DD/MM/YYYY HH:mm:ss");
      // So sánh thời gian theo kiểu moment
      const isWithinRange = itemTime.isBetween(start, end, null, "[]"); // '[]' để bao gồm cả start và end
      return isWithinRange;
    });
    console.log(result);

    setData(result);
  };
  const fetchDataHistoryExam = async () => {
    // call api to get history exam
    const res = await getHistoryExam();
    if (res && res.EC === 0) {
      const cloneData = _.cloneDeep(res.DT.data);
      const sortData = _.orderBy(cloneData, ["createdAt"], ["desc"]);
      const tempData = sortData.map((item) => {
        return {
          quizId: item.quiz_id,
          quizName: item.quizHistory.name,
          quizDescription: item.quizHistory.description,
          timeExam: moment(item.createdAt).format("DD/MM/YYYY HH:mm:ss"),
          totalQuestions: item.total_questions,
          totalCorrect: item.total_correct,
        };
      });
      setFilterData(tempData);
      setData(tempData);
    }
  };
  // Xác định dữ liệu cần hiển thị cho trang hiện tại
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = data.slice(indexOfFirstItem, indexOfLastItem);
  // Tổng số trang
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const generatePagination = (totalPages, currentPage) => {
    const pageRange = 2; // Số trang trước và sau trang hiện tại
    const pageNumbers = [];
  
    // Luôn thêm trang đầu tiên
    pageNumbers.push(1);
  
    // Thêm trang trước và sau trang hiện tại
    for (let i = currentPage - pageRange; i <= currentPage + pageRange; i++) {
      if (i > 1 && i < totalPages) {
        pageNumbers.push(i);
      }
    }
  
    // Luôn thêm trang cuối cùng
    pageNumbers.push(totalPages);
  
    // Loại bỏ trùng lặp và thêm dấu "..." khi cần
    const paginationItems = [];
    let previousPage = null;
  
    for (let page of pageNumbers) {
      if (previousPage !== null && page - previousPage > 1) {
        paginationItems.push("..."); // Thêm dấu "..." nếu khoảng cách lớn hơn 1
      }
      paginationItems.push(page);
      previousPage = page;
    }
  
    return paginationItems;
  };
  
  const paginationItems = generatePagination(totalPages, currentPage);
  return (
    <div className="history-exam-container">
      <h3>History Exam</h3>
      {/* Search Section */}
      <div className="filter-container">
        <label>
          Start Date:
          <input
            type="datetime-local"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>
        <label>
          End Date:
          <input
            type="datetime-local"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>
        <div className="d-flex">
          <button onClick={() => handleFilter()} className="me-3">
            Search
          </button>
          <button onClick={() => handleClear()}>Clear</button>
        </div>
      </div>
      <table className="table table-hover table-bordered table-sm history-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Quiz ID</th>
            <th>Quiz Name</th>
            <th>Quiz Description</th>
            <th>Time Exam</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          {currentData.length > 0 ? (
            currentData.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.quizId}</td>
                <td>{item.quizName}</td>
                <td>{item.quizDescription}</td>
                <td>{item.timeExam}</td>
                <td>
                  {item.totalCorrect} / {item.totalQuestions}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {/* Phân trang */}
      {totalPages > 1 && (
        <div className="pagination">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="btn btn-outline-primary"
        >
          Previous
        </button>
      
        {paginationItems.map((item, index) =>
          item === "..." ? (
            <span key={index} className="dots ms-1 me-1">...</span>
          ) : (
            <button
            key={index}
            onClick={() => setCurrentPage(item)} // Set lại currentPage chính xác
            className={`btn ${currentPage === item ? "btn-primary active ms-1 me-1" : "btn-outline-primary ms-1 me-1"}`}
          >
            {item}
            </button>
          )
        )}
      
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="btn btn-outline-primary"
        >
          Next
        </button>
      </div>
      )}
    </div>
  );
};
export default HistoryExam;

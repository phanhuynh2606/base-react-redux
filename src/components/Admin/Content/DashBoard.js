import "./DashBoard.scss";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  ResponsiveContainer,
} from "recharts";
import { getOverView } from "../../../services/apiService";
import { useEffect, useState } from "react";
const DashBoard = (props) => {

  const [dataOverview, setDataOverview] = useState([]);
  const [dataChart, setDataChart] = useState([]);

  useEffect(() => {
    fetchDataOverview();
  },[])
  const fetchDataOverview = async () => {
    let res = await getOverView();
    if(res && res.EC == 0){
      setDataOverview(res.DT)
      let Qz = 0, Qs  = 0, As = 0;
      Qz = res?.DT?.others?.countQuiz;
      Qs = res?.DT?.others?.countQuestions;
      As = res?.DT?.others?.countAnswers;
      let data = [
        {name: 'Quiz', Quiz: Qz},
        {name: 'Question', Question: Qs},
        {name: 'Answer', Answers: As},
      ];
      setDataChart(data);
    }
    console.log(res);
  }
  return (
    <div className="dashboard-container">
      <div className="title">Analytics DashBoard</div>
      <div className="content">
        <div className="c-left">
          <div className="child">
            <span className="text-1">Total Users</span>
            <span className="text-2">
              {dataOverview && dataOverview.users && 
              dataOverview.users.total? <>{dataOverview.users.total}</> : 0}
            </span>
          </div>
          <div className="child">
            <span className="text-1">Total Quiz</span>
            <span className="text-2">
              {dataOverview && dataOverview.others && 
              dataOverview.others.countQuiz? <>{dataOverview.others.countQuiz}</> : 0}
            </span>
          </div>
          <div className="child">
            <span className="text-1">Total Questions</span>
            <span className="text-2">
              {dataOverview && dataOverview.others && 
              dataOverview.others.countQuestions? <>{dataOverview.others.countQuestions}</> : 0}
            </span>
          </div>
          <div className="child">
            <span className="text-1">Total Answers</span>
            <span className="text-2">
              {dataOverview && dataOverview.others && 
              dataOverview.others.countAnswers? <>{dataOverview.others.countAnswers}</> : 0}
            </span>
          </div>
        </div>
        <div className="c-right">
          <ResponsiveContainer width="98%" height="100%">
            <BarChart data={dataChart}>
              <CartesianGrid strokeDasharray="4 1" />
              <XAxis dataKey="name" />
              {/* <YAxis /> */}
              <Tooltip />
              <Legend />
              <Bar dataKey="Quiz" fill="#8884d8" />
              <Bar dataKey="Question" fill="#82ca9d" />
              <Bar dataKey="Answers" fill="#124be1" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;

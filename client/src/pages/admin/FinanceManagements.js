import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import {
  getRevenueStatistic,
  revenueSelector,
} from "../../store/reducers/revenueSlice";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const FinanceManagements = () => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Thống kê doanh thu",
      },
    },
  };

  const { labels, datasets } = useSelector(revenueSelector);

  const data = {
    labels,
    datasets: [
      {
        label: "Doanh thu ngày",
        data: datasets,
        backgroundColor: "#e5383b",
      },
    ],
  };

  const [isShowChart, setIsShowChart] = useState(false);
  const [time, setTime] = useState({});

  const dispatch = useDispatch();
  const handleSeenChart = () => {
    setIsShowChart(true);
    dispatch(getRevenueStatistic(time));
  };

  return (
    <div className="manage-table">
      <div className="select-time">
        <h3>Chọn thời gian hiển thị</h3>
        <div className="time-input">
          <input
            type="date"
            className="input-date"
            name="startDate"
            onChange={(event) =>
              setTime({
                ...time,
                [event.currentTarget.name]: event.currentTarget.value,
              })
            }
          />
          <span>-</span>
          <input
            type="date"
            className="input-date"
            name="endDate"
            onChange={(event) =>
              setTime({
                ...time,
                [event.currentTarget.name]: event.currentTarget.value,
              })
            }
          />
        </div>
        <button className="button" onClick={handleSeenChart}>
          Xem thống kê
        </button>
      </div>
      {isShowChart && <Bar options={options} data={data} />}
    </div>
  );
};

export default FinanceManagements;

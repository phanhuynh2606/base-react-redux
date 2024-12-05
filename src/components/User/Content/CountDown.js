import { useEffect, useState } from "react";

const CountDown = (props) => {
  const { quizId,isFinish } = props;
  // const savedCount = parseInt(localStorage.getItem(`remainingTime_${quizId}`), 10);
  // const [count, setCount] = useState(
  //   !isNaN(savedCount) && savedCount > 0 ? savedCount : 10 * 60
  // );
  const getEndTime = () => {
    const savedEndTime = localStorage.getItem(`endTime_${quizId}`);
    return savedEndTime
      ? parseInt(savedEndTime, 10)
      : Date.now() + 10 * 60 * 1000;
  };
  const [endTime, setEndTime] = useState(getEndTime());
  const [remainingTime, setRemainingTime] = useState(
    Math.max(0, Math.floor((endTime - Date.now()) / 1000))
  );
  const toHHMMSS = (secs) => {
    const sec_num = parseInt(secs, 10);
    const hours = Math.floor(sec_num / 3600);
    const minutes = Math.floor(sec_num / 60) % 60;
    const seconds = sec_num % 60;

    return [hours, minutes, seconds]
      .map((v) => (v < 10 ? "0" + v : v))
      .filter((v, i) => v !== "00" || i > 0)
      .join(":");
  };
  useEffect(() => {
    setTimeout(() => {
      if (Date.now() >= endTime) {
        props.onTimeUp(); // Gọi hàm xử lý khi hết thời gian
        localStorage.removeItem(`endTime_${quizId}`); // Xóa thời gian đích
        setRemainingTime(0); // Cập nhật state để ngừng render
        return;
      }
      if (remainingTime === 0) {
        props.onTimeUp();
        localStorage.removeItem(`endTime_${quizId}`);
        return;
      }
    }, 3000);
    // localStorage.setItem(`remainingTime_${quizId}`, count);
    if(isFinish) return
    localStorage.setItem(`endTime_${quizId}`, endTime);
    const timer = setInterval(() => {
      // setCount(count - 1);
      const newRemainingTime = Math.max(
        0,
        Math.floor((endTime - Date.now()) / 1000)
      );
      setRemainingTime(newRemainingTime);
    }, 1000);

    return () => clearInterval(timer);
  }, [remainingTime, quizId, endTime]);

  return (
    <div className="countdown-container">
      <div className="clock-fade">{toHHMMSS(remainingTime)}</div>
    </div>
  );
};
export default CountDown;

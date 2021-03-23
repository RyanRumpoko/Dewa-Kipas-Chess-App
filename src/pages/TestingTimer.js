import { useState } from "react";
import { Timer } from "react-countdown-clock-timer";

function TestingTimer() {
  const [changeTimerWhite, setChangeTimerWhite] = useState(false);
  const [changeTimerBlack, setChangeTimerBlack] = useState(true);

  function handleTimerWhite() {
    setChangeTimerWhite(true);
    setChangeTimerBlack(false);
  }
  function handleTimerBlack() {
    setChangeTimerWhite(false);
    setChangeTimerBlack(true);
  }

  return (
    <div className="timer-container">
      <Timer
        durationInSeconds={600}
        formatted={true}
        isPaused={changeTimerWhite ? true : false}
        showResetButton={true}
      />
      <Timer
        durationInSeconds={600}
        formatted={true}
        isPaused={changeTimerBlack ? true : false}
        showResetButton={true}
      />
      <button className="btn btn-danger" onClick={handleTimerWhite}>
        Click White
      </button>
      <button className="btn btn-danger" onClick={handleTimerBlack}>
        Click Black
      </button>
    </div>
  );
}
export default TestingTimer;

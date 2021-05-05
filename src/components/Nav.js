import { useState } from "react";
import { useHistory } from "react-router-dom";

export default function Nav() {
  const [color, setColor] = useState("btn btn-outline-dark");
  function changeColor(e) {
    if (e === "over") {
      setColor("btn btn-outline-warning");
    } else {
      setColor("btn btn-outline-dark");
    }
  }
  const history = useHistory();

  async function logout() {
    await localStorage.clear();
    await history.push("/login");
  }
  return (
    <div
      className="col"
      style={{ display: "flex", justifyContent: "flex-end" }}
    >
      <button
        className={color}
        onMouseOver={() => changeColor("over")}
        onMouseLeave={() => changeColor("leave")}
        onClick={() => logout()}
      >
        <i className="fas fa-sign-out-alt" style={{ color: "black" }}>
          {" "}
          Log Out
        </i>
      </button>
    </div>
  );
}

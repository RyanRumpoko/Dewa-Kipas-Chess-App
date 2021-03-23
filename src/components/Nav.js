import { useState } from "react";
import { useHistory } from "react-router-dom";
import Button from 'react-bootstrap/Button'

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
      className="col-12"
      style={{ display: "flex", justifyContent: "flex-end", backgroundColor: "#161512" }}
    >
      <Button
        variant="secondary"
        className={color}
        style={{backgroundColor: "#161512"}}
        // onMouseOver={() => changeColor("over")}
        // onMouseLeave={() => changeColor("leave")}
        onClick={() => logout()}
      >
        <i className="fas fa-sign-out-alt" style={{ color: "black" }} />
        <span>&nbsp;Log Out</span>
      </Button>
    </div>
  );
}

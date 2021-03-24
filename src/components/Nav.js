// import { useState } from "react";
import { useHistory } from "react-router-dom";
// import Button from "react-bootstrap/Button";

export default function Nav() {
  // const [color, setColor] = useState("btn btn-outline-dark");
  // function changeColor(e) {
  //   if (e === "over") {
  //     setColor("btn btn-outline-warning");
  //   } else {
  //     setColor("btn btn-outline-dark");
  //   }
  // }
  const history = useHistory();

  async function logout() {
    await localStorage.clear();
    await history.push("/login");
  }
  return (
    // <div
    //   className="col-12"
    //   style={{
    //     display: "flex",
    //     justifyContent: "flex-end",
    //     backgroundColor: "#161512",
    //   }}
    // >
    //   <Button
    //     variant="secondary"
    //     className={color}
    //     style={{backgroundColor: "#161512"}}
    //     // onMouseOver={() => changeColor("over")}
    //     // onMouseLeave={() => changeColor("leave")}
    //     onClick={() => logout()}
    //   >
    //     <i className="fas fa-sign-out-alt" style={{ color: "black" }} />
    //     <span>&nbsp;Log Out</span>
    //   </Button>
    // </div>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <span className="navbar-brand mb-0 h1" style={{ color: "#999999" }}>
        DEWA KIPAS
      </span>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav mr-auto">
          {/* <li class="nav-item active">
            <a class="nav-link" href="#">
              Home <span class="sr-only">(current)</span>
            </a>
          </li> */}
        </ul>
        <button
          className="btn btn-outline-danger"
          style={{ justifyContent: "flex-end" }}
          onClick={() => logout()}
        >
          <i className="fas fa-sign-out-alt" style={{ color: "red" }} />
          <span>&nbsp;Log Out</span>
        </button>
      </div>
    </nav>
  );
}

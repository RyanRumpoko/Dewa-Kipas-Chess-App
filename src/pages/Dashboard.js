import { useHistory, useLocation, useParams } from "react-router-dom";
import ChessVSBot from "./ChessVSBot";
import WithMoveValidation from "../integrations/WithMoveValidation";

export default function Dashboard() {
  let { loc, roomid } = useParams();
  const { state } = useLocation();

  console.log(roomid, "ini room id");
  const history = useHistory();

  function back() {
    history.goBack();
  }

  return (
    <div className="row ">
      <div className="col-12 ">
        <button className="btn btn-primary" onClick={() => back()}>
          Back
        </button>
        <div className="row">
          <div className="col-12 ">
            <div className="row bg-success" style={{ height: "90vh" }}>
              <div
                className="col-8 bg-warning"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {loc === "player" ? (
                  <div style={boardsContainer}>
                    <WithMoveValidation roomid={roomid} userData={state} />
                  </div>
                ) : (
                  <ChessVSBot userData={state} />
                )}
              </div>
              <div className="col-4 bg-danger">
                <div className="row">
                  <h2 className="text-center">Chatbox</h2>
                </div>
                <div
                  className="row bg-secondary"
                  style={{ height: "80%" }}
                ></div>
                <div className="row">
                  <div className="col-10">
                    <div className="btn-group dropup">
                      <button
                        type="button"
                        className="btn btn-secondary dropdown-toggle"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i className="fas fa-paper-plane"> Send</i>
                      </button>
                      <div className="dropdown-menu">
                        <div className="row" style={{ width: "320px" }}>
                          <div className="col-4">
                            <button className="dropdown-item ">Blabla</button>
                          </div>
                          <div className="col-4">
                            <button className="dropdown-item ">Emot</button>
                          </div>
                          <div className="col-4">
                            <button className="dropdown-item ">Emot</button>
                          </div>
                          <div className="col-4">
                            <button className="dropdown-item ">Blabla</button>
                          </div>
                          <div className="col-4">
                            <button className="dropdown-item ">Blabla</button>
                          </div>
                          <div className="col-4">
                            <button className="dropdown-item ">Blabla</button>
                          </div>
                          <div className="col-4">
                            <button className="dropdown-item ">Blabla</button>
                          </div>
                          <div className="col-4">
                            <button className="dropdown-item ">Blabla</button>
                          </div>
                          <div className="col-4">
                            <button className="dropdown-item ">Emot</button>
                          </div>
                          <div className="col-4">
                            <button className="dropdown-item ">Emot</button>
                          </div>
                          <div className="col-4">
                            <button className="dropdown-item ">Blabla</button>
                          </div>
                          <div className="col-4">
                            <button className="dropdown-item ">Blabla</button>
                          </div>
                          <div className="col-4">
                            <button className="dropdown-item ">Blabla</button>
                          </div>
                          <div className="col-4">
                            <button className="dropdown-item ">Blabla</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-2">
                    <button className="btn btn-primary">
                      <i className="fas fa-paper-plane"> Send</i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const boardsContainer = {
  marginTop: 30,
  marginBottom: 50,
};

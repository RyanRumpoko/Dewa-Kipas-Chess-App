import { useHistory, useLocation } from "react-router-dom";
import ChessPVP from "./ChessPVP";
import ChessVSBot from "./ChessVSBot";
export default function Dashboard() {
  const { pathname } = useLocation();
  const loc = pathname.split("/")[2];
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
                {loc === "player" ? <ChessPVP /> : <ChessVSBot />}
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
                    <div
                      class="input-group input-group-lg"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <input
                        type="text"
                        class="form-control"
                        aria-label="Sizing example input"
                        aria-describedby="inputGroup-sizing-lg"
                        placeholder="Type ypur message here..."
                      />
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

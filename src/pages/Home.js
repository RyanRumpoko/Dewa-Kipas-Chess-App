import { useHistory, useLocation } from "react-router-dom";
import Nav from "../components/Nav";
export default function Home() {
  const { state } = useLocation();
  console.log(state, "<<<<<");
  const history = useHistory();

  function vsPlayer() {
    history.push("/dashboard");
  }
  function vsBot() {
    history.push("/dashboard?foe=bot");
  }
  return (
    <div>
      <div className="row">
        <div className="col-12">
          <Nav />
        </div>
      </div>
      <div className="row">
        <div className="col-4"></div>

        <div className="col-4">
          <div className="row mb-3">
            <div className="col">
              <h1 className="text-center">
                Welcome to the Fan God Chess Game, My Dear{" "}
                {state ? state.username : ""}
              </h1>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <div
                className="row mb-3"
                style={{ justifyContent: "flex-start" }}
              >
                <h4 className="">Want to play with other?</h4>
              </div>
              <div className="row" style={{ justifyContent: "flex-start" }}>
                <button
                  className="btn btn-outline-success text-center"
                  onClick={() => vsPlayer()}
                >
                  <i className="fas fa-user-alt"> V.S Player</i>
                </button>
              </div>
            </div>
            <div className="col-6 ">
              <div className="row mb-3" style={{ justifyContent: "flex-end" }}>
                <h4>Play with BOT</h4>
              </div>
              <div className="row" style={{ justifyContent: "flex-end" }}>
                <button
                  className="btn btn-outline-success text-center"
                  onClick={() => vsBot()}
                >
                  <i className="fas fa-user-alt"> V.S AI</i>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="col-4"></div>
      </div>
    </div>
  );
}

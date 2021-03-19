export default function Home() {
  return (
    <div className="row">
      <div className="col-4"></div>

      <div className="col-4">
        <div className="row">
          <div className="col">
            <h1 className="text-center">Welcome to ChessGame Dewa Kipas</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <div className="row" style={{ justifyContent: "flex-start" }}>
              <h4 className="">Want to play with other?</h4>
            </div>
            <div className="row" style={{ justifyContent: "flex-start" }}>
              <button className="btn btn-outline-success text-center">
                <i className="fas fa-user-alt"> V.S Player</i>
              </button>
            </div>
          </div>
          <div className="col-6 ">
            <div className="row" style={{ justifyContent: "flex-end" }}>
              <h4>Play with BOT</h4>
            </div>
            <div className="row" style={{ justifyContent: "flex-end" }}>
              <button className="btn btn-outline-success text-center">
                <i className="fas fa-user-alt"> V.S AI</i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="col-4"></div>
    </div>
  );
}

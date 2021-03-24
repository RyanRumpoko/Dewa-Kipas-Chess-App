export default function CardHistory(props) {
  // console.log(props);
  const { history } = props;
  // console.log(history);
  return (
    <div className="card mb-3" id={history.id}>
      <div className="card-body">
        <div className="row">
          <div className="col-4">
            <div className="row">
              {history.status === 1 ? "Winner" : "Lose"}
            </div>
            <div
              className="row"
              style={{ justifyContent: "center", alignItems: "center" }}
            >
              <img
                src={history.PlayerOne.pictureUrl}
                alt={history.PlayerOne.username}
                style={{ width: "6rem", height: "6rem" }}
              />
            </div>
            <div className="row">
              <div className="col-12">Name:</div>
            </div>
            <div className="row">
              <div className="col-12">{history.PlayerOne.username}</div>
            </div>
          </div>
          <div
            className="col-4"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <p style={{ fontSize: "3rem" }}>
              <i className="fab fa-vimeo-v" size="5"></i>
              <i className="fab fa-stripe-s"></i>
            </p>
          </div>
          <div className="col-4">
            <div className="row">
              {history.status === 2 ? "Winner" : "Lose"}
            </div>
            <div
              className="row"
              style={{ justifyContent: "center", alignItems: "center" }}
            >
              <img
                src={history.PlayerTwo.pictureUrl}
                alt={history.PlayerTwo.username}
                style={{ width: "6rem", height: "6rem" }}
              />
            </div>
            <div className="row">
              <div className="col-12">Name:</div>
            </div>
            <div className="row">
              <div className="col-12">{history.PlayerTwo.username}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

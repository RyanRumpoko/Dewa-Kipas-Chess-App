export default function CardHistory(props) {
  // console.log(props);
  const { history } = props;
  // console.log(history);
  return (
    <div className="card mb-3" id="1">
      <h5 className="card-header">Player One</h5>
      <div className="card-body">
        <div className="row">
          <div className="col-4">
            <div class="row">
              <img
                src={history.PlayerOne.pictureUrl}
                alt={history.PlayerOne.username}
                width="10"
              />
            </div>
            <div class="row">Name:</div>
            <div class="row">{history.PlayerOne.username}</div>
          </div>
          <div className="col-4">
            <div class="row">V.S</div>
          </div>
          <div className="col-4">
            <div class="row">testing</div>
          </div>
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores
          totam molestiae id? Similique nemo a alias quasi corporis rem
          pariatur. Fugit ratione corrupti, facere nesciunt praesentium vel
          asperiores. Vero, velit.
        </p>
      </div>
    </div>
  );
}

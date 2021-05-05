import { useHistory, useLocation } from "react-router-dom";

export default function Dashboard() {
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const query = useQuery();
  const history = useHistory();
  console.log(query.get("foe"));
  function back() {
    history.goBack();
  }
  return (
    <div className="row ">
      <div className="col-12 ">
        <div className="row">
          <button className="btn btn-primary" onClick={() => back()}>
            Back
          </button>
        </div>
        <div className="row">
          <div className="col-12 ">
            <div className="row bg-success">
              <div className="col-8 bg-warning">test</div>
              <div className="col-4">
                <div className="row bg-danger" style={{ height: "100px" }}>
                  Test
                </div>
                <div className="row">Tesing</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

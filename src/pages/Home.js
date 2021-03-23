import { useHistory, useLocation } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import Nav from "../components/Nav";
import axios from "../api/axios";
import CardHistory from "../components/CardHistory";
import { socket, ENDPOINT } from "../connections/socketio.js";

export default function Home() {
  const { state } = useLocation();
  console.log(state, "<<<<<");
  const history = useHistory();
  const [openModalCreateRoom, setOpenModalCreateRoom] = useState(false);
  const [inputRoomId, setInputRoomId] = useState("");
  const [histories, setHistories] = useState([]);
  function vsPlayer() {
    setOpenModalCreateRoom(true);
    console.log(openModalCreateRoom, "sudah tertoggle");
    // history.push("/dashboard/player");
  }
  function createRoom() {
    history.push(`/dashboard/player/new`, state);
  }
  function joinRoom() {
    history.push(`/dashboard/player/${inputRoomId}`, state);
  }
  function onChangeInputRoomId(e) {
    // console.log(e.target.value);
    setInputRoomId(e.target.value);
  }
  function vsBot() {
    history.push("/dashboard/bot", state);
  }
  function matchmaking () {
    socket.emit("matchmaking", state)
    history.push("/dashboard/player/matchmaking", state)
  }

  useEffect(() => {
    const ac = new AbortController();
    async function getHistoryUser() {
      try {
        const { data } = await axios({
          method: "get",
          url: `/histories/${state ? state.id : 1}`,
          headers: {
            access_token: localStorage.access_token,
          },
        });

        setHistories(data);
      } catch ({ response }) {
        console.log(response.data);
      }
    }
    getHistoryUser();
    return () => ac.abort();

  }, [openModalCreateRoom, state]);
  return (
    <div className="container-fluid bg-info">
      <div className="row">
        <Nav />
      </div>
      {openModalCreateRoom ? (
        <div className="row">
          <button className="btn" type="button" onClick={createRoom}>
            createRoom
          </button>
          <>
            <label>input room id</label>
            <input type="text" onChange={(e) => onChangeInputRoomId(e)} />
            <button className="btn" type="button" onClick={joinRoom}>
              joinRoom
            </button>
          </>
        </div>
      ) : (
        <div></div>
      )}
      <div className="row" style={{ height: "100vh" }}>
        <div className="col-6 bg-warning">
          <h1 className="text-center">Want to play now?</h1>
          <div className="row">
            <div
              className="dropdown"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <button
                className="btn btn-outline-primary dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ height: "100px", width: "100px" }}
              >
                Play
              </button>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton1"
              >
                <li>
                  <button className=" dropdown-item" onClick={vsPlayer}>
                    <i className="fas fa-user"> V.S. Player</i>
                  </button>
                </li>
                <li>
                  <button className=" dropdown-item" onClick={vsBot}>
                    <i className="fas fa-robot"> V.S. Bot</i>
                  </button>
                </li>
                <li>
                  <button className=" dropdown-item" onClick={matchmaking}>
                    <i className="fas fa-robot"> Matchmaking</i>
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="row">{JSON.stringify(histories, null, 2)}</div>
        </div>
        <div className="col-6 bg-danger">
          <div className="row">
            <div
              className="col-2"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <img
                src={state.pictureUrl}
                className="img-thumbnail"
                height="100"
                width="100"
                alt=""
              />
            </div>
            <div className="col-8">
              <div className="row">
                <span>
                  Name<h3>{state ? state.username : ""}</h3>
                </span>
              </div>
            </div>
          </div>
          <div className="row" style={{ height: "50vh" }}>
            <h1 className="text-center">Leaderboard</h1>
          </div>
          <div className="row" style={{ height: "50vh" }}>
            <div className="col">
              <h1 className="text-center">History</h1>
              <div
                tabIndex="0"
                style={{
                  overflowY: "scroll",
                  minHeight: "100x",
                  maxHeight: "220px",
                  border: "5px solid black",
                }}
                className="row"
              >
                {histories
                  ? histories.map((history, i) => (
                      <CardHistory history={history} key={`data ke${i + 1}`} />
                    ))
                  : null}
                {/* <div className="card mb-3" id="2">
                  <h5 className="card-header">Player One</h5>
                  <div className="card-body">
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Asperiores totam molestiae id? Similique nemo a alias
                      quasi corporis rem pariatur. Fugit ratione corrupti,
                      facere nesciunt praesentium vel asperiores. Vero, velit.
                    </p>
                  </div>
                </div>
                <div className="card mb-3" id="3">
                  <h5 className="card-header">Player One</h5>
                  <div className="card-body">
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Asperiores totam molestiae id? Similique nemo a alias
                      quasi corporis rem pariatur. Fugit ratione corrupti,
                      facere nesciunt praesentium vel asperiores. Vero, velit.
                    </p>
                  </div>
                </div>
                <div className="card mb-3" id="4">
                  <h5 className="card-header">Player One</h5>
                  <div className="card-body">
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Asperiores totam molestiae id? Similique nemo a alias
                      quasi corporis rem pariatur. Fugit ratione corrupti,
                      facere nesciunt praesentium vel asperiores. Vero, velit.
                    </p>
                  </div>
                </div> */}

                {/*  */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

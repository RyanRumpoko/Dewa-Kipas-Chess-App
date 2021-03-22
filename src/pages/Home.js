import { useHistory, useLocation } from "react-router-dom";
import {useState, useEffect} from 'react'
import Nav from "../components/Nav";

export default function Home() {

  const { state } = useLocation();
  console.log(state, "<<<<<");
  const history = useHistory();
  const [openModalCreateRoom, setOpenModalCreateRoom] = useState(false)
  const [inputRoomId, setInputRoomId] = useState('')
  function vsPlayer() {
    setOpenModalCreateRoom(true)
    console.log(openModalCreateRoom, 'sudah tertoggle')
    // history.push("/dashboard/player");
  }
  function createRoom () {
    history.push("/dashboard/player/new", state)
  }
  function joinRoom () {
    history.push(`/dashboard/player/${inputRoomId}`, state)
  }
  function onChangeInputRoomId (e) {
    console.log(e.target.value)
    setInputRoomId(e.target.value)
  }
  function vsBot() {
    history.push("/dashboard/bot");
  }
  useEffect (() => {

  }, [openModalCreateRoom])

  return (
    <div className="container-fluid bg-info">
      <div className="row">
        <Nav />
      </div>
      
      {
        openModalCreateRoom ?
          <div className='row'>
            <button className="btn"
            type="button"
            onClick={createRoom}>
              createRoom
            </button>
            <>
              <label>input room id</label>
              <input type="text" onChange={(e) => onChangeInputRoomId(e)}/>
              <button className="btn" type="button" onClick={joinRoom}>
                  joinRoom
              </button>
            </>
          </div>
        : <div></div>
      }
      <div className="row">
        <div className="col-6 bg-warning">
          <div className="row"></div>
            <h1 className="text-center">Want to play now?</h1>
          </div>
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
              </ul>
            </div>
          </div>
        </div>

        <div className="col-6 bg-danger" style={{ height: "90vh" }}>
          <div className="row">
            <div
              className="col-2"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <img
                src="https://library.kissclipart.com/20190209/jww/kissclipart-catur-kuda-clipart-chess-battlefy-inc-game-9c1a9d225f763183.png"
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
          <div className="row" style={{ height: "50%" }}>
            <h1 className="text-center">Leaderboard</h1>
          </div>
          <div className="row" style={{ height: "50%" }}>
            <h1 className="text-center">History</h1>
          </div>
        </div>
      </div>
  );
}

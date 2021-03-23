import { useHistory, useLocation, useParams } from "react-router-dom";
import ChessVSBot from "./ChessVSBot";
import WithMoveValidation from '../integrations/WithMoveValidation'
// coba
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import TextField from "@material-ui/core/TextField"
import AssignmentIcon from "@material-ui/icons/Assignment"
import PhoneIcon from "@material-ui/icons/Phone"
import  { useEffect, useRef, useState } from "react"
import { CopyToClipboard } from "react-copy-to-clipboard"
import Peer from "simple-peer"
import io from "socket.io-client"

const ENDPOINT = "http://localhost:4000/";
const socket = io(ENDPOINT);

export default function Dashboard() {
  let { loc, roomid } = useParams()
  const { state } = useLocation()
  // console.log(roomid, 'ini room id')
  // console.log(state, "ini state dari dashboard");
  // console.log();
  const history = useHistory();
  function back() {
    history.goBack();
  }
  // coba
  const [ me, setMe ] = useState("")
  // const [enemy, setEnemy] = useState({})
	const [ stream, setStream ] = useState()
	const [ receivingCall, setReceivingCall ] = useState(false)
	const [ caller, setCaller ] = useState("")
	const [ callerSignal, setCallerSignal ] = useState()
	const [ callAccepted, setCallAccepted ] = useState(false)
	const [ idToCall, setIdToCall ] = useState("")
	const [ callEnded, setCallEnded] = useState(false)
	const [ name, setName ] = useState("")
	const myVideo = useRef()
	const userVideo = useRef()
	const connectionRef= useRef()

	useEffect(() => {
		navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
			setStream(stream)
				myVideo.current.srcObject = stream
		})

	socket.on("me", (id) => {
			setMe(id)
      console.log(typeof me, me, "meee dari socket");
		})

  
    // socket.on("enemy", (data) => {
		// 	setEnemy(data.enemy)
    //   console.log(typeof enemy, enemy, "enemy dari socket dashboard");
		// })

		socket.on("callUser", (data) => {
			// console.log(data, ">>>>dari callUser");
			setReceivingCall(true)
			setCaller(data.from)
			setName(data.name)
			setCallerSignal(data.signal)
		})
	}, [])

	const callUser = (id) => {
		const peer = new Peer({
			initiator: true,
			trickle: false,
			stream: stream
		})
		peer.on("signal", (data) => {
			socket.emit("callUser", {
				userToCall: id,
				signalData: data,
				from: me,
				name: name
			})
		})
		peer.on("stream", (stream) => {
			
				userVideo.current.srcObject = stream
			
		})
		socket.on("callAccepted", (signal) => {
			setCallAccepted(true)
			peer.signal(signal)
		})

		connectionRef.current = peer
	}

	const answerCall =() =>  {
		setCallAccepted(true)
		const peer = new Peer({
			initiator: false,
			trickle: false,
			stream: stream
		})
		peer.on("signal", (data) => {
			socket.emit("answerCall", { signal: data, to: caller })
		})
		peer.on("stream", (stream) => {
			userVideo.current.srcObject = stream
		})

		peer.signal(callerSignal)
		connectionRef.current = peer
	}

	const leaveCall = () => {
		setCallEnded(true)
		connectionRef.current.destroy()
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
                {loc === "player" 
                ? <div style={boardsContainer}>
                    <WithMoveValidation roomid={roomid} userData={state} />
                  </div> 
                : <ChessVSBot />}
              </div>
              <div className="col-4 bg-danger">
                <div className="row">
                  <h2 className="text-center">Chatbox</h2>
                  {/*  coba */}
                  <>
                    <div className="container">
                      <div className="video-container">
                        <div className="video">
                          {stream &&  <video playsInline muted ref={myVideo} autoPlay style={{ width: "300px" }} />}
                        </div>
                        <div className="video">
                          {callAccepted && !callEnded ?
                          <video playsInline ref={userVideo} autoPlay style={{ width: "300px"}} />:
                          null}
                        </div>
                      </div>
                      <div className="myId">
                        <TextField
                          id="filled-basic"
                          label="Name"
                          variant="filled"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          style={{ marginBottom: "20px" }}
                        />
                        <CopyToClipboard text={me} style={{ marginBottom: "2rem" }}>
                          <Button variant="contained" color="primary" startIcon={<AssignmentIcon fontSize="large" />}>
                            Copy ID
                          </Button>
                        </CopyToClipboard>

                        <TextField
                          id="filled-basic"
                          label="ID to call"
                          variant="filled"
                          value={idToCall}
                          onChange={(e) => setIdToCall(e.target.value)}
                        />
                        <div className="call-button">
                          {callAccepted && !callEnded ? (
                            <Button variant="contained" color="secondary" onClick={leaveCall}>
                              End Call
                            </Button>
                          ) : (
                            <IconButton color="primary" aria-label="call" onClick={() => callUser(idToCall)}>
                              <PhoneIcon fontSize="large" />
                            </IconButton>
                          )}
                          {idToCall}
                        </div>
                      </div>
                      <div>
                        {receivingCall && !callAccepted ? (
                            <div className="caller">
                            <h1 >{name} is calling...</h1>
                            <Button variant="contained" color="primary" onClick={answerCall}>
                              Answer
                            </Button>
                          </div>
                        ) : null}
                      </div>
                    </div>
                    </>
                    {/* batas coba */}
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

const boardsContainer = {
  marginTop: 30,
  marginBottom: 50,
};

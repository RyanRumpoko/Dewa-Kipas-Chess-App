import React, { useEffect, useState, useRef } from "react";
import { socket } from "../connections/socketio";
import Peer from "simple-peer";
import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  width: 100%;
`;

const Video = styled.video`
  border: 1px solid blue;
  width: 50%;
  height: 50%;
`;

function WebRtc(props) {
  // console.log(props);
  const [yourID, setYourID] = useState("");
  const [users, setUsers] = useState({});
  const [stream, setStream] = useState();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const [isCalled, setisCalled] = useState(false);

  const userVideo = useRef();
  const partnerVideo = useRef();
  const socketVid = useRef();

  useEffect(() => {
    console.log("Masuk Use Effect");
    socketVid.current = socket;
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((stream) => {
        setStream(stream)
        if (userVideo.current) {
          userVideo.current.srcObject = stream;
        }
      // return
      // })
      // .then(() => {
      //   console.log(props.color, 'ini color di useEffect awal')
      //   if (props.color === 'black') {
      //     console.log(stream, 'ini stream sebelum nelpon')
      //     callPeer(props.enemy.id)
      // }
      })

    socketVid.current.on("yourID", (id) => {
      console.log("Masuk Socket ID");
      setYourID(id);
    });

    socketVid.current.on("allUsers", (users) => {
      setUsers(users);
    });

    socketVid.current.on("hey", (data) => {
      console.log(data, "Masuk hey");
      setisCalled(true)
      setReceivingCall(true);
      setCaller(data.from);
      setCallerSignal(data.signal);
      // console.log(stream, 'ini isi stream ketika hey dan sebelum accept call')
    });

  }, []);

  function callPeer(id) {
    setisCalled(true)
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", (data) => {
      console.log(data, "ini Data");
      socketVid.current.emit("callUser", {
        roomid: props.roomid,
        userToCall: id,
        signalData: data,
        from: props.userData.id,
      });
    });

    peer.on("stream", (stream) => {
      if (partnerVideo.current) {
        console.log(stream, 'ini yang di line 100')
        partnerVideo.current.srcObject = stream;
      }
    });

    socketVid.current.on("callAccepted", (signal) => {
      console.log(signal,'video sudah sampai callaccepted')
      setCallAccepted(true);
      peer.signal(signal);
    });
  }

  function acceptCall() {
    setReceivingCall(false)
    console.log('acceptCall triggered')
    setCallAccepted(true);
    console.log(stream, 'ini stream usernya sendiri di accept call') // ternyata undefined
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      console.log(data, 'acceptcall data signal sebelum emit')
      socketVid.current.emit("acceptCall", { signal: data, roomid: props.roomid, to: caller });
    });

    peer.on("stream", (stream) => {
      partnerVideo.current.srcObject = stream;
    });

    peer.signal(callerSignal);
  }

  let UserVideo;
  if (stream) {
    UserVideo = <Video playsInline muted ref={userVideo} autoPlay />;
  }

  let PartnerVideo;
  if (callAccepted) {
    PartnerVideo = <Video playsInline ref={partnerVideo} autoPlay />;
  }

  let incomingCall;
  if (receivingCall) {
    incomingCall = (
      <div>
        <h3>{caller} is asking you to open cam</h3>
        <button onClick={acceptCall}>Accept</button>
      </div>
    );
  }
  return (
    <Container>
      <Row>
        {UserVideo}
        {PartnerVideo}
      </Row>
      {
        isCalled?
        <> </>
        : 
        <Row>
          <button onClick={() => callPeer(props.enemy.id)}>
            Ask you opponent to open cam
          </button>
        </Row>
      }
      <Row>{incomingCall}</Row>
    </Container>
  );
}

export default WebRtc;

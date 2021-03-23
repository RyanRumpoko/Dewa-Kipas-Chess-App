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

  const userVideo = useRef();
  const partnerVideo = useRef();
  const socketVid = useRef();

  useEffect(() => {
    // console.log(props, "ini props");
    console.log("Masuk Use Effect");
    socketVid.current = socket;
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((stream) => {
        setStream(stream);
        if (userVideo.current) {
          userVideo.current.srcObject = stream;
        }
      });

    socketVid.current.on("yourID", (id) => {
      console.log("Masuk Socket ID");
      setYourID(id);
    });

    socketVid.current.on("allUsers", (users) => {
      setUsers(users);
    });

    socketVid.current.on("hey", (data) => {
      console.log(data, "Masuk hey");
      setReceivingCall(true);
      setCaller(data.from);
      setCallerSignal(data.signal);
    });
  }, []);

  function callPeer(id) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", (data) => {
      console.log(data, "ini Data");
      socketVid.current.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: props.userData.id,
      });
    });

    peer.on("stream", (stream) => {
      if (partnerVideo.current) {
        partnerVideo.current.srcObject = stream;
      }
    });

    socketVid.current.on("callAccepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });
  }

  function acceptCall() {
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      socketVid.current.emit("acceptCall", { signal: data, to: caller });
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
        <h1>{caller} is calling you</h1>
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
      <Row>
        <button onClick={() => callPeer(props.enemy.id)}>
          Call {props.enemy.username}
        </button>
        ;
      </Row>
      <Row>{incomingCall}</Row>
    </Container>
  );
}

export default WebRtc;

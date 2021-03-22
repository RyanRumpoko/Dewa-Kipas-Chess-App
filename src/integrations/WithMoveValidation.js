import React, { Component } from "react";
import PropTypes from "prop-types";
import Chess from "chess.js"; // import Chess from  "chess.js"(default) if recieving an error about new Chess() not being a constructor
import Chessboard from "chessboardjsx";
import { io } from "socket.io-client";
// import { useParams } from "react-router";
import { withRouter, useParams } from "react-router-dom";
// import { createSocket } from "node:dgram";

const ENDPOINT = "http://localhost:4000/";
const socket = io(ENDPOINT);

class HumanVsHuman extends Component {
  static propTypes = { children: PropTypes.func };
  constructor(props) {
    super(props);
    this.state = {
      fen: "start",
      // square styles for active drop square
      dropSquareStyle: {},
      // custom square styles
      squareStyles: {},
      // square with the currently clicked piece
      pieceSquare: "",
      // currently clicked square
      square: "",
      // array of past game moves
      history: [],
      //modifan baru
      play: true,
      color: "white",
      dataFetch: [],
      roomid: this.props.roomid,
      userData: this.props.userData,
      enemy: {},
      // isi userData
      // {
      //   id: user.id,
      //   username: user.username,
      //   email: user.email,
      //   pictureUrl: user.pictureUrl,
      //   eloRating: user.eloRating,
      // }
    };
  }

  componentDidMount() {
    console.log(this.props, "<<<<<<<<<< ini yg di class");
    console.log(this.props.roomid, "<<<<<<<<<< ini yang di class");
    console.log(this.props.userData, "ini props userdata di class component");
    console.log(this.state.userData, "ini state userdata di class component");
    if (this.state.roomid === "new") {
      let uuid = "dewakipas2";
      this.setState({ roomid: uuid });
      socket.emit("create-room", {
        roomid: uuid,
        playerData: this.state.userData,
      });
    } else {
      this.setState({ color: "black" });
      socket.emit("join-room", {
        roomid: this.state.roomid,
        playerData: this.state.userData,
      });
    }
    this.game = new Chess();
    // this.gethistory();

    socket.on("fullroom", (dataRoom) => {
      console.log("fullroom", dataRoom);
      console.log(this.state.color);
      if (this.state.color === "white") {
        this.setState({ enemy: dataRoom.selectedRoom.playerTwo });
        console.log(this.state.enemy, "ini enemyku di white");
      } else {
        this.setState({ enemy: dataRoom.selectedRoom.playerOne });
        console.log(this.state.enemy, "ini enemyku di black");
      }
    });

    socket.on("enemymove", (data) => {
      let move = this.game.move({
        from: data.sourceSquare,
        to: data.targetSquare,
        promotion: "q", // always promote to a queen for example simplicity
      });
      this.setState({
        fen: data.fen,
        history: data.history,
        squareStyles: data.squareStyles,
      });
    });
  }

  // gethistory = async () => {
  //   const tesGet = await fetch("http://localhost:4000/histories/1", {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",

  //       // 'Content-Type': 'application/x-www-form-urlencoded',
  //     },
  //     // body: JSON.stringify(data)
  //   });
  //   this.setState({
  //     dataFetch: tesGet,
  //   });
  // };

  // keep clicked square style and remove hint squares
  removeHighlightSquare = () => {
    this.setState(({ pieceSquare, history }) => ({
      squareStyles: squareStyling({ pieceSquare, history }),
    }));
  };

  // show possible moves
  highlightSquare = (sourceSquare, squaresToHighlight) => {
    const highlightStyles = [sourceSquare, ...squaresToHighlight].reduce(
      (a, c) => {
        return {
          ...a,
          ...{
            [c]: {
              backgroundColor: "rgba(255, 255, 0, 0.4)",
            },
          },
          ...squareStyling({
            history: this.state.history,
            pieceSquare: this.state.pieceSquare,
          }),
        };
      },
      {}
    );

    this.setState(({ squareStyles }) => ({
      squareStyles: { ...squareStyles, ...highlightStyles },
    }));
  };

  onDrop = ({ sourceSquare, targetSquare }) => {
    // see if the move is legal
    let move = this.game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q", // always promote to a queen for example simplicity
    });
    console.log(this.game.move());
    console.log(sourceSquare, targetSquare, "ini isi ondrop");
    console.log(this.game, "ini isi this gameeeeee");
    console.log(this.game.fen());
    const nowTurn = this.game.fen().split(" ")[1];
    console.log(nowTurn, "ini harusnya yang ga boleh gerak");
    // if ((this.state.color === 'black' && nowTurn=== 'b') || (this.state.color === 'white' && nowTurn === 'w')) {
    // illegal move
    if (move === null) return;

    this.setState(({ history, pieceSquare }) => ({
      fen: this.game.fen(),
      history: this.game.history({ verbose: true }),
      squareStyles: squareStyling({ pieceSquare, history }),
    }));

    socket.emit("move", {
      sourceSquare,
      targetSquare,
      roomid: this.state.roomid,
      fen: this.state.fen,
      history: this.state.history,
      squareStyles: this.state.pieceSquare,
    });
    // } else {
    //   console.log('its not your turn')
    //   this.game.undo()
    //   return
    // }
  };

  onMouseOverSquare = (square) => {
    // get list of possible moves for this square
    let moves = this.game.moves({
      square: square,
      verbose: true,
    });

    // exit if there are no moves available for this square
    if (moves.length === 0) return;

    let squaresToHighlight = [];
    for (var i = 0; i < moves.length; i++) {
      squaresToHighlight.push(moves[i].to);
    }

    this.highlightSquare(square, squaresToHighlight);
  };

  onMouseOutSquare = (square) => this.removeHighlightSquare(square);

  // central squares get diff dropSquareStyles
  onDragOverSquare = (square) => {
    this.setState({
      dropSquareStyle:
        square === "e4" || square === "d4" || square === "e5" || square === "d5"
          ? { backgroundColor: "cornFlowerBlue" }
          : { boxShadow: "inset 0 0 1px 4px rgb(255, 255, 0)" },
    });
  };

  onSquareClick = (square) => {
    this.setState(({ history }) => ({
      squareStyles: squareStyling({ pieceSquare: square, history }),
      pieceSquare: square,
    }));

    let move = this.game.move({
      from: this.state.pieceSquare,
      to: square,
      promotion: "q", // always promote to a queen for example simplicity
    });

    // illegal move
    if (move === null) return;

    // sepertinya disini action move nya
    socket.emit("message", "onsquareclick");

    this.setState({
      fen: this.game.fen(),
      history: this.game.history({ verbose: true }),
      pieceSquare: "",
    });
  };

  onSquareRightClick = (square) =>
    this.setState({
      squareStyles: { [square]: { backgroundColor: "red" } },
    });

  render() {
    const { fen, dropSquareStyle, squareStyles } = this.state;

    return this.props.children({
      squareStyles,
      position: fen,
      onMouseOverSquare: this.onMouseOverSquare,
      onMouseOutSquare: this.onMouseOutSquare,
      onDrop: this.onDrop,
      dropSquareStyle,
      onDragOverSquare: this.onDragOverSquare,
      onSquareClick: this.onSquareClick,
      onSquareRightClick: this.onSquareRightClick,
      color: this.state.color,
    });
  }
}

export default function WithMoveValidation(props) {
  const param = useParams();
  const { userData } = props;
  console.log(param, "ini param");
  return (
    <div>
      {/* <p>{JSON.stringify(dataFetch)}</p> */}
      <HumanVsHuman roomid={param.roomid} userData={userData}>
        {({
          position,
          onDrop,
          onMouseOverSquare,
          onMouseOutSquare,
          squareStyles,
          dropSquareStyle,
          onDragOverSquare,
          onSquareClick,
          onSquareRightClick,
          color,
        }) => (
          // {
          //   // this.game.current
          // }
          <Chessboard
            id="humanVsHuman"
            width={540}
            position={position}
            onDrop={onDrop}
            orientation={color}
            onMouseOverSquare={onMouseOverSquare}
            onMouseOutSquare={onMouseOutSquare}
            boardStyle={{
              borderRadius: "5px",
              boxShadow: `0 5px 15px rgba(0, 0, 0, 0.5)`,
            }}
            squareStyles={squareStyles}
            dropSquareStyle={dropSquareStyle}
            onDragOverSquare={onDragOverSquare}
            onSquareClick={onSquareClick}
            onSquareRightClick={onSquareRightClick}
          />
        )}
      </HumanVsHuman>
    </div>
  );
}

const squareStyling = ({ pieceSquare, history }) => {
  const sourceSquare = history.length && history[history.length - 1].from;
  const targetSquare = history.length && history[history.length - 1].to;

  return {
    [pieceSquare]: { backgroundColor: "rgba(255, 255, 0, 0.4)" },
    ...(history.length && {
      [sourceSquare]: {
        backgroundColor: "rgba(255, 255, 0, 0.4)",
      },
    }),
    ...(history.length && {
      [targetSquare]: {
        backgroundColor: "rgba(255, 255, 0, 0.4)",
      },
    }),
  };
};

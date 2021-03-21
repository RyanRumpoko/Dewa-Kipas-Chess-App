import React, { Component } from "react";

import WithMoveValidation from "../integrations/WithMoveValidation";

class PVPGame extends Component {
  render() {
    return (
      <div style={boardsContainer}>
        <WithMoveValidation />
      </div>
    );
  }
}

export default PVPGame;

const boardsContainer = {
  marginTop: 30,
  marginBottom: 50,
};

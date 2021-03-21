import React, { Component } from "react";

import WithMoveValidation from "../integrations/WithMoveValidation";

class Demo extends Component {
  render() {
    return (
      <div style={boardsContainer}>
        <WithMoveValidation />
      </div>
    );
  }
}

export default Demo;

const boardsContainer = {
  marginTop: 30,
  marginBottom: 50,
};

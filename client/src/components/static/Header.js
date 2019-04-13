import React, { Component } from "react";
import {
  Alignment,
  AnchorButton,
  Navbar,
  NavbarGroup,
  NavbarDivider,
  NavbarHeading
} from "@blueprintjs/core";
import { withRouter } from "react-router-dom";
import { Auth } from "aws-amplify";
//docs: https://blueprintjs.com/docs/#blueprint

const logoImage = require("../../images/virtual_student_logo_placeholder.png");

class Header extends Component {
  render() {
    return (
      <div className="App-header">
        <Navbar className="container">
          <NavbarGroup className="container" align={Alignment.LEFT}>
            <div className="header_logo">
              <img src={logoImage} className="w50-h50" alt="logo" />
            </div>
            <NavbarHeading>Virtual Student</NavbarHeading>
            <NavbarDivider />
            <AnchorButton
              text="Home"
              minimal
              icon="home"
              onClick={() => this.props.history.push("/")}
            />
            <AnchorButton
              text="Create Reservation"
              minimal
              icon="calendar"
              onClick={() => this.props.history.push("/calendar")}
            />
            <AnchorButton
              text="My Reservations"
              minimal
              icon="timeline-events"
              onClick={() => this.props.history.push("/reservation")}
            />
            <AnchorButton
              text="Robot"
              minimal
              icon="rig"
              onClick={() => this.props.history.push("/robot")}
            />
          </NavbarGroup>
          <NavbarGroup className="container" align={Alignment.RIGHT}>
            <AnchorButton
              text="Log out"
              minimal
              rightIcon="log-out"
              onClick={() => {
                Auth.signOut()
                  .then(data => console.log(data))
                  .catch(err => console.log(err));
              }}
            />
          </NavbarGroup>
        </Navbar>
      </div>
    );
  }
}

export default withRouter(Header);
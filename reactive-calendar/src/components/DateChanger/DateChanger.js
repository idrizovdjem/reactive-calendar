import React, { Component } from "react";
import classes from "./DateChanger.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

class DateChanger extends Component {
  render() {
    return (
      <div className={classes.DateContainer}>
        <span>{this.props.dateLabel}: </span>
        <FontAwesomeIcon
          icon={faAngleLeft}
          className={classes.Button}
          onClick={() => this.props.updateDate(-1)}
        />
        <span>{this.props.dateValue}</span>
        <FontAwesomeIcon
          icon={faAngleRight}
          className={classes.Button}
          onClick={() => this.props.updateDate(1)}
        />
      </div>
    );
  }
}

export default DateChanger;

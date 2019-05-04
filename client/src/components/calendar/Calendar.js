import React, { Component } from "react";
import { DatePicker } from "@blueprintjs/datetime";
import { Tag, Button, Card, Colors, Divider } from "@blueprintjs/core";
import "@blueprintjs/datetime/lib/css/blueprint-datetime.css"; //css for the calendar
import Moment from "react-moment";
import moment from "moment";
import "moment-timezone";
import { withRouter } from "react-router-dom";
import Dates from "./Dates";

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: moment(),
      formatedDate: moment().add(3, "h"),
      availableDates: [],
      selectedTime: ""
    };
  }

  handleChange(date) {
    if (date) {
      this.setState({ selectedDate: date }, () => {
        var momentDate = moment(this.state.selectedDate).format("YYYYMMDD");

        this.setState({
          formatedDate: moment(momentDate).add(3, "hours")
        });

        var url = "/azure/get_reservations?date=" + momentDate;
        console.log(momentDate);
        console.log(url);
        fetch(url)
          .then(res => res.json())
          .then(results => {
            this.setState({ availableDates: results.dates });
            console.log(results.dates);
          })
          .catch(error => console.log(error));
      });
    } else {
      this.setState({
        selectedDate: moment(),
        formatedDate: moment().add(3, "h"),
        availableDates: []
      });
    }
  }

  render() {
    return (
      <Card>
        <div className="calendar">
          <DatePicker
            shortcuts={false}
            minDate={new Date()} //cannot reserve before today
            maxDate={
              new Date(new Date().setFullYear(new Date().getFullYear() + 1))
            } //only allowed one year ahead of today
            onChange={newDate => this.handleChange(newDate)}
            style={{ color: Colors.BLUE1 }}
          />
          <Divider />
          <Card className="side-cal">
            {this.state.availableDates.length !== 0 ? (
              <>
                <Tag key={this.state.selectedDate} icon="calendar">
                  Available Times for{" "}
                  {moment(this.state.selectedDate).format("LL")}
                </Tag>
                <br />
                <Dates
                  availableDates={this.state.availableDates}
                  selectedDate={this.state.selectedDate}
                />
              </>
            ) : null}
          </Card>
        </div>
        <Divider />
        <Card style={{ background: Colors.BLUE2 }}>
          <h5>Date Selected</h5>
          <p>To confirm this date, click confirm</p>
          <Tag key={this.state.selectedDate} icon="calendar">
            <Moment date={this.state.selectedDate} format="LLLL" />
          </Tag>
          <Divider />
          <Button
            rightIcon="arrow-right"
            intent="success"
            text="Confirm"
            onClick={() => {
              this.props.history.push({
                pathname: "/reservations",
                state: { selectedDate: this.state.selectedDate }
              });
            }}
          />
        </Card>
      </Card>
    );
  }
}

export default withRouter(Calendar);

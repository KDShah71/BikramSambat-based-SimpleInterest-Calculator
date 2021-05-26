import React, { useState } from "react";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import "nepali-datepicker-reactjs/dist/index.css";
// import { NepaliDatePicker } from "nepali-datepicker-react";

const NepDate = require("nepali-date");

// const now = new NepDate();

export default function App() {
  // const [date1, setDate1] = useState({});
  // const [date2, setDate2] = useState({});
  const [interest, setInterest] = useState(0);
  const [principal, setPrincipal] = useState(0);
  const [totalMonths, setTotalMonths] = useState(0);
  // const [totalAmt, setTotalAmt] = useState(0);
  const [interestAmt, setInterestAmt] = useState(0);

  const [date1, setDate1] = useState("");
  const [date2, setDate2] = useState("");

  const handleDate1 = (date) => {
    setDate1(date);
    console.log("Date", date);
  };
  const handleDate2 = (date) => {
    setDate2(date);
    console.log("Date", date);
  };

  const handleCalculate = () => {
    // const date1 = new NepDate("2078-01-13");

    // console.log("IS RUNNING", new NepDate(), date1);

    const months = getMonthsBetween(
      new NepDate(date1),
      new NepDate(date2),
      true
    );

    console.log("ALL", principal, months, interest);
    setTotalMonths(months);
    const interestMoney = principal * months * interest * 0.01;

    setInterestAmt(interestMoney);
    // setTotalAmt(principal * months * interest * 0.01 + principal);
  };

  return (
    <div className="App">
      <p>Nepali Byaj Calculator</p>
      <h4>Months : {totalMonths} </h4>
      <h5>Interest : {interestAmt} </h5>

      {/* <h6>Total : {interestAmt + principal} </h6> */}
      <label htmlFor="date1">End Date</label>
      <NepaliDatePicker
        id="date1"
        inputClassName="form-control"
        className=""
        value={date1}
        onChange={handleDate1}
        options={{ calenderLocale: "en", valueLocale: "en" }}
      />
      <label htmlFor="date2">Start Date </label>
      <NepaliDatePicker
        id="date2"
        inputClassName="form-control"
        className=""
        value={date2}
        onChange={handleDate2}
        options={{ calenderLocale: "en", valueLocale: "en" }}
      />
      {/* <NepaliDatePicker
        value={date1}
        format="YYYY-MM-DD"
        onChange={handleDate1}
      />

      <NepaliDatePicker
        value={date2}
        format="YYYY-MM-DD"
        onChange={handleDate2}
      /> */}

      <div
        style={{
          display: "flex",
          margin: "10px 10px",
        }}
      >
        <input
          type="number"
          placeholder="principal"
          name="principal"
          // value={prinipal}
          onChange={(e) => setPrincipal(e.target.value)}
        />
      </div>
      <div
        style={{
          display: "flex",
          margin: "10px 10px",
        }}
      >
        <input
          type="number"
          placeholder="Interest"
          name="interest"
          // value={intrest}
          onChange={(e) => setInterest(e.target.value)}
        />
      </div>
      <button type="button" onClick={handleCalculate}>
        {" "}
        CALCULATE{" "}
      </button>

      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}

//Code extracted from https://stackoverflow.com/a/26930998
function getMonthsBetween(date1, date2, roundUpFractionalMonths) {
  //Months will be calculated between start and end dates.
  //Make sure start date is less than end date.
  //But remember if the difference should be negative.
  var startDate = date1;
  var endDate = date2;
  var inverse = false;
  if (date1 > date2) {
    startDate = date2;
    endDate = date1;
    inverse = true;
  }

  //Calculate the differences between the start and end dates
  var yearsDifference = endDate.getYear() - startDate.getYear();
  console.log("Y", yearsDifference);
  var monthsDifference = endDate.getMonth() - startDate.getMonth();
  console.log("M", monthsDifference);
  var daysDifference = endDate.getDate() - startDate.getDate();
  console.log("D", daysDifference);
  var monthCorrection = 0;
  //If roundUpFractionalMonths is true, check if an extra month needs to be added from rounding up.
  //The difference is done by ceiling (round up), e.g. 3 months and 1 day will be 4 months.
  if (roundUpFractionalMonths === true && daysDifference > 0) {
    monthCorrection = 1;
  }
  //If the day difference between the 2 months is negative, the last month is not a whole month.
  else if (roundUpFractionalMonths !== true && daysDifference < 0) {
    monthCorrection = -1;
  }

  return (
    (inverse ? -1 : 1) *
    (yearsDifference * 12 + monthsDifference + monthCorrection)
  );
}

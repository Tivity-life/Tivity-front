import moment from "moment";

export function getMonthViewStartDate(date, firstDay) {
  firstDay = parseInt(firstDay);
  let start = moment(date);
  let startOfMonth = moment(start.startOf("month"));

  start.subtract(startOfMonth.day(), "days");

  if (startOfMonth.day() < firstDay) {
    start.subtract(7, "days");
  }

  start.add(firstDay, "days");

  return start;
}
export function getMonthViewEndDate(date) {
  return getMonthViewStartDate().add(6, "weeks");
}

export function getDates(currentMonth, firstDay, locale) {
  // calculate 2d-array of each month
  let monthViewStartDate = getMonthViewStartDate(currentMonth, firstDay);
  let calendar = [];
  for (let perWeek = 0; perWeek < 6; perWeek++) {
    let week = [];
    for (let perDay = 0; perDay < 7; perDay++) {
      week.push({
        monthDay: monthViewStartDate.date(),
        isToday: monthViewStartDate.isSame(moment(), "day"),
        isCurMonth: monthViewStartDate.isSame(currentMonth, "month"),
        weekDay: perDay,
        date: moment(monthViewStartDate),
        target: moment(monthViewStartDate)
          .locale(locale)
          .format("YYMMDD"),
      });
      monthViewStartDate.add(1, "day");
    }
    calendar.push(week);
  }
  return calendar;
}

export async function getEvents(userId) {
  return await fetch(
    process.env.VUE_APP_API_URL + "api/user/getEvents?userId=" + userId,
    {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then(res => {
      if (res.status !== 200) {
        console.log("Something went wrong", err);
        return false;
      }
      return res.json();
    })
    .then(events => {
      const _events = {};

      for (const event of events) {
        if (event.target in _events) {
          _events[event.target].push(event);
        } else {
          _events[event.target] = [event];
        }
      }

      return _events;
    })
    .catch(err => {
      console.log("Something went wrong", err);
      return false;
    });
}

export function getTimes() {
  return [
    "00:00",
    "00:15",
    "00:30",
    "00:45",
    "01:00",
    "01:15",
    "01:30",
    "01:45",
    "02:00",
    "02:15",
    "02:30",
    "02:45",
    "03:00",
    "03:15",
    "03:30",
    "03:45",
    "04:00",
    "04:15",
    "04:30",
    "04:45",
    "05:00",
    "05:15",
    "05:30",
    "05:45",
    "06:00",
    "06:15",
    "06:30",
    "06:45",
    "07:00",
    "07:15",
    "07:30",
    "07:45",
    "08:00",
    "08:15",
    "08:30",
    "08:45",
    "09:00",
    "09:15",
    "09:30",
    "09:45",
    "10:00",
    "10:15",
    "10:30",
    "10:45",
    "11:00",
    "11:15",
    "11:30",
    "11:45",
    "12:00",
    "12:15",
    "12:30",
    "12:45",
    "13:00",
    "13:15",
    "13:30",
    "13:45",
    "14:00",
    "14:15",
    "14:30",
    "14:45",
    "15:00",
    "15:15",
    "15:30",
    "15:45",
    "16:00",
    "16:15",
    "16:30",
    "16:45",
    "17:00",
    "17:15",
    "17:30",
    "17:45",
    "18:00",
    "18:15",
    "18:30",
    "18:45",
    "19:00",
    "19:15",
    "19:30",
    "19:45",
    "20:00",
    "20:15",
    "20:30",
    "20:45",
    "21:00",
    "21:15",
    "21:30",
    "21:45",
    "22:00",
    "22:15",
    "22:30",
    "22:45",
    "23:00",
    "23:15",
    "23:30",
    "23:45",
  ];
}

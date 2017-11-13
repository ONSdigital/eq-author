const getFormattedDate = (date, useShortMonthsNames = false) => {
  const monthNames = useShortMonthsNames
    ? [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ]
    : [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];

  return `${date.getUTCDate()} ${monthNames[
    date.getUTCMonth()
  ]} ${date.getUTCFullYear()}`;
};

export default getFormattedDate;

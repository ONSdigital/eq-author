const getDateStr = (day, month, year) => `${day}-${month}-${year}`;

const validateDate = ({ day, month, year }) => {
  const date = new Date(year, month - 1, day);

  return (
    getDateStr(day, month, year) ===
    getDateStr(date.getDate(), date.getMonth() + 1, date.getFullYear())
  );
};

export default validateDate;

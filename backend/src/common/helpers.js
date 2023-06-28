// Helper function for getting number of months based on plan

exports.getNumberOfMonths = async (type) => {
  // filtering plan
  switch (type) {
    case "Monthly":
      return 1;
      break;
    case "Quarterly":
      return 3;
      break;
    default:
      return 6;
      break;
  }
};

// helper for converting the duration from time like 2:30 hours to seconds
exports.convertTimeToSecond = (duration) => {
  if (duration) {
    // getting minutes and seconds from incoming duration
    const [hours, minutes, seconds] = duration.split(":");
    // converting min to second
    return hours * 3600 + minutes * 60 + parseInt(seconds);
  }
  return null;
};

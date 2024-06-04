function calculatePayroll(allEmpRecords) {
    const empPayForPeriod = [];
    allEmpRecords.forEach(emp => empPayForPeriod.push(allWagesFor(emp)));
    return empPayForPeriod.reduce((totalPay, empPay) => totalPay + empPay);
  }
  
  function allWagesFor(empRecord) {
    const empDailyPay = [];
    empRecord.timeInEvents.forEach(punchIn => empDailyPay.push(wagesEarnedOnDate(empRecord, punchIn.date)));
    return empDailyPay.reduce((totalPay, dailyPay) => totalPay + dailyPay, 0);
  }
  
  function wagesEarnedOnDate(empRecord, workDate) {
    return empRecord.payPerHour * hoursWorkedOnDate(empRecord, workDate);
  }
  
  function hoursWorkedOnDate(empRecord, workDate) {
    const inTime = getInOutHour(empRecord, workDate, 'In');
    const outTime = getInOutHour(empRecord, workDate, 'Out');
    return (outTime - inTime)/100;
  }
  
  function getInOutHour(empRecord, workDate, dir) {
    const dateIndex = empRecord[`time${dir}Events`].findIndex(element => element.date === workDate);
    return empRecord[`time${dir}Events`][dateIndex].hour;
  }
  
  function createTimeOutEvent(empRecord, timeDate) {
    const updEmpRecord = empRecord;
    updEmpRecord.timeOutEvents.push(createNewTimeEvent(timeDate, 'Out'));
    return updEmpRecord;
  }
  
  function createTimeInEvent(empRecord, timeDate) {
    const updEmpRecord = empRecord;
    updEmpRecord.timeInEvents.push(createNewTimeEvent(timeDate, 'In'));
    return updEmpRecord;
  }
  
  function createNewTimeEvent(timeDate, dir) {
    const newTimeEvent = {}
    newTimeEvent.type = `Time${dir}`;
    newTimeEvent.date = timeDate.slice(0, 10);
    newTimeEvent.hour = parseInt(timeDate.slice(11));
  
    return newTimeEvent;
  }
  
  function createEmployeeRecords(allEmpInfo) {
    const allEmpRecords = [];
        allEmpInfo.forEach(emp => allEmpRecords.push(createEmployeeRecord(emp)));
  
    return allEmpRecords;
  }
  
  function createEmployeeRecord(empInfo) {
    const empRecord = {};
    empRecord.firstName = empInfo[0];
    empRecord.familyName = empInfo[1];
    empRecord.title = empInfo[2];
    empRecord.payPerHour = empInfo[3];
    empRecord.timeInEvents = [];
    empRecord.timeOutEvents = [];
  
    return empRecord;
  }
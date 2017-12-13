import deep from 'deep-obj';

export function getErrorMessage(err) {
  try {
    var ia = deep.get(err, 'response.data.invalidAttributes') || {};
    var key = Object.keys(ia)[0];
    var msg = (deep.get(ia, `${key}[0].message`) || '').split('\n')[0];
    if (msg) {
      msg = key + ': ' + msg;
    }
    else {
      msg = deep.get(err, 'response.data.details') ||
        deep.get(err, 'response.data.msg') ||
        deep.get(err, 'response.data.message') ||
        deep.get(err, 'message') ||
        deep.get(err, 'msg') || '';
    }
    return msg;
  }
  catch (ex) {
    return 'Error';
  }
}

export function getLastDayOfWeek() {
  var curr = new Date;
  var first = curr.getDate() - curr.getDay() + 1;
  var last = first + 6;

  var lastDay = new Date(curr.setDate(last));
  lastDay.setHours(23);
  lastDay.setMinutes(59);
  lastDay.setSeconds(59);
  lastDay.setMilliseconds(0);
  return lastDay;
}

export function getFirstDayOfWeek() {
  var curr = new Date;
  var first = curr.getDate() - curr.getDay() + 1;
  var last = first + 6;

  var firstday = new Date(curr.setDate(first));
  firstday.setHours(0);
  firstday.setMinutes(0);
  firstday.setSeconds(0);
  firstday.setMilliseconds(0);
  return firstday;
}

export function startDay(s) {
  s = s || new Date();
  var d = new Date(s);
  d.setHours(0);
  d.setMinutes(0);
  d.setSeconds(0);
  d.setMilliseconds(0);
  return d;
}

export function midDay(s) {
  s = s || new Date();
  var d = new Date(s);
  d.setHours(12);
  d.setMinutes(0);
  d.setSeconds(0);
  d.setMilliseconds(0);
  return d;
}

export function endDay(s) {
  s = s || new Date();
  var d = new Date(s);
  d.setHours(23);
  d.setMinutes(59);
  d.setSeconds(59);
  d.setMilliseconds(0);
  return d;
}
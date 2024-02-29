const updateTime = () => {
  const timeContainer = document.getElementById('time');
  const dateContainer = document.getElementById('date');
  const timezoneContainer = document.getElementById('timezone');

  const now = dayjs();
  
  timeContainer.textContent = now.format('HH:mm:ss');
  dateContainer.textContent = now.format('dddd, D MMMM, YYYY');
  timezoneContainer.textContent = Intl.DateTimeFormat().resolvedOptions().timeZone;
}

setInterval(updateTime, 1000);
updateTime();
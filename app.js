    var monthNames = ["Sausis", "Vasaris", "Kovas", "Balandis", "Gegužė", "Birželis", "Liepa", "Rugpjūtis", "Rugsėjis", "Spalis", "Lapkritis", "Gruodis"],
    dayNames = ["P", "A", "T", "K", "Pn", "Š", "S"],
    dayNamesFull = ["Pirmadienis", "Antradienis", "Trečiadienis", "Ketvirtadienis", "Penktadienis", "Šeštadienis", "Sekmadienis"],
    tablecontents,
    holidays_data,
    holidaysArray = [],
    temp,
    holDescript,
    day_class ;

function createCalendar(){
  createNormalCalendar();
}

function checkCalStatus(){
  var checkedin = document.getElementById("vertinput").checked;
    if(checkedin == true) {
    createNormalCalendar();
  } else {
    createWorkCalendar();
  }
}

function compare(a,b) {
  if (a.day < b.day)
    return -1;
  if (a.day > b.day)
    return 1;
  return 0;
}

function checkHolidays(year, monthVal, wday){ 
  var dayNum;
  var descript;
  holDescript = "<div class = 'celldescription'>";
  for (var i = 0; i < holidays_data[0].universal.length; i++){
    // check holidays and color it red
    dayNum = holidays_data[0].universal[i].day;
    
    if (holidays_data[0].universal[i].month == monthVal+1 && dayNum == wday){
      descript = holidays_data[0].universal[i].descript;
      holidaysArray.push({
          month: monthVal+1,
          day: wday,
          descript: descript
        });
      holidaysArray.sort(compare);
      day_class = "day day_weekend redDay";
      holDescript += "<p>"+ descript +"</p>"; //inserts holiday description to cell
    }
  }
  for (var i = 0; i < holidays_data[0].years.length; i++){ 
    // check holidays and color it red
    var yearUniq;
    var monthUniq;
    var dayUniq;
    var descriptionUniq;
    for (var j = 0; j < holidays_data[0].years[i].holidays.length; j++){
      yearUniq = holidays_data[0].years[i].year;
      monthUniq = holidays_data[0].years[i].holidays[j].month;
      dayUniq = holidays_data[0].years[i].holidays[j].day;
      descriptionUniq = holidays_data[0].years[i].holidays[j].descript;
      
      if (yearUniq == year && monthUniq == monthVal+1 && dayUniq == wday){
        holidaysArray.push({
          month: monthUniq,
          day: dayUniq,
          descript: descriptionUniq
        });
        holidaysArray.sort(compare);
        day_class = "day day_weekend redDay";
        holDescript += "<p>"+ descriptionUniq +"</p>"; // inserts holiday description to cell
      }
    }
  }
  holDescript+="</div>";
}

function clearHolidays(){
  holidaysArray.length = 0;
}

function createFooter(monthVal){
  temp = "";
  temp += "<tfoot>";
  for (var y = 0; y < holidaysArray.length; y++){ // check holidays description and write it below month
    if (monthVal == holidaysArray[y].month-1){
      temp += "<tr><th colspan='7'>"+ holidaysArray[y].day + " d. " + holidaysArray[y].descript + "</th></tr>";
    }
  }
  temp += "</tfoot>";
}

function createNormalCalendar() {  // vertical view (vw)
    
    clearHolidays();
    tablecontents = "";

    //  Create and fill calendar
    //   get current year and fill days_in_month array with number of month days that year
  var year = document.getElementById("year").value;
  var days_in_month = [];
  
    // create array with month days count
  for (var i = 0; i < 12; i++) {
    var num_of_days = new Date(year, i + 1, 0).getDate();
    days_in_month.push(num_of_days);

  // fill month  
    tablecontents += "<table class='months'>";
    tablecontents += "<thead>";
    tablecontents += "<tr class='month_name'><th colspan=7>" + monthNames[i] + "</th></tr>";
    tablecontents + "</thead>";
    tablecontents += "<tbody>";

    // fill week days names
    tablecontents += "<tr>";
    for (var d = 0; d <= 6; d++) {
      day_class = d > 4 ? "day_name day_weekend" : "day_name";
      tablecontents += "<td class='" + day_class + "'>" + dayNames[d] + "</td>";
    }
    tablecontents += "</tr>";

    // fill days in month
    var starting_day = new Date(year, i, 0).getDay();
    var day = 1;

    // set week number (column) cycle
    for (var weekNum = 0; weekNum <= 6; weekNum++) {
      tablecontents += "<tr>";

      // calendar view / place days (empty rows) during week 
      for (var weekDay = 0; weekDay <= 6; weekDay++) {
        day_class = weekDay > 4 ? "day day_weekend redDay" : "day";
        if (day <= days_in_month[i] && (weekNum > 0 || weekDay >= starting_day)) {
          // insert holidays function here
          checkHolidays(year, i, day);
          tablecontents +=  "<td class='" + day_class + "'>"+ day + "</td>";
          day++;
        }
        else {
          tablecontents += "<td></td>";
        }
      }
      tablecontents += "</tr>";
    }
    
    tablecontents += "</tbody>";

    createFooter(i);
    
    tablecontents += temp;  // inserts table footer with holidays 

    tablecontents += "</table>";
  } //end of month cycle

  document.getElementById("calSpace").innerHTML = tablecontents;
}

function createWorkCalendar() { //horizontal view (hw) to write day tasks
  clearHolidays();

  tablecontents = "";

    //  Create and fill calendar
    //   get current year and fill days_in_month array with number of month days that year
  var year = document.getElementById("year").value;
    // create array with month days count
  var days_in_month = [];
  for (var i = 0; i < 12; i++) {
    var num_of_days = new Date(year, i + 1, 0).getDate();
    days_in_month.push(num_of_days);

  // fill month  
    tablecontents += "<table class='months_w'>";
    tablecontents += "<thead>";
    tablecontents += "<tr class='month_name_w'><th colspan='7'>" + year + " m. " + monthNames[i] + "</th></tr>";
    tablecontents += "</thead>";
    tablecontents += "<tbody>";

    // fill week days names
    for (var dayNum = 0; dayNum <= 6; dayNum++) {
      // fill days in month
      var starting_day = new Date(year, i, 0).getDay();
      var curentDay;

      tablecontents += "<tr>";
      day_class = dayNum > 4 ? "day_name day_weekend" : "day_name";
      tablecontents += "<td class='" + 'day_names_w_style' + day_class + "'>"+ dayNamesFull[dayNum] + "</td>";

      // calendar view / place days (empty rows) through week 
      for (var day = 0; day <= days_in_month[i] + 4; day += 7) {  // +4 for long months > 5 weeks
        var tempCurent = day + dayNum + 1; //for changing days
        var thisDay = tempCurent - starting_day;
        if (thisDay <= days_in_month[i] && tempCurent > starting_day){
          day_class = dayNum > 4 ? "day day_weekend day_horizontal redDay" : "day day_horizontal";
          // insert holidays function here
          checkHolidays(year, i, thisDay);
          // writeHolidayDescription(year, i, thisDay);
          curentDay = "<td class='" + day_class + "'><p class='nums'>" + thisDay + "</p>" + holDescript+"</td>";
        } else {
          curentDay = "<td></td>";
        }
        tablecontents += curentDay;
      }
      
    tablecontents += "</tr>";
    }
    
    tablecontents += "</tbody>";
    
    tablecontents += "</table>";

  } //end of month cycle

  document.getElementById("calSpace").innerHTML = tablecontents;
  
}
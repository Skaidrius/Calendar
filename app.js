    var monthNames = ["Sausis", "Vasaris", "Kovas", "Balandis", "Gegužė", "Birželis", "Liepa", "Rugpjūtis", "Rugsėjis", "Spalis", "Lapkritis", "Gruodis"],
    dayNames = ["P", "A", "T", "K", "Pn", "Š", "S"],
    tablecontents,
    holidays_data,
    temp,
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

function checkHolidays(year, monthVal, wday){ // not working yet
  var dayNum;
  for (var i = 0; i < holidays_data[0].universal.length; i++){
    // check holidays and color it red
    dayNum = holidays_data[0].universal[i].day;
    if (holidays_data[0].universal[i].month == monthVal+1 && dayNum == wday){
      var description = holidays_data[0].universal[i].descript;
      day_class += "day day_weekend redDay";
      // check holidays description and write it below month
      temp = "";
      temp += "<tfoot>";
      temp += "<tr>";
      temp += "<th colspan='7'>"+ dayNum + " d. " + description + "</th>";
      temp += "</tr>";
      temp += "</tfoot>";
    } 
  }
}

function createNormalCalendar() {  // vertical view (vw)
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
        day_class = weekDay > 4 ? "day day_weekend" : "day";
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

    tablecontents += temp;  // inserts table footer with holidays 

    tablecontents += "</table>";
  } //end of month cycle

  document.getElementById("calSpace").innerHTML = tablecontents;
}

function createWorkCalendar() { //horizontal view (hw) to write day tasks

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
    tablecontents += "<tr class='month_name_w'><th colspan=7>" + year + " m. " + monthNames[i] + "</th></tr>";
    tablecontents += "</thead>";
    tablecontents += "<tbody>";

    // fill week days names
    for (var dayNum = 0; dayNum <= 6; dayNum++) {
      tablecontents += "<tr class='dayRow_w'>";
      day_class = dayNum > 4 ? "day_name_w day_weekend" : "day_name_w";
      tablecontents += "<td class='" + day_class + "'>"+ dayNames[dayNum] + "</td>";
  
      // fill days in month
      var starting_day = new Date(year, i, 0).getDay();
      var curentDay;
      var day_class;

      // calendar view / place days (empty rows) through week 
      for (var day = 0; day <= days_in_month[i] + 4; day += 7) {  // +4 for long months > 5 weeks
        var tempCurent = day + dayNum + 1; //for changing days
        var thisDay = tempCurent - starting_day;
        if (thisDay <= days_in_month[i] && tempCurent > starting_day){
          day_class = dayNum > 4 ? "day_weekend day_w day_horizontal redDay" : "day_w day_horizontal";
          // insert holidays function here
          checkHolidays(year, i, thisDay);
          curentDay = "<td class='" + day_class + "'><p class='nums'>" + thisDay + "</p></td>";
        } else {
          curentDay = "<td></td>";
        }
        tablecontents += curentDay;
      }
      
    tablecontents += "</tr>";
    }
    
    tablecontents += "</tbody>";
    
    tablecontents += temp;  // inserts table footer with holidays

    tablecontents += "</table>";
    

  } //end of month cycle

  document.getElementById("calSpace").innerHTML = tablecontents;
  
}
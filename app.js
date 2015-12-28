    var months = ["Sausis", "Vasaris", "Kovas", "Balandis", "Gegužė", "Birželis", "Liepa", "Rugpjūtis", "Rugsėjis", "Spalis", "Lapkritis", "Gruodis"],
    days = ["P", "A", "T", "K", "Pn", "Š", "S"],
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


function createNormalCalendar() {  // vertical view (vw)
  
    var tablecontents = "";

    //  Create and fill calendar

    //   get current year and fill days_in_month array with number of month days that year
  var year = document.getElementById("year").value;
    var days_in_month = [];
    // create array with month days count
  for (var i = 0; i < 12; i++) {
    var num_of_days = new Date(year, i + 1, 0).getDate();
    days_in_month.push(num_of_days);
  }

  // fill month  
  for (var i = 0; i < 12; i++) {
    tablecontents += "<table class='months'>";
    tablecontents += "<thead>" + "<tr class='month_name'>" + "<th colspan=7>" + months[i] + "</th>" + "</tr>" + "</thead>";
    tablecontents += "<tbody>";

    // fill week days names
    tablecontents += "<tr>";
    for (var d = 0; d <= 6; d++) {
      day_class = d > 4 ? "<td class='day_name day_weekend'>" : "<td class='day_name'>";
      tablecontents += day_class + days[d] + "</td>";
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
        day_class = weekDay > 4 ? "<td class='day_weekend'>" : "<td class='day'>";
        if (day <= days_in_month[i] && (weekNum > 0 || weekDay >= starting_day)) {
          tablecontents += day_class + day + "</td>";
          day++;
        }
        else {
          tablecontents += "<td></td>";
        }
      }
      tablecontents += "</tr>";
    }
    tablecontents += "</tbody>";

    // insert holidays /not working yet!!!
    tablecontents += "<tfoot>";

    // if (holidays_data[0].year == year && holidays_data[0].holidays[i].month == i+1){
    //     tablecontents += "<tr><th colspan=7>Nedarbo dienos:</th></tr>";
    //     for (var month_i= 0; month_i < holidays_data[0].holidays.length; month_i++){
    //         tablecontents += "<tr>";
    //         tablecontents += "<td colspan=7>" + holidays_data[0].holidays[month_i].description + "</td>";
    //         tablecontents += "</tr>";
    //     }
    //     alert(holidays_data[year_i].year);
    // if (holidays_data[year_i].year == year && holidays_data[year_i].holidays[month_i] == i){
    //     tablecontents += "<th colspan=7>Nedarbo dienos:</th>";
    // }
    // alert(holidays_data[ye].year);
    tablecontents += "</tfoot>";
    tablecontents += "</table>";
  } //end of month cycle

  document.getElementById("calSpace").innerHTML = tablecontents;

}

function createWorkCalendar() { //horizontal view (hw)  to write day tasks

  var tablecontents = "";

    //  Create and fill calendar
    //   get current year and fill days_in_month array with number of month days that year
  var year = document.getElementById("year").value;
    // create array with month days count
  var days_in_month = [];
  for (var i = 0; i < 12; i++) {
    var num_of_days = new Date(year, i + 1, 0).getDate();
    days_in_month.push(num_of_days);
  }

  // fill month  
  for (var i = 0; i < 12; i++) {
    
    tablecontents += "<table class='months_w'>";
    tablecontents += "<thead>" + "<tr class='month_name_w'>" + "<th colspan=7>" + months[i] + "</th>" + "</tr>" + "</thead>";
    tablecontents += "<tbody>";

    // fill week days names
    for (var n = 0; n <= 6; n++) {
      tablecontents += "<tr class='dayRow_w'>";
      day_class = n > 4 ? "<td class='day_name_w day_weekend'>" : "<td class='day_name_w'>";
      tablecontents += day_class + days[n] + "</td>";
  
      // fill days in month
      var starting_day = new Date(year, i, 0).getDay();
      var curentDay;
      var day_class;

      // calendar view / place days (empty rows) through week 
      for (var day = 0; day <= days_in_month[i]+4; day+=7) {  // +4 for long months > 5 weeks
        var tempCurent = day + n + 1; //changing days
        var starting = day-starting_day+n+1;
        if (starting <= days_in_month[i] && tempCurent > starting_day){
          day_class = n > 4 ? "<td class='day_name_w day_weekend day_w day_horizontal'>" : "<td class='day_w day_horizontal'>";
          curentDay = day_class + "<p class='nums'>" + starting + "</p></td>";
        } else {
          curentDay = "<td></td>";
        }
        tablecontents += curentDay;
      }
      
    tablecontents += "</tr>";
    }
    
    tablecontents += "</tbody>";

    // insert holidays function here
    tablecontents += "</table>";

  } //end of month cycle

  document.getElementById("calSpace").innerHTML = tablecontents;
  
}
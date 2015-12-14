function CreateTable() {
      var tablecontents = "", 
      //   get current year from select
      year = document.getElementById("year").value,
      months = ["Sausis", "Vasaris", "Kovas", "Balandis", "Gegužė", "Birželis", "Liepa", "Rugpjūtis", "Rugsėjis", "Spalis", "Lapkritis", "Gruodis"], 
      days = ["P", "A", "T", "K", "Pn", "Š", "S"],  
      day_class,
      days_in_month = [];

    //  Create and fill calendar
        // create array with month days count
      for (var i = 0; i < 12; i++) {
        var num_of_days = new Date(year, i+1, 0).getDate();
        days_in_month.push(num_of_days);
      }
        
        // fill month  
      for (var i = 0; i < 12; i++) {
        tablecontents += "<table class='months'>";
        tablecontents += "<thead>"+"<tr class='month_name'>"+"<th colspan=7>"+months[i]+ "</th>"+"</tr>"+"</thead>";
        tablecontents += "<tbody>";

        // fill week days names
        tablecontents += "<tr>"; 
        for (var d = 0; d <=6 ; d++) {	
          day_class = d > 4 ? "<td class='day_name day_weekend'>" : "<td class='day_name'>";
          tablecontents+= day_class + days[d] + "</td>";
        }
        tablecontents +="</tr>";

        // fill days in month
        var starting_day = new Date(year, i, 0).getDay();
        var day = 1; 
        
            // set week number (column) cycle
        for (var weekNum = 0; weekNum <= 6; weekNum ++) {
          tablecontents += "<tr>"; 
          
                // calendar view / place days (empty rows) during week 
          for (var weekDay = 0; weekDay <= 6; weekDay ++) {
            day_class = weekDay > 4 ? "<td class='day_weekend'>" : "<td class='day'>";
            if (day <= days_in_month[i] && (weekNum > 0 || weekDay >= starting_day)) {
              tablecontents += day_class + day + "</td>";
              day++;
            } else {
              tablecontents += "<td></td>";
            }
          }
        tablecontents +="</tr>";
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


document.getElementById("tablespace").innerHTML = tablecontents;
}

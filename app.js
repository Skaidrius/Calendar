function CreateTable() {
      var tablecontents = "", 
      days = ["P", "A", "T", "K", "Pn", "Š", "S"], 
      day_class,
      months = ["Sausis", 
    "Vasaris", "Kovas", "Balandis", "Gegužė", "Birželis", "Liepa", "Rugpjūtis", "Rugsėjis", "Spalis", "Lapkritis", "Gruodis"],
      temp_year =2016,
      days_in_month = [];
      
    //   get current year from select
      temp_year = document.getElementById("year").value;
      year=temp_year;

    //   create array with month days count
      for (var i = 0; i < 12; i++) {
        var num_of_days = new Date(year, i+1, 0).getDate();
        days_in_month.push(num_of_days);
      }
        
    // fill month  
      for (var i = 0; i < 12; i++) {
        tablecontents += "<table class='months'>";
        tablecontents += "<theader>"+"<tr class='month_name'>"+"<th colspan=7>"+months[i]+ "</th>"+"</tr>"+"</theader>";
        tablecontents += "<tbody>";

        // fill week kays names
        tablecontents += "<tr>"; 
        for (var d = 0; d <=6 ; d++) {	
          day_class = d > 4 ? "<td class='day_name day_weekend'>" : "<td class='day_name'>";
          tablecontents+= day_class + days[d] + "</td>";
        }
        tablecontents +="</tr>";

        // fill days in month
        var starting_day = new Date(year, i, 0).getDay();
        var day = 1; 
        
        // set week number
        for (var weekNum = 0; weekNum <= 6; weekNum ++) {
          tablecontents += "<tr>"; 
          
        //   set days during week
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
        
        // insert holidays
        tablecontents += "<tfooter>";
        
        // if (holidays_data[0].year == year){};



        // for (var month_i = 0; month_i < holidays_data[year].holidays.length; month_i++) {
        //     if (month_i == i) {
        //         holiday = holidays_data[year].holidays[month_i+1].day + " d. "+ holidays_data[year].holidays[month_i+1].description;
        //         tablecontents += "<tr>";
        //         tablecontents += "<th colspan=7>Nedarbo dienos:</th>";
        //         tablecontents += "<td>" + holiday + "</td></tr>";
        //     }
        // }

        // tablecontents += "</tr>";
        tablecontents += "</tfooter>";
        tablecontents += "</table>";
    // }

document.getElementById("tablespace").innerHTML = tablecontents;
}



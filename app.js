function CreateTable() {
      var tablecontents = "", 
      days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], 
      day_class,
      months = ["January", 
    "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      year,
      days_in_month = [];
      
      var temp_year = document.getElementById("year").value;
      year=temp_year;

  
      for (var i = 0; i < 12; i++) {
        var num_of_days = new Date(year, i+1, 0).getDate();
        days_in_month.push(num_of_days);
      }
  
      for (var i = 0; i < 12; i++) {
        tablecontents += "<table class='months'>";
        tablecontents += "<theader>"+"<tr class='month_name'>"+"<th colspan=7>"+months[i]+ "</th>"+"</tr>"+"</theader>";
        tablecontents += "<tbody>";

        tablecontents += "<tr>"; 
        for (var d = 0; d <=6 ; d++) {	
          day_class = d > 4 ? "<td class='day_name day_weekend'>" : "<td class='day_name'>";
          tablecontents+= day_class + days[d] + "</td>";
        }
        tablecontents +="</tr>";

        var starting_day = new Date(year, i, 0).getDay();
        var day = 1; 
        for (var dd = 0; dd <= 6; dd ++) {
          tablecontents += "<tr>"; 
          for (var dw = 0; dw <= 6; dw ++) {
            day_class = dw > 4 ? "<td class='day_weekend'>" : "<td class='day'>";
            if (day <= days_in_month[i] && (dd > 0 || dw >= starting_day)) {
              tablecontents += day_class + day + "</td>";
              day++;
            } else {
              tablecontents += "<td></td>";
            }
          }
        }
        tablecontents +="</tr>";
        
        tablecontents += "<tbody>";
        tablecontents += "</table>";
      }

document.getElementById("tablespace").innerHTML = tablecontents;
}

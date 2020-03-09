$("#currentDay").text(moment().format("MMMM Do YYYY, h:mm:ss a"));

//render stored events to html
$.each(localStorage, function render(key, value) {
  $("#" + key).find("textarea").val(value);
});

//clear out local storage and events rendered earlier
$("#clear").click(function() {
  localStorage.clear();
  $("textarea").each(function() {
    $(this).val("");
  });
});

//save user's event into local storage using the hours as key
$(".save").click(function() {
  let eventContent = $(this).prev().find("textarea").val();
  let eventTime = $(this).parent().attr("id");
  localStorage.setItem(eventTime, eventContent);
});

//color code the events based on current time
let currentHour = parseInt(moment().hours());
$("tr").each(function() {
  let blockHour = parseInt($(this).attr("id"));
  //clean up the previous classes added
  $(this).removeClass();
  //color code the row
  if (blockHour < currentHour) {
    $(this).addClass("past");
  } else if (blockHour > currentHour) {
    $(this).addClass("future");
  } else {
    $(this).addClass("present");
  }
});

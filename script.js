$("#currentDay").text(moment().format("MMMM Do YYYY, h:mm:ss a"));

//render stored events to html
$.each(localStorage, function(key, value) {
  $("#" + key).find("textarea").val(value);
});

//clear out local storage and events rendered earlier
$("#clearAll").click(function() {
  localStorage.clear();
  $("textarea").each(function() {
    $(this).val("");
  });
});

//save events entered all together
$("#saveAll").click(function() {
  let events = $("textarea").toArray();
  $.each(events, function(index,textArea) {
    if(textArea.value!==""){
      localStorage.setItem(index+9, textArea.value)
    }
  });
});


//save user's event into local storage using the hours as key
$(".saveBtn").click(function() {
  let eventContent = $(this).parent().parent().siblings().find("textarea").val();
  let eventTime = $(this).parent().parent().parent().attr("id");
  localStorage.setItem(eventTime, eventContent);
});

//delete user's event into local storage using the hours as key
$(".trashBtn").click(function() {
  $(this).parent().parent().siblings().find("textarea").val("");
  let eventTime = $(this).parent().parent().parent().attr("id");
  localStorage.removeItem(eventTime);
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

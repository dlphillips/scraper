// Whenever someone clicks a p tag

$(".noteBtn").click(function() {
    // Empty the notes from the note section
    $("#notes").empty();
    // Save the id from the p tag
    var thisId = $(this).attr("data-id");

    // Now make an ajax call for the Article
    $.ajax({
            method: "GET",
            url: "/articles/" + thisId
        })
        // build note modal
        .done(function(data) {
            console.log(data);
            $("#notes").append("<div class='modal-header'><h4 class='modal-title'>" + data.title + "</h4></div>");
            $("#notes").append("<div class='modal-body'><textarea id='bodyinput' name='body' placeholder='Enter comment here'></textarea></div>");
            $("#notes").append("<div class='modal-footer'><button class='btn btn-primary' data-id='" + data._id + "' id='savenote'>Save Comment</button></div>");
            if (data.note) {
                // Place the body of the note in the body textarea
                $("#bodyinput").val(data.note.body);
            }
            $("#myModal").modal();
        });
});

// When you click the savenote button
$(document).on("click", "#savenote", function() {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");

    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
            method: "POST",
            url: "/articles/" + thisId,
            data: {
                // Value taken from note textarea
                body: $("#bodyinput").val()
            }
        })
        // With that done
        .done(function(data) {
            // Log the response
            console.log(data);
            // Empty the notes section
            $("#notes").empty();
        });

    // Also, remove the values entered in the input and textarea for note entry
    $("#bodyinput").val("");
    $("#myModal").modal('hide');
});

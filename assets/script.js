console.log("linked");

$(document).ready(function () {
    console.log("doc rdy");

    buttons = ["Silly Cat", "Silly "];
    buttons.forEach(e => {
        var $newButton = $("<button>").addClass("gif-button").attr("data-name", e).text(e);
        $(".dynamic-buttons").append($newButton);
    });


    $(".button-form").submit(function () {
        event.preventDefault();
        $(".dynamic-buttons").empty();
        var inputValue = $(".category-input").val();

        if (buttons.indexOf(inputValue) === -1) {
            buttons.push(inputValue);
            
        }
        for (let i = 0; i < buttons.length; i++) {
        var newButton = $("<button>").addClass("gif-button").attr("data-name",buttons[i]).text(buttons[i]);
        $(".dynamic-buttons").append(newButton);
    
                }

        

        console.log(buttons);


        $(".button-form")[0].reset();
    });

    $(document).on("click", ".gif-button", function () {
        var category = $(this).data("name");
        console.log("gif button clicked, ajax calling for " + category);
        var URL = "https://api.giphy.com/v1/gifs/random?tag=" + category + "&limit=15&api_key=2jtJDFbq9PVgzDvF8b3BZ2QPWvVmM0wy";

        $.ajax({
            url: URL,
            method: "GET"
        }).then(function (response) {
            console.log(response);

            var animated = response.data.image_original_url;
            var still = response.data.images.original_still.url;

            

            var div = $("<div>").addClass("gif-wrap").append($("<img>").addClass("gif").attr("src", animated));

            $(".gifs").prepend(div);



        })
    });
});
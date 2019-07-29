console.log("linked");

$(document).ready(function () {
    console.log("doc rdy");

    buttons = ["Silly", " Extra Silly", "Serious"];
    buttons.forEach(e => {
        var $newButton = $("<button>").addClass("gif-button").attr("data-name", e).text(e);
        $(".dynamic-buttons").append($newButton);
    });


    $(".button-form").submit(function () {
        event.preventDefault();
        $(".dynamic-buttons").empty();
        var inputValue = $(".category-input").val();

        if (buttons.indexOf(inputValue) === -1 && inputValue !== "") {
            buttons.push(inputValue);
        }
        for (let i = 0; i < buttons.length; i++) {
            var newButton = $("<button>").addClass("gif-button").attr("data-name", buttons[i]).text(buttons[i]);
            $(".dynamic-buttons").prepend(newButton);
        }
        console.log(buttons);
        $(".button-form")[0].reset();
    });

    $(document).on("click", ".gif-button", function () {
        $(".gifs").empty();
        var category = $(this).data("name");
        console.log("gif button clicked, ajax calling for " + category);

        var URL = "https://api.giphy.com/v1/gifs/search?q=" + category + "&limit=10&api_key=2jtJDFbq9PVgzDvF8b3BZ2QPWvVmM0wy";

        $.ajax({
            url: URL,
            method: "GET"
        }).then(function (response) {
            console.log(response);

            for (let i = 0; i < 10; i++) {
                var animated = response.data[i].images.original.url;
                var still = response.data[i].images.original_still.url;
                var div = $("<div>");
                div.addClass("gif-wrap");
                // div.attr("data-state", still);
                // div.attr("data-still", still);
                // div.attr("data-animated", animated);

                // need to attach the links to still and animated to each div or img somehow. then make an onclick for swapping the states

                var gifImage = $("<img>");
                gifImage.addClass("gif");
                gifImage.attr("alt", "gif error");
                gifImage.attr("data-state", "still");
                gifImage.attr("data-still", still);
                gifImage.attr("data-animated", animated);
                gifImage.attr("src", still);
                div.append(gifImage);
                $(".gifs").prepend(div);
            }
        })

    });

    $(document).on("click", ".gif", function () {
        console.log("gif clicked");
        console.log(this);

        if ($(this).attr("data-state") === "still" ){
        $(this).attr("src", $(this).data("animated"));
        $(this).attr("data-state", "animated");
        }

        else {
            $(this).attr("src", $(this).data("still"));
            $(this).attr("data-state", "animated");

        }

    })
});
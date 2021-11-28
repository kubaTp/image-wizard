window.onload = () => {
    document.getElementById("tell_more_button").addEventListener("click", () => {
        let problemform = document.getElementById("problem-form");
        let problemformopacity = window.getComputedStyle(problemform).getPropertyValue("opacity");

        if(problemformopacity == "0")
            problemform.style.opacity = "1";
        else
            problemform.style.opacity = "0";
    })

    document.getElementById("tell_more_button").addEventListener("mouseover", () => {
        document.getElementById("tell_more_button").style.color = "rgb(96, 96, 96)";
    })

    document.getElementById("tell_more_button").addEventListener("mouseout", () => {
        document.getElementById("tell_more_button").style.color = "rgba(96, 96, 96, 0.8)";
    })
}
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

    const items = document.getElementsByClassName('item');

    for(var i = 0; i < items.length; i++)
    {
        let item = items[i];
 
        item.addEventListener("mouseover", () => {            
            src = item.children[0].src;            
            //http://127.0.0.1:5000/static/img/mail.png
            var regex = new RegExp(/http:\/\/127.0.0.1:5000\/static\/img\/(.*?).png/);
            const rootName = regex.exec(src)[1];
            const newName = rootName + "_hover.png";
            //console.log(newName);

            item.children[0].src = "http://127.0.0.1:5000/static/img/" + newName;
        })

        item.addEventListener("mouseout", () => {            
            src = item.children[0].src;
            //http://127.0.0.1:5000/static/img/mail.png
            var regex = new RegExp(/http:\/\/127.0.0.1:5000\/static\/img\/(.*?)_hover.png/);
            const newName = regex.exec(src)[1] + ".png";

            item.children[0].src = "http://127.0.0.1:5000/static/img/" + newName;            
        })
    }

    //console.log(document.getElementById("image-content").innerText);
}

togglePopup = () => {
    document.getElementById("pop-up").style.visibility = "visible";
    document.getElementById("pop-up").style.opacity = "1";
    document.getElementById("background").style.visibility = "visible";
    document.getElementById("background").style.opacity = "1";

    document.getElementById("pop-up-content").innerText = document.getElementById("image-content").innerText;

    return false;
}

closePopup = () => {
    document.getElementById("pop-up").style.visibility = "hidden";
    document.getElementById("pop-up").style.opacity = "0";
    document.getElementById("background").style.visibility = "hidden";
    document.getElementById("background").style.opacity = "0";
}

window.onload = () => {
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
            console.log(newName);

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
}
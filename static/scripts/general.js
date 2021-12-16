function itemOn(val) 
{
    src = val.children[0].src;

    //http://127.0.0.1:5000/static/img/mail.png
    var regex = new RegExp(/http:\/\/127.0.0.1:5000\/static\/img\/(.*?).png/);
    const rootName = regex.exec(src)[1];
    const newName = rootName + "_hover.png";
    //console.log(newName);
    
    val.children[0].src = "http://127.0.0.1:5000/static/img/" + newName;
}

function itemOff(val) 
{
    src = val.children[0].src;
    //http://127.0.0.1:5000/static/img/mail.png
    var regex = new RegExp(/http:\/\/127.0.0.1:5000\/static\/img\/(.*?)_hover.png/);
    const newName = regex.exec(src)[1] + ".png";

    val.children[0].src = "http://127.0.0.1:5000/static/img/" + newName;
}
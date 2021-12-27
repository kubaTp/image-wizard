window.onload = () => {
    let extensionInterval = null;

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


    // chooseImage interval
    /*
    let chooseImageEl = document.getElementById("chooseImage");
    const normalbg = window.getComputedStyle(chooseImageEl).getPropertyValue("backgroundColor");
    chooseImageEl.style.transition = "2s ease-in-out";

    window.setInterval(() => {
        if(chooseImageEl.style.backgroundColor !== "rgba(255, 120, 31, 0.7)")
        {
            chooseImageEl.style.backgroundColor = "rgba(255, 120, 31, 0.7)";
        }
        else
        {
            chooseImageEl.style.backgroundColor = normalbg;
        }


        console.log(chooseImageEl.style.backgroundColor);

    }, 2000);*/
}

onSubmit = () => {
    if(document.getElementById('file-upload').files[0] != null)
    {
        const file = document.getElementById('file-upload');
        console.log("name : " + file.files[0].name);
        
        if(validateFileExtension(file.files[0].name)) return true;
        else return false;
    }
    else
    {
        alert('image has not been choosen, try do it again :)');
        return false;
    }
}

validateFileExtension = (nameOfFile) => {

    fileExtension = nameOfFile.split('.').pop();
    alowedExtension = ['png', 'jpg', 'jpeg', 'pdf'];
    result = alowedExtension.find(element => element === fileExtension)

    if(result != null)
        return true;        
    else
        return false;
}

getFileExtension = (nameOfFile) => { return nameOfFile.split('.').pop(); }

function updateValue() {
    document.getElementById('img_name').style.display = 'inline';
    const file = document.getElementById('file-upload');

    if(file.files[0] != null)
    {    
        if(file.files[0].name != '')
        {
            if(validateFileExtension(file.files[0].name)) // extension ok
            {
                document.getElementById('img_name').innerText = "name of image " + file.files[0].name;
                document.getElementById("img_name").style.opacity = "1";
                document.getElementById("print_text").style.opacity = "1";
                document.getElementById("show_data").style.opacity = "1";

                if((typeof extensionInterval !== "undefined") && (extensionInterval !== null)) { clearInterval(extensionInterval); }
                
                document.getElementById("extension_warning").style.opacity = `0`; 
                document.getElementById("extension_warning").style.transition = "0.5s";
            }
            else // extension NOT ok
            {

                document.getElementById('img_name').innerText = "name of image " + file.files[0].name;
                document.getElementById("img_name").style.opacity = "1";
                document.getElementById("print_text").style.opacity = "0"; // turn of print_text button
                document.getElementById("show_data").style.opacity = "0";

                document.getElementById("extension_warning").innerText = `extension .${getFileExtension(file.files[0].name)} is not supported`;                
                document.getElementById("extension_warning").style.opacity = `1`;
                document.getElementById("extension_warning").style.transition = "3s";

                let opacity = 1;
                extensionInterval = setInterval(() => {
                    if(opacity === 1)
                        opacity = 0;
                    else if(opacity === 0)
                        opacity = 1;

                    document.getElementById("extension_warning").style.opacity = `${opacity}`;

                }, 3000);
            }
        }
    }
    else {
        document.getElementById("img_name").style.opacity = "0";
        document.getElementById("print_text").style.opacity = "0";
        document.getElementById("show_data").style.opacity = "0";
    }
}
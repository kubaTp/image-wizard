window.onload = () => {
}

onSubmit = () => {
    if(document.getElementById('file-upload').files[0] != null)
    {
        const file = document.getElementById('file-upload');
        sconsole.log("name : " + file.files[0].name);

        return true;
    }
    else
    {
        alert('image has not been choosen, try do it again :)');
        return false;
    }
}

function updateValue() {
    document.getElementById('img_name').style.display = 'inline';
    const file = document.getElementById('file-upload');
    if(file.files[0] != null)
    {    
        if(file.files[0].name != '')
        {
            document.getElementById('img_name').innerText = "name of image " + file.files[0].name;

            document.getElementById("img_name").style.opacity = "1";
            document.getElementById("print_text").style.opacity = "1";
            document.getElementById("show_data").style.opacity = "1";
            /*
            let opacity = 0;
            
            interval = setInterval(() => {
                opacity += 0.05;
                //console.log("opacity is : " + opacity);
                if(opacity > 1)
                    clearInterval(interval);
                                                                                
                document.getElementById("img_name").style.opacity = `${opacity}`;
                document.getElementById("print_text").style.opacity = `${opacity}`;
                document.getElementById("show_data").style.opacity = `${opacity}`;
            }, 10);
            */
        }
    }
    else {
        document.getElementById("img_name").style.opacity = "0";
        document.getElementById("print_text").style.opacity = "0";
        document.getElementById("show_data").style.opacity = "0";
    }
}
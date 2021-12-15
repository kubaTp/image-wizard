window.onload = () => {
    let extensionInterval = null;
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
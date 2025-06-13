import {Storage } from "./storage.js";


export function saveImgChange(newImg,Element)
{
    let parent = Element.parentElement;
    let idData = Element.parentElement.id.split('_');
    let id = parseInt(idData[2]);

    Storage.GlobalStorage.EditObject("imagebox",id,"content",newImg);
}


export function setImage(Img,Element)
{
    if(!FileReader)
    {
        return;
    }

    let fr = new FileReader();
    fr.onload = function (event) {
        let blob = new Blob([event.target.result]);
        let url = window.URL.createObjectURL(blob);

        let image = new Image()
        image.src = url;

        image.onload = function()
        {
            let resizedData = ResizeImage(image);
            Element.src = resizedData;
            saveImgChange(resizedData,Element);

        }
    }
    fr.readAsArrayBuffer(Img);
}

let maxHeight = 400;
let maxWidth = 800;

export function ResizeImage(image)
{
    let canvas = document.createElement("canvas");
    let width = image.width;
    let height = image.height;

    if(width > height)
    {
        if(width > maxWidth)
        {
            height = Math.round(height *= maxWidth/width);
            width = maxWidth;
        }
    }
    else
    {
        if(height > maxHeight)
        {
            width = Math.round(width *= maxHeight/height);
            height = maxHeight;
        }
    }

    canvas.height = height;
    canvas.width = width;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(image,0,0,width,height);

    let data = canvas.toDataURL("image/jpeg",0.7);

    canvas.remove();
    return data;

}

export function OnDragOver(ev){
    ev.preventDefault();
}


export function OnFileDrop(ev)
{
    ev.preventDefault();
   
    if(ev.type != "drop")
    {
        return;
    }

    if(ev.dataTransfer.items)
    {
        let files =  [...ev.dataTransfer.items];
    
        for(let i =0; i < files.length;i++)
        {
            let item = files[i];

            if(item.kind === "file"){
                const file = item.getAsFile();
                const type = file.name.split('.')[1];

                if(type == "png" || "jpg" || "jpeg" || "gif" || "webp")
                {
                   
                    setImage(file,ev.toElement)
              
                   break;
                }
                
            }
        }
      
            
           
      
    }
}

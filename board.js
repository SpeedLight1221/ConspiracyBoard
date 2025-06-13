import { TextBox, ImageBox, Storage, Pin, StringObject } from "./storage.js";
import  * as TImg from "./images.js";


let SelectedColor = "#FF0000";
let SelectedTool = "None";

let PalleteBtn = document.getElementById("btnCol");
PalleteBtn.style.backgroundColor = SelectedColor;
PalleteBtn.addEventListener("click", openColorPicker);
let pickerDiv = document.getElementById("palletDiv");

let infoBoard = document.getElementById("infoDiv");
document.getElementById("closeInfoBtn").addEventListener("click" ,(e)=>{

    infoBoard.style.display = "none";
});

document.getElementById("moreBtn").addEventListener("click",(e)=>{

    infoBoard.style.display = "flex";
});

let clrBtns = document.getElementsByClassName("colorBtn");

for(let i = 0;i < clrBtns.length; i++)
{
    clrBtns[i].addEventListener("click",SwitchColor)
}



let main = document.getElementById("mainDiv");
let svgMain = document.getElementById("svgMain");
let svgLine = document.getElementById("svgLines");
main.addEventListener("load", LoadSave());






document.getElementById("btnNone").addEventListener("click", ToolSwap);
document.getElementById("btnTxt").addEventListener("click", ToolSwap);
document.getElementById("btnImg").addEventListener("click", ToolSwap);
document.getElementById("btnStr").addEventListener("click", ToolSwap);
document.getElementById("btnDel").addEventListener("click", ToolSwap);
document.getElementById("btnPin").addEventListener("click", ToolSwap);




main.addEventListener("click",(e)=>{

   
 
    switch(SelectedTool)
    {
        
        case "Text":
            createTextbox(e.x,e.y);
            break;
        case "None":
            break;
        case "Img":
            createImageBox(e.x,e.y)
            break;
        case "String":
            selectStringPoint(e);
            break;
        case "Pin":
            createPin(e.x,e.y);
            break;
        case "Delete":
            DeleteTool(e);
            break;
    }

});





function createTextbox(posX,posY)
{
    posX+= window.scrollX;
    posY+= window.scrollY;
    let id =Storage.GetUniqueID();

    let cont = document.createElement("div");
        cont.classList.add("txtDiv");
        cont.classList.add("default");
        cont.id = "E_textbox_" + id;
      
        main.appendChild(cont);
    let title = document.createElement("h4");
        title.classList.add("txtTitle");
        title.contentEditable = true;
        
        cont.appendChild(title);
    let text = document.createElement("p");
        text.classList.add("txtText");
        text.contentEditable = true;
        cont.appendChild(text);

    cont.style.top = posY+"px";
    cont.style.left = posX+"px";

    title.addEventListener("focusout",(e)=>{saveChanges(e,"title","textbox",id)});
    text.addEventListener("focusout",(e)=>{saveChanges(e,"content","textbox",id)})

    new TextBox(posX,posY,"","",id);

    document.getElementById("btnNone").click();

}

function createImageBox(posX,posY)
{
    posX+= window.scrollX;
    posY+= window.scrollY;
    let id =Storage.GetUniqueID();

    let cont = document.createElement("div")
        cont.classList.add("default");
        cont.classList.add("imgDiv");
        cont.id = "E_imagebox_"+ id;
  
        main.appendChild(cont);
    let title = document.createElement("h4");
        title.classList.add("txtTitle");
        title.contentEditable = true;
        cont.appendChild(title);
    let image = document.createElement("img");
        image.classList.add("imgImg");
     
        image.addEventListener("drop",(e) =>TImg.OnFileDrop(e));
        image.addEventListener("dragover",(e) => TImg.OnDragOver(e));
        cont.appendChild(image);
        
    cont.style.top = posY+"px";
    cont.style.left = posX+"px";

      title.addEventListener("focusout",(e)=>{saveChanges(e,"title","imagebox",id)});
 


    new ImageBox(posX,posY,"","",id);
    document.getElementById("btnNone").click();
}


let strX1 = null;
let strY1 = null;
function selectStringPoint(ev)
{
    let tID = ev.target.id.split('_');
    if(tID[1]== "pin")
    {
        let obj = ev.target.getElementsByClassName("pinLarge")[0];
       
    
        if(strX1 == null)
        {
            strX1 = obj.style.cx;
            strY1 = obj.style.cy;
            return;
        }
        else
        {
            createString(strX1,strY1,obj.style.cx,obj.style.cy);
            strX1 = null;
            strY1 = null;
             document.getElementById("btnNone").click();
        }

    }
   
    
}


function createString(x1,y1,x2,y2)
{
    if(x1==x2 &&y1==y2)
    {
        return;
    }
    let id = Storage.GetUniqueID();
    let line = document.createElementNS('http://www.w3.org/2000/svg',"line");
    line.id = "E_string_"+id;
    line.classList.add("line");
    line.style.stroke = SelectedColor;
    svgLine.appendChild(line);
    line.setAttribute("x1",x1);
    line.setAttribute("y1",y1);
    line.setAttribute("x2",x2);
    line.setAttribute("y2",y2);
    new StringObject(x1,y1,SelectedColor,x2,y2,id);

}


function createPin(PosX,PosY)
{
    PosX+= window.scrollX;
    PosY+= window.scrollY;


    let id =Storage.GetUniqueID();
   
    let group = document.createElementNS('http://www.w3.org/2000/svg',"g");
    group.style.zIndex = 5;
    let darkenedColors = Pin.getPallete(SelectedColor);
    group.id = "E_pin_"+id;
    let large = document.createElementNS('http://www.w3.org/2000/svg',"circle");
    large.classList.add("pinLarge");
    large.style.fill = darkenedColors[0];

    let shaft = document.createElementNS('http://www.w3.org/2000/svg',"circle");
    shaft.classList.add("pinShaft");
    shaft.style.fill = darkenedColors[1];

    let small = document.createElementNS('http://www.w3.org/2000/svg',"circle");   
    small.classList.add("pinSmall");
    small.style.fill = SelectedColor;

    let shadow = document.createElementNS('http://www.w3.org/2000/svg',"ellipse");   
    shadow.classList.add("pinShadow");
    
    large.style.cy = PosY;
    large.style.cx = PosX;
    small.style.cy = PosY-15;
    small.style.cx = PosX+15;
    shaft.style.cy = PosY-5;
    shaft.style.cx = PosX +5;
    shadow.style.cy = PosY+15;
    shadow.style.cx = PosX-20;

    svgMain.appendChild(group);
    group.appendChild(shadow);
    group.appendChild(large);
    group.appendChild(shaft);
    group.appendChild(small);

    new Pin(PosX,PosY,SelectedColor,id);
   
}


function DeleteTool(ev)
{
     console.log(ev);
    if(ev.target.id[0]=='E')
    {
      
        let idData = ev.target.id.split('_');
        let id = idData[2];
        let type = idData[1];
        Storage.GlobalStorage.DeleteObject(type,id);
        ev.target.remove();
    }
}


function ToolSwap(sender)
{
    strX1 = null;
    strY1 = null;
   
    SelectedTool =  sender.target.value;

    let btns = document.getElementById("Toolbar").children

    for(let i =0; i< btns.length; i++)
    {
        
        btns[i].classList.remove("SelectedToolBtn")
    }

    sender.target.classList.add("SelectedToolBtn");


}



function LoadSave(e)
{
   

    for(let i = 0; i< Storage.GlobalStorage.TextBoxArray.length;i++)
    {
        let t =Storage.GlobalStorage.TextBoxArray[i];
        loadTextbox(t.PosX, t.PosY,t.ID,t.Title,t.Content);
    }

     for(let i = 0; i< Storage.GlobalStorage.ImageBoxArray.length;i++)
    {
        let t =Storage.GlobalStorage.ImageBoxArray[i];
        loadImagebox(t.PosX, t.PosY,t.ID,t.Title,t.ImageData);
    }

    for(let i = 0; i< Storage.GlobalStorage.PinArray.length;i++)
    {
        let t =Storage.GlobalStorage.PinArray[i];
        loadPin(t.PosX, t.PosY,t.ID,t.ColorHex);
    }
    for(let i = 0; i< Storage.GlobalStorage.StringArray.length;i++)
    {
        let t =Storage.GlobalStorage.StringArray[i];
        loadString(t.PosX,t.PosY,t.EndX,t.EndY,t.ID,t.ColorHex);
    }
}

function loadString(x1,y1,x2,y2,id,color)
{
   
    
    let line = document.createElementNS('http://www.w3.org/2000/svg',"line");
    line.id = "E_string_"+id;
    line.classList.add("line");
    line.style.stroke = color;
    svgLine.appendChild(line);
    line.setAttribute("x1",x1);
    line.setAttribute("y1",y1);
    line.setAttribute("x2",x2);
    line.setAttribute("y2",y2);
   
}

function loadImagebox(posX,posY,id,tit,content)
{    


    let cont = document.createElement("div")
        cont.classList.add("default");
        cont.classList.add("imgDiv");
        cont.id = "E_imagebox_"+ id;
  
        main.appendChild(cont);
    let title = document.createElement("h4");
        title.classList.add("txtTitle");
        title.contentEditable = true;
        title.innerText = tit;
        cont.appendChild(title);
    let image = document.createElement("img");
        image.classList.add("imgImg");
       image.src = content;
        image.addEventListener("drop",(e) =>TImg.OnFileDrop(e));
        image.addEventListener("dragover",(e) => TImg.OnDragOver(e));
        cont.appendChild(image);
        
    cont.style.top = posY+"px";
    cont.style.left = posX+"px";

    title.addEventListener("focusout",(e)=>{saveChanges(e,"title","imagebox",id)});

}

function loadPin(PosX,PosY,id,color)
{
     let darkenedColors = Pin.getPallete(color);
   
    let group = document.createElementNS('http://www.w3.org/2000/svg',"g");
    group.style.zIndex = 5;
   
    group.id = "E_pin_"+id;
    let large = document.createElementNS('http://www.w3.org/2000/svg',"circle");
    large.classList.add("pinLarge");
    large.style.fill = darkenedColors[0];

    let shaft = document.createElementNS('http://www.w3.org/2000/svg',"circle");
    shaft.classList.add("pinShaft");
    shaft.style.fill = darkenedColors[1];

    let small = document.createElementNS('http://www.w3.org/2000/svg',"circle");   
    small.classList.add("pinSmall");
    small.style.fill = SelectedColor;

    let shadow = document.createElementNS('http://www.w3.org/2000/svg',"ellipse");   
    shadow.classList.add("pinShadow");
    
    large.style.cy = PosY;
    large.style.cx = PosX;
    small.style.cy = PosY-15;
    small.style.cx = PosX+15;
    shaft.style.cy = PosY-5;
    shaft.style.cx = PosX +5;
    shadow.style.cy = PosY+15;
    shadow.style.cx = PosX-20;

    svgMain.appendChild(group);
    group.appendChild(shadow);
    group.appendChild(large);
    group.appendChild(shaft);
    group.appendChild(small);

   
   
}

function loadTextbox(posX,posY,id,tit,content)
{
    let cont = document.createElement("div");
        cont.classList.add("txtDiv");
        cont.classList.add("default");
        cont.id = "E_textbox_" + id;
      
        main.appendChild(cont);
    let title = document.createElement("h4");
        title.innerText = tit;
        title.classList.add("txtTitle");
        title.contentEditable = true;
        cont.appendChild(title);
    let text = document.createElement("p");
        text.innerText = content;
        text.classList.add("txtText");
        text.contentEditable = true;
        cont.appendChild(text);

    cont.style.top = posY+"px";
    cont.style.left = posX+"px";

    
    title.addEventListener("focusout",(e)=>{saveChanges(e,"title","textbox",id)});
    text.addEventListener("focusout",(e)=>{saveChanges(e,"content","textbox",id)})
}

export function saveChanges(event,editedElement,contType,id)
{

    let newContent = event.srcElement.innerText;
    Storage.GlobalStorage.EditObject(contType,id,editedElement,newContent);
}


function openColorPicker()
{
   
    if(pickerDiv.style.display == "none")
    {
        pickerDiv.style.display= "flex";
        
    }
    else
    {
      
        pickerDiv.style.display = "none"
    }

}

function SwitchColor(ev)
{
    let col = ev.target.value;
    PalleteBtn.style.background =col;
    SelectedColor = col;
}
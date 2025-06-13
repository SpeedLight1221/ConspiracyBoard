

class baseObject {

    constructor(x, y, type, id) {
        this.ID = id;
        this.PosX = x;
        this.PosY = y;
        this.Type = type;
    }

    ID;
    PosX;
    PosY;
    Type;

}

export class Storage {
    static GetUniqueID() {
        let id;

        let collision = false;

        while (true) {
            collision = false;
            id = (Math.floor(Math.random() * 10000) + 1)



            for (let i = 0; i < Storage.GlobalStorage.TextBoxArray.lenght; i++) {
                if (Storage.GlobalStorage.TextBoxArray[i].ID === id) {
                    collision = true;
                    break;
                }
            }

            if (collision) { continue; }


            for (let i = 0; i < Storage.GlobalStorage.ImageBoxArray.lenght; i++) {
                if (Storage.GlobalStorage.ImageBoxArray[i].ID === id) {
                    collision = true;
                    break;
                }
            }

            if (collision) { continue; }

            if (collision == false) {
                break;
            }


        }

        return id;


    }


    static get GlobalStorage() {

        if (Storage.#globalstorage == null || undefined) {

            if (localStorage.getItem("CBoardData") == null || undefined) {

                Storage.#globalstorage = new Storage();
            }
            else {

                //Storage.#globalstorage = JSON.parse(localStorage.getItem("CBoardData"));


                let memory = JSON.parse(localStorage.getItem("CBoardData"));
                this.#globalstorage = new Storage();
                this.#globalstorage.TextBoxArray = memory.TextBoxArray;
                this.#globalstorage.ImageBoxArray = memory.ImageBoxArray;
                this.#globalstorage.PinArray = memory.PinArray;
                this.#globalstorage.StringArray = memory.StringArray;
                
            }

        }

        return Storage.#globalstorage;
    }

    static #globalstorage;


    StoreObject(toStore) {
        console.log(toStore);
       
        switch (toStore.Type) {
            case "textbox":
             
                this.TextBoxArray.push(toStore);
                break;
            case "imagebox":
                
                this.ImageBoxArray.push(toStore);
                break;
            case "pin":
                
                this.PinArray.push(toStore);
            break;
            case "string":
                this.StringArray.push(toStore);
                break;
            default:
                return;
        }

        localStorage.setItem("CBoardData", JSON.stringify(Storage.GlobalStorage));

    }

    EditObject(type,id,toEdit,value)
    {
        if(type == "textbox")
        {
            let e = Storage.GlobalStorage.TextBoxArray.findIndex(txtbox => txtbox.ID == id);
           
            if(e <0){return;}

            if(toEdit == "title")
            {
                Storage.GlobalStorage.TextBoxArray[e].Title = value;
            }
            else if(toEdit == "content")
            {
                Storage.GlobalStorage.TextBoxArray[e].Content = value;
            }
        }
        else if(type == "imagebox")
        {
            let e = Storage.GlobalStorage.ImageBoxArray.findIndex(txtbox => txtbox.ID == id);
            console.log("sd");
            if(e <0){return;}

            if(toEdit == "title")
            {
                Storage.GlobalStorage.ImageBoxArray[e].Title = value;
            }
            else if(toEdit == "content")
            {
                Storage.GlobalStorage.ImageBoxArray[e].ImageData = value;
            }
        }

        localStorage.setItem("CBoardData", JSON.stringify(Storage.GlobalStorage));
    }



    DeleteObject(type, id) {

        
        switch (type) {
            case "textbox": {

                let e = Storage.GlobalStorage.TextBoxArray.findIndex(x => x.ID == id);
                Storage.GlobalStorage.TextBoxArray.splice(e,1);

            }
                break;
            case "imagebox":{
                let e = Storage.GlobalStorage.ImageBoxArray.findIndex(x => x.ID == id);
                Storage.GlobalStorage.ImageBoxArray.splice(e,1);}
                break;
            case "pin":{
                 let e = Storage.GlobalStorage.PinArray.findIndex(x => x.ID == id);
                Storage.GlobalStorage.PinArray.splice(e,1);}
               
            break;
            case "string" :{
                let e = Storage.GlobalStorage.StringArray.findIndex(x=>x.ID == id);
                Storage.GlobalStorage.StringArray.splice(e,1);
            }
            break;
            default:

                return;
        }

        localStorage.setItem("CBoardData", JSON.stringify(Storage.GlobalStorage));
    }

    TextBoxArray = [];
    ImageBoxArray = [];
    PinArray = [];
    StringArray=[];

}


export class TextBox extends baseObject {
    constructor(x, y, title, cont, id) {
        super(x, y, "textbox", id)
        this.Title = title;
        this.Content = cont;
        Storage.GlobalStorage.StoreObject(this);

    }



    Title;
    Content;


}

export class ImageBox extends baseObject {

    constructor(x, y, title, img, id) {
        super(x, y, "imagebox", id)
        this.Title = title;
        this.ImageData = img;
        Storage.GlobalStorage.StoreObject(this);

    }

    Title;
    ImageData;
}

export class Pin extends baseObject
{
    constructor(x,y,color,id)
    {
        super(x,y,"pin",id);
        this.ColorHex = color;
        Storage.GlobalStorage.StoreObject(this);
    }

    ColorHex;


    static getPallete(HexColor) 
    {
        let RGB = [HexColor.substring(1,3),HexColor.substring(3,5),HexColor.substring(5,7)];
        console.log(RGB);
        let val1 = [];
        let val2 = [];

        for(let i =0;i <3;i++)
        {
            let numb = Number("0x"+RGB[i]);
            let B = Math.round((numb/100)*70).toString(16);
            if(B.length == 1)
            {
                B = "0"+B;
            }
            val1[i] = B;

            let D = Math.round((numb/100)*50).toString(16);
           
            if(D.length ==1)
            {
                D = "0"+D;
            }
            val2[i] = D;
          
        }

        let bodyColor = "#"+val1[0]+val1[1]+val1[2];
        let shaftColor = "#"+val2[0]+val2[1]+val2[2];
        console.log(bodyColor);
        console.log(shaftColor);
        return [bodyColor,shaftColor];
    }
}

export class StringObject extends baseObject
{
    constructor(x,y,color,endX,endY,id)
    {
        super(x,y,"string",id);
        this.ColorHex = color;
        this.EndX = endX;
        this.EndY = endY;
        Storage.GlobalStorage.StoreObject(this);
    }

    ColorHex;
    EndX;
    EndY;
}

function findByID(val, ind, arr) {
    if (val.ID == parseInt(id)) {
        return true;
    }

}
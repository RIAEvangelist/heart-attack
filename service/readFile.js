import fs from 'fs';

function read(path,type){
    let rawdata = '';
    try{
        rawdata=fs.readFileSync(path,'utf8');
    }catch(err){
        (type=='JSON')? rawdata={}:null;
        return rawdata;
    }
    let parsedData=null;
    switch(type){
        case 'JSON' : 
            try{
                parsedData = JSON.parse(rawdata);
            }catch(err){
                //weird JSON
                parsedData={}
            }
        break;
        case 'HTML' :
            parsedData=rawdata;
        break;
        default :
            parsedData=rawdata;
    }

    return parsedData;
}

export {
    read as default,
    read
}
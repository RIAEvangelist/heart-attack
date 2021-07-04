import fs from 'fs';

function read(path,type){
    const rawdata = fs.readFileSync(path,'utf8');
    let parsedData=null;
    switch(type){
        case 'JSON' : 
            parsedData = JSON.parse(rawdata);
        break;
        case 'HTML' :

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
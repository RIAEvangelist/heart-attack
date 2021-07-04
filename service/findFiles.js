import path from 'path';
import fs from 'fs';

function fromDir(startPath,filter){

    //console.log('Starting from dir '+startPath+'/');

    if (!fs.existsSync(startPath)){
        console.log("no dir ",startPath);
        return;
    }

    let dir=[];
    try{
        dir=fs.readdirSync(startPath);
    }catch(err){
        //probably restricted permissions
    }
    const files=[];
    
    for(var i=0;i<dir.length;i++){
        const filename=path.join(startPath,dir[i]);
        let stat=null;
        
        try{
            stat=fs.lstatSync(filename);
        }catch(err){
            //dont need it if it errs
            continue;
        }
        if (stat.isDirectory()){
            const recursedFiles=fromDir(filename,filter); //recurse
            (recursedFiles.length>0)? files.push(...recursedFiles): null;
        }
        else if (filename.indexOf(filter)>=0) {
            //console.log('-- found: ',filename);
            files.push(filename.replaceAll('\\','/'));
        };
    };

    return files;
};

export {
    fromDir as default,
    fromDir
}
import path from 'path';
import fs from 'fs';

function fromDir(startPath,filter){

    //console.log('Starting from dir '+startPath+'/');

    if (!fs.existsSync(startPath)){
        console.log("no dir ",startPath);
        return;
    }

    const dir=fs.readdirSync(startPath);
    const files=[];
    
    for(var i=0;i<dir.length;i++){
        const filename=path.join(startPath,dir[i]);
        const stat = fs.lstatSync(filename);
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
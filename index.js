import find from './service/findFiles.js';

const HTMLFiles=find('../','.html');
//const packageJSONFiles=find('../','package.json');

console.log(HTMLFiles);
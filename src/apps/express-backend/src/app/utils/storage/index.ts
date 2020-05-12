
import { environment } from './../../../environments/environment';
import {setup as diskSetup} from './diskstorage.utils';
let _removeFile;
let _upload;
if(environment.filestorage.type === 'disk'){
    const setup = diskSetup();
    _removeFile = setup.removeFile;
    _upload = setup.upload;
}

export const removeFile= _removeFile;
export const upload= _upload;
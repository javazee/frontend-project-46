import { cwd } from 'node:process';
import { resolve, extname } from 'node:path';
import { readFileSync } from 'node:fs';
import YAML from 'yaml';

const parse = ( path ) => {
    const filePath = resolve(cwd(), path);
    const fileData = readFileSync(filePath);
    const type = extname(path);
    if (type === '.json') {
        return JSON.parse(fileData);
    } else if (type === '.yaml' || type === '.yml') {
        return YAML.parse(fileData);
    }
    
};

export {
    parse
};
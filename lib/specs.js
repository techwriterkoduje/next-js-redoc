import fs from 'fs';
import path from 'path';

const specsDirectory = path.join(process.cwd(), 'specs');

function getId(fileName) {
  return fileName.replace(/\.json$/, '');
}

export function getAllSpecIds() {
  const fileNames = fs.readdirSync(specsDirectory);

  return fileNames
    .filter(fn => fn.endsWith('.json'))
    .map(fileName => {
      return {
        params: {
          id: getId(fileName),
        },
      };
    });
}

export function getSpecData(id) {
  const fullPath = path.join(specsDirectory, `${id}.json`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  return {
    id,
    fileContents: fileContents,
  };
}

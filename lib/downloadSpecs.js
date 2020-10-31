const fs = require('fs');
const fetch = require('node-fetch');
const AdmZip = require('adm-zip');

const outputDir = `${__dirname}/../specs`;

const specDirectories = [
  {
    label: 'Pet Store',
    url:
      'https://raw.githubusercontent.com/OAI/OpenAPI-Specification/master/examples/v2.0/json/api-with-examples.json',
  },
  {
    label: 'Uber',
    url:
      'https://raw.githubusercontent.com/OAI/OpenAPI-Specification/master/examples/v2.0/json/uber.json',
  },
];

function getId(fileName) {
  return fileName
    .toLowerCase()
    .replace(/\.html$/, '')
    .replace(/\./g, '')
    .replace(/\W/g, '-');
}

function isSystemApi(basePath) {
  if (basePath.startsWith('/system')) {
    return true;
  }

  return false;
}

async function getSpecList() {
  let specs = [];
  for await (const listing of specDirectories) {
    try {
      const listingLabel = listing.label;
      const response = await fetch(listing.url);
      specJson = await response.json();

      specs.push({
        label: listingLabel,
        id: getId(listingLabel),
        value: listing.url,
      });
    } catch (err) {
      console.log(`Problem fetching spec from ${listing.url}`, err);
    }
  }

  return specs;
}

function zipUpSpecs() {
  const zip = new AdmZip();
  const fileNames = fs.readdirSync(outputDir);

  for (const fileName of fileNames) {
    zip.addLocalFile(`${outputDir}/${fileName}`);
  }

  zip.writeZip(`${__dirname}/../public/specs.zip`);
}

const downloadSpecs = async function () {
  if (fs.existsSync(outputDir)) {
    fs.rmdirSync(outputDir, { recursive: true }, (err) => {
      if (err) {
        throw err;
      }
      console.log(`${outputDir} is deleted!`);
    });
  }
  fs.mkdirSync(outputDir);

  const specList = await getSpecList();
  for await (spec of specList) {
    const url = spec.value;
    let specJson = undefined;
    try {
      const response = await fetch(url);
      specJson = await response.json();
    } catch (err) {
      console.log(`Problem fetching spec from ${url}`, err);
      spec.error = true;
    }

    const specId = spec.id;

    const jsonPath = `${outputDir}/${specId}.json`;
    fs.writeFileSync(jsonPath, JSON.stringify(specJson));
  }

  fs.writeFileSync(
    `${outputDir}/specs.json`,
    JSON.stringify(specList, null, 4)
  );
};

async function prepareResources() {
  await downloadSpecs();
  zipUpSpecs();
}

prepareResources();

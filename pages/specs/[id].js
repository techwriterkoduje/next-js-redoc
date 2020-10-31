import { getAllSpecIds, getSpecData } from '../../lib/specs';
import Layout from '../../components/layout';
import { RedocStandalone } from 'redoc';

const methodColors = {
  get: '#2F8132',
  post: '#186FAF',
  put: '#95507c',
  options: '#947014',
  patch: '#bf581d',
  delete: '#cc3333',
  basic: '#707070',
  link: '#07818F',
  head: '#A23DAD',
};

function overrideStyles(className, styles) {
  const elementsWithClass = document.querySelectorAll(className);
  for (const sample of elementsWithClass) {
    if (sample.childNodes.length === 0) {
      sample.style = styl;
    }
  }
}

function customizeRedoc() {
  const operationSections = document.querySelectorAll('div[id^=operation]');
  for (const section of operationSections) {
    const header = section.querySelector('h2');
    section.style.maxWidth = '55%';

    const operationButton = header.nextElementSibling.querySelector('button');
    if (operationButton) {
      operationButton.style.fontSize = '22px';
      operationButton.style.fontWeight = 'bold';
      operationButton.style.color = 'white';
      operationButton.style.padding = '16px 8px';

      const methodSpan = operationButton.querySelector('span[type]');
      if (methodSpan) {
        const method = methodSpan.getAttribute('type');
        operationButton.style.backgroundColor = methodColors[method];
      }

      operationButton.parentElement.insertBefore(
        header,
        operationButton.nextElementSibling.nextElementSibling
      );

      const sectionWrapper = section.firstChild;
      sectionWrapper.style.display = 'grid';
      sectionWrapper.style.gridTemplateColumns = '1fr';

      const sample = sectionWrapper.lastChild;
      if (sample.childNodes.length === 0) {
        sample.style.display = 'none';
      } else {
        sample.style.position = 'relative';
        sample.style.width = '60%';
        sample.style.padding = '32px 8px';
        sample.style.border = '42px solid white';
      }
    }
  }
}

export default function Post({ specData }) {
  const specObject = JSON.parse(specData.fileContents);
  return (
    <Layout>
      <RedocStandalone
        spec={specObject}
        options={{
          nativeScrollbars: true,
          theme: { colors: { primary: { main: '#4b4b4b' } } },
          pathInMiddlePanel: true,
          showExtensions: true,
          disableSearch: true,
          hideHostname: true,
        }}
        onLoaded={customizeRedoc}
      />
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getAllSpecIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const specData = getSpecData(params.id);
  return {
    props: {
      specData,
    },
  };
}

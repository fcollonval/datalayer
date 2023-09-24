import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { createGlobalStyle } from 'styled-components';
import { Jupyter, JupyterLabApp, JupyterLabCorePlugins } from '@datalayer/jupyter-react';
import { JupyterLab } from '@jupyterlab/application';
import * as collaborationExtension from '@jupyter/collaboration-extension';
import * as datalayerExtension from './jupyterlab/index';
import Datalayer from './Datalayer';

const { extensionPromises, mimeExtensionPromises } = JupyterLabCorePlugins;

const ThemeGlobalStyle = createGlobalStyle<any>`
  body {
    background-color: white !important;
  }
`

const DatalayerJupyterLabHeadless = () => {
  const [jupyterLab, setJupyterLab] = useState<JupyterLab>();
  const onReady = (jupyterLab: JupyterLab) => {
    // jupyterLab.deactivatePlugin(datalayerExtension.PLUGIN_ID).then((deactivatedDownstreamPlugins) => {
    //   console.log('Deeactivated downstream plugins', deactivatedDownstreamPlugins);
    // });
    // jupyterLab.deregisterPlugin(datalayerExtension.PLUGIN_ID, true);
    setJupyterLab(jupyterLab);
  }
  return (
    <>
      {jupyterLab && <Datalayer app={jupyterLab}/>}
      <JupyterLabApp
        extensions={[
          datalayerExtension,
          collaborationExtension,
        ]}
        extensionPromises={extensionPromises}
        mimeExtensionPromises={mimeExtensionPromises}
        hostId="jupyterlab-app-id"
        headless={true}
        onReady={onReady}
      />
    </>
  )
}

const div = document.createElement('div');
document.body.appendChild(div);
const root = createRoot(div);

root.render(
  <Jupyter startDefaultKernel={false} disableCssLoading={true}>
    <ThemeGlobalStyle />
    <DatalayerJupyterLabHeadless/>
  </Jupyter>
);
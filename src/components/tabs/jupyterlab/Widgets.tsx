import { useState, useEffect } from 'react';
import { Widget } from '@lumino/widgets';
import { DocumentRegistry } from '@jupyterlab/docregistry';
import { IObservableList } from '@jupyterlab/observables';
import { IRenderMime } from '@jupyterlab/rendermime-interfaces';
import { Text, LabelGroup, Label } from '@primer/react';
import { Table, DataTable } from '@primer/react/drafts';
import { JupyterFrontEndProps } from '../../Datalayer';

class JupyterLabWidgetFactory implements DocumentRegistry.IWidgetFactory<any, any> {
  private _widgetFactory: DocumentRegistry.IWidgetFactory<any, any> ;
  constructor(widgetFactory: DocumentRegistry.IWidgetFactory<any, any>) {
    this._widgetFactory = widgetFactory;
  }
  get id() { return this._widgetFactory.name }
  get name() { return this._widgetFactory.name }
  get modelName() { return this._widgetFactory.modelName }
  get label() { return this._widgetFactory.label }
  get fileTypes() { return this._widgetFactory.fileTypes }
  get isDisposed() { return this._widgetFactory.isDisposed }
  get widgetCreated() { return this._widgetFactory.widgetCreated }
  autoStartDefault?: boolean | undefined;
  readOnly?: boolean | undefined;
  preferKernel?: boolean | undefined;
  canStartKernel?: boolean | undefined;
  shutdownOnClose?: boolean | undefined;
  defaultFor?: readonly string[] | undefined;
  defaultRendered?: readonly string[] | undefined;
  translator?: IRenderMime.ITranslator | undefined;
  toolbarFactory?: ((widget: Widget) => DocumentRegistry.IToolbarItem[] | IObservableList<DocumentRegistry.IToolbarItem>) | undefined;
  createNew(context: DocumentRegistry.IContext<any>, source?: any) {
    throw new Error('Method not implemented.');
  }
  preferredLanguage(path: string): string {
    throw new Error('Method not implemented.');
  }
  dispose(): void {
    throw new Error('Method not implemented.');
  }
}

const Widgets = (props: JupyterFrontEndProps) => {
  const { app } = props;
  const [modelFactories, setWidgetFactories] = useState<JupyterLabWidgetFactory[]>();
  useEffect(() => {
    if (app) {
      const widgetFactories = Array.from(app?.docRegistry.widgetFactories());
      const jupyterlabFileTypes = widgetFactories.map(widgetFactory => new JupyterLabWidgetFactory(widgetFactory));
      setWidgetFactories(jupyterlabFileTypes);    
    }
  }, [app]);
  return (
    <>
      { modelFactories &&
        <Table.Container>
          <Table.Title as="h2" id="widget-factories">
            Widget Factories
          </Table.Title>
          <Table.Subtitle as="p" id="widget-factories-subtitle">
            List of registered widgets factories.
          </Table.Subtitle>
          <DataTable
            aria-labelledby="file-types"
            aria-describedby="file-types-subtitle" 
            data={modelFactories}
            columns={[
              {
                header: 'Name',
                field: 'name',
                renderCell: row => <Text>{row.name}</Text>
              },
              {
                header: 'Label',
                field: 'label',
                renderCell: row => {
                  return <Text>{row.label}</Text>
                }
              },
              {
                header: 'Model Name',
                field: 'modelName',
                renderCell: row => <Label>{row.modelName}</Label>
              },
              {
                header: 'File Types',
                field: 'fileTypes',
                renderCell: row => {
                  return <LabelGroup>{row.fileTypes.map(fileType => <Label variant="primary">{fileType}</Label>)}</LabelGroup>
                }
              },
            ]
          }
        />
      </Table.Container>
    }
    </>
  )
}

export default Widgets;

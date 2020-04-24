import {getService} from '@loopback/service-proxy';
import {inject, Provider, bind} from '@loopback/core';
import {ScicatDataSource} from '../datasources';
import {PanService, pan} from './pan.service';

export interface ScicatService {
  // this is where you define the Node.js methods that will be
  // mapped to REST/SOAP/gRPC operations as stated in the datasource
  // json file.
  // tslint: disable-next-line:no-any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getDetails(title: string): Promise<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getDetailsById(title: string): Promise<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getDocuments(title: string): Promise<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getDocumentsById(title: string): Promise<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getSamples(title: string): Promise<any>;
}

@bind(pan('scicat'))
export class ScicatServiceProvider implements Provider<PanService> {
  constructor(
    // scicat must match the name property in the datasource json file
    @inject('datasources.scicat')
    protected dataSource: ScicatDataSource = new ScicatDataSource(),
  ) {}

  value(): Promise<PanService> {
    return getService(this.dataSource);
  }
}

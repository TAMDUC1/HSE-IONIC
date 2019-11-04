import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private data = [];
  private uuid = '';
  private tempObj = {
    uuid : '',
    nnName : '',
    lvName : ''
  }
  constructor() { }

  setUuid(uuid){
    this.uuid = uuid;
  }
  getUuid(){
    return this.uuid;
  }
  setObj(uuid,nnName,lvName){
    this.tempObj.uuid = uuid;
    this.tempObj.lvName = lvName;
    this.tempObj.nnName = nnName;
  }
  getObj(){
    return this.tempObj;
  }
  setData(id, data){
    this.data[id]  = data;
  }
  getData(id){
    return this.data[id];
  }
}

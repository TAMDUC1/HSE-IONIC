import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private data = [];
  private files = {
    uuid : '',
    data : []
  };
  private uuid = '';
  private tempObj = {
    nnName : '',
    lvName : ''
  };
  private ndName = '';
  constructor() { }
  setNd(ndName){
    this.ndName = ndName;
  }
  getNd(){
    return this.ndName;
  }
  setUuid(uuid){
    this.uuid = uuid;
  }
  getUuid(){
    return this.uuid;
  }
  setObj(nnName,lvName){
    //this.tempObj.uuid = uuid;
    this.tempObj.lvName = lvName;
    this.tempObj.nnName = nnName;
  }
  getObj(){
    return this.tempObj;
  }
  setData(id, data){
    console.log('set data vi tri '+id+'data la '+ data);
    this.data[id]  = data;
    console.log('data save trong bo nho de dung',this.data);

  }
  getData(id){
    return this.data[id];
  }
  setFiles(uuid,data){
    console.log('set file to resolves '+ uuid+' file data '+ data);
    this.files.uuid = uuid;
    this.files.data = data;
  }
  getFiles(){
    return this.files;
  }
}

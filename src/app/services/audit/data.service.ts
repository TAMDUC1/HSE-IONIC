import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {take} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class DataService {
    private singleAudit = new BehaviorSubject({});
    private fileObserver = new BehaviorSubject(
        []
    );
    private data = [];
    private files = {
        uuid: '',
        data: []
    };
    private uuid = '';
    private tempObj = {
        nnName: '',
        lvName: ''
    };
    private ndName = '';
    private authData = new BehaviorSubject({});

    constructor() {
    }

    setNd(ndName) {
        this.ndName = ndName;
    }

    getNd() {
        return this.ndName;
    }

    setUuid(uuid) {
        this.uuid = uuid;
    }

    getUuid() {
        return this.uuid;
    }

    setObj(nnName, lvName) {
        //this.tempObj.uuid = uuid;
        this.tempObj.lvName = lvName;
        this.tempObj.nnName = nnName;
    }

    getObj() {
        return this.tempObj;
    }

    // id = 1 la tat ca audit
    // id  = 2 la single audit
    setData(id, data) {
        console.log('set data vi tri ' + id + 'data la ' + data);
        this.data[id] = data;
        //console.log('data save trong bo nho de dung',this.data);

    }
    deleteFile(uuid){
        const Arr: any[] = this.fileObserver.getValue();

        Arr.forEach((e,index) => {
            if (e.uuid_img === uuid) { Arr.splice(index, 1); }
        });

        this.fileObserver.next(Arr);
    }
    setFile(uuid, arr) {
        /*this.File.subscribe((file) => {
            if (file.length) {
               var temp = file.concat(arr);
               console.log('temo',temp);
                this.fileObserver.next(temp);
            } else {
                console.log('temo2',arr);

                this.fileObserver.next(arr);
            }
        });*/
        this.fileObserver.next(arr)
    }

    get File() {
        return this.fileObserver.asObservable();
    }

    setSingleAudit(data) {
        this.singleAudit.next(data);
    }

    get getSingleAudit() {
        return this.singleAudit.asObservable();
    }

    getData(id) {
        // this.data2.
        return this.data[id];
    }


    setFiles(uuid, data) {
        console.log('set file to resolves ' + uuid + ' file data ' + data);
        this.files.uuid = uuid;
        this.files.data = data;
    }

    getFiles() {
        return this.files;
    }

    setAuthData(data){

        this.authData.next(data);
    }
    getAuthData(){

        return this.authData.asObservable();
    }
}

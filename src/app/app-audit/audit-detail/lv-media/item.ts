export class Item {
    constructor (
        public filesystem : any,
        public fullPath : string,
        public isDirectory : boolean,
        public isFile : boolean,
        public name: string,
        public nativeURL: string,
        ){}
}
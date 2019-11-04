export class Audit {
    constructor (
        public uuid : string,
        public data : string,
        public dataArr : string,
        public attachment : string,
        public workflow: string,
        public  status: number,
        public year: number,
        public quarter: number,
        public kind: number,
        public companyId: number,
        public createdOn: Date,
        public updatedOn: Date,
        public createdBy ?:any,
        public updatedBy?:any){}
}
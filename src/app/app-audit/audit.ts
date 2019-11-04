export interface IAudit {
    uuid: string ;
    data: any;
    dataArr: string;
    attachment: string;
    workflow: string;
    status: number;
    year: number;
    quarter: number;
    createdBy?: any;
    updatedBy?: any;
    kind: number;
    companyId: number;
    createdOn: Date;
    updatedOn: Date;
}
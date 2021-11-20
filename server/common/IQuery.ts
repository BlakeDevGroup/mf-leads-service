export interface IQuery {
    create: (resource: any) => Promise<string>;
    delete: (id: string) => Promise<any>;
    read: (id: string) => Promise<any>;
    readAll: () => Promise<any>;
    update: (id: string, resource: Partial<any>) => Promise<any>;
}

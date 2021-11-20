export interface IService {
    list: (limit: number, page: number) => Promise<any>;
    add: (resource: any) => Promise<any>;
    putById: (id: string, resource: any) => Promise<any>;
    getById: (id: string) => Promise<any>;
    deleteById: (id: string) => Promise<any>;
}

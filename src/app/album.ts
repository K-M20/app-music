export class Album {
    id: number | string = 0;
    ref: string = "";
    name: string = "";
    title: string = "";
    description: string = "";
    duration: number = 0;
    status: string = "";
    url: string = "";
    tags?: Array<string>;
    like?: string = "";
}

export class List {
    id: string = "";
    list?: Array<string>;
}
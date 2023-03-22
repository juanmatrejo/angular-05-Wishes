import { ListItem } from "./list-item.model";

export class List {

    id: number;
    title: string;
    createDate: Date;
    endDate: Date | null;
    completed: boolean;
    items: ListItem[];

    constructor(title: string) {
        this.id = new Date().getTime();
        this.title = title;
        this.createDate = new Date();
        this.endDate = null;
        this.completed = false;
        this.items = [];
    }

}
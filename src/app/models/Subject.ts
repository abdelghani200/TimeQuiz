export interface Subject {
    id: number;
    title: string;
    parent?: { id: number, title: string };
    children?: { id: number, title: string }[]
}


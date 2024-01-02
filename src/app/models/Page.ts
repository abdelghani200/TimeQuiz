
export interface Page<T> {
    content: T[];       // Liste des éléments actuels sur la page
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
    first: boolean;
    last: boolean;
}

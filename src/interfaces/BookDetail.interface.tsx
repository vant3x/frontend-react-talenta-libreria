export interface  BookDetail {
    id?: number;
    title: string;
    author: string;
    bookPublisher?: string;
    bookDate: React.ReactNode;
    bookState?: boolean;
    genre?:string;
    ISBN: string;
    image?: string;
}
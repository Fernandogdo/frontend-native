export interface Sale{
    _id?: string;
    title: string;
    description: string;
    date: Date,
    month: string,
    year: number,
    total: number,
    total_spends: number,
    products: string
    imagePath: string;
}
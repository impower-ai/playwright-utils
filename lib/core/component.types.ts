
export interface DataComponent<T> {
    read(): Promise<Partial<T>>;
}
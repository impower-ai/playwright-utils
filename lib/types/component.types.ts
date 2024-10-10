
export interface DataComponent<T> {
    read(): Promise<Partial<T>>;
}

export interface HydratableComponent<T> {
    data: Partial<T>;
    isHydrated(): Promise<boolean>;
    waitForHydration(timeout?: number): Promise<void>;
    hydrate(): Promise<void>;
}

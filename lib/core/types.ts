
// Page Types

export interface PageObject {
    waitUntilLoaded(): Promise<void>;
    isLoaded(): Promise<boolean>;
}

export interface RoutablePage extends PageObject {
    navigate(): Promise<void>;
    isCurrentPage(): Promise<void>;
}

// Component Types

export interface DataComponent<T> {
    read(): Promise<Partial<T>>;
}

export interface HydratableComponent<T> {
    data: Partial<T>;
    isHydrated(): Promise<boolean>;
    waitForHydration(timeout?: number): Promise<void>;
    hydrate(): Promise<void>;
}
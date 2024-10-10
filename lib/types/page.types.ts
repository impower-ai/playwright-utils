
export interface PageObject {
    waitUntilLoaded(): Promise<void>;
    isLoaded(): Promise<void>;
}

export interface RoutablePage extends PageObject {
    readonly path: string;
    navigate(): Promise<void>;
    isCurrentPage(): Promise<void>;
}

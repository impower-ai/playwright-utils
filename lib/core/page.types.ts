
export interface Page {
    waitUntilLoaded(): Promise<void>;
    isLoaded(): Promise<void>;
}

export interface RoutablePage extends Page {
    readonly path: string;
    navigate(): Promise<void>;
    isCurrentPage(): Promise<void>;
}

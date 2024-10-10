
export interface PageObject {
    waitUntilLoaded(): Promise<void>;
    isLoaded(): Promise<boolean>;
}

export interface RoutablePage extends PageObject {
    navigate(): Promise<void>;
    isCurrentPage(): Promise<void>;
}

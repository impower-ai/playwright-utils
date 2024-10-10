import { TestData } from "./types";
import { v4 } from "uuid";

/**
 * Represents a test case with associated data and setup.
 * @template T - The type of the test data.
 */
export default class TestCase<T> {

    public readonly id: string;
    public readonly name: string;
    public readonly data: Partial<T>;
    private readonly setup?: (data: Partial<T>) => Promise<void>;

    public constructor(data: TestData<T>) {
        this.id = v4();
        this.name = data.name;
        this.data = data.data;
        this.setup = data.setup;
    }

    /**
     * Initializes the test case by running the setup function if provided.
     * @returns {Promise<void>} A promise that resolves when initialization is complete.
     */
    public async init(): Promise<void> {
        if (this.setup) await this.setup(this.data);
    }
}
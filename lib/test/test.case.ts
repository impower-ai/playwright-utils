import { v4 } from "uuid";

export type TestDataCallback<T> = (data: Partial<T>) => Promise<void> | void;

export interface TestCaseDefinition<T> {
    name: string;
    data: Partial<T>;
}

export default abstract class TestCase<T> implements TestCaseDefinition<T> {

    public readonly id: string;
    public readonly name: string;
    public readonly data: Partial<T>;

    public constructor(data: TestCaseDefinition<T>) {
        this.id = v4();
        this.name = data.name;
        this.data = data.data;
    }

    public abstract setup(data: Partial<T>): Promise<void>;

    public abstract teardown(data: Partial<T>): Promise<void>;
}
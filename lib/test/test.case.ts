import { v4 } from "uuid";
import { ZodIssue, ZodIssueCode, ZodObject, ZodRawShape } from "zod";
import type {
    TestCaseCallback,
    TestCaseDefinition,
    TestCaseValidationError
} from "./types";

export enum TestCaseValidationErrorTypes {
    TypeError,
    RuleError
}

export default class TestCase<T> {

    public readonly id: string;
    public readonly name: string;
    public readonly data: Partial<T>;
    public readonly schema: ZodObject<ZodRawShape>;
    private readonly _setupCallback?: TestCaseCallback<T>;
    private readonly _teardownCallback?: TestCaseCallback<T>;

    public constructor(definition: TestCaseDefinition<T>) {
        this.id = v4();
        this.name = definition.name;
        this.data = definition.data;
        this.schema = definition.schema;
        this._setupCallback = definition.setup;
        this._teardownCallback = definition.teardown;
    }

    public async setup(): Promise<void> {
        if (this._setupCallback) await this._setupCallback(this.id, this.data);
    }

    public async teardown(): Promise<void> {
        if (this._teardownCallback) await this._teardownCallback(this.id, this.data);
    }

    public validateTypes(): TestCaseValidationError[] {
        const result = this.schema.safeParse(this.data);
        const errors: TestCaseValidationError[] = [];
        if (!result.success) {
            result.error.issues.forEach((issue: ZodIssue) => {
                switch(issue.code) {
                    case ZodIssueCode.invalid_type:
                        errors.push({
                            type: TestCaseValidationErrorTypes.TypeError,
                            message: `[${this.id}] Invalid Type: ${issue.path[0]}. Expected ${issue.expected}, received ${issue.received}`
                        });
                        break;
                    default:
                        errors.push({
                            type: TestCaseValidationErrorTypes.TypeError,
                            message: `[${this.id}] ${ZodIssueCode[issue.code]}: ${issue.path}. ${issue.message}`
                        });
                }
            });
        }
        return errors;
    }
}

import { RuleCallback, RuleDefinition } from "./types";

export default class Rule<T> {

    public readonly id: number;
    public readonly name: string;
    public readonly check: RuleCallback<T>;
    public readonly dependsOn: number[];

    public constructor(definition: RuleDefinition<T>) {
        this.id = definition.id;
        this.name = definition.name;
        this.check = definition.check;
        this.dependsOn = definition.dependsOn || [];
    }
}

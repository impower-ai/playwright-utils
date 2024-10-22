import { Page } from "@playwright/test";
import { z } from "zod";
import {
    Test,
    TestInfo,
    TestOrchestrator,
    TestBuilder,
    TestCase,
    Utils,
    TestCaseDefinition,
} from "../lib";
import { RuleDefinition } from "../lib/test/types";

// Define Pokemon Schema

const PokemonSchema = z.object({
    name: z.string(),
    baseExperience: z.number(),
    abilities: z.array(z.any()).nonempty(),
    forms: z.array(z.any()).nonempty()
});

type PokemonData = z.infer<typeof PokemonSchema>;

// Define callback for test case setup

const setupCallback = async (id: string, data: Partial<PokemonData>) => {
    console.log(`[${id}] Setup.`);
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${data.name!}`);
    if (!response.ok) throw new Error("Failed to prepare async data.");
    const pokemon = await response.json();
    data.baseExperience = pokemon["base_experience"];
    data.abilities = pokemon["abilities"];
    data.forms = pokemon["forms"];
}

const teardownCallback = async (id: string, data: Partial<PokemonData>) => {
    console.log(`[${id}] Teardown.`);
}

// Define Test Cases

const testCase1: TestCaseDefinition<PokemonData> = {
    schema: PokemonSchema,
    name: "Test Case #1",
    data: {
        name: "pikachu"
    }
}

const testCase2: TestCaseDefinition<PokemonData> = {
    schema: PokemonSchema,
    name: "Test Case #2",
    data: {
        name: "ditto"
    }
};

const testCase3: TestCaseDefinition<PokemonData> = {
    schema: PokemonSchema,
    name: "Test Case #3",
    data: {
        name: "bulbasaur"
    }
};

// Define default rules

enum Rules {
    PokemonBaseExperienceMustBeGreaterThan100,
    PokemonMustNotBeBulbasaur
}

const defaultRules: RuleDefinition<PokemonData>[] = [
	{
        id: Rules.PokemonBaseExperienceMustBeGreaterThan100,
		name: "Pokemon base experience must be at least 100",
		check: (data: Partial<PokemonData>) => {
            if (data.baseExperience! < 100) return false;
			return true;
		}
	},
    {
        id: Rules.PokemonMustNotBeBulbasaur,
        name: "Pokemon must not be bulbasaur",
        check: (data: Partial<PokemonData>): boolean => {
            if (data.name && data.name == "bulbasaur") return false;
            return true;
        },
        dependsOn: [
            Rules.PokemonBaseExperienceMustBeGreaterThan100
        ]
    }
];

// Define test suite
Test.describe("Data Driven Testing", () => {
    
    const dataDrivenTest: TestOrchestrator<PokemonData> = TestBuilder.new<PokemonData>({ validateTypes: true, validateRules: true })
        .addCase([ testCase1, testCase2 ])
        .addCase(testCase3)
        .addRule(defaultRules)
        .setup(setupCallback)
        .teardown(teardownCallback)
        .build();

    dataDrivenTest.start(run);
});

export default async function run(page: Page, testInfo: TestInfo, testCase: TestCase<PokemonData>): Promise<void> {
    console.log(`[${testCase.id}] [${testInfo.testId}] Test started.`);

    await Utils.Timing.delay(Utils.Random.getRandomInteger(250, 1000));

    console.log(`[${testCase.id}] [${testInfo.testId}] Test finished.`);
}
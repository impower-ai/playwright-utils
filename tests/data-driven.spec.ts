import { Page, TestInfo, test } from "@playwright/test";
import { DataDrivenTestBuilder, TestCase, Utils } from "../lib";
import { z } from "zod";
import { TestCaseDefinition } from "../lib/test/test.case";
import { TestRuleCallback } from "../lib/test/test.rule";

// Helper method

async function fetchPokemon(pokemon: string) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (!response.ok) throw new Error("Failed to prepare async data.");
    return await response.json();
}

// Define Pokemon Schema

const PokemonSchema = z.object({
    name: z.string(),
    baseExperience: z.number(),
    abilities: z.array(z.any()).nonempty(),
    forms: z.array(z.any()).nonempty()
});

type PokemonData = z.infer<typeof PokemonSchema>;

// Define custom test class

class PokemonTestCase extends TestCase<PokemonData> {

    public async setup(data: Partial<PokemonData>): Promise<void> {
        const pokemon = await fetchPokemon(data.name!);
        data.baseExperience = pokemon["base_experience"];
        data.abilities = pokemon["abilities"];
        data.forms = pokemon["forms"];
    }
    
    public async teardown(): Promise<void> {
        // Perform asynchronous teardown here
    }
}

// Define Test Cases

const testCase1 = new PokemonTestCase({
	name: "Test Case #1",
	data: {
		name: "pikachu"
	}
});

const testCase2 = new PokemonTestCase({
	name: "Test Case #2",
	data: {
		name: "ditto"
	}
});

// Define default rules

const defaultRules: { name: string, check: TestRuleCallback<PokemonData> }[] = [
	{
		name: "Pokemon base experience must be at least 100",
		check: (data: Partial<PokemonData>) => {
            if (data.baseExperience! < 100) return false;
			return true;
		}
	},
];

// Define test suite

test.describe("Data Driven Testing", () => {
    
    const dataDrivenTest = new DataDrivenTestBuilder<PokemonData, PokemonTestCase>(PokemonSchema)
        .addCases([
            testCase1,
            testCase2
        ])
        .addRules(defaultRules)
        .addRule({
            name: "Pokemon must not be bulbasaur",
            check: (data: Partial<PokemonData>): boolean => {
                if (data.name && data.name == "bulbasaur") return false;
                return true;
            }
        })
        .addBeforeAllHook("Custom BeforeAll", async () => {
            await Utils.Timing.delay(1000);
        })
        .addBeforeEachHook("Custom BeforeEach", async () => {
            await Utils.Timing.delay(250);
        })
        .addAfterAllHook("Custom AfterAll", async () => {
            await Utils.Timing.delay(1000);
        })
        .addAfterEachHook("Custom AfterEach", async () => {
            await Utils.Timing.delay(250);
        })
        .build();

    dataDrivenTest.start(run);
});

export default async function run(page: Page, testInfo: TestInfo, testCase: TestCase<PokemonData>): Promise<void> {
    console.log("[Test] Start");

    console.log(JSON.stringify(testCase, null, "    "));

    console.log("[Test] Finish");
}
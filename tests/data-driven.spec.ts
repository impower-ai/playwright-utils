import { Page, TestInfo, test } from "@playwright/test";
import { Test, TestCase } from "../lib/core/test";
import { TestData } from "../lib/core/test.types";

type PokemonData = {
    name: string;
    baseExperience: number;
    abilities: Array<any>;
    forms: Array<any>;
};

async function fetchPokemon(pokemon: string) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (!response.ok) throw new Error("Failed to prepare async data.");
    return await response.json();
}

export const testCase1: TestData<PokemonData> = {
    name: "Test Case #1",
    data: {
        name: "pikachu"
    },
    setup: async (data: Partial<PokemonData>) => {
        console.log(`[${data.name!}] setup start`);
        const pokemon = await fetchPokemon(data.name!);
        data.baseExperience = pokemon["base_experience"];
        data.abilities = pokemon["abilities"];
        data.forms = pokemon["forms"];
        console.log(`[${data.name!}] setup end`);
    },
};

export const testCase2: TestData<PokemonData> = {
    name: "Test Case #2",
    data: {
        name: "ditto"
    },
    setup: async (data: Partial<PokemonData>) => {
        console.log(`[${data.name!}] setup start`);
        const pokemon = await fetchPokemon(data.name!);
        data.baseExperience = pokemon["base_experience"];
        data.abilities = pokemon["abilities"];
        data.forms = pokemon["forms"];
        console.log(`[${data.name!}] setup end`);
    },
};

test.describe("Data Driven Testing", () => {
    test(...Test.prepare(testCase1, run));
    test(...Test.prepare(testCase2, run));
});

export default async function run(page: Page, testInfo: TestInfo, testCase: TestCase<PokemonData>): Promise<void> {
    console.log("[Test] Start");

    console.log(JSON.stringify(testCase, null, "    "));

    console.log("[Test] Finish");
}
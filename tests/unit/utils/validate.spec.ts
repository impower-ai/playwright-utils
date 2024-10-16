import { test, expect } from "@playwright/test";
import { Utils } from "../../../lib";
import { z } from "zod";

const PokemonSchema = z.object({
    name: z.string(),
    baseExperience: z.number(),
    abilities: z.array(z.any()).nonempty(),
    forms: z.array(z.any()).nonempty(),
});

type PokemonData = z.infer<typeof PokemonSchema>;

const validData: PokemonData = {
    name: "name",
    baseExperience: 10,
    abilities: [
        "something",
        {
            another: "thing"
        }
    ],
    forms: [
        "something"
    ]
};

const invalidData = {
    name: 123,
    baseExperience: "wrong",
    abilities: [],
    forms: 1234
};

test.describe("", () => {

    test("Complex Type Validation", async () => {
        const parseResult = PokemonSchema.parse(validData);

        const invalidParseResult = PokemonSchema.parse(invalidData);

        console.log(invalidParseResult);
    });
});
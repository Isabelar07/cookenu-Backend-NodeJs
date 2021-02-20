export class Recipe {
    constructor(
        public readonly recipe_id: string,
        public readonly title: string,
        public readonly description: string,
        public readonly createAt: string,
        public readonly user_id: string,
    ) {}
}

export interface RecipeInputDTO {
    title: string,
    description: string
}
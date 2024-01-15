const { z } = require("zod");

const ingredientRecipeSchema = z.object({
  id: z.number(),
  ingredient: z
    .string()
    .min(2)
    .regex(/[A-Za-z]+$/, {
      message: "Ingredient must contain only alphabetic",
    }),
  mesure_unit: z
    .string()
    .min(1)
    .regex(/[A-Za-z]+$/, {
      message: "Mesure_unit must contain only alphabetic",
    }),
  quantity: z.number().positive().min(1),
});

const informationRecipeSchema = z.object({
  cooking_time: z.number().positive().min(1).max(1440),
  difficulty: z.number().positive().min(1),
  image: z.string().min(5),
  preparation_time: z.number().positive().min(1).max(720),
  title: z
    .string()
    .min(5)
    .max(150)
    .regex(/[A-Za-z]+$/, {
      message: "Mesure_unit must contain only alphabetic",
    }),
  type: z
    .string()
    .min(5)
    .regex(/[A-Za-z]+$/),
});

const stepsRecipeSchema = z.object({
  step: z.string().min(10).max(1000),
});

const tableIngredientRecipeValidation = (req, res, next) => {
  try {
    const { info, ingredients, steps } = req.body;
    informationRecipeSchema.parse(info);
    ingredients.forEach((i) => ingredientRecipeSchema.parse(i));
    steps.forEach((s) => stepsRecipeSchema.parse(s));
    next();
  } catch (error) {
    next(error);
  }
};
module.exports = { tableIngredientRecipeValidation };

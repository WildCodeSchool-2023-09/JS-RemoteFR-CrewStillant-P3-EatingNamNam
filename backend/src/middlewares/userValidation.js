const { z } = require("zod");

const userSchema = z.object({
  firstname: z
    .string()
    .min({
      value: 2,
      message: "Firstname must contain at least 2 characters",
    })
    .regex(/[A-Za-z]+$/, {
      message: "Firstname must contain only alphabetic",
    }),
  lastname: z
    .string()
    .min({ value: 2, message: "Lastname must contain at least 2 characters" })
    .regex(/[A-Za-z]+$/, {
      message: "Lastname must contain only alphabetic",
    }),
  pseudo: z
    .string()
    .min({ value: 4, message: "Pseudo must contain at least 4 characters" }),
  mail: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, {
      message:
        "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character",
    }),
  week_time_kitchen: z.number().positive().int(),
  weight: z.number().positive().int(),
  birthdate: z.string({ message: "Invalid datetime string" }),
});

const userValidation = (req, res, next) => {
  try {
    userSchema.parse(req.body);
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { userValidation };

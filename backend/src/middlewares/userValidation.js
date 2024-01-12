const { z } = require("zod");

const userSchema = z.object({
  firstname: z
    .string()
    .min(2)
    .regex(/[A-Za-z]+$/, {
      message: "Firstname must contain only alphabetic",
    }),
  lastname: z
    .string()
    .min(2)
    .regex(/[A-Za-z]+$/, {
      message: "Lastname must contain only alphabetic",
    }),
  pseudo: z.string().min(4),
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
    delete req.body?.confirmEmail;
    delete req.body?.confirmPassword;
    userSchema.parse(req.body);
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { userValidation };

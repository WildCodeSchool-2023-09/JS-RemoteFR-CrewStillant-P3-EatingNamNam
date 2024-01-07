// const moment = require("moment");
import moment from "moment";

const updatedData = {
  firstname: "",
  lastname: "",
  birthdate: "",
  mail: "",
  pseudo: "",
  week_time_kitchen: "",
  weight: "",
  password: "",
  confirmPassword: "",
};

const user = [
  {
    id: 1,
    type: "pseudo",
    fr: "Pseudo",
    inputType: "text",
    pattern: { value: null, message: null },
    minLength: {
      value: 4,
      message: "Votre pseudo doit contenir au minimum 4 caractères",
    },
    value: updatedData.pseudo,
  },
  {
    id: 2,
    type: "firstname",
    fr: "Prénom",
    inputType: "text",
    pattern: {
      value: /[A-Za-z]+$/,
      message: "Votre prénom doit contenir que des lettres",
    },
    minLength: {
      value: 2,
      message: "Votre prénom doit contenir au minimum 2 caractères",
    },
    value: updatedData.firstname,
  },
  {
    id: 3,
    type: "lastname",
    fr: "Nom",
    inputType: "text",
    pattern: {
      value: /[A-Za-z]+$/,
      message: "Votre Nom doit contenir que des lettres",
    },
    minLength: {
      value: 2,
      message: "Votre nom doit contenir au minimum 2 caractères",
    },
    value: updatedData.lastname,
  },
  {
    id: 4,
    type: "mail",
    fr: "E-mail",
    inputType: "mail",
    pattern: {
      value: /\b[\w.-]+@[\w.-]+\.\w{2,4}\b/,
      message: "Votre email n'a pas la bonne syntaxe, ex: johndoe@doe.fr",
    },
    minLength: { value: null, message: null },
    value: updatedData.mail,
  },
  {
    id: 5,
    type: "birthdate",
    fr: "Date de naissance",
    inputType: "date",
    pattern: {
      value: /^(19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31)$/,
      message:
        "Vous devez renseigner une date dans le bon format, ex: AAAA/MM/JJ",
    },
    minLength: { value: null, message: null },
    value: moment(updatedData.birthdate).format("DD/MM/YYYY"),
  },
  {
    id: 6,
    type: "weight",
    fr: "Poids",
    inputType: "number",
    pattern: {
      value: /\d+/,
      message: "Seulement un nombre entier positif",
    },
    minLength: { value: null, message: null },
    value: updatedData.weight,
  },
  {
    id: 7,
    type: "week_time_kitchen",
    fr: "Temps passé en cuisine (h/s)",
    inputType: "number",
    pattern: {
      value: /\d+/,
      message: "Seulement un nombre entier positif",
    },
    minLength: { value: null, message: null },
    value: updatedData.week_time_kitchen,
  },
];

export default user;

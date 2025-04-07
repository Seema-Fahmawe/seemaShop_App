import bcrypt from "bcrypt";

export const hash = (plainText, saltRound = process.env.saltRound) => {
  const hashResult = bcrypt.hashSync(plainText, parseInt(saltRound));

  return hashResult;
};

export const compare = (password, hashValue) => {
  const hashResult = bcrypt.compareSync(password, hashValue);

  return hashResult;
};

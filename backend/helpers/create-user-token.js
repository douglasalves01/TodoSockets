import jwt from "jsonwebtoken";

export const createUserToken = async (name, id, req, res) => {
  const token = jwt.sign(
    {
      name: name,
      id: id,
    },
    "nossosecret"
  );
  res.status(200).json({
    message: "Você está atutenticado",
    token: token,
    userId: id,
  });
};

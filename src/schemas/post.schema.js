import Joi from "joi";

const postSchema = Joi.object({
  url: Joi.string().required(),
  description: Joi.string().allow(""),
  userId: Joi.number().min(0).required(),
});

export default postSchema;

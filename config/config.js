const dotenv = require("dotenv");
const path = require("path");
const Joi = require("joi");
const Module = require("module");
dotenv.config({ path: path.join(__dirname, "../.env") });
const envVarsSchema = Joi.object()
  .keys({
    PORT: Joi.number().default(5000),
    NODE_ENV: Joi.string()
      .valid("production", "development", "test")
      .required(),
    MONGODB_URL: Joi.string().required().description("Mongo DB url"),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mongoose: {
    url: envVars.MONGODB_URL + (envVars.NODE_ENV === "test" ? "-test" : ""),
  
  },
};

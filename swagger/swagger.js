const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Realtime Social Post & Chat API",
            version: "1.0.0",
            description: "API documentation for Social Post + Chat Application",
        },
        servers: [{ url: "http://localhost:5000" }],
    },
    // Read routes directly under src/*
    apis: ["./src/*/*.js"],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

const setupSwagger = (app) => {
    app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = setupSwagger;

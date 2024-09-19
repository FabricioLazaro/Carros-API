const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path')

const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'API de Carros',
        version: '1.0.0',
        description: 'Documentação da API para gerenciamento de carros',
      },
      servers: [
        {
          url: 'http://localhost:3000', // Substitua pela URL do seu servidor
        },
      ],
      components: {
        schemas: {
          Carro: {
            type: 'object',
            required: ['Marca', 'Modelo', 'Ano'],
            properties: {
              Id: {
                type: 'integer',
                description: 'Identificador único do carro',
                example: 1,
              },
              Marca: {
                type: 'string',
                description: 'Marca do carro',
                example: 'Toyota',
              },
              Modelo: {
                type: 'string',
                description: 'Modelo do carro',
                example: 'Corolla',
              },
              Ano: {
                type: 'integer',
                description: 'Ano de fabricação do carro',
                example: 2020,
              },
            },
          },
        },
        responses: {
          NotFound: {
            description: 'Carro não encontrado',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    error: {
                      type: 'string',
                      example: 'Carro não encontrado',
                    },
                  },
                },
              },
            },
          },
          BadRequest: {
            description: 'Requisição inválida',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    error: {
                      type: 'string',
                      example: 'Dados inválidos fornecidos',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    apis: [path.join(__dirname, "./routes/*.js")], // Caminho para os arquivos de rotas com anotações Swagger
};

const swaggerSpec = swaggerJsdoc(options);

const setupSwagger = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, { explorer: true }));
};

module.exports = setupSwagger;

    


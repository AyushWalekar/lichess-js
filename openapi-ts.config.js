import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
    input: './lichess-openapi.json',
    output: {
        path: './src/generated',
        format: 'prettier',
        lint: 'eslint'
    },
    client: 'fetch',
    types: {
        enums: 'javascript'
    },
    services: {
        asClass: false
    }
}); 
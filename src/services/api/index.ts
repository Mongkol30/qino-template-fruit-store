// Base API for internal/authenticated endpoints
export { baseApi, baseApiMiddleware, baseApiReducer } from './base-api';

// Factory for creating external API instances
export {
    createExternalApi,
    type ExternalApiOptions,
    type ExternalApiResult
} from './create-external-api';


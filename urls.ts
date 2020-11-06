export const baseUrl =
    'https://launch.smarthealthit.org/v/r4/sim/eyJrIjoiMSIsImoiOiIxIiwiYiI6IjMyNmI0Njc1LTBiYzgtNGRiZC1iNDA2LWE1NTY0YzI4MjQwMSJ9'

export const discovery = {
    authorizationEndpoint: `${baseUrl}/auth/authorize`,
    tokenEndpoint: `${baseUrl}/auth/token`,
}

export const serverUrl = `${baseUrl}/fhir`

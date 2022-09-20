const baseURL = 'http://localhost:3011'

export const fetchEvents = async () => {
    const response = await fetch(`${baseURL}/events`)
    return await response.json()
}

export const storeEvent = async (event) => {
    return await fetch(`${baseURL}/events`, {})
}
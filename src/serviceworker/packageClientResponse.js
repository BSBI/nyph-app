export function packageClientResponse (returnedToClient) {
    const headers = new Headers;
    headers.set('Content-Type', 'application/json');

    return new Response(
        JSON.stringify(returnedToClient),
        {
            status: returnedToClient.error ? 500 : 200,
            headers
        });
}
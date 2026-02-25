export const createJsonResponse = (resp: object, status: number = 200) =>
  new Response(JSON.stringify(resp), {
    headers: {
      'content-type': 'application/json',
    },
    status,
  })

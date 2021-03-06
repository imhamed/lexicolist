async function handleResponse(response) {
  if (response.ok) return response.json();
  if (response.status === 400) {
    // So, a server-side validation error occurred.
    // Server side validation returns a string error message, so parse as text instead of json.
    const error = await response.text();
    throw new Error(error);
  }
  throw new Error("Network response was not ok.");
}

// In a real app, would likely call an error logging service.
function handleError(error) {
  // eslint-disable-next-line no-console
  console.error("API call failed. " + error);
  throw error;
}

const baseUrl = process.env.API_URL + "/lexicos/";

export function getLexicos() {
  return fetch(baseUrl).then(handleResponse).catch(handleError);
}

export function saveLexico(lexico) {
  return fetch(baseUrl + (lexico.id || ""), {
    method: lexico.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify(lexico),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteLexico(lexicoId) {
  return fetch(baseUrl + lexicoId, { method: "DELETE" })
    .then(handleResponse)
    .catch(handleError);
}

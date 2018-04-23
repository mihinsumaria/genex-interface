/**
 * Fetch API does not capture HTTP error responses (400, 404, 500, ...).
 * Therefore, call this function to intercept these errors and throw a
 * new error that the Fetch API can catch.
 * @param {object} response response from the Fetch API
 */
export default function handleErrors(response) {
  if (!response.ok) {
    return response.json().then(errJSON => {
      throw Error(response.statusText + ': ' + errJSON.message);
    })
  }
  return response;
}

export function logError(err) {
  console.log('ERROR - ' + err.message)
}
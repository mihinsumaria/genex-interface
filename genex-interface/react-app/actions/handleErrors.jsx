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
const handleApiCallFetch = (url: any, params: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(url, params);
      if (!response.ok) {
        // If the response status is not OK (e.g., 404 or 500), handle the error
        const errorData = await response.json();
        reject(`Error: ${response.status} - ${errorData.message}`);
        return;
      }
      const responseData = await response.json();
      return resolve(responseData);
    } catch (error) {
      // Handle other types of errors (e.g., network issues)
      reject(`Error: ${error}`);
    }
  });
};
export default handleApiCallFetch;

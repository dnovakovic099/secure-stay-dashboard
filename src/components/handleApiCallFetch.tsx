import React from 'react'

const handleApiCallFetch = (url: any, params: any) => {
    return new Promise(async (resolve, reject) => {
        const response = await fetch(url, params).then((Response) => {
            if (Response) {
                return Response.json()
            }
        })
        return resolve(response);
    });
}
export default handleApiCallFetch;

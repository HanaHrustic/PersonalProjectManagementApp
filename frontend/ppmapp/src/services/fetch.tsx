
export const fetchData = async (url: string, token: string, header?: any ) => {
    return await fetch(url, { method: "GET", headers: { "Content-Type": "application/json",  "Authorization": token, ...header } })
      .then((result) => {
        if(result.status>=200 && result.status<400){
            return result.json();
        }else{
            throw new Error(`Failed to get. ${result.status}`)
        };
    })
    .then((data) => data)
    .catch((error) => console.error(error.message));
  };
export const postData = async (url: string, token: string, payload: Object ) => {
  return await fetch(url, { method: "POST", body: JSON.stringify(payload), headers: { "Content-type": "application/json; charset=UTF-8",  "Authorization": token }})
    .then((result) => result.json())
    .then((data)=>data)
    .catch((error) => console.error(error.message));
};

export const putData = async (url: string, token: string, payload: Object ) => {
    return await fetch(url, { method: "PUT", body: JSON.stringify(payload), headers: { "Content-type": "application/json; charset=UTF-8",  "Authorization": token }})
    .then((result) => {
        if(result.status>=200 && result.status<400){
            return result.json();
        }else{
            throw new Error(`Failed to put. ${result.status}`)
        };
    })
    .then((data) => data)    
    .catch(error => console.error(error.message));
};
  
export const deleteData = async (url: string, token: string ) => {
    return await fetch(url, { method: "DELETE", headers: { "Content-type": "application/json; charset=UTF-8",  "Authorization": token}})
    .then((result) => {
        if(result.status<=200 || result.status>=400){
            throw new Error(`Failed to delete. ${result.status}`)
        }else return result;
    })
    .catch(error => console.error(error.message));
};

export const patchData = async (url: string, token: string, payload: Object) => {
    return await fetch(url, { method: "PATCH", body: JSON.stringify(payload), headers: { "Content-type": "application/json; charset=UTF-8",  "Authorization": token }})
    .then((result) => {
        if(result.status>=200 && result.status<400){
            return result.json();
        }else{
            throw new Error(`Failed to patch. ${result.status}`)
        };
    })
    .then((data) => data)    
    .catch(error => console.error(error.message));
};
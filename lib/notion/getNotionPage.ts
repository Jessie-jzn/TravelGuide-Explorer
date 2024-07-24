export const getPage = (params: any) => {
  return fetch(`/api/fetchGuideList`, {
    method: 'POST',
    body: JSON.stringify(params),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((res) => {
      if (res.ok) {
        return res;
      }

      const error: any = new Error(res.statusText);
      error.response = res;
      return Promise.reject(error);
    })
    .then((res) => res.json());
};

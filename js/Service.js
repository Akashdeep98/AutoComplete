
export const getApiData = async (url, params={}) => {
  try {
    return await fetch(url, params)
  } catch (e) {
    console.log(e);
  }
};

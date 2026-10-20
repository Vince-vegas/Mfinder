export const fetchData = async (url, thunkAPI) => {
  const res = await fetch(url, {
    signal: thunkAPI.signal,
    headers: {
      'Content-type': 'application/json',
      'Authorization': `Bearer ${process.env.REACT_APP_TMDB_ID_AUTHORIZATION}`,
    }
  })

  if(!res.ok) {
    throw new Error("error on fetch")
  }

  return res.json()
}
import axios from 'axios'

const CLIENT_ID = '9908882fa92d445a8f92ef386b5bb73b'
const CLIENT_SECRET = 'e6a5b83d00264c94939eec29d45b241c'

// Encode credentials
const AUTH_URL = 'https://accounts.spotify.com/api/token'
const BASE_URL = 'https://api.spotify.com/v1'

// Get token (client credentials flow)
export const getAccessToken = async () => {
  const params = new URLSearchParams()
  params.append('grant_type', 'client_credentials')

  const response = await axios.post(AUTH_URL, params, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization:
        'Basic ' + btoa(`${CLIENT_ID}:${CLIENT_SECRET}`),
    },
  })

  return response.data.access_token
}

// Search music
export const searchSpotify = async (type, term) => {
  const token = await getAccessToken()

  const response = await axios.get(`${BASE_URL}/search`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      q: term,
      type: type,
      limit: 10,
    },
  })

  return response.data
}


import axios from 'axios'

// Configure base URL (ajuste conforme seu ambiente)
axios.defaults.baseURL = process.env.VUE_APP_API_URL || 'http://localhost:8000'

// Configure headers
axios.defaults.headers.common['Accept'] = 'application/json'
axios.defaults.headers.common['Content-Type'] = 'application/json'

// Add request interceptor for CSRF token (if using)
axios.interceptors.request.use(
  config => {
    // Se você estiver usando CSRF tokens do Laravel
    const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content')
    if (token) {
      config.headers['X-CSRF-TOKEN'] = token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// Add response interceptor for error handling
axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Redirect to login if unauthorized
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default axios

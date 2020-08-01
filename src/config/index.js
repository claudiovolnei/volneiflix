const URL_BACKEND_TOP = window.location.hostname.includes('localhost') ?
    'http://localhost:3001' :
    'https://volneiflix.herokuapp.com';

export default {
    URL_BACKEND_TOP,
}
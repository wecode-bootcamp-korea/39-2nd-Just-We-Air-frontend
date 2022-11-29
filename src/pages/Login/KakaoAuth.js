export const CLIENT_ID = 'aba1dcdda390ca40bb072ff5254affea'; //API KEY랑 같은 말
export const REDIRECT_URI = 'http://localhost:3000/oauth/callback/kakao';
export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

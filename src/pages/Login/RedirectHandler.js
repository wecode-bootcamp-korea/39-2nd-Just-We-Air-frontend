// 리다이렉트될 화면. 카카오에서 토큰 받아와서 백엔드에 전해주기
import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Spinner from './Spinner';
import API from '../../config';
import { CLIENT_ID, REDIRECT_URI } from './KakaoAuth';

const RedirectHandler = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const code = searchParams.get('code');
  const fetchUrl = 'https://kauth.kakao.com/oauth/token';

  useEffect(() => {
    fetch(fetchUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `grant_type=authorization_code&client_id=${CLIENT_ID}&redirect_url=${REDIRECT_URI}&code=${code}`,
    })
      .then(res => res.json())
      .then(res => {
        if (res.access_token) {
          fetch(API.login, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json; charset=utf-8',
            },
            body: JSON.stringify({
              kakaoAccessToken: res.access_token,
            }),
          })
            .then(res => res.json())
            .then(data => {
              localStorage.setItem('accessToken', data.accessToken);
              if (data.needUpdateUserProfile) {
                alert('회원정보가 확인 되지 않아 회원가입 창으로 이동합니다.');
                navigate('/sign-up');
              } else {
                navigate('/');
              }
            });
        }
      });
  });

  return <Spinner />;
};

export default RedirectHandler;

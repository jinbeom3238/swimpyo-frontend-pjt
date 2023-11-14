import * as React from 'react';
import { Grid, Container, Typography, Divider } from '@mui/material';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import api from '../../../hooks/RefreshTokenAuto';
import { useEffect } from 'react';
import user_icon from '../../../assets/user_icon.png';
import MiniResLogList from './MiniResLogList';
import MiniReviewList from './MiniReviewList';

const button = {
  width: '20rem',
  bgcolor: 'lemonchiffon',
  height: '7rem',
  textAlign: 'center',
  padding: '2rem',
  mt: '1rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};
const list = {
  bgcolor: 'background.paper',
  height: '20rem',
  textAlign: 'center',
  mt: '2rem',
  padding: '1rem',
};

const titleFont = {
  fontSize: '20px',
  fontWeight: 'bold',
};

export default function MyPageMain() {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userNickName, setUserNickName] = useState('');
  const [resLogList, setResLogList] = useState([]);
  console.log('userName', userName);
  console.log('userEmail', userEmail);
  console.log('userNickName', userNickName);

  const config = {
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  };

  useEffect(() => {

    api.post("/api/user/member/userInfo",)
      .then((response) => {
        console.log('userInfo', response.data);
        if (response.data != null) {
          setUserName(response.data.u_m_name);
          setUserEmail(response.data.u_m_email);
          setUserNickName(response.data.u_m_nickname);
        }
      });

    api.get("/api/user/mypage/GetRezList", JSON.stringify('24'), config,)
      .then((response) => {
        console.log('GetRezList', response.data);
        if (response.data != null) {
          setResLogList(response.data);
        }
      });

  }, []);

  return (
    <Container component="main"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
      }}>
      <Box sx={{ ...button, borderRadius: '10px' }}>
        <Grid container>
          <Grid item xs={4}><img src={user_icon} style={{ width: '100%', maxWidth: '100px' }} /></Grid>
          <Grid item xs={8}>
            <Typography sx={{ fontWeight: 'bold', mt: '1rem' }}>
              {userNickName}님
            </Typography>
            <Typography>
              {userEmail}
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Grid container>

        <Grid item xs={6}>
          <Box sx={{ ...list, borderRadius: '13px', mr: '10px' }}>
            <Typography sx={{ ...titleFont }}>
              예약
            </Typography>
            <Divider sx={{ width: '100%', mt: '1rem' }} />

            {(resLogList.length != 0) && resLogList.slice(0, 3).map((item) => (<MiniResLogList {...item} />))}
            {(resLogList.length == 0) &&
              <Typography sx={{mt: '1rem'}}>
                예약 정보가 없습니다.
              </Typography>}
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box sx={{ ...list, borderRadius: '13px', ml: '10px' }}>
            <Typography sx={{ ...titleFont }}>
              리뷰
            </Typography>
            <Divider sx={{ width: '100%', mt: '1rem' }} />
            <MiniReviewList />
            <MiniReviewList />
            <MiniReviewList />
            <MiniReviewList />
          </Box>
        </Grid>

      </Grid>
    </Container>
  );
}
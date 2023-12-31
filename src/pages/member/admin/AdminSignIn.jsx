import React, { useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { setAccessToken } from '../../../commons/rtk/slice/SignInSlice';
import { useSelector,useDispatch } from 'react-redux';
import api from '../../../hooks/RefreshTokenAuto';

function AdminSignIn() {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  
  const dispatch = useDispatch();
  const token = useSelector((store)=> store.accessToken.value);

  const linkStyle = {
    color: 'black',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: 'normal',
  };

  const config = {
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  };

  const signInForm = (e) => {
    e.preventDefault();

    let data = {};

    data = {
      "email": email,
      "pw": pw,
    }

    api.post("/api/admin/member/signIn", JSON.stringify(data), config,)
      .then((response) => {

        if (response.data === "MemberAdminLoginFail") {
          alert("존재하지 않는 정보입니다.");

        } else if (response.data === "IncorrectIdOrPw") {
          alert("이메일 또는 비밀번호가 일치하지 않습니다.");

        } else { 
          dispatch(setAccessToken.setAccessToken(response.data));
          navigate('/admin');

        }

      })
      .catch();
  };

  const navigate = useNavigate();

  return (
    <>
    <Container component="main" maxWidth="xs" sx={{ marginBottom: '3rem', marginTop: '3rem' }}>
      <Paper elevation={3} sx={{ padding: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h5" component="h1">
          관리자 로그인
        </Typography>
        <form onSubmit={(e) => signInForm(e)} style={{ width: '100%', marginTop: 1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="email"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="pw"
            label="비밀번호"
            type="password"
            id="pw"
            autoComplete="current-password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
          /> 
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, backgroundColor: 'black', color: 'white', '&:hover': { backgroundColor: 'black' } }} 
          >
            로그인
          </Button>
        </form>
        <Link to="/admin/member/signUp" style={linkStyle}>계정이 없으신가요? 회원가입</Link>
      </Paper>
    </Container>
    </>
  );
}

export default AdminSignIn;

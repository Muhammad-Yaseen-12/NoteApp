import { useState } from "react";
import axios from 'axios';
import {
  Card,
  Form,
  Input,
  Button,
  Typography,
  Space,
  Alert,
  Divider,
  notification
} from 'antd';
import {
  UserOutlined,
  LockOutlined,
  LoginOutlined,
  MailOutlined
} from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
const { Title, Text, Link } = Typography;
import authContext from '../context/AuthContext';
import { useContext } from 'react';
function Login() {

  let { setIsUser } = useContext(authContext)
  const navigate = useNavigate();
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();

  const loginUser = async () => {
    if (!loginForm.email || !loginForm.password) {
      showNotification('warning', 'Missing Information', 'Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      console.log(loginForm);

      let res = await axios.post(`${import.meta.env.VITE_BACKEND_LINK}/login`, loginForm, {
        withCredentials: true
      });
      console.log(res);
      setIsUser(true);
      localStorage.setItem('token', JSON.stringify(res.data.token));


      showNotification('success', 'Login Successful', 'Welcome back!');
      setLoginForm({
        email: "",
        password: ""
      });

      setTimeout(() => {
        navigate('/dashboard');
      }, 600); 

    } catch (error) {
      console.log("Login Error:", error);
      const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
      showNotification('error', 'Login Failed', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (type, message, description) => {
    api[type]({
      message,
      description,
      placement: 'topRight',
    });
  };

  const handelChange = (e) => {
    const { name, value } = e.target;
    setLoginForm({ ...loginForm, [name]: value });
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    loginUser();
  };

  return (
    <>
      {contextHolder}
      <div
        style={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}
      >
        <Card
          style={{
            width: '100%',
            maxWidth: 400,
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
            border: 'none',
            borderRadius: '12px'
          }}
          bodyStyle={{ padding: '32px' }}
        >
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <Space direction="vertical" size="small">
              <LoginOutlined
                style={{
                  fontSize: 48,
                  color: '#1890ff',
                  background: '#f0f8ff',
                  padding: 16,
                  borderRadius: '50%'
                }}
              />
              <Title level={3} style={{ margin: 0, color: '#262626' }}>
                Welcome Back
              </Title>
              <Text type="secondary">
                Sign in to your account to continue
              </Text>
            </Space>
          </div>

          {/* Login Form */}
          <Form layout="vertical" onSubmitCapture={handleSubmit}>
            <Form.Item
              label="Email Address"
              style={{ marginBottom: 20 }}
            >
              <Input
                size="large"
                placeholder="Enter your email"
                prefix={<MailOutlined style={{ color: '#bfbfbf' }} />}
                name="email"
                type="email"
                value={loginForm.email}
                onChange={handelChange}
                style={{ borderRadius: '6px' }}
              />
            </Form.Item>

            <Form.Item
              label="Password"
              style={{ marginBottom: 24 }}
            >
              <Input.Password
                size="large"
                placeholder="Enter your password"
                prefix={<LockOutlined style={{ color: '#bfbfbf' }} />}
                name="password"
                value={loginForm.password}
                onChange={handelChange}
                style={{ borderRadius: '6px' }}
              />
            </Form.Item>

            <Form.Item style={{ marginBottom: 16 }}>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                loading={loading}
                block
                style={{
                  height: '48px',
                  borderRadius: '6px',
                  fontSize: '16px',
                  fontWeight: 500
                }}
                icon={<LoginOutlined />}
              >
                Sign In
              </Button>
            </Form.Item>
          </Form>

          {/* Additional Links */}
          <div style={{ textAlign: 'center' }}>
            <Space direction="vertical" size="small">
              <Link href="#" style={{ fontSize: '14px' }}>
                Forgot your password?
              </Link>
              <Divider plain style={{ margin: '16px 0', fontSize: '12px', color: '#bfbfbf' }}>
                OR
              </Divider>
              <Text type="secondary" style={{ fontSize: '14px' }}>
                Don't have an account? <Link href="#" strong>Sign up</Link>
              </Text>
            </Space>
          </div>

          {/* Demo Info Alert */}
          <Alert
            message="Demo Credentials"
            description="Use your registered email and password to sign in."
            type="info"
            showIcon
            style={{ marginTop: 24, borderRadius: '6px' }}
          />
        </Card>
      </div>
    </>
  );
}

export default Login;
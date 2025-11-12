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
  MailOutlined,
  UserAddOutlined,
  IdcardOutlined
} from '@ant-design/icons';
import { useNavigate } from "react-router-dom";

const { Title, Text, Link } = Typography;

function Signup() {
  let navigate =useNavigate();
  const [userForm, setUserForm] = useState({
    name: "",
    email: "",
    password: ""
  });
  
  const [loading, setLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();

  const signupUser = async () => {
    if (!userForm.name || !userForm.email || !userForm.password) {
      showNotification('warning', 'Missing Information', 'Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      console.log(userForm);

      await axios.post(`${import.meta.env.VITE_BACKEND_LINK}/register`, userForm, {
        withCredentials: true
      });

      showNotification('success', 'Signup Successful', 'Your account has been created successfully!');

setUserForm({
  name: "",
  email: "",
  password: ""
});
      
      // You might want to redirect here or update app state
      
      
    } catch (error) {
      console.log("Signup Error:", error);
      const errorMessage = error.response?.data?.message || 'Signup failed. Please try again.';
      showNotification('error', 'Signup Failed', errorMessage);
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
    setUserForm({ ...userForm, [name]: value });
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    signupUser();
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
            maxWidth: 420,
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
            border: 'none',
            borderRadius: '12px'
          }}
          bodyStyle={{ padding: '32px' }}
        >
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <Space direction="vertical" size="small">
              <UserAddOutlined 
                style={{ 
                  fontSize: 48, 
                  color: '#1890ff',
                  background: '#f0f8ff',
                  padding: 16,
                  borderRadius: '50%'
                }} 
              />
              <Title level={3} style={{ margin: 0, color: '#262626' }}>
                Create Account
              </Title>
              <Text type="secondary">
                Sign up to get started with our application
              </Text>
            </Space>
          </div>

          {/* Signup Form */}
          <Form layout="vertical" onSubmitCapture={handleSubmit}>
            <Form.Item
              label="Full Name"
              style={{ marginBottom: 20 }}
            >
              <Input
                size="large"
                placeholder="Enter your full name"
                prefix={<UserOutlined style={{ color: '#bfbfbf' }} />}
                name="name"
                value={userForm.name}
                onChange={handelChange}
                style={{ borderRadius: '6px' }}
              />
            </Form.Item>

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
                value={userForm.email}
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
                placeholder="Create a strong password"
                prefix={<LockOutlined style={{ color: '#bfbfbf' }} />}
                name="password"
                value={userForm.password}
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
                icon={<IdcardOutlined />}
              >
                Create Account
              </Button>
            </Form.Item>
          </Form>

          {/* Terms and Conditions */}
          <div style={{ textAlign: 'center', marginBottom: 16 }}>
            <Text type="secondary" style={{ fontSize: '12px' }}>
              By creating an account, you agree to our{' '}
              <Link href="#" style={{ fontSize: '12px' }}>Terms of Service</Link> and{' '}
              <Link href="#" style={{ fontSize: '12px' }}>Privacy Policy</Link>
            </Text>
          </div>

          {/* Additional Links */}
          <div style={{ textAlign: 'center' }}>
            <Space direction="vertical" size="small">
              <Divider plain style={{ margin: '16px 0', fontSize: '12px', color: '#bfbfbf' }}>
                ALREADY HAVE AN ACCOUNT?
              </Divider>
              <Text type="secondary" style={{ fontSize: '14px' }}>
                Already registered? <Link href="#" strong>Sign in here</Link>
              </Text>
            </Space>
          </div>

          {/* Security Info Alert */}
          <Alert
            message="Secure Registration"
            description="Your information is protected with encryption. Choose a strong password."
            type="info"
            showIcon
            style={{ marginTop: 24, borderRadius: '6px' }}
          />
        </Card>
      </div>
    </>
  );
}

export default Signup;
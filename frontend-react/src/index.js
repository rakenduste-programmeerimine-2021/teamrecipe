import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Layout } from 'antd';
import 'antd/dist/antd.css';

const { Footer, Content } = Layout;

ReactDOM.render(
  <React.StrictMode>
        <Layout>
          <Content>
              <App />
          </Content>
        </Layout>
  </React.StrictMode>,
  document.getElementById('root'),
);

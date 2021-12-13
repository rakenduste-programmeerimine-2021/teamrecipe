import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import App from './App';
import { Layout } from 'antd';
import Store from './store';

const { Footer, Content } = Layout;

ReactDOM.render(
        <Layout>
          <Content>
            <Store>
              <App />
            </Store>
          </Content>
        </Layout>,
  document.getElementById('root'),
);

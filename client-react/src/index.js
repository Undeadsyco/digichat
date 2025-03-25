// Dependencies
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import { RecoilRoot } from 'recoil';

// Components
import App from './App';
import ModalComponent from './components/layouts/AppLayout/Modal';
// import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Router>
    <RecoilRoot>
      <Suspense fallback={<ModalComponent />}>
        <App />
      </Suspense>
    </RecoilRoot>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

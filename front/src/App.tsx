import * as React from 'react';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
// import ReduxThunk from 'redux-thunk';
import rootReducer from './reduces/rootReducer';
import Router from './Router';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas/index';
import 'antd/dist/antd.css';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware, logger))
);

sagaMiddleware.run(rootSaga);

const App = () => {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
};

export default App;

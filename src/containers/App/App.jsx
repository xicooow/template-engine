import './App.css';

import Controller from '../Controller';

import {
  ConfirmDialogProvider
} from '../../containers/Providers';

const App = () => {
  return (
    <div className='app'>
      <ConfirmDialogProvider>
        <Controller />
      </ConfirmDialogProvider>
    </div>
  );
};

export default App;

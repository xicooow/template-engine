import './App.css';

import Controller from '../Controller';

import {
  ConfirmDialogProvider,
  EditDialogProvider
} from '../Providers';

const App = () => {
  return (
    <div className='app'>
      <ConfirmDialogProvider>
        <EditDialogProvider>
          <Controller />
        </EditDialogProvider>
      </ConfirmDialogProvider>
    </div>
  );
};

export default App;

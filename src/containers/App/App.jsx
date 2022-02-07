import './App.css';

import Controller from '../Controller';
import ConfirmDialogProvider from '../../components/ConfirmDialog';

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

import { createRoot } from 'react-dom/client'; // Import from react-dom/client
import { Provider } from 'react-redux';
import store from './app/store'; // Ensure this path is correct
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

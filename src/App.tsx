import { createRoot } from 'react-dom/client';
import Datalayer from './components/Datalayer';

const div = document.createElement('div');
document.body.appendChild(div);
const root = createRoot(div)

root.render(<Datalayer />);
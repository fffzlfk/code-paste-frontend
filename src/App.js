import './components/CodeEditor'
import EditorCtrl from './components/EditorCtrl';
import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EditorCtrl isNew={true}/>} />
        <Route path="/:id" element={<EditorCtrl isNew={false}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

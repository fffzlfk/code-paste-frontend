import ReactEditor from 'react-simple-code-editor';
import { getHighlighter } from '../utils/highlighting';
import 'prismjs/themes/prism.css';

const CodeEditor = ({ content, setContent, type }) => {
    const highlight = getHighlighter(type);

    return (
        <ReactEditor
            value={content}
            onValueChange={setContent}
            highlight={highlight}
            placeholder={'Type some code...'}
            padding={10}
            style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 17,
            }}
        />
    )
}

export default CodeEditor;
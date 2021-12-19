import AceEditor from "react-ace";

import "../utils/lib/modes"
import "../utils/lib/themes"

const CodeEditor = ({ content, setContent, type, theme }) => {

    return (
        <main>
            <AceEditor
                width="80%"
                height="900px"
                mode={type}
                theme={theme}
                placeholder='Type some code...'
                onChange={setContent}
                value={content}
                fontSize={17}
                editorProps={{
                    enableBasicAutocompletion: true,
                }}
                showGutter={false}
                showPrintMargin={true}
            />
        </main>
    )
}

export default CodeEditor;
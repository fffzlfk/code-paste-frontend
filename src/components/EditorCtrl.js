import Select from 'react-select';
import { languageIds } from '../utils/highlighting';
import { useEffect, useState } from 'react';
import CodeEditor from './CodeEditor';
import { useParams, useNavigate } from 'react-router';
import { Button } from '@mui/material';

const baseURL = "http://lcoalhost:8080/"

const options = languageIds.map((language) => {
    return {
        value: language,
        label: language,
    }
});

const EditorCtrl = ({ isNew }) => {
    const id = useParams("id").id;

    const [type, setType] = useState('plain');
    const [content, setContent] = useState('');
    const [isreadMode, setIsReadMode] = useState(false);

    useEffect(() => {
        (
            async () => {
                if (!isNew && !isreadMode) {
                    const data = await fetch(`${baseURL}/api/read/${id}`, {
                        method: "GET",
                    });
                    const json = await data.json();
                    setContent(json.data);
                    setType(json.type);
                    setIsReadMode(true);
                }
            }
        )()
    });

    const navigate = useNavigate();

    const handleClick = async () => {
        const data = content;
        if (!(/\S/.test(data))) {
            alert('不能为空');
            return;
        }
        const resp = await fetch(`${baseURL}/api/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                type,
                data,
            })
        })
        const json = await resp.json();
        navigate("/" + json.uuid);
    }

    const handleShare = () => {
        const el = document.createElement('input');
        el.value = window.location.href;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        alert('复制成功');
    }

    return (
        <main>
            {!isNew && <Button variant="contained" onClick={() => navigate("/")}>new</Button>}
            <> </>
            {!isNew && <Button variant="contained" onClick={handleShare}>点击复制分享链接</Button>}
            {isNew && <Select
                defaultValue={options.filter(option => option.label === 'plain')}
                options={options}
                onChange={option => {
                    setType(option.value)
                }}
            />}
            <CodeEditor
                content={content}
                setContent={setContent}
                type={type}
            />
            {isNew && <Button variant="contained" onClick={handleClick}>paste</Button>}
        </main>
    )
}

export default EditorCtrl;
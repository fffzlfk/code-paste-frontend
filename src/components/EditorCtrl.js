import Select from 'react-select';
import {
    useEffect,
    useState
} from 'react';
import CodeEditor from './CodeEditor';
import {
    useParams,
    useNavigate
} from 'react-router';
import {
    Button
} from '@mui/material';

import './../styles/editor.css'
import configData from "./../config.json";
import languageOptions from '../utils/languages';
import themeOptions from '../utils/themes';
import expireOptions from '../utils/expires';

const SERVER_URL = configData.SERVER_URL

const EditorCtrl = ({
    isNew
}) => {
    const id = useParams("id").id;

    const [type, setType] = useState('text');
    const [theme, setTheme] = useState('github');
    const [expiredDays, setExpiredDays] = useState(7);
    const [content, setContent] = useState('');
    const [isreadMode, setIsReadMode] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        (
            async () => {
                if (!isNew && !isreadMode) {
                    try {
                        const data = await fetch(`${SERVER_URL}/read/${id}`, {
                            method: "GET",
                        });
                        const json = await data.json();
                        setContent(json.data);
                        setType(json.type);
                        setIsReadMode(true);
                    } catch (e) {
                        navigate("/");
                    }
                }
            }
        )()
    });

    const handleClick = async () => {
        const data = content;
        data.trim();
        if (!(/\S/.test(data))) {
            alert('不能为空');
            return;
        }
        const resp = await fetch(`${SERVER_URL}/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "type": type,
                "expired_days": expiredDays,
                data,
            })
        })
        const json = await resp.json();
        navigate("/" + json.uuid);
    }

    const copyToClipboard = (value) => {
        const el = document.createElement('input');
        el.value = value;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        alert('复制成功');
    }

    return (
        <main className="container">
            {!isNew && <div className="wrapper">
                <div className="item">
                    <Button variant="contained" onClick={() => { setContent(''); navigate("/") }}>new</Button>
                </div>
                <div className="item">
                    <Button variant="contained" onClick={() => copyToClipboard(window.location.href)}>点击复制分享链接</Button>
                </div>
                <div className="item">
                    <Button variant="contained" onClick={() => copyToClipboard(content)}>点击复制内容</Button>
                </div>
            </div>}

            {isNew && <div className="wrapper">
                <div className="item">
                    <span className="sub">语言</span>
                    <Select
                        className="sub"
                        defaultValue={languageOptions.filter(option => option.label === 'text')}
                        options={languageOptions}
                        onChange={option => {
                            setType(option.value)
                        }}
                    />
                </div>

                <div className="item">
                    <span className="sub">过期时间</span>
                    <Select
                        className="sub"
                        defaultValue={expireOptions.filter(option => option.label === '1 Day')}
                        options={expireOptions}
                        onChange={option => {
                            setExpiredDays(option.value)
                        }}
                    />
                </div>

                <div className="item">
                    <span className="sub">主题</span>
                    <Select
                        className="sub"
                        defaultValue={themeOptions.filter(option => option.label === 'github')}
                        options={themeOptions}
                        onChange={option => {
                            setTheme(option.value)
                        }}
                    />
                </div>

                <div className="item">
                    <Button variant="contained" onClick={handleClick}>paste</Button>
                </div>
            </div>}

            <div className="editor">
                <CodeEditor
                    content={content}
                    setContent={setContent}
                    type={type}
                    theme={theme}
                />
            </div>
        </main>
    )
}

export default EditorCtrl;

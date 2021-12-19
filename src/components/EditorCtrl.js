import Select from 'react-select';
import {
    languageIds
} from '../utils/highlighting';
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

import configData from "./../config.json";

const SERVER_URL = configData.SERVER_URL

const languageOptions = languageIds.map((language) => {
    return {
        value: language,
        label: language,
    }
});

const expireOptions = [{
    value: 1,
    label: "1 Day"
},
{
    value: 7,
    label: "7 Days"
},
{
    value: 30,
    label: "1 Month"
},
]

const EditorCtrl = ({
    isNew
}) => {
    const id = useParams("id").id;

    const [type, setType] = useState('plain');
    const [expiredDays, setExpiredDays] = useState(7);
    const [content, setContent] = useState('');
    const [isreadMode, setIsReadMode] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        (
            async () => {
                if (!isNew && !isreadMode) {
                    const data = await fetch(`${SERVER_URL}/read/${id}`, {
                        method: "GET",
                    }).catch(e => {
                        navigate("/");
                    });
                    const json = await data.json();
                    setContent(json.data);
                    setType(json.type);
                    setIsReadMode(true);
                }
            }
        )()
    });


    const handleClick = async () => {
        const data = content;
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
            <div>
                <div>
                    {isNew && <Select
                        defaultValue={languageOptions.filter(option => option.label === 'plain')}
                        options={languageOptions}
                        onChange={option => {
                            setType(option.value)
                        }}
                    />}
                </div>
                <div>
                    {isNew && <Select
                        defaultValue={expireOptions.filter(option => option.label === '1 Day')}
                        options={expireOptions}
                        onChange={option => {
                            setExpiredDays(option.value)
                        }}
                    />}
                </div>
            </div>

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

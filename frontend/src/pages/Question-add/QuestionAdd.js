import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const QuestionAdd = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const [file, setFile] = useState(null);
    const [fileUrl, setFileUrl] = useState('');

    const getPresignedUrl = async (filename) => {
        const response = await fetch(`/presignedurl`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ filename })
        });
        return response.json();
    };

    const uploadFile = async (url, file) => {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': file.type
            },
            body: file
        });

        if (response.ok) {
            return url.split('?')[0];
        } else {
            throw new Error('File upload failed');
        }
    };

    const handleFileChange = async (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);

        try {
            const { url } = await getPresignedUrl(selectedFile.name);
            const uploadedFileUrl = await uploadFile(url, selectedFile);
            setFileUrl(uploadedFileUrl);
        } catch (error) {
            alert('파일 업로드 중 오류가 발생했습니다.');
        }
    };

    const handleAdd = async () => {
        if (!title || !content) {
            alert('제목과 내용을 모두 입력해주세요.');
            return;
        }

        const newQuestion = {
            title,
            content,
            author,
            views: 0,
            likes: 0,
            fileURL: fileUrl
        };

        try {
            const response = await fetch('/reportadd', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newQuestion)
            });

            if (response.ok) {
                setTitle('');
                setContent('');
                setAuthor('');
                setFile(null);
                setFileUrl('');
                navigate('/question-list');
            } else {
                alert('추가 중 오류가 발생했습니다.');
            }
        } catch (error) {
            alert('서버와의 통신 중 오류가 발생했습니다.');
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="제목"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                placeholder="내용"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            <input
                type="text"
                placeholder="작성자"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
            />
            <input
                type="file"
                onChange={handleFileChange}
            />
            {fileUrl && (
                <img
                    src={fileUrl}
                    alt="Preview"
                    style={{ width: '100px', height: '100px' }}
                />
            )}
            <button onClick={handleAdd}>추가</button>
        </div>
    );
};

export default QuestionAdd;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';

const QuestionDetail = () => {
    const [question, setQuestion] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    let { qid } = useParams();
    let navigate = useNavigate();

    useEffect(() => {
        const fetchQuestion = async () => {
            try {
                const response = await axios.get(`/question-list/${qid}/detail`);
                setQuestion(response.data);
                setTitle(response.data.title);
                setContent(response.data.content);
            } catch (error) {
                console.error('Error fetching question:', error);
            }
        };
        fetchQuestion();
    }, [qid]);

    const handleUpdate = async () => {
        try {
            const response = await axios.put(`/question-list/${question.id}`, { title, content });
            if (response.status === 200) {
                setQuestion({ ...question, title, content });
                setIsEditing(false);
            } else {
                alert('Failed to update question');
            }
        } catch (error) {
            console.error('Error updating question:', error);
            alert('Error updating question');
        }
    };

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`/question-list/${question.id}`);
            if (response.status === 200) {
                navigate('/question-list');
            } else {
                alert('Failed to delete question');
            }
        } catch (error) {
            console.error('Error deleting question:', error);
            alert('Error deleting question');
        }
    };

    const handleLike = async () => {
        try {
            const response = await axios.post(`/question-list/${question.id}/like`);
            if (response.status === 200) {
                setQuestion({ ...question, likes: question.likes + 1 });
            } else {
                alert('Failed to like question');
            }
        } catch (error) {
            console.error('Error liking question:', error);
            alert('Error liking question');
        }
    };

    if (!question) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {isEditing ? (
                <div>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                    <button onClick={handleUpdate}>수정 완료</button>
                </div>
            ) : (
                <div>
                    <h2>{question.title}</h2>
                    <p>{question.content}</p>
                    <p>작성자: {question.author}</p>
                    <p>조회 수: {question.views}</p>
                    <p>좋아요: {question.likes}</p>
                    <button onClick={() => setIsEditing(true)}>수정</button>
                    <button onClick={handleDelete}>삭제</button>
                    <button onClick={handleLike}>좋아요</button>
                    <button onClick={() => {
                        navigate('/question-list');
                    }}>뒤로가기</button>
                </div>
            )}
        </div>
    );
};

export default QuestionDetail;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    questions: Array.from({ length: 100 }, (_, index) => ({
        id: index + 1,
        title: `수리 영역/ 추리영역 ${index + 1}`,
        content: `질문 ${index + 1}의 내용`,
        author: `작성자${index + 1}`,
        views: 0,
        likes: 0
    })),
};
const questionSlice = createSlice({
    name: 'questions',
    initialState,
    reducers: {
        addQuestion: (state, action) => {
            state.questions.push(action.payload);
        },
        updateQuestion: (state, action) => {
            const { id, title, content } = action.payload;
            const question = state.questions.find(q => q.id === id);
            if (question) {
                question.title = title;
                question.content = content;
            }
        },
        deleteQuestion: (state, action) => {
            state.questions = state.questions.filter(q => q.id !== action.payload);
        },
        likeQuestion: (state, action) => {
            const question = state.questions.find(q => q.id === action.payload);
            if (question) {
                question.likes += 1;
            }
        },
        viewQuestion: (state, action) => {
            const question = state.questions.find(q => q.id === action.payload);
            if (question) {
                question.views += 1;
            }
        },
    },
});

export const { addQuestion, updateQuestion, deleteQuestion, likeQuestion, viewQuestion } = questionSlice.actions;

export default questionSlice.reducer;

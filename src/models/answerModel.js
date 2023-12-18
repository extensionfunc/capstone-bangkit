import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
        required: true
    },
    answer: {
        type: String, 
        required: true
    }
});

const AnswerModel = mongoose.model('Answer', answerSchema);

export default AnswerModel;
from ..models.base import BaseModel
from .custom_validators import BaseValidator, AdancedValidator
from typing import Union
from bson import ObjectId

class ModelValidator():
    @staticmethod
    def check_unique(collection, key, value) -> bool:
        return BaseModel.find_one(
            collection, 
            {
                key: value 
            }
        ) is None
    
    @staticmethod
    def check_exist_key(collection, key) -> bool:
        return BaseModel.find_one(
            collection,
            {
                "_id": ObjectId(key)
            }
        ) is not None
    
    @staticmethod
    def check_created_at(created_time: str) -> bool:
        return (
            BaseValidator.check_null(created_time) and
            BaseValidator.check_blank(created_time) and
            BaseValidator.check_type("datetime", created_time)
        )

    @staticmethod
    def check_updated_at(updated_at: str) -> bool:
        return (
            BaseValidator.check_null(updated_at) and
            BaseValidator.check_blank(updated_at) and
            BaseValidator.check_type("datetime", updated_at)
        )

class UserValidator():
    @staticmethod
    def check_user_name(user_name: str) -> bool:
        if (
            BaseValidator.check_type("string", user_name) and
            BaseValidator.check_null(user_name) and
            BaseValidator.check_blank(user_name) and
            BaseValidator.check_max_length(50, user_name)
        ): return True
        return False
    
    @staticmethod
    def check_date_of_birth(date_of_birth: str) -> bool:
        if (
            BaseValidator.check_type("date", date_of_birth) and
            BaseValidator.check_null(date_of_birth) and
            BaseValidator.check_blank(date_of_birth) and
            AdancedValidator.check_date_of_birth(date_of_birth)
        ): return True
        return False
    
    @staticmethod
    def check_email(email: str) -> bool:
        if (
            BaseValidator.check_type("string", email) and
            BaseValidator.check_null(email) and
            BaseValidator.check_blank(email) and
            ModelValidator.check_unique('user', 'email_phone_number', email) and
            AdancedValidator.check_email(email)
        ): return True
        return False
    
    @staticmethod
    def check_phone_number(phone_number: str) -> bool:
        if (
            BaseValidator.check_type("string", phone_number) and
            BaseValidator.check_null(phone_number) and
            BaseValidator.check_blank(phone_number) and
            ModelValidator.check_unique('user', 'email_phone_number', phone_number) and
            AdancedValidator.check_phone_number(phone_number)
        ): return True
        return False
    
    @staticmethod
    def check_password(password: str) -> bool:
        if (
            BaseValidator.check_type("string", password) and
            BaseValidator.check_null(password) and
            BaseValidator.check_blank(password) and
            BaseValidator.check_min_length(6, password) and
            BaseValidator.check_max_length(12, password) and
            AdancedValidator.check_password(password)
        ): return True
        return False
    
    @staticmethod
    def check_role(role: str) -> bool:
        if (
            BaseValidator.check_type("string", role) and
            BaseValidator.check_null(role) and
            BaseValidator.check_blank(role) and
            (role == "Admin" or role == "Basic User" or role == "Premium User") 
        ): return True
        return False
    
    @staticmethod
    def check_avatar(avatar: Union[bytes, bytearray]) -> bool:
        if BaseValidator.check_type("binary", avatar): return True  
        return False
    
    @staticmethod
    def check_user(user: dict) -> bool:
        user_name = user.get('user_name', None)
        date_of_birth = user.get('date_of_birth', None)
        email = user.get('email', None)
        phone_number = user.get('phone_number', None)
        password = user.get('password', None)
        role = user.get('role', None)
        avatar = user.get('avatar', None)
        if (
            UserValidator.check_user_name(user_name) and
            UserValidator.check_date_of_birth(date_of_birth) and
            UserValidator.check_email(email) and
            UserValidator.check_phone_number(phone_number) and
            UserValidator.check_password(password) and
            UserValidator.check_role(role) and
            UserValidator.check_avatar(avatar)
        ): return True
        return False
    
class QuizzesValidator():
    @staticmethod
    def check_user_id(user_id: ObjectId) -> bool:
        if (
            BaseValidator.check_type('objectId', user_id) and
            ModelValidator.check_exist_key('user', user_id) and
            BaseValidator.check_null(user_id) and
            BaseValidator.check_blank(user_id)
        ): return True
        return False
    
    @staticmethod
    def check_title(title: str) -> bool:
        if (
            BaseValidator.check_type('string', title) and
            BaseValidator.check_null(title) and
            BaseValidator.check_blank(title) and
            ModelValidator.check_unique('quizzes', 'title', title) and
            BaseValidator.check_min_length(4, title) and
            BaseValidator.check_max_length(120, title)
        ): return True
        return False
    
    @staticmethod
    def check_attempt_count(attempt_count: int) -> bool:
        if (
            BaseValidator.check_type('int', attempt_count) and
            BaseValidator.check_null(attempt_count) and
            BaseValidator.check_blank(attempt_count) and
            BaseValidator.check_min(0, attempt_count)
        ): return True
        return False

    @staticmethod
    def check_number_of_questions(number_of_questions: int) -> bool:
        if (
            BaseValidator.check_type('int', number_of_questions) and
            BaseValidator.check_null(number_of_questions) and
            BaseValidator.check_blank(number_of_questions) and
            BaseValidator.check_min(0, number_of_questions)
        ): return True
        return False
    
    @staticmethod
    def check_time_limit(time_limit: int) -> bool:
        if (
            BaseValidator.check_type('int', time_limit) and
            BaseValidator.check_null(time_limit) and
            BaseValidator.check_min(0, time_limit)
        ): return True
        return False
    
    @staticmethod
    def check_quiz(quiz: dict) -> bool:
        user_id = quiz.get('user_id', None)
        title = quiz.get('title', None)
        attempt_count = quiz.get('attempt_count', None)
        number_of_questions = quiz.get('number_of_questions', None)
        time_limit = quiz.get('time_limit', None)
        if (
            QuizzesValidator.check_user_id(user_id) and
            QuizzesValidator.check_title(title) and
            QuizzesValidator.check_attempt_count(attempt_count) and
            QuizzesValidator.check_number_of_questions(number_of_questions) and
            QuizzesValidator.check_time_limit(time_limit)
        ): return True
        return False

class QuestionsValidator():
    @staticmethod
    def check_question_bank_id(question_bank_id: ObjectId) -> bool:
        if (
            BaseValidator.check_type('objectId', question_bank_id) and
            ModelValidator.check_exist_key('question_bank', question_bank_id) and
            BaseValidator.check_null(question_bank_id) and
            BaseValidator.check_blank(question_bank_id)
        ): return True
        return False
    
    @staticmethod
    def check_question_text(question_text: str) -> bool:
        if (
            BaseValidator.check_type('string', question_text) and
            BaseValidator.check_null(question_text) and
            BaseValidator.check_blank(question_text) and
            BaseValidator.check_min_length(12, question_text) and
            BaseValidator.check_max_length(120, question_text)
        ): return True
        return False
    
    @staticmethod
    def check_status(status: bool) -> bool:
        if (
            BaseValidator.check_type('boolean', status) and
            BaseValidator.check_null(status) 
        ): return True
        return False
    
    @staticmethod
    def check_explanation(explanation: str) -> bool:
        if (
            BaseValidator.check_type('string', explanation) and
            BaseValidator.check_null(explanation) and
            BaseValidator.check_blank(explanation) and
            BaseValidator.check_min_length(12, explanation) and
            BaseValidator.check_max_length(1024, explanation)
        ): return True
        return False

    @staticmethod
    def check_answer_text_A(answer_text_A: str) -> bool:
        if (
            BaseValidator.check_type('string', answer_text_A) and
            BaseValidator.check_null(answer_text_A) and
            BaseValidator.check_blank(answer_text_A) and
            BaseValidator.check_min_length(1, answer_text_A) and
            BaseValidator.check_max_length(255, answer_text_A)
        ): return True
        return False
    
    @staticmethod
    def check_answer_text_B(answer_text_B: str) -> bool:
        if (
            BaseValidator.check_type('string', answer_text_B) and
            BaseValidator.check_null(answer_text_B) and
            BaseValidator.check_blank(answer_text_B) and
            BaseValidator.check_min_length(1, answer_text_B) and
            BaseValidator.check_max_length(255, answer_text_B)
        ): return True
        return False
    
    @staticmethod
    def check_answer_text_C(answer_text_C: str) -> bool:
        if (
            BaseValidator.check_type('string', answer_text_C) and
            BaseValidator.check_null(answer_text_C) and
            BaseValidator.check_blank(answer_text_C) and
            BaseValidator.check_min_length(1, answer_text_C) and
            BaseValidator.check_max_length(255, answer_text_C)
        ): return True
        return False
    
    @staticmethod
    def check_answer_text_D(answer_text_D: str) -> bool:
        if (
            BaseValidator.check_type('string', answer_text_D) and
            BaseValidator.check_null(answer_text_D) and
            BaseValidator.check_blank(answer_text_D) and
            BaseValidator.check_min_length(1, answer_text_D) and
            BaseValidator.check_max_length(255, answer_text_D)
        ): return True
        return False
    
    @staticmethod
    def check_is_correct(is_correct: str) -> bool:
        if (
            BaseValidator.check_type('string', is_correct) and
            BaseValidator.check_null(is_correct) and
            BaseValidator.check_blank(is_correct) and
            (is_correct in ['A', 'B', 'C', 'D'])
        ): return True
        return False

    @staticmethod
    def check_question(question: dict) -> bool:
        question_bank_id = question.get('question_bank_id', None)
        question_text = question.get('question_text', None)
        status = question.get('status', None)
        explanation = question.get('explanation', None)
        answer_text_A = question.get('answer_text_A', None)
        answer_text_B = question.get('answer_text_B', None)
        answer_text_C = question.get('answer_text_C', None)
        answer_text_D = question.get('answer_text_D', None)
        is_correct = question.get('answer_text_is_correct', None)
        if (
            QuestionsValidator.check_question_bank_id(question_bank_id) and
            QuestionsValidator.check_question_text(question_text) and
            QuestionsValidator.check_status(status) and
            QuestionsValidator.check_explanation(explanation) and
            QuestionsValidator.check_answer_text_A(answer_text_A) and
            QuestionsValidator.check_answer_text_B(answer_text_B) and
            QuestionsValidator.check_answer_text_C(answer_text_C) and
            QuestionsValidator.check_answer_text_D(answer_text_D) and
            QuestionsValidator.check_is_correct(is_correct)
        ): return True
        return False
    
class QuestionBankValidator():
    @staticmethod
    def check_user_id(user_id: ObjectId) -> bool:
        if (
            BaseValidator.check_type('objectId', user_id) and
            ModelValidator.check_exist_key('user', user_id) and
            BaseValidator.check_null(user_id) and
            BaseValidator.check_blank(user_id)
        ): return True
        return False
    
    @staticmethod
    def check_title(title: str) -> bool:
        if (
            BaseValidator.check_type('string', title) and
            BaseValidator.check_null(title) and
            BaseValidator.check_blank(title) and
            BaseValidator.check_min_length(3, title) and
            BaseValidator.check_max_length(120, title)
        ): return True
        return False
    
    @staticmethod
    def check_context(context: str) -> bool:
        if (
            BaseValidator.check_type('string', context) and
            BaseValidator.check_null(context) and
            BaseValidator.check_blank(context) and
            BaseValidator.check_min_length(3, context) 
            # and BaseValidator.check_max_length(255, context)
        ): return True
        return False

    @staticmethod
    def check_question_bank(question_bank: dict) -> bool:
        user_id = question_bank.get('user_id', None)
        title = question_bank.get('title', None)
        context = question_bank.get('context', None)
        if (
            QuestionBankValidator.check_user_id(user_id) and
            QuestionBankValidator.check_title(title) and
            QuestionBankValidator.check_context(context)
        ): return True
        return False

class AnswersValidator():
    @staticmethod
    def check_question_id(question_id: ObjectId) -> bool:
        if (
            BaseValidator.check_type('objectId', question_id) and
            ModelValidator.check_exist_key('questions', question_id) and
            BaseValidator.check_null(question_id) and
            BaseValidator.check_blank(question_id)
        ): return True
        return False

    @staticmethod
    def check_answer_text(answer_text: str) -> bool:
        if (
            BaseValidator.check_type('string', answer_text) and
            BaseValidator.check_null(answer_text) and
            BaseValidator.check_blank(answer_text) and
            BaseValidator.check_min_length(12, answer_text) and
            BaseValidator.check_max_length(120, answer_text)
        ): return True
        return False
    
    @staticmethod
    def check_is_correct(is_correct: bool) -> bool:
        if (
            BaseValidator.check_type('boolean', is_correct) and
            BaseValidator.check_null(is_correct) and
            BaseValidator.check_blank(is_correct) 
        ): return True
        return False
     
    @staticmethod
    def check_answer(answer: dict) -> bool:
        question_id = answer.get('question_id', None)
        answer_text = answer.get('answer_text', None)
        is_correct = answer.get('is_correct', None)
        if (
            AnswersValidator.check_question_id(question_id) and
            AnswersValidator.check_answer_text(answer_text) and
            AnswersValidator.check_is_correct(is_correct)
        ): return True
        return False

class QuizQuestionValidator():
    @staticmethod
    def check_quiz_id(quiz_id: ObjectId) -> bool:
        if (
            BaseValidator.check_type('objectId', quiz_id) and
            ModelValidator.check_exist_key('quizzes', quiz_id) and
            BaseValidator.check_null(quiz_id) and
            BaseValidator.check_blank(quiz_id)
        ): return True
        return False
    
    @staticmethod
    def check_question_id(question_id: ObjectId) -> bool:
        if (
            BaseValidator.check_type('objectId', question_id) and
            ModelValidator.check_exist_key('questions', question_id) and
            BaseValidator.check_null(question_id) and
            BaseValidator.check_blank(question_id)
        ): return True
        return False
    
    @staticmethod
    def checkQuizQuestion(quiz_question: dict) -> bool:
        quiz_id = quiz_question.get('quiz_id', None)
        question_id = quiz_question.get('question_id', None)
        if (
            QuizQuestionValidator.check_quiz_id(quiz_id) and
            QuizQuestionValidator.check_question_id(question_id)
        ): return True
        return False
    
class QuizAttemptsValidator():
    @staticmethod
    def check_quiz_id(quiz_id: ObjectId) -> bool:
        if (
            BaseValidator.check_type('objectId', quiz_id) and
            ModelValidator.check_exist_key('quizzes', quiz_id) and
            BaseValidator.check_null(quiz_id) and
            BaseValidator.check_blank(quiz_id)
        ): return True
        return False
    
    @staticmethod
    def check_user_id(user_id: ObjectId) -> bool:
        if (
            BaseValidator.check_type('objectId', user_id) and
            ModelValidator.check_exist_key('user', user_id) and
            BaseValidator.check_null(user_id) and
            BaseValidator.check_blank(user_id)
        ): return True
        return False
    
    @staticmethod
    def check_correct_ans_count(correct_ans_count: int, quiz_id: ObjectId) -> bool:
        if (
            BaseValidator.check_type('int', correct_ans_count) and
            BaseValidator.check_null(correct_ans_count) and
            BaseValidator.check_blank(correct_ans_count) and
            BaseValidator.check_min(0, correct_ans_count) and
            BaseValidator.check_type('objectId', quiz_id) and
            BaseValidator.check_null(quiz_id) and
            BaseValidator.check_blank(quiz_id) and
            BaseValidator.check_max(
                BaseModel.find_one('quizzes', {
                    '_id': quiz_id
                }).get('number_of_questions', None),
                correct_ans_count
            )
        ): return True
        return False
    
    @staticmethod
    def check_score(score: float, quiz_id: ObjectId) -> bool:
        if (
            BaseValidator.check_type('float', score) and
            BaseValidator.check_null(score) and
            BaseValidator.check_blank(score) and
            BaseValidator.check_min(0, score) and
            BaseValidator.check_type('objectId', quiz_id) and
            BaseValidator.check_null(quiz_id) and
            BaseValidator.check_blank(quiz_id) and
            BaseValidator.check_max(
                10 *
                BaseModel.find_one(
                    'quizzes',
                    {
                        '_id': quiz_id
                    }
                ).get('number_of_questions', None),
                score
            )
        ): return True
        return False
    
    @staticmethod
    def check_completion_level(completion_level: float) -> bool:
        if (
            BaseValidator.check_type('float', completion_level) and
            BaseValidator.check_null(completion_level) and
            BaseValidator.check_blank(completion_level) and
            BaseValidator.check_min(0, completion_level) and
            BaseValidator.check_max(1, completion_level)
        ): return True
        return False
    
    @staticmethod
    def check_incorrect_ans_count(incorrect_ans_count: int, quiz_id: ObjectId) -> bool:
        if (
            BaseValidator.check_type('int', incorrect_ans_count) and
            BaseValidator.check_null(incorrect_ans_count) and
            BaseValidator.check_blank(incorrect_ans_count) and
            BaseValidator.check_min(0, incorrect_ans_count) and
            BaseValidator.check_type('objectId', quiz_id) and
            BaseValidator.check_null(quiz_id) and
            BaseValidator.check_blank(quiz_id) and
            BaseValidator.check_max(
                BaseModel.find_one(
                    'quizzes',
                    {
                        '_id': quiz_id
                    }
                ).get('number_of_questions', None),
                incorrect_ans_count
            )
        ): return True
        return False
    
    @staticmethod
    def check_attempted_at(attempted_at: str) -> bool:
        if (
            BaseValidator.check_type('datetime', attempted_at) and
            BaseValidator.check_null(attempted_at) and
            BaseValidator.check_blank(attempted_at)
        ): return True
        return False
    
    @staticmethod
    def check_quiz_attempt(quiz_attempt: dict) -> bool:
        quiz_id = quiz_attempt.get('quiz_id', None)
        user_id = quiz_attempt.get('user_id', None)
        correct_ans_count = quiz_attempt.get('correct_ans_count', None)
        score = quiz_attempt.get('score', None)
        completion_level = quiz_attempt.get('completion_level', None)
        incorrect_ans_count = quiz_attempt.get('incorrect_ans_count', None)
        attempted_at = quiz_attempt.get('attempted_at', None)
        if (
            QuizAttemptsValidator.check_quiz_id(quiz_id) and
            QuizAttemptsValidator.check_user_id(user_id) and
            QuizAttemptsValidator.check_correct_ans_count(correct_ans_count, quiz_id) and
            QuizAttemptsValidator.check_score(score, quiz_id) and
            QuizAttemptsValidator.check_completion_level(completion_level) and
            QuizAttemptsValidator.check_incorrect_ans_count(incorrect_ans_count, quiz_id) and
            QuizAttemptsValidator.check_attempted_at(attempted_at)
        ): return True
        return False

class UserAnswersValidator():
    @staticmethod
    def check_answer_id(answer_id: ObjectId) -> bool:
        if (
            BaseValidator.check_type('objectId', answer_id) and
            ModelValidator.check_exist_key('answers', answer_id) and
            BaseValidator.check_null(answer_id) and
            BaseValidator.check_blank(answer_id)
        ): return True
        return False
    
    @staticmethod
    def check_question_id(question_id: ObjectId) -> bool:
        if (
            BaseValidator.check_type('objectId', question_id) and
            ModelValidator.check_exist_key('questions', question_id) and
            BaseValidator.check_null(question_id) and
            BaseValidator.check_blank(question_id)
        ): return True
        return False

    @staticmethod
    def check_attempt_id(attempt_id: ObjectId) -> bool:
        if (
            BaseValidator.check_type('objectId', attempt_id) and
            ModelValidator.check_exist_key('quiz_attempts', attempt_id) and
            BaseValidator.check_null(attempt_id) and
            BaseValidator.check_blank(attempt_id)
        ): return True
        return False
    
    @staticmethod
    def check_user_answer(user_answer: dict) -> bool:
        answer_id = user_answer.get('answer_id', None)
        question_id = user_answer.get('question_id', None)
        attempt_id = user_answer.get('attempt_id', None)
        if (
            UserAnswersValidator.check_answer_id(answer_id) and
            UserAnswersValidator.check_question_id(question_id) and
            UserAnswersValidator.check_attempt_id(attempt_id)
        ): return True
        return False

class ForumsValidator():
    @staticmethod
    def check_user_id(user_id: ObjectId) -> bool:
        if (
            BaseValidator.check_type('objectId', user_id) and
            ModelValidator.check_exist_key('user', user_id) and
            BaseValidator.check_null(user_id) and
            BaseValidator.check_blank(user_id)
        ): return True
        return False
    
    @staticmethod
    def check_name(name: str) -> bool:
        if (
            BaseValidator.check_type('string', name) and
            BaseValidator.check_null(name) and
            BaseValidator.check_blank(name) and
            ModelValidator.check_unique('forums', 'name', name) and
            BaseValidator.check_min_length(12, name) and
            BaseValidator.check_max_length(120, name)
        ): return True
        return False
    
    @staticmethod
    def check_description(description: str) -> bool:
        if (
            BaseValidator.check_type('string', description) and
            BaseValidator.check_null(description) and
            BaseValidator.check_blank(description) and
            BaseValidator.check_min_length(12, description) and
            BaseValidator.check_max_length(255, description)
        ): return True
        return False
    
    @staticmethod
    def check_total_posts(total_posts: int) -> bool:
        if (
            BaseValidator.check_type('int', total_posts) and
            BaseValidator.check_null(total_posts) and
            BaseValidator.check_blank(total_posts) and
            BaseValidator.check_min(0, total_posts) 
        ): return True
        return False
    
    @staticmethod
    def check_total_comments(total_comments: int) -> bool:
        if (
            BaseValidator.check_type('int', total_comments) and
            BaseValidator.check_null(total_comments) and
            BaseValidator.check_blank(total_comments) and
            BaseValidator.check_min(0, total_comments) 
        ): return True
        return False

    @staticmethod
    def check_forum(forum: dict) -> bool:
        user_id = forum.get('user_id', None)
        name = forum.get('name', None)
        description = forum.get('description', None)
        total_posts = forum.get('total_posts', None)
        total_comments = forum.get('total_comments', None)
        if (
            ForumsValidator.check_user_id(user_id) and
            ForumsValidator.check_name(name) and
            ForumsValidator.check_description(description) and
            ForumsValidator.check_total_posts(total_posts) and
            ForumsValidator.check_total_comments(total_comments)
        ): return True
        return False
    
class PostsValidator():
    @staticmethod
    def check_forum_id(forum_id: ObjectId) -> bool:
        if (
            BaseValidator.check_type('objectId', forum_id) and
            ModelValidator.check_exist_key('forums', forum_id)
        ): return True
        return False
    
    @staticmethod
    def check_user_id(user_id: ObjectId) -> bool:
        if (
            BaseValidator.check_type('objectId', user_id) and
            ModelValidator.check_exist_key('user', user_id) and
            BaseValidator.check_null(user_id) and
            BaseValidator.check_blank(user_id)
        ): return True
        return False
    
    @staticmethod
    def check_title(title: str) -> bool:
        if (
            BaseValidator.check_type('string', title) and
            BaseValidator.check_null(title) and
            BaseValidator.check_blank(title) and
            BaseValidator.check_min_length(1, title) and
            BaseValidator.check_max_length(120, title)
        ): return True
        return False
    
    @staticmethod
    def check_content(content: str) -> bool:
        if (
            BaseValidator.check_type('string', content) and
            BaseValidator.check_null(content) and
            BaseValidator.check_blank(content) and
            BaseValidator.check_min_length(1, content) and
            BaseValidator.check_max_length(4000, content)
        ): return True
        return False
    
    @staticmethod
    def check_img(img: Union[bytes, bytearray]) -> bool:
        if (
            BaseValidator.check_type('binary', img) and
            BaseValidator.check_null(img) and
            BaseValidator.check_blank(img)
        ): return True
        return False
    
    @staticmethod
    def check_post(post: dict) -> bool:
        forum_id = post.get('forum_id', None)
        user_id = post.get('user_id', None)
        title = post.get('title', None)
        content = post.get('content', None)
        img = post.get('img', None)
        if (
            PostsValidator.check_forum_id(forum_id) and
            PostsValidator.check_user_id(user_id) and
            PostsValidator.check_title(title) and
            PostsValidator.check_content(content) and
            PostsValidator.check_img(img)
        ): return True
        return False

class CommentValidator():
    @staticmethod
    def check_comment_id(comment_id: ObjectId) -> bool:
        if (
            BaseValidator.check_type('objectId', comment_id) and
            ModelValidator.check_exist_key('comments', comment_id) and
            BaseValidator.check_null(comment_id) and
            BaseValidator.check_blank(comment_id)
        ): return True
        return False
    
    @staticmethod
    def check_post_id(post_id: ObjectId) -> bool:
        if (
            BaseValidator.check_type('objectId', post_id) and
            ModelValidator.check_exist_key('posts', post_id) and
            BaseValidator.check_null(post_id) and
            BaseValidator.check_blank(post_id)
        ): return True
        return False
    
    @staticmethod
    def check_user_id(user_id: ObjectId) -> bool:
        if (
            BaseValidator.check_type('objectId', user_id) and
            ModelValidator.check_exist_key('user', user_id) and
            BaseValidator.check_null(user_id) and
            BaseValidator.check_blank(user_id)
        ): return True
        return False
    
    @staticmethod
    def check_content(content: str) -> bool:
        if (
            BaseValidator.check_type('string', content) and
            BaseValidator.check_null(content) and
            BaseValidator.check_blank(content) and
            BaseValidator.check_min_length(1, content) and
            BaseValidator.check_max_length(4000, content)
        ): return True
        return False
    
    @staticmethod
    def check_comment(comment: dict) -> bool:
        post_id = comment.get('post_id', None)
        user_id = comment.get('user_id', None)
        content = comment.get('content', None)
        if (
            CommentValidator.check_post_id(post_id) and
            CommentValidator.check_user_id(user_id) and
            CommentValidator.check_content(content)
        ): return True
        return False
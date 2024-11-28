import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './utils/privateRoute.util.js'
import { AuthProvider } from './context/authentication.context.js';
import { NotificationProvider } from './context/notification.context.js';

import AccountPage from './pages/account.page.js'
import ExamPage from './pages/exam.page.js'
import ExamDetailPage from './pages/examDetail.page.js'
import HistoryPage from './pages/history.page.js'
import HistoryDetailPage from './pages/historyDetail.page.js'
import Scoring from './pages/scoring.page.js';
import HomePage from './pages/home.page.js'
import LoginPage from './pages/login.page.js'
import PostPage from './pages/post.page.js'
import PremiumPage from './pages/premium.page.js'
import QuestionPage from './pages/question.page.js'
import StatisticsPage from './pages/statistics.page.js'
import TakeExamPage from './pages/takeExam.page.js'
import ForumPage from './pages/forum.page.js';
import RegistrationPage from './pages/registration.page.js';
import ListOfCompletedExams from './pages/listOfCompletedExams.page.js';
import AnswerDetail from './pages/answerDetail.page.js';
import QuestionListPage from './pages/questionList.page.js';
import CreateQuestionsPage from './pages/createQuestions.page.js';
import QuestionDetailPage from './pages/questionDetail.page.js';
import EditQuestionPage from './pages/editQuestion.page.js';
import ChatEduVisionPage from './pages/chatEduVision.page.js';
import QuestionBankPage from './pages/questionBank.page.js';
import QuestionBankDetailPage from './pages/questionBankDetail.page.js';
import News01 from './pages/news01.page.js';
import News02 from './pages/news02.page.js';
import News03 from './pages/news03.page.js';

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <Router>
          <Routes>
            <Route path='/' element={ <HomePage/> } />
            <Route path='/login' element={ <LoginPage/> } />
            <Route 
              path='/registration'
              element={<RegistrationPage />}
            />
            <Route 
              path='/account'
              element={
                <PrivateRoute>
                  <AccountPage />
                </PrivateRoute>
              }
            />
            <Route 
              path='/exam'
              element={
                <PrivateRoute>
                  <ExamPage />
                </PrivateRoute>
              }
            />
            <Route 
              path='/exam-detail'
              element={
                <PrivateRoute>
                  <ExamDetailPage />
                </PrivateRoute>
              }
            />
            <Route 
              path='/list-of-completed-exams'
              element={
                <PrivateRoute>
                  <ListOfCompletedExams />
                </PrivateRoute>
              }
            />
            <Route 
              path='/Scoring'
              element={
                <PrivateRoute>
                  <Scoring />
                </PrivateRoute>
              }
            />
            <Route 
              path='/history'
              element={
                <PrivateRoute>
                  <HistoryPage />
                </PrivateRoute>
              }
            />
            <Route 
              path='/history-detail'
              element={
                <PrivateRoute>
                  <HistoryDetailPage />
                </PrivateRoute>
              }
            />
            <Route 
              path='/post'
              element={
                <PrivateRoute>
                  <PostPage />
                </PrivateRoute>
              }
            />
            <Route 
              path='/premium'
              element={
                <PrivateRoute>
                  <PremiumPage />
                </PrivateRoute>
              }
            />
            <Route 
              path='/question'
              element={
                <PrivateRoute>
                  <QuestionPage />
                </PrivateRoute>
              }
            />
            <Route 
              path='/statistics'
              element={
                <PrivateRoute>
                  <StatisticsPage />
                </PrivateRoute>
              }
            />
            <Route 
              path='/take-exam'
              element={
                <PrivateRoute>
                  <TakeExamPage />
                </PrivateRoute>
              }
            />
            <Route 
              path='/forum'
              element={
                <PrivateRoute>
                  <ForumPage />
                </PrivateRoute>
              }
            />
            <Route
              path='/create-questions'
              element={
                <PrivateRoute>
                  <CreateQuestionsPage />
                </PrivateRoute>
              }
            />
            <Route 
              path='/answer-detail'
              element={
                <PrivateRoute>
                  <AnswerDetail/>
                </PrivateRoute>
              }
            />
            <Route 
               path='/question-list'
               element={
                 <PrivateRoute>
                   <QuestionListPage />
                 </PrivateRoute>
               }
            />
            <Route 
              path='/question-detail'
              element={
                <PrivateRoute>
                  <QuestionDetailPage />
                </PrivateRoute>
              }
            />
            <Route 
              path='/edit-question'
              element={
                <PrivateRoute>
                  <EditQuestionPage />
                </PrivateRoute>
              }
            />
            <Route 
              path='/chat-eduvision'
              element={
                <PrivateRoute>
                  <ChatEduVisionPage />
                </PrivateRoute>
              }
            />
            <Route 
              path='/question-bank'
              element={
                <PrivateRoute>
                  <QuestionBankPage />
                </PrivateRoute>
              }
            />
            <Route 
              path='/question-bank-detail'
              element={
                <PrivateRoute>
                  <QuestionBankDetailPage />
                </PrivateRoute>
              }
            />
            <Route 
              path='/news/6-loi-ich-cua-tu-hoc'
              element={
                <PrivateRoute>
                  <News01 />
                </PrivateRoute>
              }
            />
            <Route 
              path='/news/giao-duc-truc-tuyen-gia-tang-nhu-cau-ve-cong-cu-ho-tro'
              element={
                <PrivateRoute>
                  <News02 />
                </PrivateRoute>
              }
            />
            <Route 
              path='/news/4-phan-mem-day-hoc-truc-tuyen'
              element={
                <PrivateRoute>
                  <News03 />
                </PrivateRoute>
              }
            />
          </Routes>
        </Router>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;

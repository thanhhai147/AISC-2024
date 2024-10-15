import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './utils/privateRoute.util.js'
import { AuthProvider } from './context/authentication.context.js';

import AccountPage from './pages/account.page.js'
import ExamPage from './pages/exam.page.js'
import ExamDetailPage from './pages/examDetail.page.js'
import HistoryPage from './pages/history.page.js'
import HistoryDetailPage from './pages/historyDetail.page.js'
import HomePage from './pages/home.page.js'
import LoginPage from './pages/login.page.js'
import PostPage from './pages/post.page.js'
import PremiumPage from './pages/premium.page.js'
import QuestionPage from './pages/question.page.js'
import StatisticsPage from './pages/statistics.page.js'
import TakeExamPage from './pages/takeExam.page.js'
import ForumPage from './pages/forum.page.js';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path='/' element={ <HomePage/> } />
          <Route path='/login' element={ <LoginPage/> } />
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
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

import React  from 'react'
import QuestionCombo from '../components/questionCombo.component'

export default function MainLayout({children}) {
    return (
        <>
            <QuestionCombo 
                type={'review'}
                questionNumber={'1'}
                questionContext={'Nêu lý do thực hiện dự án, dự án giúp giải quyết vấn đề gì trong thực tiễn? '}
                A={'Để tạo ra hệ thống tự động đánh giá chất lượng giáo viên.'}
                B={'Để giúp giảm bớt gánh nặng công việc cho giáo viên, tiết kiệm thời gian và công sức trong việc tạo đề thi.'}
                C={'Để phát triển các ứng dụng giải trí cho học sinh.'}
                D={'Để thay thế hoàn toàn giáo viên trong việc giảng dạy.'}
                answer={'A'}
                rightAnswer={'A'}
                wrongAnswer={'B'}
            />
            {children}
        </>
    )
}

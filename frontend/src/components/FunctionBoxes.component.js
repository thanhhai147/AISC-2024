import RecentlyActiveBox from './recentlyActiveBox.component.js'
import GenerateQuestionBox from './generateQuestionBox.component.js'
import '../assets/css/functionBoxes.css';
const FunctionBoxes = () => {
    return (
        <div className='boxes-function-container'>
            <GenerateQuestionBox/>
            <RecentlyActiveBox activities={[{'title': 'a', 'time': '12:30'}]}/>
        </div>
    );
  };
  
export default FunctionBoxes;
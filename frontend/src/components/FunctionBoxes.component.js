import RecentlyActiveBox from './recentlyActiveBox.component.js'
import GenerateQuestionBox from './generateQuestionBox.component.js'
import '../assets/css/functionBoxes.css';
const FunctionBoxes = () => {
    return (
        <div className='boxes-function-container'>
            <GenerateQuestionBox/>
            <RecentlyActiveBox/>
        </div>
    );
  };
  
export default FunctionBoxes;
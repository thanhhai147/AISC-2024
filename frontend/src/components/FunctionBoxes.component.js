import RecentlyActiveBox from './recentlyActiveBox.component.js'
import GenerateQuestionBox from './generateQuestionBox.component.js';
import '../assets/css/functionBoxes.css';
const FunctionBoxes = ({ activities }) => {
    return (
        <div className='boxes-function-container'>
            <GenerateQuestionBox/>
            <RecentlyActiveBox activities={activities}/>
        </div>
    );
  };
  
export default FunctionBoxes;
import RecentlyActiveBox from '../components/RecentlyActiveBox.component.js'
import GenerateQuestionBox from '../components/GenerateQuestionBox.component.js'
import '../assets/css/FunctionBoxes.css';
const FunctionBoxes = () => {
    return (
        <div className='boxes-function-container'>
            <GenerateQuestionBox/>
            <RecentlyActiveBox/>
        </div>
    );
  };
  
export default FunctionBoxes;
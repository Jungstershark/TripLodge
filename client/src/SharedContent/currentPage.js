import React from 'react';
import './currentPage.css';
import { Circle } from 'react-awesome-shapes/dist/shapes/circle';

function CurrentPage() {
    return(
        <div className='currentpage'>
            <div className='SelectionGrp'>
                <div className='YourSelection'>Your Selection</div>
                <Circle position ='relative' top="10px" left='55px' color="#BEC7E6"    size={['50px', '50px', '50px', '50px']} />
            </div>
            <div className='line1'></div>
            <div className='DetailGrp'>
                <div className='YourDetails'>Your Details</div>
                <Circle position ='relative'  top='-25px' left="340px" color="#BEC7E6" size={['50px', '50px', '50px', '50px']} />
            </div>
            <div className='line2'></div>
            <div className='CompletedGrp'>
                <div className='Completed'>Completed</div>
                <Circle position ='relative' top="-60px" left="630px" color="#BEC7E6" size={['50px', '50px', '50px', '50px']} />
            </div>
        </div>
    );
}
export default CurrentPage;

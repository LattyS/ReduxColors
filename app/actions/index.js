export const DATA_AVAILABLE = 'DATA_AVAILABLE';

import Data from '../colors.json';
 
export function getData(){
    return (dispatch) => {
 
        //API Call
        setTimeout(() => {
            var data  = Data.colors;
            dispatch({type: DATA_AVAILABLE, data:data});
        }, 2000);
 
    };
}
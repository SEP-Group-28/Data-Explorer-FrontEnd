import React, {Fragment} from 'react';
import "../../assets/css/pageloader.css";

const PreLoader = () => {
	return(
		<Fragment> 
            <div className="colorchange">
                <div className="center">
                    <div className="ring"/>
                    <span className='loading'>crypsto|x|plorer</span>
                </div>
            </div>
		</Fragment>
	);
};

export default PreLoader;


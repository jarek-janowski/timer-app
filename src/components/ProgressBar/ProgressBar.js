const ProgressBar = ({percent}) => {
    return ( 
        <div className="progress-bar">
            <div style={{width: `${percent}%`}}></div>
        </div>
     );
}
 
export default ProgressBar;
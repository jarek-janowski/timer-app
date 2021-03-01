import './ProgressBar.scss'

const ProgressBar = ({percent}) => {
    return ( 
        <div className="progress-bar">
            <div className="progress-bar__inside" style={{width: `${percent}%`}}></div>
        </div>
     );
}
 
export default ProgressBar;
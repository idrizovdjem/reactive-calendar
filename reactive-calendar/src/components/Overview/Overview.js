import calendarService from '../../services/calendarService.js';

import MonthRow from './MonthRow/MonthRow';

const Overview = (props) => {
    const currentYear = calendarService.getCurrentYear();

    return (
        <div>
            <MonthRow {...props} year={currentYear} from={1} to={4} />
            <MonthRow {...props} year={currentYear} from={5} to={8} />
            <MonthRow {...props} year={currentYear} from={9} to={12} />
        </div>
    );
}

export default Overview;
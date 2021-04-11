import React, { Component } from 'react';

import calendarService from '../../services/calendarService.js';

import MonthRow from './MonthRow/MonthRow';

class Overview extends Component {

    render() {
        const currentYear = calendarService.getCurrentYear();

        return (
            <div>
                <MonthRow {...this.props} year={currentYear} from={1} to={4}/>
                <MonthRow {...this.props} year={currentYear} from={5} to={8}/>
                <MonthRow {...this.props} year={currentYear} from={9} to={12}/>
            </div>
        );
    }
}

export default Overview;
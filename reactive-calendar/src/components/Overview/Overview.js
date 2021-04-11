import React, { Component } from 'react';
import classes from './Overview.module.css';

import calendarService from '../../services/calendarService.js';

import MonthRow from './MonthRow/MonthRow';

class Overview extends Component {

    render() {
        const currentYear = calendarService.getCurrentYear();

        return (
            <div>
                <MonthRow year={currentYear} from={1} to={4}/>
                <MonthRow year={currentYear} from={5} to={8}/>
                <MonthRow year={currentYear} from={9} to={12}/>
            </div>
        );
    }
}

export default Overview;
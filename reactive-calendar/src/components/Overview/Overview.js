import React, { Component } from 'react';
import classes from './Overview.module.css';

import MonthRow from './MonthRow/MonthRow';

class Overview extends Component {

    render() {
        return (
            <div>
                <MonthRow />
                <MonthRow />
                <MonthRow />
            </div>
        );
    }
}

export default Overview;
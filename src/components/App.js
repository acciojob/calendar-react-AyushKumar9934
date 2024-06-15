
import React, { useState, useEffect } from 'react';


const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const App = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [editYear, setEditYear] = useState(false);

    useEffect(() => {
        updateCalendar();
    }, [currentMonth, currentYear]);

    const changeMonth = (delta) => {
        let newMonth = currentMonth + delta;
        let newYear = currentYear;

        if (newMonth < 0) {
            newMonth = 11;
            newYear -= 1;
        } else if (newMonth > 11) {
            newMonth = 0;
            newYear += 1;
        }

        setCurrentMonth(newMonth);
        setCurrentYear(newYear);
    };

    const changeYear = (delta) => {
        setCurrentYear(currentYear + delta);
    };

    const handleYearDoubleClick = () => {
        setEditYear(true);
    };

    const handleYearBlur = (event) => {
        setCurrentYear(parseInt(event.target.value));
        setEditYear(false);
    };

    const handleYearKeyDown = (event) => {
        if (event.key === 'Enter') {
            setCurrentYear(parseInt(event.target.value));
            setEditYear(false);
        }
    };

    const updateCalendar = () => {
        const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        let calendarDays = [];

        for (let i = 0; i < firstDayOfMonth; i++) {
            calendarDays.push(<td key={`empty-start-${i}`}></td>);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            calendarDays.push(<td key={day}>{day}</td>);
            if ((calendarDays.length % 7) === 0) {
                calendarDays.push(<tr key={`row-${day}`}></tr>);
            }
        }

        while (calendarDays.length % 7 !== 0) {
            calendarDays.push(<td key={`empty-end-${calendarDays.length}`}></td>);
        }

        const weeks = [];
        for (let i = 0; i < calendarDays.length; i += 7) {
            weeks.push(<tr key={`week-${i / 7}`}>{calendarDays.slice(i, i + 7)}</tr>);
        }

        return weeks;
    };

    return (
        <div id="calendar-container">
            <h1 id="calendar-heading">Calendar</h1>
            <div id="controls">
                <button id="prev-year" onClick={() => changeYear(-1)}>&lt;&lt;</button>
                <button id="prev-month" onClick={() => changeMonth(-1)}>&lt;</button>
                <select id="month-selector" value={currentMonth} onChange={(e) => setCurrentMonth(parseInt(e.target.value))}>
                    {monthNames.map((month, index) => (
                        <option key={index} value={index}>{month}</option>
                    ))}
                </select>
                {editYear ? (
                    <input
                        type="number"
                        id="year-input"
                        defaultValue={currentYear}
                        onBlur={handleYearBlur}
                        onKeyDown={handleYearKeyDown}
                        autoFocus
                    />
                ) : (
                    <span id="year-display" onDoubleClick={handleYearDoubleClick}>{currentYear}</span>
                )}
                <button id="next-month" onClick={() => changeMonth(1)}>&gt;</button>
                <button id="next-year" onClick={() => changeYear(1)}>&gt;&gt;</button>
            </div>
            <table id="days-table">
                <thead>
                    <tr>
                        <th>Sun</th>
                        <th>Mon</th>
                        <th>Tue</th>
                        <th>Wed</th>
                        <th>Thu</th>
                        <th>Fri</th>
                        <th>Sat</th>
                    </tr>
                </thead>
                <tbody>
                    {updateCalendar()}
                </tbody>
            </table>
        </div>
    );
};

export default App;
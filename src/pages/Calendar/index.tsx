import React, { Component, useState } from 'react';
import FullCalendar, { formatDate } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { INITIAL_EVENTS, createEventId } from './utils';

type CalendarProps = any;
type weekendsVisible = boolean;

function Calendar(props: CalendarProps) {
  const [weekendsVisible, setWeekendsVisible] = useState<weekendsVisible>(true);

  return (
    <section className="account__calendar">
      <h2 className="blind">캘린더</h2>

      <header className="account__calendar__summary">
        <dl className="summary__list">
          <dt className="summary__title">수입</dt>
          <dd className="summary__amount summary__amount--income">+1,000</dd>
        </dl>
        <dl className="summary__list">
          <dt className="summary__title">지출</dt>
          <dd className="summary__amount summary__amount--spending">-1,000</dd>
        </dl>
        <dl className="summary__list">
          <dt className="summary__title">총합</dt>
          <dd className="summary__amount summary__amount--balance">0</dd>
        </dl>
      </header>

      <div className="account__calendar__box">
        {/* <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          initialView="dayGridMonth"
          editable
          selectable
          selectMirror
          dayMaxEvents
          weekends={weekendsVisible}
        /> */}
      </div>
    </section>
  );
}

export default Calendar;

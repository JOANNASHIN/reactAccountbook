import React, { Component } from 'react';
import FullCalendar, { formatDate } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { INITIAL_EVENTS, createEventId } from './utils';

type CalendarProps = any;

interface CalendarState {
  weekendsVisible: boolean;
}

export default class Calendar extends Component<CalendarProps, CalendarState> {
  constructor(props: CalendarProps) {
    super(props);

    this.state = {
      weekendsVisible: true,
    };
  }

  render() {
    const { weekendsVisible } = this.state;

    return (
      <section className="account__calendar">
        <h2 className="blind">캘린더</h2>

        <header className="account__calendar__summary">
          <dl className="summary__list">
            <dt className="summary__title">수입</dt>
            <dd className="summary__amount">0</dd>
          </dl>
          <dl className="summary__list">
            <dt className="summary__title">지출</dt>
            <dd className="summary__amount">0</dd>
          </dl>
          <dl className="summary__list">
            <dt className="summary__title">총합</dt>
            <dd className="summary__amount">0</dd>
          </dl>
        </header>

        <FullCalendar
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
        />
      </section>
    );
  }
}

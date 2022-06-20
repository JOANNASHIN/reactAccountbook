import React, { Component, useState } from 'react';
import FullCalendar, { formatDate } from '@fullcalendar/react';
import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { INITIAL_EVENTS, createEventId } from './utils';

type CalendarProps = any;
type weekendsVisible = boolean;

function Calendar(props: CalendarProps) {
  const [weekendsVisible, setWeekendsVisible] = useState<weekendsVisible>(true);
  const list = [
    {
      title: 'Meeting',
      start: '2022-06-12T14:30:00',
      extendedProps: {
        status: 'done',
      },
    },
    {
      title: 'Birthday Party',
      start: '2022-06-13T07:00:00',
      backgroundColor: 'green',
      borderColor: 'green',
    },
  ];

  return (
    <section className="ac__calendar">
      <h2 className="blind">캘린더</h2>

      <nav className="ac__calendar__tab">
        <div className="tab__inner">
          <button type="button" className="tab__menu ">
            달력
          </button>
          <button type="button" className="tab__menu active">
            일별
          </button>
          <button type="button" className="tab__menu">
            주별
          </button>
          <button type="button" className="tab__menu">
            월별
          </button>
        </div>
      </nav>

      <div className="ac__calendar__wrapper">
        <div className="ac__calendar__summary">
          <dl className="summary__list">
            <dt className="summary__title">수입</dt>
            <dd className="summary__amount summary__amount--income">+1,000</dd>
          </dl>
          <dl className="summary__list">
            <dt className="summary__title">지출</dt>
            <dd className="summary__amount summary__amount--spending">
              -1,000
            </dd>
          </dl>
          <dl className="summary__list">
            <dt className="summary__title">총합</dt>
            <dd className="summary__amount summary__amount--balance">0</dd>
          </dl>
        </div>

        <div className="ac__calendar__box">
          <FullCalendar
            plugins={[
              listPlugin,
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
            ]}
            headerToolbar={{
              left: 'prev title next',
              center: 'today',
            }}
            // timeGridDay,listWeek, timeGridWeek
            initialView="dayGridMonth"
            editable
            selectable
            selectMirror
            dayMaxEvents
            // events={list}
            weekends={weekendsVisible}
          />
        </div>
      </div>
    </section>
  );
}

export default Calendar;

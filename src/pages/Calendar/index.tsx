import React, { Component, useState } from 'react';
import FullCalendar, { formatDate } from '@fullcalendar/react';
import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { INITIAL_EVENTS, createEventId } from './utils';

type CalendarProps = any;
type weekendsVisible = boolean;

type TabKeys = 'c' | 'd' | 'w' | 's';

function CalendarBox() {
  const [weekendsVisible, setWeekendsVisible] = useState<weekendsVisible>(true);

  return (
    <div className="ac__calendar__box">
      <FullCalendar
        plugins={[listPlugin, dayGridPlugin, timeGridPlugin, interactionPlugin]}
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
  );
}
function Calendar(props: CalendarProps) {
  const [weekendsVisible, setWeekendsVisible] = useState<weekendsVisible>(true);
  const list = [
    {
      id: '0',
      start: '2022-06-12',
      title: '',
      extendedProps: {
        data: [
          {
            id: '01',
            type: 'minus',
            amount: '8000',
            title: '석식대',
          },
          {
            id: '02',
            type: 'plus',
            amount: '2000',
            title: '이자',
          },
          {
            id: '03',
            type: 'minus',
            amount: '4000',
            title: '석식대',
          },
        ],
      },
    },
    {
      id: '1',
      start: '2022-01-12',
      title: '',
      extendedProps: {
        data: [
          {
            id: '11',
            type: 'minus',
            amount: '8000',
            title: '석식대',
          },
        ],
      },
    },
  ];

  const [activeTab, setActiveTab] = useState('c');
  const handleChangeTab = (type: string) => {
    setActiveTab(type);
  };

  const handleAddData = (selectInfo: any) => {
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    calendarApi.addEvent({
      id: createEventId(),
      title: '석식대',
      start: selectInfo.startStr,
      end: selectInfo.endStr,
      allDay: selectInfo.allDay,
    });
  };

  const renderEventContent = (eventInfo: any) => {
    const data = eventInfo.event?.extendedProps.data;
    console.log(data);

    return data.map((item: any) => {
      return (
        <span
          className={
            item.type === 'minus' ? 'ac__calendar__price minus' : 'ac__calendar__price plus'
          }
          key={`event${item.id}`}>
          {item.amount}
        </span>
      );
    });
  };

  return (
    <section className="ac__calendar">
      <h2 className="blind">캘린더</h2>

      <nav className="ac__calendar__tab">
        <div className="tab__inner">
          <button
            type="button"
            className={activeTab === 'c' ? 'tab__menu active' : 'tab__menu'}
            onClick={() => handleChangeTab('c')}>
            달력
          </button>
          <button
            type="button"
            className={activeTab === 'd' ? 'tab__menu active' : 'tab__menu'}
            onClick={() => handleChangeTab('d')}>
            일별
          </button>
          <button
            type="button"
            className={activeTab === 'm' ? 'tab__menu active' : 'tab__menu'}
            onClick={() => handleChangeTab('m')}>
            월별
          </button>
          <button
            type="button"
            className={activeTab === 's' ? 'tab__menu active' : 'tab__menu'}
            onClick={() => handleChangeTab('s')}>
            요약
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
            <dd className="summary__amount summary__amount--spending">-1,000</dd>
          </dl>
          <dl className="summary__list">
            <dt className="summary__title">총합</dt>
            <dd className="summary__amount summary__amount--balance">0</dd>
          </dl>
        </div>

        {/* 월별 */}
        {activeTab === 'c' && (
          <div className="ac__calendar__box">
            <FullCalendar
              plugins={[listPlugin, dayGridPlugin, timeGridPlugin, interactionPlugin]}
              headerToolbar={{
                left: 'prev title next',
                center: 'today',
              }}
              initialView="dayGridMonth"
              locale="kr"
              editable
              selectable
              selectMirror
              dayMaxEvents
              events={list}
              weekends={weekendsVisible}
              eventContent={renderEventContent}
            />
          </div>
        )}

        {/* 일별 */}
        {activeTab === 'd' && (
          <div className="ac__calendar__box">
            <FullCalendar
              plugins={[listPlugin, dayGridPlugin, timeGridPlugin, interactionPlugin]}
              headerToolbar={{
                left: 'prev title next',
                center: 'today',
              }}
              initialView="listMonth"
              locale="kr"
              editable
              selectable
              selectMirror
              dayMaxEvents
              events={list}
              weekends={weekendsVisible}
            />
          </div>
        )}

        {activeTab === 'm' && (
          <div className="ac__calendar__box">
            <FullCalendar
              plugins={[listPlugin, dayGridPlugin, timeGridPlugin, interactionPlugin]}
              headerToolbar={{
                left: 'prev title next',
                center: 'today',
              }}
              initialView="listYear"
              locale="kr"
              editable
              selectable
              selectMirror
              dayMaxEvents
              events={list}
              weekends={weekendsVisible}
            />
          </div>
        )}

        {activeTab === 's' && (
          <div className="ac__calendar__box">
            <FullCalendar
              plugins={[listPlugin, dayGridPlugin, timeGridPlugin, interactionPlugin]}
              headerToolbar={{
                left: 'prev title next',
                center: 'today',
              }}
              initialView="dayGridMonth"
              locale="kr"
              editable
              selectable
              selectMirror
              dayMaxEvents
              events={list}
              weekends={weekendsVisible}
              eventContent={renderEventContent}
            />
          </div>
        )}
      </div>
    </section>
  );
}

export default Calendar;

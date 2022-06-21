import React, { Component, useEffect, useState } from 'react';
import FullCalendar, { formatDate } from '@fullcalendar/react';
import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { INITIAL_EVENTS, createEventId } from './utils';
import SummaryComponent, { Balance } from '../../components/Summary';

type weekendsVisible = boolean;

type TabKeys = 'c' | 'd' | 'w' | 's';

interface Event {
  id: string;
  type: string;
  amount: string;
  title: string;
}

interface CustomProps {
  data: Event[];
}

interface EventList {
  id: string;
  start: string;
  title: string;
  extendedProps: CustomProps;
}

function Calendar() {
  // #region 샘플데이터
  const list: EventList[] = [
    {
      id: '0',
      start: '2022-06-12',
      title: '2022-06-12',
      extendedProps: {
        data: [
          {
            id: '01',
            type: 'spending',
            amount: '8000',
            title: '석식대',
          },
          {
            id: '02',
            type: 'income',
            amount: '2000',
            title: '이자',
          },
        ],
      },
    },
    {
      id: '1',
      start: '2022-06-20',
      title: '2022-06-20',
      extendedProps: {
        data: [
          {
            id: '11',
            type: 'spending',
            amount: '1200',
            title: '식비/아침',
          },
          {
            id: '12',
            type: 'spending',
            amount: '11000',
            title: '식비/점심',
          },
          {
            id: '13',
            type: 'income',
            amount: '2000',
            title: '기타',
          },
        ],
      },
    },
    {
      id: '1',
      start: '2022-06-21',
      title: '2022-06-21',
      extendedProps: {
        data: [
          {
            id: '11',
            type: 'spending',
            amount: '1500',
            title: '왕만두',
          },
          {
            id: '13',
            type: 'income',
            amount: '87',
            title: '토스',
          },
        ],
      },
    },
  ];
  // #endregion

  // #region summary
  const [balance, setBalance] = useState({
    income: 0,
    spending: 0,
    total: 0,
  });

  /** 수입 지출 계산 */
  const calcSummaryBalance = (data: Event[]) => {
    const day = {
      income: 0,
      spending: 0,
      total: 0,
    };

    data.forEach((v: Event) => {
      if (v.type === 'income') {
        day.income += +v.amount;
        day.total += +v.amount;
      } else if (v.type === 'spending') {
        day.spending -= +v.amount;
        day.total -= +v.amount;
      }
    });

    return day;
  };

  /** summary 데이터 세팅 */
  useEffect(() => {
    const month = {
      income: 0,
      spending: 0,
      total: 0,
    };

    list.forEach((v) => {
      const result = { ...month, ...calcSummaryBalance(v.extendedProps?.data) };
      month.income += result.income;
      month.spending += result.spending;
      month.total += result.total;
    });

    setBalance(month);
  }, []);
  // #endregion

  // #region full-calendar
  /** 주말요일 노출 유무 */
  const [weekendsVisible, setWeekendsVisible] = useState<weekendsVisible>(true);

  /** 렌더링 커스텀 */
  const renderCustomEvent = (eventInfo: any) => {
    const data = eventInfo.event?.extendedProps.data;
    if (!data || !data.length) return <span />;

    const day = calcSummaryBalance(data);

    return (
      <>
        <span className="ac__calendar__price income">{day.income.toLocaleString('ko-kr')}</span>
        <span className="ac__calendar__price spending">{day.spending.toLocaleString('ko-kr')}</span>
        <span className="ac__calendar__price balance">{day.total.toLocaleString('ko-kr')}</span>
      </>
    );
  };
  // #endregion

  // #region tab 메뉴
  const [activeTab, setActiveTab] = useState('c');
  const handleChangeTab = (type: string) => {
    setActiveTab(type);
  };
  // #endregion

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
        <SummaryComponent balance={balance} />

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
              eventContent={renderCustomEvent}
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
              eventContent={renderCustomEvent}
            />
          </div>
        )}
      </div>
    </section>
  );
}

export default Calendar;

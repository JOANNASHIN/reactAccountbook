import React, { useEffect, useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import SummaryComponent, { Balance } from '../../components/Summary';

type weekendsVisible = boolean;

type TabKeys = 'dayGridMonth' | 'listDay' | 'listMonth' | 'listWeek';

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
  const [balance, setBalance] = useState<Balance>({
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

    // 지출 - 비노출 처리
    day.spending *= -1;

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
  /** 렌더링 커스텀 */
  const renderCustomEvent = (eventInfo: any) => {
    const data = eventInfo.event?.extendedProps.data;
    if (!data || !data.length) return <span />;

    const day = calcSummaryBalance(data);

    return (
      <>
        {day.income !== 0 && (
          <span className="ac__calendar__price income">{day.income.toLocaleString('ko-kr')}</span>
        )}
        <span className="ac__calendar__price spending">{day.spending.toLocaleString('ko-kr')}</span>
        {day.income !== 0 && (
          <span className="ac__calendar__price balance">{day.total.toLocaleString('ko-kr')}</span>
        )}
      </>
    );
  };
  // #endregion

  // #region tab 메뉴
  const calendarRef = useRef<FullCalendar>(null);
  const [isRender, setIsRender] = useState(false);

  const [activeTab, setActiveTab] = useState<TabKeys>('dayGridMonth');
  const handleChangeTab = async (key: TabKeys) => {
    if (isRender) return;
    setIsRender(true);

    try {
      // await calendarRef.current?.getApi().changeView(key);
      setActiveTab(key);
      setIsRender(false);
    } catch (error) {
      console.error('view update error');
    }
  };
  // #endregion

  const handleDateClick = (date: any) => {
    console.log('팝업 오픈', date.view.getCurrentData());
  };

  const isActive = (key: TabKeys) => {
    return activeTab === key ? 'tab__menu active' : 'tab__menu';
  };

  return (
    <section className="ac__calendar">
      <h2 className="blind">캘린더</h2>

      <nav className="ac__calendar__tab">
        <div className="tab__inner">
          <button
            type="button"
            className={isActive('dayGridMonth')}
            onClick={() => handleChangeTab('dayGridMonth')}>
            달력
          </button>

          <button
            type="button"
            className={isActive('listDay')}
            onClick={() => handleChangeTab('listDay')}>
            일별
          </button>

          <button
            type="button"
            className={isActive('listWeek')}
            onClick={() => handleChangeTab('listWeek')}>
            주별
          </button>

          <button
            type="button"
            className={isActive('listMonth')}
            onClick={() => handleChangeTab('listMonth')}>
            월별
          </button>
        </div>
      </nav>

      <div className="ac__calendar__wrapper">
        <SummaryComponent balance={balance} />

        {/* 월별 */}
        {activeTab === 'dayGridMonth' && (
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
              weekends
              viewHint={activeTab}
              eventContent={renderCustomEvent}
              ref={calendarRef}
            />
          </div>
        )}

        {/* 일별 */}
        {activeTab === 'listDay' && (
          <div className="ac__calendar__box">
            <FullCalendar
              plugins={[listPlugin, dayGridPlugin, timeGridPlugin, interactionPlugin]}
              headerToolbar={{
                left: 'prev title next',
                center: 'today',
              }}
              initialView="listDay"
              locale="kr"
              editable
              selectable
              selectMirror
              dayMaxEvents
              events={list}
              weekends
            />
          </div>
        )}

        {/* 주별 */}
        {activeTab === 'listWeek' && (
          <div className="ac__calendar__box">
            <FullCalendar
              plugins={[listPlugin, dayGridPlugin, timeGridPlugin, interactionPlugin]}
              headerToolbar={{
                left: 'prev title next',
                center: 'today',
              }}
              initialView="listWeek"
              locale="kr"
              editable
              selectable
              selectMirror
              dayMaxEvents
              events={list}
              weekends
            />
          </div>
        )}

        {activeTab === 'listMonth' && (
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
              weekends
            />
          </div>
        )}
      </div>
    </section>
  );
}

export default Calendar;

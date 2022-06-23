import React, { useEffect, useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Link } from 'react-router-dom';
import SummaryComponent, { Balance } from '../../components/Summary';
import ModalComponent from '../../components/Modal';

type TabKeys = 'dayGridMonth' | 'listDay' | 'listMonth' | 'listWeek';

interface Item {
  id: string;
  type: string;
  category: string;
  amount: number;
  title: string;
  method: string;
}

interface CustomProps {
  data: Item[];
}

interface EventList {
  id: string;
  start: string;
  title: string;
  extendedProps: CustomProps;
}

interface CalendarModal {
  title: string;
  isShow: boolean;
  data: null | Item[];
}

function Calendar() {
  // #region 샘플데이터
  const eventList: EventList[] = [
    {
      id: '0',
      start: '2022-06-12',
      title: '2022-06-12',
      extendedProps: {
        data: [
          {
            id: '01',
            type: 'spending',
            amount: 8000,
            title: '석식대',
            category: '식비/아침',
            method: '삼성카드',
          },
          {
            id: '02',
            type: 'income',
            category: '월급',
            amount: 1000000,
            title: '6월 월급',
            method: '신한은행',
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
            amount: 1200,
            title: '식비/아침',
            category: '식비/아침',
            method: '삼성카드',
          },
          {
            id: '12',
            type: 'spending',
            amount: 11000,
            title: '식비/점심',
            category: '식비/아침',
            method: '삼성카드',
          },
        ],
      },
    },
    {
      id: '2',
      start: '2022-06-21',
      title: '2022-06-21',
      extendedProps: {
        data: [
          {
            id: '2-001',
            type: 'spending',
            amount: 1500,
            title: '왕만두',
            category: '식비/아침',
            method: '삼성카드',
          },
          {
            id: '2-002',
            type: 'income',
            amount: 87,
            title: '토스',
            category: '식비/아침',
            method: '삼성카드',
          },
          {
            id: '2-003',
            type: 'spending',
            amount: 1500,
            title: '왕만두',
            category: '식비/아침',
            method: '삼성카드',
          },
          {
            id: '2-004',
            type: 'income',
            amount: 87,
            title: '토스',
            category: '식비/아침',
            method: '삼성카드',
          },
          {
            id: '2-005',
            type: 'spending',
            amount: 1500,
            title: '왕만두',
            category: '식비/아침',
            method: '삼성카드',
          },
          {
            id: '2-006',
            type: 'income',
            amount: 87,
            title: '토스',
            category: '식비/아침',
            method: '삼성카드',
          },
          {
            id: '2-007',
            type: 'income',
            amount: 87,
            title: '토스',
            category: '식비/아침',
            method: '삼성카드',
          },
          {
            id: '2-008',
            type: 'spending',
            amount: 1500,
            title: '왕만두',
            category: '식비/아침',
            method: '삼성카드',
          },
          {
            id: '2-009',
            type: 'income',
            amount: 87,
            title: '토스',
            category: '식비/아침',
            method: '삼성카드',
          },
          {
            id: '2-010',
            type: 'spending',
            amount: 1500,
            title: '왕만두',
            category: '식비/아침',
            method: '삼성카드',
          },
          {
            id: '2-011',
            type: 'income',
            amount: 87,
            title: '마지막',
            category: '식비/아침',
            method: '삼성카드',
          },
        ],
      },
    },
  ];
  // #endregion

  // #region summary
  const [balance, setBalance] = useState<Balance>({
    type: 'calendar',
    income: 0,
    spending: 0,
    total: 0,
  });

  /** 수입 지출 계산 */
  const calcSummaryBalance = (data: Item[]) => {
    const day = {
      income: 0,
      spending: 0,
      total: 0,
    };

    data.forEach((v: Item) => {
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
    const month: Balance = {
      type: 'calendar',
      income: 0,
      spending: 0,
      total: 0,
    };

    eventList.forEach((v) => {
      const result = {
        ...month,
        ...calcSummaryBalance(v.extendedProps?.data),
      };
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
          <span className="calendar__event income">
            {day.income.toLocaleString('ko-kr')}
          </span>
        )}
        <span className="calendar__event spending">
          {day.spending.toLocaleString('ko-kr')}
        </span>
        {day.income !== 0 && (
          <span className="calendar__event balance">
            {day.total.toLocaleString('ko-kr')}
          </span>
        )}
      </>
    );
  };
  // #endregion

  // #region tab 메뉴
  const calendarRef = useRef<FullCalendar>(null);
  const [isRender, setIsRender] = useState(false);

  const [activeTab, setActiveTab] = useState<TabKeys>('dayGridMonth');

  const isActive = (key: TabKeys) => {
    return activeTab === key ? 'tab__menu active' : 'tab__menu';
  };

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

  // #region modal
  const [modal, setModal] = useState<CalendarModal>({
    title: '',
    isShow: false,
    data: null,
  });

  const handleDateClick = (info: any) => {
    setModal({
      title: info.dateStr,
      isShow: true,
      data: null,
    });
  };

  const handleEventClick = ({ event }: any) => {
    const { data } = event.extendedProps;

    setModal({
      title: event.title,
      isShow: true,
      data,
    });
  };

  const handleCloseModal = () => {
    setModal({
      title: '',
      isShow: false,
      data: null,
    });
  };
  // #endregion

  return (
    <section className="calendar">
      <h2 className="blind">캘린더</h2>

      {/* 탭 메뉴 */}
      <nav className="calendar__tab">
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

      {/* 콘텐츠 */}
      <div className="calendar__wrapper">
        <SummaryComponent balance={balance} />

        {/* 달력 콘텐츠 */}
        {activeTab === 'dayGridMonth' && (
          <div className="calendar__box">
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
              initialView="dayGridMonth"
              locale="kr"
              editable
              selectable
              selectMirror
              dayMaxEvents
              events={eventList}
              weekends
              dateClick={handleDateClick}
              eventClick={handleEventClick}
              eventContent={renderCustomEvent}
              ref={calendarRef}
            />
          </div>
        )}

        {/* 일별 콘텐츠 */}
        {activeTab === 'listDay' && (
          <div className="calendar__box">
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
              initialView="listDay"
              locale="kr"
              editable
              selectable
              selectMirror
              dayMaxEvents
              events={eventList}
              weekends
            />
          </div>
        )}

        {/* 주별 콘텐츠 */}
        {activeTab === 'listWeek' && (
          <div className="calendar__box">
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
              initialView="listWeek"
              locale="kr"
              editable
              selectable
              selectMirror
              dayMaxEvents
              events={eventList}
              weekends
            />
          </div>
        )}

        {/* 월별 콘텐츠 */}
        {activeTab === 'listMonth' && (
          <div className="calendar__box">
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
              initialView="listMonth"
              locale="kr"
              editable
              selectable
              selectMirror
              dayMaxEvents
              events={eventList}
              weekends
            />
          </div>
        )}

        <Link to="/addAccount" className="calendar__plus ac__plus--yellow">
          이벤트 추가하기
        </Link>
      </div>

      {/* 상세 모달 */}
      {modal.isShow && (
        <ModalComponent title={modal.title} onClose={handleCloseModal}>
          <div className="calendar__date-details">
            <ul className="details__cont">
              {modal.data ? (
                modal.data.map((event) => {
                  return (
                    <li className="details__event" key={event.id}>
                      <span className="details__event__type">
                        {event.category}
                      </span>
                      <div className="details__event__detail">
                        <span className="details__event__title">
                          {event.title}
                        </span>
                        <span className="details__event__method">
                          {event.method}
                        </span>
                      </div>
                      <span className={`details__event__price ${event.type}`}>
                        <em>{event.amount.toLocaleString('ko-kr')}</em>원
                      </span>
                    </li>
                  );
                })
              ) : (
                <li className="details__empty">데이터가 없습니다.</li>
              )}
            </ul>

            <nav className="details__nav">
              <Link
                to="/addAccount"
                className="details__nav__plus ac__plus--yellow">
                장부 추가하기
              </Link>
            </nav>
          </div>
        </ModalComponent>
      )}
    </section>
  );
}

export default Calendar;

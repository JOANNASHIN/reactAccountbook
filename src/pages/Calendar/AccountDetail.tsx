import React from 'react';
import { Link } from 'react-router-dom';
import { getAmountSizeClass } from './index';

function AccountDetail(props: any) {
  const { data } = props;

  return (
    <div className="account-detail">
      <div className="detail__wrapper">
        {data && data.length ? (
          data.map((event: any) => {
            return (
              <Link
                key={event.id}
                className="detail__event"
                to={`/addAccount?mode=edit&id=${event.id}`}>
                <span className="detail__event__type">
                  {event.category?.name}
                </span>
                <div className="detail__event__detail">
                  <span className="detail__event__title">{event.title}</span>
                  <span className="detail__event__method">
                    {event.method?.name}
                  </span>
                </div>

                <span
                  className={getAmountSizeClass(
                    event.amount,
                    `detail__event__price ${event.type}`,
                  )}>
                  <em>{Number(event.amount).toLocaleString('ko-kr')}</em>원
                </span>
              </Link>
            );
          })
        ) : (
          <p className="detail__empty">데이터가 없습니다.</p>
        )}
      </div>
    </div>
  );
}
export default AccountDetail;

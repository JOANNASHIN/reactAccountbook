import React from 'react';
import CustomLink from '../../components/CustomLink';
import { getAmountSizeClass } from './index';

function AccountDetail(props: any) {
  const { data, activeTab } = props;

  return (
    <div className="account-detail">
      <div className="detail__wrapper">
        {data && data.length ? (
          data.map((event: any) => {
            return (
              <CustomLink
                key={event.id}
                to={`/addAccount?mode=edit&id=${event.id}`}
                from="/"
                state={{
                  tab: activeTab,
                }}
                className="detail__event">
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
              </CustomLink>
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

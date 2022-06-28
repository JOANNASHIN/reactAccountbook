import React from 'react';
import { sliceEvents, createPlugin } from '@fullcalendar/react';

function CustomView(props: any) {
  const segs = sliceEvents(props, true);
  const { dateProfile } = props;
  return (
    <>
      <div className="view-title">
        2022-06-08
        {/* {dateProfile.currentRange.start.toUTCString()} */}
      </div>
      <div className="view-events">1263</div>
    </>
  );
}

export default createPlugin({
  views: {
    custom: CustomView,
  },
});

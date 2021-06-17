import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faCoins, faGlobe, faHashtag, faLaptop, faPaperPlane, faClock, faFire } from "@fortawesome/free-solid-svg-icons";
import React from "react";

export function EventCard({ event, size = 's', type = '', power = 0}) {
  const validateType = (type) => {
    if (size !== 'm') return '';
    if (type !== 'most-recent' && type !== 'upcoming' && type !== 'most-claimed') return '';
    return type;
  }
  type = validateType(type);

  const nl2br = (text) => (text.split('\n').map((item, key) => {
    return <>{item}<br/></>
  }));
  
  const Header = () => (
    <div className={`header ${type}`}>
      <img
        src={event.image_url}
        alt="POAP" />
    </div>
  );
  const Content = () => (
    <div className="content">
      <div
        className="content-first"
        style={{
          overflow: 'hidden',
          width: '100%',
          padding: '1rem'
        }}>

        {/* event type */}
        <div className={`${type === '' ? 'hidden' : 'pill event-type'} ${type}`}>
          {
            type === 'most-recent' ? <div><FontAwesomeIcon style={{ width: '1rem', marginRight: '.2rem' }} icon={faClock} />Most recent</div> :
            type === 'upcoming' ? <div><FontAwesomeIcon style={{ width: '1rem', marginRight: '.2rem' }} icon={faCalendar} />Upcoming</div> :
            type === 'most-claimed' ? <div><FontAwesomeIcon style={{ width: '1rem', marginRight: '.2rem' }} icon={faFire} />Most claimed</div> :
            ''
          }
        </div>

        {/* title */}
        <h3
          title={event.name}
          className="h4 content-title ellipsis"
          style={{
            fontSize: '1rem',
            textAlign: 'center',
            margin: '8px 0 0 0',
            overflowWrap: 'anywhere',
          }}>
          {event.name}
        </h3>

        {/* description */}
        {
        size === 'l' ?
        <div className='content-description'>
          <div className='content-description-main'>{nl2br(event.description)}</div>
          <br/><br/>
          <a href={event.event_url} className='content-description-url'>{event.event_url}</a>
        </div>
        :
        /* id */
        <div className='content-id'>
          <FontAwesomeIcon style={{ width: '1rem', marginRight: '.2rem' }} icon={faHashtag} />
          {event.id}
        </div>
        }

        {/* fecha y lugar */}
        <div className="content-time-place">
          <div className="pill" style={{ minWidth: '110px'}}>
            <FontAwesomeIcon style={{ width: '1rem', marginRight: '.2rem' }} icon={faCalendar} /> {event.start_date}
          </div>
          <div className="pill">
            {event.city ? <FontAwesomeIcon style={{ width: '1rem', marginRight: '.2rem' }} icon={faGlobe} /> : null}
            {event.city ?
              ' ' + event.city : (
              <div>
                {' '}
                <FontAwesomeIcon style={{ width: '1rem', marginRight: '.2rem' }} icon={faLaptop} /> Virtual event{' '}
              </div>
            )}{' '}
          </div>
        </div>
      </div>
      
      {size !== 'l' && <hr />}

      <div
        className="content-second"
        style={{
          overflow: 'hidden',
          width: '100%',
          padding: '1rem'
        }}>
        {/* supply y transfers */}
        <div>
          <div className="title">
            <FontAwesomeIcon style={{ width: '1rem', marginRight: '.4rem' }} icon={faCoins} />{'SUPPLY'}
          </div>
          {event.tokenCount ? event.tokenCount : ' None Claimed'}
        </div>
        {
        size === 'l' &&
        <div>
          <div className="title">
            <FontAwesomeIcon style={{ width: '1rem', marginRight: '.4rem' }} icon={faFire} />{'POWER'}
          </div>
          {power}
        </div>
        }
        <div>
          <div className="title">
            <FontAwesomeIcon style={{ width: '1rem', marginRight: '.4rem' }} icon={faPaperPlane} />{'TRANSFERS'}
          </div>
          {event.transferCount ? event.transferCount : 0}
        </div>
      </div>
    </div>
  )

  return (
    <Link to={'/event/' + event.id} className={`
      gallery-card
      ${(size === 'l') ? 'large' : (size === 'm') ? 'medium' : 'small'}`}>
      <Header url={event.image_url} />
      <Content />
    </Link>
  );
}

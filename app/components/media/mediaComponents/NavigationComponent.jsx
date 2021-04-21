import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackward, faForward, faPlay } from '@fortawesome/free-solid-svg-icons'

const Navigation = () => {
  return (
    <div className="navigation">
      <button id="prev" className="action-btn">
        <FontAwesomeIcon icon={faBackward} />
      </button>
      <button id="play" className="action-btn action-btn-big">
        <FontAwesomeIcon icon={faPlay} />
      </button>
      <button id="next" className="action-btn">
        <FontAwesomeIcon icon={faForward} />
      </button>
    </div>
  )
}

export default Navigation

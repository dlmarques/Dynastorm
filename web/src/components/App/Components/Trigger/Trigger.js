import React from 'react'
import './trigger.scss'
import { useDispatch } from 'react-redux'

const Trigger = props => {
    const dispatch = useDispatch();

    const handler = () => {
        dispatch(props.action)
      }
  return (
    <div className='trigger' onClick={handler} >
      {props.icon}
    </div>
  )
}

export default Trigger
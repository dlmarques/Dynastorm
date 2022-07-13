import React from 'react'
import { useSelector } from 'react-redux'
import styles from './level.module.scss'
import Progress from '../../../Components/Progress/Progress'

const Level = () => {
    const level = useSelector(state => state.user.level)
    const user = useSelector(state => state.user.user)
  return (
    <div className={styles['lvl-container']}>
        <Progress label={level && `Level ${level.level} - ${level.tier}`} id='home-xp' min='0' max={level.level * 100} value={user.xp} styles={styles.level} />
    </div>
  )
}

export default Level
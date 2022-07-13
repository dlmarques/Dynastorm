import React from 'react'
import {Link} from 'react-router-dom'
import styles from './featuresbar.module.scss'


const FeaturesBar = () => {
  return (
    <div className={styles['navigation-bar']}>
        <nav>
        <Link to='/app/home'>Home</Link>
        <Link to='/app/store'>Store</Link>
        <Link to='/app/missions'>Missions</Link>
        <Link to='/app/battles'>Battles</Link>
        <Link to='/app/inventory'>Inventory</Link>
        <Link to='/app/healer'>Healer</Link>
        </nav>
    </div>
  )
}

export default FeaturesBar
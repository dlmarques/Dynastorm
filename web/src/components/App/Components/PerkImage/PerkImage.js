import React from 'react'
import strength from "../../../../assets/skills/strength.png";
import magic from "../../../../assets/skills/magic.png";
import speed from "../../../../assets/skills/speed.png";

const PerkImage = props => {
  return (
    <span className={props.styles}>
    {props.sidebar && <h3>@{props.user && props.user.name}</h3>}
    {!props.sidebar && <p>{props.user.perk}</p>}
    {props.user && props.user && props.user.perkImage === "strength" ? (
      <img src={strength} alt="perkImage" className={props.imageStyle} />
    ) : props.user && props.user.perkImage === "magic" ? (
      <img src={magic} alt="perkImage" className={props.imageStyle} />
    ) : (
      <img src={speed} alt="perkImage" className={props.imageStyle} />
    )}
  </span>
  )
}

export default PerkImage
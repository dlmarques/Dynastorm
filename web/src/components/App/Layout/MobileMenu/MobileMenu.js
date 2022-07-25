import React from "react";
import "animate.css";
import "./mobilemenu.scss";
import { useDispatch, useSelector } from "react-redux";
import PerkImage from "../../Components/PerkImage/PerkImage";
import Progress from "../../Components/Progress/Progress";
import Stats from "../Sidebar/components/Stats";
import { GiBiceps } from "react-icons/gi";
import { RiMagicFill } from "react-icons/ri";
import { BsShieldShaded } from "react-icons/bs";
import { GiMagicPalm } from "react-icons/gi";
import { CgClose } from "react-icons/cg";
import Button from "../../Components/Button/Button";
import { logout } from "../../../../store/auth/thunk";
import { mobileMenuActions } from "../../../../store/ui/mobileMenu";

const MobileMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const level = useSelector((state) => state.user.level);

  const endSession = () => {
    logout(dispatch);
  };

  const closeMenu = () => {
    dispatch(mobileMenuActions.close());
  };

  return (
    <div className="mobile-menu">
      <CgClose onClick={closeMenu} className="close" />
      <div className="profile-bar">
        <div className="profile">
          <img
            src={user && user.avatar}
            alt="avatar profile bar"
            className="avatar"
          />
          <PerkImage
            sidebar={true}
            styles="profile-text"
            imageStyle="perkImage"
            user={user}
          />
        </div>
        {user && <h4>${user.money}</h4>}
        <div className="bars">
          <Progress
            label="HP"
            id="hp"
            min="0"
            max="100"
            value={user && user.health}
            styles="hp"
          />
          <Progress
            label="XP"
            id="xp"
            min="0"
            max={level.level * 100}
            value={user && user.xp}
            styles="xp"
          />
        </div>
        <div className="stats">
          <Stats
            name="Strength"
            styles="stats-info"
            icon={<GiBiceps style={{ color: "#ff8400" }} />}
            value={user && Math.round(user.strength)}
          />
          <Stats
            name="Magic"
            styles="stats-info"
            icon={<RiMagicFill style={{ color: "#ad27f5" }} />}
            value={user && Math.round(user.magic)}
          />
          <Stats
            name="Armor"
            styles="stats-info"
            icon={<BsShieldShaded style={{ color: "#fff" }} />}
            value={user && Math.round(user.armor)}
          />
          <Stats
            name="Magic Resistance"
            styles="stats-info"
            icon={<GiMagicPalm style={{ color: "#006eff" }} />}
            value={user && Math.round(user.magicResist)}
          />
        </div>
        <div className="logout">
          <Button btn="mobileBtn" onClick={endSession}>
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;

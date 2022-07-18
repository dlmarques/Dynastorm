import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./featuresbar.scss";
import { links } from "./components/activeLink";

const FeaturesBar = () => {
  const [changed, setChanged] = useState(0);
  const [url, setUrl] = useState();

  useEffect(() => {
    setUrl(window.location.href);
  }, [changed]);

  return (
    <div className="navigation-bar">
      <nav>
        {links &&
          links.map((link, id) => (
            <Link
              className={
                url && url.includes(link) ? "feature active" : "feature"
              }
              key={id}
              to={`/app/${link}`}
              onClick={() => setChanged(changed + 1)}
            >
              {link}
            </Link>
          ))}
      </nav>
    </div>
  );
};

export default FeaturesBar;

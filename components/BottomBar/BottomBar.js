import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import Link from "next/dist/client/link";
import Popup from "../Popup/Popup";
import Form from "../Form/Form";
import styles from "./BottomBar.module.css"

const BottomBar = ({ radio }) => {
  const [popups, setPopups] = useState(false);

  const popupShow = () => {
    setPopups(true);
  };
  return (
    <div className={styles.divWrapper}>
      <Popup trigger={popups} setTrigger={setPopups} className="popupModal">
        <div className="leftPopup">
          <div className="whiteP" />
        </div>
        <div className="RightPopup">
          <h5>Apply For Counselling</h5>
          {/* <p>Fill the below details to get started</p> */}
          <Form popup={true} radio={radio} setTrigger={setPopups} />
        </div>
      </Popup>
      <div className={styles.FlDiv}>
        <div className={styles.flDivLeft} onClick={popupShow}>
          Apply For Couselling
          <FaArrowRight className={styles.bIcon} />
        </div>
        <div className="flDivRight">
          <Link href="https://wa.me/+917349222263">Chat with us</Link>
          <IoLogoWhatsapp className={styles.bIcon} style={{ color: "Green" }} />
        </div>
      </div>
    </div>
  );
};

export default BottomBar;

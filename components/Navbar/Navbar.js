import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaArrowRight, FaChevronDown, FaChevronUp } from "react-icons/fa";
import styles from "./Navbar.module.css";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import dynamic from "next/dynamic";
const Popup = dynamic(() => import("../Popup/Popup"));
// import Popup from "../Popup/Popup";
import Form from "../Form/Form";
import Tabs from "../Tabs/Tabs";
import { menuItem } from "./NavbarData";
import Button from "../Button/Button";

const Navbar = ({
  radio,
  dataScience,
  fullStack,
  careerForm,
  dataScienceCounselling,
  adPage,
}) => {
  const [icon, setIcon] = useState(false);
  const [show, setShow] = useState(false);
  const [popups, setPopups] = useState(false);

  const popupShow = () => {
    setPopups(true);
  };
  const showMenu = () => {
    setShow(!show);
  };

  const handleIcon = (data) => {
    setIcon(data);
  };

  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    let width = window.innerWidth;
    if (width < 481) {
      setMobile(true);
    }
    if (width > 481) {
      setMobile(false);
    }
  }, []);

  return (
    <div>
      <Popup trigger={popups} setTrigger={setPopups} className="popupModal">
        <div className="leftPopup">
          <div className="whiteP" />
        </div>
        <div className="RightPopup">
          <h5>Apply For Counselling</h5>
          {/* <p>Fill the below details to get started</p> */}
            <Form
              popup={true}
              setTrigger={setPopups}
              radio={radio}
              fullStack={fullStack}
              dataScience={dataScience}
              dataScienceCounselling={dataScienceCounselling}
            />
        </div>
      </Popup>

      <nav
        className={`${styles.nav} flexBox flexJustSpaceBetween flexAlignCenter`}
      >
        <div className={`${styles.left} flexBox flexAlignCenter `}>
          {adPage ? (
            ""
          ) : (
            <>
              <GiHamburgerMenu
                className={styles.ham}
                onClick={() => {
                  showMenu();
                  setIcon(false);
                }}
              />
              <div className={show ? styles.mobileWrapper : styles.hide}>
                <div className={styles.mobileMenu}>
                  {" "}
                  {menuItem.map((data) => {
                    const { id, name, url } = data;
                    return (
                      <span onClick={showMenu} key={id}>
                        <Link href={url}>{name}</Link>
                      </span>
                    );
                  })}
                </div>
              </div>
            </>
          )}

          {adPage ? (
            <Image
              src="https://learnbay-wb.s3.ap-south-1.amazonaws.com/main/ALight/learnbay-logo.png"
              alt="Learnbay"
              quality={100}
              style={{ objectFit: "contain" }}
              width={mobile ? "135" : "230"}
              height={60}
            />
          ) : (
            <Link href="/">
              <Image
                src="https://learnbay-wb.s3.ap-south-1.amazonaws.com/main/ALight/learnbay-logo.png"
                alt="Learnbay"
                quality={100}
                style={{ objectFit: "contain" }}
                width={mobile ? "135" : "230"}
                height={60}
              />
            </Link>
          )}

          <>
            {" "}
            {adPage ? (
              ""
            ) : (
              <div
                onMouseEnter={() => setIcon(true)}
                onMouseOver={() => setIcon(true)}
                onClick={() => {
                  setIcon(!icon);
                  setShow(false);
                }}
                className="flexBox"
              >
                <Button
                  text="Course"
                  passIcon={icon ? <FaChevronUp /> : <FaChevronDown />}
                />
              </div>
            )}
          </>

          {icon ? (
            <div
              className={styles.megaMenu}
              onMouseOver={() => setIcon(true)}
              onMouseLeave={() => setIcon(false)}
            >
              <Tabs handleIcon={handleIcon} />
            </div>
          ) : (
            ""
          )}
        </div>
        <div
          className={`${styles.right} flexBox flexAlignCenter flexJustSpaceBetween`}
        >
          {menuItem.map((data) => {
            const { id, name, url } = data;
            return (
              <span key={id}>
                <Link href={url}>{name}</Link>
              </span>
            );
          })}
          <div onClick={popupShow}>
            <Button
              text="Apply For Counselling"
              outline={true}
              passIcon={<FaArrowRight className="icon" />}
            />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

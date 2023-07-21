import React, { useState } from "react";
import styles from "../../../src/styles/blog.module.css";
import Link from "next/link";
import { FaChevronDown } from "react-icons/fa";
const RightSideData = ({ table }) => {
  const [isContentVisible, setIsContentVisible] = useState(false);

  const toggleContent = () => {
    setIsContentVisible(!isContentVisible);
  };
  return (
    <div className={styles.rightInfo}>
      <div className={styles.blogdiv1}>
        <div className={styles.table}>
          {/* <h5 className={styles.contentH}> Table of content</h5> */}

          <div className={styles.contentT}>
            {table.map((table, i) => {
              const removeSpecial = table.replace(
                /[&\/\\#+()$~%.'":*?<>{}]/g,
                ""
              );
              const uMake = removeSpecial.toLowerCase().replace(/\s+/g, "-");
              const url = `#${uMake}`;
              return (
                <div key={i}>
                  <div className={styles.divContent}>
                    <p className={styles.tocContent}>
                      <Link href={url}>{table}</Link>
                    </p>

                    <hr className={styles.tableline} />
                  </div>
                </div>
              );
            })}
          </div>

          <div className={styles.parentDdiv}>
            <button onClick={toggleContent} className={styles.tabButton}>
              {isContentVisible ? "Hide Content" : "Table of content"}{" "}
              <span className={styles.TdownIcon}>
                <FaChevronDown />
              </span>
            </button>
            <div className={styles.MobileContent}>
              {isContentVisible && (
                <div className={styles.contentTM}>
                  {table.map((table, i) => {
                    const removeSpecial = table.replace(
                      /[&\/\\#+()$~%.'":*?<>{}]/g,
                      ""
                    );
                    const uMake = removeSpecial
                      .toLowerCase()
                      .replace(/\s+/g, "-");
                    const url = `/blog/#${uMake}`;
                    return (
                      <div key={i}>
                        <span>
                          <p className={styles.tocContent}>
                            <Link href={url}>{table}</Link>
                          </p>

                          <hr className={styles.tableline} />
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSideData;

import React, { useState, useEffect } from "react";
import styles from "./CourseSection.module.css";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Popup from "../../Popup/Popup";
import Form from "../../Form/Form";
import { Details } from "./courseDetails";
import { BiTimeFive } from "react-icons/bi";
import { TbCurrencyRupee } from "react-icons/tb";

const Course = ({ dataScience, radio, dataScienceCounselling }) => {
  const [mobile, setMobile] = useState(false);
  const [value, setValue] = useState(3.2);
  const [popups, setPopups] = useState(false);

  const [CourseLoop, setCourseLoop] = useState([
    { title: "Popular Courses", value: true },
    { title: "Data Science & AI", value: false },
    { title: "Software Development", value: false },
    { title: "Master Program", value: false },
    { title: "View All", value: false },
  ]);

  const menuChange = (title, index) => {
    if (title === CourseLoop[index].title) {
      setCourseLoop([...CourseLoop], (CourseLoop[index].value = true));
      for (let i = 0; i < CourseLoop.length; i++) {
        if (index === i) {
          setCourseLoop([...CourseLoop], (CourseLoop[index].value = true));
        } else {
          setCourseLoop([...CourseLoop], (CourseLoop[i].value = false));
        }
      }
    }
  };

  const popupShow = () => {
    setPopups(true);
  };
  const [titleCourse, setTitleCourse] = useState();
  const [brochureLinks, setBrochureLinks] = useState();

  // useEffect(() => {
  //   let width = window.innerWidth;
  //   if (width < 481) {
  //     setValue(1.4);
  //     setMobile(true);
  //   }
  //   if (width < 600) {
  //     setValue(1.2);
  //     setMobile(true);
  //   } else if (width <= 641) {
  //     setValue(1.6);
  //   } else if (width <= 801) {
  //     setValue(2);
  //   } else if (width <= 961) {
  //     setValue(2.3);
  //   } else if (width <= 1025) {
  //     setValue(2.6);
  //   } else if (width <= 1280) {
  //     setValue(3);
  //   } else if (width <= 1281) {
  //     setValue(2.4);
  //   }
  // }, []);

  // console.log(Details);
  return (
    <div className={styles.Course} id="course">
      <Popup
        trigger={popups}
        setTrigger={setPopups}
        className="popupModal"
        downloadBrochure
      >
        <div className="leftPopup">
          <div
            className="whiteP"
            style={{ width: "340px", height: "400px" }}
          ></div>
        </div>
        <div className="RightPopup">
          <h5>Download Brochure</h5>
          <Form
            titleCourse={titleCourse}
            brochureLink={brochureLinks}
            dataScience={dataScience}
            dataScienceCounselling={dataScienceCounselling}
            radio={radio}
            downloadBrochure
          />
        </div>
      </Popup>

      <div className={styles.courses}>
        <div className={styles.listPanel}>
          <div className={styles.head}>
            <p className={styles.popular}>Popular course</p>
          </div>
          <div className={styles.spanWrap}>
            {Details.map((CourseData, index) => {
              // console.log(Details);
              return (
                <span
                  key={index}
                  onClick={() => {
                    menuChange(CourseData.title, index);
                  }}
                  className={
                    CourseLoop[index].value ? styles.ActiveSpan : styles.span
                  }
                >
                  {CourseData.title}
                </span>
              );
            })}
          </div>
        </div>
        <div>
          {Details.map((courseDetail, index) => {
            const { courses } = courseDetail;
            return CourseLoop[index].value ? (
              <div key={index}>
                {courses.map((courseDetail, index) => {
                  return (
                    <div key={index}>
                      <div className={styles.gridPanel}>
                        {/* <Swiper
                          slidesPerView={value}
                          spaceBetween={mobile ? 20 : 20}
                          breakpoints={{
                            1281: { slidesPerView: 3.1, spaceBetween: 60 },
                            1024: { slidesPerView: 2.9, spaceBetween: 55 },
                            961: { slidesPerView: 2.5, spaceBetween: 30 },
                            801: { slidesPerView: 2, spaceBetween: 20 },
                            641: { slidesPerView: 1.8, spaceBetween: 80 },
                            481: { slidesPerView: 1.8, spaceBetween: 40 },
                            100: { slidesPerView: 1.2, spaceBetween: 20 },
                          }}
                          pagination={{
                            clickable: true,
                          }}
                          grabCursor={true}
                          modules={[Pagination]}
                          className="mySwiper"
                        >
                          {courseDetail.courseDetails.map(
                            (viewAllData, index) => {
                              const {
                                id,
                                title,
                                title1,
                                img,
                                para,
                                link1,
                                rating,
                                tag,
                                ratingCount,
                                courseTime,
                              } = viewAllData;
                              // console.log(viewAllData);

                              return (
                                <SwiperSlide
                                  className={styles.leftSide}
                                  key={index}
                                >
                                  <div key={id} className={styles.SliderWrap}>
                                    <a href={link1} className={styles.imgWrap}>
                                      <div className="imgWrapper">
                                        <Image
                                          src={img}
                                          width={100}
                                          height={272}
                                          quality={100}
                                          unoptimized={true}
                                          style={{ objectFit: "cover" }}
                                          alt="data science course"
                                        />
                                      </div>
                                    </a>
                                    <div className={styles.contentBox}>
                                      <div className={styles.paraDiv}>
                                        <div className={styles.Div}>
                                          <div className={styles.tag}>
                                            {tag}
                                          </div>{" "}
                                          <div className={styles.rate}>
                                            {rating.map((data, index) => {
                                              return <p key={index}>{data}</p>;
                                            })}
                                          </div>
                                        </div>
                                        <div className={styles.headWrapper}>
                                          <h6 className={styles.mainHead}>
                                            {title}
                                            <br />
                                            {title1}
                                          </h6>
                                        </div>
                                        <hr />
                                        <div className={styles.paraDiv}>
                                          <p>
                                            <BiTimeFive
                                              className={styles.checkCircle}
                                            />
                                            {para[0]} | {courseTime}
                                          </p>
                                          <p className={styles.singleP}>
                                            <TbCurrencyRupee
                                              className={styles.checkCircle}
                                            />
                                            {para[2]}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </SwiperSlide>
                              );
                            }
                          )}
                        </Swiper> */}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              ""
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Course;

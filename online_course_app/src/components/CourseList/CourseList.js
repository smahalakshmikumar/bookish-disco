import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./courseList.module.css";
import NavigationBar from "../../UI/NavigationBar";
import LoadingIndicator from "../../UI/LoadingIndicator";

const CourseList = (props) => {
  const [CourseData, setListCourses] = useState([]);
  const [isLoading, setLoading] = useState([]);

  useEffect(() => {
    setLoading(true);
    try {
      fetch(
        "https://onlinecoursedb-9241d-default-rtdb.firebaseio.com/MainCoursesData.json",
        {
          method: "GET",
        }
      )
        .then((response) => response.json())
        .then((responseData) => {
          setLoading(false);
          const loadedCourse = [];
          for (const key in responseData) {
            loadedCourse.push({
              id: key,
              HeaderTitle: responseData[key].HeaderTitle,
              ImageSrc: responseData[key].ImageSrc,
              isWishlisted: responseData[key].isWishlisted,
              isEnrolled: responseData[key].isEnrolled,
            });
          }

          setListCourses(loadedCourse);
        });
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  const handleClickedCourse = (selectedID) => {
    props.history.push({
      pathname: "/SelectedCourse",
      selectedID,
    });
  };

  return (
    <div class="container-fluid">
      <NavigationBar userName={props?.location?.formData?.email} />
      {isLoading && <LoadingIndicator></LoadingIndicator>}
      {/* <div class="d-flex p-2 bd-highlight">
        <h3>Hello {props?.location?.formData?.email}</h3>
      </div> */}
      <div class="card-columns" style={{ padding: "10px" }}>
        {CourseData.map((data) => (
          <div class="card" onClick={() => handleClickedCourse(data.id)}>
            <div class="card-header">
              {data.isWishlisted ? (
                <div>
                  <span> &#9733;</span>
                  Wishlisted
                </div>
              ) : data.isEnrolled ? (
                <div>
                  <span>&#10003;</span> Enrolled
                </div>
              ) : (
                <div />
              )}
            </div>
            <img
              class="card-img-top"
              src={data.ImageSrc}
              alt="designImage"
            ></img>
            <div data-testid="test" class="card-footer">
              <small class="text-muted">{data.HeaderTitle}</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default CourseList;

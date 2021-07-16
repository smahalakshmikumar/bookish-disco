import React, { useState, useEffect } from "react";
import { Tabs, Tab } from "react-bootstrap";
import LoadingIndicator from "../../UI/LoadingIndicator";
import NavigationBar from "../../UI/NavigationBar";
import "./MyCourse.module.css";

const MyCourses = (props) => {
  const [key, setKey] = useState("MyCollections");
  const [courses, setAllCourses] = useState([]);
  const [wishlistDataSource, setWishDataSource] = useState([]);
  const [isLoading, setLoading] = React.useState(false);

  useEffect(() => RefreshFunc(), []);

  //Refresh on tab click
  const RefreshFunc = () => {
    try {
      setLoading(true);
      fetch(
        "https://onlinecoursedb-9241d-default-rtdb.firebaseio.com/CoursesList.json"
      )
        .then((response) => response.json())
        .then((responseData) => {
          setLoading(false);
          let filteredArray = responseData.filter(function (item) {
            return item !== null;
          });
          const loadedCourse = [];
          for (const key in filteredArray) {
            loadedCourse.push({
              id: key,
              title: filteredArray[key].title,
              Description: filteredArray[key].Description,
              isEnrolled: filteredArray[key].isEnrolled,
              isWishlisted: filteredArray[key].isWishlisted,
            });
          }
          //filtering enrolled courses
          let filteredCourses = loadedCourse.filter(function (item) {
            return item.isEnrolled;
          });
          //filtering WishListed courses
          let filteredWishListCourses = loadedCourse.filter(function (item) {
            return item.isWishlisted;
          });
          console.log(loadedCourse);
          setAllCourses(filteredCourses);
          setWishDataSource(filteredWishListCourses);
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  const ItemClicked = (CourseId, action) => {
    setLoading(true);
    //fetching corresponding wishList
    fetch(
      `https://onlinecoursedb-9241d-default-rtdb.firebaseio.com/CoursesList/${CourseId}.json`
    )
      .then((response) => response.json())
      .then((responseData) => {
        //setting selected item wishlist to false upon click & enrolled as true to addto my collections
        if (action === "moveCourses") {
          responseData["isWishlisted"] = false;
          responseData["isEnrolled"] = true;
          responseData["isDeleted"] = false;
        } else if (action === "wishClicked") {
          responseData["isWishlisted"] = true;
          responseData["isEnrolled"] = false;
          responseData["isDeleted"] = false;
        }

        setLoading(false);
        fetch(
          `https://onlinecoursedb-9241d-default-rtdb.firebaseio.com/CoursesList/${CourseId}.json`,
          {
            method: "PUT",
            body: JSON.stringify(responseData),
            headers: { "Content-Type": "application/json" },
          }
        );
        fetch(
          `https://onlinecoursedb-9241d-default-rtdb.firebaseio.com/MainCoursesData/${CourseId}.json`,
          {
            method: "PUT",
            body: JSON.stringify(responseData),
            headers: { "Content-Type": "application/json" },
          }
        )
          .then((response) => response.json())
          .then((responseData) => {
            setLoading(false);
            setWishDataSource((prevCourses) =>
              prevCourses.filter((course) => course.id !== CourseId)
            );
            setAllCourses((prevCourses) =>
              prevCourses.filter((course) => course.id !== CourseId)
            );
          });
      });
  };

  //Delete clicked
  const DeleteClicked = (CourseId) => {
    setLoading(true);

    //setting isdelete true in main data source
    fetch(
      `https://onlinecoursedb-9241d-default-rtdb.firebaseio.com/CoursesList/${CourseId}.json`
    )
      .then((response) => response.json())
      .then((responseData) => {
        responseData["isDeleted"] = true;
        responseData["isEnrolled"] = false;
        responseData["isWishlisted"] = false;
        setLoading(false);
        fetch(
          `https://onlinecoursedb-9241d-default-rtdb.firebaseio.com/MainCoursesData/${CourseId}.json`,
          {
            method: "PUT",
            body: JSON.stringify(responseData),
            headers: { "Content-Type": "application/json" },
          }
        );
      });

    //deleting from my courses
    fetch(
      `https://onlinecoursedb-9241d-default-rtdb.firebaseio.com/CoursesList/${CourseId}.json`,
      {
        method: "Delete",
      }
    ).then((response) => {
      setLoading(false);
      setAllCourses((prevCourses) =>
        prevCourses.filter((course) => course.id !== CourseId)
      );
      setWishDataSource((prevCourses) =>
        prevCourses.filter((course) => course.id !== CourseId)
      );
    });
    //})
  };

  return (
    <>
      <NavigationBar />
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => {
          setKey(k);
          RefreshFunc();
        }}
      >
        <Tab eventKey="MyCollections" title="My  Collections">
          <div class="container-fluid">
            {isLoading && <LoadingIndicator></LoadingIndicator>}

            <div class="card-deck" style={{ padding: "10px" }}>
              {courses.map((data) => (
                <div
                  class="card bg-light mb-3"
                  key="data.id"
                  style={{ maxWidth: "25rem" }}
                >
                  <div class="card-header">
                    <h5 class="card-title">{data.title}</h5>
                  </div>
                  <div class="card-body">
                    {/* <h5 class="card-title">Info card title</h5> */}
                    <p class="card-text">{data.Description}</p>
                  </div>
                  <div class="card-footer" style={{ padding: "10px" }}>
                    <button
                      type="button"
                      class="btn btn-danger"
                      style={{ margin: "20px" }}
                      onClick={() => DeleteClicked(data.id)}
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      class="btn btn-info"
                      onClick={() => ItemClicked(data.id, "wishClicked")}
                    >
                      Add to Wishlist
                    </button>
                  </div>
                </div>
              ))}
               
            </div>
          </div>
        </Tab>
        <Tab eventKey="Wishlist" title="Wishlist">
          <div class="container-fluid">
            {isLoading && <LoadingIndicator></LoadingIndicator>}
            <div class="card-deck" style={{ padding: "10px" }}>
              {wishlistDataSource.map((data) => (
                <div
                  class="card bg-light mb-3"
                  key="data.id"
                  style={{ maxWidth: "25rem" }}
                >
                  <div class="card-header">
                    <h5 class="card-title">{data.title}</h5>
                  </div>
                  <div class="card-body">
                    <p class="card-text">{data.Description}</p>
                  </div>
                  <div class="card-footer" style={{ padding: "10px" }}>
                    <button
                      type="button"
                      class="btn btn-danger"
                      style={{ margin: "20px" }}
                      onClick={() => DeleteClicked(data.id)}
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      class="btn btn-info"
                      onClick={() => ItemClicked(data.id, "moveCourses")}
                    >
                      Move to My courses
                    </button>
                  </div>
                </div>
              ))}
               
            </div>
          </div>
        </Tab>
      </Tabs>
    </>
  );
};
export default MyCourses;

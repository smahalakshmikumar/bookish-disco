import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ReactVideo } from "reactjs-media";
import NavigationBar from "../../UI/NavigationBar";
import { Button } from "react-bootstrap";
import SweetAlert from "react-bootstrap-sweetalert";
import "./selectedCourse.module.css";
import LoadingIndicator from "../../UI/LoadingIndicator";

const MockSelectedCourse = (props) => {
  const [isLoading, setLoading] = React.useState(false);
  const [isPopup, setPopup] = React.useState(false);
  const [ResponseData, setResponseData] = React.useState();
  const [dataSource, setSelectedCourse] = React.useState([]);
  const [buttonText, setButtonText] = React.useState("Enroll Now");
  const [variant, setVariant] = React.useState("");
  const [isDisabled, setIsDisabled] = React.useState(false);

  useEffect(() => {
    setLoading(true);

    //fetching the selected course data
    try {
      fetch(
        `https://onlinecoursedb-9241d-default-rtdb.firebaseio.com/MainCoursesData/${props?.location?.selectedID}.json`,

        {
          method: "GET",
        }
      )
        .then((response) => response.json())
        .then((responseData) => {
          if (responseData?.isWishlisted) {
            setButtonText("Wishlisted");
            setVariant("warning");
            setIsDisabled(true);
          } else if (responseData?.isEnrolled) {
            setButtonText("Enrolled");
            setVariant("warning");
            setIsDisabled(true);
          } else if (
            responseData?.isDeleted ||
            (!responseData?.isEnrolled && !responseData?.isWishlisted)
          ) {
            setButtonText("Enroll Now");
            setVariant("info");
            setIsDisabled(false);
          } else {
            setButtonText("Enroll Now");
            setVariant("info");
            setIsDisabled(false);
          }
          setLoading(false);
          const loadedCourse = [];
          if (responseData != null)
            loadedCourse.push({
              title: responseData.title,
              Description: responseData.Description,
              ImageSrc: responseData.ImageSrc,
              VideoSrc: responseData.VideoSrc,
              isEnrolled: responseData.isEnrolled,
              isWishlisted: responseData.isWishlisted,
              isDeleted: responseData.isDeleted,
            });

          setSelectedCourse(loadedCourse);
          setResponseData(responseData);
        });
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  const EnrollNow = () => {
    setLoading(true);
    ResponseData["isEnrolled"] = true;
    fetch(
      `https://onlinecoursedb-9241d-default-rtdb.firebaseio.com/MainCoursesData/${props.location.selectedID}.json`,

      {
        method: "PUT",
        body: JSON.stringify(ResponseData),
        headers: { "Content-Type": "application/json" },
      }
    );
    fetch(
      `https://onlinecoursedb-9241d-default-rtdb.firebaseio.com/CoursesList/${props.location.selectedID}.json`,

      {
        method: "PUT",
        body: JSON.stringify(ResponseData),
        headers: { "Content-Type": "application/json" },
      }
    ).then((response) => {
      return response.json();
    });

    setLoading(false);
    setPopup(true);
    setButtonText("Enrolled");
    setVariant("warning");
    setIsDisabled(true);
    // });
  };

  return (
    <div>
      {" "}
      <NavigationBar />
      {isLoading && <LoadingIndicator></LoadingIndicator>}
      {isPopup && (
        <SweetAlert
          show={isPopup}
          success
          title="success!"
          onConfirm={() => setPopup(false)}
        >
          Enrolled successfully!
        </SweetAlert>
      )}
      <div class="container-fluid" style={{ padding: "10px" }}>
        <div class="row" style={{ padding: "5px" }}>
          {dataSource.map((data) => (
            <>
              <div class="col-md-6 col-sm-12">
                <ReactVideo
                  src={data.VideoSrc}
                  poster={data.ImageSrc}
                  primaryColor="red"
                />
              </div>
              <div class="col-md-6 col-sm-12">
                <h1>{data.title} </h1>
                <p>{data.Description}</p>
                <Button
                  variant={variant}
                  disabled={isDisabled}
                  onClick={EnrollNow}
                  id="EnrollButton"
                  className="selectedButton"
                >
                  {buttonText}
                </Button>
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};
export default MockSelectedCourse;

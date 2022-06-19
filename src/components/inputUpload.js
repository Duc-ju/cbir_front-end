import React, { useEffect } from "react";
import classes from "./inputUpload.module.css";
import addIcon from "../static/addIcon.png";

function InputUpload(props) {
  const { photo, setPhoto, fetching, setFetching, setResult, result } = props;
  const handleChangePhoto = (e) => {
    const file = e.target.files[0];
    const review = URL.createObjectURL(file);
    setPhoto({
      file,
      review,
    });
    getBase64({
      file,
      review,
    });
  };

  const getBase64 = (photoRef) => {
    let baseURL = "";
    // Make new FileReader
    let reader = new FileReader();

    // Convert the file to base64 text
    reader.readAsDataURL(photoRef.file);

    // on reader load somthing...
    reader.onload = () => {
      baseURL = reader.result;
      setPhoto({
        review: photoRef.review,
        file: baseURL,
      });
    };
  };

  console.log(photo);

  const handleSubmit = () => {
    setFetching(true);
    const data = new FormData();
    data.append("image", photo.file);
    fetch(`${process.env.REACT_APP_API_URL}/query/`, {
      method: "POST",
      body: data,
    })
      .then((data) => data.json())
      .then((res) => {
        setResult(res);
        setFetching(false);
      });
  };

  const handleCancel = () => {
    setPhoto();
    setFetching(false);
    setResult();
  };

  useEffect(() => {
    return () => {
      photo && photo.review && URL.revokeObjectURL(photo.review);
    };
  }, [photo]);
  return (
    <div className={classes.root}>
      <div className={classes.inputContainer}>
        <div className={classes.inputLabel}>
          {(!photo || !photo.review) && (
            <>
              <input
                type={"file"}
                id={"inputFile"}
                onChange={handleChangePhoto}
              />
              <label htmlFor={"inputFile"} className={classes.inputButton}>
                Chọn một ảnh
                <span
                  className={classes.addIcon}
                  style={{ backgroundImage: `url(${addIcon})` }}
                ></span>
              </label>
            </>
          )}
          {!!photo && !!photo.review && (
            <div className={classes.imageContainer}>
              <span className={classes.cancelButton} onClick={handleCancel}>
                &#10006;
              </span>
              <img src={photo.review} />
            </div>
          )}
        </div>
      </div>
      {!!photo && !!photo.review && !result && (
        <div className={classes.buttonContainer}>
          <button
            className={`${classes.searchButton} ${
              fetching ? classes.loading : ""
            }`}
            onClick={handleSubmit}
          >
            <span>{fetching ? "Đang tìm kiếm" : "Tìm kiếm"}</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default InputUpload;

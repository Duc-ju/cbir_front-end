import React, { useState } from "react";
import classes from "./linkInput.module.css";

function LinkInput(props) {
  const { photo, setPhoto, setResult, fetching, setFetching } = props;
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    setResult();
    setPhoto();
    setFetching(true);
    fetch(input)
      .then((res) => res.blob()) // Gets the response and returns it as a blob
      .then((blob) => {
        getBase64({
          file: blob,
          review: input,
        });
      })
      .catch(() => {
        setFetching(false);
        window.alert("Ảnh không tồn tại");
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
      const data = new FormData();
      data.append("image", baseURL);
      fetch(`${process.env.REACT_APP_API_URL}/query/`, {
        method: "POST",
        body: data,
      })
        .then((data) => data.json())
        .then((res) => {
          setResult(res);
          setFetching(false);
          setPhoto({
            review: photoRef.review,
            file: baseURL,
          });
        })
        .catch(() => {
          setFetching(false);
          window.alert("Đã xảy ra lỗi khi tìm kiếm ảnh");
        });
    };
  };

  const handleCancel = () => {
    setPhoto();
    setFetching(false);
    setResult();
    setInput();
  };

  return (
    <div className={classes.root}>
      <div className={classes.inputContainer}>
        <div className={classes.inputLabel}>
          <div className={classes.inputGroup}>
            <div className={classes.inputContainer}>
              <input
                type={"text"}
                placeholder={"Nhập link ảnh"}
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </div>

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
          </div>

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
    </div>
  );
}

export default LinkInput;

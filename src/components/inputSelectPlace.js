import React from "react";
import classes from "./inputSelectPlace.module.css";

const TEST_BATCH_SIZE = 5;
const listItems = [
  "banhmy",
  "com_cuon",
  "sot_vang",
  "ga_ran",
  "com",
  "sup",
  "trung_cuon",
];
const images = [
  ...listItems.reduce(
    (prev, itemRoot) =>
      prev.concat(
        new Array(TEST_BATCH_SIZE).fill(null).map((item, index) => {
          return `${itemRoot}_${index + 1}.jpg`;
        })
      ),
    []
  ),
];

function InputSelectPlace(props) {
  const { setResult, setFetching, fetching, result, selected, setSelected } =
    props;
  const handleSelectImage = (index) => {
    setSelected(index);
  };
  const handleSubmit = () => {
    setFetching(true);
    fetch(`${process.env.REACT_APP_API_URL}/query/${images[selected]}/`)
      .then((data) => data.json())
      .then((res) => {
        setResult(res);
        setFetching(false);
      })
      .catch(() => {
        setFetching(false);
        window.alert("Đã xảy ra lỗi khi tìm kiếm ảnh");
      });
  };
  return (
    <section className={classes.root}>
      <h3>{!!result || fetching ? "Ảnh đã chọn" : "Chọn một ảnh"}</h3>
      {!result && !fetching && (
        <div className={classes.imageInputList}>
          <ul>
            {images.map((image, index) => (
              <li
                key={index}
                className={`${classes.imageInputItem} ${
                  selected === index ? classes.selected : ""
                }`}
                onClick={() => handleSelectImage(index)}
              >
                <img
                  src={`${process.env.REACT_APP_API_URL}/media/test/${image}`}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
      {(fetching || !!result) && (
        <div className={classes.selectedImage}>
          <img
            src={`${process.env.REACT_APP_API_URL}/media/test/${images[selected]}`}
          />
        </div>
      )}
      {!result && selected !== undefined && (
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
    </section>
  );
}

export default InputSelectPlace;

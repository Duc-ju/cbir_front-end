import React from "react";
import classes from "./resultPlace.module.css";

function ResultPlace(props) {
  const { result, handleReset } = props;
  if (!result) return null;
  return (
    <div className={classes.root}>
      <h3 className={classes.title}>Kết quả tìm kiếm</h3>
      <ul className={classes.resultContainer}>
        {result.images.map((image, index) => (
          <li key={index} className={classes.resultItem}>
            <img
              src={`${process.env.REACT_APP_API_URL}/media/train/${image}`}
            />
          </li>
        ))}
      </ul>
      <div className={classes.buttonContainer}>
        <button className={classes.resetButton} onClick={handleReset}>
          Tìm ảnh khác
        </button>
      </div>
    </div>
  );
}

export default ResultPlace;

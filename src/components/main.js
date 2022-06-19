import React, { useState } from "react";
import InputSelectPlace from "./inputSelectPlace";
import ResultPlace from "./resultPlace";
import classes from "./main.module.css";
import InputUpload from "./inputUpload";

function Main(props) {
  const [inputType, setInputType] = React.useState("select");
  const [fetching, setFetching] = React.useState(false);
  const [result, setResult] = React.useState();
  const [selected, setSelected] = React.useState();
  const [photo, setPhoto] = useState();
  const handleReset = () => {
    setFetching(false);
    setResult();
    setSelected();
    setPhoto();
  };
  const handleChangeInputType = (e) => {
    setInputType(e.target.value);
    setFetching(false);
    setResult();
    setSelected();
    setPhoto();
  };
  return (
    <section className={classes.root}>
      <div className={classes.selectInput}>
        <select onChange={handleChangeInputType}>
          <option value={"select"}>Chọn ảnh</option>
          <option value={"upload"}>Tải ảnh lên</option>
        </select>
      </div>
      {inputType === "upload" && (
        <InputUpload
          photo={photo}
          setPhoto={setPhoto}
          result={result}
          setResult={setResult}
          fetching={fetching}
          setFetching={setFetching}
        />
      )}
      {inputType === "select" && (
        <InputSelectPlace
          result={result}
          setResult={setResult}
          fetching={fetching}
          setFetching={setFetching}
          selected={selected}
          setSelected={setSelected}
        />
      )}
      <ResultPlace result={result} handleReset={handleReset} />
    </section>
  );
}

export default Main;

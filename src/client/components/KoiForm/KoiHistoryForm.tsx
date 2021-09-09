import { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import AdapterDateFns from "@material-ui/lab/AdapterDateFns";
import InputAdornment from "@material-ui/core/InputAdornment";
import enLocale from "date-fns/locale/en-GB";
import LocalizationProvider from "@material-ui/lab/LocalizationProvider";
import DatePicker from "@material-ui/lab/DatePicker";
import Upload from "../Upload/Upload";

const StyledImage = styled.img`
  height: 3rem;
`;
const StyledInput = styled.input`
  display: none;
`;
export default function KoiHistoryForm({ update, setUpdate }) {
  const [image, setImage] = useState("");

  useEffect(() => {
    if (update.image) {
      setImage(URL.createObjectURL(update.image));
    }
  }, [update.image]);

  return (
    <div className="cp-c-row cp-c-wrap cp-c-padding-2 cp-c-lg-padding-3">
      <div className="cp-c-row cp-c-align-start-center cp-i-100">
        <StyledInput
          accept="image/*"
          type="file"
          id="image"
          // onChange={(e) =>
          //   setUpdate((k) => ({ ...k, image: e.target.files[0] }))
          // }
        />
        <label htmlFor="image">
          <Button variant="contained" color="primary" component="span">
            Upload
          </Button>
        </label>

        <StyledImage src={image} />
      </div>
      <div className="cp-i-100">
        <TextField
          type="number"
          fullWidth
          label="Length"
          id="length"
          onChange={(e) =>
            setUpdate((k) => ({ ...k, length: Number(e.target.value) }))
          }
          InputProps={{
            endAdornment: <InputAdornment position="end">cm</InputAdornment>,
          }}
        />
      </div>
      <div className="cp-i-100">
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={enLocale}>
          <DatePicker
            mask={"__/__/____"}
            label="Date"
            value={update.date}
            onChange={(newValue) =>
              setUpdate((u) => ({
                ...u,
                date: newValue,
              }))
            }
            renderInput={(params) => <TextField fullWidth {...params} />}
          />
        </LocalizationProvider>
      </div>
    </div>
  );
}

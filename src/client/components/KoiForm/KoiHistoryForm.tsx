import Image from "next/image";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import AdapterDateFns from "@material-ui/lab/AdapterDateFns";
import InputAdornment from "@material-ui/core/InputAdornment";
import enLocale from "date-fns/locale/en-GB";
import LocalizationProvider from "@material-ui/lab/LocalizationProvider";
import DatePicker from "@material-ui/lab/DatePicker";
import Upload from "../Upload/Upload";
import { ImageContainer } from "../utils/styledComponents";

const StyledImageContainer = styled(ImageContainer)`
  padding-top: 85%;
`;
export default function KoiHistoryForm({ update, setUpdate }) {
  return (
    <div className="cp-c-column cp-c-wrap cp-c-padding-2 cp-c-lg-padding-3">
      {update.image && (
        <StyledImageContainer>
          <Image
            src={update.image}
            layout="fill"
            objectFit="contain"
            priority
          />
        </StyledImageContainer>
      )}
      <Upload image={update.image} setUpdate={setUpdate} />
      <div>
        <TextField
          type="number"
          fullWidth
          label="Length"
          id="length"
          value={update.length}
          onChange={(e) =>
            setUpdate((k) => ({ ...k, length: Number(e.target.value) }))
          }
          InputProps={{
            endAdornment: <InputAdornment position="end">cm</InputAdornment>,
          }}
        />
      </div>
      <div>
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

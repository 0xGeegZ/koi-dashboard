import Autocomplete from "@material-ui/core/Autocomplete";
import TextField from "@material-ui/core/TextField";
import AdapterDateFns from "@material-ui/lab/AdapterDateFns";
import enLocale from "date-fns/locale/en-GB";
import LocalizationProvider from "@material-ui/lab/LocalizationProvider";
import DatePicker from "@material-ui/lab/DatePicker";
import {
  breeders,
  varieties,
  bloodlines,
  skinTypes,
  sex,
} from "../utils/KoiFromData";

export default function KoiForm({ koi, setKoi }) {
  console.log(koi);
  return (
    <div className="cp-c-row cp-c-wrap cp-c-padding-2 cp-c-lg-padding-3">
      <div className="cp-i-50 cp-i-sm-33">
        <Autocomplete
          freeSolo
          autoSelect
          options={varieties}
          value={koi.variety}
          onChange={(e, value) =>
            setKoi((k) => ({ ...k, variety: value || "" }))
          }
          renderInput={(params) => <TextField {...params} label="Variety" />}
        />
      </div>
      <div className="cp-i-50 cp-i-sm-33">
        <Autocomplete
          freeSolo
          autoSelect
          value={koi.breeder}
          options={breeders}
          onChange={(e, value) => setKoi((k) => ({ ...k, breeder: value }))}
          renderInput={(params) => <TextField {...params} label="Breeder" />}
        />
      </div>
      <div className="cp-i-50 cp-i-sm-33">
        <Autocomplete
          freeSolo
          autoSelect
          value={koi.bloodline}
          options={bloodlines}
          onChange={(e, value) => setKoi((k) => ({ ...k, bloodline: value }))}
          renderInput={(params) => <TextField {...params} label="Bloodline" />}
        />
      </div>
      <div className="cp-i-50 cp-i-sm-33">
        <Autocomplete
          freeSolo
          autoSelect
          value={koi.skinType}
          options={skinTypes}
          onChange={(e, value) => setKoi((k) => ({ ...k, skinType: value }))}
          renderInput={(params) => <TextField {...params} label="Skin type" />}
        />
      </div>
      <div className="cp-i-50 cp-i-sm-33">
        <Autocomplete
          freeSolo
          autoSelect
          value={koi.sex}
          options={sex}
          onChange={(e, value) => setKoi((k) => ({ ...k, sex: value }))}
          renderInput={(params) => <TextField {...params} label="Sex" />}
        />
      </div>
      <div className="cp-i-50 cp-i-sm-33">
        <TextField
          fullWidth
          value={koi.youtube}
          label="Youtube link"
          variant="outlined"
          onChange={(evt) =>
            setKoi((k) => ({ ...k, youtube: evt.target.value }))
          }
        />
      </div>
      <div className="cp-i-50 cp-i-sm-33">
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={enLocale}>
          <DatePicker
            mask={"__/__/____"}
            label="Birthdate"
            value={koi.birthDate}
            onChange={(newValue) => {
              setKoi((k) => ({
                ...k,
                birthDate: newValue,
              }));
            }}
            renderInput={(params) => <TextField fullWidth {...params} />}
          />
        </LocalizationProvider>
      </div>
    </div>
  );
}

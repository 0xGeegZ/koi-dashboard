import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import Autocomplete from "@material-ui/core/Autocomplete";
import TextField from "@material-ui/core/TextField";
import AdapterDateFns from "@material-ui/lab/AdapterDateFns";
import enLocale from "date-fns/locale/en-GB";
import LocalizationProvider from "@material-ui/lab/LocalizationProvider";
import DatePicker from "@material-ui/lab/DatePicker";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import { isEqual } from "lodash";
import { AiOutlineSave } from "@react-icons/all-files/ai/AiOutlineSave";
import { useUpdateKoiMutation } from "../../../client/graphql/updateKoi.generated";
import { useGetKoiQuery } from "../../../client/graphql/getKoi.generated";
import { UpdateKoiMutationVariables } from "../../../client/graphql/updateKoi.generated";
import {
  Title,
  Wrapper,
  slugify,
} from "../../../client/components/utils/styledComponents";
import Breadcrumbs from "../../../client/components/Breadcrumbs/Breadcrumbs";
import Upload from "../../../client/components/Upload/Upload";

const varieties = ["Showa", "Sanke", "Kohaku"];
const breeders = ["Dainichi", "SFF", "Momotaro"];
const bloodlines = ["SuperMonster", "Stardust", "NewMiharaX"];
const skinTypes = ["Scaled", "Ginrin", "Doitsu"];
const sex = ["Male", "Female"];

const ButtonContainer = styled.div`
  padding: 2rem;
  padding-top: 0;
`;

export default function CreateKoi() {
  const router = useRouter();
  const { id } = router.query;
  const [, updateKoi] = useUpdateKoiMutation();
  const [{ data, fetching, error }] = useGetKoiQuery({
    variables: {
      id: String(id),
    },
  });
  const [koi, setKoi] = useState<UpdateKoiMutationVariables>({
    id: "",
    variety: "",
    breeder: "",
    bloodline: "",
    skinType: "",
    sex: "",
    youtube: "",
  });

  useEffect(() => {
    if (data) {
      setKoi((k) => ({ ...k, ...data.koi }));
    }
  }, [data]);

  if (fetching || data == null || data.koi == null) return <div />;

  if (error) return <p>{error.message}</p>;

  return (
    <>
      <Breadcrumbs
        links={[
          { to: `/koi`, text: "All your koi" },
          { to: `/${slugify(koi.variety)}`, text: koi.variety },
          {
            to: `/koi/${koi.id}`,
            text: `${koi.breeder} ${koi.bloodline ? koi.bloodline : ""} ${
              koi.variety
            }`,
          },
        ]}
        currentBreadcrumbText="Edit koi"
      />
      <Wrapper>
        <Title>Edit your koi</Title>
        <div className="cp-c-row cp-c-wrap cp-c-padding-2 cp-c-lg-padding-3">
          <div className="cp-i-33">
            <Autocomplete
              disablePortal
              value={koi.variety}
              options={varieties}
              onChange={(e, value) =>
                setKoi((k) => ({ ...k, variety: value || "" }))
              }
              renderInput={(params) => (
                <TextField {...params} label="Variety" />
              )}
            />
          </div>
          <div className="cp-i-33">
            <Autocomplete
              disablePortal
              value={koi.breeder}
              options={breeders}
              onChange={(e, value) => setKoi((k) => ({ ...k, breeder: value }))}
              renderInput={(params) => (
                <TextField {...params} label="Breeder" />
              )}
            />
          </div>
          <div className="cp-i-33">
            <Autocomplete
              disablePortal
              value={koi.bloodline}
              options={bloodlines}
              onChange={(e, value) =>
                setKoi((k) => ({ ...k, bloodline: value }))
              }
              renderInput={(params) => (
                <TextField {...params} label="Bloodline" />
              )}
            />
          </div>
          <div className="cp-i-33">
            <Autocomplete
              disablePortal
              value={koi.skinType}
              options={skinTypes}
              onChange={(e, value) =>
                setKoi((k) => ({ ...k, skinType: value }))
              }
              renderInput={(params) => (
                <TextField {...params} label="Skin type" />
              )}
            />
          </div>
          <div className="cp-i-33">
            <Autocomplete
              disablePortal
              value={koi.sex}
              options={sex}
              onChange={(e, value) => setKoi((k) => ({ ...k, sex: value }))}
              renderInput={(params) => <TextField {...params} label="Sex" />}
            />
          </div>
          <div className="cp-i-33">
            <TextField
              value={koi.youtube}
              fullWidth
              label="Youtube link"
              variant="outlined"
              onChange={(evt) =>
                setKoi((k) => ({ ...k, youtube: evt.target.value }))
              }
            />
          </div>
          <div className="cp-i-33">
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              locale={enLocale}
            >
              <DatePicker
                mask={"__/__/____"}
                label="Birthdate"
                value={koi.birthDate}
                onChange={(newValue) =>
                  setKoi((k) => ({ ...k, birthDate: newValue }))
                }
                renderInput={(params) => <TextField fullWidth {...params} />}
              />
            </LocalizationProvider>
          </div>
          <Upload />
        </div>
        <ButtonContainer>
          <Button
            startIcon={<AiOutlineSave />}
            disabled={isEqual(data.koi, koi) || !koi.variety}
            variant="contained"
            size="large"
            onClick={() => {
              if (!koi) return;
              toast.promise(updateKoi(koi), {
                loading: `Updating koi...`,
                success: `Koi updated!`,
                error: (err) => err,
              });
            }}
          >
            Update koi
          </Button>
        </ButtonContainer>
      </Wrapper>
    </>
  );
}

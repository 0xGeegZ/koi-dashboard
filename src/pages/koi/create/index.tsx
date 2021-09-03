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
import { AiOutlinePlus } from "@react-icons/all-files/ai/AiOutlinePlus";
import { useGetCurrentUserQuery } from "../../../client/graphql/getCurrentUser.generated";
import {
  CreateKoiMutationVariables,
  useCreateKoiMutation,
} from "../../../client/graphql/createKoi.generated";
import {
  Title,
  Wrapper,
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
  const [, createKoi] = useCreateKoiMutation();
  const [{ data, fetching, error }] = useGetCurrentUserQuery();
  const currentUser = data?.currentUser;
  const [koi, setKoi] = useState<CreateKoiMutationVariables>({
    variety: "",
    breeder: "",
    bloodline: "",
    skinType: "",
    sex: "",
    youtube: "",
  });

  useEffect(() => {
    if (currentUser) {
      setKoi((k) => ({ ...k, userId: currentUser.id }));
    }
  }, [currentUser]);

  if (fetching) return <div />;

  if (error) return <p>{error.message}</p>;

  if (!currentUser) {
    if (process.browser) router.push("/login");
    return (
      <p>
        Redirecting to <Link href="/login">/login</Link>
        ...
      </p>
    );
  }

  return (
    <>
      <Breadcrumbs links={[]} currentBreadcrumbText="Create koi" />
      <Wrapper>
        <Title>Add your koi</Title>
        <div className="cp-c-row cp-c-wrap cp-c-padding-2 cp-c-lg-padding-3">
          <div className="cp-i-33">
            <Autocomplete
              disablePortal
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
              options={sex}
              onChange={(e, value) => setKoi((k) => ({ ...k, sex: value }))}
              renderInput={(params) => <TextField {...params} label="Sex" />}
            />
          </div>
          <div className="cp-i-33">
            <TextField
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
            startIcon={<AiOutlinePlus />}
            disabled={!koi.variety}
            variant="contained"
            size="large"
            onClick={() => {
              if (!koi) return;
              toast.promise(createKoi(koi), {
                loading: `Creating koi...`,
                success: `Koi Created!`,
                error: (err) => err,
              });
            }}
          >
            Add koi
          </Button>
        </ButtonContainer>
      </Wrapper>
    </>
  );
}

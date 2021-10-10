import Button from "@mui/material/Button";
import styled from "styled-components";
import dynamic from "next/dynamic";
import TextField from "@mui/material/TextField";
import toast from "react-hot-toast";
import { AiOutlineSave } from "@react-icons/all-files/ai/AiOutlineSave";
import { useUpdateUserMutation } from "../../graphql/updateUser.generated";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import {
  Title,
  Wrapper,
  FormButtonContainer,
  media,
} from "../utils/styledComponents";

const BackButton = dynamic(import("../utils/BackButton"));

type Props = {
  name?: string;
  email: string;
  setName: any;
  setEmail: any;
  currentUser?: any;
  id: string;
};

const Text = styled.div`
  padding: 1rem;
  padding-top: 0.5rem;
  font-size: 0.9rem;
  color: ${(props) => props.theme.textColor};

  ${media.md} {
    padding: 0 2rem;
    padding-top: 1rem;
  }
`;

export default function UserSettings({
  id,
  email,
  setEmail,
  name,
  setName,
  currentUser,
}: Props) {
  const [, updateUser] = useUpdateUserMutation();

  return (
    <>
      <Breadcrumbs links={[]} currentBreadcrumbText="Settings" />
      <Wrapper>
        <Title>User settings</Title>
        <Text>
          Your ID so your friends can add you is: <b>{id}</b>
        </Text>
        <div className="cp-c-row cp-c-wrap cp-c-padding-2 cp-c-lg-padding-3">
          <div className="cp-i-100 cp-i-sm-50 cp-i-md-33">
            <TextField
              fullWidth
              value={name}
              label="Name"
              variant="outlined"
              onChange={(evt) => setName(evt.target.value)}
            />
          </div>
          <div className="cp-i-100 cp-i-sm-50 cp-i-md-33">
            <TextField
              fullWidth
              value={email}
              label="Email"
              variant="outlined"
              onChange={(evt) => setEmail(evt.target.value)}
            />
          </div>
        </div>
        <FormButtonContainer>
          <Button
            size="large"
            fullWidth
            startIcon={<AiOutlineSave />}
            variant="contained"
            disabled={!name || currentUser.name == name}
            onClick={() => {
              if (!name) return;
              toast.promise(
                updateUser({
                  name,
                  userId: currentUser.id,
                  email,
                }),
                {
                  loading: `Updating settings...`,
                  success: `Settings updated!`,
                  error: (err) => err,
                }
              );
            }}
          >
            Save
          </Button>
        </FormButtonContainer>
        <BackButton src="/" />
      </Wrapper>
    </>
  );
}

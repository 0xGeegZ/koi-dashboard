import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import toast from "react-hot-toast";
import { AiOutlineSave } from "@react-icons/all-files/ai/AiOutlineSave";
import { useUpdateUserMutation } from "../../graphql/updateUser.generated";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import { Title, Wrapper, FormButtonContainer } from "../utils/styledComponents";

type Props = {
  name?: string;
  setName: any;
  currentUser?: any;
};

export default function UserSettings({ name, setName, currentUser }: Props) {
  const [, updateUser] = useUpdateUserMutation();

  return (
    <>
      <Breadcrumbs links={[]} currentBreadcrumbText="Settings" />
      <Wrapper>
        <Title>User settings</Title>
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
      </Wrapper>
    </>
  );
}

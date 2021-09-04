import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import styled from "styled-components";
import toast from "react-hot-toast";
import { AiOutlineSave } from "@react-icons/all-files/ai/AiOutlineSave";
import { useUpdateUserMutation } from "../../client/graphql/updateUser.generated";
import { useGetCurrentUserQuery } from "../../client/graphql/getCurrentUser.generated";
import Breadcrumbs from "../../client/components/Breadcrumbs/Breadcrumbs";
import { Title, Wrapper } from "../../client/components/utils/styledComponents";

const ButtonContainer = styled.div`
  padding: 2rem;
  padding-top: 0;
`;

export default function Dashboard() {
  const [{ data, fetching, error }] = useGetCurrentUserQuery();
  const router = useRouter();
  const [, updateUser] = useUpdateUserMutation();
  const [name, setName] = useState<string>("");
  const currentUser = data?.currentUser;

  // Once we load the current user, default the name input to their name
  useEffect(() => {
    if (currentUser?.name) setName(currentUser.name);
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
      <Breadcrumbs links={[]} currentBreadcrumbText="Settings" />
      <Wrapper>
        <Title>{currentUser.name} Settings</Title>
        <div className="cp-c-row cp-c-wrap cp-c-padding-2 cp-c-lg-padding-3">
          <div className="cp-i-33">
            <TextField
              fullWidth
              value={name}
              label="Name"
              variant="outlined"
              onChange={(evt) => setName(evt.target.value)}
            />
          </div>
        </div>
        <ButtonContainer>
          <Button
            startIcon={<AiOutlineSave />}
            variant="contained"
            disabled={!name}
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
        </ButtonContainer>
      </Wrapper>
    </>
  );
}

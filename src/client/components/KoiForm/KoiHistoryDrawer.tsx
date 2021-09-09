import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import { AiOutlinePlus } from "@react-icons/all-files/ai/AiOutlinePlus";
import { AiOutlineClose } from "@react-icons/all-files/ai/AiOutlineClose";
import { useGetCurrentUserQuery } from "../../../client/graphql/getCurrentUser.generated";
import { useCreateKoiMutation } from "../../../client/graphql/createKoi.generated";
import { useCreateKoiHistoryMutation } from "../../graphql/createKoiHistory.generated";
import {
  Title,
  FormButtonContainer,
  media,
} from "../../../client/components/utils/styledComponents";
import KoiHistoryForm from "../../../client/components/KoiForm/KoiHistoryForm";

const StyledDrawer = styled(Drawer)`
  & .MuiDrawer-paper {
    width: 90%;
  }

  ${media.sm} {
    & .MuiDrawer-paper {
      width: unset;
    }
  }
`;
const StyledTitle = styled(Title)`
  padding: 1rem;

  ${media.lg} {
    padding: 1rem 2rem;
  }
`;
const CloseContainer = styled.div`
  padding: 1rem;
  font-size: 1.5rem;
  color: ${(props) => props.theme.mainColor};

  ${media.lg} {
    padding: 2rem;
    font-size: 2rem;
  }
`;
const StyledFormButtonContainer = styled(FormButtonContainer)`
  position: fixed;
  bottom: 0;
  width: 90%;
  z-index: 1;
`;

export default function KoiHistoryDrawer({
  drawer,
  setDrawer,
  update,
  setUpdate,
}) {
  const router = useRouter();
  const [, createKoiHistory] = useCreateKoiHistoryMutation();

  return (
    <StyledDrawer anchor="right" open={drawer} onClose={() => setDrawer(false)}>
      <div className="cp-c-row cp-c-align-spacebetween-center">
        <StyledTitle>Koi update</StyledTitle>
        <CloseContainer onClick={() => setDrawer(false)}>
          <AiOutlineClose />
        </CloseContainer>
      </div>
      <Divider />
      <KoiHistoryForm update={update} setUpdate={setUpdate} />
      <StyledFormButtonContainer>
        <Button
          fullWidth
          startIcon={<AiOutlinePlus />}
          variant="contained"
          size="large"
          onClick={() => {
            if (!update) return;
            toast
              .promise(createKoiHistory(update), {
                loading: `Creating Koi History...`,
                success: `Koi History created!`,
                error: (err) => err,
              })
              .then(() => {
                setDrawer(false);
              });
          }}
        >
          Create Update
        </Button>
      </StyledFormButtonContainer>
    </StyledDrawer>
  );
}

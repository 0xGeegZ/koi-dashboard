import toast from "react-hot-toast";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import { AiOutlinePlus } from "@react-icons/all-files/ai/AiOutlinePlus";
import { AiOutlineClose } from "@react-icons/all-files/ai/AiOutlineClose";
import { BiPencil } from "@react-icons/all-files/bi/BiPencil";
import { useCreateKoiHistoryMutation } from "../../graphql/createKoiHistory.generated";
import { useUpdateKoiHistoryMutation } from "../../graphql/updateKoiHistory.generated";
import {
  Title,
  FormButtonContainer,
  media,
} from "../../../client/components/utils/styledComponents";
import KoiHistoryForm from "../../../client/components/KoiForm/KoiHistoryForm";

type Props = {
  create?: boolean;
  drawer: any;
  setDrawer: any;
  update: any;
  setUpdate: any;
};

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
  font-size: 1.5rem;

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
    :hover {
      cursor: pointer;
    }
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
  create,
}: Props) {
  const [, createKoiHistory] = useCreateKoiHistoryMutation();
  const [, updateKoiHistory] = useUpdateKoiHistoryMutation();
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
          startIcon={create ? <AiOutlinePlus /> : <BiPencil />}
          variant="contained"
          size="large"
          onClick={() => {
            create
              ? toast
                  .promise(createKoiHistory(update), {
                    loading: `Creating Koi History...`,
                    success: `Koi History created!`,
                    error: (err) => err,
                  })
                  .then(() => {
                    setDrawer(false);
                  })
              : toast
                  .promise(updateKoiHistory(update), {
                    loading: `Updating Koi History...`,
                    success: `Koi History updated!`,
                    error: (err) => err,
                  })
                  .then(() => {
                    setDrawer(false);
                  });
          }}
        >
          {create ? "Create Update" : "Update"}
        </Button>
      </StyledFormButtonContainer>
    </StyledDrawer>
  );
}

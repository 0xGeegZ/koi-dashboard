import { useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { reject } from "lodash";
import { AiOutlinePlus } from "@react-icons/all-files/ai/AiOutlinePlus";
import { AiOutlineDelete } from "@react-icons/all-files/ai/AiOutlineDelete";
import styled from "styled-components";
import { format } from "date-fns";
import { media, Title } from "../utils/styledComponents";
import KoiHistoryDrawer from "./KoiHistoryDrawer";
import { useDeleteKoiHistoryMutation } from "../../graphql/deleteKoiHistory.generated";

type Props = {
  updates: any;
  setUpdates: any;
  koiId: string;
};

const Update = styled.div`
  text-align: center;
  padding: 1rem 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;

  :hover {
    cursor: pointer;
    opacity: 0.8;
    transition: all 0.15s;
  }
`;
const ImageContainer = styled.div`
  padding-right: 1rem;
  position: relative;
  padding-top: 100%;
  width: 100%;

  ${media.md} {
    padding-top: 80%;
  }
`;
const UpdateContainer = styled.div`
  position: relative;
`;
const Delete = styled.div`
  color: ${(props) => props.theme.redColor};
  opacity: 0.8;
  padding: 0.5rem;
  position: absolute;
  right: 1rem;
  top: 0.5rem;
  border-radius: 2px 4px 2px 2px;

  ${media.lg} {
    top: 1rem;
    right: 1rem;
  }

  :hover {
    background: ${(props) => props.theme.redColor};
    color: #fff;
    cursor: pointer;
    opacity: 1;
  }
`;
const DeleteIcon = styled(AiOutlineDelete)`
  margin-right: 0.3rem;
`;

export default function KoiHistoryPreview({
  setUpdates,
  updates,
  koiId,
}: Props) {
  const [, deleteKoiHistory] = useDeleteKoiHistoryMutation();
  const [updateDrawer, setUpdateDrawer] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [update, setUpdate] = useState({
    id: koiId,
    length: 0,
    date: new Date(),
    image: "",
  });
  const [koiHistory, setKoiHistory] = useState({
    id: "",
    length: 0,
    date: "",
    image: "",
  });
  return (
    <>
      <Title>Updates</Title>
      <div className="cp-c-padding-2 cp-c-lg-padding-3 cp-c-row cp-c-wrap">
        {updates &&
          updates.map(({ length, date, image, id }) => (
            <UpdateContainer key={id} className="cp-i-50 cp-i-sm-33 cp-i-lg-25">
              <Update
                onClick={() => {
                  setDrawer(true), setKoiHistory({ id, length, date, image });
                }}
                className="cp-c-column cp-c-align-start-center"
              >
                <ImageContainer className="cp-i-50">
                  {image && (
                    <Image src={image} layout="fill" objectFit="contain" />
                  )}
                </ImageContainer>
                <div>{format(new Date(date), "dd-MM-yyyy")}</div>
                <div>{length} cm</div>
              </Update>
              <Delete
                className="cp-c-row cp-c-align-start-center"
                onClick={() => {
                  toast
                    .promise(deleteKoiHistory({ id }), {
                      loading: `Deleting koi update...`,
                      success: `Update deleted!`,
                      error: (err) => err,
                    })
                    .then(() => {
                      setUpdates(() => reject(updates, { id }));
                    });
                }}
              >
                <DeleteIcon /> Delete
              </Delete>
            </UpdateContainer>
          ))}
        <div className="cp-i-50 cp-i-sm-33 cp-i-lg-25">
          <Update
            onClick={() => setUpdateDrawer(true)}
            className="cp-c-column cp-c-align-center-center"
          >
            <AiOutlinePlus />
            <div>Add update</div>
          </Update>
        </div>
      </div>
      <KoiHistoryDrawer
        create={true}
        drawer={updateDrawer}
        setDrawer={setUpdateDrawer}
        update={update}
        setUpdate={setUpdate}
        setKoiHistory={setUpdates}
      />
      <KoiHistoryDrawer
        create={false}
        drawer={drawer}
        setDrawer={setDrawer}
        update={koiHistory}
        setUpdate={setKoiHistory}
        setKoiHistory={setUpdates}
      />
    </>
  );
}

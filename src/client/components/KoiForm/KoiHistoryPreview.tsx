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
import { useDeleteKoiHistoryMutation } from "../../../client/graphql/deleteKoiHistory.generated";

type Props = {
  updates: any;
  setUpdates: any;
  koiId: string;
};

const Update = styled.div`
  :hover {
    cursor: pointer;
  }
  text-align: center;
  padding: 1rem 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;
const ImageContainer = styled.div`
  padding-right: 1rem;
  position: relative;
  padding-top: 60%;
  width: 100%;
`;
const Delete = styled.div`
  color: ${(props) => props.theme.redColor};

  :hover {
    cursor: pointer;
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
            <div key={id} className="cp-i-50 cp-i-sm-33 cp-i-lg-25">
              <Update
                onClick={() => {
                  setDrawer(true), setKoiHistory({ id, length, date, image });
                }}
                className="cp-c-row cp-c-align-start-start"
              >
                <ImageContainer className="cp-i-50">
                  {image && (
                    <Image src={image} layout="fill" objectFit="contain" />
                  )}
                </ImageContainer>
                <div className="cp-c-column cp-c-align-start-start">
                  <div>{format(new Date(date), "dd-MM-yyyy")}</div>
                  <div>{length} cm</div>
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
                </div>
              </Update>
            </div>
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
      />
    </>
  );
}

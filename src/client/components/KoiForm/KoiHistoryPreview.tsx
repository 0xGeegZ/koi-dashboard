import { useState } from "react";
import Image from "next/image";
import { AiOutlinePlus } from "@react-icons/all-files/ai/AiOutlinePlus";
import styled from "styled-components";
import { format } from "date-fns";
import { media, Title } from "../utils/styledComponents";
import KoiHistoryDrawer from "./KoiHistoryDrawer";

type Props = {
  updates?: any;
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

export default function KoiHistoryPreview({ updates, koiId }: Props) {
  const [drawer, setDrawer] = useState(false);
  const [update, setUpdate] = useState({
    id: koiId,
    length: 0,
    date: new Date(),
    image: "",
  });

  return (
    <>
      <Title>Updates</Title>
      <div className="cp-c-padding-2 cp-c-lg-padding-3 cp-c-row cp-c-wrap">
        {updates &&
          updates.map(({ length, date, image }, index) => (
            <div key={index} className="cp-i-50 cp-i-sm-33 cp-i-lg-25">
              <Update
                onClick={() => setDrawer(true)}
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
                </div>
              </Update>
            </div>
          ))}
        <div className="cp-i-50 cp-i-sm-33 cp-i-lg-25">
          <Update
            onClick={() => setDrawer(true)}
            className="cp-c-column cp-c-align-center-center"
          >
            <AiOutlinePlus />
            <div>Add update</div>
          </Update>
        </div>
      </div>
      <KoiHistoryDrawer
        drawer={drawer}
        setDrawer={setDrawer}
        update={update}
        setUpdate={setUpdate}
      />
    </>
  );
}

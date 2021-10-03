// @ts-nocheck
import React, { useState } from "react";
import styled from "styled-components";
import { orderBy } from "lodash";
import Image from "next/image";
import Link from "next/link";
import { Line } from "react-chartjs-2";
import Lightbox from "react-image-lightbox";
import { Card, SubTitle, media } from "../../components/utils/styledComponents";
import { getAgeDifferenceDate } from "../../components/utils/ageCalculator";
import EvolutionCard from "../../components/KoiPage/EvolutionCard";

import "react-image-lightbox/style.css";

export const CardContainer = styled.div`
  margin-top: 1rem;
  padding: 0 1rem;

  ${media.md} {
    margin-top: 0;
    padding: 0 1rem;
  }
  ${media.lg} {
    padding: 0 2rem;
  } ;
`;
export const ImageContainer = styled.div`
  position: relative;
  padding-top: 160%;

  :hover {
    cursor: pointer;
  }
`;
export const StyledCard = styled(Card)`
  padding: 0;
`;

const IframeContainer = styled.div`
  position: relative;
  overflow: hidden;
  padding-top: 56.25%;
  border-radius: 20px;
`;
const StyledReactPlayer = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  border: 0;
  border-radius: 10px;
`;
const ImagesContainer = styled.div`
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
`;

const Overlay = styled.div`
  position: absolute;
  top: -0.5rem;
  right: -0.5rem;
  bottom: -0.25rem;
  left: -0.5rem;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.5) 0%,
    rgba(0, 0, 0, 0.2) 100%
  );
  border-radius: 20px 20px 0 0;
  text-align: center;
  border-radius: 20px;

  :hover {
    cursor: pointer;
  }
`;
const OverlayImages = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.4) 0%,
    rgba(0, 0, 0, 0.1) 100%
  );
  border-radius: 20px 20px 0 0;
  text-align: center;
  border-radius: 20px;
`;
const OverlayText = styled.div`
  z-index: 1;
  position: absolute;
  transform: translateY(-50%);
  top: 50%;
  font-size: 1.3rem;
  color: #fff;
  width: 100%;
  text-align: center;
  text-shadow: 1px 1px rgba(0, 0, 0, 0.3);
`;
const EmptyEvolution = styled.div`
  position: relative;

  :hover {
    cursor: pointer;
  }
`;

const mockUpdates = [
  {
    length: 55,
    date: "2019-11-30T23:00:00.000Z",
    image:
      "http://res.cloudinary.com/djapnmv8y/image/upload/v1632843635/koi/qmurpuy66f6tgdpgo8pa.png",
  },
  {
    length: 59,
    date: "2020-01-31T23:00:00.000Z",
    image:
      "http://res.cloudinary.com/djapnmv8y/image/upload/v1632843653/koi/onqnapae4lingkqxszaf.png",
  },
  {
    length: 65,
    date: "2020-09-30T22:00:00.000Z",
    image:
      "http://res.cloudinary.com/djapnmv8y/image/upload/v1632843678/koi/t8ilczinc9siw0ghxyef.png",
  },
];
const options = {
  aspectRatio: 1.82,
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      grid: {
        display: false,
      },
    },
  },
};
const getImages = (koi) => {
  let images = [];
  orderBy(koi.updates, ["date"]).map(
    ({ image }) => (images = [...images, image])
  );
  return images;
};

const Evolution = ({ koi }) => {
  const [visible, setVisible] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const getData = (koi) => {
    let data = [];
    orderBy(koi.updates, ["date"]).map(
      ({ date, length }) =>
        (data = [
          ...data,
          {
            x: `${getAgeDifferenceDate(koi.birthDate, date)} months`,
            y: length,
          },
        ])
    );
    return data;
  };
  const data = {
    datasets: [
      {
        label: "Size Evolution (cm)",
        data: getData(koi),
        borderColor: "#3A3878",
        backgroundColor: "#3A3878",
        tension: 0.4,
      },
    ],
  };
  const images = getImages(koi);

  return (
    <>
      <CardContainer>
        <Card>
          <SubTitle>Koi evolution</SubTitle>
          <ImagesContainer>
            <div className="cp-c-row cp-c-align-start-start cp-c-md-align-center-center">
              {koi.updates.length > 0 ? (
                orderBy(koi.updates, ["date"]).map((update, index) => (
                  <EvolutionCard
                    birthdate={koi.birthdate}
                    update={update}
                    index={index}
                    setPhotoIndex={setPhotoIndex}
                    setVisible={setVisible}
                  />
                ))
              ) : (
                <Link href={`/koi/${koi.id}/edit`}>
                  <EmptyEvolution>
                    {mockUpdates.map((update, index) => (
                      <EvolutionCard
                        birthdate="2018-06-30T22:00:00.000Z"
                        update={update}
                        index={index}
                        setPhotoIndex={setPhotoIndex}
                        setVisible={setVisible}
                      />
                    ))}
                    <OverlayImages />
                    <OverlayText>Add updates</OverlayText>
                  </EmptyEvolution>
                </Link>
              )}
            </div>
          </ImagesContainer>
        </Card>
      </CardContainer>
      <div className="cp-c-row cp-c-padding-2 cp-c-lg-padding-3 cp-c-wrap">
        <div className="cp-i-100 cp-i-lg-50">
          <StyledCard>
            {koi.youtube ? (
              <IframeContainer>
                <StyledReactPlayer
                  width="100%"
                  height="100%"
                  src={koi.youtube}
                  frameBorder="0"
                />
              </IframeContainer>
            ) : (
              <Link href={`/koi/${koi.id}/edit`}>
                <IframeContainer>
                  <Image
                    src={`https://img.youtube.com/vi/-jLE0X1iB04/0.jpg`}
                    layout="fill"
                    objectFit="cover"
                    alt="thekoicompany logo"
                    priority
                  />
                  <Overlay />
                  <OverlayText>Add video</OverlayText>
                </IframeContainer>
              </Link>
            )}
          </StyledCard>
        </div>
        <div className="cp-i-100 cp-i-lg-50">
          <Card>
            {/* <SubTitle>Size evolution</SubTitle> */}
            <Line data={data} options={options} />
          </Card>
        </div>
      </div>

      {visible && (
        <Lightbox
          reactModalStyle={customStyles}
          mainSrc={images[photoIndex]}
          nextSrc={images[(photoIndex + 1) % images.length]}
          prevSrc={images[(photoIndex + images.length - 1) % images.length]}
          onCloseRequest={() => setVisible(false)}
          onMovePrevRequest={() =>
            setPhotoIndex((photoIndex + images.length - 1) % images.length)
          }
          onMoveNextRequest={() =>
            setPhotoIndex((photoIndex + 1) % images.length)
          }
        />
      )}
    </>
  );
};

export default Evolution;

const customStyles = {
  overlay: {
    zIndex: "2000",
  },
};

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
  padding: 1rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.5);
  text-align: center;
  border-radius: 10px;
`;
const OverlayText = styled.div`
  z-index: 1;
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
const EmptyIframeContainer = styled(IframeContainer)`
  :hover {
    cursor: pointer;
  }
`;

const mockUpdates = [
  {
    length: 55,
    date: "2019-11-30T23:00:00.000Z",
    image:
      "https://res.cloudinary.com/djapnmv8y/image/upload/v1633336739/koi/showablur_alhjww.png",
  },
  {
    length: 59,
    date: "2020-01-31T23:00:00.000Z",
    image:
      "https://res.cloudinary.com/djapnmv8y/image/upload/v1633336916/koi/showa2blur_tabdxq.png",
  },
  {
    length: 65,
    date: "2020-09-30T22:00:00.000Z",
    image:
      "https://res.cloudinary.com/djapnmv8y/image/upload/v1633336992/koi/showa3blur_czifhh.png",
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

const getYoutubeId = (url) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
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
                    key={index}
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
                        key={index}
                        birthdate="2018-06-30T22:00:00.000Z"
                        update={update}
                        index={index}
                        setPhotoIndex={setPhotoIndex}
                        setVisible={setVisible}
                      />
                    ))}
                    <Overlay>
                      <OverlayText>Add updates</OverlayText>
                    </Overlay>
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
                  src={
                    koi.youtube.includes("embed")
                      ? koi.youtube
                      : `//www.youtube.com/embed/${getYoutubeId(
                          koi.youtube
                        )}?autoplay=1`
                  }
                  frameBorder="0"
                />
              </IframeContainer>
            ) : (
              <Link href={`/koi/${koi.id}/edit`}>
                <EmptyIframeContainer>
                  <Image
                    src="https://img.youtube.com/vi/3NSQQDIgJ7s/0.jpg"
                    layout="fill"
                    objectFit="cover"
                    alt="thekoicompany logo"
                    priority
                  />
                  <Overlay>
                    <OverlayText>Add video</OverlayText>
                  </Overlay>
                </EmptyIframeContainer>
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

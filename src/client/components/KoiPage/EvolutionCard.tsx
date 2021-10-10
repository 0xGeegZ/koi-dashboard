// @ts-nocheck
import styled from "styled-components";
import { media } from "../utils/styledComponents";
import Image from "next/image";
import { getFormattedDate, getAgeDifferenceText } from "../utils/ageCalculator";
export const ImageContainer = styled.div`
  position: relative;
  padding-top: 160%;

  :hover {
    cursor: pointer;
  }
`;

const CardStyle = styled.div`
  display: inline-block !important;
  min-width: 150px;
  margin-top: 1rem;
  margin-bottom: 1rem;

  ${media.lg} {
    margin-top: 0rem;
  }
  ${media.xxl} {
    max-width: 10% !important;
  }
`;
const Date = styled.div`
  padding-top: 0.5rem;
  padding-bottom: 0.3rem;
  font-size: 0.8rem;
  text-align: center;
  font-weight: 300;
  color: ${(props) => (props.blur ? "transparent" : props.theme.textColor)};
  text-shadow: ${(props) => props.blur && "0 0 5px rgba(0, 0, 0, 0.6)"};
`;
const Size = styled.div`
  font-size: 1.3rem;
  text-align: center;
  font-weight: 600;
  padding-right: 0.4rem;

  color: ${(props) => (props.blur ? "transparent" : props.theme.mainColor)};
  text-shadow: ${(props) => props.blur && "0 0 5px rgba(12, 65, 132, 0.6)"};
`;
const Age = styled.div`
  font-size: 1.3rem;
  text-align: center;

  color: ${(props) => (props.blur ? "transparent" : props.theme.mainColor)};
  text-shadow: ${(props) => props.blur && "0 0 5px rgba(12, 65, 132, 0.6)"};
`;

const EvolutionCard = ({
  setPhotoIndex,
  setVisible,
  birthdate,
  index,
  update,
  blur,
}) => {
  return (
    <CardStyle
      className="cp-i-33 cp-i-md-25 cp-i-lg-20 cp-i-xl-15"
      onClick={() => setPhotoIndex(index)}
    >
      <div onClick={() => setVisible(true)}>
        <ImageContainer>
          <Image
            src={
              update.image
                ? update.image
                : "https://res.cloudinary.com/djapnmv8y/image/upload/v1633336739/koi/showablur_alhjww.png"
            }
            layout="fill"
            objectFit="contain"
            priority
          />
        </ImageContainer>
        <Date blur={blur}>{getFormattedDate(update.date)}</Date>
        <div className="cp-c-row cp-c-align-center-center">
          <Size blur={blur}>{update.length}cm</Size>
          <Age blur={blur}>{getAgeDifferenceText(birthdate, update.date)}</Age>
        </div>
      </div>
    </CardStyle>
  );
};

export default EvolutionCard;

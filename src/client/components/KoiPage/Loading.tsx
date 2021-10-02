// @ts-nocheck
import React from "react";
import styled from "styled-components";
import { Skeleton } from "@mui/material";
import { Line } from "react-chartjs-2";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import { Card, SubTitle, media, Title } from "../utils/styledComponents";
import { StyledCard } from "./Evolution";

const StyledSkeleton = styled(Skeleton)`
  transform: scale(1, 1);
  border-radius: 20px;
`;
const StyledCardTop = styled(Card)`
  margin-top: 1rem;

  ${media.lg} {
    margin-top: 1.5rem;
  }
`;

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

const SkeletonTextDate = styled.div`
  margin-top: 0.5rem;
  margin-bottom: 0.3rem;
  height: 1rem;
`;

const SkeletonTextSize = styled.div`
  height: 1.5rem;
`;
const Container = styled.div`
  margin-right: 1rem;
`;
const VideoSize = styled.div`
  padding-top: 56.25%;
`;

const data = {
  datasets: [
    {
      label: "Size Evolution (cm)",
      data: [],
      borderColor: "#3A3878",
      backgroundColor: "#3A3878",
      tension: 0.4,
    },
  ],
};

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

const Loading = () => {
  return (
    <>
      <Breadcrumbs
        links={[{ to: `/koi`, text: "All your koi" }]}
        currentBreadcrumbText=""
      />
      <Title>
        <StyledSkeleton width="300px" />

        <StyledCardTop>
          <SubTitle>Picture evolution</SubTitle>
          <div className="cp-c-row cp-c-align-start-start cp-c-md-align-center-center">
            {new Array(2).fill("a").map((index) => (
              <Container
                key={index}
                className="cp-i-33 cp-i-md-25 cp-i-lg-20 cp-i-xl-15"
              >
                <StyledSkeleton width="100%">
                  <ImageContainer />
                </StyledSkeleton>
                <StyledSkeleton width="100%">
                  <SkeletonTextDate />
                </StyledSkeleton>
                <StyledSkeleton width="100%">
                  <SkeletonTextSize />
                </StyledSkeleton>
              </Container>
            ))}
          </div>
        </StyledCardTop>
      </Title>

      <div className="cp-c-row cp-c-padding-2 cp-c-lg-padding-3 cp-c-wrap">
        <div className="cp-i-100 cp-i-md-50">
          <StyledCard>
            <VideoSize />
          </StyledCard>
        </div>
        <div className="cp-i-100 cp-i-md-50">
          <Card>
            <Line data={data} options={options} />
          </Card>
        </div>
      </div>
    </>
  );
};

export default Loading;

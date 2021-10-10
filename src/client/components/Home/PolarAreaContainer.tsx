// @ts-nocheck

import { PolarArea } from "react-chartjs-2";
import filter from "lodash/filter";
import styled from "styled-components";
import { Card, SubTitle } from "../utils/styledComponents";
import { varietiesColor } from "../utils/KoiFromData";

const StyledSubTitle = styled(SubTitle)`
  padding-bottom: 2rem;
`;
const Color = styled.div`
  width: 3rem;
  height: 1.5rem;
  background: ${(props) => props.background};
  margin-right: 1rem;
  border-radius: 4px;
`;
const Bold = styled.span`
  font-weight: 600;
  padding: 0 0.3rem;
`;

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
};

const hexToRgbA = (hex) => {
  let c;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split("");
    if (c.length == 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = "0x" + c.join("");
    return (
      "rgba(" + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",") + ",0.45)"
    );
  }
};

const getColors = (varieties) => {
  let colors = [];
  varieties.map((variety) => {
    const colorObject = filter(varietiesColor, ["title", variety]);
    if (colorObject.length > 0) {
      colors = [...colors, hexToRgbA(colorObject[0].color)];
    }
  });

  return colors;
};

const getTotalLength = (kois) => {
  let totalLength = 0;
  kois.map(({ updates }) => {
    if (updates[updates.length - 1]) {
      totalLength = totalLength + updates[updates.length - 1].length;
    }
  });
  return totalLength;
};

const getCountByVariety = (kois) => {
  const counts = {};
  const sampleArray = kois.map(({ variety }) => variety);
  sampleArray.forEach(function (x) {
    counts[x] = (counts[x] || 0) + 1;
  });
  return counts;
};

const PolarAreaContainer = ({ kois }) => {
  const sortedList = Object.fromEntries(
    Object.entries(getCountByVariety(kois)).sort(([, b], [, a]) => a - b)
  );
  const varietiesList = Object.keys(sortedList);
  const varietiesCount = Object.values(sortedList);
  const colorList = getColors(varietiesList);
  const data = {
    labels: varietiesList,
    datasets: [
      {
        data: varietiesCount,
        backgroundColor: colorList,
        borderWidth: 0,
      },
    ],
  };
  return (
    <Card>
      <StyledSubTitle>
        You have a total of <b>{kois.length} koi</b>, with an average of size of{" "}
        <b>{getTotalLength(kois) / kois.length}cm</b> and a total of{" "}
        <b>{getTotalLength(kois)}cm</b>
      </StyledSubTitle>
      <div className="cp-c-row cp-c-align-start-start cp-c-wrap">
        <div className="cp-i-100 cp-i-md-50 cp-i-lg-35">
          <PolarArea data={data} options={options} />
        </div>
        <div className="cp-c-padding-2 cp-c-lg-padding-3">
          {varietiesList.map((variety, index) => (
            <div className="cp-c-row cp-c-align-start-center " key={variety}>
              <Color background={colorList[index]} />
              <div>
                {varietiesCount[index]} {variety}, with an average of size of{" "}
                <Bold>
                  {getTotalLength(filter(kois, { variety })) /
                    filter(kois, { variety }).length}
                  cm
                </Bold>{" "}
                and a total of{"  "}
                <Bold>{getTotalLength(filter(kois, { variety }))}cm</Bold>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default PolarAreaContainer;

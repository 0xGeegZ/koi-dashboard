import Link from "next/link";
import styled from "styled-components";
import Breadcrumbs from "../../client/components/Breadcrumbs/Breadcrumbs";
import {
  SubTitle,
  Title,
  Card,
} from "../../client/components/utils/styledComponents";
import { getValuesTable } from "../../client/components/utils/pondUtils";

const Row = styled.div`
  font-size: 0.8rem;
  text-align: center;
  border-bottom: 1px solid #e9e9e9;

  :last-child {
    border-bottom: 0;
  }
`;
const Header = styled.div`
  padding-bottom: 0.5rem;
  font-weight: 600;
  text-align: center;
`;
const Value = styled.div`
  background: ${(props) => props.background};
  padding: 0.3rem;
`;
const Label = styled.div`
  padding: 0.3rem;
  font-weight: 600;
`;

const Hannahpocket = () => {
  return (
    <section>
      <Breadcrumbs
        links={[{ to: `/pond`, text: "Pond" }]}
        currentBreadcrumbText="Hannah-pocket"
      />
      <Title>Hannah pocket information</Title>
      <div className="cp-c-padding-2 cp-c-lg-padding-3 cp-c-row cp-c-wrap">
        <div className="cp-i-100 cp-i-md-50 cp-i-lg-33">
          <Card>
            <SubTitle>Nitriet/NO2</SubTitle>
            <div>
              <Header className="cp-c-row">
                <div className="cp-i-50">Value</div>
                <div className="cp-i-50">mg/ltr</div>
              </Header>
              {getValuesTable(5, 20, 0.0166666).map(({ label, value }) => (
                <Row key={label} className="cp-c-row">
                  <Label className="cp-i-50">{label}</Label>
                  <Value
                    className="cp-i-50"
                    background={
                      value < 0.1
                        ? "#a5d6a7"
                        : value < 0.2
                        ? "#fff176"
                        : "#ef5350db"
                    }
                  >
                    {value.toFixed(3)}
                  </Value>
                </Row>
              ))}
            </div>
          </Card>
        </div>
        <div className="cp-i-100 cp-i-md-50 cp-i-lg-33">
          <Card>
            <SubTitle>Ammonia</SubTitle>
            <Header className="cp-c-row">
              <div className="cp-i-50">Value</div>
              <div className="cp-i-50">mg/ltr</div>
            </Header>
            {getValuesTable(0.01, 20, 0.012).map(({ label, value }) => (
              <Row key={label} className="cp-c-row">
                <Label className="cp-i-50">{label}</Label>
                <Value
                  background={
                    value < 0.1
                      ? "#a5d6a7"
                      : value < 0.2
                      ? "#fff176"
                      : "#ef5350db"
                  }
                  className="cp-i-50"
                >
                  {value.toFixed(3)}
                </Value>
              </Row>
            ))}
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Hannahpocket;

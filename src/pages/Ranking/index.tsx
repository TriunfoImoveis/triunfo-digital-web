import React from 'react';
import Header from '../../components/Header';

import { BackgroundImage } from '../../assets/images';
import Crown from '../../assets/images/coroa.svg';

import {
  Container,
  Content,
  Title,
  RankingContainer,
  LabelContainer,
  PodiumContainer,
  PositionItem,
  Position,
  Realtor,
  LabelItems,
  RealtorContainer,
  Separator,
} from './styles';

const Ranking: React.FC = () => {
  return (
    <Container>
      <Header />
      <BackgroundImage />
      <Content>
        <Title>Top Five</Title>
        <RankingContainer>
          <LabelContainer>
            <div />
            <LabelItems>
              <img src={Crown} alt="Campeão" />
              <span className="nameTitle">Nome</span>
              <span className="vgvTitle">VGV</span>
            </LabelItems>
          </LabelContainer>
          <PodiumContainer>
            <PositionItem>
              <Position>1°</Position>
              <Realtor>
                <img
                  src="https://www.triunfoimoveis.com/wp-content/uploads/2017/07/AdobePhotoshopExpress_2019-04-01_10-57-40-0300-1-768x768.jpg"
                  alt="Rafael Serejo"
                />
                <span>Rafael Serejo</span>
                <strong className="first">R$ 10.000.000,00</strong>
              </Realtor>
            </PositionItem>
            <PositionItem>
              <Position>2°</Position>
              <Realtor>
                <img
                  src="https://www.triunfoimoveis.com/wp-content/uploads/2017/07/AdobePhotoshopExpress_2019-04-01_10-57-40-0300-1-768x768.jpg"
                  alt="Rafael Serejo"
                />
                <span>Rafael Serejo</span>
                <strong className="second">R$ 10.000.000,00</strong>
              </Realtor>
            </PositionItem>
            <PositionItem>
              <Position>3°</Position>
              <Realtor>
                <img
                  src="https://www.triunfoimoveis.com/wp-content/uploads/2017/07/AdobePhotoshopExpress_2019-04-01_10-57-40-0300-1-768x768.jpg"
                  alt="Rafael Serejo"
                />
                <span>Rafael Serejo</span>
                <strong className="third">R$ 10.000.000,00</strong>
              </Realtor>
            </PositionItem>
            <PositionItem>
              <Position>4°</Position>
              <Realtor>
                <img
                  src="https://www.triunfoimoveis.com/wp-content/uploads/2017/07/AdobePhotoshopExpress_2019-04-01_10-57-40-0300-1-768x768.jpg"
                  alt="Rafael Serejo"
                />
                <span>Rafael Serejo</span>
                <strong className="four">R$ 10.000.000,00</strong>
              </Realtor>
            </PositionItem>
            <PositionItem>
              <Position>5°</Position>
              <Realtor>
                <img
                  src="https://www.triunfoimoveis.com/wp-content/uploads/2017/07/AdobePhotoshopExpress_2019-04-01_10-57-40-0300-1-768x768.jpg"
                  alt="Rafael Serejo"
                />
                <span>Rafael Serejo</span>
                <strong className="five">R$ 10.000.000,00</strong>
              </Realtor>
            </PositionItem>
          </PodiumContainer>
          <Separator />
          <RealtorContainer>
            <PositionItem>
              <Position>6°</Position>
              <Realtor>
                <img
                  src="https://www.triunfoimoveis.com/wp-content/uploads/2017/07/AdobePhotoshopExpress_2019-04-01_10-57-40-0300-1-768x768.jpg"
                  alt="Rafael Serejo"
                />
                <span>Rafael Serejo</span>
                <strong>R$ 10.000.000,00</strong>
              </Realtor>
            </PositionItem>
            <PositionItem>
              <Position>7°</Position>
              <Realtor>
                <img
                  src="https://www.triunfoimoveis.com/wp-content/uploads/2017/07/AdobePhotoshopExpress_2019-04-01_10-57-40-0300-1-768x768.jpg"
                  alt="Rafael Serejo"
                />
                <span>Rafael Serejo</span>
                <strong>R$ 10.000.000,00</strong>
              </Realtor>
            </PositionItem>
            <PositionItem>
              <Position>8°</Position>
              <Realtor>
                <img
                  src="https://www.triunfoimoveis.com/wp-content/uploads/2017/07/AdobePhotoshopExpress_2019-04-01_10-57-40-0300-1-768x768.jpg"
                  alt="Rafael Serejo"
                />
                <span>Rafael Serejo</span>
                <strong>R$ 10.000.000,00</strong>
              </Realtor>
            </PositionItem>
            <PositionItem>
              <Position>9°</Position>
              <Realtor>
                <img
                  src="https://www.triunfoimoveis.com/wp-content/uploads/2017/07/AdobePhotoshopExpress_2019-04-01_10-57-40-0300-1-768x768.jpg"
                  alt="Rafael Serejo"
                />
                <span>Rafael Serejo</span>
                <strong>R$ 10.000.000,00</strong>
              </Realtor>
            </PositionItem>
            <PositionItem>
              <Position>10°</Position>
              <Realtor>
                <img
                  src="https://www.triunfoimoveis.com/wp-content/uploads/2017/07/AdobePhotoshopExpress_2019-04-01_10-57-40-0300-1-768x768.jpg"
                  alt="Rafael Serejo"
                />
                <span>Rafael Serejo</span>
                <strong>R$ 10.000.000,00</strong>
              </Realtor>
            </PositionItem>
          </RealtorContainer>
        </RankingContainer>
      </Content>
    </Container>
  );
};

export default Ranking;

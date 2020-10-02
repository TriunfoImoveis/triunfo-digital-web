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
  Name,
  VGV,
} from './styles';

const Ranking: React.FC = () => {
  const realtors = [
    {
      position: '1',
      avatar:
        'https://www.triunfoimoveis.com/wp-content/uploads/2017/07/AdobePhotoshopExpress_2019-04-01_10-57-40-0300-1-768x768.jpg',
      name: 'Rafael Serejo',
      vgv: 'R$ 12.000.000,00',
    },
    {
      position: '2',
      avatar:
        'https://www.triunfoimoveis.com/wp-content/uploads/2017/07/IMG_3795-768x768.jpg',
      name: 'Maíra Santos',
      vgv: 'R$ 10.000.000,00',
    },
    {
      position: '3',
      avatar:
        'https://www.triunfoimoveis.com/wp-content/uploads/2017/07/ALBERTO-MADEIRA-TRIUNFO-IMOVEIS-640x640.jpg',
      name: 'Alberto Madeira',
      vgv: 'R$ 8.000.000,00',
    },
    {
      position: '4',
      avatar:
        'https://www.triunfoimoveis.com/wp-content/uploads/2017/07/AF96DA68-47F7-4E2C-8055-43F200CFD250-768x768.jpg',
      name: 'Robson Fernandes',
      vgv: 'R$ 5.000.000,00',
    },
    {
      position: '5',
      avatar:
        'https://www.triunfoimoveis.com/wp-content/uploads/2017/07/IMG_2569-768x768.jpg',
      name: 'José Rocha',
      vgv: 'R$ 4.000.000,00',
    },
    {
      position: '6',
      avatar:
        'https://www.triunfoimoveis.com/wp-content/uploads/2018/01/WhatsApp-Image-2019-02-25-at-15.46.32.jpeg',
      name: 'Rosana Porto',
      vgv: 'R$ 3.000.000,00',
    },
  ];
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
            {realtors.map((realtor, i) => {
              return i <= 4 ? (
                <PositionItem key={realtor.position}>
                  <Position>{`${realtor.position}°`}</Position>
                  <Realtor>
                    <img src={realtor.avatar} alt={realtor.name} />
                    <Name>
                      <span>{realtor.name}</span>
                    </Name>
                    <VGV position={realtor.position}>
                      <strong>{realtor.vgv}</strong>
                    </VGV>
                  </Realtor>
                </PositionItem>
              ) : null;
            })}
          </PodiumContainer>
          <Separator />
          <RealtorContainer>
            {realtors.map((realtor, i) => {
              return i >= 5 ? (
                <PositionItem key={realtor.position}>
                  <Position>{`${realtor.position}°`}</Position>
                  <Realtor>
                    <img src={realtor.avatar} alt={realtor.name} />
                    <Name>
                      <span>{realtor.name}</span>
                    </Name>
                    <VGV position={realtor.position}>
                      <strong>{realtor.vgv}</strong>
                    </VGV>
                  </Realtor>
                </PositionItem>
              ) : null;
            })}
          </RealtorContainer>
        </RankingContainer>
      </Content>
    </Container>
  );
};

export default Ranking;

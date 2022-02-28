import React from 'react';
import {
  RankingContainer,
  LabelContainer,
  LabelItems,
  PodiumContainer,
  PositionItem,
  Position,
  Realtor,
  Name,
  VGV
} from './styles';

interface IRealtorData {
  id: string;
  avatar_url: string;
  name: string;
  vgv: string;
}


interface IRankingProps {
  data: IRealtorData[];
}
const Ranking: React.FC<IRankingProps> = ({ data }) => {
  return (
    <RankingContainer>
      <LabelContainer>
        <div />
        <LabelItems>
          <span className="nameTitle">Nome</span>
          <span className="vgvTitle">VGV</span>
        </LabelItems>
      </LabelContainer>
      <PodiumContainer>
        {data.map((realtor, index) => (
          <PositionItem key={realtor.id}>
            <Position>{`${index + 1}°`}</Position>
            <Realtor>
              <img
                src={realtor.avatar_url || 'https://imgur.com/I80W1Q0.png'
                }
                alt={realtor.name || "Corretor"}
              />
              <Name>
                <span>{realtor.name}</span>
              </Name>
              <VGV position={String(index + 1)}>
                <strong>{realtor.vgv}</strong>
              </VGV>
            </Realtor>
          </PositionItem>
        ))}
      </PodiumContainer>
    </RankingContainer>
  );
}

export default Ranking;
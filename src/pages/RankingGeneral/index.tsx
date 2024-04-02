import React, { useState, ChangeEvent, useMemo } from 'react';
import Loader from 'react-loader-spinner';
import { months } from '../../utils/months';
import { optionYear } from '../../utils/loadOptions';
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
  LoadingContainer,
  SelectSubsidiary,
  Filters,
  Bar,
  MonthlyFilter,
} from './styles';
import { formatPrice } from '../../utils/format';
import { useFetch } from '../../hooks/useFetch';

interface IRealtorData {
  id: string;
  avatar_url: string;
  name: string;
  vgv: string;
}

interface IParams {
  year: string;
  office: 'Corretor' | 'Coordenador';
  month: string;
  typeRanking: 'sales' | 'captivator' | 'coordinator'
}

const RankingGeneral: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [params, setParams] = useState<IParams>({
    month: '',
    year: currentYear.toString(),
    office: 'Corretor',
    typeRanking: 'sales'

  });
  const [selectedYear, setSelectedYear] = useState(currentYear.toString());
  const [selectedMonth, setSelectedMonth] = useState('');
  const { data: realtors } = useFetch<IRealtorData[]>('/ranking', params);
  const optionsYear = optionYear.filter(year => year.value <= currentYear);
  const ranking = useMemo(() => {
    return realtors?.map(r => ({
      id: r.id,
      avatar_url: r.avatar_url,
      name: r.name,
      vgv: formatPrice(Number(r.vgv)),
    }));
  }, [realtors]);


  const handleSelectMonth =  (event: ChangeEvent<HTMLSelectElement>) => {
    if (Number(event.target.value) > 0) {
      const month = Number(event.target.value);
      setSelectedMonth(month.toString());
      setParams(prevState => ({ ...prevState, month: month.toString() }));
    } else {
      setSelectedMonth('');
      setParams(prevState => ({ ...prevState, month: '' }));
    }
  }

  const heandleSelectedYear = (event: ChangeEvent<HTMLSelectElement>) => {
    const year = event.target.value;
    setSelectedYear(year.toString());
    setParams(prevState => ({ ...prevState, year: year.toString() }));
  }

  return (
    <Container>
      <Header />
      <BackgroundImage />
      <Content>
        <Title>Top Five</Title>
        <Filters>
          <>
            <SelectSubsidiary>
              <select
                defaultValue={selectedYear}
                onChange={heandleSelectedYear}
              >
                <option value=''>Todos os anos</option>
                {optionsYear.map(item => (
                  <option value={item.value.toString()}>{item.label}</option>
                ))}
              </select>
            </SelectSubsidiary>
            <MonthlyFilter>
              <SelectSubsidiary>
                <select defaultValue={selectedMonth} onChange={handleSelectMonth}>
                  <option value=''>ANUAL</option>
                  <optgroup label="MESES">
                    {months.map(month => (
                      <option value={month.value.toString()}>{month.label}</option>
                    ))}
                  </optgroup>
                </select>
              </SelectSubsidiary>
            </MonthlyFilter>
          </>
        </Filters>

        <RankingContainer>
          <Bar />
          <LabelContainer>
            <div />
            <LabelItems>
              <img src={Crown} alt="Campeão" />
              <span className="nameTitle">Nome</span>
              <span className="vgvTitle">VGV</span>
            </LabelItems>
          </LabelContainer>
          {!ranking ? (
            <LoadingContainer>
              <Loader type="Bars" color="#c32925" height={100} width={100} />
            </LoadingContainer>
          ) : (
            <>
              <PodiumContainer>
                {ranking.map((realtor, i) => {
                  return i <= 4 ? (
                    <PositionItem key={realtor.id}>
                      <Position>{`${i + 1}°`}</Position>
                      <Realtor>
                        <img
                          src={
                            realtor.avatar_url ||
                            'https://imgur.com/I80W1Q0.png'
                          }
                          alt={realtor.name}
                        />
                        <Name>
                          <span>{realtor.name}</span>
                        </Name>
                        <VGV position={String(i + 1)}>
                          <strong>{realtor.vgv}</strong>
                        </VGV>
                      </Realtor>
                    </PositionItem>
                  ) : null;
                })}
              </PodiumContainer>
              <Separator />
              <RealtorContainer>
                {ranking?.map((realtor, i) => {
                  return i >= 5 ? (
                    <PositionItem key={realtor.id}>
                      <Position>{`${i + 1}°`}</Position>
                      <Realtor>
                        <img
                          src={
                            realtor.avatar_url ||
                            'https://imgur.com/I80W1Q0.png'
                          }
                          alt={realtor.name}
                        />
                        <Name>
                          <span>{realtor.name}</span>
                        </Name>
                        <VGV position={String(i + 1)}>
                          <strong>{realtor.vgv}</strong>
                        </VGV>
                      </Realtor>
                    </PositionItem>
                  ) : null;
                })}
              </RealtorContainer>
            </>
          )}
        </RankingContainer>
      </Content>
    </Container>
  );
};

export default RankingGeneral;

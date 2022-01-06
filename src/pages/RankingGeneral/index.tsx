import React, {useMemo, useState, useEffect, useCallback, ChangeEvent} from 'react';
import Loader from 'react-loader-spinner';
import Header from '../../components/Header';

import { BackgroundImage } from '../../assets/images';
import Crown from '../../assets/images/coroa.svg';
import { months } from '../../utils/months';
import { optionYear } from '../../utils/loadOptions';


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
  Bar,
  Filters,
  MonthlyFilter,
  SelectSubsidiary
} from './styles';
import { formatPrice } from '../../utils/format';
import { useFetch } from '../../hooks/useFetch';

interface IRealtorData {
  id: string;
  avatar_url: string;
  name: string;
  vgv: string;
}

const RankingGeneral: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [realtors, setRealtors] = useState<IRealtorData[]>([]);
  const [selectedMonth, setSelectedMonth] = useState('0');
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const [urlSLZ, setUrlSLZ] = useState(`/ranking?city=${`São Luís`}&year=${selectedYear}&user=Corretor`);
  const [urlFTZ, setUrlFTZ] = useState(`/ranking?city=Fortaleza&year=${selectedYear}&user=Corretor`);
  const [urlTRZ, setUrlTRZ] = useState(`/ranking?city=Teresina&year=${selectedYear}&user=Corretor`);
  
  

  const { data: realtorsSLZ } = useFetch<IRealtorData[]>(urlSLZ);
  const { data: realtorsFTZ } = useFetch<IRealtorData[]>(urlFTZ);
  const { data: realtorsTRZ } = useFetch<IRealtorData[]>(urlTRZ);

  const optionsYear = optionYear.filter(year => year.value <= currentYear);


  const allRealtors = useCallback(() => {
    if(realtorsSLZ !== undefined && realtorsFTZ !== undefined && realtorsTRZ !== undefined) {
      const realtors = realtorsSLZ.concat(realtorsFTZ, realtorsTRZ);

      const sortbyVGV = realtors.sort((a, b) => {
        return a.vgv >  b.vgv ? -1 : (a.vgv < b.vgv) ? 1 : 0;
      })

      console.log(sortbyVGV);
      setRealtors(realtors);
    }
  }, [realtorsSLZ, realtorsFTZ, realtorsTRZ]);
  useEffect(() => {
    allRealtors()
  },[allRealtors]);

  const ranking = useMemo(() => {
    return realtors.map(r => ({
      id: r.id,
      avatar_url: r.avatar_url,
      name: r.name,
      vgv: formatPrice(Number(r.vgv)),
    }));
  }, [realtors]);

  const handleSelectMonth = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      if (Number(event.target.value) > 0) {
        const month = Number(event.target.value);
        setSelectedMonth(event.target.value);
        setUrlSLZ(`/ranking?city=${`São Luís`}&month=${month}&year=${selectedYear}&user=Corretor`);
        setUrlFTZ(`/ranking?city=Fortaleza&month=${month}&year=${selectedYear}&user=Corretor`);
        setUrlTRZ(`/ranking?city=Teresina&month=${month}&year=${selectedYear}&user=Corretor`);
      } else {
        setSelectedMonth('0');
        setUrlSLZ(`/ranking?city=${`São Luís`}&year=${selectedYear}&user=Corretor`);
        setUrlFTZ(`/ranking?city=Fortaleza&year=${selectedYear}&user=Corretor`);
        setUrlTRZ(`/ranking?city=Teresina&year=${selectedYear}&user=Corretor`);
      }
    },
    [selectedYear],
  );

  const handleSelectYear = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const year = Number(event.target.value);
      setSelectedYear(year);
      if (Number(selectedMonth) > 0) {
        setUrlSLZ(`/ranking?city=${`São Luís`}&month=${selectedMonth}&year=${year}&user=Corretor`);
        setUrlFTZ(`/ranking?city=Fortaleza&month=${selectedMonth}&year=${year}&user=Corretor`);
        setUrlTRZ(`/ranking?city=Teresina&month=${selectedMonth}&year=${year}&user=Corretor`);
      } else {
        setSelectedMonth('0');
        setUrlSLZ(`/ranking?city=${`São Luís`}&year=${year}&user=Corretor`);
        setUrlFTZ(`/ranking?city=Fortaleza&year=${year}&user=Corretor`);
        setUrlTRZ(`/ranking?city=Teresina&year=${year}&user=Corretor`);
      }
    },
    [selectedMonth],
  );
  
  return (
    <Container>
      <Header />
      <BackgroundImage />
      <Content>
        <Title>Top Five</Title>
        <Filters>
          <MonthlyFilter>
            <SelectSubsidiary>
              <select defaultValue={selectedMonth} onChange={handleSelectMonth}>
                <option value="0">ANUAL</option>
                <optgroup label="MESES">
                  {months.map(month => (
                    <option value={month.value}>{month.label}</option>
                  ))}
                </optgroup>
              </select>
            </SelectSubsidiary>
          </MonthlyFilter>

          <MonthlyFilter>
            <SelectSubsidiary>
              <select defaultValue={selectedYear} onChange={handleSelectYear}>
                  {optionsYear.map(year => (
                    <option value={year.value}>{year.label}</option>
                  ))}
              </select>
            </SelectSubsidiary>
          </MonthlyFilter>
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

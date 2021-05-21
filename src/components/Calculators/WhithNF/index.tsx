import React, { ChangeEvent, useCallback, useRef, useState } from 'react';
import { RiSave3Fill } from 'react-icons/ri';
import { MdEdit } from 'react-icons/md';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import Button from '../../Button';
import Input from '../../Input';

import { Container, Asaid, Main, Table, Wrapper, Footer } from './styles';
import { currency, unMaked } from '../../../utils/unMasked';
import { formatPrice } from '../../../utils/format';
import EditComissionDivision from '../../ReactModal/EditDivisionComission';
import { useCalculator } from '../../../context/CalculatorContext';
import api from '../../../services/api';

interface Comission {
  realtor: string;
  coordinator: string;
  director: string;
  subsidiary: string;
  cap: string;
}

interface Participantes {
  user?: string;
  participant_type: string;
  comission_percentage: string;
  comission_integral: string;
  tax_percentage: string;
  tax_value: string;
  comission_liquid: string;
}

interface Division {
  division_type: string;
  percentage: string;
  value: string;
}

type CalcProps = {
  id: string;
};
const WhithNF: React.FC<CalcProps> = ({ id }) => {
  const formRef = useRef<FormHandles>(null);
  const formRealtors = useRef<FormHandles>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [porcentImpost, setPorcentImpost] = useState('');
  const [porcentComissionData, setPorcentComissionData] = useState<Comission>({
    realtor: '',
    coordinator: '',
    director: '',
    subsidiary: '',
    cap: '',
  } as Comission);
  const [comissionBrute, setcomissionBrute] = useState({
    realtor: '',
    coordinator: '',
    director: '',
    subsidiary: '',
    cap: '',
  } as Comission);
  const [impostValue, setImpostValue] = useState({
    realtor: '',
    coordinator: '',
    director: '',
    subsidiary: '',
    cap: '',
  } as Comission);
  const [netCommission, setNetComission] = useState({
    realtor: '',
    coordinator: '',
    director: '',
    subsidiary: '',
    cap: '',
  } as Comission);
  const [editDivisionModal, setEditDivisionModal] = useState(false);
  const {
    divisionData,
    calcDivision,
    sald,
    comission,
    initialValue,
  } = useCalculator();
  const history = useHistory();
  const toogleEditDivisionModal = useCallback(() => {
    setEditDivisionModal(!editDivisionModal);
  }, [editDivisionModal]);
  const calcIss = () => {
    const valuePlot = currency(formRef.current?.getFieldValue('valuePlot'));
    const porcentIss = formRef.current?.getFieldValue('porcentIss') / 100;
    const iss = formatPrice(valuePlot * porcentIss);
    formRef.current?.setFieldValue('issValue', iss);
  };
  const calTotalImpost = useCallback(() => {
    const porcentImpostTotal =
      currency(formRef.current?.getFieldValue('porcentImpostTotal')) / 100;
    const valuePlot = currency(formRef.current?.getFieldValue('valuePlot'));
    const iss = currency(formRef.current?.getFieldValue('issValue'));
    const total = formatPrice(valuePlot * porcentImpostTotal - iss);
    formRef.current?.setFieldValue('sald', total);
    setPorcentImpost(formRef.current?.getFieldValue('porcentImpostTotal'));
  }, []);

  const calcBruteValue = useCallback(
    (event: ChangeEvent<HTMLInputElement>, participant: string) => {
      const { value } = event.target;
      const calcBrute = comission.value * (Number(value) / 100);
      const valueImpost = calcBrute * (currency(porcentImpost) / 100);
      const total = formatPrice(calcBrute - valueImpost);

      switch (participant) {
        case 'realtor':
          setPorcentComissionData({
            ...porcentComissionData,
            realtor: value,
          });
          setcomissionBrute({
            ...comissionBrute,
            realtor: formatPrice(calcBrute),
          });
          setImpostValue({ ...impostValue, realtor: formatPrice(valueImpost) });
          setNetComission({ ...netCommission, realtor: total });
          break;
        case 'captvator':
          setPorcentComissionData({
            ...porcentComissionData,
            cap: value,
          });
          setcomissionBrute({
            ...comissionBrute,
            cap: formatPrice(calcBrute),
          });
          setImpostValue({ ...impostValue, cap: formatPrice(valueImpost) });
          setNetComission({ ...netCommission, cap: total });
          break;
        case 'coordinator':
          setPorcentComissionData({
            ...porcentComissionData,
            coordinator: value,
          });
          setcomissionBrute({
            ...comissionBrute,
            coordinator: formatPrice(calcBrute),
          });
          setImpostValue({
            ...impostValue,
            coordinator: formatPrice(valueImpost),
          });
          setNetComission({
            ...netCommission,
            coordinator: total,
          });
          break;
        case 'director':
          setPorcentComissionData({
            ...porcentComissionData,
            director: value,
          });
          setcomissionBrute({
            ...comissionBrute,
            director: formatPrice(calcBrute),
          });
          setImpostValue({
            ...impostValue,
            director: formatPrice(valueImpost),
          });
          setNetComission({ ...netCommission, director: total });
          break;
        case 'subsiadiary':
          setPorcentComissionData({
            ...porcentComissionData,
            subsidiary: value,
          });
          setcomissionBrute({
            ...comissionBrute,
            subsidiary: formatPrice(calcBrute),
          });
          setImpostValue({
            ...impostValue,
            subsidiary: formatPrice(valueImpost),
          });
          setNetComission({ ...netCommission, subsidiary: total });
          calcDivision(total);
          break;
        default:
          break;
      }
    },
    [
      porcentComissionData,
      comissionBrute,
      comission.value,
      impostValue,
      porcentImpost,
      netCommission,
      setNetComission,
      calcDivision,
    ],
  );

  const handleSaveDivision = async () => {
    let participants: Participantes[] = [];
    const division: Division[] = divisionData.map(division => ({
      division_type: division.id,
      percentage: division.porcent,
      value: division.total ? unMaked(division.total) : '0',
    }));
    if (comission.coordinator) {
      const balanceCoordinator = [
        {
          user: comission.coordinator.id,
          participant_type: 'COORDENADOR',
          comission_percentage: porcentComissionData.coordinator,
          comission_integral: unMaked(comissionBrute.coordinator),
          tax_percentage: porcentImpost,
          tax_value: unMaked(impostValue.coordinator),
          comission_liquid: unMaked(netCommission.coordinator),
        },
      ];
      participants = [...participants, ...balanceCoordinator];
    }
    if (comission.captvators) {
      const balanceCaptivators = comission.captvators.map(cap => ({
        user: cap.id,
        participant_type: 'CAPTADOR',
        comission_percentage: porcentComissionData.cap,
        comission_integral: unMaked(comissionBrute.cap),
        tax_percentage: porcentImpost,
        tax_value: unMaked(impostValue.cap),
        comission_liquid: unMaked(netCommission.cap),
      }));
      participants = [...participants, ...balanceCaptivators];
    }
    const balanceRealtors = comission.sellers.map(saller => ({
      user: saller.id,
      participant_type: 'VENDEDOR',
      comission_percentage: porcentComissionData.realtor,
      comission_integral: unMaked(comissionBrute.realtor),
      tax_percentage: porcentImpost,
      tax_value: unMaked(impostValue.realtor),
      comission_liquid: unMaked(netCommission.realtor),
    }));
    const balanceDirector = comission.directors.map(director => ({
      user: director.id,
      participant_type: 'DIRETOR',
      comission_percentage: porcentComissionData.director,
      comission_integral: unMaked(comissionBrute.director),
      tax_percentage: porcentImpost,
      tax_value: unMaked(impostValue.director),
      comission_liquid: unMaked(netCommission.director),
    }));
    const balanceSubsidiary = [
      {
        participant_type: 'EMPRESA',
        comission_percentage: porcentComissionData.subsidiary,
        comission_integral: unMaked(comissionBrute.subsidiary),
        tax_percentage: porcentImpost,
        tax_value: unMaked(impostValue.subsidiary),
        comission_liquid: unMaked(netCommission.subsidiary),
      },
    ];
    participants = [
      ...participants,
      ...balanceRealtors,
      ...balanceDirector,
      ...balanceSubsidiary,
    ];
    const note_value = unMaked(formRef.current?.getFieldValue('sald'));
    const note_number = unMaked(formRef.current?.getFieldValue('numberNF'));
    const tax_iss_nf = formRef.current?.getFieldValue('porcentIss');
    const value_iss = unMaked(formRef.current?.getFieldValue('issValue'));
    const calculatorData = {
      installment: id,
      note_value,
      note_number,
      tax_iss_nf,
      value_iss,
      tax_rate_nf: porcentImpost,
      balance: unMaked(sald),
      divisions: division,
      participants,
    };

    try {
      setIsLoading(true);
      await api.post('/calculator', calculatorData);
      toast.success('Parcela Paga e calaculada com sucesso !');
      history.push('/financeiro/caixa');
    } catch (error) {
      toast.error('Deu algo errado, contate o suporte');
    } finally {
      setIsLoading(false);
      initialValue();
    }
  };
  return (
    <Wrapper>
      <Container>
        <Asaid>
          <span>Imóveis com NF</span>

          <Form ref={formRef} onSubmit={() => console.log('ok')}>
            {comission && comission.type_sale === 'NOVO' && comission.builder && (
              <div>
                <span>Construtora</span>
                <Input
                  name="builder"
                  type="text"
                  defaultValue={comission.builder}
                />
              </div>
            )}
            <div>
              <span>N° NF</span>
              <Input name="numberNF" type="text" />
            </div>
            <div>
              <span>Valor total NF</span>
              <Input
                mask="currency"
                name="valuePlot"
                type="text"
                defaultValue={comission.valueBRL}
              />
            </div>
            <div>
              <span>Taxa de ISS imposto NF</span>
              <Input
                name="porcentIss"
                type="text"
                defaultValue="%"
                onChange={calcIss}
              />
            </div>
            <div>
              <span>Debito ISS</span>
              <Input
                mask="currency"
                name="issValue"
                type="text"
                defaultValue="R$ 0,00"
              />
            </div>
            <div>
              <span>Taxa total do Imposto NF</span>
              <Input
                name="porcentImpostTotal"
                type="text"
                defaultValue="%"
                onChange={calTotalImpost}
              />
            </div>
            <div>
              <span>Recolhimento de Imposto</span>
              <Input name="sald" type="text" defaultValue="R$ 0,00" />
            </div>
          </Form>
        </Asaid>
        <Main>
          <Form ref={formRealtors} onSubmit={() => console.log('ok')}>
            <Table cols={6}>
              <thead>
                <tr>
                  <th>Participantes</th>
                  <th>% de comissão</th>
                  <th>Comissão bruta</th>
                  <th>% do Imposto</th>
                  <th>$ do Imposto</th>
                  <th className="comission-header">Comissão líquida</th>
                </tr>
              </thead>
              <tbody>
                {comission.sellers &&
                  comission.sellers.map(seller => (
                    <tr key={seller.id}>
                      <td>
                        <strong>Vendedor</strong>
                        <span>{seller.name}</span>
                      </td>
                      <td>
                        <Input
                          name="porcentComission"
                          type="text"
                          className="input-background-dark"
                          placeholder="%"
                          defaultValue={porcentComissionData.realtor}
                          onChange={e => calcBruteValue(e, 'realtor')}
                        />
                      </td>
                      <td>
                        <Input
                          name="comissionBrute"
                          type="text"
                          className="input-background-dark"
                          defaultValue={comissionBrute.realtor}
                        />
                      </td>
                      <td>
                        <Input
                          name="impost"
                          type="text"
                          className="input-background-dark"
                          defaultValue={porcentImpost}
                        />
                      </td>
                      <td>
                        <Input
                          name="valueImpost"
                          type="text"
                          className="input-background-dark"
                          defaultValue={impostValue.realtor}
                        />
                      </td>
                      <td className="comission">
                        <span>
                          {netCommission.realtor === ''
                            ? 'R$ 0,00'
                            : netCommission.realtor}
                        </span>
                      </td>
                    </tr>
                  ))}
                {comission.captvators &&
                  comission.captvators.map(cap => (
                    <tr key={cap.id}>
                      <td>
                        <strong>Captador</strong>
                        <span>{cap.name}</span>
                      </td>
                      <td>
                        <Input
                          name="porcentComission"
                          type="text"
                          className="input-background-dark"
                          placeholder="%"
                          defaultValue={porcentComissionData.cap}
                          onChange={e => calcBruteValue(e, 'captvator')}
                        />
                      </td>
                      <td>
                        <Input
                          name="comissionBrute"
                          type="text"
                          className="input-background-dark"
                          defaultValue={comissionBrute.cap}
                        />
                      </td>
                      <td>
                        <Input
                          name="impost"
                          type="text"
                          className="input-background-dark"
                          defaultValue={porcentImpost}
                        />
                      </td>
                      <td>
                        <Input
                          name="valueImpost"
                          type="text"
                          className="input-background-dark"
                          defaultValue={impostValue.cap}
                        />
                      </td>
                      <td className="comission">
                        <span>
                          {netCommission.cap === ''
                            ? 'R$ 0,00'
                            : netCommission.cap}
                        </span>
                      </td>
                    </tr>
                  ))}

                {comission.coordinator && (
                  <tr>
                    <td>
                      <strong>Coordenador</strong>
                      <span>{comission.coordinator.name}</span>
                    </td>
                    <td>
                      <Input
                        name="porcentComission"
                        type="text"
                        className="input-background-dark"
                        defaultValue={comissionBrute.coordinator}
                        onChange={e => calcBruteValue(e, 'coordinator')}
                      />
                    </td>
                    <td>
                      <Input
                        name="impostCoordinator"
                        type="text"
                        className="input-background-dark"
                        defaultValue={comissionBrute.coordinator}
                      />
                    </td>
                    <td>
                      <Input
                        name="impostCoordinator"
                        type="text"
                        className="input-background-dark"
                        defaultValue={porcentImpost}
                      />
                    </td>
                    <td>
                      <Input
                        name="impostCoordinator"
                        type="text"
                        className="input-background-dark"
                        defaultValue={impostValue.coordinator}
                      />
                    </td>
                    <td className="comission">
                      <span>
                        {netCommission.coordinator === ''
                          ? 'R$ 0,00'
                          : netCommission.coordinator}
                      </span>
                    </td>
                  </tr>
                )}

                {comission.directors &&
                  comission.directors.map(director => (
                    <tr key={director.id}>
                      <td>
                        <strong>Diretor</strong>
                        <span>{director.name}</span>
                      </td>
                      <td>
                        <Input
                          name="impostCoordinator"
                          type="text"
                          className="input-background-dark"
                          onChange={e => calcBruteValue(e, 'director')}
                        />
                      </td>
                      <td>
                        <Input
                          name="impostCoordinator"
                          type="text"
                          defaultValue={comissionBrute.director}
                        />
                      </td>
                      <td>
                        <Input
                          name="impostDirector"
                          type="text"
                          className="input-background-dark"
                          defaultValue={porcentImpost}
                        />
                      </td>
                      <td>
                        <Input
                          name="impostDirector"
                          type="text"
                          className="input-background-dark"
                          defaultValue={impostValue.director}
                        />
                      </td>
                      <td className="comission">
                        <span>
                          {netCommission.director === ''
                            ? 'R$ 0,00'
                            : netCommission.director}
                        </span>
                      </td>
                    </tr>
                  ))}

                <tr>
                  <td>
                    <strong>Empresa</strong>
                    <span>{`Filial ${comission.subsidiary}`}</span>
                  </td>
                  <td>
                    <Input
                      name="impostCoordinator"
                      type="text"
                      className="input-background-dark"
                      onChange={e => calcBruteValue(e, 'subsiadiary')}
                    />
                  </td>
                  <td>
                    <Input
                      name="impostDirector"
                      type="text"
                      className="input-background-dark"
                      defaultValue={comissionBrute.subsidiary}
                    />
                  </td>
                  <td>
                    <Input
                      name="impostSubsidary"
                      type="text"
                      className="input-background-dark"
                      defaultValue={porcentImpost}
                    />
                  </td>
                  <td>
                    <Input
                      name="impostCoordinator"
                      type="text"
                      className="input-background-dark"
                      defaultValue={impostValue.subsidiary}
                    />
                  </td>
                  <td className="comission">
                    <span>
                      {netCommission.subsidiary === ''
                        ? 'R$ 0,00'
                        : netCommission.subsidiary}
                    </span>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Form>
        </Main>
      </Container>
      <Footer>
        <div className="edit">
          <Button onClick={toogleEditDivisionModal}>
            <MdEdit />
            editar divisão
          </Button>
        </div>
        <Table cols={divisionData.length + 1}>
          <thead>
            <tr>
              {divisionData.map(division => (
                <th key={division.id}>{division.name}</th>
              ))}
              <th>SALDO</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {divisionData.map(division => (
                <td key={division.id}>
                  <input
                    type="text"
                    className="porcent"
                    defaultValue={division.porcent}
                  />
                  <input
                    type="text"
                    placeholder="R$"
                    defaultValue={division.total}
                  />
                </td>
              ))}
              <td>
                <input type="text" className="porcent disabled" />
                <input type="text" placeholder="R$" defaultValue={sald} />
              </td>
            </tr>
          </tbody>
        </Table>
        <div className="save">
          <Button type="button" onClick={handleSaveDivision}>
            <RiSave3Fill />
            {isLoading ? '...Salvando, Aguarde !' : 'Salvar cálculo!'}
          </Button>
        </div>
      </Footer>
      <EditComissionDivision
        isOpen={editDivisionModal}
        setIsOpen={toogleEditDivisionModal}
      />
    </Wrapper>
  );
};

export default WhithNF;

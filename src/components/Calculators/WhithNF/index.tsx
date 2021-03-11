import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { RiSave3Fill } from 'react-icons/ri';
import { MdEdit } from 'react-icons/md';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import Button from '../../Button';
import Input from '../../Input';

import { Container, Asaid, Main, Table, Wrapper, Footer } from './styles';
import { currency } from '../../../utils/unMasked';
import { formatPrice } from '../../../utils/format';
import EditComissionDivision from '../../ReactModal/EditDivisionComission';
import { useDivision } from '../../../context/DivisionComissionContext';

interface Sale {
  id: string;
  sallers: {
    id: string;
    name: string;
  }[];
  cordinators?: string;
  directors: {
    id: string;
    name: string;
  }[];
  value: string;
}

interface Comission {
  realtor: string;
  coordinator: string;
  director: string;
  subsidiary: string;
}
const WhithNF: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const formRealtors = useRef<FormHandles>(null);
  const [sale, setSale] = useState<Sale>({} as Sale);
  const [porcentImpost, setPorcentImpost] = useState('');
  const [porcentComissionData, setPorcentComissionData] = useState<Comission>({
    realtor: '',
    coordinator: '',
    director: '',
    subsidiary: '',
  } as Comission);
  const [comissionBrute, setcomissionBrute] = useState({
    realtor: '',
    coordinator: '',
    director: '',
    subsidiary: '',
  } as Comission);
  const [impostValue, setImpostValue] = useState({
    realtor: '',
    coordinator: '',
    director: '',
    subsidiary: '',
  } as Comission);
  const [netCommission, setNetComission] = useState({
    realtor: '',
    coordinator: '',
    director: '',
    subsidiary: '',
  } as Comission);
  const [editDivisionModal, setEditDivisionModal] = useState(true);
  const { divisionData, calcDivision, sald } = useDivision();

  useEffect(() => {
    setSale({
      id: 'dsdsadasda',
      sallers: [{ id: 'qwqwqwqw', name: 'Rafael' }],
      cordinators: 'Gregory',
      directors: [
        { id: 'qwqwqwqw', name: 'Cristiane' },
        { id: 'rewrwerew', name: 'Raunin' },
      ],
      value: 'R$ 10.518,78',
    });
  }, []);

  // const saleFormated = useMemo(() => {
  //   return {
  //     ...sale,
  //     value: formatPrice(Number(sale.value)),
  //   };
  // }, [sale]);

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
      const calcBrute = currency(sale.value) * (Number(value) / 100);
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
      sale.value,
      impostValue,
      porcentImpost,
      netCommission,
      setNetComission,
      calcDivision,
    ],
  );
  return (
    <Wrapper>
      <Container>
        <Asaid>
          <span>Imóveis com NF</span>

          <Form ref={formRef} onSubmit={() => console.log('ok')}>
            <div>
              <span>Construtora</span>
              <Input name="builder" type="text" />
            </div>
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
                defaultValue={sale.value}
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
                <tr>
                  <td>
                    <strong>Corretor</strong>
                    <span>Rafael Serejo</span>
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
                <tr>
                  <td>
                    <strong>Coordenador</strong>
                    <span>Gregory Mike</span>
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
                <tr>
                  <td>
                    <strong>Diretor</strong>
                    <span>Cristiane Sipaúba</span>
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
                <tr>
                  <td>
                    <strong>Diretor</strong>
                    <span>Raunin Fernandes</span>
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
                <tr>
                  <td>
                    <strong>Empresa</strong>
                    <span>Filial São Luís</span>
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
                <th>{division.name}</th>
              ))}
              <th>SALDO</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {divisionData.map(division => (
                <td>
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
          <Button type="button">
            <RiSave3Fill />
            Salvar cálculo!
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

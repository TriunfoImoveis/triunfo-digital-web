import React from 'react';
import { Form } from '@unform/web';
import InputDisabled from '../../../../InputDisabled';

type Entry = {
  id: string;
  sede: string;
  tipo: 'ENTRADA' | 'SAIDA';
  descricao: string;
  valor: string;
  contaDeSaida: string;
  data: string;
};

type FormDisableProps = {
  entry: Entry
}
const FormDisabled: React.FC<FormDisableProps> = ({entry}) => {
  return (
    <>
      <Form onSubmit={() => {}}>
        <InputDisabled label="Descrição" data={entry.descricao} />
        <InputDisabled label="Data de Pagamento" data={entry.data} />
        <InputDisabled label="Valor" data={entry.valor} />
        <InputDisabled label="Sede" data={entry.sede} />
        <InputDisabled label="Conta de entrada" data={entry.contaDeSaida} />
      </Form>
    </>
  );
}

export default FormDisabled;
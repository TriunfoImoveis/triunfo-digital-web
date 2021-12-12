import React, { useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';

import FormActive from './components/FormActive';
import FormDisabled from './components/FormDisabled';

import { Container, Edit } from './styles';

type Entry = {
  id: string;
  sede: string;
  tipo: 'ENTRADA' | 'SAIDA';
  descricao: string;
  valor: string;
  contaDeSaida: string;
  data: string;
};

type EditAccountFixedProps = {
  entry: Entry;
};

const EditEntry: React.FC<EditAccountFixedProps> = ({entry}) => {
  const [edit, setedit] = useState(false);

  const handleChangeEdit = () => {
    setedit(prevState => !prevState);
  }
  return (
    <Container>
      <Edit>
        <button type="button" onClick={handleChangeEdit}>
          <FaRegEdit />
          editar
        </button>
      </Edit>
      {!edit && <FormDisabled entry={entry} />}
      {edit && <FormActive entry={entry} />}
    </Container>
  );
};

export default EditEntry;

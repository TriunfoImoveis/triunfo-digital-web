import { ChangeEvent } from 'react';

export const currency = (
  event: ChangeEvent<HTMLInputElement>,
): ChangeEvent<HTMLInputElement> => {
  let valueInput = event.target.value;
  valueInput = valueInput.replace(/\D/g, '');
  valueInput = valueInput.replace(/(\d)(\d{2})$/, '$1,$2');
  valueInput = valueInput.replace(/(?=(\d{3})+(\D))\B/g, '.');
  event.currentTarget.value = `R$ ${valueInput}`;
  return event;
};

export const money = (value: number): string => {
  return `R$ ${value
    .toFixed(2)
    .replace('.', ',')
    .replace(/(\d)(?=(\d{3})+,)/g, '$1.')}`;
};

export const porcent = (
  event: ChangeEvent<HTMLInputElement>,
): ChangeEvent<HTMLInputElement> => {
  let valueMasked = event.target.value;
  valueMasked = valueMasked.replace(/\D/g, '');
  valueMasked = valueMasked.replace(/(\d{1})/, '$1%');
  event.currentTarget.value = valueMasked;
  return event;
};

export const CPF = (
  event: ChangeEvent<HTMLInputElement>,
): ChangeEvent<HTMLInputElement> => {
  let valueMasked = event.target.value;
  valueMasked = valueMasked.replace(/\D/g, '');
  valueMasked = valueMasked.replace(
    /(\d{3})(\d{3})(\d{3})(\d{2})/,
    '$1.$2.$3-$4',
  );
  event.currentTarget.value = valueMasked;
  return event;
};

export const CPFMask = (value: string): string => {
  let valueMasked = value;
  valueMasked = valueMasked.replace(/\D/g, '');
  valueMasked = valueMasked.replace(
    /(\d{3})(\d{3})(\d{3})(\d{2})/,
    '$1.$2.$3-$4',
  );
  return valueMasked;
};

export const CEP = (
  event: ChangeEvent<HTMLInputElement>,
): ChangeEvent<HTMLInputElement> => {
  let valueMasked = event.target.value;
  valueMasked = valueMasked.replace(/\D/g, '');
  valueMasked = valueMasked.replace(/(\d{5})(\d{2})/, '$1-$2');
  event.currentTarget.value = valueMasked;
  return event;
};

export const Fone = (
  event: ChangeEvent<HTMLInputElement>,
): ChangeEvent<HTMLInputElement> => {
  let valueMasked = event.target.value;
  valueMasked = valueMasked.replace(/\D/g, '');
  valueMasked = valueMasked.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  event.currentTarget.value = valueMasked;
  return event;
};
export const FoneMask = (value: string): string => {
  let valueMasked = value;
  if (valueMasked.length <= 10) {
    valueMasked = valueMasked.replace(/\D/g, '');
    valueMasked = valueMasked.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
  } else {
    valueMasked = valueMasked.replace(/\D/g, '');
    valueMasked = valueMasked.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  }
  return valueMasked;
};
export const Whats = (
  event: ChangeEvent<HTMLInputElement>,
): ChangeEvent<HTMLInputElement> => {
  let valueMasked = event.target.value;
  valueMasked = valueMasked.replace(/\D/g, '');
  valueMasked = valueMasked.replace(/(\d{2})(\d{2})(\d{5})(\d{4})/, '+$1 ($2) $3-$4');
  event.currentTarget.value = valueMasked;
  return event;
};
export const WhatsMask = (value: string): string => {
  let valueMasked = value;
  valueMasked = valueMasked.replace(/\D/g, '');
  valueMasked = valueMasked.replace(
    /(\d{2})(\d{2})(\d{5})(\d{4})/,
    '+$1 ($2) $3-$4',
  );
  return valueMasked;
};
export const DateDMY = (
  event: ChangeEvent<HTMLInputElement>,
): ChangeEvent<HTMLInputElement> => {
  let valueMasked = event.target.value;
  valueMasked = valueMasked.replace(/\D/g, '');
  valueMasked = valueMasked.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3');
  event.currentTarget.value = valueMasked;
  return event;
};

export const cnpj = (value: string): string => {
  let valueMasked = value;
  valueMasked = valueMasked.replace(/\D/g, '');
  valueMasked = valueMasked.replace(
    /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
    '$1.$2.$3/$4-$5',
  );
  return valueMasked;
};

export const zipCodeMask = (
  event: ChangeEvent<HTMLInputElement>,
): ChangeEvent<HTMLInputElement> => {
  let valueMasked = event.target.value;
  valueMasked = valueMasked.replace(/\D/g, '');
  valueMasked = valueMasked.replace(
    /(\d{5})(\d{3})/,
    '$1-$2',
  );
  event.currentTarget.value = valueMasked;
  return event;
};
export const CNPJMask = (
  event: ChangeEvent<HTMLInputElement>,
): ChangeEvent<HTMLInputElement> => {
  let valueMasked = event.target.value;
  valueMasked = valueMasked.replace(/\D/g, '');
  valueMasked = valueMasked.replace(
    /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
    '$1.$2.$3/$4-$5',
  );
  event.currentTarget.value = valueMasked;
  return event;
};

export const DocumentMask = (
  event: ChangeEvent<HTMLInputElement>,
): ChangeEvent<HTMLInputElement> => {
  const digits = event.target.value.replace(/\D/g, '').slice(0, 14);

  let valueMasked = digits;

  if (digits.length <= 11) {
    valueMasked = digits
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  } else {
    valueMasked = digits
      .replace(/(\d{2})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1/$2')
      .replace(/(\d{4})(\d{1,2})$/, '$1-$2');
  }

  event.currentTarget.value = valueMasked;
  return event;
};

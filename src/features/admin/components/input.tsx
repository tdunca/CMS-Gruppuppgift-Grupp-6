import { type ComponentPropsWithRef } from 'react';

type InputProps = {
  name: string;
  label: string;
} & ComponentPropsWithRef<'input'>;

function Input({ label, name, ...other }: InputProps) {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input id={name} name={name} {...other} />
    </div>
  );
}

export default Input;

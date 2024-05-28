import { type ComponentPropsWithRef } from 'react';
import Style from './input.module.css';

type InputProps = {
  name: string;
  label: string;
} & ComponentPropsWithRef<'input'>;

function Input({ label, name, ...other }: InputProps) {
  return (
    <div className={Style.input}>
      <label htmlFor={name}>{label}</label>
      <input id={name} name={name} {...other} />
    </div>
  );
}

export default Input;

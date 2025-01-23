import {OptionType} from 'sr/partials/widgets/widgets-components/Multiselect'

type Field = {
  options?: OptionType[]
  value?: OptionType[]
  name: any
  type: string
  label: string
  placeholder?: string
  required?: boolean
  wrapperLabel?: string
  topLabel?: string
  labelKey?: string
  valueKey?: string
  onChange?: any
}
export type FieldsArray = Field[]

export type ExtractFieldNames<T extends FieldsArray> = {
  [K in keyof T]: T[K] extends {type: 'dropdown||multi'}
    ? T[K] extends {label: infer U}
      ? U
      : never
    : T[K] extends {name: infer U}
    ? U
    : never
}[number]

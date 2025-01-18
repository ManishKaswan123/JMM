import React, {useState} from 'react'
import {ActionMeta} from 'react-select'
import MultiSelectField, {OptionType} from 'sr/partials/widgets/widgets-components/Multiselect'

const TestMultiSelect: React.FC = () => {
  // Define the options for the multiselect dropdown
  const options: OptionType[] = [
    {value: 'apple', label: 'Apple'},
    {value: 'banana', label: 'Banana'},
    {value: 'cherry', label: 'Cherry'},
    {value: 'date', label: 'Date'},
    {value: 'grape', label: 'Grape'},
  ]

  // State to hold selected options
  const [selectedOptions, setSelectedOptions] = useState<OptionType[]>([])

  // Handle the change event
  const handleChange = (selectedOptions: OptionType[], actionMeta: ActionMeta<OptionType>) => {
    setSelectedOptions(selectedOptions)
    console.log('Selected Options:', selectedOptions)
  }

  return (
    <div className='w-1/2 mx-auto mt-10'>
      <h1 className='text-2xl font-bold mb-4'>Test MultiSelect Component</h1>
      <MultiSelectField
        options={options}
        label='Fruits'
        name='fruits'
        value={selectedOptions}
        onChange={handleChange}
        placeholder='Select your favorite fruits'
        error={false} // Set to true for testing error states
        errorText='This field is required'
        required
      />
      <div className='mt-4'>
        <strong>Selected Values:</strong>
        <ul>
          {selectedOptions.map((option) => (
            <li key={option.value}>{option.label}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default TestMultiSelect

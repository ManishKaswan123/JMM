import {useState} from 'react'
import {AiOutlineClose, AiOutlineFilter} from 'react-icons/ai'
import TextField from 'sr/partials/widgets/widgets-components/form/TextField'
import {Button} from './Button'
import DropdownField from 'sr/partials/widgets/widgets-components/form/DropdownField'
import MultiSelectField, {OptionType} from 'sr/partials/widgets/widgets-components/Multiselect'
interface FilterProps {
  onApplyFilter: any
  setIsFilterVisible: (action: boolean) => void
  preFilters: any
  fields: any
  handleClearFilter?: () => void
}

const Filter = ({
  onApplyFilter,
  setIsFilterVisible,
  preFilters,
  fields,
  handleClearFilter,
}: FilterProps) => {
  const [filters, setFilters] = useState(preFilters)
  // console.log('fields are :- ', fields)
  const handleChange = (e: any) => {
    const {name, value, type, checked} = e.target
    setFilters({
      ...filters,
      [name]: type === 'checkbox' ? checked : value,
    })
  }

  const handleClearFilterDefault = () => {
    setFilters({})
    onApplyFilter({})
    setIsFilterVisible(false)
  }

  const handleApplyFilter = () => {
    const activeFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => {
        if (typeof value === 'boolean') {
          return value // Keep boolean values that are true
        }
        if (Array.isArray(value)) {
          return value.length > 0 // Keep arrays with at least one element
        }
        return value !== '' // Keep non-empty strings
      })
      // .map(([key, value]) => {
      //   if (Array.isArray(value)) {
      //     // Transform array to a comma-separated string of value attributes
      //     const onlyValue = value.map((item) => item.value)
      //     return [key, onlyValue]
      //   }
      //   return [key, value] // Keep other types as is
      // })
    )

    onApplyFilter(activeFilters)
    // setIsFilterVisible(false)
  }

  const isFilterActive = (filterValue: any) => {
    return filterValue != '' && filterValue != null
  }

  return (
    <div className='w-full p-4 rounded-lg mt-4'>
      <div className='grid grid-cols-4 gap-4'>
        {fields.map((field: any, index: number) => {
          if (field.type === 'multi') {
            return (
              <div key={index}>
                <MultiSelectField
                  options={field.options || []}
                  label={field.label}
                  name={field.name}
                  value={filters[field.label] || []}
                  onChange={(selectedOptions: OptionType[], actionMeta: any) => {
                    setFilters({
                      ...filters,
                      [field.label]: selectedOptions,
                    })
                  }}
                  placeholder={field.placeholder}
                />
              </div>
            )
          }
          if (field.type === 'dropdown') {
            return (
              <div key={index}>
                <DropdownField
                  data={field.name}
                  labelKey={field.labelKey || 'name'}
                  label={field.topLabel}
                  placeholder={field.placeholder}
                  valueKey='id'
                  value={filters[field.label] ? filters[field.label] : ''}
                  // className={`${isFilterActive(filters[field.label]) ? 'bg-gray-200' : 'bg-white'}`}
                  onChange={handleChange}
                  name={field.label}
                />
              </div>
            )
          } else if (field.type === 'checkbox') {
            return (
              <div key={field.name} className='flex justify-center'>
                <input
                  type='checkbox'
                  name={field.name}
                  checked={filters[field.name]}
                  onChange={handleChange}
                  className='mr-2 mt-7'
                />
                <label
                  className={`p-2 pl-8 pr-8 mt-7 border rounded ${
                    isFilterActive(filters[field.name]) ? 'bg-gray-200' : 'bg-white'
                  }`}
                >
                  {field.label}
                </label>
              </div>
            )
          } else {
            return (
              <TextField
                key={field.name}
                type={field.type}
                labelStyle='style1'
                label={field.label}
                className={`custom-input form-input p-2 border rounded ${
                  isFilterActive(filters[field.name]) ? 'bg-gray-200' : 'bg-white'
                } placeholder:text-[15px]`}
                name={field.name}
                value={filters[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
              />
            )
          }
        })}
      </div>
      <div className='flex justify-start items-center mt-4'>
        <Button
          disabled={Object.keys(filters).length === 0}
          onClick={handleApplyFilter}
          className='bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full shadow-md inline-flex items-center mb-2 sm:mb-0 sm:mr-3'
          Icon={AiOutlineFilter}
          label='Apply Filter'
        ></Button>
        <Button
          disabled={Object.keys(filters).length === 0}
          onClick={handleClearFilter ? handleClearFilter : handleClearFilterDefault}
          className='bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full shadow-md inline-flex items-center mb-2 sm:mb-0 sm:mr-3'
          Icon={AiOutlineClose}
          label='Clear Filters'
        ></Button>
      </div>
    </div>
  )
}

export default Filter

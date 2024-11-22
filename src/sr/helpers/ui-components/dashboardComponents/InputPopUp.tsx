// import {useForm} from 'react-hook-form'
// import axios from 'axios'
// import React, {useCallback, useEffect, useState} from 'react'
// import {AiOutlinePlus} from 'react-icons/ai'
// import {InputBox} from '../Input'
// import DropdownField from 'sr/partials/widgets/widgets-components/form/DropdownField'
// import {uploadMedia} from 'sr/utils/api/media'

// interface PopupFormProps {
//   onClose: () => void
//   onSubmit: (name: string, fileName: string, Id: number, newCategoryId: string) => void
//   Name: string
//   FileName: string
//   Id: number
//   label: string
//   categoryId?: string
//   catData?: any
//   topicName: string
// }

// const PopupForm: React.FC<PopupFormProps> = ({
//   onClose,
//   onSubmit,
//   Name,
//   FileName,
//   Id,
//   label,
//   categoryId,
//   catData,
//   topicName,
// }) => {
//   const [name, setName] = useState(Name)
//   const [check, setCheck] = useState<boolean>(true)
//   const [fileName, setFileName] = useState<string>(FileName)
//   const [selectedCategory, setSelectedCategory] = useState<string>(categoryId ? categoryId : '')
//   const [catName, setCatName] = useState<string>('')
//   const [formValues, setFormValues] = useState({
//     categoryId: categoryId,
//   })
//   const {
//     register,
//     // handleSubmit,
//     reset,
//     resetField,
//     watch,
//     setValue,
//     getValues,
//     formState: {errors},
//   } = useForm({mode: 'onBlur', reValidateMode: 'onChange', defaultValues: formValues})
//   useEffect(() => {
//     if (categoryId && catData && catData.length > 0) {
//       for (let i = 0; i < catData.length; i++) {
//         if (catData[i].id === categoryId) {
//           setCatName(catData[i].name.toString())
//           break
//         }
//       }
//     }
//   }, [])

//   const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     let file = e.target.files?.[0]
//     let name = e.target.name
//     if (file) {
//       try {
//         const fileData = new FormData()
//         fileData.append('file', file)

//         // const response = await axios.post(
//         //   'https://api.86deadstock.com/v1/media/upload-file',
//         //   fileData
//         // )
//         const response = await uploadMedia(fileData)
//         console.log('Response :- ', response)
//         if (response) {
//           setFileName(response.results.fileName)
//           console.log('File uploaded successfully')
//         } else {
//           console.error('Failed to upload file')
//         }
//       } catch (error) {
//         console.error('Error uploading file:', error)
//       }
//     }
//   }

//   const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setSelectedCategory(e.target.value)
//     console.log(e.target.value)
//   }

//   const handleSubmit = (event: React.FormEvent) => {
//     event.preventDefault()
//     let newCategoryId = selectedCategory

//     console.log('Before calling onSumbmit :- ', name, fileName, Id, newCategoryId)
//     onSubmit(name, fileName, Id, newCategoryId)
//     setCheck(!check)
//     onClose()
//   }

//   console.log('My state is :- ', typeof selectedCategory)

//   return (
//     <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
//       <div className='bg-white p-6 rounded-lg shadow-lg'>
//         <button onClick={onClose} className='absolute top-2 right-2 text-gray-700'>
//           <AiOutlinePlus className='w-6 h-6' />
//         </button>
//         <form onSubmit={handleSubmit} className='space-y-4'>
//           <div>
//             <label htmlFor='name' className='block text-sm font-medium text-gray-700'>
//               {topicName} Name
//             </label>
//             <input
//               type='text'
//               id='name'
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
//               required
//             />
//           </div>
//           {catData && catData.length > 0 ? (
// <DropdownField
//               data={catData}
//               labelKey='name'
//               label={'Category'}
//               placeholder={'Select category'}
//               valueKey='id'
//               name='category'
//               // onChange={handleCategoryChange}
//               register={register('categoryId', {
//                 required: true,
//               })}
//             />
//           ) : (
//             <div>
//               <label htmlFor='file' className='block text-sm font-medium text-gray-700'>
//                 File (JPG)
//               </label>
//               <input
//                 type='file'
//                 id='file'
//                 accept='image/jpeg'
//                 onChange={handleFileChange}
//                 className='mt-1 block w-full'
//               />
//             </div>
//           )}

//           <div className='flex justify-end space-x-4'>
//             <button
//               type='button'
//               onClick={onClose}
//               className='bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded'
//             >
//               Cancel
//             </button>
//             <button
//               type='submit'
//               className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
//             >
//               {label}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default PopupForm
import {useForm} from 'react-hook-form'
import axios from 'axios'
import React, {useCallback, useEffect, useState} from 'react'
import {AiOutlinePlus} from 'react-icons/ai'
import {InputBox} from '../Input'
import DropdownField from 'sr/partials/widgets/widgets-components/form/DropdownField'
import {uploadMedia} from 'sr/utils/api/media'

const PopupForm: React.FC<{formComponent: React.FC}> = ({formComponent: FormComponent}) => {
  const [onClose, setOnClose] = useState<boolean>(false)
  return (
    <>
      {!onClose && (
        <div className='w-screen fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
          <div className='bg-white p-6 rounded-lg shadow-lg'>
            <FormComponent />
          </div>
        </div>
      )}
    </>
  )
}

export default PopupForm

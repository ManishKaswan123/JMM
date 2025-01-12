import React, {useEffect, useState} from 'react'
import {useForm, SubmitHandler} from 'react-hook-form'
import TextField from 'sr/partials/widgets/widgets-components/form/TextField'
import DropdownField from 'sr/partials/widgets/widgets-components/form/DropdownField'
import FileField from 'sr/partials/widgets/widgets-components/form/FileField'
import {Button} from './Button'
import {toast} from 'react-toastify'
import {uploadMedia} from 'sr/utils/api/media'
import {ExtractFieldNames, FieldsArray} from 'sr/constants/fields'
import getSignedURL from 'sr/utils/helpers/getSignedURL'
import {Spinner} from './Spinner'

interface DynamicModalProps {
  imageType?: string
  label: string
  isOpen: boolean
  onClose: () => void
  fields: FieldsArray
  defaultValues?: {[key: string]: any}
  onSubmit: (payload: any) => Promise<void>
}

const DynamicModal: React.FC<DynamicModalProps> = ({
  imageType,
  label,
  isOpen = false,
  onClose,
  fields,
  defaultValues = {},
  onSubmit,
}) => {
  type FormFields = {
    [K in ExtractFieldNames<typeof fields>]: string
  }
  const [uploading, setUploading] = useState<boolean>(false)
  const [loader, setLoader] = useState<boolean>(false)
  const [signendUrl, setSignedUrl] = useState<string>('')
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    reset,
    formState: {errors},
  } = useForm<FormFields>({mode: 'onBlur', reValidateMode: 'onSubmit', defaultValues})

  useEffect(() => {
    // Check if defaultValues is not null or undefined
    if (defaultValues) {
      const fieldNames = new Set(
        fields.map((field) => (field.type === 'dropdown' ? field.label : field.name))
      )

      const filteredDefaultValues = Object.keys(defaultValues).reduce<{[key: string]: any}>(
        (acc, key) => {
          if (fieldNames.has(key)) {
            acc[key] = defaultValues[key]
          }
          return acc
        },
        {}
      )
      // console.log('Fields: ', fields)
      // console.log('Default values: ', defaultValues)
      // console.log('Filtered default values: ', filteredDefaultValues)
      reset(filteredDefaultValues)
      // if (getValues('imagePath') != '') {
      //   console.log('inside if statement : ', getValues('imagePath'))
      //   getSignedURL(defaultValues.imagePath).then((photoRes) => setSignedUrl(photoRes))
      // }
      // console.log('default values are ', defaultValues)
    }
  }, [fields])

  // const handleFileSelect = async (e: any) => {
  //   const file: File | null = e.target.files?.[0] || null
  //   const formData = new FormData()
  //   if (file) {
  //     let fileType = ''
  //     const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png']
  //     const validDocumentTypes = ['application/pdf', 'text/plain']
  //     if (validImageTypes.includes(file.type)) {
  //       fileType = 'image'
  //     } else if (validDocumentTypes.includes(file.type)) {
  //       fileType = 'document'
  //     } else {
  //       toast.error('File type should be jpeg, jpg, png, txt, or pdf')
  //       return false
  //     }
  //     let fileNameIs = file.name
  //     fileNameIs = fileNameIs.replace(/[^a-zA-Z0-9. ]/g, '').replace(/ /g, '-')
  //     formData.append('file', file, fileNameIs)
  //     formData.append('file_type', fileType)

  //     const uploadFile = async (retryCount = 3) => {
  //       setUploading(true)
  //       try {
  //         const res: any = await uploadMedia(formData)
  //         if (res && res.status) {
  //           if (imageType === 'image') {
  //             // @ts-expect-error
  //             setValue('images', [res.results.fileName])
  //           } else {
  //             setValue('imagePath', res.results.fileName)
  //           }
  //           // console.log('File name is ', res.results.fileName)
  //         } else {
  //           toast.error(res?.error)
  //         }
  //       } catch (error) {
  //         if (retryCount > 0) {
  //           await uploadFile(retryCount - 1)
  //         } else {
  //           toast.error('Failed to upload file after multiple attempts.')
  //         }
  //       } finally {
  //         setUploading(false)
  //       }
  //     }
  //     await uploadFile()
  //   }
  // }
  const handleFileSelect = async (e: any) => {
    e.preventDefault()
    const file: File | null = e.target.files?.[0] || null
    const formData = new FormData()
    if (file) {
      setLoader(true)
      setUploading(true)
      let fileType = ''
      const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png']
      const validDocumentTypes = ['application/pdf', 'text/plain']
      if (validImageTypes.includes(file.type)) {
        fileType = 'image'
      } else if (validDocumentTypes.includes(file.type)) {
        fileType = 'document'
      } else {
        toast.error('File type should be jpeg, jpg, png, txt, or pdf')
        setLoader(false)
        setUploading(false)
        return false
      }
      let fileName = file.name
      fileName = fileName.replace(/[^a-zA-Z0-9. ]/g, '').replace(/ /g, '-')
      formData.append('file', file, fileName)
      formData.append('file_type', fileType)
      // formData.append('userAuthId', userData.agentAuthId)
      const res: any = await uploadMedia(formData)
      // console.log('upload res is : ', res)
      if (res && res.status) {
        const photoRes = await getSignedURL(res.results.fileName)
        setSignedUrl(photoRes)
        // console.log('photoRes is : ', photoRes)
        if (imageType === 'images') {
          // @ts-expect-error
          setValue('images', [res.results.fileName])
        } else {
          setValue('imagePath', res.results.fileName)
        }
      } else {
        toast.error(res?.error)
      }
      setLoader(false)
      setUploading(false)
    }
  }

  const onSubmitForm: SubmitHandler<any> = async (data: FormData) => {
    await onSubmit(data)
  }
  // console.log('default values are ', Object.keys(defaultValues).length)

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 
    transition-opacity duration-[6000ms] ease-in-out ${
      isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
    }`}
    >
      <div
        className={`bg-white px-6 pb-6 rounded-lg w-full max-w-2xl max-h-[95vh] overflow-y-auto 
      transform transition-all duration-[6000ms] ease-in-out ${
        isOpen ? 'translate-y-0 scale-100' : 'translate-y-10 scale-95'
      }`}
      >
        <div className='sticky top-0 z-10 py-2 bg-white flex justify-between items-center'>
          <h2 className='text-xl text-gray-900 font-bold'>{label}</h2>
          <Button
            onClick={onClose}
            label='x'
            className='bg-white hover:bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center ml-2'
          />
        </div>
        <form onSubmit={handleSubmit(onSubmitForm)}>
          {fields.map((field, index) => {
            switch (field.type) {
              case 'dropdown':
                return (
                  <DropdownField
                    key={index}
                    data={field.name}
                    labelKey={field.name?.[0]?.firstName ? 'firstName' : field.labelKey || 'name'}
                    label={field.topLabel}
                    placeholder={field.placeholder}
                    valueKey={field.valueKey || 'id'}
                    name={field.label}
                    required={field.required && field.required}
                    register={register(field.label, {
                      required: true,
                      onChange: (e) => {
                        if (field.onChange) field.onChange(e)
                      },
                    })}
                    error={errors[field.label] && !watch(field.label)}
                    errorText={`Please   ${field.placeholder}`}
                  />
                )
              case 'file':
                if (loader) return <Spinner />
                return (
                  <>
                    <FileField
                      key={index}
                      label={field.label}
                      wrapperLabel={field.wrapperLabel}
                      wrapperClassName='m-2'
                      id={field.name}
                      onChange={handleFileSelect}
                      name={field.name}
                      required={field.required}
                      error={errors.fileField}
                      errorText={`Please select a file`}
                    />
                    {imageType == 'imagePath' && watch('imagePath') && (
                      <div className='flex justify-center items-center space-x-4'>
                        {Object.keys(defaultValues).length == 0 && (
                          <a
                            href={signendUrl}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='text-blue-500 underline hover:text-blue-700'
                          >
                            View Attachment
                          </a>
                        )}
                        <button
                          type='button'
                          onClick={() => {
                            // @ts-expect-error
                            setValue('imagePath', undefined) // Clear the attachment value
                            setSignedUrl('')
                          }}
                          className='text-red-500 underline hover:text-red-700'
                        >
                          Remove Attachment
                        </button>
                      </div>
                    )}
                    {imageType == 'images' && watch('images') && watch('images').length > 0 && (
                      <div className='flex justify-center items-center space-x-4'>
                        {Object.keys(defaultValues).length == 0 && (
                          <a
                            href={signendUrl}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='text-blue-500 underline hover:text-blue-700'
                          >
                            View Attachment
                          </a>
                        )}
                        <button
                          type='button'
                          onClick={() => {
                            // @ts-expect-error
                            setValue('images', []) // Clear the attachment value
                            setSignedUrl('')
                          }}
                          className='text-red-500 underline hover:text-red-700'
                        >
                          Remove Attachment
                        </button>
                      </div>
                    )}
                  </>
                )
              case 'checkbox':
                return (
                  <TextField
                    type='checkbox'
                    label={field.label}
                    labelStyle='style3'
                    className='form-checkbox mt-2 ml-2'
                    wrapperClassName='flex items-start '
                    required={field.required}
                    id={field.name}
                    name={field.name}
                    value={true}
                    register={register(field.name, {required: field.required})}
                    error={errors[field.name] && !watch(field.name)}
                    errorText={`Please enter ${field.placeholder}`}
                  />
                )
              default:
                return (
                  <TextField
                    key={index}
                    type={field.type}
                    labelStyle='style1'
                    label={field.label}
                    className='custom-input form-input p-2 border rounded mb-2'
                    id={field.name}
                    required={field.required}
                    name={field.name}
                    placeholder={field.placeholder}
                    register={register(field.name, {required: field.required})}
                    error={errors[field.name] && !watch(field.name)}
                    errorText={`Please enter ${field.placeholder}`}
                  />
                )
              // case 'number':
              //   return (
              //     <TextField
              //       key={index}
              //       type={field.type}
              //       labelStyle='style1'
              //       label={field.label}
              //       className='custom-input form-input p-2 border rounded mb-2'
              //       id={field.name}
              //       required={field.required}
              //       name={field.name}
              //       placeholder={field.placeholder}
              //       register={register(field.name, {required: field.required})}
              //       error={errors[field.name] && !watch(field.name)}
              //       errorText={`Please enter ${field.placeholder}`}
              //     />
              //   )
              // case 'datetime-local':
              //   return (
              //     <TextField
              //       key={index}
              //       type={field.type}
              //       labelStyle='style1'
              //       label={field.label}
              //       className='custom-input form-input p-2 border rounded mb-2'
              //       id={field.name}
              //       required={field.required}
              //       name={field.name}
              //       placeholder={field.placeholder}
              //       register={register(field.name, {required: field.required})}
              //       error={errors[field.name] && !watch(field.name)}
              //       errorText={`Please enter ${field.placeholder}`}
              //     />
              //   )
            }
          })}
          <div className='flex justify-around items-center mt-4'>
            <Button
              onClick={onClose}
              label='Cancel'
              className='bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-full shadow-md inline-flex items-center mb-2 sm:mb-0 sm:mr-3'
            />
            <Button
              disabled={
                uploading ||
                (getValues('images') == null && getValues('imagePath') == null && imageType != null)
              }
              type='submit'
              label={'Submit'}
              className='bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-full shadow-md inline-flex items-center mb-2 sm:mb-0 sm:mr-3'
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default DynamicModal

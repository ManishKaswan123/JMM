import axios from 'axios'
import {useCallback, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {Button, InputBox} from 'sr/helpers'
import companyLogo from '../../../../sr/img/company_logo.jpeg'
import {toast} from 'react-toastify'
import TextField from 'sr/partials/widgets/widgets-components/form/TextField'
import {useForm} from 'react-hook-form'
import DropdownField from 'sr/partials/widgets/widgets-components/form/DropdownField'

type FormFields = {
  email: string
  password: string
  reEnterPassword: string
  firstName: string
  lastName: string
  phone: string
  businessType: string[]
  category: string[]
  interest: string[]
}

export default function Signin() {
  let catData = [
    {
      name: 'Catering',
      imagePath: 'businessType/catering.png',
      createdAt: '2023-10-10T18:06:45.609Z',
      updatedAt: '2024-05-06T12:13:01.036Z',
      taxCode: 'PE090108',
      id: '652592b503a711a27d388796',
    },
    {
      name: 'Equipment',
      imagePath: 'category/equpiment.png',
      createdAt: '2023-10-10T18:07:30.566Z',
      updatedAt: '2024-05-06T12:10:26.424Z',
      taxCode: 'PE090000',
      id: '652592e203a711a27d38879a',
    },
    {
      name: 'Smallwares',
      imagePath: 'category/smallware.png',
      createdAt: '2024-01-04T16:20:30.194Z',
      updatedAt: '2024-05-06T12:11:08.111Z',
      taxCode: 'PE090100',
      id: '6596dace9f782b5d766cb497',
    },
    {
      name: 'Other',
      imagePath: 'category/menu.png',
      createdAt: '2024-01-04T16:20:30.196Z',
      updatedAt: '2024-05-06T12:06:59.912Z',
      taxCode: 'P0000000',
      id: '6596dace9f782b5d766cb499',
    },
    {
      name: 'After',
      imagePath: 'pic6_1715191317514.jpeg',
      createdAt: '2024-05-08T18:02:00.583Z',
      updatedAt: '2024-05-08T18:03:46.433Z',
      id: '663bbe18b007600bccbc352f',
    },
    {
      name: 'Business Category Three',
      imagePath: 'public/1696358886176.jpg',
      createdAt: '2024-05-08T21:21:29.633Z',
      updatedAt: '2024-05-08T21:21:29.633Z',
      id: '663becd9b007600bccbc3a58',
    },
    {
      name: 'This is',
      imagePath: 'pic1_1715351450616.jpeg',
      createdAt: '2024-05-10T14:30:53.996Z',
      updatedAt: '2024-05-10T14:38:53.773Z',
      id: '663e2f9db007600bccbc40b8',
    },
    {
      name: 'Category',
      imagePath: 'pic8_1715356703115.jpeg',
      createdAt: '2024-05-10T15:58:26.335Z',
      updatedAt: '2024-05-10T15:58:35.375Z',
      id: '663e4422b007600bccbc4177',
    },
  ]
  const navigate = useNavigate()

  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
    reEnterPassword: '',
    firstName: '',
    lastName: '',
    phone: '',
    businessType: [],
    category: [],
    interest: [],
  })

  const {
    register,
    handleSubmit,
    watch,
    formState: {errors, isSubmitting, isSubmitSuccessful},
  } = useForm<FormFields>({mode: 'onBlur', reValidateMode: 'onSubmit', defaultValues: formValues})

  const handleSignUp = async (payload: any) => {
    const headers = {
      'Content-Type': 'application/json',
    }
    try {
      const response = await axios.post('https://api.86deadstock.com/v1/auth/register', payload, {
        headers,
      })
      console.log('res', response)
      localStorage.setItem('token', response.data.token)
      navigate('/auth')
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.message) {
        // If the error has a response with a message, set it in displayMessage
      } else {
        // Default error message for unexpected errors
        toast.error('Error while logging in. Please try again')
      }
    } finally {
    }
  }

  const handleSubmitForm = async (formData: any, e: any) => {
    const {reEnterPassword, ...rest} = formData // Destructure to exclude reEnterPassword
    let payload = {
      ...rest, // Spread the rest of the formData into payload
      source: 'email',
      location: {
        type: 'Point',
        coordinates: [78.379727, 17.4336901],
      },
    }

    console.log('data: ', payload)
    handleSignUp(payload)
  }

  return (
    <div className='bg-slate-300 h-screen flex justify-center items-center'>
      <div className='flex flex-col justify-center items-center'>
        <div className='rounded-lg bg-[#F7F7F7] px-4 py-2 h-max'>
          <div className='image-container flex justify-center items-center'>
            <img src={companyLogo} alt='Company Logo' className='image h-16 w-40' />
          </div>
          <div className='flex justify-center font-bold text-2xl pt-1'>Create a new account</div>
          <form action='' onSubmit={handleSubmit(handleSubmitForm)}>
            <div className='flex justify-center items-center'>
              <TextField
                // labelStyle='style2'
                type='text'
                label={'email'}
                // className=' p-2 border w-full border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500'
                // wrapperClassName='text-sm font-medium text-start py-2 seller mr-1'
                required={true}
                id='email'
                name='email'
                register={register('email', {
                  required: true,
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
                error={errors.email}
                errorText={errors.email?.message || 'Please enter a valid email'}
              />
              <TextField
                type='password'
                label={'password'}
                // className=' p-2 border w-full border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500'
                // wrapperClassName='text-sm font-medium text-start py-2 seller ml-1'
                required={true}
                id='password'
                name='password'
                register={register('password', {
                  required: true,
                  minLength: 8,
                })}
                error={errors.password}
                errorText={errors.password?.message || 'Please enter valid password'}
              />
            </div>
            <div className='flex justify-center items-center'>
              <TextField
                type='password'
                label={'reEnterPassword'}
                // className=' p-2 border w-full border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500'
                // wrapperClassName='text-sm font-medium text-start py-2 seller mr-1'
                required={true}
                id='reEnterPassword'
                name='reEnterPassword'
                register={register('reEnterPassword', {
                  required: true,
                  minLength: 8,
                  validate: (value) => value === watch('password') || 'Passwords do not match',
                })}
                error={errors.reEnterPassword}
                errorText={errors.reEnterPassword?.message || 'Please enter valid Password'}
              />

              <TextField
                type='text'
                label={'firstName'}
                // className=' p-2 border w-full border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500'
                // wrapperClassName='text-sm font-medium text-start py-2 seller ml-1'
                required={true}
                id='firstName'
                name='firstName'
                register={register('firstName', {
                  required: true,
                })}
                error={errors.firstName}
                errorText={errors.firstName?.message || 'Please enter firstName'}
              />
            </div>
            <div className='flex justify-center items-center'>
              <TextField
                type='text'
                label={'lastName'}
                // className=' p-2 border w-full border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500'
                // wrapperClassName='text-sm font-medium text-start py-2 seller mr-1'
                required={true}
                id='lastName'
                name='lastName'
                register={register('lastName', {
                  required: true,
                })}
                error={errors.lastName}
                errorText={errors.lastName?.message || 'Please enter lastName'}
              />

              <TextField
                type='text'
                label={'phone'}
                // className=' p-2 border w-full border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500'
                // wrapperClassName='text-sm font-medium text-start py-2 seller ml-1'
                required={true}
                id='phone'
                name='phone'
                register={register('phone', {
                  required: true,
                  minLength: 10,
                  maxLength: 10,
                })}
                error={errors.phone}
                errorText={errors.phone?.message || 'Please enter a valid phone'}
              />
            </div>

            <DropdownField
              className=' p-2 border w-full border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500'
              labelStyle='style2'
              data={catData}
              labelKey='name'
              label={'businessType'}
              placeholder={'Select businessType'}
              valueKey='id'
              name='businessType'
              // onChange={handleCategoryChange}
              register={register('businessType')}
            />
            <DropdownField
              labelStyle='style2'
              className=' p-2 border w-full border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500'
              data={catData}
              labelKey='name'
              label={'Category'}
              placeholder={'Select category'}
              valueKey='id'
              name='category'
              // onChange={handleCategoryChange}
              register={register('category')}
            />

            <DropdownField
              labelStyle='style2'
              className=' p-2 border w-full border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500'
              data={catData}
              labelKey='name'
              label={'interest'}
              placeholder={'Select interest'}
              valueKey='id'
              name='interest'
              // onChange={handleCategoryChange}
              register={register('interest')}
            />
            {/* <button
              disabled={isSubmitting}
              className='mt-4 w-40 py-3 save-btn rounded-lg text-white font-semibold text-center'
              type='submit'
            >
              {isSubmitting ? 'Signing Up...' : 'Sign Up'}
            </button> */}
            <div className='px-2'>
              <Button
                type='submit'
                className='mt-2 h-10 flex justify-center items-center w-full py-3 save-btn rounded-lg text-white font-semibold text-center'
                label={isSubmitting ? 'Signing Up...' : 'Sign Up'}
                disabled={isSubmitting}
              />
            </div>
          </form>
          <div className='mt-1 text-sm flex justify-center'>
            <div>Already have an account.</div>
            <Link className='pointer underline pl-1 cursor-pointer' to={'/auth'}>
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

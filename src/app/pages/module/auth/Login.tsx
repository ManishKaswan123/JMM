import {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import companyLogo from '../../../../sr/img/company_logo.jpeg'
import {toast} from 'react-toastify'

import {useForm} from 'react-hook-form'
import TextField from 'sr/partials/widgets/widgets-components/form/TextField'
import handleSignIn from 'sr/utils/api/handleLogin'
import {Button} from 'sr/helpers'

type FormFields = {
  email: string
  password: string
}

export default function Signin() {
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  })

  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting, isSubmitSuccessful},
  } = useForm<FormFields>({mode: 'onBlur', reValidateMode: 'onSubmit', defaultValues: formValues})

  const handleSubmitForm = async (formData: any, e: any) => {
    let payload = {
      ...formData,
      source: 'email',
    }

    try {
      const res = await handleSignIn(payload)
      if (res.user) {
        toast.success('User logged in successfully')
        setTimeout(() => {
          window.location.href = '/dashboard'
        }, 1000)
      } else {
        toast.error('Login failed. Please check your credentials.')
      }
    } catch (error) {
      // toast.error('Error while logging in. Please try again')
    } finally {
      // This will allow the button to be enabled again
      setFormValues({
        ...formValues,
      })
    }
  }
  // console.log('errors are :', errors)

  return (
    <div className='bg-slate-300 h-screen flex justify-center items-center'>
      <div className='flex flex-col justify-center items-center'>
        <div className='rounded-lg bg-[#F7F7F7] px-4 py-2 w-80 '>
          <div className='image-container flex justify-center items-center'>
            <img src={companyLogo} alt='Company Logo' className='image' />
          </div>
          <div className='text-center font-bold text-4xl pt-1'>Login</div>
          <div className='text-center text-slate-500 text-md pt-2 px-4 pb-2'>
            Enter your credentials to access your account
          </div>
          <form onSubmit={handleSubmit(handleSubmitForm)}>
            <TextField
              type='text'
              label={'Email'}
              // className='p-2 border w-full border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500'
              // wrapperClassName='text-sm font-medium text-left py-2 seller'
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
              label={'Password'}
              // className='w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500'
              // wrapperClassName='text-sm font-medium text-start py-2 seller'
              required={true}
              id='password'
              name='password'
              minLength={8}
              register={register('password', {
                required: 'Password is required',
                minLength: {value: 8, message: 'Password must be at least 8 characters long'},
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message:
                    'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character',
                },
              })}
              error={errors.password}
              errorText={errors.password?.message || 'Please enter a valid password'}
            />
            <div className='px-2'>
              <Button
                disabled={isSubmitting}
                className='mt-4 h-10 flex justify-center items-center w-full py-3 save-btn rounded-lg text-white font-semibold text-center'
                type='submit'
                label={isSubmitting ? 'Logging In...' : 'Login'}
              ></Button>
            </div>
          </form>
          <div className='py-2 text-sm flex justify-center'>
            <div>Don't have an account?</div>
            <Link className='pointer underline pl-1 cursor-pointer' to={'/register'}>
              Register Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

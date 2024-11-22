import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {useForm, SubmitHandler} from 'react-hook-form'
import TextField from 'sr/partials/widgets/widgets-components/form/TextField'
import {changePassword} from 'sr/utils/api/changePassword'
import {toast} from 'react-toastify'

interface IFormInput {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm<IFormInput>()
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()
  const [firstName, setFirstName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [phone, setPhone] = useState<any>(null)
  const newPassword = watch('newPassword')
  const confirmPassword = watch('confirmPassword')

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    if (data.newPassword !== data.confirmPassword) {
      setError('New password and confirm new password do not match')
      return
    }

    try {
      const response = await changePassword({
        oldPassword: data.currentPassword,
        newPassword: data.newPassword,
      })

      if (response.status === 'success') {
        toast.success('Password changed successfully')
        setTimeout(() => navigate('/profile'), 2000)
      }
    } catch (error) {
      setError('Failed to change password')
    }
  }

  useEffect(() => {
    const userJson = localStorage.getItem('user')
    if (userJson) {
      try {
        const user = JSON.parse(userJson)
        if (user) {
          setFirstName(user?.firstName)
          setEmail(user?.email)
          setPhone(user?.phone)
        }
      } catch (error) {
        console.error('Error parsing user from localStorage', error)
      }
    }
  }, [])

  return (
    <div className='flex justify-center min-h-screen bg-gray-100'>
      <div className='flex w-full h-full max-w-5xl p-20 space-x-8 mt-[8%] bg-white rounded-lg shadow-lg'>
        <div className='flex flex-col items-center justify-center w-2/5'>
          <img
            alt='user'
            className='w-32 h-32 rounded-full'
            src='https://imgs.search.brave.com/cNx1HXxrqLpBTG-fGQarMwUE1kUXjzH72uA_la9V-f4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9i/ZWF1dGlmdWwtYW5p/bWUta2lkLWNhcnRv/b24tc2NlbmVfMjMt/MjE1MTAzNTI0Mi5q/cGc_c2l6ZT02MjYm/ZXh0PWpwZw'
          />
          <h2 className='mt-4 text-xl font-semibold'>{firstName}</h2>
          <p className='text-gray-600'>{email}</p>
          <p className='text-gray-600'>{phone}</p>
        </div>
        <div className='w-3/5'>
          <h1 className='text-2xl font-bold text-gray-700'>Change Password</h1>
          {error && <p className='text-red-500'>{error}</p>}
          {success && <p className='text-green-500'>{success}</p>}
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-4 mt-6'>
            <TextField
              label='Current Password'
              type={showPassword ? 'text' : 'password'}
              className='w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300'
              required={true}
              id='currentPassword'
              name='currentPassword'
              register={register('currentPassword', {required: true})}
              error={errors.currentPassword}
              errorText={errors.currentPassword?.message || 'Current password is required'}
            />
            <TextField
              label='New Password'
              type={showPassword ? 'text' : 'password'}
              className='w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300'
              required={true}
              id='newPassword'
              name='newPassword'
              register={register('newPassword', {required: true})}
              error={errors.newPassword}
              errorText={errors.newPassword?.message || 'New password is required'}
            />
            <TextField
              label='Confirm New Password'
              type={showPassword ? 'text' : 'password'}
              className='w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300'
              required={true}
              id='confirmPassword'
              name='confirmPassword'
              register={register('confirmPassword', {required: true})}
              error={errors.confirmPassword}
              errorText={errors.confirmPassword?.message || 'Confirm new password is required'}
            />
            <div className='flex justify-between mt-4'>
              <button
                type='button'
                className='px-4 py-2 font-semibold text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring focus:ring-gray-200'
                onClick={() => navigate('/profile')}
              >
                Close
              </button>
              <button
                type='submit'
                className='px-4 py-2 font-semibold text-white bg-green-500 rounded-md hover:bg-green-700 focus:outline-none focus:ring focus:ring-green-200'
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ChangePassword

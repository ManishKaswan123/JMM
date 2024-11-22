// import {useIntl} from 'react-intl'
// import {PageTitle} from 'sr/layout/master-layout'
import React, {useEffect, useRef, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {SendOTPAction} from 'sr/redux/slice/sendOtp'
import {userService} from 'sr/utils/api/authService'
import {toast} from 'react-toastify'
import Spinner from 'sr/layout/common/Spinner'
import {ACCESS_TOKEN_KEY, REDIRECT_URI_KEY, REFRESH_TOKEN_KEY} from 'sr/constants/common'
import {persistToken} from 'sr/utils/helper'
import {useAuth} from 'sr/context/AuthProvider'
// type Props = {}

const OtpPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [loader, setLoader] = useState(false)
  const response: any = useSelector((state) => state)
  const [isOtpVerify, setIsOtpVerify] = useState(false)
  const [authSuccess, setAuthSuccess] = useState(false)
  const [mobileNumber, setMobileNumber] = useState(false)
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const {isAuthReady, persistTokens} = useAuth()
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ]

  useEffect(() => {
    if (response.sendOtp.status === 'Success') {
      setMobileNumber(response.sendOtp.data.mobileNumber)
    } else {
      navigate('/auth')
    }
  }, [response])
  const handleChange = (index: any, value: any) => {
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)
    if (value && index < inputRefs.length - 1) {
      const nextInputRef = inputRefs[index + 1]?.current
      if (nextInputRef) {
        nextInputRef.focus()
      }
    }
  }

  const handleOtp = async (e: any) => {
    e.preventDefault()
    setLoader(true)
    const payLoad = {
      otp: otp.join(''),
      mobileNumber,
    }
    const data1 = await userService.login(payLoad)
    if (data1.status === 'Success') {
      const {accessToken, accessExpiresIn, refreshToken, refreshExpiresIn} = data1.results
      persistToken(ACCESS_TOKEN_KEY, accessToken, accessExpiresIn)
      persistToken(REFRESH_TOKEN_KEY, refreshToken, refreshExpiresIn)
      setAuthSuccess(true)
    }
    setLoader(false)
    // dispatch(ValidateOtpAction(payLoad))
  }

  const handleReSendOtp = async (e: any) => {
    e.preventDefault()
    setLoader(true)
    dispatch(SendOTPAction({mobileNumber})).then((data: any) => {
      setLoader(false)
    })
  }

  useEffect(() => {
    if (authSuccess) {
      persistTokens()
      navigate('/dashboard')
    }
  }, [authSuccess, navigate, persistTokens])

  return (
    <>
      <div className='container-fluid h-[100vh]'>
        {loader && <Spinner />}
        <h2 className='mt-20 ml-6 font-semibold text-2xl'>OTP Verification</h2>
        <div className='ml-6 mt-2  fw-5'>
          Please enter OTP sent to <b className='text-xs ml-2 text-tel'>+91 {mobileNumber}</b>
          <span
            onClick={() => navigate(`/auth`)}
            className='fa fa-pencil ml-3 text-lg text-[#219653] cursor-pointer'
          ></span>
        </div>
        <div className='mt-6 text-center'>
          <div className='otp-input'>
            {otp.map((value, index) => (
              <input
                key={index}
                ref={inputRefs[index]}
                type='tel'
                maxLength={1}
                value={value}
                onChange={(e) => handleChange(index, e.target.value)}
                className='otp-box'
              />
            ))}
          </div>
          <p className='resend-otp' onClick={handleReSendOtp}>
            Resend OTP
          </p>
        </div>
        <div className='text-center mt-8'>
          <button
            className='m-auto text-center w-80 py-3  register-btn rounded-lg text-white font-semibold '
            onClick={handleOtp}
          >
            Verify
          </button>
        </div>
      </div>
    </>
  )
}

export default function OtpWrapper() {
  // for using different languages and changing the text in to other languages
  // const intl = useIntl()
  return (
    <>
      {/* <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.DASHBOARD'})}</PageTitle> */}
      <OtpPage />
    </>
  )
}
function navigate(arg0: string) {
  throw new Error('Function not implemented.')
}

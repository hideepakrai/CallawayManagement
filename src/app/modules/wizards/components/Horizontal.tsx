import {FC, useEffect, useRef, useState} from 'react'
import {Step1} from './steps/Step1'
import {Step2} from './steps/Step2'
import {Step3} from './steps/Step3'
import {Step4} from './steps/Step4'
import {Step5} from './steps/Step5'
import {KTIcon} from '../../../../_metronic/helpers'
import {StepperComponent} from '../../../../_metronic/assets/ts/components'
import {Form, Formik, FormikValues} from 'formik'
import {createAccountSchemas, ICreateAccount, inits} from './CreateAccountWizardHelper'
import { Toolbar } from '../../../../_metronic/layout/components/toolbar/Toolbar'
import { Content } from '../../../../_metronic/layout/components/Content'

const Horizontal: FC = () => {
  const stepperRef = useRef<HTMLDivElement | null>(null)
  const [ stepper, setStepper ] = useState<StepperComponent | null>(null)
  const [currentSchema, setCurrentSchema] = useState(createAccountSchemas[0])
  const [initValues] = useState<ICreateAccount>(inits)
  const [isSubmitButton, setSubmitButton] = useState(false)

  const loadStepper = () => {
    setStepper(StepperComponent.createInsance(stepperRef.current as HTMLDivElement))
  }

  const prevStep = () => {
    if (!stepper) {
      return
    }

    stepper.goPrev()

    setCurrentSchema(createAccountSchemas[stepper.currentStepIndex - 1])

    setSubmitButton(stepper.currentStepIndex === stepper.totalStepsNumber)
  }

  const submitStep = (values: ICreateAccount, actions: FormikValues) => {
    if (!stepper) {
      return
    }

    if (stepper.currentStepIndex !== stepper.totalStepsNumber) {
      stepper.goNext()
    } else {
      stepper.goto(1)
      actions.resetForm()
    }

    setSubmitButton(stepper.currentStepIndex === stepper.totalStepsNumber)

    console.log(values);

    setCurrentSchema(createAccountSchemas[stepper.currentStepIndex - 1])
  }

  useEffect(() => {
    if (!stepperRef.current) {
      return
    }

    loadStepper()
  }, [stepperRef])

  return (
    <>
      
    </>
  )
}

export {Horizontal}

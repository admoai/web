'use client'
import Modal from '../../shared/Modal'
import { useAtom } from 'jotai'
import { formOpenAtom } from './formState'

export default function FormModal({ settings }) {
  const { mainMenu } = settings ?? {}
  const [isOpen, setOpen] = useAtom(formOpenAtom)
  return (
    <Modal
      isOpen={isOpen}
      setOpen={setOpen}
      className='flex justify-center items-center'
    >
      <div>Form Modal</div>
    </Modal>
  )
}

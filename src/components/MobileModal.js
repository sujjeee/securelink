import React from 'react'
import Sheet from 'react-modal-sheet';
import { useDispatch } from 'react-redux';
import { toggle } from '@/redux/reducers/bottomSheet';
import SecurityForm from './SecurityForm';


const MobileModal = ({ openModal }) => {
  const dispatch = useDispatch();

  return (
    <div className={openModal ? `fixed inset-0 flex justify-center items-center top-0 left-0 backdrop-blur-lg z-50` : ""}>
      <Sheet
        isOpen={openModal}
        onClose={() => dispatch(toggle())}
        detent="content-height" >
        <Sheet.Container>
          <Sheet.Header />
          <Sheet.Content>
            <SecurityForm />
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop />
      </Sheet>
    </div>
  )
}

export default MobileModal
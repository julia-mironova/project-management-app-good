import ConformForm from '../ConformForm';
import ModalWindow from '../ModalWindow';

type IConformModalWindowData = {
  isOpen: boolean;
  close: () => void;
  func: () => void;
};

const ConformModal = ({ isOpen, close, func }: IConformModalWindowData) => {
  const checkAnswer = (arg: boolean) => {
    console.log('Check answer: ', arg);
    close();
    console.log(arg);
    if (arg) {
      func();
    }
  };

  return (
    <ModalWindow open={isOpen} onClose={close}>
      <ConformForm choose={checkAnswer} />
    </ModalWindow>
  );
};

export default ConformModal;

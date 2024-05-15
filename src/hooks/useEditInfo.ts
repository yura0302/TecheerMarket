import { ModalType } from '@/pages/EditInfo';
import { useCallback, useState } from 'react';

interface EditInfoProps {
  type: ModalType;
}

const useEditInfo = ({ type }: EditInfoProps) => {
  const [oldValue, setOldValue] = useState<string>('');
  const [inputValue, setInputValue] = useState<string>('');
  const [typeErrorMessage, setTypeErrorMessage] = useState<string>('');
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  const checkEmail = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (!emailRegex.test(e.target.value)) {
      setTypeErrorMessage('이메일 형식이 아닙니다.');
      setIsCorrect(false);
    } else {
      setTypeErrorMessage('');
      setIsCorrect(true);
    }
  }, []);

  const checkPassword = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,15}$/;
    if (!passwordRegex.test(e.target.value)) {
      setTypeErrorMessage('비밀번호 형식이 아닙니다. 영문, 숫자 포함 8~15자로 입력해주세요.');
      setIsCorrect(false);
    } else {
      setTypeErrorMessage('');
      setIsCorrect(true);
    }
  }, []);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);

    if (type === 'email') checkEmail(e);
    if (type === 'password') checkPassword(e);
  };

  const handleChangeOldValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOldValue(e.target.value);
  };

  const isDisabled = () => {
    if (type === 'password') {
      return !(isCorrect && oldValue.length > 0 && inputValue.length > 0);
    }
    return !isCorrect;
  };

  return {
    oldValue,
    setOldValue,
    inputValue,
    setInputValue,
    typeErrorMessage,
    setTypeErrorMessage,
    isCorrect,
    setIsCorrect,
    handleChangeInput,
    handleChangeOldValue,
    isDisabled,
  };
};

export default useEditInfo;

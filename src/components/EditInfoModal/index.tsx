import React, { useCallback, useEffect, useState } from 'react';
import * as S from './styles';
import { IoClose } from 'react-icons/io5';
import { ModalType } from '@/pages/EditInfo';

interface Props {
  type: ModalType;
  onRequestClose?: () => void;
  updateInfo?: (type: string, newValue: string) => void;
}

const EditInfoModal = ({ type, onRequestClose, updateInfo }: Props) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [typeErrorMessage, setTypeErrorMessage] = useState<string>(''); // 에러 메시지
  const [isCorrect, setIsCorrect] = useState<boolean>(false); // 입력값이 올바른지 표시

  // 창을 닫을 때 초기화
  useEffect(() => {
    setInputValue('');
    setTypeErrorMessage('');
    setIsCorrect(false);
  }, [onRequestClose]);

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

  const handleUpdate = () => {
    if (updateInfo && type) {
      updateInfo(type, inputValue);
      onRequestClose && onRequestClose();
    }
  };

  return (
    <S.ModalOverlay>
      <S.ModalContainer>
        <S.BtnArea onClick={onRequestClose}>
          <IoClose size={20} />
        </S.BtnArea>

        <S.Container>
          <S.Label>변경할 {type === 'email' ? '이메일' : '비밀번호'}</S.Label>
          {type === 'email' && (
            <S.InputBox
              aria-label="email"
              name="email"
              placeholder="이메일을 입력해주세요."
              type="text"
              value={inputValue}
              onChange={handleChangeInput}
            />
          )}
          {type === 'password' && (
            <S.InputBox
              data-testid="password"
              name="password"
              placeholder="비밀번호를 입력해주세요."
              type="password"
              value={inputValue}
              onChange={handleChangeInput}
            />
          )}
          <S.ErrorMessage show={typeErrorMessage !== ''}>{typeErrorMessage}</S.ErrorMessage>
        </S.Container>

        <S.EditBtn onClick={handleUpdate} disabled={!isCorrect} aria-label="변경하기">
          변경하기
        </S.EditBtn>
      </S.ModalContainer>
    </S.ModalOverlay>
  );
};

export default EditInfoModal;

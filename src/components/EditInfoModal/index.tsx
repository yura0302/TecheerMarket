import { useEffect } from 'react';
import * as S from './styles';
import { IoClose } from 'react-icons/io5';
import { ModalType } from '@/pages/EditInfo';
import useEditInfo from '@/hooks/useEditInfo';

interface Props {
  type: ModalType;
  onRequestClose?: () => void;
  updateInfo?: (type: string, newValue: string, oldValue: string) => void;
}

const EditInfoModal = ({ type, onRequestClose, updateInfo }: Props) => {
  const {
    oldValue,
    setOldValue,
    inputValue,
    setInputValue,
    typeErrorMessage,
    setTypeErrorMessage,
    setIsCorrect,
    handleChangeInput,
    handleChangeOldValue,
    isDisabled,
  } = useEditInfo({ type });

  // 창을 닫을 때 초기화
  useEffect(() => {
    setInputValue('');
    setOldValue('');
    setTypeErrorMessage('');
    setIsCorrect(false);
  }, [onRequestClose]);

  const handleUpdate = () => {
    if (updateInfo && type) {
      updateInfo(type, inputValue, oldValue);
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
          <S.Label>{type === 'email' ? '이메일' : '비밀번호'} 변경</S.Label>
          {type === 'email' && (
            <S.InputContainer>
              <S.InputBox
                data-testid="oldPassword"
                name="password"
                placeholder="현재 비밀번호 입력"
                type="password"
                value={oldValue}
                onChange={handleChangeOldValue}
              />
              <S.InputBox
                aria-label="email"
                name="email"
                placeholder="새 이메일 입력"
                type="text"
                value={inputValue}
                onChange={handleChangeInput}
              />
            </S.InputContainer>
          )}
          {type === 'password' && (
            <S.InputContainer>
              <S.InputBox
                data-testid="oldPassword"
                name="password"
                placeholder="현재 비밀번호 입력"
                type="password"
                value={oldValue}
                onChange={handleChangeOldValue}
              />
              <S.InputBox
                data-testid="password"
                name="password"
                placeholder="새 비밀번호 입력"
                type="password"
                value={inputValue}
                onChange={handleChangeInput}
              />
            </S.InputContainer>
          )}
          <S.ErrorMessage show={typeErrorMessage !== ''}>{typeErrorMessage}</S.ErrorMessage>
        </S.Container>

        <S.EditBtn onClick={handleUpdate} disabled={isDisabled()} aria-label="변경하기">
          변경하기
        </S.EditBtn>
      </S.ModalContainer>
    </S.ModalOverlay>
  );
};

export default EditInfoModal;

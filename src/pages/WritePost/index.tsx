import React, { useState, useEffect, useCallback } from 'react';
import TopNavBar from '@/components/TopNavBar';
import * as S from './styles';
import { Link } from 'react-router-dom';
import NavBar from '@/components/BottomNavBar';
import uploadimage from '../../assets/uploadimg.svg';
import KakaoMap from '@/components/KakaoMap';
import { debounce } from 'lodash';
import { restFetcher } from '@/queryClient';
import NoImg from '../../assets/noImg.svg';
import { RxHamburgerMenu } from 'react-icons/rx';
import { IoSearchOutline } from 'react-icons/io5';
import { Row } from '../ItemUpadate/styles';

const WritePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [price, setPrice] = useState(0);
  const [isFree, setIsFree] = useState(false);
  const [productImages, setProductImages] = useState<File[]>([]);
  const [location, setLocation] = useState('');
  const [representativeImage, setRepresentativeImage] = useState<File | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    setUserId(storedUserId);
  }, []);

  // const [files, setFiles] = useState<File | null>(null);
  // const [fileUrl, setFileUrl] = useState('');

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (productImages.length >= 10) {
        alert('사진은 최대 10장까지 업로드 가능합니다.');
        return;
      }
      // 선택된 이미지가 대표 이미지면 해제
      if (representativeImage === file) {
        setRepresentativeImage(null);
      }
      if (productImages.length === 0) {
        setRepresentativeImage(file);
      }
      setProductImages((prevState) => [...prevState, file]);
    }
  };

  const handleSetRepresentativeImage = (imageFile: File) => {
    if (representativeImage === imageFile) {
      setRepresentativeImage(null); // 이미 대표 이미지인 경우 선택 해제
    } else {
      setRepresentativeImage(imageFile); // 다른 이미지를 선택한 경우 대표 이미지 변경
    }
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^0-9]/g, '');
    setPrice(parseInt(value));
  };

  const toggleFree = () => {
    setIsFree(true);
    setPrice(0); // 가격을 비웁니다.
  };
  const toggleSale = () => {
    setIsFree(false);
  };

  const debouncedSetLocation = useCallback(
    debounce((value) => setLocation(value), 1000),
    [],
  );

  const handleSubmit = async () => {
    if (!title || !categoryName || !content || !location) {
      alert('모든 항목을 입력해주세요.');
      return;
    }

    if (!isFree && (!price || price === 0)) {
      alert('판매 가격을 입력해주세요.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('categoryName', categoryName);
    formData.append('price', price.toString());
    formData.append('userId', userId ?? ''); // userId 추가

    console.log('userId 는????', userId); // userId 확인을 위한 로그

    // 사진이 있는 경우
    if (productImages.length > 0) {
      productImages.forEach((imageFile) => {
        formData.append('productImages', imageFile);
      });
    }

    // 사진이 없는 경우
    if (productImages.length === 0) {
      const noImgBlob = await fetch(NoImg).then((res) => res.blob());
      formData.append('productImages', noImgBlob);
    }

    formData.append('location', location);

    console.log('a');

    try {
      await restFetcher({
        method: 'POST',
        path: '/products',
        body: formData,
      });
      alert('게시물이 등록되었습니다.');
      window.location.href = '/'; // 메인 페이지로 리다이렉트
    } catch (error) {
      alert('게시물 등록에 실패했습니다.');
      console.log('등록실패', error);
    }
  };

  return (
    <S.Writepost>
      <S.NavContainer className="Nav">
        <TopNavBar page="게시물 작성"></TopNavBar>
        <S.Nav>
          <S.ClickArea>
            <Link to="/category">
              <RxHamburgerMenu style={{ width: '25px', height: '25px', color: '#fd8944' }} />
            </Link>
          </S.ClickArea>
          <S.ClickArea>
            <Link to="/search">
              <IoSearchOutline style={{ width: '25px', height: '25px', color: '#fd8944' }} />
            </Link>
          </S.ClickArea>
        </S.Nav>
      </S.NavContainer>

      <S.Wrap>
        <S.Img>
          <S.ImagesContainer>
            {' '}
            <label htmlFor="file-upload" className="upload-label" style={{ position: 'relative' }}>
              <span
                className="image-count"
                style={{
                  color: 'orange',
                  fontSize: '16px',
                }}
              >
                {productImages.length}
                <span style={{ fontSize: '16px', color: 'black' }}>/10</span>
              </span>
              <img
                src={uploadimage}
                alt="Upload Image"
                style={{ cursor: 'pointer', width: '130px', height: '130px' }}
              />
            </label>
            <input
              id="file-upload"
              type="file"
              accept="image/jpg,image/png,image/jpeg"
              onChange={handleFileInputChange}
              style={{ display: 'none' }}
            />
            {productImages.map((imageFile, index) => (
              <div key={index} style={{ position: 'relative', width: '130px', height: '130px' }}>
                <S.DeleteButton
                  onClick={() =>
                    setProductImages((prevState) => prevState.filter((file) => file !== imageFile))
                  }
                >
                  X
                </S.DeleteButton>
                <S.UploadedImg
                  key={index}
                  src={URL.createObjectURL(imageFile)}
                  alt="Uploaded Image"
                  style={{ cursor: 'pointer', width: '130px', height: '130px' }}
                  onClick={() => handleSetRepresentativeImage(imageFile)} // 이미지 클릭 시 대표 이미지로 설정
                />
                <button
                  onClick={() => handleSetRepresentativeImage(imageFile)}
                  style={{
                    position: 'absolute',
                    bottom: '0',
                    width: '100%',
                    height: '30%',
                    zIndex: 1,
                    backgroundColor: representativeImage === imageFile ? 'black' : 'transparent', // 대표 이미지가 설정된 경우 배경색 변경
                    color: representativeImage === imageFile ? 'white' : 'black', // 대표 이미지가 설정된 경우 텍스트 색상 변경
                    border: 'none',
                    borderBottomLeftRadius: representativeImage === imageFile ? '10.5px' : '0',
                    borderBottomRightRadius: representativeImage === imageFile ? '10.5px' : '0',
                    opacity: '0.8',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  {representativeImage === imageFile ? '대표 이미지' : ''}
                </button>
              </div>
            ))}
            {/* {productImages.length === 0 && (
                <img src={NoImg} alt="No Image" style={{ width: '130px', height: '130px' }} />
              )} */}
          </S.ImagesContainer>
        </S.Img>
        <S.Form>
          <S.Row>
            <S.Label>
              제목
              <S.Input
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={`제목`}
              />
            </S.Label>
          </S.Row>
          <S.Row>
            <S.Label>
              카테고리
              <S.Select
                name="categoryUuid"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              >
                <S.Option disabled value="">
                  카테고리 선택
                </S.Option>
                <S.Option value="디지털기기">디지털기기</S.Option>
                <S.Option value="여성의류">여성의류</S.Option>
                <S.Option value="남성의류/잡화">남성의류/잡화</S.Option>
                <S.Option value="뷰티/미용">뷰티/미용</S.Option>
                <S.Option value="여성잡화">여성잡화</S.Option>
                <S.Option value="생활가전">생활가전</S.Option>
                <S.Option value="생활/주방">생활/주방 </S.Option>
                <S.Option value="취미/게임/음반">취미/게임/음반</S.Option>
                <S.Option value="도서">도서</S.Option>
              </S.Select>
            </S.Label>
          </S.Row>

          <S.Row>
            <S.Label>가격</S.Label>
            <div
              style={{
                width: '100%',
                margin: '0.2rem 0 0.5rem 3rem',
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
              }}
            >
              <S.Button onClick={toggleSale} disabled={!isFree}>
                판매하기
              </S.Button>
              <S.Button onClick={toggleFree} disabled={isFree}>
                무료나눔
              </S.Button>
            </div>
            <S.Input
              name="price"
              value={`${price.toLocaleString()}`}
              onChange={handlePriceChange}
              disabled={isFree}
            />
          </S.Row>
        </S.Form>
        <S.Form>
          <S.Row>
            <S.Label>
              자세한 설명
              <S.TextArea
                name="description"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={`신뢰할 수 있는 거래를 위해 자세히 적어주세요`}
                style={{ color: 'black', fontSize: '15px' }}
              />
            </S.Label>
          </S.Row>
        </S.Form>
        <S.Row>
          <S.Label>
            거래 희망 장소
            <S.Input
              type="search"
              name="location"
              placeholder="거래 희망 장소를 입력해주세요."
              onChange={(e) => debouncedSetLocation(e.target.value)}
            ></S.Input>
            <S.Map>
              <KakaoMap location={location} />
            </S.Map>
          </S.Label>
        </S.Row>
        <S.UploadButton type="submit" onClick={handleSubmit}>
          작성 완료
        </S.UploadButton>
      </S.Wrap>
      <NavBar />
    </S.Writepost>
  );
};

export default WritePost;

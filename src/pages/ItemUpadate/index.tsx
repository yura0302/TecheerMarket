import React, { useState, useEffect, useCallback } from 'react';
import TopNavBar from '@/components/TopNavBar';
import * as S from './styles';
import { Link, useNavigate, useParams } from 'react-router-dom';
import uploadimage from '../../assets/uploadimg.svg';
import categoryBar from '../../assets/categoryBar.svg';
import searchBtn from '../../assets/Search.svg';
import KakaoMap from '@/components/KakaoMap';
import { restFetcher } from '@/queryClient';

const WritePost = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [price, setPrice] = useState(0);
  const [isFree, setIsFree] = useState(false);
  const [productImages, setProductImages] = useState<string[]>([]);
  const [location, setLocation] = useState('');
  const [representativeImage, setRepresentativeImage] = useState<string | null>(null); //대표이미지 선택

  console.log('productImages', productImages);

  const getProduct = async () => {
    try {
      const response = await restFetcher({
        method: 'GET',
        path: `/products/list/${productId}`,
      });
      console.log('check', response);

      const data = response.data;
      setTitle(data.title);
      setContent(data.content);
      setCategoryName(data.categoryName);
      setPrice(data.price);
      setProductImages(data.productImages);
      setRepresentativeImage(data.representativeImage);
      setLocation(data.location);
    } catch (error) {
      console.error('에러', error);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      const file = files[0];
      if (productImages.length >= 10) {
        alert('사진은 최대 10장까지 업로드 가능합니다.');
        return;
      }

      // 선택된 이미지가 대표 이미지면 해제
      if (representativeImage === URL.createObjectURL(file)) {
        setRepresentativeImage(null);
      }

      if (productImages.length === 0) {
        setRepresentativeImage(URL.createObjectURL(file));
      }
      setProductImages((prevState) => [...prevState, URL.createObjectURL(file)]);
    }
  };

  const handleSetRepresentativeImage = (imageFile: string) => {
    if (representativeImage === imageFile) {
      setRepresentativeImage(null); // 이미 대표 이미지인 경우 선택 해제
    } else {
      setRepresentativeImage(imageFile); // 다른 이미지를 선택한 경우 대표 이미지 변경
    }
  };

  const urlToBlob = async (imageFile: string) => {
    const response = await fetch(imageFile);
    const blob = await response.blob();

    return blob;
  };

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
    formData.append('isFree', isFree.toString());
    const blobPromises = productImages.map((imageFile) => urlToBlob(imageFile));
    const blobs = await Promise.all(blobPromises);
    for (let i = 0; i < blobs.length; i++) {
      formData.append('productImages', blobs[i]);
    }

    formData.append('location', location);

    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    try {
      await restFetcher({
        method: 'PUT',
        path: `/products/${productId}`,
        body: formData,
      });
      alert('게시물이 수정되었습니다.');
      navigate(`/item/${productId}`);
      window.location.href = '/';
    } catch (error) {
      alert('게시물 수정에 실패했습니다.');
      console.log(error);
    }
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^0-9]/g, ''); // 숫자만 허용
    setPrice(parseInt(value));
  };
  const toggleFree = () => {
    setIsFree(true);
    setPrice(0); // 가격을 비웁니다.
  };
  const toggleSale = () => {
    setIsFree(false);
  };

  const handleDeleteImage = (imageFile: string) => {
    console.log('Current productImages before deletion:', productImages);

    const newImages = productImages.filter((file) => file !== imageFile);
    console.log('Updated productImages after deletion:', newImages);

    setProductImages(newImages);

    if (representativeImage === imageFile) {
      setRepresentativeImage(newImages.length > 0 ? newImages[0] : null);
    }
  };

  return (
    <S.Writepost>
      <div className="navContainer">
        <TopNavBar page={`게시글 수정`} />
        <S.Nav>
          <Link to="/category">
            <img id="category" alt="To category" src={categoryBar}></img>
          </Link>
          <Link to="/search">
            <img id="search" alt="To search" src={searchBtn}></img>
          </Link>
        </S.Nav>
      </div>
      <S.Wrap>
        <S.Img>
          <S.ImagesContainer>
            <input
              id="file-upload"
              type="file"
              accept="image/jpg,image/png,image/jpeg,image/gif"
              onChange={handleFileInputChange}
              style={{ display: 'none' }}
            />
            <label htmlFor="file-upload" className="upload-label" style={{ position: 'relative' }}>
              <img
                src={uploadimage}
                alt="Upload Image"
                style={{ cursor: 'pointer', width: '130px', height: '130px' }}
              />
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
            </label>

            {productImages.map((imageFile, index) => (
              <div key={index} style={{ position: 'relative', width: '130px', height: '130px' }}>
                <S.DeleteButton onClick={() => handleDeleteImage(imageFile)}>X</S.DeleteButton>
                <S.UploadedImg
                  key={index}
                  src={imageFile}
                  alt="Uploaded Image"
                  style={{ cursor: 'pointer', width: '130px', height: '130px' }}
                  onClick={() => handleSetRepresentativeImage(imageFile)} // 이미지 클릭 시 대표 이미지로 설정
                />
                <button
                  onClick={() => handleSetRepresentativeImage(imageFile)}
                  style={{
                    position: 'absolute',
                    bottom: '1.5%',
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
        </S.Form>
        <S.Row>
          <S.Label>
            거래 희망 장소
            <S.Input
              type="search"
              name="location"
              placeholder="거래 희망 장소를 입력해주세요."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            ></S.Input>
            <S.Map>
              <KakaoMap location={location} />
            </S.Map>
          </S.Label>
        </S.Row>
        <S.UploadButton type="submit" onClick={handleSubmit}>
          수정 완료
        </S.UploadButton>
      </S.Wrap>
    </S.Writepost>
  );
};

export default WritePost;

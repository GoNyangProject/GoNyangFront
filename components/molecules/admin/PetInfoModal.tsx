import { useState } from 'react';
import {
    ButtonGroup,
    CloseButton,
    ContentBox,
    InfoGrid,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    PetImageHeader,
    PetTab,
    PetTabGroup,
} from '../../../styles/components/molecules/admin/PetInfoModal';
import Button from '../../atom/Button';
import { PetInfo } from '@/app/admin/reservation/page';

type PetInfoModalProps = {
    petList: PetInfo[];
    userName: string;
    onClose: () => void;
};

const PetInfoModal = ({ petList, userName, onClose }: PetInfoModalProps) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const selectedPet = petList[selectedIndex];

    if (!selectedPet) return null;
    if (!petList || petList.length === 0) {
        return (
            <ModalOverlay onClick={onClose}>
                <ModalContent onClick={(e) => e.stopPropagation()} style={{ width: '400px' }}>
                    <ModalHeader>
                        <h3>반려묘 정보 없음</h3>
                        <CloseButton onClick={onClose}>&times;</CloseButton>
                    </ModalHeader>
                    <div style={{ textAlign: 'center', padding: '40px 0', color: '#888' }}>
                        <div style={{ fontSize: '40px', marginBottom: '10px' }}>😿</div>
                        <p>{userName} 님은 등록된 반려묘가 없습니다.</p>
                    </div>
                    <ButtonGroup>
                        <Button width="100%" height="40px" backgroundColor="#eee" onClick={onClose}>
                            닫기
                        </Button>
                    </ButtonGroup>
                </ModalContent>
            </ModalOverlay>
        );
    }

    return (
        <ModalOverlay onClick={onClose}>
            <ModalContent onClick={(e) => e.stopPropagation()} style={{ width: '500px' }}>
                <ModalHeader>
                    <h3>{userName} 님의 반려묘 정보</h3>
                    <CloseButton onClick={onClose}>&times;</CloseButton>
                </ModalHeader>

                <PetTabGroup>
                    {petList.map((pet, index) => (
                        <PetTab key={index} active={selectedIndex === index} onClick={() => setSelectedIndex(index)}>
                            {pet.petName} 🐾
                        </PetTab>
                    ))}
                </PetTabGroup>

                <PetImageHeader>
                    {selectedPet.petImagePath ? (
                        <img src={selectedPet.petImagePath} alt={selectedPet.petName} />
                    ) : (
                        <img src="/images/account_placeholer_image.png" alt="기본 펫 이미지" />
                    )}
                </PetImageHeader>

                <InfoGrid>
                    <div className="item">
                        <strong>품종</strong> {selectedPet.catBreed}
                    </div>
                    <div className="item">
                        <strong>나이</strong> {selectedPet.petAge}세
                    </div>
                    <div className="item">
                        <strong>성별</strong> {selectedPet.petGender === 'M' ? '남아' : '여아'}
                    </div>
                    <div className="item">
                        <strong>등록일</strong> {selectedPet.createdAt?.substring(0, 10)}
                    </div>
                </InfoGrid>
                <div style={{ fontWeight: '700', marginBottom: '8px', fontSize: '14px', color: '#3E66FB' }}>
                    <span style={{ marginRight: '5px' }}>●</span> 고양이 특이사항 (주의사항)
                </div>
                <ContentBox style={{ minHeight: '100px' }}>
                    <div className="text">{selectedPet.catNotes || '등록된 특이사항이 없습니다.'}</div>
                </ContentBox>

                <ButtonGroup>
                    <Button width="80px" height="40px" backgroundColor="#eee" color="#333" onClick={onClose}>
                        닫기
                    </Button>
                </ButtonGroup>
            </ModalContent>
        </ModalOverlay>
    );
};

export default PetInfoModal;

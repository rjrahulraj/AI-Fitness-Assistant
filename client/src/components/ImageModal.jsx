import React from 'react';
import {
     Button,
     useDisclosure,
} from '@chakra-ui/react';

import {
     Modal,
     ModalOverlay,
     ModalContent,
     ModalCloseButton,
     ModalBody,
} from "@chakra-ui/react";

import food from '../assets/food.png';

export default function ImageModal() {
     const { isOpen, onOpen, onClose } = useDisclosure();

     return (
          <>
               <Button size="sm" onClick={onOpen}>Preview</Button>

               <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
                    <ModalOverlay />
                    <ModalContent>
                         <ModalCloseButton />
                         <ModalBody className="flex justify-center p-4">
                              <img src={food} alt="food" className="max-h-[70vh]" />
                         </ModalBody>
                    </ModalContent>
               </Modal>
          </>
     );
}

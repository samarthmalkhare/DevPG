import React, { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner';
import axios from 'axios';

import useCurrentUser from '@/hooks/useCurrentUser'
import useUser from '@/hooks/useUser';
import useEditModal from '@/hooks/useEditModal';
import Modal from '../Modal';
import Input from '../Input';
import ImageUpload from '../ImageUpload';

const EditModal = () => {
  const { data: currentUser } = useCurrentUser();
  const { mutate: mutateFetchedUser } = useUser(currentUser?.id);
  const editModal = useEditModal();

  const [profileImage, setProfileImage] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');

  useEffect(() => {
    setProfileImage(currentUser?.profileImage);
    setCoverImage(currentUser?.coverImage);
    setName(currentUser?.name);
    setUsername(currentUser?.username);
    setBio(currentUser?.bio);
  }, [currentUser]);

  const [isLodaing , setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      await axios.patch('/api/edit', {
        name,
        username,
        bio,
        profileImage,
        coverImage
      });
      mutateFetchedUser();

      toast.success('Updated');

      editModal.onClose();
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }, [bio, name, username, profileImage, coverImage, editModal, mutateFetchedUser]);

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <ImageUpload
      value={profileImage}
      disabled={isLodaing}
      onChange={(image) => setProfileImage(image)}
      label='Upload profile image'
      />
      <ImageUpload
      value={coverImage}
      disabled={isLodaing}
      onChange={(image) => setCoverImage(image)}
      label='Upload cover image'
      />
      <Input
        placeholder='Name'
        onChange={(e) => setName(e.target.value)}
        value={name}
        disabled={isLodaing}
      />
      <Input
        placeholder='Username'
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        disabled={isLodaing}
      />
      <Input
        placeholder='Bio'
        onChange={(e) => setBio(e.target.value)}
        value={bio}
        disabled={isLodaing}
      />
    </div>
  )

  return (
    <Modal 
      disabled={isLodaing}
      isOpen={editModal.isOpen}
      title='Edit your profile'
      actionLabel='Save'
      onClose={editModal.onClose}
      onSumbit={onSubmit}
      body={bodyContent}
    />
  );
}

export default EditModal;
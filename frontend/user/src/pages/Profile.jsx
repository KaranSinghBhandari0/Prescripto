import React, { useContext, useEffect, useState } from 'react';
import ProfileView from '../components/ProfileView';
import ProfileEditForm from '../components/ProfileEditForm';

import { StateContext } from '../context/StateContext';

export default function ProfileContainer() {
  const { user } = useContext(StateContext)

  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      {user && 
        <div className='w-full max-w-4xl mx-auto p-6'>
          <p className='text-4xl font-semibold text-center mb-8'>My Profile</p>
    
          {!isEditing ? (
            <ProfileView setIsEditing={setIsEditing} />
          ) : (
            <ProfileEditForm setIsEditing={setIsEditing} />
          )}
        </div>
      }
    </>
  );
}

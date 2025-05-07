import React from 'react';

const AccountInfo = ({ user }) => {
  return (
    <div className="bg-white p-6 rounded-md shadow">
      <h2 className="text-xl font-medium mb-6">Account Info</h2>
      
      <div className="flex items-start">
        {user.avatar && (
          <div className="w-12 h-12 mr-4">
            <img src={user.avatar} alt={`${user.firstName} ${user.lastName}`} className="w-full h-full object-cover rounded" />
          </div>
        )}
        <div className="text-xl font-medium text-pink-500">{user.firstName} {user.lastName}</div>
      </div>
      
      <div className="mt-6 space-y-4">
        <div className="flex">
          <div className="w-24 text-orange-400">
            <svg className="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"></path>
            </svg>
            UserID
          </div>
          <div>{user.userId}</div>
        </div>
        
        <div className="flex">
          <div className="w-24 text-orange-400">
            <svg className="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
            Username
          </div>
          <div>{user.username}</div>
        </div>
        
        <div className="flex">
          <div className="w-24 text-orange-400">
            <svg className="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
            Email
          </div>
          <div>{user.email}</div>
        </div>
        
        <div className="flex">
          <div className="w-24 text-orange-400">
            <svg className="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
            </svg>
            Phone
          </div>
          <div>{user.phone || 'Not provided'}</div>
        </div>
        
        <div className="flex">
          <div className="w-24 text-orange-400">
            <svg className="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            Location
          </div>
          <div>{user.location || 'Not provided'}</div>
        </div>
        
        <div className="flex">
          <div className="w-24 text-orange-400">
            <svg className="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            Joined
          </div>
          <div>{user.joinDate}</div>
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;
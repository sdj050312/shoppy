function User({ user }) {
  // user 객체가 없을 경우 기본값을 설정
  const { photoURL = '', displayName = '' } = user || {};

  return (
    <div className=" flex-col justify-center items-center w-30 h-30 " >
    <div className="w-16 h-16 object-cover rounded-full overflow-hidden flex justify-center items-center ">
      <img src={photoURL}  className="w-full h-full"/>
    </div>
      <span className="text-xs">{displayName}</span>
      </div>
  );
}

export default User;

import React, { useContext } from "react";
import { Context } from "../usecontext/Usecontext";
import ProfilePost from "../components/ProfilePost";

function ProfilePage() {
  const { setUseronline, useronline } = useContext(Context);
  return (
    <div className="text-white ">
      <img
        onClick={() => triggerFileInput()}
        className="max-h-48 w-full"
        src={useronline.themeimgurl}
        alt="background photo"
      />

      <img
        onClick={() => triggerFileInput2()}
        className="m-4 rounded-full h-10 me-3 sm:h-32  transform -translate-y-16"
        src={useronline.userimgurl}
        alt="profile photo"
      />
      <h1 className="-translate-y-12">{useronline.username}</h1>
      <h1 className="-translate-y-9">{useronline.bio}</h1>
      <hr />

      <ProfilePost useronline={useronline} />
    </div>
  );
}

export default ProfilePage;

"use client";

import React, { useEffect, useState, useTransition } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import crypto from "crypto";
import { saveNewAvatar } from "@/lib/supabase/mutation";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";

type ProfileAvatarProps = {
  username?: string;
  avatarUrl?: string | null;
  isOnTimeline?: boolean;
  width?: string;
};

const ProfileAvatar = ({
  username,
  avatarUrl,
  isOnTimeline = false,
  width
}: ProfileAvatarProps) => {
  const [profileImage, setProfileImage] = useState("");

  const supabase = createPagesBrowserClient();

  let [isMutationLoading, startTransition] = useTransition();

  const uploadAvatar = async (file: File | null) => {
    if (file) {
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        return toast.error("please sign in");
      }

      if (data.user.user_metadata.username !== username) {
        return toast.error("you can only change your profile pic");
      }

      setProfileImage(URL.createObjectURL(file));

      const newFilePath = `/public/${data.user.id}-${crypto.randomBytes(20).toString('hex')}`;

      const { data: uploadedRes, error: UploadError } = await supabase.storage
        .from("avatars")
        .upload(newFilePath, file);

      if (UploadError) {
        return toast.error(UploadError.message);
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from("avatars").getPublicUrl(newFilePath);

      setProfileImage(publicUrl);

      startTransition(() =>
        saveNewAvatar({ publicUrl, profileId: data.user.id })
      );
    }
  };

  useEffect(() => {
    return () => {
      if (profileImage !== "") {
        URL.revokeObjectURL(profileImage);
      }
    };
  }, [profileImage]);

  return (
    // <div>
      <div className="relative w-fit">
        {/* {!isOnTimeline && (
          <input
            type="file"
            name="user-avatar"
            id="user-avatar"
            className="invisible absolute"
            accept="image/jpeg,image/png,image/jpg,image/gif"
            onChange={(e) => uploadAvatar(e.target.files && e.target.files[0])}
            disabled={isMutationLoading}
          />
        )}
        <label
          htmlFor={isOnTimeline ? "" : "user-avatar"}
          className={!isOnTimeline ? "cursor-pointer" : ""}
        > */}
          <Avatar className={width || "w-10 h-10"}>
            {profileImage !== "" ? (
              <AvatarImage
                src={profileImage}
                alt={`@${username}`}
                className="object-cover bg-center"  
              />
            ) : (
              <AvatarImage
                src={avatarUrl || ""}
                alt={`@${username}`}
                className="object-cover bg-center"
              />
            )}
            <AvatarFallback className="text-black font-semibold">
              {username
                ? `${username[0]}${username[1]}`
                : ""}
            </AvatarFallback>
          </Avatar>
        {/* </label> */}
      {/* </div> */}
    </div>
  );
};

export default ProfileAvatar;
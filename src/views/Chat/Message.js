import React from "react";
import { formatRelative } from "date-fns";

export default function Message({
  createdAt = null,
  text = "",
  displayName = "",
  photoURL = "",
}) {
  return (
    <div>
      {photoURL ? (
        <img src={photoURL} alt="ProfPic" width={30} height={30} />
      ) : null}

      {displayName ? <p>{displayName}</p> : null}

      {createdAt?.seconds ? (
        <span>
          {formatRelative(new Date(createdAt.seconds * 1000), new Date())}
        </span>
      ) : null}
      <p>{text}</p>
    </div>
  );
}

import React from "react";

export default function DoctorCard({doctor}) {
  return (
    <>
      <p>{doctor.name}</p>
      <p>{doctor.speciality}</p>
    </>
  );
}

import React from "react";



import DossierMedical from "../DossierMedical.js";
import CardDossierMedical from "components/Cards/CardDossierMedical.js";

export default function dossierMedical() {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-8/12 px-4">
          <DossierMedical />
        </div>
        <div className="w-full lg:w-4/12 px-4">
          <CardDossierMedical />
        </div>
      </div>
    </>
  );
}

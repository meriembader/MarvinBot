import React from "react";


import CardTable from "components/Cards/CardTable.js";

import Card from "components/Cards/Card";
import CardDiscussion from "components/Cards/CardDiscussion";
import CardOpinion from "components/Cards/CardOpinion";
import CardTableHospital from "components/Cards/CardTableHospital";

export default function Tables() {
  return (
    <>
 
      <div className="flex flex-wrap mt-4">


     

        <div className="w-full mb-12 px-4">
          <CardTable />
        </div>

       
      </div>
    </>
  );
}

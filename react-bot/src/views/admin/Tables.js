import React from "react";


import CardTable from "components/Cards/CardTable.js";

import Card from "components/Cards/Card";
import CardDiscussion from "components/Cards/CardDiscussion";
import CardOpinion from "components/Cards/CardOpinion";

export default function Tables() {
  return (
    <>
 
      <div className="flex flex-wrap mt-4">


        <table >
          <th >
            <div className="w-wrap mb-6 px-2">
              <Card />
            </div>
          </th>
          <th>
            <div className="w-wrap mb-6 px-2">
              <CardOpinion />
            </div>
          </th>
          <th><div className="w-wrap mb-12 px-2">
            <CardDiscussion />
          </div></th>
        </table>

        <div className="w-full mb-12 px-4">
          <CardTable />
        </div>



      </div>
    </>
  );
}

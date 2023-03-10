import {
    fChild,
    ffChild,
    fffChild,
    fsChild,
    sChild,
    sfChild,
    ssChild,
    sffChild,
    sfffChild,
    ssffChild,
    ffffChild,
  } from "../data/ChildrenData";

//Probabilities
export const digitalProb = () => parseFloat(localStorage.getItem("tpValue: " + fChild()));

export const dAEATProb = () => parseFloat(
    localStorage.getItem("tpValue: " + ffChild() + " - " + fChild())
  );

  export const dAEATHospProb = () => parseFloat(localStorage.getItem(
      "tpValue: " + fffChild() + " - " + ffChild() + " - " + fChild()
    )
  );

  export const dAEATHospDeadProb = () => parseFloat(localStorage.getItem("tpValue: " + ffffChild() + " - " + ffChild())
  );

  export const dIEATHospProb = () => parseFloat(localStorage.getItem(
      "tpValue: " + fffChild() + " - " + fsChild() + " - " + fChild()
    )
  );

  export const dIEATHospDeadProb = () => parseFloat(localStorage.getItem("tpValue: " + ffffChild() + " - " + fsChild())
  );

  export const cpProb = () => parseFloat(1 - localStorage.getItem("tpValue: " + fChild()));
  
  export const cpAEATProb = () => parseFloat(
    localStorage.getItem("tpValue: " + sfChild() + " - " + sChild())
  );
  
  export const cpAEATHospProb = () => parseFloat(
    localStorage.getItem(
      "tpValue: " + fffChild() + " - " + sfChild() + " - " + sChild()
    )
  );

  export const cpAEATHospDeadProb = () => parseFloat(
    localStorage.getItem("tpValue: " + ffffChild() + " - " + sfChild())
  );
  
  export const cpIEATHospProb = () => parseFloat(
    localStorage.getItem(
      "tpValue: " + sffChild() + " - " + ssChild() + " - " + sChild()
    )
  );

  export const cpIEATHospDeadProb = () => parseFloat(
    localStorage.getItem("tpValue: " + ffffChild() + " - " + ssChild())
  );

  export const dDead = () =>
    digitalProb() * dAEATProb() * dAEATHospProb() * dAEATHospDeadProb() +
    digitalProb() * dAEATProb() * (1 - dAEATHospProb()) * dAEATHospDeadProb() +
    digitalProb() * (1 - dAEATProb()) * dIEATHospProb() * dIEATHospDeadProb() +
    digitalProb() * (1 - dAEATProb()) * (1 - dIEATHospProb()) * dIEATHospDeadProb();

  export const dAlive = () =>
    digitalProb() * dAEATProb() * dAEATHospProb() * (1 - dAEATHospDeadProb()) +
    digitalProb() * dAEATProb() * (1 - dAEATHospProb()) * (1 - dAEATHospDeadProb()) +
    digitalProb() * (1 - dAEATProb()) * dIEATHospProb() * (1 - dIEATHospDeadProb()) +
    digitalProb() *
      (1 - dAEATProb()) *
      (1 - dIEATHospProb()) *
      (1 - dIEATHospDeadProb());

  export const cpDead = () =>
    cpProb() * cpAEATProb() * cpAEATHospProb() * cpAEATHospDeadProb() +
    cpProb() * cpAEATProb() * (1 - cpAEATHospProb()) * cpAEATHospDeadProb() +
    cpProb() * (1 - cpAEATProb()) * cpIEATHospProb() * cpIEATHospDeadProb() +
    cpProb() * (1 - cpAEATProb()) * (1 - cpIEATHospProb()) * cpIEATHospDeadProb();

  export const cpAlive = () =>
    cpProb() * cpAEATProb() * cpAEATHospProb() * (1 - cpAEATHospDeadProb()) +
    cpProb() * cpAEATProb() * (1 - cpAEATHospProb()) * (1 - cpAEATHospDeadProb()) +
    cpProb() * (1 - cpAEATProb()) * cpIEATHospProb() * (1 - cpIEATHospDeadProb()) +
    cpProb() * (1 - cpAEATProb()) * (1 - cpIEATHospProb()) * (1 - cpIEATHospDeadProb());

    //Costs
//digital Cost
export const digitalCost = () => parseFloat(localStorage.getItem("cValue: " + fChild()));
//Drug AEAT cost - value * 12.99
export const drugAEATCost = () => parseFloat(localStorage.getItem(("cValue: Drug - " + ffChild()))*12.99);
//Hospital Admin - value * 7 days
export const dAEATHospCost = () => parseFloat(localStorage.getItem(("cValue: " + fffChild()))*7);

//Hospital Admin - value * 15 days - digital IEAT
export const dIEATHospCost = () => parseFloat(localStorage.getItem(("cValue: " + fffChild()))*15);

//Drug IEAT - value *14
export const drugIEATCost = () => parseFloat(localStorage.getItem(("cValue: Drug - " + fsChild()))*14);

//Current pathway
export const cpCost = () => parseFloat(localStorage.getItem("cValue: " + sChild()));


//Utilities -- not set up yet
export const utilitiesALive = () => parseFloat(localStorage.getItem("uValue: QoL Alive/With clinical response/cured: "));

 
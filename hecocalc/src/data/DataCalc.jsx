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
//CP Costs
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
   //Digital Probabilities
export const dDigAEATHpProb = () =>
digitalProb() * dAEATProb() * dAEATHospProb() * dAEATHospDeadProb();
export const aDigAEATHpProb  = () =>
digitalProb() * dAEATProb() * dAEATHospProb() * (1 - dAEATHospDeadProb());
export const dDigAEATNonHpProb  = () =>
digitalProb() * dAEATProb() * (1 - dAEATHospProb()) * dAEATHospDeadProb();
export const aDigAEATNonHpProb  = () =>
digitalProb() *
dAEATProb() *
(1 - dAEATHospProb()) *
(1 - dAEATHospDeadProb());
export const dDigIEATHpProb  = () =>
digitalProb() * (1 - dAEATProb()) * dIEATHospProb() * dIEATHospDeadProb();

//X
export const aDigIEATHpProb  = () =>
digitalProb() *
(1 - dAEATProb()) *
dIEATHospProb() *
(1 - dIEATHospDeadProb());


export const dDigIEATNonHpProb  = () =>
digitalProb() *
(1 - dAEATProb()) *
(1 - dIEATHospProb()) *
dIEATHospDeadProb();
export const aDigIEATNonHpProb  = () =>
digitalProb() *
(1 - dAEATProb()) *
(1 - dIEATHospProb()) *
(1 - dIEATHospDeadProb());
//Current Pathway Probabilities
export const dCpAEATHpProb  = () =>
cpProb() * cpAEATProb() * cpAEATHospProb() * cpAEATHospDeadProb();
export const aCpAEATHpProb  = () =>
cpProb() * cpAEATProb() * cpAEATHospProb() * (1 - cpAEATHospDeadProb());
export const dCpAEATNonHpProb  = () =>
cpProb() * cpAEATProb() * (1 - cpAEATHospProb()) * cpAEATHospDeadProb();
export const aCpAEATNonHpProb  = () =>
cpProb() *
cpAEATProb() *
(1 - cpAEATHospProb()) *
(1 - cpAEATHospDeadProb());
export const dCpIEATHpProb  = () =>
cpProb() * (1 - cpAEATProb()) * cpIEATHospProb() * cpIEATHospDeadProb();
export const aCpIEATHpProb  = () =>
cpProb() *
(1 - cpAEATProb()) *
cpIEATHospProb() *
(1 - cpIEATHospDeadProb());
export const dCpIEATNonHpProb  = () =>
cpProb() *
(1 - cpAEATProb()) *
(1 - cpIEATHospProb()) *
cpIEATHospDeadProb();
export const aCpIEATNonHpProb  = () =>
cpProb() *
(1 - cpAEATProb()) *
(1 - cpIEATHospProb()) *
(1 - cpIEATHospDeadProb());
//Digital Cost
export const costDigitalAEAT  = () =>digitalCost() + drugAEATCost() + dAEATHospCost();
export const costDigitalAEATNon  = () => digitalCost() + drugAEATCost();
export const costDigitalIEAT  = () => digitalCost() + drugIEATCost() + dAEATHospCost();
export const costDigitalIEATNon  = () =>digitalCost() + drugIEATCost();
//Current pathway Cost
export const costCpAEAT  = () =>cpCost() + drugAEATCost() + dAEATHospCost();
export const costCpAEATNon  = () => cpCost() + drugAEATCost();
export const costCpIEAT  = () => cpCost() + drugIEATCost() + dAEATHospCost();
export const costCpIEATNon  = () => cpCost() + drugIEATCost();

 //Excpected costs for Digital
 export const dECDigitalAeatHos =()=> dDigAEATHpProb()*costDigitalAEAT();
 export const aECDigitalAeatHos  =()=> aDigAEATHpProb()*costDigitalAEAT();
 export const dECDigitalAeatNon  =()=>  dDigAEATNonHpProb()*costDigitalAEATNon();
 export const aECDigitalAeatNon  =()=>  aDigAEATNonHpProb()*costDigitalAEATNon();
 export const dECDigitalIeatHos  =()=>  dDigIEATHpProb()*costDigitalIEAT();
 export const aECDigitalIeatHos  =()=>  aDigIEATHpProb()*costDigitalIEAT();
 export const dECDigitalIeatNon  =()=>  dDigIEATNonHpProb()*costDigitalIEATNon(); //XXXX
 export const aECDigitalIeatNon  =()=>  aDigIEATNonHpProb()*costDigitalIEATNon();

 //SUM of all expected costs in digital
 export const sumECDigital =()=>  dECDigitalAeatHos()+
 aECDigitalAeatHos()+
 dECDigitalAeatNon()+
 aECDigitalAeatNon()+
 dECDigitalIeatHos()+
 aECDigitalIeatHos()+
 dECDigitalIeatNon()+
 aECDigitalIeatNon;

 //SUM of all expected costs in CP

 export const sumECCurrentP =()=> dECCurrentPAeatHos()+
 aECCurrentPAeatHos()+
 dECCurrentPAeatNon()+
 aECCurrentPAeatNon()+
 dECCurrentPIeatHos()+
 aECCurrentPIeatHos()+
 dECCurrentPIeatNon()+
 aECCurrentPIeatNon;
 //Expected costs for Current Pathway
 export const dECCurrentPAeatHos  =()=>  dCpAEATHpProb()*costCpAEAT();
 export const aECCurrentPAeatHos  =()=>  aCpAEATHpProb()*costCpAEAT();
 export const dECCurrentPAeatNon  =()=>  dCpAEATNonHpProb()*costCpAEATNon();
 export const aECCurrentPAeatNon  =()=>  aCpAEATNonHpProb()*costCpAEATNon();
 export const dECCurrentPIeatHos  =()=>  dCpIEATHpProb()*costCpIEAT();
 export const aECCurrentPIeatHos  =()=>  aCpIEATHpProb()*costCpIEAT();
 export const dECCurrentPIeatNon  =()=>  dCpIEATNonHpProb()*costCpIEATNon();  //XXX
 export const aECCurrentPIeatNon  =()=>  aCpIEATNonHpProb()*costCpIEATNon();




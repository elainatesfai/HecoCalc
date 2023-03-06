import React, { useState, useEffect } from "react";
import Tree from "react-d3-tree";
import "../css/decisiontree.css";
import treeData from "../json/treeData.json";
import Navbar from "../components/Navbar";
import EditTree from "../components/EditTree";
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
} from "../data/ChildrenData";

export default function TreeGraph() {
  const [editBtn, setEditBtn] = useState(true);

  const toggleEditButton = () => {
    setEditBtn(!editBtn);
  };

  let treeDataDisplayed = JSON.stringify(treeData);

  let changedData = JSON.parse(treeDataDisplayed);

  const getStorageData = (keyName, defaultValue) => {
    const savedItem = localStorage.getItem(keyName);
    const parsedItem = JSON.parse(savedItem);
    return parsedItem || defaultValue;
  };

  const useLocalStorage = (keyName, initialValue) => {
    const [value, setValue] = useState(() => {
      return getStorageData(keyName, initialValue);
    });

    useEffect(() => {
      localStorage.setItem(keyName, value);
    }, [keyName, value]);

    return [value, setValue];
  };

  // FIRST CHILD
  const prob1 = localStorage.getItem("tpValue: " + fChild());

  //First child's first child
  const prob2 = localStorage.getItem(
    "tpValue: " + ffChild() + " - " + fChild()
  );

  //First child's first child's first child
  const prob3 = localStorage.getItem(
    "tpValue: " + fffChild() + " - " + ffChild() + " - " + fChild()
  );

  //First child's second child's first child
  const prob4 = localStorage.getItem(
    "tpValue: " + fffChild() + " - " + fsChild() + " - " + fChild()
  );

  //Second child's first child
  const prob5 = localStorage.getItem(
    "tpValue: " + sfChild() + " - " + sChild()
  );

  //Second child's first child's first child
  const prob6 = localStorage.getItem(
    "tpValue: " + sffChild() + " - " + sfChild() + " - " + sChild()
  );

  //Second child's second child's first child
  const prob7 = localStorage.getItem(
    "tpValue: " + sffChild() + " - " + ssChild() + " - " + sChild()
  );

  //First child's first child's first child's first child
  const prob8 = localStorage.getItem(
    "tpValue: " + sfffChild() + " - " + sfChild()
  );

  const prob9 = localStorage.getItem(
    "tpValue: " + ssffChild() + " - " + ssChild()
  );

  const cost1 = localStorage.getItem("cValue: " + fffChild());

  const cost2 = localStorage.getItem("cValue: " + fChild());

  const cost3 = localStorage.getItem("cValue: " + sChild());

  const cost4 = localStorage.getItem("cValue: Drug - " + ffChild());

  const cost5 = localStorage.getItem("cValue: Drug - " + fsChild());

  const days1 = localStorage.getItem("dValue: LOS - " + ffChild());
  const days2 = localStorage.getItem("dValue: LOS - " + fsChild());
  const days3 = localStorage.getItem(
    "dValue: Total duration of antibiotics (d) - " + ffChild()
  );
  const days4 = localStorage.getItem(
    "dValue: Total duration of antibiotics (d) - " + fsChild()
  );

  //------------------------First Child------------------------
  changedData[0].children[0].attributes.Prob = Math.round(prob1 * 100) / 100;
  changedData[0].children[1].attributes.Prob =
    Math.round((1 - prob1) * 100) / 100;

  //------------------------First child's first child------------------------
  changedData[0].children[0].children[0].attributes.Prob =
    Math.round(prob2 * 100) / 100;
  changedData[0].children[0].children[1].attributes.Prob =
    Math.round((1 - prob2) * 100) / 100;

  //------------First child's first child's first child------------
  changedData[0].children[0].children[0].children[0].attributes.Prob =
    Math.round(prob3 * 100) / 100;
  changedData[0].children[0].children[0].children[1].attributes.Prob =
    Math.round((1 - prob3) * 100) / 100;

  //------------First child's second child's first child------------
  changedData[0].children[0].children[1].children[0].attributes.Prob =
    Math.round(prob4 * 100) / 100;
  changedData[0].children[0].children[1].children[1].attributes.Prob =
    Math.round((1 - prob4) * 100) / 100;

  //------------Second child's first child------------
  changedData[0].children[1].children[0].attributes.Prob =
    Math.round(prob5 * 100) / 100;
  changedData[0].children[1].children[1].attributes.Prob =
    Math.round((1 - prob5) * 100) / 100;

  //------------Second child's first child's first child------------
  changedData[0].children[1].children[0].children[0].attributes.Prob =
    Math.round(prob6 * 100) / 100;
  changedData[0].children[1].children[0].children[1].attributes.Prob =
    Math.round((1 - prob6) * 100) / 100;

  //------------Second child's second child's first child------------
  changedData[0].children[1].children[1].children[0].attributes.Prob =
    Math.round(prob7 * 100) / 100;
  changedData[0].children[1].children[1].children[1].attributes.Prob =
    Math.round((1 - prob7) * 100) / 100;

  //------------Calculating Dead and Alive for first child's first child------------
  changedData[0].children[0].children[0].children[0].children[0].attributes.Prob =
    Math.round(prob8 * 100) / 100;

  changedData[0].children[0].children[0].children[0].children[1].attributes.Prob =
    Math.round((1 - prob8) * 100) / 100;

  changedData[0].children[0].children[0].children[1].children[0].attributes.Prob =
    Math.round(prob8 * 100) / 100;

  changedData[0].children[0].children[0].children[1].children[1].attributes.Prob =
    Math.round((1 - prob8) * 100) / 100;

  changedData[0].children[1].children[0].children[0].children[0].attributes.Prob =
    Math.round(prob8 * 100) / 100;

  changedData[0].children[1].children[0].children[0].children[1].attributes.Prob =
    Math.round((1 - prob8) * 100) / 100;

  changedData[0].children[1].children[0].children[1].children[0].attributes.Prob =
    Math.round(prob8 * 100) / 100;

  changedData[0].children[1].children[0].children[1].children[1].attributes.Prob =
    Math.round((1 - prob8) * 100) / 100;

  //------------Calculating Dead and Alive for first child's second child------------
  changedData[0].children[0].children[1].children[0].children[0].attributes.Prob =
    Math.round(prob9 * 100) / 100;

  changedData[0].children[0].children[1].children[0].children[1].attributes.Prob =
    Math.round((1 - prob9) * 100) / 100;

  changedData[0].children[0].children[1].children[1].children[0].attributes.Prob =
    Math.round(prob9 * 100) / 100;

  changedData[0].children[0].children[1].children[1].children[1].attributes.Prob =
    Math.round((1 - prob9) * 100) / 100;

  changedData[0].children[1].children[1].children[0].children[0].attributes.Prob =
    Math.round(prob9 * 100) / 100;

  changedData[0].children[1].children[1].children[0].children[1].attributes.Prob =
    Math.round((1 - prob9) * 100) / 100;

  changedData[0].children[1].children[1].children[1].children[0].attributes.Prob =
    Math.round(prob9 * 100) / 100;

  changedData[0].children[1].children[1].children[1].children[1].attributes.Prob =
    Math.round((1 - prob9) * 100) / 100;

  //------------------------COSTS * DAYS------------------------
  changedData[0].children[0].children[0].children[0].attributes.Cost =
    Math.round(cost1 * days1 * 100) / 100;
  changedData[0].children[1].children[0].children[0].attributes.Cost =
    Math.round(cost1 * days1 * 100) / 100;

  changedData[0].children[0].children[1].children[0].attributes.Cost =
    Math.round(cost1 * days2 * 100) / 100;
  changedData[0].children[1].children[1].children[0].attributes.Cost =
    Math.round(cost1 * days2 * 100) / 100;

  changedData[0].children[0].attributes.Cost = cost2;
  changedData[0].children[1].attributes.Cost = cost3;

  changedData[0].children[0].children[0].attributes.Cost =
    Math.round(cost4 * days3 * 100) / 100;
  changedData[0].children[1].children[0].attributes.Cost =
    Math.round(cost4 * days3 * 100) / 100;

  changedData[0].children[0].children[1].attributes.Cost =
    Math.round(cost5 * days4 * 100) / 100;
  changedData[0].children[1].children[1].attributes.Cost =
    Math.round(cost5 * days4 * 100) / 100;

  const [open, setOpen] = useState(false);

  treeDataDisplayed = JSON.stringify(changedData);

  const toggleNav = () => {
    setOpen(!open);
  };

  const toggleRefresh = () => {
    if (open === true) {
      window.location.reload(false);
    }
  };

  return (
    <>
      <Navbar />
      <div id="treeWrapper">
        <div className="tree">
          <Tree
            data={JSON.parse(treeDataDisplayed)}
            translate={{ x: 100, y: 450 }}
            pathFunc={"step"}
            zoom={0.7}
            separation={{ siblings: 1, nonSiblings: 1 }}
            nodeSize={{ x: 400, y: 70 }}
            branchNodeClassName="node__branch"
            leafNodeClassName="node__leaf"
            rootNodeClassName="node__root"
          />
        </div>
        <button
          className={editBtn ? "edit-btn" : "update-btn"}
          onClick={() => {
            toggleRefresh();
            toggleNav();
            toggleEditButton();
          }}
        ></button>
        <div id="sidebar" className={open ? "" : "collapse"}>
          <EditTree open={open} prob1={prob1} />
        </div>
      </div>
    </>
  );
}
